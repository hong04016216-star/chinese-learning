const tb=document.getElementById('tb');
function speak(text,lang){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=lang;u.rate=0.9;speechSynthesis.speak(u);}
function render(list){tb.innerHTML='';list.forEach(r=>{const tr=document.createElement('tr');tr.innerHTML=`<td>${r['中文']}</td><td>${r['泰文']}</td><td>${r['拼音']}</td><td><button>▶️</button></td><td><button>▶️</button></td>`;
const b=tr.querySelectorAll('button');b[0].onclick=()=>speak(r['中文'],'zh-TW');b[1].onclick=()=>speak(r['泰文'],'th-TH');tb.appendChild(tr);});}
render(vocab);
q.oninput=e=>{const t=e.target.value.toLowerCase();render(vocab.filter(r=>Object.values(r).join(' ').toLowerCase().includes(t)));};