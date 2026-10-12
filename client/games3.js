
/* =====================================================================
   JUEGOS NUEVOS (tanda 1)
   ===================================================================== */
Object.assign(L.es,{'moto.red':'¡EN ROJO! +150','moto.crash':'¡CHOQUE!','moto.coins':'MONEDAS',
 'snd.test':'Probar sonido','snd.ok':'¿Escuchaste un sonido? Si no: sube el volumen y, en iPhone, revisa que no esté en silencio.','mus.phone':'Música en este celular','ad.tab.music':'Música'});
Object.assign(L.en,{'moto.red':'RED LIGHT! +150','moto.crash':'CRASH!','moto.coins':'COINS',
 'snd.test':'Test sound','snd.ok':'Did you hear a sound? If not, turn up the volume and, on iPhone, check silent mode.','mus.phone':'Music on this phone','ad.tab.music':'Music'});
IC.motomamacita=`<svg ${ICON_ATTR}><rect x="19" y="30" width="10" height="15" rx="4" fill="#1F2A3A"/><path d="M13 30h22l-3-9H16z" fill="#E8443A"/><rect x="21" y="25" width="6" height="3" fill="#FFD23F" stroke="none"/><path d="M17 21l2-8h10l2 8z" fill="#E0457B"/><circle cx="24" cy="9" r="6" fill="#1F2A3A"/><path d="M28 12q8 3 6 10" stroke="#8A4A22" stroke-width="3"/><path d="M9 19h30"/></svg>`;

/* ---------- Motomamacita (moto en avenida recta, pixel art) ---------- */
registerGame({id:'motomamacita',name:{es:'Motomamacita',en:'Moto Mamacita'},category:'speed',duration:60,difficulty:2,cap:60000,phase:5,
  desc:{es:'Maneja la moto por la avenida: esquiva carros, agarra monedas y turbos y pásate los semáforos en rojo.',en:'Ride down the avenue: dodge cars, grab coins and turbos, and run the red lights.'},
  tips:{es:{ctrl:'Mantén IZQUIERDA o DERECHA para moverte de carril; la moto acelera sola',plus:'Cada metro suma · moneda +25 · TURBO +100 · cruzar un semáforo en ROJO sin chocar +150',minus:'Chocar con un carro te frena casi por completo'},
        en:{ctrl:'Hold LEFT or RIGHT to change lanes; the bike speeds up by itself',plus:'Every meter counts · coin +25 · TURBO +100 · cross a RED light without crashing +150',minus:'Hitting a car almost stops you'}},ctrlIcon:'buttons',
  sim:k=>({raw:(1500+Math.random()*5500)*k,acc:rand(.5,.95)}),
  create(dur){
  const W=320,H=160,HOR=66,K=430,LANES=[-.75,-.25,.25,.75];
  const off=document.createElement('canvas');off.width=W;off.height=H;const o=off.getContext('2d');
  const g={dur,t:0,pos:0,v:30,x:.25,steer:0,cars:[],nextCar:90,coins:[],nextCoin:60,pads:[],nextPad:240,inters:[],nextInter:260,
    boost:0,inv:0,shake:0,fl:[],ptrs:new Map(),keys:{},nCoins:0,reds:0,hits:0,pass:0,streak:0,mx:0,bonus:0,lean:0};
  const BL={x:24,y:292,w:150,h:88},BR={x:626,y:292,w:150,h:88};
  g.down=(x,y,id)=>g.ptrs.set(id,x);g.move=(x,y,id)=>{if(g.ptrs.has(id))g.ptrs.set(id,x)};g.up=id=>g.ptrs.delete(id);g.key=(k,d)=>{g.keys[k]=d};
  const halfAt=y=>(y-HOR)*1.45;            // media anchura de la calle en pantalla
  const zAt=y=>K/(y-HOR);                  // distancia a la que está esa línea
  const yAt=z=>HOR+K/z;
  const PY=H-14,PH=halfAt(PY);             // línea de la moto
  const crash=(msg)=>{g.hits++;g.streak=0;g.v*=.28;g.shake=.45;g.inv=1.3;floatTxt(g.fl,400,235,msg||t('moto.crash'),'#E85A5A',30);tone(90,.35,'square',.08,.5)};
  g.update=dt=>{
    let Lf=g.keys.ArrowLeft||g.keys.KeyA,R=g.keys.ArrowRight||g.keys.KeyD;
    g.ptrs.forEach(px=>{if(px<400)Lf=true;else R=true});
    g.steer=(R?1:0)-(Lf?1:0);g.lean+=(g.steer-g.lean)*Math.min(1,dt*10);
    g.boost=Math.max(0,g.boost-dt);g.inv=Math.max(0,g.inv-dt);g.shake=Math.max(0,g.shake-dt);
    const curb=Math.abs(g.x)>.95,vmax=curb?35:g.boost>0?140:92+Math.min(18,g.t*.3);
    if(g.v<vmax)g.v+=(g.boost>0?75:curb?10:16)*dt*(g.boost>0?1:1.2-g.v/120);else g.v-=40*dt;
    g.x=clamp(g.x+g.steer*2.1*dt*(.55+g.v/180),-1.12,1.12);
    g.pos+=g.v*dt;
    /* tráfico en el mismo sentido */
    if(g.pos+300>g.nextCar){const lane=LANES[Math.random()*4|0],big=Math.random()<.15;
      g.cars.push({s:g.nextCar,x:lane,v:rand(26,46),big,c:['#FFC93C','#3B6FD8','#F4F4F4','#7FD1C7','#E86A5A','#B9A6F0'][Math.random()*6|0]});
      g.nextCar+=Math.max(26,70-g.t*.6)+Math.random()*60}
    g.cars.forEach(c=>{c.s+=c.v*dt;const z=c.s-g.pos;
      if(!c.hit&&z>-1&&z<3.2&&Math.abs(c.x-g.x)<(c.big?.3:.24)){c.hit=1;if(g.inv<=0)crash();c.s=g.pos+10}
      if(!c.hit&&!c.passed&&z<-1){c.passed=1;g.pass++;g.streak++;g.mx=Math.max(g.mx,g.streak);g.bonus+=10*comboMult(g.streak);if(comboMult(g.streak)>comboMult(g.streak-1))SFX.combo()}});
    g.cars=g.cars.filter(c=>c.s-g.pos>-8);
    /* monedas */
    if(g.pos+300>g.nextCoin){const lane=LANES[Math.random()*4|0];for(let i=0;i<4;i++)g.coins.push({s:g.nextCoin+i*7,x:lane});g.nextCoin+=70+Math.random()*90}
    g.coins.forEach(k=>{const z=k.s-g.pos;if(!k.got&&z<2&&z>-2&&Math.abs(k.x-g.x)<.2){k.got=1;g.nCoins++;g.bonus+=25;tone(1320,.06,'square',.04,1.5);tone(1760,.08,'square',.04,0,.05)}});
    g.coins=g.coins.filter(k=>!k.got&&k.s-g.pos>-4);
    /* turbos */
    if(g.pos+300>g.nextPad){g.pads.push({s:g.nextPad,x:LANES[Math.random()*4|0]});g.nextPad+=200+Math.random()*240}
    g.pads.forEach(p=>{const z=p.s-g.pos;if(!p.used&&z<5&&z>-5&&Math.abs(p.x-g.x)<.22){p.used=1;g.boost=2.6;g.bonus+=100;floatTxt(g.fl,400,170,'TURBO +100','#FFD23F',28);tone(300,.35,'sawtooth',.06,3.2)}});
    g.pads=g.pads.filter(p=>p.s-g.pos>-10);
    /* cruces con semáforo: en ROJO pasan carros de lado */
    if(g.pos+340>g.nextInter){const red=Math.random()<.65,I={s:g.nextInter,red,cross:[]};
      if(red){const n=2+(Math.random()*2|0);for(let i=0;i<n;i++){const dir=Math.random()<.5?1:-1;I.cross.push({x:-dir*rand(1.6,4.5),dir,v:rand(1.5,2.4),off:rand(3,10),c:['#FFC93C','#3B6FD8','#E86A5A','#5BCB4A'][Math.random()*4|0]})}}
      g.inters.push(I);g.nextInter+=320+Math.random()*260}
    g.inters.forEach(I=>{const z0=I.s-g.pos;
      if(I.red&&z0<120)I.cross.forEach(c=>{c.x+=c.dir*c.v*dt;if(c.x>3.4)c.x=-3.4;if(c.x<-3.4)c.x=3.4;
        const z=I.s+c.off-g.pos;if(!c.hit&&z<2.6&&z>-1.5&&Math.abs(c.x-g.x)<.42){c.hit=1;I.hitMe=1;if(g.inv<=0)crash()}});
      if(I.red&&!I.done&&I.s+13<g.pos){I.done=1;if(!I.hitMe){g.reds++;g.bonus+=150;g.streak++;g.mx=Math.max(g.mx,g.streak);floatTxt(g.fl,400,150,t('moto.red'),'#FF5A7A',28);SFX.combo()}}});
    g.inters=g.inters.filter(I=>I.s+20-g.pos>-5);
  };
  g.score=()=>Math.round(g.pos)+g.bonus;
  g.acc=()=>g.pass+g.hits?g.pass/(g.pass+g.hits):null;g.maxCombo=()=>g.mx;
  g.auto=dt=>{
    const danger=x=>g.cars.some(c=>{const z=c.s-g.pos;return z>0&&z<30&&Math.abs(c.x-x)<.32})||g.inters.some(I=>I.red&&I.s-g.pos<16&&I.s-g.pos>-12&&I.cross.some(c=>Math.abs(c.x-x)<.7&&Math.sign(x-c.x)!==c.dir));
    let tx=g._tx??g.x;if(danger(tx)){const opts=LANES.filter(l=>!danger(l)).sort((a,b)=>Math.abs(a-g.x)-Math.abs(b-g.x));if(opts.length)tx=opts[0]}
    else{const want=[...g.coins,...g.pads].filter(k=>k.s-g.pos>4&&k.s-g.pos<40).sort((a,b)=>a.s-b.s)[0];if(want&&!danger(want.x))tx=want.x}
    g._tx=tx;g.ptrs.delete('bot');
    if(g.x<tx-.06){g.ptrs.set('bot',700);g.hand={x:700,y:336,p:.2,hold:1}}else if(g.x>tx+.06){g.ptrs.set('bot',100);g.hand={x:100,y:336,p:.2,hold:1}}else if(g.hand)g.hand.hold=0};

  /* ---------- dibujo en pixeles ---------- */
  const rc=document.createElement('canvas');rc.width=48;rc.height=56;const rcx=rc.getContext('2d');let D=o;
  const R=(x,y,w,h,col)=>{D.fillStyle=col;D.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)))};
  const MESAS=(()=>{const r=rng(7),m=[];for(let i=0;i<9;i++){const side=i%2?1:-1;m.push({x:side>0?rand(178,300):rand(0,130),w:rand(26,60),h:rand(12,34),r:r()})}return m})();
  function background(){
    const sk=o.createLinearGradient(0,0,0,HOR);sk.addColorStop(0,'#7EC8F2');sk.addColorStop(1,'#CBEBFA');o.fillStyle=sk;o.fillRect(0,0,W,HOR);
    o.fillStyle='#fff';[[24,14,26],[110,8,34],[214,18,22],[276,10,30]].forEach(([x,y,w])=>{const xx=((x-g.t*2)%360+360)%360-30;R(xx,y,w,4,'#fff');R(xx+5,y-3,w-10,3,'#fff')});
    o.fillStyle='#B6AFCF';for(let i=0;i<7;i++){const x=i*52-10;o.beginPath();o.moveTo(x,HOR-2);o.lineTo(x+26,HOR-16-(i%3)*4);o.lineTo(x+56,HOR-2);o.fill()}
    MESAS.forEach(m=>{const y=HOR-m.h;R(m.x,y,m.w,m.h,'#C8553D');R(m.x+3,y-3,m.w-8,3,'#C8553D');R(m.x,y,m.w,3,'#E9845A');R(m.x+m.w*.6,y+4,2,m.h-4,'#A8432F');R(m.x+m.w*.25,y+6,2,m.h-6,'#A8432F')});
    /* gasolinera al fondo */
    R(176,HOR-9,26,7,'#E8E2D6');R(174,HOR-11,30,3,'#D94C3D');R(181,HOR-6,3,4,'#7B8290');R(192,HOR-6,3,4,'#7B8290');
  }
  function ground(){
    for(let y=HOR;y<H;y++){
      const dy=y-HOR+.5,z=K/dy,s=g.pos+z,half=dy*1.45,ctr=W/2,alt=Math.floor(s/6)%2;
      let inCross=null,inZebra=null,stop=false;
      for(const I of g.inters){const u=s-I.s;if(u>=0&&u<13)inCross=I;else if(u>=-6&&u<-1.5)inZebra=I;else if(u>=-7.5&&u<-6.6)stop=true}
      R(0,y,W,1,inCross?(alt?'#6A6670':'#666270'):(alt?'#F2B866':'#EDAE59'));
      if(inCross)continue;
      R(ctr-half-half*.14,y,half*.14,1,alt?'#FFFFFF':'#E85A5A');R(ctr+half,y,half*.14,1,alt?'#FFFFFF':'#E85A5A');
      R(ctr-half,y,half*2,1,alt?'#6E6A75':'#6A6671');
      if(inZebra){const sw=half*.11;for(let k=-8;k<8;k+=2)R(ctr+k*sw,y,sw,1,'#F4F4F4');continue}
      if(stop){R(ctr-half,y,half*2,1,'#F4F4F4');continue}
      R(ctr-half+half*.03,y,Math.max(1,half*.02),1,'#F4F4F4');R(ctr+half-half*.05,y,Math.max(1,half*.02),1,'#F4F4F4');
      if(Math.floor(s/5)%2){const lw=Math.max(1,half*.022);[-.5,0,.5].forEach(l=>R(ctr+l*half-lw/2,y,lw,1,l===0?'#FFD23F':'#F4F4F4'))}
      for(const p of g.pads){const u=s-p.s;if(u>=0&&u<9){const pw=half*.34,px=ctr+p.x*half,band=Math.floor(u/1.5)%3;
        R(px-pw/2,y,pw,1,p.used?'#8D8994':band===0?'#FF7A2F':band===1?'#FFD23F':'#FFF4B0');R(px-pw*.08,y,pw*.16,1,p.used?'#76727E':'#E8590C')}}
    }
  }
  function carBack(x,y,w,col,big){
    const h=w*(big?.95:.62);x=Math.round(x-w/2);y=Math.round(y-h);
    R(x-1,y+h*.3-1,w+2,h*.7+2,INK);R(x,y+h*.3,w,h*.7,col);R(x,y+h*.82,w,h*.18,'rgba(0,0,0,.25)');
    if(big){R(x-1,y-1,w+2,h*.34,INK);R(x,y,w,h*.32,'#E8E2D6')}
    else{R(x+w*.16-1,y-1,w*.68+2,h*.36+2,INK);R(x+w*.16,y,w*.68,h*.36,'#7FA3C7');R(x+w*.2,y+h*.04,w*.2,Math.max(1,h*.06),'#CFE6F7')}
    const lw=Math.max(1,w*.16),lh=Math.max(1,h*.12);R(x+1,y+h*.48,lw,lh,'#FF3B3B');R(x+w-1-lw,y+h*.48,lw,lh,'#FF3B3B');
    if(w>14){R(x+w*.4,y+h*.62,w*.2,Math.max(1,h*.1),'#F4F4F4')}
    R(x+w*.06,y+h,w*.18,Math.max(1,h*.1),INK);R(x+w*.76,y+h,w*.18,Math.max(1,h*.1),INK);
  }
  function carSide(x,y,w,col,dir){
    const h=w*.42;x=Math.round(x-w/2);y=Math.round(y-h);
    R(x-1,y+h*.35-1,w+2,h*.55+2,INK);R(x,y+h*.35,w,h*.55,col);
    R(x+w*.22-1,y-1,w*.52+2,h*.4+1,INK);R(x+w*.24,y,w*.48,h*.37,'#7FA3C7');R(x+w*.47,y,Math.max(1,w*.03),h*.37,INK);
    const wr=Math.max(1,w*.11);R(x+w*.14,y+h*.8,wr*1.4,wr*1.2,INK);R(x+w*.72,y+h*.8,wr*1.4,wr*1.2,INK);
    R(dir>0?x+w-2:x,y+h*.45,2,Math.max(1,h*.12),'#FFF4B0');
  }
  function light(I,y,half){
    const s=half/60,px=W/2+half*1.12,top=y-half*.95;
    R(px-s*2,top,s*4,y-top,'#3A3F4A');R(W/2-half*.25,top,px-(W/2-half*.25),s*3,'#3A3F4A');
    [W/2+half*.1,W/2+half*.62].forEach(lx=>{R(lx-s*5,top+s*3,s*10,s*20,'#2A2F38');const col=I.red?'#FF3B4E':'#39E07A';
      o.fillStyle=I.red?'rgba(255,90,130,.35)':'rgba(80,255,150,.3)';o.beginPath();o.arc(lx,top+s*(I.red?8:17),s*9,0,7);o.fill();
      R(lx-s*3,top+s*(I.red?5:14),s*6,s*6,col);R(lx-s*3,top+s*(I.red?14:5),s*6,s*6,'#4A505C')});
  }
  function rider(){
    const blink=g.inv>0&&(g.t*14|0)%2;if(blink)return;
    const SX=Math.round(W/2+g.x*PH*.92),SY=H+1;   // pantalla: la moto se dibuja en 48x56 y se agranda x1.5
    D=rcx;rcx.clearRect(0,0,48,56);
    const L2=g.lean,cx=24,y=55;
    const sw=Math.sin(g.t*9)*1.5,tilt=Math.round(L2*2);
    /* sombra y llanta */
    R(cx-9,y-2,18,2,'rgba(0,0,0,.25)');
    R(cx-3,y-11,6,11,INK);R(cx-2,y-10,1,8,'#4A505C');if((g.pos*2|0)%2)R(cx+1,y-7,1,3,'#4A505C');
    /* moto */
    R(cx-7+tilt,y-17,14,8,INK);R(cx-6+tilt,y-16,12,6,'#E8443A');R(cx-6+tilt,y-13,12,2,'#FFD23F');R(cx-2+tilt,y-12,4,2,'#F4F4F4');
    R(cx-5+tilt,y-17,2,1,'#FF3B3B');R(cx+3+tilt,y-17,2,1,'#FF3B3B');
    if(g.boost>0){R(cx-6+tilt,y-9,3,2+((g.t*30|0)%3),(g.t*20|0)%2?'#FFD23F':'#FF7A2F');R(cx+3+tilt,y-9,3,2+((g.t*30|0)%3),(g.t*20|0)%2?'#FF7A2F':'#FFD23F')}
    /* piernas */
    R(cx-9+tilt,y-17,4,7,'#2E3A6E');R(cx+5+tilt,y-17,4,7,'#2E3A6E');R(cx-9+tilt,y-11,4,2,INK);R(cx+5+tilt,y-11,4,2,INK);
    /* torso y brazos (chaqueta rosa) */
    const tx=cx+tilt*2;
    R(tx-6,y-28,12,12,INK);R(tx-5,y-27,10,10,'#E0457B');R(tx-5,y-21,10,2,'#B83063');R(tx-1,y-27,2,8,'#F27AA3');
    R(tx-11,y-25,6,3,INK);R(tx+5,y-25,6,3,INK);R(tx-10,y-24,5,1,'#E0457B');R(tx+5,y-24,5,1,'#E0457B');
    R(tx-13,y-26,3,3,INK);R(tx+10,y-26,3,3,INK);
    /* manubrio y espejos */
    R(tx-14,y-23,28,1,INK);R(tx-15,y-27,2,4,INK);R(tx+13,y-27,2,4,INK);R(tx-16,y-28,3,2,'#9DB4C8');R(tx+13,y-28,3,2,'#9DB4C8');
    /* cola de caballo que se mueve con el viento */
    const pt=Math.round(sw-L2*2);
    R(tx+2,y-33,3,3,'#6B3A1E');R(tx+4+pt*.5,y-31,3,4,'#6B3A1E');R(tx+5+pt,y-28,3,4,'#8A4A22');R(tx+6+pt,y-25,2,3,'#6B3A1E');
    /* casco */
    R(tx-5,y-38,10,10,INK);R(tx-4,y-37,8,8,'#2A2F3A');R(tx-3,y-36,3,2,'#6E7A8F');R(tx-4,y-31,8,2,'#E0457B');
    D=o;o.imageSmoothingEnabled=false;o.drawImage(rc,SX-36,SY-84,72,84);
  }
  g.draw=c=>{
    background();ground();
    const spr=[];
    for(let s=Math.ceil((g.pos+3)/14)*14;s<g.pos+260;s+=14){spr.push({z:s-g.pos,k:'post',side:-1});spr.push({z:s-g.pos,k:'post',side:1})}
    for(let s=Math.ceil((g.pos+3)/55)*55;s<g.pos+260;s+=55)spr.push({z:s-g.pos+20,k:'cactus',side:((s/55)%2?1:-1)});
    g.coins.forEach(k=>spr.push({z:k.s-g.pos,k:'coin',o:k}));
    g.cars.forEach(k=>spr.push({z:k.s-g.pos,k:'car',o:k}));
    g.inters.forEach(I=>{spr.push({z:I.s-g.pos-2,k:'light',o:I});if(I.red)I.cross.forEach(c=>spr.push({z:I.s+c.off-g.pos,k:'cross',o:c}))});
    spr.filter(p=>p.z>2).sort((a,b)=>b.z-a.z).forEach(p=>{
      const y=Math.round(yAt(p.z));if(y<=HOR||y>=H+40)return;const half=halfAt(y);
      if(p.k==='post'){const x=W/2+p.side*half*1.2,h=Math.max(2,half*.12),w=Math.max(1,half*.025);R(x-w/2,y-h,w,h,'#F4F4F4');R(x-w/2,y-h*.6,w,h*.2,INK)}
      else if(p.k==='cactus'){const x=W/2+p.side*half*1.8,h=Math.max(2,half*.28),w=Math.max(1,h*.22);R(x-w/2,y-h,w,h,'#3E9B4F');R(x-w*1.6,y-h*.7,w*.7,h*.3,'#3E9B4F');R(x+w*.9,y-h*.8,w*.7,h*.35,'#3E9B4F')}
      else if(p.k==='coin'){const x=W/2+p.o.x*half,r=Math.max(1,half*.05),sq=Math.abs(Math.cos(g.t*6+p.o.s));R(x-r*sq,y-r*4,Math.max(1,r*2*sq),r*2,'#FFD23F');R(x-r*sq*.4,y-r*3.6,Math.max(1,r*.8*sq),r*1.2,'#FFF4B0')}
      else if(p.k==='car')carBack(W/2+p.o.x*half,y,half*(p.o.big?.36:.32),p.o.c,p.o.big);
      else if(p.k==='cross')carSide(W/2+p.o.x*half,y,half*.5,p.o.c,p.o.dir);
      else if(p.k==='light')light(p.o,y,half);
    });
    if(g.boost>0){for(let i=0;i<16;i++){const yy=HOR+6+((i*29+g.pos*6)%(H-HOR-8)),xx=(i*61)%W;R(xx<W/2?xx*.45:W-(W-xx)*.45,yy,1,5,'rgba(255,255,255,.8)')}}
    rider();
    const sx=g.shake>0?rand(-8,8):0,sy=g.shake>0?rand(-5,5):0;
    c.imageSmoothingEnabled=false;c.drawImage(off,sx,sy,800,400);
    /* HUD estilo arcade */
    const P='Press Start 2P';
    c.save();c.translate(30,30);c.fillStyle='#FFD23F';c.strokeStyle=INK;c.lineWidth=3;c.beginPath();c.moveTo(-11,-12);c.lineTo(11,-12);c.lineTo(8,2);c.quadraticCurveTo(0,8,-8,2);c.closePath();c.fill();c.stroke();c.fillRect(-3,6,6,6);c.strokeRect(-3,6,6,6);c.restore();
    txt(c,nf(Math.round(g.pos))+' m',52,30,17,{font:P,sw:.45});
    c.beginPath();c.arc(30,66,11,0,7);c.fillStyle='#F5B400';c.fill();c.lineWidth=3;c.strokeStyle=INK;c.stroke();c.beginPath();c.arc(30,66,5,0,7);c.strokeStyle='#FFF4B0';c.lineWidth=2;c.stroke();
    txt(c,String(g.nCoins),52,66,15,{font:P,sw:.45});
    const kmh=Math.round(g.v*1.6);txt(c,kmh+' KM/H',782,30,17,{font:P,align:'right',fill:g.boost>0?'#FFD23F':'#fff',sw:.45});
    const bars=8,on=Math.round(g.v/140*bars);for(let i=0;i<bars;i++){const h=8+i*3,x=690+i*12;c.fillStyle=i<on?(i<5?'#5BCB4A':i<7?'#FFD23F':'#FF7A2F'):'rgba(31,42,58,.4)';c.fillRect(x,72-h,8,h);c.strokeStyle=INK;c.lineWidth=2;c.strokeRect(x,72-h,8,h)}
    const l=Math.max(0,g.dur-g.t);txt(c,mmss(l),400,28,16,{font:P,align:'center',fill:l<=5?'#FFD23F':'#fff',sw:.45});
    if(g.streak>=2){txt(c,t('hud.combo')+' x'+comboMult(g.streak),400,56,12,{font:P,align:'center',fill:'#FFD23F',sw:.5})}
    if(g.boost>0)txt(c,'TURBO!',400,110,22,{align:'center',font:P,fill:(g.t*8|0)%2?'#FFD23F':'#FF7A2F',sw:.45});
    drawFloats(c,g.fl,1/60);
    const arrow=(r,dir,on2)=>{rr(c,r.x,r.y+(on2?4:0),r.w,r.h,16);c.fillStyle=on2?'rgba(255,210,63,.85)':'rgba(255,253,246,.45)';c.fill();c.lineWidth=3;c.strokeStyle=INK;c.stroke();
      const mx=r.x+r.w/2,my=r.y+r.h/2+(on2?4:0);c.beginPath();c.moveTo(mx+dir*18,my);c.lineTo(mx-dir*13,my-20);c.lineTo(mx-dir*13,my+20);c.closePath();c.fillStyle=INK;c.fill()};
    arrow(BL,-1,g.steer<0);arrow(BR,1,g.steer>0);
  };
  return g;
}});
