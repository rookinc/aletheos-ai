from pathlib import Path
import json
B=Path(__file__).resolve().parent
PILOT=Path('/workspace/scratch/8909697eb4d0/kalachakra_g60_pilot002')
if not (B/'pilot-data.json').exists():
 import networkx as nx,sympy as s
 w=json.loads((PILOT/'transfer_witness.json').read_text());d=json.loads((PILOT/'reference/G60.json').read_text());e=json.loads((PILOT/'extraction.json').read_text())
 g=nx.Graph();g.add_nodes_from(n['id'] for n in d['nodes']);g.add_edges_from((v['source'],v['target']) for v in d['edges'])
 pos=nx.spring_layout(g,dim=3,seed=60,iterations=300)
 data={'roles':e['nodes'],'partners':e['relations']['partners'],'ring':e['relations']['cyclic_neighbors'],'source':e['source'],'H':[[float(s.Rational(v)) for v in r] for r in w['Walsh_H']],'P':[[float(s.Rational(v)) for v in r] for r in w['P_60_by_8']],'Q':[[float(s.Rational(v)) for v in r] for r in w['Q_8_by_60']],'gEdges':[[a,b] for a,b in g.edges()],'gPos':[list(pos[i]) for i in range(60)],'bits':json.loads((PILOT/'results.json').read_text())['cube']['isomorphism_to_bits']}
 (B/'pilot-data.json').write_text(json.dumps(data,separators=(',',':')))
data=json.loads((B/'pilot-data.json').read_text());data['transport']=json.loads((B/'transport.json').read_text());data['hydrogenBundle']=json.loads((B/'hydrogen-data.json').read_text())
html=(B/'shell.html').read_text().replace('/*STYLE*/',(B/'style.css').read_text()).replace('/*DATA*/','const DATA='+json.dumps(data,separators=(',',':'))+';').replace('/*APP*/',(B/'model.js').read_text()+'\n'+(B/'hydrogen-engine.js').read_text()+'\n'+(B/'hydrogen-bridge.js').read_text()+'\n'+(B/'app.js').read_text())
(B/'dist').mkdir(exist_ok=True);(B/'dist/index.html').write_text(html)
print('Built self-contained observatory',len(html),'bytes')
