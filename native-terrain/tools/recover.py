"""Extract pinned source bytes; independently enumerate Aut(G) using NetworkX VF2."""
import json, hashlib, pathlib, networkx as nx
ROOT=pathlib.Path(__file__).resolve().parents[2]
OUT=ROOT/'native-terrain/data'
def sha(b): return hashlib.sha256(b).hexdigest()
def dump(n,d): (OUT/n).write_text(json.dumps(d,indent=2)+'\n')
p='public_html/labs/registered_boundary_flux/data/canonical_g60_payload.v1.json'
s=json.loads((ROOT/p).read_text()); edges=[tuple(e) for e in s['edges']]
print(s['source_file'],s['local_copy'])
g=nx.Graph(); g.add_nodes_from(range(60)); g.add_edges_from(edges)
assert g.number_of_edges()==len(edges)==120 and set(dict(g.degree()).values())=={4}
old=json.loads((ROOT/'public_html/json/at4val_60_6_3d.json').read_text())
assert {tuple(sorted((int(e['source']),int(e['target'])))) for e in old['edges']}=={tuple(sorted(e)) for e in edges}
perms=sorted(tuple(m[i] for i in range(60)) for m in nx.algorithms.isomorphism.GraphMatcher(g,g).isomorphisms_iter())
print('Automorphisms',len(perms))
# Deterministic irredundant generating set, full closure computed explicitly.
identity=tuple(range(60)); closure={identity}; gens=[]
def compose(a,b): return tuple(a[b[i]] for i in range(60))
for p in perms:
 if p in closure: continue
 gens.append(p); todo=list(closure)
 while todo:
  a=todo.pop()
  for b in gens:
   c=compose(a,b)
   if c not in closure: closure.add(c); todo.append(c)
assert closure==set(perms)
fixture={'schema':'aletheos.graph.v1','id':'AT4val[60,6]','name':'Thalion','vertices':list(range(60)),'edges':edges,'layout':{'kind':'imported display coordinates; no embedding claim','coordinates':[[n[k] for k in ['x','y','z']] for n in sorted(old['nodes'],key=lambda n:int(n['id']))]},'source':{'repository':'rookinc/aletheos-ai','revision':'18542c1a0a759b99a99478b17f5212dc5b84a434','path':'public_html/labs/registered_boundary_flux/data/canonical_g60_payload.v1.json','sha256':sha((ROOT/'public_html/labs/registered_boundary_flux/data/canonical_g60_payload.v1.json').read_bytes()),'upstream':s['source_file'],'boundary':'Pinned repository import. Original external source not reauthenticated in this run.'}}
dump('g60.json',fixture)
dump('symmetry.json',{'schema':'aletheos.symmetry.v1','method':'Exhaustive NetworkX VF2 self-isomorphism enumeration, then deterministic closure','networkx_version':nx.__version__,'historical_generators':'Not recovered; these generators are independently computed on the pinned graph.','graph_sha256':sha((OUT/'g60.json').read_bytes()),'generators':gens,'elements':perms})
lengths=dict(nx.all_pairs_shortest_path_length(g)); triangles=sorted(tuple(c) for c in nx.enumerate_all_cliques(g) if len(c)==3)
dump('independent-receipt.json',{'schema':'aletheos.receipt.v1','algorithm':'NetworkX independent verifier v1 / VF2 exhaustive','graph_sha256':sha((OUT/'g60.json').read_bytes()),'vertices':len(g),'edges':g.number_of_edges(),'degree_histogram':{'4':60},'connected':nx.is_connected(g),'diameter':nx.diameter(g),'triangles':triangles,'triangle_count':len(triangles),'automorphism_group_order':len(perms),'orbit':[sorted({p[v] for p in perms}) for v in [0]],'stabilizer_orders':[sum(p[v]==v for p in perms) for v in range(60)],'shell_vectors':[[sum(d==k for d in lengths[v].values()) for k in range(7)] for v in range(60)],'source_edge_sets_agree':True})
