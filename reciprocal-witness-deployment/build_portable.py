#!/usr/bin/env python3
"""Make an offline HTML edition from an installed Reciprocal Witness Observatory."""
import argparse
import base64
import json
import mimetypes
from pathlib import Path
import posixpath
import re

p=argparse.ArgumentParser(description=__doc__)
p.add_argument('instrument',type=Path)
p.add_argument('output',type=Path)
p.add_argument('--orthogonal',action='store_true',help='Build the standalone sitter loop and open on the Orthogonal Assembly')
p.add_argument('--sitters',action='store_true',help='Build just the two-sitter loop as one offline HTML file')
args=p.parse_args()
root=args.instrument
def data(raw,kind):return 'data:'+kind+';base64,'+base64.b64encode(raw).decode('ascii')
def source(path):return (root/path).read_text()
def resource(path):return data((root/path).read_bytes(),mimetypes.guess_type(path)[0] or 'application/octet-stream')
def styled_page(filename):
    def stylesheet(match):
        css = re.sub(r'url\("\./(fonts/[^"]+)"\)', lambda m: 'url("'+resource(m.group(1))+'")', source(match.group(1).split('?',1)[0]))
        return '<style>'+css+'</style>'
    return re.sub(r'<link rel="stylesheet" href="\./([^"]+)">',stylesheet,source(filename))

def module_loader(entry):
    imports = {}
    def collect(key):
        if 'rw/'+key in imports:
            return
        imports['rw/'+key] = ''
        def dependency(match):
            imported = posixpath.normpath(posixpath.join(posixpath.dirname(key),match.group(2).split('?',1)[0]))
            collect(imported)
            return match.group(1)+"'rw/"+imported+"'"
        mod = re.sub(r"(\bfrom\s+)'(\.[^']+)'",dependency,source(key))
        if key == 'panels.js':
            mod = mod.replace("'./data/sky-planck.png'","'"+resource('data/sky-planck.png')+"'")
        imports['rw/'+key] = data(mod.encode(),'text/javascript')
    collect(entry)
    mapping = json.dumps({'imports':imports},separators=(',',':'))
    return '<script type="importmap">'+mapping+'</script><script type="module">import "rw/'+entry+'";</script>'

def sitter_page(open_orthogonal=False):
    html = styled_page('sitters.html')
    if open_orthogonal:
        html = html.replace('<body class="duet">','<body class="duet" data-default-field="orthogonal">')
    html = html.replace('href="./index.html#heart"','href="https://aletheos.ai/observatories/reciprocal-witness/#heart"')
    html = html.replace('href="/library/','href="https://aletheos.ai/library/')
    def evidence(match):
        path = match.group(1)
        return 'download="'+Path(path).name+'" href="'+resource(path)+'"'
    html = re.sub(r'href="\./([^"]+\.(?:js|mjs|py|md|json))"',evidence,html)
    return re.sub(r'<script type="module" src="\./sitters\.js(?:\?[^"]*)?"></script>',
                  lambda _: module_loader('sitters.js'),html)

args.output.parent.mkdir(parents=True,exist_ok=True)
loop_page = sitter_page(args.orthogonal) if (root/'sitters.html').exists() else ''
if args.sitters or args.orthogonal:
    if not loop_page:
        p.error('This installation has no sitters.html')
    args.output.write_text(loop_page)
    raise SystemExit(0)

page=styled_page('index.html')
def embedded(doc,id):
    part=re.search(r'<main id="guide" class="wrap guide">(.*?)</main>',source(doc),re.S).group(1)
    return '<main id="'+id+'" class="wrap guide" hidden><div style="padding-top:14px"><button data-close-doc>Return to experiment</button></div>'+part+'</main>'
docs=embedded('field-guide.html','portable-guide')+embedded('replay.html','portable-replay')
attach={}
# Embed linked archive evidence once for offline researcher downloads.
for f in [*root.glob('*.js'),*root.joinpath('data').glob('*'),*root.joinpath('tests').glob('*'),*root.joinpath('notes').glob('*')]:
    if not f.is_file() or f.suffix in ('.png','.woff2'):continue
    rel=f.relative_to(root).as_posix();attach[rel]=resource(rel)
dialog=r'''
<script>
(()=>{
const pages={'field-guide.html':document.querySelector('#portable-guide'),'replay.html':document.querySelector('#portable-replay')};
let backY=0;
const instrument=document.querySelector('main:not(.guide)');
function closeDoc(){for(const el of Object.values(pages))el.hidden=true;instrument.hidden=false;window.scrollTo({top:backY,behavior:'instant'});}
document.addEventListener('click',ev=>{
 if(ev.target.closest('[data-close-doc]')){closeDoc();return;}
 const a=ev.target.closest('a[href]');if(!a)return;
 const raw=a.getAttribute('href');
 if(raw.startsWith('/')||/^https?:|^blob:|^data:/.test(raw))return;
 if(raw.startsWith('#')){
  const target=document.getElementById(raw.slice(1));if(target){ev.preventDefault();target.scrollIntoView();}return;
 }
 const [path,frag]=raw.replace(/^\.\//,'').split('#');
 if(path==='sitters.html'){
  ev.preventDefault();
  const frame=document.createElement('iframe');
  frame.title='Two-sitter field loop';
  frame.style.cssText='position:fixed;inset:0;width:100%;height:100%;border:0;z-index:100;background:#090f15';
  const overflow=document.body.style.overflow;document.body.style.overflow='hidden';
  frame.addEventListener('load',()=>{
   frame.contentDocument.querySelectorAll('.backHearts').forEach(back=>back.addEventListener('click',e=>{
    e.preventDefault();frame.remove();document.body.style.overflow=overflow;a.focus();
   }));
   frame.contentWindow.focus();
  },{once:true});
  frame.srcdoc=new TextDecoder().decode(Uint8Array.from(atob(LOOP_HTML),c=>c.charCodeAt(0)));
  document.body.append(frame);return;
 }
 if(path==='index.html'){
  ev.preventDefault();closeDoc();
  const s=document.querySelector('#mobileExperiment');if(frag&&[...s.options].some(o=>o.value===frag)){s.value=frag;s.dispatchEvent(new Event('change',{bubbles:true}));}
  return;
 }
 if(pages[path]){
  ev.preventDefault();if(!instrument.hidden)backY=window.scrollY;instrument.hidden=true;
  for(const [k,el] of Object.entries(pages))el.hidden=k!==path;
  window.scrollTo({top:0,behavior:'instant'});if(frag)document.getElementById(frag)?.scrollIntoView();return;
 }
 const item=FILES[path];if(item){ev.preventDefault();const btn=document.createElement('a');btn.href=item;btn.download=path.split('/').pop();document.body.append(btn);btn.click();btn.remove();}
});
})();
</script>'''
dialog=dialog.replace('const pages=', 'const LOOP_HTML='+json.dumps(base64.b64encode(loop_page.encode()).decode('ascii'))+';\nconst FILES='+json.dumps(attach,separators=(',',':'))+';\nconst pages=')
bootstrap=module_loader('app.js')
page=page.replace('<script type="module" src="./app.js"></script>',docs+dialog+bootstrap)
page=page.replace('href="/library/','href="https://aletheos.ai/library/')
args.output.write_text(page)
