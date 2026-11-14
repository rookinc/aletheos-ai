'use strict';
// Two independent native automata, commonly registered on the native graph.
// The graph is a kinematic field here; no field-amplitude law is invented.
const fs=require('fs'),path=require('path'),assert=require('assert/strict'),crypto=require('crypto');
const N=require('../src/native-model.js'),H=require('../src/paired-history.js');
const root=path.resolve(__dirname,'..'),out=path.join(root,'provenance/two-entity-field-001');fs.mkdirSync(out,{recursive:true});
const data=require('../src/native-data.json'),meta=require('../src/paired-history-data.json');
const original=JSON.stringify({data,meta}),gA=N.topology(data),gB=N.topology(data),history=new H.Model(data,meta),n=9000;
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const next=(v,k)=>{for(let i=0;i<k%20;i++)v=gA.F[v];return v;},D=Array.from({length:n},(_,v)=>next(v,10));
const adj=Array.from({length:n},()=>new Set());for(const[a,b]of gA.edges){adj[a].add(b);adj[b].add(a);}
const pi=v=>{const t=history.at(v);return [t.frame,t.g900];};
const contact=(a,b)=>adj[a].has(b),checks=[];
const check=(name,fn)=>{fn();checks.push({name,pass:true});};
check('independent_instances_same_preserved_carrier',()=>{const pins=require('../provenance/encounter-001/orthogonal_observatory_source_recovery_001.json').input_hashes;for(const name of ['native-data.json','native-model.js','paired-history-data.json'])assert.equal(hash(path.join(root,'src',name)),pins['src/'+name]);assert.notEqual(gA,gB);assert.notEqual(gA.F,gB.F);assert.equal(gA.n,9000);assert.equal(gA.edges.length,45000);assert.deepEqual(gA.F,gB.F);const old=gB.F[0],a=new Uint16Array(gA.F);a[0]=0;assert.equal(gB.F[0],old);});
check('F_is_an_automorphism_of_shared_native_graph',()=>{assert.equal(new Set(gA.F).size,n);for(const[a,b]of gA.edges)assert(contact(gA.F[a],gA.F[b]));});
let transportedEdgeTests=0;
check('all_twenty_synchronous_phases_preserve_every_contact',()=>{for(const[a,b]of gA.edges){let x=a,y=b;for(let k=0;k<20;k++){assert(contact(x,y));transportedEdgeTests++;x=gA.F[x];y=gB.F[y];}assert.equal(x,a);assert.equal(y,b);}});
check('all_hidden_partner_neighborhoods_are_disjoint',()=>{for(let a=0;a<n;a++){assert.equal(adj[a].size,10);assert.equal(adj[D[a]].size,10);assert(![...adj[a]].some(p=>contact(D[a],p)));assert.deepEqual(pi(a),pi(D[a]));}});
let quotientContinuationTests=0;
check('single_entity_quotient_factors_for_all_native_F_continuations',()=>{for(let a=0;a<n;a++)for(let k=0;k<20;k++){assert.deepEqual(pi(next(a,k)),pi(next(D[a],k)));quotientContinuationTests++;}});
check('independent_F_words_commute_and_preserve_joint_quotient_equivalence',()=>{const FA=([a,b])=>[gA.F[a],b],FB=([a,b])=>[a,gB.F[b]];for(let a=0;a<n;a++){const b=(a*71+16)%n;let first=[a,b],second=[a,b];for(let k=0;k<3;k++)first=FA(first);for(let k=0;k<7;k++)first=FB(first);for(let k=0;k<7;k++)second=FB(second);for(let k=0;k<3;k++)second=FA(second);assert.deepEqual(first,second);assert.deepEqual(first,[next(a,3),next(b,7)]);for(let k=0;k<20;k++){assert.deepEqual([pi(next(a,k)),pi(next(b,19-k))],[pi(next(D[a],k)),pi(next(D[b],19-k))]);}}});
const witness=0,hidden=D[0],probe=[...adj[0]].sort((a,b)=>a-b)[0],incoming=next(witness,19);
check('relational_contact_reads_hidden_bit_with_fixed_probe',()=>{assert.equal(hidden,488);assert.equal(probe,16);assert(contact(witness,probe));assert(!contact(hidden,probe));assert.deepEqual(pi(witness),pi(hidden));});
check('asynchronous_approach_requires_an_explicit_schedule',()=>{assert(!contact(incoming,probe));assert(contact(gA.F[incoming],probe));assert(!contact(gA.F[incoming],gB.F[probe]));});
check('field_observation_does_not_change_either_native_transition',()=>{for(let a=0;a<n;a++){const b=(a*71+16)%n;const before=[gA.F[a],gB.F[b]];contact(a,b);assert.deepEqual([gA.F[a],gB.F[b]],before);}assert.equal(JSON.stringify({data,meta}),original);});
const report={audit:'G9000_TWO_ENTITY_FIELD_TEST_001_NATIVE',status:'Certified derived',verdict:'NATIVE_CONTACT_READOUT_EXISTS_UNCOUPLED_F_DOES_NOT_SCATTER',producer:'node scripts/test-two-entity-field.cjs',
 input_provenance:{native_data_sha256:hash(path.join(root,'src/native-data.json')),native_model_sha256:hash(path.join(root,'src/native-model.js')),paired_history_sha256:hash(path.join(root,'src/paired-history-data.json'))},checks,
 model:{entityA:'Independent 9000-state native F automaton',entityB:'Independent 9000-state native F automaton',field:'Commonly registered native graph X with 45000 undirected edges. Static relational substrate, not a derived dynamical field Phi.',registration:'Both copies use the same recovered named native carrier; identity registration is declared.',joint_state:'(a,b) in X_A x X_B',joint_state_count:81000000,joint_transition:'T0(a,b)=(F(a),F(b))',joint_period:20,joint_cycle_count:4050000,joint_projection:'(pi(a),pi(b))',contact_selector:'C(a,b)=1 iff {a,b} is a native graph edge; co-location is a separate equality predicate',native_interaction_law_admitted:false},
 results:{transported_undirected_edge_tests:transportedEdgeTests,single_entity_quotient_continuation_tests:quotientContinuationTests,
 synchronous_contact_invariance:'F is a bijection carrying the full edge set onto itself. Therefore contacts and noncontacts are invariant under T0 for ALL 81000000 ordered pairs, including all 20 phases. The proof checks the edge set, not 1.62 billion pair/time combinations.',
 joint_quotient_completeness:'Every word in independent F_A/F_B and inverses reduces to F_A^r F_B^s. Component quotient factorization proves equality for every r,s and every 4-point joint hidden-bit fiber. No new distinguishable joint-quotient response.',
 relational_readout:{A:[history.at(witness),history.at(hidden)],B:history.at(probe),A_projection_equal:true,adjacency_outputs:[1,0],interpretation:'Changing to a relational contact observation exposes a distinction already present before continuation. This is native contact eligibility, not a dynamically written/used memory record.'},
 asynchronous_control:{before:[incoming,probe],step_A_only:[gA.F[incoming],probe],step_both:[gA.F[incoming],gB.F[probe]],contact_outputs:[0,1,0],interpretation:'F_A while holding B fixed is a declared scheduling control. It supplies an approach, but no native response/coupling follows from contact.'},coupling_events:0},
 boundaries:['The two entities are independent automaton configurations (point-supported preparations on their carriers), not two extended bodies whose shapes and placement maps have been recovered.','A full G9000-shaped body and a dynamical ambient field require additional source-derived state/registration laws.','A graph adjacency predicate is not an admitted interaction Hamiltonian.','No probabilities, forces, energy exchange, autonomous source selection or persistent operational memory follow from this product test.'],failures:[]};
fs.writeFileSync(path.join(out,'native-test.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({pass:true,checks:checks.length,states:n,jointStates:report.model.joint_state_count,transportedEdgeTests,quotientContinuationTests,hiddenPartnerContact:[1,0],couplingEvents:0}));
