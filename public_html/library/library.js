const list=document.querySelector('#entries');
const rows=Array.from(list.children);
function update(){
  const query=document.querySelector('#query').value.trim().toLowerCase();
  const subject=document.querySelector('#subject').value;
  const desc=document.querySelector('#order').value==='desc';
  const pdf=document.querySelector('#pdf').checked;
  let count=0;
  for(const row of (desc?rows:rows.slice().reverse())){
    row.hidden=!((row.textContent+' '+row.dataset.search).toLowerCase().includes(query)&&(!subject||subject===row.dataset.subject)&&(!pdf||row.dataset.pdf==='1'));
    list.append(row);
    if(!row.hidden)count++;
  }
  document.querySelector('#count').textContent=count+(count===1?' record':' records');
  document.querySelector('#empty').hidden=count!==0;
}
document.querySelector('.controls').addEventListener('input',update);
