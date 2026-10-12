
/* =====================================================================
   JUEGOS NUEVOS · TANDA 2
   Sube brincando · Lluvia de bloques · Indios vs Conquistadores ·
   ¡Que no te aplasten! · Pelotas y flechas
   ===================================================================== */
Object.assign(L.es,{'jump.h':'ALTURA','blocks.lines':'LÍNEAS','blocks.next':'SIGUE','blocks.full':'¡SE LLENÓ!','vd.wave':'OLEADA {n}','vd.pick':'ELIGE UNA MEJORA',
 'vd.up.speed':'Arco rápido','vd.up.speed.d':'Disparas más seguido','vd.up.multi':'Más flechas','vd.up.multi.d':'+1 flecha por disparo','vd.up.fire':'Flecha de fuego','vd.up.fire.d':'Atraviesa enemigos','vd.up.heal':'Reparar aldea','vd.up.heal.d':'+1 corazón',
 'rat.cheese':'¡QUESO!','ca.wrong':'¡OTRO COLOR!','ca.now':'TU FLECHA'});
Object.assign(L.en,{'jump.h':'HEIGHT','blocks.lines':'LINES','blocks.next':'NEXT','blocks.full':'BOARD FULL!','vd.wave':'WAVE {n}','vd.pick':'PICK AN UPGRADE',
 'vd.up.speed':'Quick bow','vd.up.speed.d':'Shoot more often','vd.up.multi':'More arrows','vd.up.multi.d':'+1 arrow per shot','vd.up.fire':'Fire arrow','vd.up.fire.d':'Goes through enemies','vd.up.heal':'Repair village','vd.up.heal.d':'+1 heart',
 'rat.cheese':'CHEESE!','ca.wrong':'WRONG COLOR!','ca.now':'YOUR ARROW'});

/* utilidades compartidas de esta tanda */
const holdSide=(g)=>{let Lf=g.keys.ArrowLeft||g.keys.KeyA,R=g.keys.ArrowRight||g.keys.KeyD;g.ptrs.forEach(px=>{if(px<400)Lf=true;else R=true});return(R?1:0)-(Lf?1:0)};
function sideArrows(c,steer,y=300){
  const arrow=(x,dir,on)=>{rr(c,x,y+(on?4:0),120,80,16);c.fillStyle=on?'rgba(255,210,63,.85)':'rgba(255,253,246,.42)';c.fill();c.lineWidth=3;c.strokeStyle=INK;c.stroke();
    const mx=x+60,my=y+40+(on?4:0);c.beginPath();c.moveTo(mx+dir*17,my);c.lineTo(mx-dir*12,my-19);c.lineTo(mx-dir*12,my+19);c.closePath();c.fillStyle=INK;c.fill()};
  arrow(18,-1,steer<0);arrow(662,1,steer>0);
}
function heart(c,x,y,on,s=1){c.beginPath();c.moveTo(x,y+5*s);c.bezierCurveTo(x-11*s,y-4*s,x-5*s,y-12*s,x,y-5*s);c.bezierCurveTo(x+5*s,y-12*s,x+11*s,y-4*s,x,y+5*s);c.fillStyle=on?'#E85A5A':'rgba(255,255,255,.5)';c.fill();c.lineWidth=2.5;c.strokeStyle=INK;c.stroke()}
function skyBg(c,top='#58B4E9',bot='#C7E8F9'){const gr=c.createLinearGradient(0,0,0,400);gr.addColorStop(0,top);gr.addColorStop(1,bot);c.fillStyle=gr;c.fillRect(0,0,800,400)}
function outlined(c,fill,lw=4){c.fillStyle=fill;c.fill();c.lineWidth=lw;c.strokeStyle=INK;c.stroke()}

IC.jump_up=`<svg ${ICON_ATTR}><rect x="6" y="36" width="20" height="6" rx="3" fill="#5BCB4A"/><rect x="24" y="22" width="18" height="6" rx="3" fill="#2FA8E8"/><rect x="10" y="9" width="16" height="6" rx="3" fill="#5BCB4A"/><circle cx="33" cy="12" r="4" fill="#fff"/><path d="M33 16v6M30 19h6"/></svg>`;
IC.block_rain=`<svg ${ICON_ATTR}><rect x="8" y="30" width="10" height="10" fill="#FFD23F"/><rect x="18" y="30" width="10" height="10" fill="#FFD23F"/><rect x="18" y="20" width="10" height="10" fill="#FFD23F"/><rect x="28" y="30" width="10" height="10" fill="#E85A5A"/><rect x="18" y="4" width="10" height="10" fill="#2FA8E8"/><rect x="28" y="4" width="10" height="10" fill="#2FA8E8"/></svg>`;
IC.village_defense=`<svg ${ICON_ATTR}><path d="M10 6q14 18 0 36" fill="none"/><path d="M10 6v36" stroke-width="1.5"/><path d="M10 24h30"/><path d="M34 19l6 5-6 5" fill="#FFD23F"/><path d="M14 20l-4 4 4 4" fill="#E85A5A"/></svg>`;
IC.rat_run=`<svg ${ICON_ATTR}><ellipse cx="24" cy="12" rx="16" ry="7" fill="rgba(31,42,58,.25)" stroke="none"/><ellipse cx="22" cy="34" rx="12" ry="8" fill="#B7BCC6"/><circle cx="32" cy="28" r="4" fill="#F7A8C4"/><circle cx="31" cy="34" r="1.5" fill="#1F2A3A"/><path d="M10 36q-6 0-6 6"/></svg>`;
IC.color_arrows=`<svg ${ICON_ATTR}><circle cx="14" cy="14" r="8" fill="#E85A5A"/><circle cx="34" cy="12" r="8" fill="#2FA8E8"/><circle cx="30" cy="31" r="8" fill="#FFD23F"/><path d="M8 42l14-14" /><path d="M22 28l-6 1 5 5z" fill="#E85A5A"/></svg>`;

/* ---------- Sube brincando ---------- */
registerGame({id:'jump_up',name:{es:'Sube brincando',en:'Jump Up'},category:'control',duration:60,difficulty:2,cap:40000,phase:5,
  desc:{es:'Rebota de plataforma en plataforma y sube lo más alto que puedas.',en:'Bounce from platform to platform and climb as high as you can.'},
  tips:{es:{ctrl:'Mantén IZQUIERDA o DERECHA para moverte; brincas solo',plus:'Cada metro de altura suma · el resorte da un súper salto · moneda +50',minus:'Si caes de la pantalla pierdes una vida (tienes 3) · las tablas cafés se rompen'},
        en:{ctrl:'Hold LEFT or RIGHT to move; you bounce by yourself',plus:'Every meter of height counts · springs give a super jump · coin +50',minus:'Falling off the screen costs a life (you have 3) · brown planks break'}},ctrlIcon:'buttons',
  sim:k=>({raw:(400+Math.random()*3800)*k}),
  create(dur){
  const X0=200,X1=600;
  const g={dur,t:0,over:false,fl:[],ptrs:new Map(),keys:{},lives:3,x:400,y:300,vy:-640,cam:0,maxH:0,plats:[],items:[],topY:340,inv:0,steer:0,bonus:0,face:1,bounces:0};
  g.plats.push({x:400,y:340,w:140,type:'n',vx:0});
  const gen=()=>{while(g.topY>g.cam-520){const h=Math.max(0,-g.topY)/10,d=Math.min(1,h/700);g.topY-=62+d*48+Math.random()*24;
    const r=Math.random(),type=r<.1+.18*d?'m':r<.18+.2*d?'b':r<.24+.06*d?'s':'n',w=type==='s'?78:Math.max(62,92-d*26);
    g.plats.push({x:rand(X0+w/2,X1-w/2),y:g.topY,w,type,vx:type==='m'?rand(60,110+d*60)*(Math.random()<.5?1:-1):0});
    if(type!=='b'&&Math.random()<.2)g.items.push({x:g.plats[g.plats.length-1].x,y:g.topY-46})}};
  gen();
  g.down=(x,y,id)=>g.ptrs.set(id,x);g.up=id=>g.ptrs.delete(id);g.key=(k,d)=>{g.keys[k]=d};
  g.update=dt=>{
    g.steer=holdSide(g);if(g.steer)g.face=g.steer;g.inv=Math.max(0,g.inv-dt);
    g.x+=g.steer*380*dt;if(g.x<X0)g.x=X1;if(g.x>X1)g.x=X0;
    g.plats.forEach(p=>{if(p.vx){p.x+=p.vx*dt;if(p.x<X0+p.w/2||p.x>X1-p.w/2)p.vx*=-1}if(p.fall!=null){p.fall+=dt;p.y+=420*dt*p.fall*3}});
    const py=g.y;g.vy+=1500*dt;g.y+=g.vy*dt;
    if(g.vy>0)for(const p of g.plats){if(p.fall!=null)continue;if(py<=p.y&&g.y>=p.y&&Math.abs(g.x-p.x)<p.w/2+10){
      if(p.type==='b'){p.fall=0;tone(180,.12,'square',.04,.5);continue}
      g.y=p.y;g.vy=p.type==='s'?-1060:-650;g.bounces++;if(p.type==='s'){tone(400,.25,'triangle',.07,2.5);floatTxt(g.fl,g.x,g.y-g.cam-60,'¡BOING!','#FFD23F',24)}else tone(520,.06,'triangle',.04,1.4);break}}
    if(g.y-g.cam<170)g.cam=g.y-170;
    g.maxH=Math.max(g.maxH,(300-g.y)/10);
    g.items=g.items.filter(k=>{if(Math.hypot(k.x-g.x,k.y-(g.y-40))<30){g.bonus+=50;floatTxt(g.fl,k.x,k.y-g.cam,'+50','#FFD23F',22);tone(1320,.06,'square',.04,1.5);return false}return k.y-g.cam<460});
    if(g.y-g.cam>440){g.lives--;tone(160,.3,'sawtooth',.06,.5);if(g.lives<=0){g.over=true;return}
      let p=g.plats.filter(p=>p.fall==null&&p.type!=='b'&&p.y-g.cam>220&&p.y-g.cam<390).sort((a,b)=>b.y-a.y)[0];
      if(!p){p={x:400,y:g.cam+360,w:120,type:'n',vx:0};g.plats.push(p)}
      g.x=p.x;g.y=p.y;g.vy=-700;g.inv=1.2}
    gen();g.plats=g.plats.filter(p=>p.y-g.cam<470);
  };
  g.score=()=>Math.round(g.maxH)*5+g.bonus;g.acc=()=>null;g.maxCombo=()=>0;
  g.auto=dt=>{const cand=g.vy<0?g.plats.filter(p=>p.fall==null&&p.type!=='b'&&p.y<g.y-30&&p.y>g.y-200):g.plats.filter(p=>p.fall==null&&p.type!=='b'&&p.y>g.y-10&&p.y<g.y+260);
    const p=cand.sort((a,b)=>(g.vy<0?a.y-b.y:b.y-a.y)||0).sort((a,b)=>Math.abs(a.x-g.x)-Math.abs(b.x-g.x))[0];
    g.ptrs.delete('bot');if(p&&Math.abs(p.x-g.x)>14){const r=p.x>g.x;g.ptrs.set('bot',r?700:100);g.hand={x:r?722:78,y:340,p:.2,hold:1}}else if(g.hand)g.hand.hold=0};
  g.draw=c=>{
    const k=Math.min(1,g.maxH/900);skyBg(c,`hsl(${205-k*60},70%,${62-k*22}%)`,`hsl(${200-k*40},75%,${86-k*20}%)`);
    CLOUDS.forEach((cl,i)=>{const y=((cl.y*3-g.cam*.3)%520+520)%520-60;cloud(c,cl.x,y,cl.s)});
    c.fillStyle='rgba(31,42,58,.14)';c.fillRect(0,0,X0-8,400);c.fillRect(X1+8,0,800-X1-8,400);
    c.fillStyle='rgba(255,255,255,.5)';c.fillRect(X0-10,0,3,400);c.fillRect(X1+7,0,3,400);
    g.plats.forEach(p=>{const y=p.y-g.cam;if(y<-20||y>420)return;
      const col=p.type==='m'?'#2FA8E8':p.type==='b'?'#B07A4A':'#5BCB4A';c.save();if(p.fall!=null){c.globalAlpha=Math.max(0,1-p.fall*1.5);c.translate(p.x,y);c.rotate(p.fall*1.2);c.translate(-p.x,-y)}
      plank(c,p.x-p.w/2,y,p.w,16,col);
      if(p.type==='b'){c.strokeStyle=INK;c.lineWidth=2.5;c.beginPath();c.moveTo(p.x-6,y+2);c.lineTo(p.x+2,y+8);c.lineTo(p.x-3,y+14);c.stroke()}
      if(p.type==='s'){c.lineWidth=3;c.strokeStyle=INK;c.beginPath();for(let i=0;i<4;i++){c.moveTo(p.x-10,y-3-i*4);c.lineTo(p.x+10,y-5-i*4)}c.stroke();rr(c,p.x-14,y-22,28,7,3);outlined(c,'#FFD23F',3)}
      c.restore()});
    g.items.forEach(it=>{const y=it.y-g.cam,s=Math.abs(Math.cos(g.t*4+it.x));c.beginPath();c.ellipse(it.x,y,12*s+2,12,0,0,7);outlined(c,'#FFD23F',3)});
    if(!(g.inv>0&&(g.t*12|0)%2)){c.save();const sy=g.y-g.cam;c.translate(g.x,sy);c.scale(g.face,1);stick(c,0,0,g.t*8,g.vy<0?'jump':'run');c.restore()}
    drawFloats(c,g.fl,1/60);
    hud(c,g,{label:t('jump.h'),value:Math.round(g.maxH)+' m',lives:g.lives,lives0:3});
    sideArrows(c,g.steer,312);
  };
  return g;
}});

/* ---------- Lluvia de bloques ---------- */
registerGame({id:'block_rain',name:{es:'Lluvia de bloques',en:'Block Rain'},category:'decision',duration:75,difficulty:2,cap:60000,phase:5,
  desc:{es:'Acomoda las piezas que caen para completar líneas.',en:'Fit the falling pieces to complete lines.'},
  tips:{es:{ctrl:'◀ ▶ mueven · ⟳ gira · ▼ baja rápido · toca el tablero para soltar de golpe',plus:'1 línea +100 · 2 +300 · 3 +500 · 4 +800 (más en niveles altos)',minus:'Si las piezas llegan arriba se vacía el tablero y pierdes tu racha'},
        en:{ctrl:'◀ ▶ move · ⟳ rotate · ▼ soft drop · tap the board to hard drop',plus:'1 line +100 · 2 +300 · 3 +500 · 4 +800 (more at higher levels)',minus:'If pieces reach the top the board empties and you lose your streak'}},ctrlIcon:'buttons',
  sim:k=>({raw:(300+Math.random()*4500)*k}),
  create(dur){
  const COLS=10,ROWS=20,C=17,BX=315,BY=36;
  const SH={I:[[0,1],[1,1],[2,1],[3,1]],O:[[1,0],[2,0],[1,1],[2,1]],T:[[1,0],[0,1],[1,1],[2,1]],S:[[1,0],[2,0],[0,1],[1,1]],Z:[[0,0],[1,0],[1,1],[2,1]],J:[[0,0],[0,1],[1,1],[2,1]],L:[[2,0],[0,1],[1,1],[2,1]]};
  const COL={I:'#3EC3F0',O:'#FFD23F',T:'#B07CF0',S:'#5BCB4A',Z:'#E85A5A',J:'#2F78E8',L:'#FF9A3C'};
  const rot=(cells,r,k)=>{let cs=cells.map(c=>c.slice());const n=k==='I'?4:3;for(let i=0;i<r;i++)cs=cs.map(([x,y])=>[n-1-y,x]);if(k==='O')return cells.map(c=>c.slice());return cs};
  const g={dur,t:0,over:false,fl:[],grid:Array.from({length:ROWS},()=>Array(COLS).fill(null)),bag:[],cur:null,next:null,fallT:0,lockT:0,lines:0,pts:0,combo:0,mx:0,clearing:null,
    held:{},rep:0,soft:false,flash:0};
  const bagNext=()=>{if(!g.bag.length)g.bag=shuffle(Object.keys(SH));return g.bag.pop()};
  const cellsOf=p=>rot(SH[p.k],p.r,p.k).map(([x,y])=>[x+p.x,y+p.y]);
  const fits=(p,grid=g.grid)=>cellsOf(p).every(([x,y])=>x>=0&&x<COLS&&y<ROWS&&(y<0||!grid[y][x]));
  const level=()=>Math.floor(g.lines/6);
  const spawn=()=>{g.cur={k:g.next||bagNext(),r:0,x:3,y:-1};g.next=bagNext();g.lockT=0;g.botPlan=null;
    if(!fits(g.cur)){g.grid=Array.from({length:ROWS},()=>Array(COLS).fill(null));g.combo=0;floatTxt(g.fl,400,200,t('blocks.full'),'#FF7A2F',28);tone(150,.4,'sawtooth',.06,.5)}};
  const lock=()=>{cellsOf(g.cur).forEach(([x,y])=>{if(y>=0)g.grid[y][x]=g.cur.k});
    const full=[];g.grid.forEach((row,y)=>{if(row.every(Boolean))full.push(y)});
    if(full.length){g.clearing={rows:full,t:.22};const add=[0,100,300,500,800][full.length]*(level()+1)+g.combo*50;g.pts+=add;g.combo++;g.mx=Math.max(g.mx,g.combo);g.lines+=full.length;
      floatTxt(g.fl,400,BY+full[0]*C,'+'+add,full.length>=4?'#FFD23F':'#fff',full.length>=4?32:24);full.length>=4?SFX.levelup():SFX.combo()}
    else{g.combo=0;tone(300,.04,'square',.03)}
    g.cur=null};
  const move=dx=>{const p={...g.cur,x:g.cur.x+dx};if(fits(p)){g.cur=p;g.lockT=0;return true}return false};
  const rotate=()=>{for(const dx of [0,-1,1,-2,2]){const p={...g.cur,r:(g.cur.r+1)%4,x:g.cur.x+dx};if(fits(p)){g.cur=p;g.lockT=0;tone(700,.03,'triangle',.03);return}}};
  const hard=()=>{let n=0;while(fits({...g.cur,y:g.cur.y+1})){g.cur.y++;n++}g.pts+=n*2;lock()};
  const BTN={L:{x:28,y:256,w:120,h:118},R:{x:160,y:256,w:120,h:118},ROT:{x:520,y:256,w:120,h:118},DN:{x:652,y:256,w:120,h:118}};
  const hit=(x,y)=>{for(const k in BTN){const b=BTN[k];if(x>=b.x&&x<=b.x+b.w&&y>=b.y&&y<=b.y+b.h)return k}if(x>=BX-20&&x<=BX+COLS*C+20&&y>=BY&&y<=BY+ROWS*C)return'DROP';return null};
  const press=k=>{if(!g.cur||g.clearing)return;if(k==='L'||k==='R'){move(k==='L'?-1:1);g.rep=.17}else if(k==='ROT')rotate();else if(k==='DROP')hard()};
  g.down=(x,y,id)=>{const k=hit(x,y);if(!k)return;g.held[id]=k;press(k)};g.up=id=>{delete g.held[id]};
  g.key=(k,d)=>{const m={ArrowLeft:'L',KeyA:'L',ArrowRight:'R',KeyD:'R',ArrowUp:'ROT',KeyW:'ROT',ArrowDown:'DN',KeyS:'DN',Space:'DROP'}[k];if(!m)return;if(d){g.held['k'+k]=m;press(m)}else delete g.held['k'+k]};
  spawn();
  g.update=dt=>{
    g.flash=Math.max(0,g.flash-dt);
    if(g.clearing){g.clearing.t-=dt;if(g.clearing.t<=0){const rows=g.clearing.rows;g.grid=g.grid.filter((r,y)=>!rows.includes(y));while(g.grid.length<ROWS)g.grid.unshift(Array(COLS).fill(null));g.clearing=null;spawn()}return}
    if(!g.cur){spawn();return}
    const hk=Object.values(g.held);const side=hk.includes('L')?-1:hk.includes('R')?1:0;g.soft=hk.includes('DN');
    if(side){g.rep-=dt;if(g.rep<=0){move(side);g.rep=.05}}
    const iv=g.soft?.04:Math.max(.09,.72-level()*.06);g.fallT+=dt;
    while(g.fallT>=iv&&g.cur){g.fallT-=iv;if(fits({...g.cur,y:g.cur.y+1})){g.cur.y++;if(g.soft)g.pts+=1}else{g.lockT+=iv;if(g.lockT>=.4){lock();break}}}
  };
  g.score=()=>g.pts;g.acc=()=>null;g.maxCombo=()=>g.mx;
  /* demostración: elige la mejor posición con una heurística sencilla */
  const evalGrid=grid=>{let agg=0,holes=0,bump=0,prev=null;for(let x=0;x<COLS;x++){let h=0;for(let y=0;y<ROWS;y++)if(grid[y][x]){h=ROWS-y;break}
    for(let y=ROWS-h;y<ROWS;y++)if(!grid[y][x])holes++;agg+=h;if(prev!=null)bump+=Math.abs(h-prev);prev=h}return{agg,holes,bump}};
  const plan=()=>{let best=null;for(let r=0;r<4;r++)for(let x=-2;x<COLS;x++){let p={k:g.cur.k,r,x,y:-1};if(!fits(p))continue;while(fits({...p,y:p.y+1}))p.y++;
    const gr=g.grid.map(row=>row.slice());let ok=true;cellsOf(p).forEach(([cx,cy])=>{if(cy<0)ok=false;else gr[cy][cx]=1});if(!ok)continue;
    const keep=gr.filter(row=>!row.every(Boolean)),lines=ROWS-keep.length;while(keep.length<ROWS)keep.unshift(Array(COLS).fill(null));const e=evalGrid(keep);
    const sc=-.51*e.agg+.76*lines-.36*e.holes-.18*e.bump;if(!best||sc>best.sc)best={sc,r,x}}return best};
  g.auto=dt=>{if(!g.cur||g.clearing)return;g._bt=(g._bt||0)-dt;if(g._bt>0)return;g._bt=.09;if(!g.botPlan)g.botPlan=plan()||{r:0,x:g.cur.x};
    const b=g.botPlan;if(g.cur.r!==b.r){botTap(g,BTN.ROT.x+60,BTN.ROT.y+59);return}if(g.cur.x<b.x){botTap(g,BTN.R.x+60,BTN.R.y+59);delete g.held.bot;return}
    if(g.cur.x>b.x){botTap(g,BTN.L.x+60,BTN.L.y+59);delete g.held.bot;return}botTap(g,400,200);delete g.held.bot};
  const cell=(c,x,y,k,ghost)=>{const px=BX+x*C,py=BY+y*C;if(ghost){c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=2;c.strokeRect(px+2,py+2,C-4,C-4);return}
    c.fillStyle=COL[k];c.fillRect(px,py,C,C);c.fillStyle='rgba(255,255,255,.4)';c.fillRect(px+2,py+2,C-6,3);c.fillStyle='rgba(0,0,0,.18)';c.fillRect(px+2,py+C-4,C-4,2);c.strokeStyle=INK;c.lineWidth=2;c.strokeRect(px+1,py+1,C-2,C-2)};
  g.draw=c=>{
    skyBg(c,'#6C5CE7','#A29BFE');c.fillStyle='rgba(255,255,255,.08)';for(let i=0;i<12;i++){c.fillRect((i*97+g.t*10)%860-30,(i*53)%400,40,40)}
    rr(c,BX-8,BY-8,COLS*C+16,ROWS*C+16,12);outlined(c,'#1F2A3A',4);
    c.strokeStyle='rgba(255,255,255,.06)';c.lineWidth=1;for(let x=1;x<COLS;x++){c.beginPath();c.moveTo(BX+x*C,BY);c.lineTo(BX+x*C,BY+ROWS*C);c.stroke()}
    g.grid.forEach((row,y)=>row.forEach((k,x)=>{if(k)cell(c,x,y,k)}));
    if(g.clearing){c.fillStyle=`rgba(255,255,255,${.5+.5*Math.sin(g.t*40)})`;g.clearing.rows.forEach(y=>c.fillRect(BX,BY+y*C,COLS*C,C))}
    if(g.cur){let gh={...g.cur};while(fits({...gh,y:gh.y+1}))gh.y++;cellsOf(gh).forEach(([x,y])=>{if(y>=0)cell(c,x,y,null,true)});cellsOf(g.cur).forEach(([x,y])=>{if(y>=0)cell(c,x,y,g.cur.k)})}
    rr(c,BX+COLS*C+24,BY,104,96,12);outlined(c,'rgba(255,253,246,.92)',3);txt(c,t('blocks.next'),BX+COLS*C+76,BY+16,11,{align:'center',font:'Press Start 2P',stroke:false,fill:INK});
    if(g.next){const cs=SH[g.next],minx=Math.min(...cs.map(c=>c[0])),maxx=Math.max(...cs.map(c=>c[0]));cs.forEach(([x,y])=>{const px=BX+COLS*C+76-(maxx-minx+1)*8+(x-minx)*16,py=BY+40+y*16;c.fillStyle=COL[g.next];c.fillRect(px,py,16,16);c.strokeStyle=INK;c.lineWidth=2;c.strokeRect(px,py,16,16)})}
    txt(c,t('blocks.lines')+' '+g.lines,BX+COLS*C+24,BY+120,12,{font:'Press Start 2P',sw:.5});txt(c,'NIVEL '+(level()+1),BX+COLS*C+24,BY+144,12,{font:'Press Start 2P',sw:.5,fill:'#FFD23F'});
    hud(c,g,{combo:g.combo,mult:g.combo});
    const hk=Object.values(g.held);
    const btn=(b,on,draw)=>{rr(c,b.x,b.y+(on?4:0),b.w,b.h,18);outlined(c,on?'#FFD23F':'rgba(255,253,246,.85)',3.5);c.save();c.translate(b.x+b.w/2,b.y+b.h/2+(on?4:0));c.fillStyle=INK;c.strokeStyle=INK;draw();c.restore()};
    const tri=(dx,dy)=>{c.beginPath();if(dy){c.moveTo(-20,-12);c.lineTo(20,-12);c.lineTo(0,18)}else{c.moveTo(dx*20,0);c.lineTo(-dx*14,-22);c.lineTo(-dx*14,22)}c.closePath();c.fill()};
    btn(BTN.L,hk.includes('L'),()=>tri(-1,0));btn(BTN.R,hk.includes('R'),()=>tri(1,0));btn(BTN.DN,hk.includes('DN'),()=>tri(0,1));
    btn(BTN.ROT,hk.includes('ROT'),()=>{c.lineWidth=7;c.beginPath();c.arc(0,0,22,-.4,Math.PI*1.4);c.stroke();c.beginPath();c.moveTo(20,-28);c.lineTo(28,-6);c.lineTo(6,-10);c.closePath();c.fill()});
    drawFloats(c,g.fl,1/60);
  };
  return g;
}});

/* ---------- Indios vs Conquistadores ---------- */
registerGame({id:'village_defense',name:{es:'Indios vs Conquistadores',en:'Natives vs Conquistadors'},category:'precision',duration:75,difficulty:2,cap:60000,phase:5,
  desc:{es:'Defiende tu aldea: dispara flechas a los conquistadores que llegan en oleadas y elige mejoras.',en:'Defend your village: shoot arrows at the conquistadors arriving in waves and pick upgrades.'},
  tips:{es:{ctrl:'Toca donde quieres que vaya la flecha',plus:'Soldado +100 · lancero +150 · jinete +250 · armadura +300 · oleada completa +200 · entre oleadas eliges una mejora',minus:'Si un conquistador llega a la aldea pierdes un corazón (tienes 5)'},
        en:{ctrl:'Tap where you want the arrow to go',plus:'Soldier +100 · spearman +150 · rider +250 · armored +300 · wave cleared +200 · pick an upgrade between waves',minus:'If a conquistador reaches the village you lose a heart (you have 5)'}},ctrlIcon:'tap',
  sim:k=>({raw:(800+Math.random()*5500)*k,acc:rand(.4,.85)}),
  create(dur){
  const GY=332,BOW={x:122,y:226};
  const TYPES={sold:{hp:1,v:46,pts:100,r:24},runner:{hp:1,v:88,pts:150,r:22},horse:{hp:2,v:100,pts:250,r:34},knight:{hp:3,v:30,pts:300,r:26}};
  const g={dur,t:0,over:false,fl:[],lives:5,wave:0,toSpawn:0,spawnT:0,enemies:[],arrows:[],reload:0,rate:.55,multi:1,pierce:false,shots:0,hits:0,kills:0,pts:0,streak:0,mx:0,
    pick:null,aim:{x:600,y:300},shake:0,banner:0};
  const nextWave=()=>{g.wave++;g.toSpawn=4+g.wave*2;g.spawnT=1.2;g.banner=1.6};
  const pickType=()=>{const r=Math.random(),w=g.wave;if(w>=3&&r<.14)return'horse';if(w>=2&&r<.22+.04*w)return Math.random()<.5?'knight':'runner';if(r<.35)return'runner';return'sold'};
  nextWave();
  const UPS=['speed','multi','fire','heal'];
  const card=i=>({x:i?420:160,y:120,w:220,h:170});
  g.down=(x,y)=>{
    if(g.pick){g.pick.opts.forEach((o,i)=>{const b=card(i);if(x>=b.x&&x<=b.x+b.w&&y>=b.y&&y<=b.y+b.h)apply(o)});return}
    g.aim={x,y};if(g.reload>0)return;g.reload=g.rate;g.shots++;
    const a=Math.atan2(y-BOW.y,x-BOW.x);for(let i=0;i<g.multi;i++){const off=(i-(g.multi-1)/2)*.09;g.arrows.push({x:BOW.x,y:BOW.y,vx:Math.cos(a+off)*760,vy:Math.sin(a+off)*760,hitSet:new Set(),scored:false})}
    tone(620,.07,'triangle',.05,.6)};
  const apply=o=>{if(o==='speed')g.rate=Math.max(.18,g.rate*.72);else if(o==='multi')g.multi=Math.min(5,g.multi+1);else if(o==='fire')g.pierce=true;else g.lives=Math.min(5,g.lives+1);
    g.pick=null;SFX.levelup();nextWave()};
  g.update=dt=>{
    g.shake=Math.max(0,g.shake-dt);g.banner=Math.max(0,g.banner-dt);
    if(g.pick){g.pick.t-=dt;if(g.pick.t<=0)apply(g.pick.opts[0]);return}
    g.reload=Math.max(0,g.reload-dt);
    if(g.toSpawn>0){g.spawnT-=dt;if(g.spawnT<=0){const k=pickType(),T=TYPES[k];g.enemies.push({k,hp:T.hp,x:850,y:GY-rand(0,26),v:T.v*(1+g.wave*.05),ph:Math.random()*6,hurt:0});g.toSpawn--;g.spawnT=Math.max(.45,1.5-g.wave*.1)*rand(.6,1.3)}}
    g.enemies.forEach(e=>{if(e.dead!=null){e.dead+=dt;return}e.x-=e.v*dt;e.ph+=dt*e.v/9;e.hurt=Math.max(0,e.hurt-dt);
      if(e.x<150){e.dead=0;e.escaped=1;g.lives--;g.streak=0;g.shake=.4;tone(110,.35,'square',.08,.5);if(g.lives<=0)g.over=true}});
    g.arrows.forEach(a=>{a.vy+=260*dt;a.x+=a.vx*dt;a.y+=a.vy*dt;
      for(const e of g.enemies){if(e.dead!=null||a.hitSet.has(e))continue;const T=TYPES[e.k];if(Math.hypot(a.x-e.x,a.y-(e.y-34))<T.r+6){a.hitSet.add(e);e.hp--;e.hurt=.18;if(!a.scored){a.scored=true;g.hits++}
        if(e.hp<=0){e.dead=0;g.kills++;g.streak++;g.mx=Math.max(g.mx,g.streak);const p=T.pts*comboMult(g.streak);g.pts+=p;floatTxt(g.fl,e.x,e.y-80,'+'+p,'#FFD23F',22);tone(880,.08,'square',.05,1.4)}else tone(300,.05,'square',.04)
        if(!g.pierce){a.done=1;break}}}
      if(a.y>GY+10||a.x>820||a.y<-40)a.done=1});
    g.arrows=g.arrows.filter(a=>!a.done);g.enemies=g.enemies.filter(e=>e.dead==null||e.dead<.7);
    if(g.toSpawn<=0&&!g.enemies.length&&!g.over){g.pts+=200;floatTxt(g.fl,400,150,'+200','#5BCB4A',28);const o=shuffle(UPS.filter(u=>!(u==='fire'&&g.pierce)&&!(u==='heal'&&g.lives>=5)&&!(u==='multi'&&g.multi>=5))).slice(0,2);g.pick={opts:o,t:4.5}}
  };
  g.score=()=>g.pts;g.acc=()=>g.shots?g.hits/g.shots:null;g.maxCombo=()=>g.mx;
  g.auto=dt=>{if(g.pick){if(g.pick.t<3.6){const b=card(0);botTap(g,b.x+b.w/2,b.y+b.h/2)}return}
    if(g.reload>0)return;const e=g.enemies.filter(e=>e.dead==null&&e.x<620).sort((a,b)=>a.x-b.x)[0];if(!e)return;
    const d=Math.hypot(e.x-BOW.x,e.y-34-BOW.y)/760,tx=e.x-e.v*d,ty=e.y-34-120*d*d;g._bt=(g._bt||0)-dt;if(g._bt>0)return;g._bt=.25;botTap(g,tx,ty)};
  /* ---- dibujo ---- */
  const pyramid=(x,y,s)=>{for(let i=0;i<5;i++){const w=(150-i*26)*s,h=18*s;c0.fillStyle=i%2?'#B9A27A':'#C9B48A';c0.fillRect(x-w/2,y-(i+1)*h,w,h);c0.strokeStyle='rgba(31,42,58,.35)';c0.lineWidth=2;c0.strokeRect(x-w/2,y-(i+1)*h,w,h)}
    c0.fillStyle='#A58E66';c0.fillRect(x-14*s,y-5*18*s-20*s,28*s,20*s);c0.fillStyle='#5E4A33';c0.fillRect(x-6*s,y-5*18*s-14*s,12*s,14*s)};
  let c0=null;
  function warrior(c){const a=Math.atan2(g.aim.y-BOW.y,g.aim.x-BOW.x);c.save();c.translate(BOW.x-18,BOW.y+8);
    c.lineWidth=4;c.strokeStyle=INK;c.lineCap='round';
    c.beginPath();c.moveTo(0,10);c.lineTo(-8,60);c.moveTo(0,10);c.lineTo(10,60);c.stroke();
    rr(c,-14,-16,28,36,10);outlined(c,'#C9773E',4);c.fillStyle='#E8C468';c.fillRect(-14,12,28,8);c.strokeRect(-14,12,28,8);
    c.beginPath();c.arc(2,-30,15,0,7);outlined(c,'#B5733F',4);
    c.beginPath();c.arc(2,-34,15,Math.PI*1.05,Math.PI*1.95);c.fillStyle='#1F2A3A';c.fill();
    c.fillStyle='#E85A5A';c.fillRect(-13,-38,30,6);c.strokeRect(-13,-38,30,6);
    c.save();c.translate(-8,-40);c.rotate(-.4);c.beginPath();c.ellipse(0,-14,5,15,0,0,7);outlined(c,'#5BCB4A',3);c.restore();
    c.save();c.translate(-2,-42);c.rotate(-.15);c.beginPath();c.ellipse(0,-14,4,13,0,0,7);outlined(c,'#FFD23F',3);c.restore();
    c.fillStyle=INK;c.beginPath();c.arc(9,-30,2.2,0,7);c.fill();
    c.translate(18,-8);c.rotate(a);c.lineWidth=5;c.strokeStyle='#8A5A35';c.beginPath();c.arc(0,0,36,-1.2,1.2);c.stroke();
    const pull=g.reload>0?0:12;c.lineWidth=1.5;c.strokeStyle='#fff';c.beginPath();c.moveTo(Math.cos(-1.2)*36,Math.sin(-1.2)*36);c.lineTo(-pull,0);c.lineTo(Math.cos(1.2)*36,Math.sin(1.2)*36);c.stroke();
    if(!g.reload){c.strokeStyle=INK;c.lineWidth=3;c.beginPath();c.moveTo(-pull,0);c.lineTo(40,0);c.stroke();c.fillStyle='#9AA3AF';c.beginPath();c.moveTo(46,0);c.lineTo(38,-5);c.lineTo(38,5);c.fill()}
    c.lineWidth=4;c.strokeStyle=INK;c.beginPath();c.moveTo(-26,6);c.lineTo(0,0);c.stroke();
    c.restore()}
  function enemy(c,e){const T=TYPES[e.k],s=e.k==='horse'?1:1;c.save();c.translate(e.x,e.y);
    if(e.dead!=null){c.globalAlpha=Math.max(0,1-e.dead/.7);if(!e.escaped){c.rotate(Math.min(1.4,e.dead*4));c.translate(0,e.dead*20)}}
    if(e.hurt>0)c.translate(rand(-3,3),0);
    const legs=(y0)=>{c.lineWidth=5;c.strokeStyle=INK;c.lineCap='round';const s1=Math.sin(e.ph)*12;c.beginPath();c.moveTo(0,y0);c.lineTo(s1,0);c.moveTo(0,y0);c.lineTo(-s1,0);c.stroke()};
    if(e.k==='horse'){c.save();const b=Math.sin(e.ph*1.3)*3;c.translate(0,b);
      c.lineWidth=5;c.strokeStyle=INK;const s1=Math.sin(e.ph)*10;[[-26,s1],[-14,-s1],[18,-s1],[30,s1]].forEach(([x,d])=>{c.beginPath();c.moveTo(x,-26);c.lineTo(x+d,0);c.stroke()});
      rr(c,-34,-46,74,26,13);outlined(c,'#8A5A35',4);c.beginPath();c.moveTo(-28,-40);c.lineTo(-48,-62);c.lineTo(-58,-56);c.lineTo(-44,-34);c.closePath();outlined(c,'#8A5A35',4);
      c.fillStyle=INK;c.fillRect(-44,-62,8,14);c.translate(4,-44);c.scale(.85,.85)}
    else legs(-26);
    const body=e.k==='knight'?'#AEB8C4':'#D9534F';
    rr(c,-14,-58,28,34,8);outlined(c,body,4);
    if(e.k!=='knight'){c.fillStyle='#FFD23F';c.fillRect(-14,-46,28,6);c.strokeStyle=INK;c.lineWidth=2;c.strokeRect(-14,-46,28,6);rr(c,-11,-56,22,14,5);outlined(c,'#C9D2DC',3)}
    c.beginPath();c.arc(0,-72,13,0,7);outlined(c,'#F2C9A0',4);
    c.fillStyle='#6B3A1E';c.beginPath();c.moveTo(-10,-68);c.quadraticCurveTo(0,-54,10,-68);c.lineTo(8,-66);c.quadraticCurveTo(0,-60,-8,-66);c.fill();
    c.fillStyle=INK;c.beginPath();c.arc(-5,-74,2,0,7);c.fill();
    c.beginPath();c.moveTo(-22,-80);c.quadraticCurveTo(0,-74,22,-80);c.quadraticCurveTo(14,-86,10,-88);c.quadraticCurveTo(0,-104,-10,-88);c.quadraticCurveTo(-14,-86,-22,-80);c.closePath();outlined(c,'#C9D2DC',4);
    c.fillStyle='rgba(255,255,255,.6)';c.fillRect(-4,-96,3,8);
    if(e.k==='knight'){rr(c,-26,-56,16,26,6);outlined(c,'#8E9AA8',3.5);c.fillStyle='#E85A5A';c.fillRect(-22,-48,8,8)}
    else{c.lineWidth=3.5;c.strokeStyle='#8A5A35';c.beginPath();c.moveTo(-22,-30);c.lineTo(-30,-96);c.stroke();c.fillStyle='#C9D2DC';c.beginPath();c.moveTo(-30,-108);c.lineTo(-35,-94);c.lineTo(-26,-95);c.closePath();c.fill();c.strokeStyle=INK;c.lineWidth=2;c.stroke()}
    if(e.k==='horse')c.restore();
    if(T.hp>1&&e.dead==null){for(let i=0;i<T.hp;i++){c.fillStyle=i<e.hp?'#E85A5A':'rgba(31,42,58,.3)';c.fillRect(-T.hp*7+i*14,-120,11,6)}}
    c.restore()}
  function upIcon(c,o,x,y){c.save();c.translate(x,y);c.lineWidth=3.5;c.strokeStyle=INK;
    if(o==='speed'){c.beginPath();c.moveTo(6,-30);c.lineTo(-14,4);c.lineTo(0,4);c.lineTo(-6,30);c.lineTo(16,-6);c.lineTo(2,-6);c.closePath();outlined(c,'#FFD23F',3.5)}
    else if(o==='multi'){[-14,0,14].forEach(d=>{c.beginPath();c.moveTo(-26,d+8);c.lineTo(18,d-8);c.stroke();c.beginPath();c.moveTo(26,d-11);c.lineTo(14,d-12);c.lineTo(18,d-2);c.closePath();outlined(c,'#9AA3AF',2.5)})}
    else if(o==='fire'){c.beginPath();c.moveTo(0,30);c.quadraticCurveTo(-24,24,-18,0);c.quadraticCurveTo(-12,-14,0,-32);c.quadraticCurveTo(6,-12,14,-14);c.quadraticCurveTo(26,10,0,30);outlined(c,'#FF7A2F',3.5);c.beginPath();c.moveTo(0,26);c.quadraticCurveTo(-10,18,-6,6);c.quadraticCurveTo(0,-4,4,-12);c.quadraticCurveTo(14,10,0,26);c.fillStyle='#FFD23F';c.fill()}
    else heart(c,0,0,true,2.6);c.restore()}
  g.draw=c=>{
    c0=c;c.save();if(g.shake>0)c.translate(rand(-6,6),rand(-4,4));
    skyBg(c,'#FFB36B','#FFE1A8');c.fillStyle='rgba(255,255,255,.5)';c.beginPath();c.arc(640,90,40,0,7);c.fill();
    c.fillStyle='#7CB86A';c.beginPath();c.moveTo(0,260);c.quadraticCurveTo(200,200,420,250);c.quadraticCurveTo(620,210,800,250);c.lineTo(800,400);c.lineTo(0,400);c.fill();
    pyramid(300,262,.9);pyramid(560,258,.6);
    c.fillStyle='#4F9A4A';for(let i=0;i<9;i++){const x=i*100+20;c.beginPath();c.arc(x,268,30,0,7);c.fill()}
    c.fillStyle='#D9B77E';c.fillRect(0,GY-6,800,80);c.fillStyle='#C9A46B';c.fillRect(0,GY+18,800,4);
    c.fillStyle='#8A5A35';for(let x=4;x<150;x+=18){rr(c,x,236,14,100,4);c.fill()}c.strokeStyle=INK;c.lineWidth=3;for(let x=4;x<150;x+=18){rr(c,x,236,14,100,4);c.stroke()}
    rr(c,40,252,110,16,4);outlined(c,'#A8743F',3);
    g.enemies.slice().sort((a,b)=>a.y-b.y).forEach(e=>enemy(c,e));
    warrior(c);
    g.arrows.forEach(a=>{const an=Math.atan2(a.vy,a.vx);c.save();c.translate(a.x,a.y);c.rotate(an);c.strokeStyle=g.pierce?'#FF7A2F':INK;c.lineWidth=3;c.beginPath();c.moveTo(-22,0);c.lineTo(10,0);c.stroke();
      c.fillStyle=g.pierce?'#FFD23F':'#9AA3AF';c.beginPath();c.moveTo(16,0);c.lineTo(8,-5);c.lineTo(8,5);c.fill();c.fillStyle='#E85A5A';c.fillRect(-24,-4,6,8);c.restore()});
    c.restore();
    drawFloats(c,g.fl,1/60);
    hud(c,g,{combo:g.streak});
    for(let i=0;i<5;i++)heart(c,24+i*24,56,i<g.lives);
    txt(c,t('vd.wave',{n:g.wave}),400,26,15,{font:'Press Start 2P',align:'center',sw:.45,fill:'#FFD23F'});
    if(g.banner>0&&!g.pick){c.globalAlpha=Math.min(1,g.banner);txt(c,t('vd.wave',{n:g.wave}),400,180,34,{font:'Press Start 2P',align:'center',fill:'#FFD23F',sw:.4});c.globalAlpha=1}
    if(g.pick){c.fillStyle='rgba(31,42,58,.55)';c.fillRect(0,0,800,400);txt(c,t('vd.pick'),400,86,20,{font:'Press Start 2P',align:'center',fill:'#FFD23F',sw:.4});
      g.pick.opts.forEach((o,i)=>{const b=card(i);rr(c,b.x,b.y+6,b.w,b.h,18);c.fillStyle=INK;c.fill();rr(c,b.x,b.y,b.w,b.h,18);outlined(c,'#FFFDF6',4);
        upIcon(c,o,b.x+b.w/2,b.y+54);
        txt(c,t('vd.up.'+o),b.x+b.w/2,b.y+104,24,{align:'center',fill:'#FFD23F'});txt(c,t('vd.up.'+o+'.d'),b.x+b.w/2,b.y+138,15,{align:'center',font:'Nunito',stroke:false,fill:INK})});
      txt(c,Math.ceil(g.pick.t)+'',400,330,22,{font:'Press Start 2P',align:'center',sw:.4})}
  };
  return g;
}});

/* ---------- ¡Que no te aplasten! ---------- */
registerGame({id:'rat_run',name:{es:'¡Que no te aplasten!',en:'Don\'t Get Squashed!'},category:'reflex',duration:60,difficulty:2,cap:40000,phase:5,
  desc:{es:'Eres una rata en la oficina: mira la sombra y quítate antes de que caiga el pie.',en:'You are an office rat: watch the shadow and move before the foot comes down.'},
  tips:{es:{ctrl:'Mantén IZQUIERDA o DERECHA para correr (eres rápida)',plus:'Cada pisotón que esquivas +50 (más en racha) · queso +100',minus:'Si te aplastan pierdes una vida (tienes 3)'},
        en:{ctrl:'Hold LEFT or RIGHT to run (you are fast)',plus:'Each stomp you dodge +50 (more on a streak) · cheese +100',minus:'Getting squashed costs a life (you have 3)'}},ctrlIcon:'buttons',
  sim:k=>({raw:(300+Math.random()*4200)*k,acc:rand(.6,.95)}),
  create(dur){
  const FY=330;
  const g={dur,t:0,over:false,fl:[],ptrs:new Map(),keys:{},lives:3,x:400,vx:0,face:1,feet:[],cheese:[],spawnT:1.2,cheeseT:3,inv:0,dodged:0,streak:0,mx:0,pts:0,squash:0,steer:0,run:0};
  g.down=(x,y,id)=>g.ptrs.set(id,x);g.up=id=>g.ptrs.delete(id);g.key=(k,d)=>{g.keys[k]=d};
  const spawnFoot=(x)=>{const warn=Math.max(.45,1.05-g.t*.01);g.feet.push({x:clamp(x,60,740),st:'warn',tt:0,warn,w:110,kind:Math.random()*3|0})};
  g.update=dt=>{
    g.steer=holdSide(g);if(g.steer)g.face=g.steer;g.inv=Math.max(0,g.inv-dt);g.squash=Math.max(0,g.squash-dt);
    const tv=g.squash>0?0:g.steer*520;g.vx+=(tv-g.vx)*Math.min(1,dt*14);g.x=clamp(g.x+g.vx*dt,30,770);g.run+=Math.abs(g.vx)*dt*.06;
    g.spawnT-=dt;if(g.spawnT<=0){g.spawnT=Math.max(.38,1.15-g.t*.013)*rand(.75,1.2);spawnFoot(Math.random()<.6?g.x+rand(-60,60):rand(60,740));if(g.t>20&&Math.random()<.3)spawnFoot(rand(60,740))}
    g.cheeseT-=dt;if(g.cheeseT<=0){g.cheeseT=rand(2.5,4.5);g.cheese.push({x:rand(60,740),life:4.5})}
    g.feet.forEach(f=>{f.tt+=dt;
      if(f.st==='warn'&&f.tt>=f.warn){f.st='fall';f.tt=0}
      else if(f.st==='fall'&&f.tt>=.11){f.st='down';f.tt=0;tone(70,.12,'square',.07,.6);f.check=1}
      else if(f.st==='down'&&f.tt>=.38){f.st='up';f.tt=0;if(!f.hit){g.dodged++;g.streak++;g.mx=Math.max(g.mx,g.streak);const p=50*comboMult(g.streak);g.pts+=p;floatTxt(g.fl,f.x,FY-60,'+'+p,'#fff',20)}}
      else if(f.st==='up'&&f.tt>=.3)f.gone=1;
      if((f.st==='down'&&f.tt<.3)&&!f.hit&&g.inv<=0&&Math.abs(g.x-(f.x+12))<f.w/2-2){f.hit=1;g.lives--;g.streak=0;g.inv=1.4;g.squash=.6;tone(120,.4,'sawtooth',.08,.4);if(g.lives<=0)g.over=true}});
    g.feet=g.feet.filter(f=>!f.gone);
    g.cheese=g.cheese.filter(k=>{k.life-=dt;if(Math.abs(k.x-g.x)<34&&g.squash<=0){g.pts+=100;floatTxt(g.fl,k.x,FY-50,t('rat.cheese')+' +100','#FFD23F',22);tone(1100,.08,'square',.05,1.4);return false}return k.life>0});
  };
  g.score=()=>g.pts;g.acc=()=>g.dodged+(3-g.lives)?g.dodged/(g.dodged+(3-g.lives)):null;g.maxCombo=()=>g.mx;
  g.auto=dt=>{const danger=x=>g.feet.some(f=>(f.st!=='up')&&Math.abs(x-(f.x+12))<f.w/2+26);let tx=g.x;
    if(danger(g.x)){let best=null;for(let x=40;x<=760;x+=20)if(!danger(x)&&(best==null||Math.abs(x-g.x)<Math.abs(best-g.x)))best=x;if(best!=null)tx=best}
    else{const k=g.cheese.filter(k=>!danger(k.x)).sort((a,b)=>Math.abs(a.x-g.x)-Math.abs(b.x-g.x))[0];if(k)tx=k.x}
    g.ptrs.delete('bot');if(Math.abs(tx-g.x)>12){const r=tx>g.x;g.ptrs.set('bot',r?700:100);g.hand={x:r?722:78,y:340,p:.2,hold:1}}else if(g.hand)g.hand.hold=0};
  function foot(c,f){let y;if(f.st==='warn')return;if(f.st==='fall')y=-260+(FY+260)*Math.min(1,f.tt/.11);else if(f.st==='down')y=FY;else y=FY-(FY+260)*Math.min(1,f.tt/.3);
    c.save();c.translate(f.x,y);const pant=['#2E3A6E','#4A4F5C','#6B4A3A'][f.kind],shoe=['#1F2A3A','#C0392B','#F4F4F4'][f.kind];
    rr(c,-34,-420,58,392,10);outlined(c,pant,4);
    c.beginPath();c.moveTo(-40,-34);c.lineTo(28,-34);c.quadraticCurveTo(70,-30,70,-10);c.lineTo(70,0);c.lineTo(-44,0);c.closePath();outlined(c,shoe,4);
    if(f.kind===2){c.fillStyle='#2FA8E8';c.fillRect(-20,-24,50,6)}else{c.fillStyle='rgba(255,255,255,.35)';c.fillRect(10,-28,30,4)}
    c.fillStyle=INK;c.fillRect(-44,-6,114,6);c.restore()}
  function rat(c){if(g.inv>0&&(g.t*12|0)%2&&g.squash<=0)return;c.save();c.translate(g.x,FY);c.scale(g.face,1);
    if(g.squash>0){c.scale(1.4,.35)}
    const b=Math.sin(g.run*6)*2;
    c.strokeStyle='#F7A8C4';c.lineWidth=4;c.lineCap='round';c.beginPath();c.moveTo(-26,-12);c.quadraticCurveTo(-48,-14,-50,-32);c.stroke();
    c.lineWidth=3.5;c.strokeStyle=INK;[-12,12].forEach((x,i)=>{const s=Math.sin(g.run*8+i*3)*6;c.beginPath();c.moveTo(x,-8);c.lineTo(x+s,0);c.stroke()});
    c.beginPath();c.ellipse(0,-18+b,30,16,0,0,7);outlined(c,'#B7BCC6',4);
    c.beginPath();c.ellipse(26,-24+b,14,12,-.2,0,7);outlined(c,'#B7BCC6',4);
    c.beginPath();c.arc(20,-38+b,8,0,7);outlined(c,'#F7A8C4',3.5);
    c.fillStyle=INK;c.beginPath();c.arc(30,-27+b,2.5,0,7);c.fill();c.fillStyle='#F7A8C4';c.beginPath();c.arc(40,-22+b,3.5,0,7);c.fill();
    c.strokeStyle=INK;c.lineWidth=1.5;c.beginPath();c.moveTo(40,-21+b);c.lineTo(52,-26+b);c.moveTo(40,-20+b);c.lineTo(52,-17+b);c.stroke();
    c.restore()}
  g.draw=c=>{
    c.fillStyle='#F3E9D2';c.fillRect(0,0,800,400);
    c.fillStyle='#E6D7B8';for(let x=0;x<800;x+=120)c.fillRect(x,0,60,FY);
    c.fillStyle='#8FB3D9';rr(c,520,70,180,120,8);c.fill();c.strokeStyle=INK;c.lineWidth=4;c.stroke();c.beginPath();c.moveTo(610,70);c.lineTo(610,190);c.moveTo(520,130);c.lineTo(700,130);c.stroke();
    rr(c,90,110,110,80,6);outlined(c,'#fff',4);c.fillStyle='#5BCB4A';c.fillRect(104,150,20,30);c.fillStyle='#2FA8E8';c.fillRect(132,135,20,45);c.fillStyle='#E85A5A';c.fillRect(160,160,20,20);
    c.fillStyle='#7A5232';c.fillRect(0,FY-12,800,12);c.fillStyle='#B07A4A';c.fillRect(0,FY,800,70);
    c.strokeStyle='rgba(31,42,58,.25)';c.lineWidth=2;for(let x=0;x<800;x+=90){c.beginPath();c.moveTo(x,FY);c.lineTo(x,400);c.stroke()}
    c.fillStyle=INK;c.beginPath();c.arc(40,FY,26,Math.PI,0);c.fill();
    g.feet.forEach(f=>{const k=f.st==='warn'?f.tt/f.warn:1;if(f.st==='up'&&f.tt>.15)return;c.fillStyle=`rgba(31,42,58,${.15+.45*k})`;c.beginPath();c.ellipse(f.x+12,FY+4,f.w/2*(.35+.65*k),10*(.4+.6*k),0,0,7);c.fill()});
    g.cheese.forEach(k=>{c.save();c.translate(k.x,FY);c.globalAlpha=k.life<1?k.life:1;c.beginPath();c.moveTo(-18,0);c.lineTo(18,0);c.lineTo(18,-20);c.closePath();outlined(c,'#FFD23F',3.5);c.fillStyle='#F5B400';c.beginPath();c.arc(8,-6,3,0,7);c.fill();c.restore()});
    rat(c);g.feet.forEach(f=>foot(c,f));
    drawFloats(c,g.fl,1/60);
    hud(c,g,{combo:g.streak,lives:g.lives,lives0:3});
    sideArrows(c,g.steer,312);
  };
  return g;
}});

/* ---------- Pelotas y flechas ---------- */
registerGame({id:'color_arrows',name:{es:'Pelotas y flechas',en:'Balls & Arrows'},category:'speed',duration:45,difficulty:2,cap:60000,phase:5,
  desc:{es:'Tu flecha tiene un color: revienta rápido una pelota del mismo color.',en:'Your arrow has a color: quickly pop a ball of the same color.'},
  tips:{es:{ctrl:'Toca una pelota del MISMO color que tu flecha (abajo)',plus:'+100 por pelota (más en racha) · pelota arcoíris +250',minus:'Color equivocado −50 · la bomba negra −200'},
        en:{ctrl:'Tap a ball of the SAME color as your arrow (bottom)',plus:'+100 per ball (more on a streak) · rainbow ball +250',minus:'Wrong color −50 · the black bomb −200'}},ctrlIcon:'tap',
  sim:k=>({raw:(800+Math.random()*6000)*k,acc:rand(.5,.95)}),
  create(dur){
  const COLS=['#E85A5A','#2FA8E8','#FFD23F','#5BCB4A'],BOW={x:400,y:372};
  const g={dur,t:0,over:false,fl:[],balls:[],spawnT:0,cur:0,next:1,shots:[],hits:0,miss:0,streak:0,mx:0,pts:0,cool:0,pops:[]};
  const pickColor=()=>{const on=g.balls.filter(b=>b.k==='n').map(b=>b.c);return on.length&&Math.random()<.85?on[Math.random()*on.length|0]:Math.random()*4|0};
  g.cur=0;g.next=Math.random()*4|0;
  g.down=(x,y)=>{if(g.cool>0)return;let b=null,bd=1e9;g.balls.forEach(o=>{const d=Math.hypot(o.x-x,o.y-y);if(d<o.r+16&&d<bd){bd=d;b=o}});
    g.cool=.12;g.shots.push({x0:BOW.x,y0:BOW.y,x,y,tt:0,c:g.cur});
    if(b){b.dead=1;if(b.k==='bomb'){g.pts-=200;g.streak=0;g.miss++;floatTxt(g.fl,b.x,b.y,'−200','#E85A5A',26);tone(90,.35,'sawtooth',.08,.5)}
      else if(b.k==='rain'||b.c===g.cur){g.hits++;g.streak++;g.mx=Math.max(g.mx,g.streak);const p=(b.k==='rain'?250:100)*comboMult(g.streak);g.pts+=p;floatTxt(g.fl,b.x,b.y-10,'+'+p,'#fff',24);tone(700+g.streak*20,.07,'square',.05,1.5);g.pops.push({x:b.x,y:b.y,c:b.k==='rain'?'#fff':COLS[b.c],t:0})}
      else{g.pts-=50;g.miss++;g.streak=0;floatTxt(g.fl,b.x,b.y-10,t('ca.wrong'),'#E85A5A',20);tone(160,.2,'square',.06,.6);b.dead=0}}
    g.cur=g.next;g.next=pickColor()};
  g.update=dt=>{g.cool=Math.max(0,g.cool-dt);
    g.spawnT-=dt;if(g.spawnT<=0){g.spawnT=Math.max(.28,.85-g.t*.012);const r=Math.random();g.balls.push({x:rand(70,730),y:430,r:rand(24,32),v:rand(55,85)+g.t*1.6,c:Math.random()*4|0,k:r<.06?'rain':r<.12?'bomb':'n',w:Math.random()*6})}
    g.balls.forEach(b=>{b.y-=b.v*dt;b.w+=dt*2;b.x+=Math.sin(b.w)*14*dt});
    g.balls=g.balls.filter(b=>{if(b.dead)return false;if(b.y<-40){if(b.k!=='bomb'&&b.c===g.cur)g.streak=0;return false}return true});
    g.shots.forEach(s=>s.tt+=dt*7);g.shots=g.shots.filter(s=>s.tt<1);g.pops.forEach(p=>p.t+=dt*3);g.pops=g.pops.filter(p=>p.t<1);
    g.pts=Math.max(0,g.pts)};
  g.score=()=>g.pts;g.acc=()=>g.hits+g.miss?g.hits/(g.hits+g.miss):null;g.maxCombo=()=>g.mx;
  g.auto=dt=>{g._bt=(g._bt||0)-dt;if(g._bt>0)return;const b=g.balls.filter(b=>b.k!=='bomb'&&(b.k==='rain'||b.c===g.cur)&&b.y<370&&b.y>40).sort((a,b)=>a.y-b.y)[0];if(b){g._bt=rand(.3,.55);botTap(g,b.x,b.y-b.v*.05)}};
  const ball=(c,b)=>{c.save();c.translate(b.x,b.y);c.beginPath();c.arc(0,0,b.r,0,7);
    if(b.k==='rain'){const gr=c.createLinearGradient(-b.r,-b.r,b.r,b.r);COLS.forEach((cl,i)=>gr.addColorStop(i/3,cl));c.fillStyle=gr}else c.fillStyle=b.k==='bomb'?'#2A2F3A':COLS[b.c];
    c.fill();c.lineWidth=4;c.strokeStyle=INK;c.stroke();c.fillStyle='rgba(255,255,255,.45)';c.beginPath();c.ellipse(-b.r*.35,-b.r*.4,b.r*.28,b.r*.18,-.5,0,7);c.fill();
    if(b.k==='bomb'){c.strokeStyle='#FFD23F';c.lineWidth=3;c.beginPath();c.moveTo(4,-b.r);c.quadraticCurveTo(10,-b.r-12,18,-b.r-8);c.stroke();txt(c,'✕',0,2,20,{align:'center',stroke:false,fill:'#E85A5A'})}
    else{c.fillStyle=INK;c.beginPath();c.arc(-7,-2,2.6,0,7);c.arc(7,-2,2.6,0,7);c.fill();c.lineWidth=2.5;c.beginPath();c.arc(0,4,6,.2,Math.PI-.2);c.stroke()}
    c.strokeStyle=INK;c.lineWidth=1.5;c.beginPath();c.moveTo(0,b.r);c.quadraticCurveTo(6,b.r+12,0,b.r+22);c.stroke();c.restore()};
  g.draw=c=>{
    skyBg(c,'#7FD1C7','#E8F8F5');CLOUDS.forEach(k=>cloud(c,(k.x+g.t*8)%900-60,k.y,k.s));
    g.balls.forEach(b=>ball(c,b));
    g.pops.forEach(p=>{c.strokeStyle=p.c;c.lineWidth=5*(1-p.t);for(let i=0;i<8;i++){const a=i/8*6.28,r=20+p.t*40;c.beginPath();c.moveTo(p.x+Math.cos(a)*r*.6,p.y+Math.sin(a)*r*.6);c.lineTo(p.x+Math.cos(a)*r,p.y+Math.sin(a)*r);c.stroke()}});
    g.shots.forEach(s=>{const x=s.x0+(s.x-s.x0)*s.tt,y=s.y0+(s.y-s.y0)*s.tt,a=Math.atan2(s.y-s.y0,s.x-s.x0);c.save();c.translate(x,y);c.rotate(a);c.lineWidth=4;c.strokeStyle=INK;c.beginPath();c.moveTo(-34,0);c.lineTo(8,0);c.stroke();c.fillStyle=COLS[s.c];c.beginPath();c.moveTo(16,0);c.lineTo(4,-7);c.lineTo(4,7);c.closePath();c.fill();c.stroke();c.restore()});
    c.fillStyle='#5BCB4A';c.fillRect(0,368,800,32);c.fillStyle='rgba(31,42,58,.15)';c.fillRect(0,368,800,4);
    rr(c,BOW.x-70,BOW.y-44,140,64,18);outlined(c,'#FFFDF6',4);
    c.beginPath();c.arc(BOW.x-26,BOW.y-12,22,0,7);outlined(c,COLS[g.cur],4);c.lineWidth=4;c.strokeStyle=INK;c.beginPath();c.moveTo(BOW.x-26,BOW.y-2);c.lineTo(BOW.x-26,BOW.y-30);c.stroke();c.fillStyle=INK;c.beginPath();c.moveTo(BOW.x-26,BOW.y-36);c.lineTo(BOW.x-32,BOW.y-26);c.lineTo(BOW.x-20,BOW.y-26);c.fill();
    c.beginPath();c.arc(BOW.x+34,BOW.y-12,12,0,7);outlined(c,COLS[g.next],3);
    txt(c,t('ca.now'),BOW.x,BOW.y-58,11,{align:'center',font:'Press Start 2P',sw:.5});
    drawFloats(c,g.fl,1/60);hud(c,g,{combo:g.streak});
  };
  return g;
}});
