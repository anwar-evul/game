const boardEl=document.querySelector('#board'),movesEl=document.querySelector('#moves'),statusEl=document.querySelector('#status'),shuffleBtn=document.querySelector('#shuffle');
let board=[],moves=0;
function solved(){return board.every((v,i)=>v===(i===15?0:i+1));}
function neighbors(i){const r=Math.floor(i/4),c=i%4,a=[];if(r>0)a.push(i-4);if(r<3)a.push(i+4);if(c>0)a.push(i-1);if(c<3)a.push(i+1);return a;}
function render(){boardEl.innerHTML='';board.forEach((v,i)=>{const b=document.createElement('button');b.className=v?'tile':'tile empty';b.textContent=v||'';b.setAttribute('aria-label',v?'Kotak '+v:'Kotak kosong');if(v)b.addEventListener('click',()=>move(i));boardEl.appendChild(b)});movesEl.textContent=moves;}
function move(i){const e=board.indexOf(0);if(!neighbors(e).includes(i))return;[board[e],board[i]]=[board[i],board[e]];moves++;render();if(solved()){statusEl.textContent='Menang! 🎉';statusEl.className='win';}}
function shuffle(){board=Array.from({length:16},(_,i)=>i===15?0:i+1);let empty=15,last=-1;for(let n=0;n<250;n++){let opts=neighbors(empty).filter(x=>x!==last);const pick=opts[Math.floor(Math.random()*opts.length)];[board[empty],board[pick]]=[board[pick],board[empty]];last=empty;empty=pick;}moves=0;statusEl.textContent='Ayo main!';statusEl.className='';render();}
shuffleBtn.addEventListener('click',shuffle);shuffle();