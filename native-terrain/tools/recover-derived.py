"""Bind imported Project 41 objects to exact pinned source hashes."""
import json,pathlib,hashlib,networkx as nx
out=pathlib.Path(__file__).resolve().parents[1]/'data'
def read(n):return json.loads((out/n).read_text())
def sha(n):return hashlib.sha256((out/n).read_bytes()).hexdigest()
def write(n,d):(out/n).write_text(json.dumps(d,indent=2)+'\n')
b=read('project41-bundle.json');a=read('project41-g15-audit.json');cache=read('project41-automorphism-cache.json');f=read('g60.json');s=read('symmetry.json');
assert {tuple(sorted(e)) for e in b['current_edges']}=={tuple(sorted(e)) for e in f['edges']}
assert {tuple(p['permutation']) for p in cache['measurements']['automorphism_rows']}=={tuple(p) for p in s['elements']}
assert sha('project41-bundle.json')==a['sources']['native_generator_bundle']['sha256']
m=[None]*60
for fiber in a['measurements']['fibers']:
 for v in fiber['g60_states']:m[v]=fiber['fiber_index']
decks=[[b[k][str(i)] for i in range(60)] for k in ['relabeled_involution_a_current_labels','relabeled_involution_b_current_labels']]
q={'schema':'aletheos.quotient.v1','source':{'repository':'rookinc/order-4-dodecahedral-residue','revision':'e1bf21ca3ab700f69432852436f092442f8b46bd','path':'artifacts/json/intrinsic_g15_line_petersen_audit_015.json','sha256':sha('project41-g15-audit.json'),'dependencies':[{'path':'sources/upstream/g60_native_generator_input_bundle_001.v1.json','sha256':sha('project41-bundle.json')}]},'domain':'AT4val[60,6]','codomain':'G15 / V4','vertices':list(range(15)),'edges':[e['quotient_edge'] for e in a['measurements']['quotient_edges']],'map':m,'deck':decks[0],'deck_generators':decks,'fiber_size':4}
write('g15-quotient.json',q)
# Independent covering checks in Python, plus explicit Petersen line-graph identification.
g=nx.Graph();g.add_nodes_from(range(60));g.add_edges_from(f['edges']);h=nx.Graph();h.add_nodes_from(range(15));h.add_edges_from(q['edges'])
assert nx.is_isomorphic(h,nx.line_graph(nx.petersen_graph()))
assert {tuple(sorted((m[u],m[v]))) for u,v in g.edges}=={tuple(sorted(e)) for e in h.edges}
assert all(len({m[w] for w in g[v]})==4 and {m[w] for w in g[v]}==set(h[m[v]]) for v in g)
write('derived-independent-receipt.json',{'schema':'aletheos.derived-receipt.v1','g15_fixture_sha256':sha('g15-quotient.json'),'graph_sha256':sha('g60.json'),'project41_edge_equality':True,'project41_full_automorphism_set_equality':True,'bundle_hash_matches_audit_dependency':True,'g15_vertices':len(h),'g15_edges':h.number_of_edges(),'g15_triangles':sum(nx.triangles(h).values())//3,'g15_line_petersen_isomorphism':True,'g15_cover_local_bijections':True,'algorithm':'NetworkX 3.7 / independent cover and graph isomorphism checks'})
