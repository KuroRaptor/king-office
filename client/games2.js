/* =====================================================================
   3b. FASES 3 Y 4 · juegos nuevos
   ===================================================================== */
Object.assign(L.es,{
 'traffic.hint':'Toca un auto que espera para que cruce','traffic.busy':'CRUCE OCUPADO','traffic.free':'CRUCE LIBRE','sky.hint':'Arrastra el dedo para mover tu avión','pr.hint':'¡Tócala rápido para destruirla!','traffic.crash':'¡CRASH!','traffic.level':'NIVEL {n}',
 'inv.hint':'Mantén presionado para moverte y disparar','inv.wave':'OLEADA {n}','inv.boss':'¡JEFE REBELDE!','inv.clear':'¡Oleada limpia! +200',
 'die.left':'IZQ.','die.jump':'SALTA','die.right':'DER.','die.survived':'SOBREVIVISTE: {n}','die.bonus':'¡BONUS +500!','die.dead':'¡Te alcanzó!',
 'eye.react':'REACCIÓN {n} ms','eye.note':'¡Reunión 3 p.m.!','eye.center':'¡CENTRO!',
 'cof.serve':'SERVIR','cof.trash':'TIRAR','cof.order':'PEDIDO','cof.ok':'¡Correcto!','cof.perfect':'¡Perfecto!','cof.bad':'¡Pedido equivocado!','cof.left':'¡Se fue el cliente!',
 'ing.coffee':'Café','ing.milk':'Leche','ing.sugar':'Azúcar','ing.ice':'Hielo','ing.choco':'Chocolate','ing.cinna':'Canela',
 'mail.hint':'Toca solo los correos SPAM','mail.read':'¡Ahora lee bien las etiquetas!',
 'tag.URGENT':'URGENTE','tag.INVOICE':'FACTURA','tag.MEETING':'REUNIÓN','tag.SPAM':'SPAM','tag.CLIENT':'CLIENTE','tag.NOTIFY':'AVISO',
 'pr.open':'ABRIR','pr.close':'CERRAR','pr.pull':'SACAR PAPEL','pr.add':'PONER PAPEL','pr.toner':'CAMBIAR TÓNER','pr.cancel':'CANCELAR','pr.restart':'REINICIAR','pr.power':'APAGAR/ENCENDER',
 'pr.jam':'ATASCO DE PAPEL','pr.empty':'SIN PAPEL','pr.tonerlow':'SIN TÓNER','pr.stuck':'TRABAJO TRABADO','pr.error':'ERROR 0xCAFE','pr.double':'ATASCO DOBLE','pr.copies':'IMPRIMIÓ 300 COPIAS',
 'pr.fixed':'¡Arreglada!','pr.penalty':'-3 s',
 'nn.timeout':'¡Tiempo!','nn.ok':'¡Bien!'
});
Object.assign(L.en,{
 'traffic.hint':'Tap a waiting car to let it cross','traffic.busy':'CROSSING BUSY','traffic.free':'CROSSING FREE','sky.hint':'Drag your finger to move your plane','pr.hint':'Tap it fast to destroy it!','traffic.crash':'CRASH!','traffic.level':'LEVEL {n}',
 'inv.hint':'Hold to move and shoot','inv.wave':'WAVE {n}','inv.boss':'REBEL BOSS!','inv.clear':'Wave cleared! +200',
 'die.left':'LEFT','die.jump':'JUMP','die.right':'RIGHT','die.survived':'SURVIVED: {n}','die.bonus':'BONUS +500!','die.dead':'It got you!',
 'eye.react':'REACTION {n} ms','eye.note':'Meeting 3 p.m.!','eye.center':'BULLSEYE!',
 'cof.serve':'SERVE','cof.trash':'TOSS','cof.order':'ORDER','cof.ok':'Correct!','cof.perfect':'Perfect!','cof.bad':'Wrong order!','cof.left':'Customer left!',
 'ing.coffee':'Coffee','ing.milk':'Milk','ing.sugar':'Sugar','ing.ice':'Ice','ing.choco':'Chocolate','ing.cinna':'Cinnamon',
 'mail.hint':'Tap only the SPAM emails','mail.read':'Now read the tags carefully!',
 'tag.URGENT':'URGENT','tag.INVOICE':'INVOICE','tag.MEETING':'MEETING','tag.SPAM':'SPAM','tag.CLIENT':'CLIENT','tag.NOTIFY':'NOTICE',
 'pr.open':'OPEN','pr.close':'CLOSE','pr.pull':'PULL PAPER','pr.add':'ADD PAPER','pr.toner':'NEW TONER','pr.cancel':'CANCEL','pr.restart':'RESTART','pr.power':'POWER CYCLE',
 'pr.jam':'PAPER JAM','pr.empty':'OUT OF PAPER','pr.tonerlow':'OUT OF TONER','pr.stuck':'JOB STUCK','pr.error':'ERROR 0xCAFE','pr.double':'DOUBLE JAM','pr.copies':'PRINTED 300 COPIES',
 'pr.fixed':'Fixed!','pr.penalty':'-3 s',
 'nn.timeout':'Time!','nn.ok':'Nice!'
});
const hitR=(r,x,y)=>x>=r.x&&x<=r.x+r.w&&y>=r.y&&y<=r.y+r.h;
function burst(c,x,y,r,fill,label,size=13){
  c.save();c.translate(x,y);c.fillStyle=fill;c.strokeStyle=INK;c.lineWidth=3;
  c.beginPath();for(let i=0;i<16;i++){const rr2=i%2?r*.5:r,a=i/16*6.283;c.lineTo(Math.cos(a)*rr2,Math.sin(a)*rr2)}c.closePath();c.fill();c.stroke();
  if(label)txt(c,label,0,2,size,{align:'center',fill:'#E85A5A',sw:.3});c.restore();
}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a}

/* ---------- FASE 3 · Invasores rebeldes ---------- */
registerGame({id:'space_invaders',name:{es:'Invasores rebeldes',en:'Rebel Invaders'},category:'reflex',duration:60,difficulty:3,cap:40000,phase:3,
  desc:{es:'Mantén presionado para mover tu nave y disparar. El jefe vale 1000.',en:'Hold to move your ship and shoot. The boss is worth 1000.'},
  sim:k=>({raw:(800+Math.random()*5200)*k,acc:rand(.4,.9)}),
  create(dur){
  const PY=362;
  const g={dur,t:0,px:400,tx:400,hold:false,fireT:0,shots:[],eb:[],en:[],boss:null,ufo:null,ufoT:9,lives:3,inv:0,pts:0,streak:0,mx:0,hits:0,fired:0,wave:0,dirX:1,shootT:1.5,diveT:3,fl:[],fx:[],msg:'',msgT:0,over:false,stars:Array.from({length:60},()=>[Math.random()*800,Math.random()*400,Math.random()*2+1])};
  function wave(){
    g.wave++;g.en=[];g.boss=null;
    if(g.wave%3===0){g.boss={x:400,y:120,hp:14+g.wave*2,max:14+g.wave*2,dx:130,ph:0};for(let c=0;c<6;c++)g.en.push({x:180+c*88,y:190,type:'norm',ph:Math.random()*6})}
    else{const rows=Math.min(5,3+Math.floor(g.wave/2));for(let r=0;r<rows;r++)for(let c=0;c<8;c++)g.en.push({x:160+c*64,y:96+r*42,type:r===0&&g.wave>=2?'fast':'norm',ph:Math.random()*6})}
    g.n0=g.en.length;g.msg=g.boss?t('inv.boss'):t('inv.wave',{n:g.wave});g.msgT=1.3;
  }
  wave();
  let pid=null;
  const fire=()=>{if(g.shots.length>=4)return;g.shots.push({x:g.px,y:PY-26});g.fired++;tone(880,.04,'square',.03,1.5)};
  g.down=(x,y,id)=>{pid=id;g.hold=true;g.tx=x;fire();g.fireT=.28};
  g.move=(x,y,id)=>{if(id===pid)g.tx=x};
  g.up=id=>{if(id===pid){pid=null;g.hold=false}};
  g.key=(k,d)=>{if(k==='ArrowLeft')g.kl=d;if(k==='ArrowRight')g.kr=d;if(k==='Space'){g.hold=d;if(d){fire();g.fireT=.28}}};
  function hitPlayer(){if(g.inv>0)return;g.lives--;g.inv=1.6;g.streak=0;SFX.miss();g.fx.push({x:g.px,y:PY,l:1});if(g.lives<=0)g.over=true}
  g.update=dt=>{
    g.msgT-=dt;g.inv-=dt;
    if(g.kl)g.tx=g.px-300;if(g.kr)g.tx=g.px+300;
    g.px+=(clamp(g.tx,30,770)-g.px)*Math.min(1,dt*12);
    if(g.hold){g.fireT-=dt;if(g.fireT<=0){fire();g.fireT=.28}}
    g.shots.forEach(s=>s.y-=560*dt);
    for(let i=g.shots.length-1;i>=0;i--)if(g.shots[i].y<40){g.shots.splice(i,1);g.streak=0}
    const alive=g.en.length,speed=38+g.wave*9+(1-alive/Math.max(1,g.n0))*70;
    let edge=false;g.en.forEach(e=>{e.ph+=dt*6;if(!e.dive){e.x+=g.dirX*speed*dt;if(e.x<34||e.x>766)edge=true}});
    if(edge){g.dirX*=-1;g.en.forEach(e=>{if(!e.dive){e.y+=14;e.x=clamp(e.x,34,766)}})}
    g.diveT-=dt;if(g.diveT<=0){const f=g.en.filter(e=>e.type==='fast'&&!e.dive);if(f.length){const e=f[Math.random()*f.length|0];e.dive=1;e.vx=(g.px-e.x)*.7;e.home=[e.x,e.y]}g.diveT=rand(2,4)}
    g.en.forEach(e=>{if(e.dive){e.x+=e.vx*dt;e.y+=230*dt;if(e.y>430){e.dive=0;e.x=e.home[0];e.y=e.home[1]-200<60?60:e.home[1]}}});
    if(g.en.some(e=>!e.dive&&e.y>PY-40)){hitPlayer();g.wave--;wave()}
    g.shootT-=dt;if(g.shootT<=0&&g.en.length){const e=g.en[Math.random()*g.en.length|0];g.eb.push({x:e.x,y:e.y+14,vx:0});g.shootT=Math.max(.45,1.4-g.wave*.12)*rand(.6,1.3)}
    if(g.boss){const b=g.boss;b.ph+=dt;b.x+=b.dx*dt;if(b.x<90||b.x>710)b.dx*=-1;if(Math.random()<dt*1.6)[-.3,0,.3].forEach(a=>g.eb.push({x:b.x,y:b.y+40,vx:a*200}))}
    g.ufoT-=dt;if(g.ufoT<=0&&!g.ufo){g.ufo={x:-40,dx:170};g.ufoT=rand(9,13)}
    if(g.ufo){g.ufo.x+=g.ufo.dx*dt;if(g.ufo.x>860)g.ufo=null}
    g.eb.forEach(b=>{b.y+=260*dt;b.x+=b.vx*dt});g.eb=g.eb.filter(b=>{if(b.y>420)return false;if(Math.abs(b.x-g.px)<22&&Math.abs(b.y-PY)<16){hitPlayer();return false}return true});
    g.en.forEach(e=>{if(e.dive&&Math.abs(e.x-g.px)<30&&Math.abs(e.y-PY)<24){hitPlayer();e.dive=0;e.x=e.home[0];e.y=e.home[1]}});
    for(let i=g.shots.length-1;i>=0;i--){const s=g.shots[i];let hit=null,gain=0;
      for(const e of g.en)if(Math.abs(e.x-s.x)<22&&Math.abs(e.y-s.y)<18){hit=e;gain=e.type==='fast'?100:50;break}
      if(hit){g.en.splice(g.en.indexOf(hit),1)}
      else if(g.ufo&&Math.abs(g.ufo.x-s.x)<34&&Math.abs(66-s.y)<16){hit=g.ufo;gain=250;g.ufo=null}
      else if(g.boss&&Math.abs(g.boss.x-s.x)<62&&Math.abs(g.boss.y-s.y)<40){g.boss.hp--;g.shots.splice(i,1);g.hits++;tone(300,.04,'square',.04);
        if(g.boss.hp<=0){g.pts+=1000;g.fx.push({x:g.boss.x,y:g.boss.y,l:1.4});floatTxt(g.fl,g.boss.x,g.boss.y-50,'+1000','#FFD23F',30);g.boss=null;SFX.levelup()}continue}
      if(hit){g.shots.splice(i,1);g.hits++;g.streak++;g.mx=Math.max(g.mx,g.streak);const m=comboMult(g.streak);g.pts+=gain*m;floatTxt(g.fl,s.x,s.y-10,'+'+gain*m,gain>=250?'#FFD23F':'#fff',18);g.fx.push({x:s.x,y:s.y,l:.6});
        if(m>comboMult(g.streak-1))SFX.combo();else tone(500,.05,'square',.04,.6)}}
    if(!g.en.length&&!g.boss){g.pts+=200;floatTxt(g.fl,400,200,t('inv.clear'),'#FFD23F',26);SFX.levelup();wave()}
    g.fx.forEach(f=>f.l-=dt*2);g.fx=g.fx.filter(f=>f.l>0);
  };
  g.score=()=>g.pts;g.acc=()=>g.fired?g.hits/g.fired:null;g.maxCombo=()=>g.mx;
  g.auto=dt=>{const e=g.en.slice().sort((a,b)=>b.y-a.y)[0]||g.boss;const x=e?e.x:400;if(!g._bh){g.down(x,320,'bot');g._bh=1}g.move(x,320,'bot');g.hand={x:g.px,y:390,p:.2,hold:1}};
  function enemy(c,e){c.save();c.translate(e.x,e.y);const b=Math.sin(e.ph)*2;c.lineWidth=3;c.strokeStyle=INK;
    if(e.type==='fast'){c.beginPath();c.moveTo(-18,-10);c.lineTo(18,-10);c.lineTo(0,16);c.closePath();c.fillStyle='#FF7A2F';c.fill();c.stroke();
      c.beginPath();c.moveTo(-9,-4);c.lineTo(-2,0);c.moveTo(9,-4);c.lineTo(2,0);c.stroke()}
    else{rr(c,-17,-14+b,34,26,9);c.fillStyle='#5BCB4A';c.fill();c.stroke();c.beginPath();c.moveTo(-8,-14+b);c.lineTo(-12,-24);c.moveTo(8,-14+b);c.lineTo(12,-24);c.stroke();
      c.beginPath();c.arc(0,-2+b,7,0,7);c.fillStyle='#fff';c.fill();c.lineWidth=2;c.stroke();c.beginPath();c.arc(0,-1+b,3,0,7);c.fillStyle=INK;c.fill();
      c.lineWidth=3;c.beginPath();c.moveTo(-10,12+b);c.lineTo(-12,18);c.moveTo(10,12+b);c.lineTo(12,18);c.stroke()}
    c.restore()}
  g.draw=c=>{
    const gr=c.createLinearGradient(0,0,0,400);gr.addColorStop(0,'#16223A');gr.addColorStop(1,'#2F4468');c.fillStyle=gr;c.fillRect(0,0,800,400);
    g.stars.forEach(s=>{c.fillStyle='rgba(255,255,255,.7)';c.fillRect(s[0],(s[1]+g.t*s[2]*8)%400,s[2],s[2])});
    c.fillStyle='#24344F';CITY.forEach(b=>{if(b.x<820)c.fillRect(b.x,392-b.h*.35,b.w,b.h*.35+10)});
    if(g.ufo){c.save();c.translate(g.ufo.x,66);c.beginPath();c.ellipse(0,0,32,10,0,0,7);c.fillStyle='#9B7BE8';c.fill();c.lineWidth=3;c.strokeStyle=INK;c.stroke();
      c.beginPath();c.arc(0,-4,13,Math.PI,0);c.fillStyle='#7CC6EE';c.fill();c.stroke();c.restore()}
    g.en.forEach(e=>enemy(c,e));
    if(g.boss){const b=g.boss;c.save();c.translate(b.x,b.y+Math.sin(b.ph*3)*4);c.lineWidth=4;c.strokeStyle=INK;
      rr(c,-58,-36,116,72,22);c.fillStyle='#E85A5A';c.fill();c.stroke();
      [-30,0,30].forEach(x=>{c.beginPath();c.moveTo(x,-36);c.lineTo(x,-52);c.stroke();c.beginPath();c.arc(x,-55,5,0,7);c.fillStyle='#FFD23F';c.fill();c.stroke()});
      [-22,22].forEach(x=>{c.beginPath();c.arc(x,-6,11,0,7);c.fillStyle='#fff';c.fill();c.stroke();c.beginPath();c.arc(x,-4,5,0,7);c.fillStyle=INK;c.fill()});
      c.beginPath();c.moveTo(-34,-20);c.lineTo(-12,-14);c.moveTo(34,-20);c.lineTo(12,-14);c.stroke();
      rr(c,-24,14,48,10,4);c.fillStyle='#fff';c.fill();c.stroke();c.restore();
      rr(c,250,46,300,12,6);c.fillStyle='rgba(255,255,255,.3)';c.fill();rr(c,250,46,300*b.hp/b.max,12,6);c.fillStyle='#E85A5A';c.fill();c.lineWidth=2;c.strokeStyle=INK;rr(c,250,46,300,12,6);c.stroke()}
    g.shots.forEach(s=>{rr(c,s.x-3,s.y-10,6,16,3);c.fillStyle='#FFD23F';c.fill();c.lineWidth=2;c.strokeStyle=INK;c.stroke()});
    g.eb.forEach(b=>{c.beginPath();c.arc(b.x,b.y,5,0,7);c.fillStyle='#F7A8C4';c.fill();c.lineWidth=2;c.strokeStyle=INK;c.stroke()});
    if(!(g.inv>0&&(g.t*12|0)%2)){c.save();c.translate(g.px,PY);c.lineWidth=4;c.strokeStyle=INK;c.lineJoin='round';
      c.beginPath();c.moveTo(0,-26);c.lineTo(24,14);c.lineTo(0,6);c.lineTo(-24,14);c.closePath();c.fillStyle='#FFD23F';c.fill();c.stroke();
      c.beginPath();c.arc(0,-4,7,0,7);c.fillStyle='#7CC6EE';c.fill();c.lineWidth=3;c.stroke();
      if(g.hold){c.fillStyle='#FF7A2F';c.beginPath();c.moveTo(-6,10);c.lineTo(0,22+Math.random()*6);c.lineTo(6,10);c.fill()}c.restore()}
    g.fx.forEach(f=>{c.save();c.globalAlpha=Math.min(1,f.l);burst(c,f.x,f.y,22*(1.6-f.l*.6),'#FFD23F','');c.restore()});
    drawFloats(c,g.fl,1/60);
    if(g.msgT>0)txt(c,g.msg,400,150,20,{align:'center',font:'Press Start 2P',fill:'#FFD23F',sw:.4});
    if(g.t<3)txt(c,t('inv.hint'),400,300,18,{align:'center'});
    hud(c,g,{lives:g.lives,lives0:3,combo:g.streak});
  };
  return g;
}});

/* ---------- FASE 3 · No mueras ---------- */
registerGame({id:'survival_chaos',name:{es:'No mueras',en:'Don\'t Die'},category:'decision',duration:60,difficulty:3,cap:20000,phase:3,
  desc:{es:'Muévete a la izquierda, a la derecha o salta para sobrevivir cada situación. Un error y se acaba.',en:'Move left, right or jump to survive each situation. One mistake and it is over.'},
  sim:k=>({raw:(300+Math.pow(Math.random(),1.3)*4200)*Math.pow(k,.8)}),
  create(dur){
  const LX=[250,400,550],GY=330,TYPES=['fall','cart','hole','zone','papers','choice'];
  const g={dur,t:0,li:1,px:400,jy:0,vy:0,sit:null,gap:.8,count:0,pts:0,dead:0,fl:[],msg:'',msgT:0,over:false,ph:0,last:''};
  const onGround=()=>g.jy<4;
  function newSit(){
    let ty;do{ty=TYPES[Math.random()*TYPES.length|0]}while(ty===g.last&&Math.random()<.7);g.last=ty;
    const warn=Math.max(.55,1.25-g.count*.035),two=g.count>=6&&Math.random()<.5;
    const s={ty,t:0,warn,lanes:[],side:Math.random()<.5?-1:1,done:false};
    if(ty==='fall'||ty==='hole'){const a=[0,1,2];shuffle(a);s.lanes=a.slice(0,two?2:1)}
    if(ty==='zone'){const safe=Math.random()*3|0;s.lanes=[0,1,2].filter(i=>i!==safe)}
    if(ty==='choice'){const safe=Math.random()<.5?0:2;s.safe=safe;s.lanes=[0,1,2].filter(i=>i!==safe)}
    s.len=ty==='cart'||ty==='papers'?warn+1.1:ty==='hole'?warn+1.1:warn+.45;
    g.sit=s;
  }
  function die(){if(g.dead)return;g.dead=1;g.msg=t('die.dead');g.msgT=2;SFX.gameover()}
  const go=d=>{if(g.dead)return;g.li=clamp(g.li+d,0,2);tone(500,.04,'triangle',.03)};
  const jump=()=>{if(g.dead||!onGround())return;g.vy=720;tone(520,.08,'square',.04,1.6)};
  g.down=(x)=>{if(x<300)go(-1);else if(x>500)go(1);else jump()};
  g.key=(k,d)=>{if(!d)return;if(k==='ArrowLeft'||k==='KeyA')go(-1);if(k==='ArrowRight'||k==='KeyD')go(1);if(k==='ArrowUp'||k==='Space'||k==='KeyW')jump()};
  g.update=dt=>{
    g.msgT-=dt;g.ph+=dt*8;
    if(g.dead){g.dead+=dt;if(g.dead>1.3)g.over=true;return}
    g.px+=(LX[g.li]-g.px)*Math.min(1,dt*18);
    if(!onGround()||g.vy>0){g.vy-=1900*dt;g.jy=Math.max(0,g.jy+g.vy*dt);if(g.jy===0)g.vy=0}
    if(!g.sit){g.gap-=dt;if(g.gap<=0)newSit();return}
    const s=g.sit;s.t+=dt;const k=s.t-s.warn;const inLane=s.lanes.includes(g.li);
    if(k>=0){
      if(s.ty==='fall'&&k<.3){if(k>.22&&inLane)die()}
      if((s.ty==='zone'||s.ty==='choice')&&k<.4&&inLane)die();
      if(s.ty==='hole'&&inLane&&onGround())die();
      if(s.ty==='cart'||s.ty==='papers'){const sp=s.ty==='cart'?900:1150,x=s.side<0?-80+k*sp:880-k*sp;s.cx=x;if(Math.abs(x-g.px)<40&&g.jy<(s.ty==='cart'?46:34))die()}
    }
    if(s.t>=s.len&&!g.dead){g.count++;g.pts+=100;SFX.hit();floatTxt(g.fl,g.px,GY-120,'+100','#fff',22);
      if(g.count%5===0){g.pts+=500;g.msg=t('die.bonus');g.msgT=1.2;SFX.combo()}
      g.sit=null;g.gap=Math.max(.25,.6-g.count*.015)}
  };
  g.score=()=>g.pts;g.acc=()=>null;g.maxCombo=()=>g.count;
  g.auto=dt=>{g._bt=(g._bt||0)-dt;const s=g.sit;if(!s||g.dead||g._bt>0)return;const k=s.t-s.warn;
    if(['fall','hole','zone','choice'].includes(s.ty)&&s.lanes.includes(g.li)){const safe=[0,1,2].filter(i=>!s.lanes.includes(i)).sort((a,b)=>Math.abs(a-g.li)-Math.abs(b-g.li))[0];if(safe!=null){botTap(g,safe<g.li?120:680,360);g._bt=.25}return}
    if((s.ty==='cart'||s.ty==='papers')&&k>=0&&s.cx!=null&&Math.abs(s.cx-g.px)<150&&onGround()){botTap(g,400,360);g._bt=.6}};
  g.draw=c=>{
    c.fillStyle='#E9E2D3';c.fillRect(0,0,800,400);
    for(let i=0;i<4;i++){rr(c,40+i*200,70,120,110,8);c.fillStyle='#BFE4FA';c.fill();c.lineWidth=4;c.strokeStyle=INK;c.stroke();c.beginPath();c.moveTo(100+i*200,70);c.lineTo(100+i*200,180);c.moveTo(40+i*200,125);c.lineTo(160+i*200,125);c.lineWidth=3;c.stroke()}
    c.fillStyle='#C99A6B';c.fillRect(0,GY,800,70);c.strokeStyle=INK;c.lineWidth=4;c.beginPath();c.moveTo(0,GY);c.lineTo(800,GY);c.stroke();
    const s=g.sit,k=s?s.t-s.warn:-1,blink=(g.t*10|0)%2;
    LX.forEach((x,i)=>{const danger=s&&s.lanes.includes(i)&&(s.ty==='zone'||s.ty==='choice'||s.ty==='hole');
      const hole=s&&s.ty==='hole'&&k>=0&&s.lanes.includes(i);
      rr(c,x-62,GY+6,124,22,6);c.fillStyle=hole?'#1F2A3A':danger&&blink?'#F6B1B1':'#E2C79F';c.fill();c.lineWidth=3;c.strokeStyle=INK;c.stroke();
      if((s&&(s.ty==='zone'||s.ty==='choice')&&s.lanes.includes(i))){c.fillStyle=k>=0?'rgba(255,210,63,.75)':'rgba(232,90,90,.18)';c.fillRect(x-62,0,124,GY);
        if(k>=0&&k<.4){c.strokeStyle='#FFD23F';c.lineWidth=6;c.beginPath();c.moveTo(x,0);for(let y=0;y<GY;y+=30)c.lineTo(x+(y/30%2?18:-18),y);c.stroke()}}});
    if(s&&s.ty==='choice'&&k<0){rr(c,340,30,120,56,10);c.fillStyle='#FFD23F';c.fill();c.lineWidth=4;c.strokeStyle=INK;c.stroke();txt(c,s.safe===0?'←':'→',400,60,40,{align:'center',fill:INK,stroke:false})}
    if(s&&s.ty==='fall'){s.lanes.forEach(i=>{const x=LX[i];
      if(k<0){const f=s.t/s.warn;c.beginPath();c.ellipse(x,GY+2,30+f*20,8,0,0,7);c.fillStyle=`rgba(31,42,58,${.15+f*.35})`;c.fill();txt(c,'!',x,GY-30,30,{align:'center',fill:'#E85A5A'})}
      else{const y=Math.min(GY-30,-60+k/.25*(GY+30));rr(c,x-34,y-30,68,60,8);c.fillStyle='#9FB3C8';c.fill();c.lineWidth=4;c.strokeStyle=INK;c.stroke();rr(c,x-24,y-20,48,26,4);c.fillStyle='#BFE4FA';c.fill();c.stroke()}})}
    if(s&&(s.ty==='cart'||s.ty==='papers')){
      if(k<0){txt(c,s.side<0?'⟹':'⟸',s.side<0?50:750,GY-40,34,{align:'center',fill:'#E85A5A'});txt(c,'!',s.side<0?50:750,GY-90,34,{align:'center',fill:'#FFD23F'})}
      else if(s.cx!=null){const x=s.cx;c.save();c.translate(x,0);
        if(s.ty==='cart'){rr(c,-40,GY-44,80,34,6);c.fillStyle='#FF7A2F';c.fill();c.lineWidth=4;c.strokeStyle=INK;c.stroke();[-24,24].forEach(o=>{c.beginPath();c.arc(o,GY-6,8,0,7);c.fillStyle=INK;c.fill()});rr(c,-30,GY-74,26,30,4);c.fillStyle='#E2C79F';c.fill();c.stroke()}
        else{for(let i=0;i<4;i++){c.save();c.translate(i*16*-s.side,GY-20-i*4);c.rotate(Math.sin(g.t*20+i)*.3);c.fillStyle='#fff';c.fillRect(-14,-10,28,20);c.lineWidth=2;c.strokeStyle=INK;c.strokeRect(-14,-10,28,20);c.restore()}}
        c.restore()}}
    c.save();if(g.dead){c.translate(g.px,GY);c.rotate(-1.4);c.translate(-g.px,-GY)}
    stick(c,g.px,GY-g.jy,g.ph,g.jy>2?'jump':g.dead?'jump':'run');c.restore();
    [[0,t('die.left')],[1,t('die.jump')],[2,t('die.right')]].forEach(([i,l])=>{const x=[90,400,710][i];rr(c,x-70,350,140,40,12);c.fillStyle='rgba(255,253,246,.6)';c.fill();c.lineWidth=2;c.strokeStyle=INK;c.stroke();txt(c,l,x,371,12,{align:'center',font:'Press Start 2P',stroke:false,fill:INK})});
    drawFloats(c,g.fl,1/60);
    txt(c,t('die.survived',{n:g.count}),400,62,13,{align:'center',font:'Press Start 2P',sw:.45});
    if(g.msgT>0)txt(c,g.msg,400,220,32,{align:'center',fill:'#FFD23F'});
    hud(c,g,{});
  };
  return g;
}});

/* ---------- FASE 4 · Café express ---------- */
registerGame({id:'coffee_rush',name:{es:'Café express',en:'Coffee Rush'},category:'speed',duration:45,difficulty:2,cap:30000,phase:4,
  desc:{es:'Lee el pedido del cliente, toca los ingredientes que pide y luego SERVIR. Si te equivocas, toca TIRAR y empieza otra vez.',en:'Read the customer\'s order, tap the ingredients it asks for and then SERVE. If you make a mistake, tap TOSS and start again.'},
  tips:{es:{ctrl:'Toca los ingredientes del pedido y luego SERVIR',plus:'Pedido correcto +100 · Rápido +200',minus:'Pedido equivocado −100 · Si tardas, el cliente se va'},
        en:{ctrl:'Tap the ordered ingredients, then SERVE',plus:'Correct order +100 · Fast +200',minus:'Wrong order −100 · If you are slow, the customer leaves'}},ctrlIcon:'buttons',
  sim:k=>({raw:(400+Math.random()*3600)*k,acc:rand(.6,1)}),
  create(dur){
  const ING=['coffee','milk','sugar','ice','choco','cinna'],COL={coffee:'#6B4226',milk:'#FFFFFF',sugar:'#F7F2E2',ice:'#BDE6FA',choco:'#8A5A35',cinna:'#C9662B'};
  const BG={coffee:'#E8D3BE',milk:'#EAF4FB',sugar:'#FFF6D6',ice:'#DDF1FB',choco:'#EADBC9',cinna:'#F8DCC6'};
  const BTN=ING.map((k,i)=>({k,x:12+i*112,y:304,w:104,h:88}));
  const SERVE={x:690,y:202,w:100,h:90},TRASH={x:690,y:112,w:100,h:70};
  const g={dur,t:0,order:null,cup:[],served:0,ok:0,expired:0,pts:0,streak:0,mx:0,wait:0,fl:[],msg:'',msgT:0,press:'',pressT:0,over:false,mood:0,shake:0,av:0};
  function newOrder(){
    const n=g.served<2?2:g.served<6?3:4,o=['coffee'];
    while(o.length<n){const k=ING[1+Math.random()*5|0];if(g.served>=8||!o.includes(k))o.push(k)}
    g.order={items:o,age:0,pat:Math.max(5,10-g.served*.3)};g.cup=[];g.av=Math.random()*12|0;g.mood=0;
  }
  newOrder();
  const counts=a=>a.reduce((m,k)=>(m[k]=(m[k]||0)+1,m),{});
  const complete=()=>{if(!g.order)return false;const need=counts(g.order.items),have=counts(g.cup);return Object.keys(need).every(k=>have[k]===need[k])&&Object.keys(have).every(k=>need[k])};
  function finish(kind){
    if(kind==='ok'){const fast=g.order.age<g.order.pat*.5,base=fast?200:100;g.streak++;g.mx=Math.max(g.mx,g.streak);const m=comboMult(g.streak),gain=base*m;g.pts+=gain;g.ok++;
      g.msg=(fast?t('cof.perfect'):t('cof.ok'))+' +'+gain;g.mood=1;if(m>comboMult(g.streak-1))SFX.combo();else SFX.levelup()}
    else if(kind==='bad'){g.pts-=100;g.streak=0;g.msg=t('cof.bad')+' −100';g.mood=-1;g.shake=.4;SFX.miss()}
    else{g.expired++;g.streak=0;g.msg=t('cof.left');g.mood=-1;SFX.miss()}
    g.served++;g.msgT=1.1;g.order=null;g.wait=.7;
  }
  g.down=(x,y)=>{
    if(!g.order)return;
    const b=BTN.find(q=>hitR(q,x,y));
    if(b){if(g.cup.length<7){g.cup.push(b.k);g.press=b.k;g.pressT=.12;const need=counts(g.order.items),have=counts(g.cup);if(!need[b.k]||have[b.k]>need[b.k]){g.shake=.25;tone(220,.08,'square',.04)}else SFX.click()}return}
    if(hitR(SERVE,x,y)){g.press='serve';g.pressT=.12;finish(complete()?'ok':'bad');return}
    if(hitR(TRASH,x,y)){g.press='trash';g.pressT=.12;g.cup=[];tone(200,.08,'sawtooth',.03)}
  };
  g.key=(k,d)=>{if(!d)return;const i={Digit1:0,Digit2:1,Digit3:2,Digit4:3,Digit5:4,Digit6:5}[k];if(i!=null){const b=BTN[i];g.down(b.x+5,b.y+5)}if(k==='Enter'||k==='Space')g.down(SERVE.x+5,SERVE.y+5);if(k==='Backspace')g.down(TRASH.x+5,TRASH.y+5)};
  g.update=dt=>{g.msgT-=dt;g.pressT-=dt;g.shake=Math.max(0,g.shake-dt);
    if(!g.order){g.wait-=dt;if(g.wait<=0)newOrder();return}
    g.order.age+=dt;if(g.order.age>=g.order.pat)finish('late')};
  g.score=()=>g.pts;g.acc=()=>g.served?g.ok/g.served:null;g.maxCombo=()=>g.mx;
  g.auto=dt=>{g._bt=(g._bt||0)-dt;if(g._bt>0||!g.order||g.order.age<.8)return;const need=counts(g.order.items),have=counts(g.cup);
    const k=Object.keys(need).find(k=>(have[k]||0)<need[k]);if(k){const b=BTN.find(q=>q.k===k);botTap(g,b.x+b.w/2,b.y+b.h/2)}else botTap(g,SERVE.x+50,SERVE.y+45);g._bt=.6};
  function ing(c,k,x,y,s=1){c.save();c.translate(x,y);c.scale(s,s);c.lineWidth=2.5;c.strokeStyle=INK;c.lineJoin='round';
    if(k==='coffee'){c.beginPath();c.ellipse(0,0,10,14,.4,0,7);c.fillStyle='#6B4226';c.fill();c.stroke();c.beginPath();c.moveTo(-4,-10);c.quadraticCurveTo(4,0,-2,10);c.stroke()}
    else if(k==='milk'){c.beginPath();c.moveTo(-10,-6);c.lineTo(0,-16);c.lineTo(10,-6);c.lineTo(10,16);c.lineTo(-10,16);c.closePath();c.fillStyle='#fff';c.fill();c.stroke();c.fillStyle='#2FA8E8';c.fillRect(-10,2,20,6)}
    else if(k==='sugar'){c.fillStyle='#fff';c.fillRect(-11,-11,22,22);c.strokeRect(-11,-11,22,22);c.beginPath();c.moveTo(-11,-11);c.lineTo(-5,-16);c.lineTo(16,-16);c.lineTo(11,-11);c.moveTo(16,-16);c.lineTo(16,6);c.lineTo(11,11);c.stroke()}
    else if(k==='ice'){c.fillStyle='#BDE6FA';c.fillRect(-12,-12,24,24);c.strokeRect(-12,-12,24,24);c.strokeStyle='#fff';c.beginPath();c.moveTo(-7,-7);c.lineTo(-1,-7);c.stroke()}
    else if(k==='choco'){c.fillStyle='#8A5A35';c.fillRect(-14,-10,28,20);c.strokeRect(-14,-10,28,20);c.beginPath();c.moveTo(0,-10);c.lineTo(0,10);c.moveTo(-14,0);c.lineTo(14,0);c.stroke()}
    else{c.rotate(-.5);c.fillStyle='#C9662B';c.fillRect(-16,-5,32,10);c.strokeRect(-16,-5,32,10);c.beginPath();c.moveTo(-16,0);c.lineTo(16,0);c.stroke()}
    c.restore()}
  g.draw=c=>{
    c.fillStyle='#F3E3C3';c.fillRect(0,0,800,400);
    c.fillStyle='#E9D2A6';for(let x=0;x<800;x+=56)c.fillRect(x,0,28,236);
    rr(c,536,50,140,96,8);c.fillStyle='#2F5D50';c.fill();c.lineWidth=4;c.strokeStyle='#8A5A35';c.stroke();
    txt(c,'MENÚ',606,68,11,{align:'center',font:'Press Start 2P',stroke:false,fill:'#FFFDF6'});
    ['Latte','Moka','Frappé'].forEach((n,i)=>txt(c,n,606,92+i*17,12,{align:'center',stroke:false,fill:'#E9D2A6',font:'Nunito'}));
    c.fillStyle='#8A5A35';c.fillRect(0,236,800,170);c.fillStyle='#A8714A';c.fillRect(0,236,800,14);c.strokeStyle=INK;c.lineWidth=4;c.beginPath();c.moveTo(0,236);c.lineTo(800,236);c.stroke();
    rr(c,560,160,96,80,10);c.fillStyle='#9FB3C8';c.fill();c.lineWidth=4;c.stroke();rr(c,572,172,72,24,4);c.fillStyle=INK;c.fill();c.beginPath();c.arc(608,224,7,0,7);c.fillStyle='#E85A5A';c.fill();c.lineWidth=2;c.stroke();
    if(g.order){const o=g.order,f=o.age/o.pat;
      c.save();c.translate(60,170);
      c.beginPath();c.arc(0,-48,26,0,7);c.fillStyle=AVC[g.av%6];c.fill();c.lineWidth=4;c.strokeStyle=INK;c.stroke();
      c.beginPath();c.arc(0,-44,18,0,7);c.fillStyle='#fff';c.fill();c.lineWidth=3;c.stroke();
      c.fillStyle=INK;c.beginPath();c.arc(-6,-47,2.6,0,7);c.arc(6,-47,2.6,0,7);c.fill();
      c.lineWidth=3;c.beginPath();if(f<.5){c.arc(0,-42,6,.25,Math.PI-.25)}else if(f<.8){c.moveTo(-6,-37);c.lineTo(6,-37)}else{c.arc(0,-34,6,Math.PI+.3,-.3)}c.stroke();
      if(f>.8){c.strokeStyle='#E85A5A';c.beginPath();c.moveTo(-12,-60);c.lineTo(-3,-56);c.moveTo(12,-60);c.lineTo(3,-56);c.stroke()}
      c.strokeStyle=INK;c.lineWidth=5;c.beginPath();c.moveTo(0,-22);c.lineTo(0,34);c.moveTo(0,-8);c.lineTo(-22,16);c.moveTo(0,-8);c.lineTo(22,16);c.stroke();c.restore();
      c.save();if(g.shake>0)c.translate(Math.sin(g.t*80)*5,0);
      rr(c,118,54,190,178,8);c.fillStyle='#fff';c.fill();c.lineWidth=4;c.strokeStyle=INK;c.stroke();
      c.fillStyle='#FFD23F';rr(c,118,54,190,30,8);c.fill();c.stroke();
      txt(c,t('cof.order'),213,70,11,{align:'center',font:'Press Start 2P',stroke:false,fill:INK});
      const need=counts(o.items),have=counts(g.cup),keys=Object.keys(need);
      keys.forEach((k,i)=>{const y=104+i*32,done=(have[k]||0)>=need[k],over=(have[k]||0)>need[k];
        rr(c,128,y-13,26,26,6);c.fillStyle=done?(over?'#F6B1B1':'#5BCB4A'):'#fff';c.fill();c.lineWidth=2.5;c.strokeStyle=INK;c.stroke();
        if(done){c.strokeStyle=over?'#B33A3A':'#fff';c.lineWidth=4;c.beginPath();if(over){c.moveTo(134,y-6);c.lineTo(148,y+6);c.moveTo(148,y-6);c.lineTo(134,y+6)}else{c.moveTo(133,y);c.lineTo(139,y+6);c.lineTo(149,y-6)}c.stroke()}
        ing(c,k,174,y,.8);txt(c,t('ing.'+k)+(need[k]>1?' x'+need[k]:''),196,y+1,15,{stroke:false,fill:INK,font:'Nunito'})});
      const extra=Object.keys(have).filter(k=>!need[k]);if(extra.length)txt(c,'✗ '+extra.map(k=>t('ing.'+k)).join(', '),128,104+keys.length*32,12,{stroke:false,fill:'#B33A3A',font:'Nunito'});
      rr(c,128,214,170,9,4);c.fillStyle='#E2E8EE';c.fill();rr(c,128,214,170*(1-f),9,4);c.fillStyle=f>.7?'#E85A5A':'#5BCB4A';c.fill();
      c.restore()}
    const cx=420,cy=286;c.lineWidth=4;c.strokeStyle=INK;
    c.beginPath();c.moveTo(cx-56,cy-96);c.lineTo(cx+56,cy-96);c.lineTo(cx+44,cy+6);c.lineTo(cx-44,cy+6);c.closePath();c.fillStyle='#fff';c.fill();
    c.save();c.clip();g.cup.forEach((k,i)=>{const y=cy+6-(i+1)*14;c.fillStyle=COL[k];c.fillRect(cx-60,y,120,14);c.strokeStyle='rgba(31,42,58,.25)';c.lineWidth=1;c.beginPath();c.moveTo(cx-60,y);c.lineTo(cx+60,y);c.stroke()});c.restore();
    c.lineWidth=4;c.strokeStyle=INK;c.beginPath();c.moveTo(cx-56,cy-96);c.lineTo(cx+56,cy-96);c.lineTo(cx+44,cy+6);c.lineTo(cx-44,cy+6);c.closePath();c.stroke();
    c.beginPath();c.arc(cx+58,cy-50,18,-1.3,1.3);c.stroke();
    rr(c,cx-30,cy-60,60,24,6);c.fillStyle='#FFD23F';c.fill();c.lineWidth=2.5;c.stroke();txt(c,'KING',cx,cy-47,11,{align:'center',font:'Press Start 2P',stroke:false,fill:INK});
    BTN.forEach(b=>{const on=g.press===b.k&&g.pressT>0;if(!on){rr(c,b.x,b.y+6,b.w,b.h,14);c.fillStyle=INK;c.fill()}
      rr(c,b.x,b.y+(on?6:0),b.w,b.h,14);c.fillStyle=BG[b.k];c.fill();c.lineWidth=3;c.strokeStyle=INK;c.stroke();
      ing(c,b.k,b.x+b.w/2,b.y+32+(on?6:0),1.25);txt(c,t('ing.'+b.k),b.x+b.w/2,b.y+70+(on?6:0),14,{align:'center',stroke:false,fill:INK,font:'Nunito'})});
    const ready=complete(),pulse=ready?1+Math.sin(g.t*10)*.04:1;
    c.save();c.translate(SERVE.x+SERVE.w/2,SERVE.y+SERVE.h/2);c.scale(pulse,pulse);c.translate(-(SERVE.x+SERVE.w/2),-(SERVE.y+SERVE.h/2));
    btnDraw(c,SERVE,t('cof.serve'),ready?'#5BCB4A':'#9DBF97',g.press==='serve'&&g.pressT>0,19);c.restore();
    btnDraw(c,TRASH,t('cof.trash'),'#E85A5A',g.press==='trash'&&g.pressT>0,16);
    if(g.msgT>0)txt(c,g.msg,420,160,26,{align:'center',fill:g.mood>0?'#FFD23F':'#E85A5A'});
    hud(c,g,{combo:g.streak});
  };
  return g;
}});

/* ---------- FASE 4 · Patrulla aérea (reemplaza Bandeja limpia) ---------- */
registerGame({id:'sky_patrol',name:{es:'Patrulla aérea',en:'Sky Patrol'},category:'reflex',duration:60,difficulty:2,cap:40000,phase:4,
  desc:{es:'Arrastra el dedo para mover tu avión. Dispara solo. Derriba aviones enemigos y esquiva sus balas.',en:'Drag your finger to move your plane. It fires by itself. Shoot down enemy planes and dodge their bullets.'},
  tips:{es:{ctrl:'Arrastra el dedo por la pantalla; el avión lo sigue',plus:'Caza +50 · Acróbata +100 · Bombardero +300 · ★ disparo triple',minus:'Si te tocan las balas pierdes una vida (tienes 3)'},
        en:{ctrl:'Drag your finger; the plane follows',plus:'Fighter +50 · Ace +100 · Bomber +300 · ★ triple shot',minus:'Getting hit costs a life (you have 3)'}},ctrlIcon:'drag',
  sim:k=>({raw:(700+Math.random()*5200)*k,acc:rand(.4,.9)}),
  create(dur){
  const g={dur,t:0,px:150,py:200,tx:150,ty:200,shots:[],eb:[],en:[],pu:[],fireT:0,triple:0,lives:3,inv:0,pts:0,streak:0,mx:0,kills:0,fired:0,hits:0,spawnT:1,waveN:0,fl:[],fx:[],over:false,scroll:0};
  const ISL=[{x:300,y:90,r:46},{x:820,y:300,r:60},{x:1300,y:140,r:38},{x:1750,y:260,r:52}];
  let pid=null,ox=0,oy=0;
  g.down=(x,y,id)=>{pid=id;ox=g.px-x;oy=g.py-y;if(id==='bot'){ox=0;oy=0}};
  g.move=(x,y,id)=>{if(id!==pid)return;g.tx=x+ox;g.ty=y+oy};
  g.up=id=>{if(id===pid)pid=null};
  g.key=(k,d)=>{g['k'+k]=d};
  function spawnWave(){
    g.waveN++;const r=Math.random(),lv=Math.min(4,1+Math.floor(g.t/(dur/4)));
    if(r<.45){const y0=rand(90,310);for(let i=0;i<4+lv;i++)g.en.push({type:'f',x:840+i*48,y:y0,vx:-(150+lv*20),ph:i*.6,amp:rand(20,60),hp:1,shootT:rand(1,3)})}
    else if(r<.75){for(let i=0;i<3+lv;i++)g.en.push({type:'z',x:840+i*70,y:rand(80,320),vx:-(190+lv*25),ph:i,amp:90,hp:1,shootT:rand(.8,2)})}
    else g.en.push({type:'b',x:860,y:rand(120,280),vx:-(70+lv*10),ph:0,amp:20,hp:6+lv*2,max:6+lv*2,shootT:1});
    g.spawnT=Math.max(1.3,3.2-lv*.45)*rand(.8,1.2);
  }
  function hit(){if(g.inv>0)return;g.lives--;g.inv=1.8;g.streak=0;g.fx.push({x:g.px,y:g.py,l:1});SFX.miss();if(g.lives<=0)g.over=true}
  g.update=dt=>{
    g.scroll+=dt*90;g.inv-=dt;g.triple-=dt;
    if(g.kArrowUp)g.ty=g.py-220*dt*3;if(g.kArrowDown)g.ty=g.py+220*dt*3;if(g.kArrowLeft)g.tx=g.px-220*dt*3;if(g.kArrowRight)g.tx=g.px+220*dt*3;
    g.px+=(clamp(g.tx,40,520)-g.px)*Math.min(1,dt*10);g.py+=(clamp(g.ty,60,370)-g.py)*Math.min(1,dt*10);
    g.fireT-=dt;if(g.fireT<=0){g.fireT=.2;const ys=g.triple>0?[-12,0,12]:[-6,6];ys.forEach((o,i)=>g.shots.push({x:g.px+26,y:g.py+o,vy:g.triple>0?(i-1)*90:0}));g.fired++;if(g.t%1<.2)tone(1300,.02,'square',.012)}
    g.shots.forEach(s=>{s.x+=620*dt;s.y+=s.vy*dt});g.shots=g.shots.filter(s=>s.x<820);
    g.spawnT-=dt;if(g.spawnT<=0)spawnWave();
    g.en.forEach(e=>{e.ph+=dt*(e.type==='z'?3:2);e.x+=e.vx*dt;e.y+=Math.cos(e.ph)*e.amp*dt*(e.type==='z'?3:1.5);e.y=clamp(e.y,70,360);
      e.shootT-=dt;if(e.shootT<=0&&e.x<780&&e.x>g.px+60){e.shootT=e.type==='b'?1.1:rand(1.6,3);const a=Math.atan2(g.py-e.y,g.px-e.x),sp=e.type==='b'?200:230;
        (e.type==='b'?[-.25,0,.25]:[0]).forEach(o=>g.eb.push({x:e.x-16,y:e.y,vx:Math.cos(a+o)*sp,vy:Math.sin(a+o)*sp}))}});
    g.en=g.en.filter(e=>e.x>-60);
    g.eb.forEach(b=>{b.x+=b.vx*dt;b.y+=b.vy*dt});g.eb=g.eb.filter(b=>{if(b.x<-20||b.x>820||b.y<40||b.y>420)return false;if(Math.abs(b.x-g.px)<16&&Math.abs(b.y-g.py)<12){hit();return false}return true});
    g.en.forEach(e=>{if(Math.abs(e.x-g.px)<(e.type==='b'?44:26)&&Math.abs(e.y-g.py)<(e.type==='b'?30:18)){hit();e.hp=0;e.crash=1}});
    for(let i=g.shots.length-1;i>=0;i--){const s=g.shots[i];const e=g.en.find(e=>e.hp>0&&Math.abs(e.x-s.x)<(e.type==='b'?42:20)&&Math.abs(e.y-s.y)<(e.type==='b'?28:16));
      if(e){g.shots.splice(i,1);g.hits++;e.hp--;if(e.hp<=0){const base=e.type==='b'?300:e.type==='z'?100:50;g.kills++;g.streak++;g.mx=Math.max(g.mx,g.streak);const m=comboMult(g.streak);g.pts+=base*m;
        floatTxt(g.fl,e.x,e.y-24,'+'+base*m,e.type==='b'?'#FFD23F':'#fff',e.type==='b'?26:18);g.fx.push({x:e.x,y:e.y,l:e.type==='b'?1.4:.8});
        if(e.type==='b'||Math.random()<.08)g.pu.push({x:e.x,y:e.y});if(m>comboMult(g.streak-1))SFX.combo();else tone(400,.06,'square',.04,.5)}else tone(260,.03,'square',.03)}}
    g.en=g.en.filter(e=>e.hp>0);
    g.pu.forEach(p=>{p.x-=70*dt});g.pu=g.pu.filter(p=>{if(Math.hypot(p.x-g.px,p.y-g.py)<30){g.triple=8;floatTxt(g.fl,p.x,p.y-20,'x3','#FFD23F',24);SFX.levelup();return false}return p.x>-20});
    g.fx.forEach(f=>f.l-=dt*1.8);g.fx=g.fx.filter(f=>f.l>0);
  };
  g.score=()=>g.pts;g.acc=()=>g.fired?Math.min(1,g.hits/(g.fired*(g.triple>0?3:2))*2):null;g.maxCombo=()=>g.mx;
  g.auto=dt=>{const e=g.en.slice().sort((a,b)=>a.x-b.x)[0];let ty=e?e.y:200;const danger=g.eb.find(b=>Math.abs(b.x-g.px)<120&&Math.abs(b.y-g.py)<30);if(danger)ty=g.py+(danger.y>g.py?-70:70);
    if(!g._bh){g.down(g.px,g.py,'bot');g._bh=1}g.move(170,clamp(ty,70,360),'bot');g.hand={x:g.px-50,y:g.py+30,p:.2}};
  function plane(c,x,y,col,s=1,enemy=false){c.save();c.translate(x,y);c.scale(enemy?-s:s,s);c.lineWidth=3;c.strokeStyle=INK;c.lineJoin='round';
    rr(c,-20,-6,40,12,6);c.fillStyle=col;c.fill();c.stroke();
    c.beginPath();c.moveTo(-4,-6);c.lineTo(4,-26);c.lineTo(12,-26);c.lineTo(8,-6);c.closePath();c.fill();c.stroke();
    c.beginPath();c.moveTo(-4,6);c.lineTo(4,26);c.lineTo(12,26);c.lineTo(8,6);c.closePath();c.fill();c.stroke();
    c.beginPath();c.moveTo(-18,-3);c.lineTo(-24,-12);c.lineTo(-20,0);c.lineTo(-24,12);c.lineTo(-18,3);c.closePath();c.fill();c.stroke();
    c.beginPath();c.ellipse(6,0,6,4,0,0,7);c.fillStyle='#7CC6EE';c.fill();c.lineWidth=2;c.stroke();
    c.fillStyle='rgba(255,255,255,.7)';c.fillRect(21,-9,3,18);c.restore()}
  g.draw=c=>{
    c.fillStyle='#2F7FD0';c.fillRect(0,0,800,400);
    c.strokeStyle='rgba(255,255,255,.12)';c.lineWidth=2;for(let i=0;i<14;i++){const x=((i*97-g.scroll*1.4)%900+900)%900-50,y=(i*53)%400;c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+12,y-6,x+24,y);c.stroke()}
    ISL.forEach(s=>{const x=((s.x-g.scroll)%2000+2000)%2000-100;c.beginPath();c.arc(x,s.y,s.r+10,0,7);c.fillStyle='#F2D79C';c.fill();c.beginPath();c.arc(x,s.y,s.r,0,7);c.fillStyle='#5BCB4A';c.fill();c.lineWidth=3;c.strokeStyle=INK;c.stroke();
      c.fillStyle='#3FAE34';c.beginPath();c.arc(x-s.r*.3,s.y-s.r*.2,s.r*.35,0,7);c.fill()});
    g.pu.forEach(p=>{c.beginPath();c.arc(p.x,p.y,13,0,7);c.fillStyle='#FFD23F';c.fill();c.lineWidth=3;c.strokeStyle=INK;c.stroke();txt(c,'★',p.x,p.y+1,14,{align:'center',stroke:false,fill:INK})});
    g.shots.forEach(s=>{c.fillStyle='#FFD23F';c.fillRect(s.x-6,s.y-2,12,4);c.strokeStyle=INK;c.lineWidth=1.5;c.strokeRect(s.x-6,s.y-2,12,4)});
    g.eb.forEach(b=>{c.beginPath();c.arc(b.x,b.y,5,0,7);c.fillStyle='#E85A5A';c.fill();c.lineWidth=2;c.strokeStyle=INK;c.stroke()});
    g.en.forEach(e=>{if(e.type==='b'){plane(c,e.x,e.y,'#7E98AE',1.9,true);rr(c,e.x-30,e.y-50,60,7,3);c.fillStyle='rgba(255,255,255,.5)';c.fill();rr(c,e.x-30,e.y-50,60*e.hp/e.max,7,3);c.fillStyle='#E85A5A';c.fill()}
      else plane(c,e.x,e.y,e.type==='z'?'#FF7A2F':'#9FB3C8',1,true)});
    if(!(g.inv>0&&(g.t*12|0)%2))plane(c,g.px,g.py,g.triple>0?'#FFD23F':'#F5B400',1.2);
    g.fx.forEach(f=>{c.save();c.globalAlpha=Math.min(1,f.l);burst(c,f.x,f.y,26*(1.8-f.l*.6),'#FF7A2F','');c.restore()});
    drawFloats(c,g.fl,1/60);
    if(g.t<3)txt(c,t('sky.hint'),400,372,18,{align:'center'});
    hud(c,g,{lives:g.lives,lives0:3,combo:g.streak});
  };
  return g;
}});


/* ---------- FASE 4 · Impresora furiosa (destrúyela) ---------- */
registerGame({id:'printer_rage',name:{es:'Impresora furiosa',en:'Printer Rage'},category:'endurance',duration:45,difficulty:1,cap:40000,phase:4,
  desc:{es:'¡La impresora se trabó otra vez! Tócala muy rápido para destruirla. Cada una que rompes trae otra más grande.',en:'The printer jammed again! Tap it very fast to destroy it. Each one you break brings a bigger one.'},
  tips:{es:{ctrl:'Toca la impresora lo más rápido que puedas',plus:'+10 por golpe · ★ punto débil +30 · Destruirla da bono',minus:'Si tocas fuera de la impresora pierdes el combo'},
        en:{ctrl:'Tap the printer as fast as you can',plus:'+10 per hit · ★ weak spot +30 · Destroying it gives a bonus',minus:'Tapping outside the printer breaks your combo'}},ctrlIcon:'tap',
  sim:k=>({raw:(1200+Math.random()*6000)*k,acc:null}),
  create(dur){
  const MODELS=[{es:'Impresora de bolsillo',en:'Pocket printer',hp:18,w:150,h:80,col:'#BFE4FA'},{es:'Impresora de escritorio',en:'Desktop printer',hp:30,w:200,h:110,col:'#9FB3C8'},
    {es:'Láser de oficina',en:'Office laser',hp:45,w:240,h:140,col:'#C9D2DC'},{es:'Fotocopiadora',en:'Copier',hp:65,w:270,h:180,col:'#E2E8EE'},{es:'Impresora industrial',en:'Industrial printer',hp:90,w:300,h:210,col:'#7E98AE'}];
  const g={dur,t:0,n:0,pr:null,pts:0,streak:0,mx:0,last:-9,hits:0,miss:0,parts:[],fl:[],shake:0,punch:0,pose:0,weak:null,weakT:0,ko:0,over:false};
  function next(){const m=MODELS[Math.min(g.n,MODELS.length-1)],extra=Math.max(0,g.n-MODELS.length+1)*20;g.pr={m,hp:m.hp+extra,max:m.hp+extra,x:900,tx:500,y:330};g.weak=null;g.weakT=0}
  next();
  const box=()=>{const p=g.pr,m=p.m;return{x:p.x-m.w/2,y:p.y-m.h,w:m.w,h:m.h}};
  g.down=(x,y)=>{
    if(!g.pr||g.ko>0||Math.abs(g.pr.x-g.pr.tx)>4)return;
    const b=box();g.punch=.12;g.pose^=1;
    if(x<b.x-20||x>b.x+b.w+20||y<b.y-30||y>b.y+b.h+10){g.streak=0;g.miss++;tone(180,.05,'square',.03);return}
    const weak=g.weak&&Math.hypot(x-g.weak.x,y-g.weak.y)<34;
    g.hits++;g.streak=g.t-g.last<.6?g.streak+1:1;g.last=g.t;g.mx=Math.max(g.mx,g.streak);
    const m=g.streak>=40?4:g.streak>=20?3:g.streak>=10?2:1,base=weak?30:10,gain=base*m;g.pts+=gain;g.pr.hp-=weak?3:1;g.shake=.12;
    floatTxt(g.fl,x,y-20,'+'+gain,weak?'#FFD23F':'#fff',weak?24:16);
    for(let i=0;i<(weak?6:3);i++)g.parts.push({x,y,vx:rand(-260,260),vy:rand(-380,-80),r:Math.random()*6,l:1,k:Math.random()<.5?'paper':'bit',c:g.pr.m.col});
    if(weak){g.weak=null;g.weakT=.4;tone(900,.06,'square',.05,1.4)}else tone(200+Math.random()*80,.05,'square',.05,.6);
    if((m>1)&&(g.streak===10||g.streak===20||g.streak===40))SFX.combo();
    if(g.pr.hp<=0){const bonus=150*(g.n+1);g.pts+=bonus;g.ko=1.1;floatTxt(g.fl,g.pr.x,g.pr.y-g.pr.m.h-30,'K.O. +'+bonus,'#FFD23F',32);SFX.levelup();
      for(let i=0;i<30;i++)g.parts.push({x:g.pr.x+rand(-60,60),y:g.pr.y-g.pr.m.h/2,vx:rand(-420,420),vy:rand(-520,-100),r:Math.random()*6,l:1.4,k:Math.random()<.5?'paper':'bit',c:g.pr.m.col})}
  };
  g.key=(k,d)=>{if(d&&(k==='Space'||k==='Enter')&&g.pr){const b=box();g.down(b.x+b.w/2,b.y+b.h/2)}};
  g.update=dt=>{
    g.shake=Math.max(0,g.shake-dt);g.punch=Math.max(0,g.punch-dt);
    if(g.t-g.last>.6&&g.streak>0)g.streak=0;
    if(g.ko>0){g.ko-=dt;if(g.ko<=0){g.n++;next()}}
    else if(g.pr){g.pr.x+=(g.pr.tx-g.pr.x)*Math.min(1,dt*6);
      g.weakT-=dt;if(!g.weak&&g.weakT<=0&&Math.abs(g.pr.x-g.pr.tx)<4){const b=box();g.weak={x:rand(b.x+24,b.x+b.w-24),y:rand(b.y+20,b.y+b.h-20),l:1.3}}
      if(g.weak){g.weak.l-=dt;if(g.weak.l<=0){g.weak=null;g.weakT=rand(.5,1.2)}}}
    g.parts.forEach(p=>{p.vy+=900*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.r+=dt*6;p.l-=dt});g.parts=g.parts.filter(p=>p.l>0&&p.y<440);
  };
  g.score=()=>g.pts;g.acc=()=>g.hits+g.miss?g.hits/(g.hits+g.miss):null;g.maxCombo=()=>g.mx;
  g.auto=dt=>{g._bt=(g._bt||0)-dt;if(g._bt>0||!g.pr||g.ko>0)return;const b=box();const p=g.weak?{x:g.weak.x,y:g.weak.y}:{x:b.x+b.w/2+rand(-30,30),y:b.y+b.h/2+rand(-20,20)};botTap(g,p.x,p.y);g._bt=.13};
  g.draw=c=>{
    c.fillStyle='#E9E2D3';c.fillRect(0,0,800,400);
    for(let i=0;i<3;i++){rr(c,60+i*260,60,150,110,8);c.fillStyle='#BFE4FA';c.fill();c.lineWidth=4;c.strokeStyle=INK;c.stroke()}
    c.fillStyle='#C99A6B';c.fillRect(0,330,800,70);c.strokeStyle=INK;c.lineWidth=4;c.beginPath();c.moveTo(0,330);c.lineTo(800,330);c.stroke();
    const p=g.pr;
    if(p&&g.ko<=0||p&&g.ko>.8){const m=p.m,b=box(),dmg=1-p.hp/p.max;c.save();if(g.shake>0)c.translate(rand(-6,6),rand(-3,3));
      if(g.ko>0){c.globalAlpha=Math.max(0,(g.ko-.8)/.3)}
      rr(c,b.x,b.y,b.w,b.h,16);c.fillStyle=m.col;c.fill();c.lineWidth=5;c.strokeStyle=INK;c.stroke();
      rr(c,b.x+b.w*.15,b.y-14,b.w*.7,18,4);c.fillStyle='#fff';c.fill();c.lineWidth=3;c.stroke();
      rr(c,b.x+14,b.y+b.h*.2,b.w*.38,b.h*.28,6);c.fillStyle=INK;c.fill();txt(c,'ERROR',b.x+14+b.w*.19,b.y+b.h*.34,Math.max(9,b.w*.05),{align:'center',font:'Press Start 2P',stroke:false,fill:'#FF7A2F'});
      const ex=b.x+b.w*.72,ey=b.y+b.h*.32;[[ex-16,ey],[ex+16,ey]].forEach(([x,y])=>{c.beginPath();c.arc(x,y,9,0,7);c.fillStyle='#fff';c.fill();c.lineWidth=3;c.stroke();c.beginPath();c.arc(x+Math.sin(g.t*9)*2,y+2,4,0,7);c.fillStyle=INK;c.fill()});
      c.lineWidth=4;c.beginPath();c.moveTo(ex-26,ey-16);c.lineTo(ex-8,ey-10);c.moveTo(ex+26,ey-16);c.lineTo(ex+8,ey-10);c.moveTo(ex-12,ey+22);c.lineTo(ex+12,ey+22);c.stroke();
      rr(c,b.x+b.w*.2,b.y+b.h*.7,b.w*.6,b.h*.12,4);c.fillStyle='#43536A';c.fill();c.lineWidth=3;c.stroke();
      c.strokeStyle=INK;c.lineWidth=3;
      if(dmg>.25){c.beginPath();c.moveTo(b.x+b.w*.3,b.y);c.lineTo(b.x+b.w*.36,b.y+b.h*.3);c.lineTo(b.x+b.w*.3,b.y+b.h*.5);c.stroke()}
      if(dmg>.5){c.beginPath();c.moveTo(b.x+b.w,b.y+b.h*.4);c.lineTo(b.x+b.w*.8,b.y+b.h*.55);c.lineTo(b.x+b.w*.86,b.y+b.h*.8);c.stroke()}
      if(dmg>.75){c.fillStyle='rgba(60,60,60,.5)';for(let i=0;i<3;i++){c.beginPath();c.arc(b.x+b.w*.5+Math.sin(g.t*3+i)*20,b.y-30-i*18-((g.t*40)%18),12+i*4,0,7);c.fill()}}
      if(g.weak){const w=g.weak,pulse=1+Math.sin(g.t*14)*.15;c.save();c.translate(w.x,w.y);c.scale(pulse,pulse);c.beginPath();for(let i=0;i<10;i++){const r=i%2?9:20,a=-Math.PI/2+i*Math.PI/5;c.lineTo(Math.cos(a)*r,Math.sin(a)*r)}c.closePath();c.fillStyle='#FFD23F';c.fill();c.lineWidth=3;c.strokeStyle=INK;c.stroke();c.restore()}
      c.restore();
      const bw=300;rr(c,400-bw/2,70,bw,16,8);c.fillStyle='rgba(255,255,255,.7)';c.fill();rr(c,400-bw/2,70,bw*Math.max(0,p.hp/p.max),16,8);c.fillStyle=dmg>.7?'#E85A5A':'#FFD23F';c.fill();c.lineWidth=3;c.strokeStyle=INK;rr(c,400-bw/2,70,bw,16,8);c.stroke();
      txt(c,(g.n+1)+'. '+tx(m),400,102,14,{align:'center',stroke:false,fill:INK,font:'Nunito'})}
    const sx=p?Math.max(110,box().x-46):200;c.save();c.translate(sx,330);
    if(g.punch>0){c.strokeStyle=INK;c.lineWidth=5;c.lineCap='round';c.beginPath();if(g.pose){c.moveTo(4,-58);c.lineTo(48,-60)}else{c.moveTo(0,-36);c.lineTo(46,-30)}c.stroke()}
    stick(c,0,0,g.t*6,g.punch>0?'jump':'run');c.restore();
    g.parts.forEach(q=>{c.save();c.translate(q.x,q.y);c.rotate(q.r);c.globalAlpha=Math.min(1,q.l);c.fillStyle=q.k==='paper'?'#fff':q.c;c.fillRect(-7,-5,14,10);c.lineWidth=1.5;c.strokeStyle=INK;c.strokeRect(-7,-5,14,10);c.restore()});
    if(g.ko>0)burst(c,p.x,p.y-p.m.h/2,90*(1.4-g.ko*.3),'#FFD23F','K.O.!',28);
    drawFloats(c,g.fl,1/60);
    if(g.t<3)txt(c,t('pr.hint'),400,372,18,{align:'center'});
    const m=g.streak>=40?4:g.streak>=20?3:g.streak>=10?2:1;hud(c,g,{combo:g.streak>=10?g.streak:0,mult:m});
  };
  return g;
}});

