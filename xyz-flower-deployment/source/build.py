from pathlib import Path
import json
B=Path(__file__).resolve().parent
data=json.loads((B/'pilot-data.json').read_text());data['transport']=json.loads((B/'transport.json').read_text())
html=(B/'shell.html').read_text().replace('/*STYLE*/',(B/'style.css').read_text()).replace('/*DATA*/','const DATA='+json.dumps(data,separators=(',',':'))+';').replace('/*APP*/',(B/'model.js').read_text()+'\n'+(B/'app.js').read_text())
(B/'dist').mkdir(exist_ok=True);(B/'dist/index.html').write_text(html)
print('Built self-contained observatory',len(html.encode()),'bytes')
