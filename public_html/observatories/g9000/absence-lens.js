(function(root,factory){
  'use strict';
  var data=root.ABSENCE_DATA;
  if(typeof module==='object'&&module.exports){data=require('./absence-data.js');module.exports=factory(data);}
  else root.ABSENCE_LENS=factory(data);
})(typeof globalThis!=='undefined'?globalThis:this,function(DATA){
  'use strict';
  if(!DATA) throw new Error('Load absence-data.js before absence-lens.js.');
  var instances=typeof WeakMap!=='undefined'?new WeakMap():null;
  var serial=0;
  var FILTERS=['all','disjoint','vertex','edge'];
  function validCycle(id){return Number.isInteger(id)&&id>=0&&id<DATA.pentagons.length;}
  function checkCycle(id){if(!validCycle(id))throw new RangeError('Pentagon index must be between 0 and 11.');}
  function edgeKey(a,b){return a<b?a+':'+b:b+':'+a;}
  function cycleEdges(id){checkCycle(id);var c=DATA.pentagons[id];return c.map(function(v,i){return edgeKey(v,c[(i+1)%c.length]);});}
  function relation(a,b){
    checkCycle(a);checkCycle(b);
    if(a===b)throw new RangeError('Choose two different pentagons.');
    var A=DATA.pentagons[a],B=DATA.pentagons[b],be=new Set(cycleEdges(b));
    var vertices=A.filter(function(v){return B.indexOf(v)!==-1;}).sort(function(x,y){return x-y;});
    var edges=cycleEdges(a).filter(function(e){return be.has(e);}).map(function(e){return e.split(':').map(Number);});
    return {type:vertices.length===0?'disjoint':edges.length?'edge':'vertex',sharedVertices:vertices,sharedEdges:edges};
  }
  function candidates(a,filter){checkCycle(a);filter=filter||'all';if(FILTERS.indexOf(filter)===-1)throw new RangeError('Unknown relation filter.');return DATA.pentagons.map(function(_,i){return i;}).filter(function(b){return b!==a&&(filter==='all'||relation(a,b).type===filter);});}
  function profile(a){return {disjoint:candidates(a,'disjoint').length,vertex:candidates(a,'vertex').length,edge:candidates(a,'edge').length};}
  function mate(a){return candidates(a,'disjoint')[0];}
  function vertexLabel(index){if(!Number.isInteger(index)||index<0||index>=15)throw new RangeError('Vertex index must be between 0 and 14.');return String(index+1);}
  function sheet(id){return DATA.certificate.sheet_partition[0].indexOf(id)!==-1?'A':'B';}
  function cycleName(id){return 'Pentagon '+(id+1)+' · Sheet '+sheet(id);}
  function layout(){
    var tau=2*Math.PI;
    function angle(i){return -Math.PI/2+tau*i/5;}
    return DATA.vertices.map(function(v){
      var a=v.petersen_edge[0],b=v.petersen_edge[1],theta,r;
      if(a<5&&b>=5){theta=angle(a);r=105;}
      else{theta=Math.atan2(Math.sin(angle(a%5))+Math.sin(angle(b%5)),Math.cos(angle(a%5))+Math.cos(angle(b%5)));r=b<5?170:44;}
      return {x:240+r*Math.cos(theta),y:211+r*Math.sin(theta)};
    });
  }
  function mount(host){
    if(!host||typeof host.appendChild!=='function')throw new TypeError('mount requires a DOM host element.');
    if(instances&&instances.has(host))instances.get(host).destroy();
    var doc=host.ownerDocument||document,id='absence-'+(++serial),state={first:0,second:mate(0),filter:'disjoint'},dead=false;
    var wrap=doc.createElement('section');wrap.className='absence-lens';wrap.setAttribute('aria-label','Pentagon absence inspector');
    wrap.innerHTML='<div class="al-heading"><div><p class="al-kicker">SUPPORT &amp; ABSENCE</p><h3>Pentagon relations</h3></div><p class="al-size">Independent L(Petersen)<br>15 vertices · 30 edges · 12 pentagons</p></div>'+
      '<div class="al-controls"><label for="'+id+'-first">First pentagon<select id="'+id+'-first" data-al-select="first"></select></label><label for="'+id+'-filter">Relation filter<select id="'+id+'-filter" data-al-select="filter"><option value="all">All 11 other pentagons</option><option value="disjoint">Disjoint mate · 1</option><option value="vertex">Touch one vertex · 5</option><option value="edge">Share an edge · 5</option></select></label><label for="'+id+'-second">Compare with<select id="'+id+'-second" data-al-select="second"></select></label></div>'+
      '<div class="al-profile" role="group" aria-label="Relations to the first pentagon"><button type="button" data-al-filter="disjoint"><b>1</b><span>Disjoint mate</span></button><button type="button" data-al-filter="vertex"><b>5</b><span>Touch one vertex</span></button><button type="button" data-al-filter="edge"><b>5</b><span>Share an edge</span></button></div>'+
      '<div class="al-main"><div class="al-figure"><div class="al-svg-host"></div><div class="al-legend" aria-label="Graph colors"><span><i class="al-swatch al-swatch-a"></i>First pentagon</span><span><i class="al-swatch al-swatch-b"></i>Second pentagon</span><span><i class="al-swatch al-swatch-both"></i>Shared support</span></div></div>'+
      '<div class="al-readout"><div class="al-relation" aria-live="polite" aria-atomic="true"></div><div class="al-cycle-list"></div><div class="al-matching"><h4>Six disjoint pairs</h4><p>Choose a pair to inspect both supports.</p><div class="al-mates" role="group" aria-label="Six disjoint pentagon pairs"></div></div></div></div>'+
      '<details class="al-details"><summary>Construction &amp; scope</summary><div><p>This is an independently constructed <b>line graph of Petersen, L(Petersen)</b>. The diagram is a schematic embedding. A matching pair has no vertex or edge in common; this describes combinatorial non-incidence.</p><p>No original G60 source-label crosswalk is asserted. Physical absence, CMB alignment and spinor behavior are not certified by this inspector.</p><p>Vertex labels run from <b>1 to 15</b>; source index 0 is displayed as vertex 1. Pentagon labels run from 1 to 12. Each displayed cycle uses one fixed canonical traversal, without a physical motion claim.</p><div class="al-source-indices"></div><p class="al-source-links"><a href="https://chatgpt.com/library?file_id=libfile_80e8d28586488191b1926cd3acc25a68&amp;account_id=personal" target="_blank" rel="noopener">Gate014 certificate ↗</a><a href="https://chatgpt.com/library?file_id=libfile_5fb01ea14cac8191b254130d1e6a50a1&amp;account_id=personal" target="_blank" rel="noopener">Producer script ↗</a></p></div></details>';
    host.appendChild(wrap);
    var first=wrap.querySelector('[data-al-select="first"]'),second=wrap.querySelector('[data-al-select="second"]'),filter=wrap.querySelector('[data-al-select="filter"]');
    var svgHost=wrap.querySelector('.al-svg-host'),status=wrap.querySelector('.al-relation'),cycleList=wrap.querySelector('.al-cycle-list'),source=wrap.querySelector('.al-source-indices'),mates=wrap.querySelector('.al-mates');
    DATA.pentagons.forEach(function(_,i){var option=doc.createElement('option');option.value=String(i);option.textContent=cycleName(i);first.appendChild(option);});
    DATA.certificate.matching_pairs.forEach(function(pair,index){var b=doc.createElement('button');b.type='button';b.dataset.alPair=String(index);b.textContent='P'+(pair[0]+1)+' ↔ P'+(pair[1]+1);b.setAttribute('aria-label','Inspect disjoint pentagons '+(pair[0]+1)+' and '+(pair[1]+1));mates.appendChild(b);});
    function render(){
      first.value=String(state.first);filter.value=state.filter;
      var choices=candidates(state.first,state.filter);if(choices.indexOf(state.second)===-1)state.second=choices[0];
      second.textContent='';choices.forEach(function(i){var option=doc.createElement('option');option.value=String(i);option.textContent=cycleName(i);second.appendChild(option);});second.value=String(state.second);
      var r=relation(state.first,state.second),A=DATA.pentagons[state.first],B=DATA.pentagons[state.second],ae=new Set(cycleEdges(state.first)),be=new Set(cycleEdges(state.second)),points=layout();
      wrap.querySelectorAll('[data-al-filter]').forEach(function(button){button.setAttribute('aria-pressed',String(button.dataset.alFilter===state.filter));});
      mates.querySelectorAll('button').forEach(function(button){var pair=DATA.certificate.matching_pairs[Number(button.dataset.alPair)];button.setAttribute('aria-pressed',String(pair.indexOf(state.first)!==-1&&pair.indexOf(state.second)!==-1));});
      var title=r.type==='disjoint'?'Disjoint supports':r.type==='vertex'?'Touch at vertex '+vertexLabel(r.sharedVertices[0]):'Share edge '+r.sharedEdges[0].map(vertexLabel).join('–');
      status.innerHTML='<span class="al-relation-tag al-relation-tag--'+r.type+'">'+(r.type==='disjoint'?'No overlap':r.type==='vertex'?'Vertex only':'Shared edge')+'</span><h4>'+title+'</h4><p>'+r.sharedVertices.length+' shared '+(r.sharedVertices.length===1?'vertex':'vertices')+' · '+r.sharedEdges.length+' shared '+(r.sharedEdges.length===1?'edge':'edges')+'</p>';
      cycleList.innerHTML=[{cycle:A,index:state.first,name:'First',klass:'a'},{cycle:B,index:state.second,name:'Second',klass:'b'}].map(function(row){return '<div class="al-cycle al-cycle--'+row.klass+'"><span>'+row.name+' · P'+(row.index+1)+' · Sheet '+sheet(row.index)+'</span><b>'+row.cycle.map(vertexLabel).join(' → ')+' ↺</b></div>';}).join('');
      source.innerHTML='<p><b>Selected source indices</b><br>P'+(state.first+1)+': ['+A.join(', ')+']<br>P'+(state.second+1)+': ['+B.join(', ')+']</p>';
      var desc=cycleName(state.first)+' and '+cycleName(state.second)+'. '+title+'. Vertex labels are one-based. Cyan marks the first cycle, gold the second, white shared support.';
      var svg='<svg class="al-graph" viewBox="0 0 480 422" role="img" aria-labelledby="'+id+'-svg-title '+id+'-svg-desc"><title id="'+id+'-svg-title">Selected pentagon supports</title><desc id="'+id+'-svg-desc">'+desc+'</desc>';
      DATA.edges.forEach(function(e){var key=edgeKey(e[0],e[1]),a=ae.has(key),b=be.has(key),cls=a&&b?'both':a?'a':b?'b':'base';svg+='<line class="al-edge al-edge--'+cls+'" x1="'+points[e[0]].x+'" y1="'+points[e[0]].y+'" x2="'+points[e[1]].x+'" y2="'+points[e[1]].y+'"/>';});
      DATA.vertices.forEach(function(v){var a=A.indexOf(v.id)!==-1,b=B.indexOf(v.id)!==-1,cls=a&&b?'both':a?'a':b?'b':'base',pt=points[v.id];svg+='<g class="al-node al-node--'+cls+'" transform="translate('+pt.x+' '+pt.y+')"><circle r="15"/>'+(a&&b?'<circle class="al-node-shared-ring" r="19"/>':'')+'<text text-anchor="middle" dominant-baseline="central">'+vertexLabel(v.id)+'</text></g>';});
      svgHost.innerHTML=svg+'</svg>';
    }
    function onChange(event){var which=event.target.dataset.alSelect;if(!which)return;if(which==='filter')state.filter=event.target.value;else state[which]=Number(event.target.value);render();}
    function onClick(event){var button=event.target.closest('button');if(!button||!wrap.contains(button))return;if(button.dataset.alFilter){state.filter=button.dataset.alFilter;render();}else if(button.dataset.alPair!==undefined){var pair=DATA.certificate.matching_pairs[Number(button.dataset.alPair)];state.first=pair[0];state.second=pair[1];state.filter='disjoint';render();}}
    wrap.addEventListener('change',onChange);wrap.addEventListener('click',onClick);render();
    var api={getState:function(){return {first:state.first,second:state.second,filter:state.filter};},setSelection:function(a,b,which){checkCycle(a);checkCycle(b);if(a===b)throw new RangeError('Choose different pentagons.');var f=which||'all';if(FILTERS.indexOf(f)===-1)throw new RangeError('Unknown relation filter.');if(f!=='all'&&relation(a,b).type!==f)throw new RangeError('The pair does not satisfy this filter.');state={first:a,second:b,filter:f};render();},destroy:function(){if(dead)return;dead=true;wrap.removeEventListener('change',onChange);wrap.removeEventListener('click',onClick);wrap.remove();if(instances)instances.delete(host);}};
    if(instances)instances.set(host,api);return api;
  }
  return Object.freeze({mount:mount,relation:relation,candidates:candidates,profile:profile,mate:mate,cycleEdges:cycleEdges,edgeKey:edgeKey,vertexLabel:vertexLabel});
});
