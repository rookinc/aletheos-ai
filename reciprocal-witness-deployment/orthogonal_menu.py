"""One reversible link in the independently served Orthogonal v1.8 entry."""
import json
from urllib.error import HTTPError
from urllib.parse import urlsplit

from catalog import HERE, digest
from install import replace_bytes

FILE = HERE/'orthogonal-menu.json'
RULE = json.loads(FILE.read_text(encoding='utf-8'))
FIELD_PATH = '/observatories/reciprocal-witness/sitters.html?field=orthogonal'


def splice(original, rule=RULE):
    pos = rule['insert_offset']
    link = rule['insert'].encode()
    nav = rule['original_menu'].encode()
    previous = nav[:-len(b'</nav>')]
    if (len(original) != rule['source_bytes'] or digest(original) != rule['before']
            or original[pos-len(previous):pos+len(b'</nav>')] != nav
            or original.count(nav) != 1 or link in original
            or digest(original[:pos]) != rule['prefix_sha256']
            or digest(original[pos:]) != rule['suffix_sha256']):
        raise ValueError('Independent Orthogonal page differs from the pinned menu source.')
    changed = original[:pos]+link+original[pos:]
    if digest(changed) != rule['after']:
        raise ValueError('Orthogonal menu output fingerprint mismatch.')
    return changed


def unsplice(current, rule=RULE):
    pos, link = rule['insert_offset'], rule['insert'].encode()
    if digest(current) != rule['after'] or current[pos:pos+len(link)] != link:
        raise ValueError('Expected the exact released Orthogonal page before removing its link.')
    original = current[:pos]+current[pos+len(link):]
    if splice(original,rule) != current:
        raise ValueError('Could not reconstruct the exact prior page.')
    return original


def plan(root, remove=False, rule=RULE):
    path = root / rule['server_path']
    if path.resolve() != path or (path.exists() and not path.is_file()):
        return {'status':'preserved-unmanaged-path'}, None
    if not path.exists():
        return {'status':'absent'}, None
    old = path.read_bytes()
    sha = digest(old)
    if sha not in (rule['before'],rule['after']):
        return {'status':'preserved-unrecognized','sha256':sha}, None
    if sha == (rule['before'] if remove else rule['after']):
        return {'status':'original' if remove else 'current','sha256':sha}, None
    data = unsplice(old,rule) if remove else splice(old,rule)
    return {'status':'removed' if remove else 'installed','sha256':digest(data)}, (path,old,data,path.stat().st_mode & 0o777)


def apply(change):
    path, old, data, mode = change
    if path.resolve() != path or path.read_bytes() != old:
        raise ValueError('Independent Orthogonal page changed during installation.')
    replace_bytes(path,data,mode)


def verify_change(change):
    path, old, data, mode = change
    if path.read_bytes() != data:
        raise ValueError('On-host Orthogonal menu verification failed.')


def remote_check(fetch, receipt=None, rule=RULE):
    # A host with an absent or independently changed workbench still has a complete
    # Reciprocal installation. Its independent menu retains its explicitly reported status.
    report = receipt or {}
    status = report.get('status')
    rel = urlsplit(rule['source_url']).path
    try:
        data = fetch(rel)
    except HTTPError as err:
        if status in (None,'absent','preserved-unmanaged-path') and err.code in (404,410):
            return {'status':status or 'absent','verified_path':rel}
        raise
    sha = digest(data)
    if status in ('absent','preserved-unmanaged-path'):
        return {'status':status,'verified_path':rel,'independently_served_sha256':sha}
    if sha == rule['after'] and rule['insert'].encode() in data:
        actual = 'current'
    elif sha == rule['before']:
        actual = 'original'
    else:
        actual = 'preserved-unrecognized'
    if status and sha != report.get('sha256'):
        raise ValueError('Public Orthogonal page does not match the host installation.')
    return {'status':actual,'sha256':sha,'verified_path':rel}
