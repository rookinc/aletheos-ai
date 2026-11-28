"""Insert or refresh the transport series inside the existing Clay reading guide."""
import argparse
import os
from pathlib import Path
import re
import stat
import tempfile

ANCHOR = '<section class="reading-guide" id="clay-prize-papers">'
START = '<!-- CoRI transport series: start -->'
END = '<!-- CoRI transport series: end -->'


def render(source, fragment):
    if source.count(ANCHOR) != 1:
        raise ValueError("Expected one Clay reading guide")
    start = source.index(ANCHOR) + len(ANCHOR)
    block = START + "\n" + fragment.strip() + "\n" + END
    if START in source or END in source:
        if source.count(START) != 1 or source.count(END) != 1:
            raise ValueError("Incomplete or repeated series markers")
        left = source.index(START)
        right = source.index(END) + len(END)
        if left < start or right <= left or '</section>' in source[start:left]:
            raise ValueError("Unexpected series position")
        return source[:left] + block + source[right:]
    # Keep the existing guide introduction immediately above the new series.
    intro = re.match(r'\s*<h2>[^<]+</h2>\s*<p>.*?</p>', source[start:], re.S)
    if not intro or '</section>' in intro.group():
        raise ValueError("Clay guide introduction has changed")
    pos = start + intro.end()
    return source[:pos] + block + source[pos:]


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('guide', type=Path, help='Installed library/collections/index.html')
    args = parser.parse_args()
    guide = args.guide
    original = guide.read_bytes()
    fragment = Path(__file__).with_name('series.html').read_text(encoding='utf-8')
    updated = render(original.decode('utf-8'), fragment).encode('utf-8')
    if updated != original:
        with tempfile.NamedTemporaryFile(dir=guide.parent, delete=False) as tmp:
            try:
                tmp.write(updated)
                tmp.flush()
                os.fchmod(tmp.fileno(), stat.S_IMODE(guide.stat().st_mode))
                if guide.read_bytes() != original:
                    raise ValueError("Guide changed during preparation")
                os.replace(tmp.name, guide)
            finally:
                Path(tmp.name).unlink(missing_ok=True)
