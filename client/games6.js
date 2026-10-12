
/* =====================================================================
   JUEGOS NUEVOS · TANDA 4
   Lanza cuchillos · Leñador · Torre del pollito · Memoria pizza
   ===================================================================== */
Object.assign(L.es,{'kn.level':'TRONCO {n}','kn.break':'¡TRONCO ROTO!','lj.chops':'CORTES','ck.dist':'DISTANCIA','pz.look':'¡MEMORIZA!','pz.build':'ARMA LA PIZZA','pz.ok':'¡PERFECTA!','pz.bad':'¡ESA NO ERA!'});
Object.assign(L.en,{'kn.level':'LOG {n}','kn.break':'LOG BROKEN!','lj.chops':'CHOPS','ck.dist':'DISTANCE','pz.look':'MEMORIZE!','pz.build':'BUILD THE PIZZA','pz.ok':'PERFECT!','pz.bad':'NOT THAT ONE!'});

IC.knife_hit=`<svg ${ICON_ATTR}><circle cx="24" cy="18" r="13" fill="#B4693C"/><circle cx="24" cy="18" r="7" fill="#F5D46A"/><path d="M24 31v8" stroke-width="4" stroke="#C9D2DC"/><rect x="21" y="38" width="6" height="8" rx="2" fill="#E85A5A"/></svg>`;
IC.lumberjack=`<svg ${ICON_ATTR}><rect x="20" y="4" width="10" height="40" fill="#A0612F"/><path d="M30 14h8q4 0 4-4" /><circle cx="40" cy="10" r="4" fill="#5BCB4A"/><path d="M6 30l12-6" stroke-width="4"/><path d="M4 26l6-4 3 6z" fill="#C9D2DC"/></svg>`;
IC.chick_tower=`<svg ${ICON_ATTR}><rect x="16" y="34" width="16" height="8" fill="#E85A5A"/><rect x="16" y="26" width="16" height="8" fill="#9B6FC4"/><circle cx="24" cy="16" r="8" fill="#FFD23F"/><path d="M31 16l5 2-5 2z" fill="#FF7A2F"/><circle cx="26" cy="14" r="1.5" fill="#1F2A3A"/></svg>`;
IC.pizza_memory=`<svg ${ICON_ATTR}><circle cx="24" cy="24" r="18" fill="#F6B13D"/><circle cx="24" cy="24" r="13" fill="#F9C74F" stroke-width="2"/><circle cx="18" cy="20" r="3" fill="#E85A5A"/><circle cx="29" cy="27" r="3" fill="#E85A5A"/><path d="M26 15q4 2 2 6" fill="#5BCB4A"/></svg>`;

/* ---------- Lanza cuchillos ---------- */
registerGame({id:'knife_hit',name:{es:'Lanza cuchillos',en:'Knife Toss'},category:'reflex',duration:60,difficulty:2,cap:60000,phase:5,
  desc:{es:'Clava todos los cuchillos en el tronco que gira sin pegarle a los que ya están clavados.',en:'Stick all your knives into the spinning log without hitting the ones already in it.'},
  tips:{es:{ctrl:'Toca la pantalla para lanzar un cuchillo',plus:'+50 por cuchillo · manzana +100 · tronco roto +300',minus:'Si chocas con otro cuchillo pierdes una vida (tienes 3) y el tronco empieza de nuevo'},
        en:{ctrl:'Tap the screen to throw a knife',plus:'+50 per knife · apple +100 · broken log +300',minus:'Hitting another knife costs a life (you have 3) and the log starts over'}},ctrlIcon:'tap',
  sim:k=>({raw:(600+Math.random()*4500)*k,acc:rand(.6,.95)}),
  create(dur){
  const CX=400,CY=164,R=76,KY=372;
  const g={dur,t:0,over:false,fl:[],lives:3,level:0,ang:0,spd:2,stuck:[],apples:[],left:0,need:0,fly:null,bounce:null,pieces:[],pts:0,streak:0,mx:0,thrown:0,fails:0,shake:0,flash:0};
  const norm=a=>{a%=Math.PI*2;return a<0?a+Math.PI*2:a};
  const setup=()=>{g.need=6+Math.min(5,g.level);g.left=g.need;g.stuck=[];const pre=Math.min(4,g.level);for(let i=0;i<pre;i++)g.stuck.push({a:rand(0,6.28),pre:1});
    g.apples=[];if(Math.random()<.8)g.apples.push({a:rand(0,6.28)});if(g.level>1&&Math.random()<.5)g.apples.push({a:rand(0,6.28)})};
  setup();
  const speedAt=t=>{const L2=g.level%4;if(L2===0)return 1.8+g.level*.15;if(L2===1)return 2.4*Math.sin(t*.9)+.6;if(L2===2)return (Math.sin(t*1.7)>0?3.2:-1.6);return 2.6+1.6*Math.sin(t*2.3)};
  g.down=()=>{if(g.fly||g.bounce||g.pieces.length)return;g.fly={y:KY};g.thrown++;tone(900,.04,'triangle',.04,.6)};g.key=(k,d)=>{if(d&&(k==='Space'||k==='ArrowUp'))g.down()};
  g.update=dt=>{g.shake=Math.max(0,g.shake-dt);g.flash=Math.max(0,g.flash-dt);
    g.ang+=speedAt(g.t)*dt;
    if(g.fly){g.fly.y-=1900*dt;if(g.fly.y<=CY+R+46){const rel=norm(Math.PI/2-g.ang);
      if(g.stuck.some(s=>Math.abs(Math.atan2(Math.sin(s.a-rel),Math.cos(s.a-rel)))<.2)){g.bounce={y:g.fly.y,vy:500,r:0};g.fly=null;g.lives--;g.fails++;g.streak=0;g.shake=.4;tone(150,.4,'sawtooth',.08,.5);if(g.lives<=0){g.over=true;return}g.reset=.8}
      else{g.stuck.push({a:rel});g.left--;g.fly=null;g.streak++;g.mx=Math.max(g.mx,g.streak);g.pts+=50;tone(240,.06,'square',.06);g.shake=.08;
        g.apples=g.apples.filter(ap=>{if(Math.abs(Math.atan2(Math.sin(ap.a-rel),Math.cos(ap.a-rel)))<.22){g.pts+=100;floatTxt(g.fl,CX,CY-R-20,'+100','#E85A5A',24);tone(1200,.08,'square',.05,1.4);return false}return true});
        if(g.left<=0){g.pts+=300;g.flash=.4;floatTxt(g.fl,CX,CY,t('kn.break')+' +300','#FFD23F',28);SFX.levelup();for(let i=0;i<6;i++)g.pieces.push({x:CX,y:CY,vx:rand(-300,300),vy:rand(-400,-100),r:0,vr:rand(-6,6),k:i});g.level++}}}}
    if(g.bounce){g.bounce.vy+=1500*dt;g.bounce.y+=g.bounce.vy*dt;g.bounce.r+=dt*12}
    if(g.reset!=null){g.reset-=dt;if(g.reset<=0){g.reset=null;g.bounce=null;setup()}}
    if(g.pieces.length){g.pieces.forEach(p=>{p.vy+=1400*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.r+=p.vr*dt});if(g.pieces.every(p=>p.y>480)){g.pieces=[];setup()}}};
  g.score=()=>g.pts;g.acc=()=>g.thrown?(g.thrown-g.fails)/g.thrown:null;g.maxCombo=()=>g.mx;
  g.auto=dt=>{if(g.fly||g.bounce||g.pieces.length||g.reset!=null)return;g._bt=(g._bt||0)-dt;if(g._bt>0)return;
    const tt=(KY-(CY+R+46))/1900,rel=norm(Math.PI/2-(g.ang+speedAt(g.t)*tt));if(!g.stuck.some(s=>Math.abs(Math.atan2(Math.sin(s.a-rel),Math.cos(s.a-rel)))<.36)){g._bt=.25;botTap(g,400,200)}};
  const knife=(c,x,y,rot,col,s=1)=>{c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);
    c.beginPath();c.moveTo(-7,0);c.lineTo(7,0);c.lineTo(7,-44);c.quadraticCurveTo(0,-60,-7,-46);c.closePath();outlined(c,'#D7E0E8',3);c.fillStyle='rgba(255,255,255,.7)';c.fillRect(-3,-40,3,36);
    rr(c,-10,0,20,6,3);outlined(c,col,3);rr(c,-8,6,16,32,7);outlined(c,col,3);c.fillStyle='rgba(255,255,255,.35)';c.fillRect(-4,10,3,24);c.restore()};
  g.draw=c=>{
    c.fillStyle='#34546E';c.fillRect(0,0,800,400);c.fillStyle='rgba(255,255,255,.04)';for(let i=0;i<8;i++){c.beginPath();c.arc(100+i*90,(i*71)%400,40,0,7);c.fill()}
    c.save();if(g.shake>0)c.translate(rand(-5,5),rand(-4,4));
    if(!g.pieces.length){c.save();c.translate(CX,CY);c.rotate(g.ang);
      g.stuck.forEach(s=>{const x=Math.cos(s.a)*(R+6),y=Math.sin(s.a)*(R+6);knife(c,x,y,s.a-Math.PI/2,s.pre?'#9AA3AF':'#2FA8E8',.9)});
      g.apples.forEach(ap=>{c.save();c.rotate(ap.a);c.translate(R+14,0);c.beginPath();c.arc(0,0,13,0,7);outlined(c,'#E85A5A',3);c.fillStyle='#5BCB4A';c.beginPath();c.ellipse(6,-12,6,3,-.5,0,7);c.fill();c.restore()});
      c.beginPath();c.arc(0,0,R,0,7);outlined(c,'#B4693C',5);[[R*.82,'#F5D46A'],[R*.66,'#B4693C'],[R*.52,'#F5D46A'],[R*.38,'#B4693C'],[R*.24,'#F5D46A'],[R*.14,'#B4693C']].forEach(([r,col])=>{c.beginPath();c.arc(0,0,r,0,7);c.fillStyle=col;c.fill()});
      c.strokeStyle=INK;c.lineWidth=3;for(let i=0;i<6;i++){const a=i*1.05;c.beginPath();c.moveTo(Math.cos(a)*R,Math.sin(a)*R);c.lineTo(Math.cos(a)*(R-8),Math.sin(a)*(R-8));c.stroke()}
      c.restore()}
    g.pieces.forEach(p=>{c.save();c.translate(p.x,p.y);c.rotate(p.r);c.beginPath();c.moveTo(0,0);c.arc(0,0,R*.9,p.k*1.05,p.k*1.05+1.05);c.closePath();outlined(c,'#B4693C',4);c.restore()});
    if(g.flash>0){c.fillStyle=`rgba(255,255,255,${g.flash})`;c.fillRect(0,0,800,400)}
    if(g.fly)knife(c,CX,g.fly.y,0,'#2FA8E8');else if(g.bounce){knife(c,CX+g.bounce.r*8,g.bounce.y,g.bounce.r,'#2FA8E8')}else if(!g.pieces.length&&g.reset==null)knife(c,CX,KY,0,'#2FA8E8');
    c.restore();
    for(let i=0;i<g.need;i++){const y=380-i*24;c.save();c.translate(60,y);c.beginPath();c.arc(0,0,7,0,7);outlined(c,i<g.left?'#2FA8E8':'rgba(255,255,255,.2)',3);c.restore()}
    txt(c,t('kn.level',{n:g.level+1}),400,26,15,{font:'Press Start 2P',align:'center',fill:'#FFD23F',sw:.45});
    drawFloats(c,g.fl,1/60);hud(c,g,{combo:g.streak,lives:g.lives,lives0:3});
  };
  return g;
}});

/* ---------- Leñador ---------- */
registerGame({id:'lumberjack',name:{es:'Leñador',en:'Lumberjack'},category:'speed',duration:45,difficulty:1,cap:60000,phase:5,
  desc:{es:'Corta el árbol lo más rápido que puedas, cambiando de lado para que no te caiga una rama.',en:'Chop the tree as fast as you can, switching sides so no branch lands on you.'},
  tips:{es:{ctrl:'Toca IZQUIERDA o DERECHA para cortar desde ese lado',plus:'+10 por corte (más en racha) · cortar rápido rellena tu barra',minus:'Si una rama te cae o se vacía la barra pierdes una vida (tienes 3)'},
        en:{ctrl:'Tap LEFT or RIGHT to chop from that side',plus:'+10 per chop (more on a streak) · chopping fast refills your bar',minus:'If a branch lands on you or the bar empties you lose a life (you have 3)'}},ctrlIcon:'buttons',
  sim:k=>({raw:(800+Math.random()*6000)*k,acc:rand(.7,.98)}),
  create(dur){
  const TX=400,TW=86,SH=60,BASE=352;
  const g={dur,t:0,over:false,fl:[],side:'L',segs:[],lives:3,energy:1,inv:0,stun:0,chops:0,hits:0,streak:0,mx:0,pts:0,swing:0,flying:[],drop:0};
  const newSeg=()=>{const last=g.segs[g.segs.length-1];let b=null;   // nunca dos ramas seguidas en lados opuestos (sería imposible)
    if(last&&last.b){if(Math.random()<.35)b=last.b}else if(Math.random()<.7)b=Math.random()<.5?'L':'R';return{b}};
  for(let i=0;i<8;i++)g.segs.push(i<2?{b:null}:newSeg());
  const hurt=()=>{g.lives--;g.hits++;g.streak=0;g.stun=.6;g.inv=.6;tone(110,.4,'sawtooth',.08,.4);if(g.lives<=0)g.over=true};
  const chop=s=>{if(g.stun>0)return;g.side=s;g.swing=.12;
    if(g.segs[0].b===s){g.segs[0].b=null;hurt();return}
    const cut=g.segs.shift();g.segs.push(newSeg());g.flying.push({x:TX,y:BASE-SH,vx:s==='L'?520:-520,vy:-160,r:0,b:cut.b});g.drop=SH;g.chops++;
    g.energy=Math.min(1,g.energy+.075);g.streak++;g.mx=Math.max(g.mx,g.streak);g.pts+=10*comboMult(Math.floor(g.streak/3));tone(260+Math.random()*60,.05,'square',.05);
    if(g.segs[0].b===s){g.segs[0].b=null;hurt()}};
  g.down=x=>chop(x<400?'L':'R');g.key=(k,d)=>{if(!d)return;if(k==='ArrowLeft'||k==='KeyA')chop('L');if(k==='ArrowRight'||k==='KeyD')chop('R')};
  g.update=dt=>{g.inv=Math.max(0,g.inv-dt);g.stun=Math.max(0,g.stun-dt);g.swing=Math.max(0,g.swing-dt);g.drop=Math.max(0,g.drop-dt*600);
    g.energy-=dt*(.16+g.t*.004);if(g.energy<=0){g.energy=.6;hurt()}
    g.flying.forEach(f=>{f.vy+=1400*dt;f.x+=f.vx*dt;f.y+=f.vy*dt;f.r+=f.vx*dt*.01});g.flying=g.flying.filter(f=>f.y<500)};
  g.score=()=>g.pts;g.acc=()=>g.chops+g.hits?g.chops/(g.chops+g.hits):null;g.maxCombo=()=>g.mx;
  g.auto=dt=>{g._bt=(g._bt||0)-dt;if(g._bt>0||g.stun>0)return;g._bt=.2;const ok=s=>g.segs[0].b!==s&&g.segs[1].b!==s;const s=ok(g.side)?g.side:(g.side==='L'?'R':'L');botTap(g,s==='L'?200:600,300)};
  const branch=(c,x,y,dir)=>{c.lineWidth=12;c.strokeStyle=INK;c.lineCap='round';c.beginPath();c.moveTo(x,y);c.lineTo(x+dir*60,y);c.quadraticCurveTo(x+dir*80,y,x+dir*82,y-20);c.stroke();
    c.lineWidth=6;c.strokeStyle='#A0612F';c.stroke();c.save();c.translate(x+dir*96,y-30);c.beginPath();c.arc(-16,6,18,0,7);c.arc(4,-6,20,0,7);c.arc(20,8,16,0,7);outlined(c,'#5BCB4A',4);c.fillStyle='#F5B400';c.beginPath();c.arc(2,4,5,0,7);c.fill();c.restore()};
  g.draw=c=>{
    c.fillStyle='#B8F1EC';c.fillRect(0,0,800,400);CLOUDS.forEach(cl=>cloud(c,(cl.x+g.t*10)%900-60,cl.y+20,cl.s));
    c.fillStyle='#7ACB45';c.fillRect(0,BASE,800,48);c.fillStyle='#64B234';c.fillRect(0,BASE,800,6);
    g.segs.forEach((s,i)=>{const y=BASE-(i+1)*SH-g.drop;if(y<-SH)return;c.fillStyle='#A0612F';c.fillRect(TX-TW/2,y,TW,SH);c.fillStyle='rgba(0,0,0,.12)';c.fillRect(TX+TW/2-16,y,12,SH);c.fillStyle='rgba(255,255,255,.15)';c.fillRect(TX-TW/2+10,y+10,8,20);
      c.strokeStyle=INK;c.lineWidth=4;c.beginPath();c.moveTo(TX-TW/2,y);c.lineTo(TX-TW/2,y+SH);c.moveTo(TX+TW/2,y);c.lineTo(TX+TW/2,y+SH);c.stroke();
      if(s.b)branch(c,TX+(s.b==='L'?-TW/2:TW/2),y+SH/2,s.b==='L'?-1:1)});
    rr(c,TX-TW/2-10,BASE-10,TW+20,16,6);outlined(c,'#8A4F27',3);
    g.flying.forEach(f=>{c.save();c.translate(f.x,f.y+SH/2);c.rotate(f.r);rr(c,-TW/2,-SH/2,TW,SH,4);outlined(c,'#A0612F',4);c.restore()});
    const px=g.side==='L'?TX-TW/2-62:TX+TW/2+62,dir=g.side==='L'?1:-1;
    if(!(g.inv>0&&(g.t*12|0)%2)){c.save();c.translate(px,BASE);c.scale(dir,1);
      c.lineWidth=5;c.strokeStyle=INK;c.lineCap='round';c.beginPath();c.moveTo(-6,0);c.lineTo(-6,-26);c.moveTo(8,0);c.lineTo(8,-26);c.stroke();
      rr(c,-16,-60,32,36,8);outlined(c,'#E85A5A',4);c.fillStyle='rgba(31,42,58,.3)';c.fillRect(-16,-46,32,4);c.fillRect(-2,-60,4,36);
      c.beginPath();c.arc(0,-74,14,0,7);outlined(c,'#F2C9A0',4);c.fillStyle='#3B2A20';c.beginPath();c.arc(0,-66,13,0,Math.PI);c.fill();
      rr(c,-14,-94,28,14,6);outlined(c,'#6B4FA0',3);
      c.fillStyle=INK;c.beginPath();c.arc(6,-76,2,0,7);c.fill();
      const a=g.swing>0?-.2:-1.6;c.translate(10,-48);c.rotate(a);c.lineWidth=5;c.strokeStyle='#8A5A35';c.beginPath();c.moveTo(0,0);c.lineTo(40,0);c.stroke();
      c.beginPath();c.moveTo(34,-12);c.lineTo(50,-14);c.lineTo(50,8);c.lineTo(34,6);c.closePath();outlined(c,'#D7E0E8',3);c.restore()}
    if(g.stun>0)txt(c,'✶ ✶ ✶',px,BASE-120,20,{align:'center',fill:'#FFD23F'});
    rr(c,250,64,300,18,9);outlined(c,'rgba(31,42,58,.4)',3);rr(c,252,66,296*g.energy,14,7);c.fillStyle=g.energy<.3?'#E85A5A':'#FFD23F';c.fill();
    txt(c,t('lj.chops')+' '+g.chops,400,26,15,{font:'Press Start 2P',align:'center',fill:'#FFD23F',sw:.45});
    drawFloats(c,g.fl,1/60);hud(c,g,{combo:g.streak,lives:g.lives,lives0:3});
  };
  return g;
}});

/* ---------- Torre del pollito ---------- */
registerGame({id:'chick_tower',name:{es:'Torre del pollito',en:'Chick Tower'},category:'control',duration:60,difficulty:2,cap:40000,phase:5,
  desc:{es:'El pollito avanza: toca para que brinque y ponga un bloque debajo. Haz la torre lo bastante alta para subir los escalones.',en:'The chick keeps moving: tap so it hops and lays a block below. Build the tower high enough to climb the steps.'},
  tips:{es:{ctrl:'Toca la pantalla: el pollito brinca y pone un bloque',plus:'Avanzar suma · cada escalón superado +50 · moneda +100',minus:'Si la torre es más baja que el escalón, chocas y pierdes una vida (tienes 3)'},
        en:{ctrl:'Tap the screen: the chick hops and lays a block',plus:'Moving forward scores · each step climbed +50 · coin +100',minus:'If your tower is lower than the step, you crash and lose a life (you have 3)'}},ctrlIcon:'tap',
  sim:k=>({raw:(400+Math.random()*3500)*k,acc:rand(.6,.95)}),
  create(dur){
  const BW=46,BH=34,GY=380,CX=230;
  const g={dur,t:0,over:false,fl:[],cols:[],scroll:0,tower:0,cur:0,lives:3,inv:0,hop:0,cool:0,pts:0,steps:0,crashes:0,streak:0,mx:0,knocked:[],coins:[],v:150};
  let h=0;const gen=()=>{while(g.cols.length*BW<g.scroll+1100){const i=g.cols.length;if(i<8){g.cols.push(0);continue}const len=2+(Math.random()*4|0);
    h=clamp(h+[-2,-1,1,2,2,3][Math.random()*6|0]*(Math.random()<.85?1:0),0,6);for(let k=0;k<len;k++)g.cols.push(h);if(Math.random()<.4)g.coins.push({i:i+1,h:h+2+(Math.random()*3|0)})}};
  gen();
  const colAt=x=>g.cols[Math.floor((x+g.scroll)/BW)]??0;
  g.down=()=>{if(g.cool>0||g.cur+g.tower>=9)return;g.tower++;g.hop=.16;g.cool=.12;tone(520+g.tower*40,.05,'triangle',.05)};g.key=(k,d)=>{if(d&&(k==='Space'||k==='ArrowUp'))g.down()};
  g.update=dt=>{g.inv=Math.max(0,g.inv-dt);g.hop=Math.max(0,g.hop-dt);g.cool=Math.max(0,g.cool-dt);g.v=150+g.t*2.2;
    g.scroll+=g.v*dt;const after=Math.max(colAt(CX-BW/2+3),colAt(CX+BW/2-3));
    if(after>g.cur){const diff=after-g.cur;
      if(g.tower>=diff){for(let i=0;i<diff;i++)g.knocked.push({x:CX,y:GY-(g.cur+i+1)*BH,vx:-260-Math.random()*120,vy:-200,r:0});g.tower-=diff;g.cur=after;g.steps++;g.streak++;g.mx=Math.max(g.mx,g.streak);g.pts+=50;floatTxt(g.fl,CX,GY-(g.cur+g.tower+2)*BH,'+50','#fff',20);tone(330,.06,'square',.05)}
      else{g.lives--;g.crashes++;g.streak=0;g.inv=1.2;g.cur=after;g.tower=0;tone(110,.4,'sawtooth',.08,.4);floatTxt(g.fl,CX,GY-(after+2)*BH,'¡PUM!','#E85A5A',26);if(g.lives<=0)g.over=true}}
    else if(after<g.cur)g.cur=after;   // al bajar, la torre baja con el terreno
    g.coins=g.coins.filter(k=>{const x=k.i*BW-g.scroll+BW/2,y=GY-k.h*BH-BH/2,cy=GY-(g.cur+g.tower)*BH-20;if(Math.abs(x-CX)<26&&Math.abs(y-cy)<30){g.pts+=100;floatTxt(g.fl,x,y-20,'+100','#FFD23F',22);tone(1300,.06,'square',.04,1.4);return false}return x>-40});
    g.knocked.forEach(k=>{k.vy+=1500*dt;k.x+=k.vx*dt;k.y+=k.vy*dt;k.r+=dt*6});g.knocked=g.knocked.filter(k=>k.y<480);gen()};
  g.score=()=>Math.round(g.scroll/BW)*10+g.pts;g.acc=()=>g.steps+g.crashes?g.steps/(g.steps+g.crashes):null;g.maxCombo=()=>g.mx;
  g.auto=dt=>{let need=0;for(let x=CX;x<CX+BW*3.2;x+=BW/2)need=Math.max(need,colAt(x)-g.cur);if(g.tower<need+0)botTap(g,400,200)};
  const block=(c,x,y,col)=>{c.fillStyle=col;c.fillRect(x,y,BW,BH);c.fillStyle='rgba(255,255,255,.25)';c.fillRect(x+4,y+4,BW-8,5);c.strokeStyle=INK;c.lineWidth=3.5;c.strokeRect(x,y,BW,BH)};
  g.draw=c=>{
    c.fillStyle='#FCC07E';c.fillRect(0,0,800,400);c.fillStyle='#F9AE73';c.beginPath();c.moveTo(0,90);c.lineTo(160,0);c.lineTo(0,0);c.fill();c.beginPath();c.moveTo(800,300);c.lineTo(640,400);c.lineTo(800,400);c.fill();
    CLOUDS.forEach(cl=>cloud(c,((cl.x-g.scroll*.2)%900+900)%900-60,cl.y+30,cl.s));
    const i0=Math.floor(g.scroll/BW);for(let i=i0-1;i<i0+20;i++){const hh=g.cols[i];if(hh==null)continue;const x=i*BW-g.scroll;
      block(c,x,GY,'#8E4E2E');for(let k=0;k<hh;k++)block(c,x,GY-(k+1)*BH,k%2?'#9B6FC4':'#7E58A8')}
    g.coins.forEach(k=>{const x=k.i*BW-g.scroll+BW/2,y=GY-k.h*BH-BH/2,s=Math.abs(Math.cos(g.t*4+k.i));c.beginPath();c.ellipse(x,y,12*s+2,12,0,0,7);outlined(c,'#FFD23F',3)});
    for(let k=0;k<g.tower;k++)block(c,CX-BW/2,GY-(g.cur+k+1)*BH,k%2?'#E85A5A':'#FF7E7E');
    g.knocked.forEach(k=>{c.save();c.translate(k.x,k.y+BH/2);c.rotate(k.r);block(c,-BW/2,-BH/2,'#E85A5A');c.restore()});
    if(!(g.inv>0&&(g.t*12|0)%2)){const y=GY-(g.cur+g.tower)*BH-g.hop*120*(1-g.hop/.16)*0-Math.sin(Math.min(1,g.hop/.16)*Math.PI)*18;c.save();c.translate(CX,y);
      c.beginPath();c.ellipse(0,-20,22,20,0,0,7);outlined(c,'#FFD23F',4);c.beginPath();c.ellipse(-14,-18,10,7,.5+Math.sin(g.t*20)*.3*(g.hop>0?1:0),0,7);outlined(c,'#FFB52E',3);
      c.fillStyle=INK;c.beginPath();c.arc(8,-26,3,0,7);c.fill();c.beginPath();c.moveTo(18,-22);c.lineTo(30,-18);c.lineTo(18,-14);c.closePath();outlined(c,'#FF7A2F',2.5);
      c.fillStyle='#E85A5A';c.beginPath();c.arc(-2,-42,5,0,7);c.arc(4,-42,4,0,7);c.fill();c.restore()}
    drawFloats(c,g.fl,1/60);hud(c,g,{combo:g.streak,lives:g.lives,lives0:3});
    txt(c,t('ck.dist')+' '+Math.round(g.scroll/BW)+' m',400,26,15,{font:'Press Start 2P',align:'center',fill:'#FFD23F',sw:.45});
  };
  return g;
}});

/* ---------- Memoria pizza ---------- */
registerGame({id:'pizza_memory',name:{es:'Memoria pizza',en:'Pizza Memory'},category:'memory',duration:60,difficulty:2,cap:40000,phase:5,
  desc:{es:'Mira el pedido unos segundos y arma la pizza de memoria con los ingredientes correctos.',en:'Look at the order for a few seconds and build the pizza from memory with the right toppings.'},
  tips:{es:{ctrl:'Memoriza el pedido; luego toca los ingredientes de la bandeja',plus:'+100 por ingrediente correcto en una pizza perfecta · bono por rapidez',minus:'Si te equivocas, esa pizza no suma y se rompe la racha'},
        en:{ctrl:'Memorize the order, then tap the toppings on the tray',plus:'+100 per topping on a perfect pizza · speed bonus',minus:'If you get it wrong, that pizza scores nothing and breaks the streak'}},ctrlIcon:'tap',
  sim:k=>({raw:(300+Math.random()*3500)*k,acc:rand(.4,.9)}),
  create(dur){
  const ING=['tomato','mush','basil','onion','fish','pepp'],PZ={x:400,y:200,r:112};
  const TRAY=ING.map((k,i)=>({k,x:572+(i%2)*104,y:84+(i/2|0)*100,w:92,h:88}));
  const SLOTS=[[-40,-44],[38,-48],[-58,18],[56,10],[0,56],[-6,-4],[-34,60],[40,62]];
  const g={dur,t:0,over:false,fl:[],round:0,order:[],built:[],st:'show',tt:0,showT:2,ok:0,bad:0,streak:0,mx:0,pts:0,res:0};
  const newOrder=()=>{g.round++;const n=Math.min(7,2+Math.floor(g.round/2)),pool=g.round>3?ING:ING.slice(0,4+Math.min(2,g.round));g.order=[];
    for(let i=0;i<n;i++){let k=pool[Math.random()*pool.length|0];if(g.round<=3)while(g.order.includes(k)&&g.order.length<pool.length)k=pool[Math.random()*pool.length|0];g.order.push(k)}
    g.built=[];g.st='show';g.tt=0;g.showT=1.5+n*.45};
  newOrder();
  const cnt=a=>a.reduce((m,k)=>(m[k]=(m[k]||0)+1,m),{});
  g.down=(x,y)=>{if(g.st!=='build')return;const b=TRAY.find(b=>x>=b.x&&x<=b.x+b.w&&y>=b.y&&y<=b.y+b.h);if(!b)return;g.built.push(b.k);tone(600+g.built.length*50,.05,'triangle',.04);
    if(g.built.length===g.order.length){const A=cnt(g.order),B=cnt(g.built),good=Object.keys(A).every(k=>A[k]===B[k]);
      if(good){g.ok++;g.streak++;g.mx=Math.max(g.mx,g.streak);const p=g.order.length*100+Math.max(0,Math.round(300-g.tt*50));g.pts+=p*(g.streak>2?2:1);floatTxt(g.fl,PZ.x,PZ.y-60,t('pz.ok')+' +'+p,'#FFD23F',28);SFX.levelup();g.res=1}
      else{g.bad++;g.streak=0;floatTxt(g.fl,PZ.x,PZ.y-60,t('pz.bad'),'#E85A5A',28);tone(150,.3,'sawtooth',.06,.5);g.res=-1}
      g.st='result';g.tt=0}};
  g.update=dt=>{g.tt+=dt;if(g.st==='show'&&g.tt>=g.showT){g.st='build';g.tt=0}else if(g.st==='result'&&g.tt>=(g.res<0?1.6:.9))newOrder()};
  g.score=()=>g.pts;g.acc=()=>g.ok+g.bad?g.ok/(g.ok+g.bad):null;g.maxCombo=()=>g.mx;
  g.auto=dt=>{if(g.st!=='build')return;g._bt=(g._bt||0)-dt;if(g._bt>0)return;g._bt=rand(.35,.6);const want=g.order[g.built.length],k=Math.random()<.08?ING[Math.random()*6|0]:want,b=TRAY.find(b=>b.k===k);botTap(g,b.x+b.w/2,b.y+b.h/2)};
  function topping(c,k,x,y,s=1){c.save();c.translate(x,y);c.scale(s,s);c.lineWidth=3;c.strokeStyle=INK;
    if(k==='tomato'){c.beginPath();c.arc(0,0,16,Math.PI*.1,Math.PI*1.1);c.closePath();outlined(c,'#E8443A',3);c.fillStyle='#FFB3A0';[[-6,-4],[2,-8],[8,0]].forEach(([a,b])=>{c.beginPath();c.arc(a,b,2.5,0,7);c.fill()})}
    else if(k==='mush'){c.beginPath();c.arc(0,-2,15,Math.PI,0);c.closePath();outlined(c,'#D9B48A',3);rr(c,-6,-2,12,14,4);outlined(c,'#F2E0C6',3)}
    else if(k==='basil'){c.beginPath();c.ellipse(0,0,10,17,.6,0,7);outlined(c,'#5BCB4A',3);c.beginPath();c.moveTo(-8,10);c.lineTo(8,-10);c.stroke()}
    else if(k==='onion'){c.beginPath();c.arc(0,0,15,0,7);c.lineWidth=5;c.strokeStyle='#C77DD6';c.stroke();c.lineWidth=2;c.strokeStyle=INK;c.beginPath();c.arc(0,0,18,0,7);c.stroke();c.beginPath();c.arc(0,0,12,0,7);c.stroke()}
    else if(k==='fish'){c.beginPath();c.ellipse(-2,0,15,8,0,0,7);outlined(c,'#7C93A8',3);c.beginPath();c.moveTo(12,0);c.lineTo(22,-8);c.lineTo(22,8);c.closePath();outlined(c,'#7C93A8',3);c.fillStyle=INK;c.beginPath();c.arc(-10,-2,2,0,7);c.fill()}
    else{c.beginPath();c.arc(0,0,15,0,7);outlined(c,'#D93B5C',3);c.fillStyle='#F28BA0';[[-5,-5],[6,-3],[-2,7]].forEach(([a,b])=>{c.beginPath();c.arc(a,b,3,0,7);c.fill()})}
    c.restore()}
  function pizza(c,x,y,r,items){c.beginPath();c.arc(x,y,r,0,7);outlined(c,'#F6B13D',5);c.beginPath();c.arc(x,y,r*.84,0,7);c.fillStyle='#E8443A';c.fill();c.beginPath();c.arc(x,y,r*.76,0,7);c.fillStyle='#FCCF55';c.fill();
    c.fillStyle='rgba(230,160,40,.45)';[[-.3,-.2],[.3,.25],[-.15,.4],[.4,-.35]].forEach(([a,b])=>{c.beginPath();c.arc(x+a*r,y+b*r,r*.1,0,7);c.fill()});
    items.forEach((k,i)=>{const [dx,dy]=SLOTS[i%SLOTS.length];topping(c,k,x+dx*r/112,y+dy*r/112,r/112*1.15)})}
  g.draw=c=>{
    c.fillStyle='#B0583A';c.fillRect(0,0,800,400);c.fillStyle='rgba(0,0,0,.06)';for(let x=0;x<800;x+=40)c.fillRect(x,0,20,400);
    rr(c,40,92,240,240,14);outlined(c,'#FAF1A2',4);c.beginPath();c.moveTo(250,92);c.lineTo(280,122);c.lineTo(250,122);c.closePath();outlined(c,'#F2E27E',3);
    if(g.st==='show'||g.st==='result'&&g.res<0){pizza(c,160,212,96,g.order);const k=g.st==='show'?1-g.tt/g.showT:0;if(g.st==='show'){rr(c,60,300,200,12,6);outlined(c,'rgba(31,42,58,.2)',2);rr(c,60,300,200*k,12,6);c.fillStyle='#E85A5A';c.fill()}}
    else{txt(c,'?',160,212,120,{align:'center',fill:'#F2E27E'});txt(c,g.order.length+' ×',160,300,22,{align:'center',font:'Press Start 2P',stroke:false,fill:INK})}
    txt(c,g.st==='show'?t('pz.look'):t('pz.build'),400,64,18,{align:'center',font:'Press Start 2P',fill:'#FFD23F',sw:.45});
    pizza(c,PZ.x,PZ.y+10,PZ.r*.9,g.built);
    rr(c,556,70,224,312,40);outlined(c,'#F4F4F4',5);
    TRAY.forEach(b=>{rr(c,b.x,b.y,b.w,b.h,16);outlined(c,g.st==='build'?'#fff':'#E8E8E8',2.5);topping(c,b.k,b.x+b.w/2,b.y+b.h/2,1.5)});
    for(let i=0;i<g.order.length;i++){c.beginPath();c.arc(PZ.x-(g.order.length-1)*12+i*24,370,7,0,7);outlined(c,i<g.built.length?'#5BCB4A':'rgba(255,255,255,.4)',2.5)}
    drawFloats(c,g.fl,1/60);hud(c,g,{combo:g.streak});
  };
  return g;
}});
