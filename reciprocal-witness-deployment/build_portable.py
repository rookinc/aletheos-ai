#!/usr/bin/env python3
"""Make an offline HTML edition from an installed Reciprocal Witness Observatory."""
import argparse
import base64
import json
import mimetypes
from pathlib import Path
import posixpath
import re
from html import escape

p=argparse.ArgumentParser(description=__doc__)
p.add_argument('instrument',type=Path);p.add_argument('output',type=Path);args=p.parse_args()
root=args.instrument
def data(raw,kind):return 'data:'+kind+';base64,'+base64.b64encode(raw).decode('ascii')
def source(path):return (root/path).read_text()
def resource(path):return data((root/path).read_bytes(),mimetypes.guess_type(path)[0] or 'application/octet-stream')
page=source('index.html')
css=re.sub(r'url\("\./(fonts/[^"]+)"\)',lambda m:'url("'+resource(m.group(1))+'")',source('style.css'))
page=page.replace('<link rel="stylesheet" href="./style.css">','<style>'+css+'</style>')
imports={}
for file in [*root.glob('*.js'),*(root/'data').glob('*.js')]:
    key=file.relative_to(root).as_posix()
    def replace(m):
        imported=posixpath.normpath(posixpath.join(posixpath.dirname(key),m.group(2)))
        return m.group(1)+"'rw/"+imported+"'"
    mod=re.sub(r"(\bfrom\s+)'(\.[^']+)'",replace,file.read_text())
    if key=='panels.js':
        mod=mod.replace("'./data/sky-planck.png'","'"+resource('data/sky-planck.png')+"'")
    imports['rw/'+key]=data(mod.encode(),'text/javascript')
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
dialog=dialog.replace('const pages=', 'const FILES='+json.dumps(attach,separators=(',',':'))+';\nconst pages=')
bootstrap='<script type="importmap">'+json.dumps({'imports':imports},separators=(',',':'))+'</script><script type="module">import "rw/app.js";</script>'
page=page.replace('<script type="module" src="./app.js"></script>',docs+dialog+bootstrap)
page=page.replace('href="/library/','href="https://aletheos.ai/library/')
args.output.parent.mkdir(parents=True,exist_ok=True);args.output.write_text(page)
