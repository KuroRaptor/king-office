
/* =====================================================================
   JUEGOS NUEVOS · TANDA 3
   Torre de bloques · Combo de frutas · Tiro con arco · ¡Salta, que viene el toro!
   ===================================================================== */
Object.assign(L.es,{'tb.floors':'PISOS','tb.perfect':'¡PERFECTO!','fr.next':'SIGUE','fr.full':'¡CAJA LLENA!','ar.wind':'VIENTO','ar.shot':'TIROS','bull.ok':'¡OLÉ!'});
Object.assign(L.en,{'tb.floors':'FLOORS','tb.perfect':'PERFECT!','fr.next':'NEXT','fr.full':'BOX FULL!','ar.wind':'WIND','ar.shot':'SHOTS','bull.ok':'OLÉ!'});

IC.tower_blox=`<svg ${ICON_ATTR}><path d="M24 2v8"/><rect x="14" y="10" width="20" height="8" fill="#FF7A2F"/><rect x="12" y="24" width="24" height="8" fill="#2FA8E8"/><rect x="10" y="32" width="28" height="8" fill="#FFD23F"/><rect x="8" y="40" width="32" height="6" fill="#5BCB4A"/></svg>`;
IC.fruit_combo=`<svg ${ICON_ATTR}><path d="M6 8v34h36V8"/><circle cx="16" cy="34" r="7" fill="#E8443A"/><circle cx="31" cy="31" r="10" fill="#FFE066"/><circle cx="20" cy="20" r="5" fill="#3B6FD8"/></svg>`;
IC.archery=`<svg ${ICON_ATTR}><circle cx="24" cy="24" r="18" fill="#fff"/><circle cx="24" cy="24" r="12" fill="#2FA8E8"/><circle cx="24" cy="24" r="6" fill="#E85A5A"/><circle cx="24" cy="24" r="2" fill="#FFD23F"/><path d="M24 24l14-14M34 8l4 2 2 4"/></svg>`;
IC.bull_jump=`<svg ${ICON_ATTR}><ellipse cx="20" cy="30" rx="14" ry="9" fill="#8A5A35"/><circle cx="8" cy="24" r="6" fill="#5E3A1E"/><path d="M4 18q-4-6 2-8M10 17q4-6 0-9" stroke="#fff" stroke-width="3"/><path d="M14 39v5M26 39v5"/><circle cx="38" cy="12" r="4" fill="#fff"/><path d="M38 16v8M34 20h8M38 24l-3 5M38 24l3 5"/></svg>`;

/* ---------- Torre de bloques ---------- */
registerGame({id:'tower_blox',name:{es:'Torre de bloques',en:'Tower Blocks'},category:'precision',duration:60,difficulty:2,cap:60000,phase:5,
  desc:{es:'La grúa balancea un piso: suéltalo justo encima del edificio. Mientras más alto, más se tambalea.',en:'The crane swings a floor: drop it right on top of the building. The higher it gets, the more it sways.'},
  tips:{es:{ctrl:'Toca la pantalla para soltar el piso',plus:'+100 por piso · PERFECTO (bien centrado) +50 extra y la racha sube',minus:'Lo que sobresale se corta · si fallas todo el piso pierdes una vida (tienes 3)'},
        en:{ctrl:'Tap the screen to drop the floor',plus:'+100 per floor · PERFECT (well centered) +50 extra and the streak grows',minus:'Whatever hangs off is cut · missing completely costs a life (you have 3)'}},ctrlIcon:'tap',
  sim:k=>({raw:(500+Math.random()*4500)*k,acc:rand(.3,.8)}),
  create(dur){
  const BH=32,GROUND=372,HOOKY=78,W0=150;
  const COLS=['#FF7A2F','#2FA8E8','#FFD23F','#5BCB4A','#B07CF0','#E85A5A'];
  const g={dur,t:0,over:false,fl:[],floors:[{x:400,w:W0,c:0}],ph:0,drop:null,debris:[],cam:0,camT:0,lives:3,pts:0,combo:0,mx:0,perfect:0,drops:0,curW:W0,sway:0};
  const n=()=>g.floors.length;
  const swayAmp=()=>Math.min(34,Math.max(0,(n()-4)*2.2));
  const offAt=i=>g.sway*Math.pow(i/Math.max(1,n()-1),2);
  const hookX=()=>400+Math.min(230,150+n()*4)*Math.sin(g.ph);
  const topY=()=>GROUND-n()*BH;   // borde superior del edificio (mundo)
  g.down=()=>{if(g.drop||g.over)return;g.drop={x:hookX(),y:HOOKY+10,vy:0,w:g.curW,c:n()%COLS.length};g.drops++;tone(400,.05,'triangle',.04)};
  g.update=dt=>{
    g.ph+=dt*(1.5+Math.min(1.6,n()*.05));g.sway=swayAmp()*Math.sin(g.t*1.5);
    g.camT=Math.max(0,(n()-5)*BH);g.cam+=(g.camT-g.cam)*Math.min(1,dt*4);
    g.debris.forEach(d=>{d.vy+=1600*dt;d.y+=d.vy*dt;d.x+=d.vx*dt;d.r+=d.vr*dt});g.debris=g.debris.filter(d=>d.y<GROUND+200+g.cam);
    const d=g.drop;if(!d)return;d.vy+=1700*dt;d.y+=d.vy*dt;
    const ty=topY()+g.cam;
    if(d.y+BH>=ty&&!d.missed){
      const top=g.floors[n()-1],tx=top.x+offAt(n()-1),l=Math.max(d.x-d.w/2,tx-top.w/2),r=Math.min(d.x+d.w/2,tx+top.w/2),ov=r-l;
      if(ov<=10){d.missed=1;d.vx=(d.x<tx?-1:1)*120;g.lives--;g.combo=0;tone(130,.35,'sawtooth',.07,.5);if(g.lives<=0)g.over=true;return}
      const diff=d.x-tx;let nx,nw;
      if(Math.abs(diff)<6){nx=tx;nw=Math.min(W0,d.w+4);g.combo++;g.perfect++;g.mx=Math.max(g.mx,g.combo);const p=100+50*g.combo;g.pts+=p;floatTxt(g.fl,400,ty-40,t('tb.perfect')+' +'+p,'#FFD23F',26);SFX.combo()}
      else{nx=(l+r)/2;nw=ov;g.combo=0;g.pts+=100;floatTxt(g.fl,nx,ty-30,'+100','#fff',22);tone(260,.08,'square',.05);
        const cw=d.w-ov,cx=diff>0?r+cw/2:l-cw/2;g.debris.push({x:cx,y:ty-BH,w:cw,vy:-100,vx:diff>0?90:-90,r:0,vr:diff>0?2:-2,c:d.c})}
      g.floors.push({x:nx-offAt(n()),w:Math.max(24,nw),c:d.c});g.curW=Math.max(24,nw);g.drop=null}
    if(d&&d.missed){d.x+=d.vx*dt;if(d.y>GROUND+g.cam+60)g.drop=null}
  };
  g.score=()=>g.pts;g.acc=()=>g.drops?g.perfect/g.drops:null;g.maxCombo=()=>g.mx;
  g.auto=dt=>{if(g.drop)return;const top=g.floors[n()-1],tx=top.x+offAt(n()-1);if(Math.abs(hookX()-tx)<5)botTap(g,400,200)};
  const block=(c,x,y,w,col,ground)=>{rr(c,x-w/2,y,w,BH,4);outlined(c,col,3.5);
    c.fillStyle='rgba(255,255,255,.75)';const nwin=Math.max(1,Math.floor((w-12)/22));for(let i=0;i<nwin;i++){const wx=x-w/2+8+i*((w-16)/nwin)+((w-16)/nwin-12)/2;c.fillRect(wx,y+8,12,14);c.strokeStyle=INK;c.lineWidth=2;c.strokeRect(wx,y+8,12,14)}
    if(ground){c.fillStyle='#8A5A35';c.fillRect(x-10,y+10,20,22);c.strokeRect(x-10,y+10,20,22)}};
  g.draw=c=>{
    const k=Math.min(1,g.cam/1400);skyBg(c,`hsl(${205-k*25},70%,${64-k*20}%)`,`hsl(${195},70%,${88-k*22}%)`);
    CLOUDS.forEach(cl=>cloud(c,(cl.x+g.t*6)%900-60,cl.y+g.cam*.2%400,cl.s));
    c.fillStyle='#A9BFD2';CITY.slice(0,30).forEach(b=>{const x=b.x%800;c.fillRect(x,GROUND+g.cam*.4-b.h*.6,b.w,b.h*.6+400)});
    c.fillStyle='#5BCB4A';c.fillRect(0,GROUND+g.cam,800,400);c.fillStyle='rgba(31,42,58,.15)';c.fillRect(0,GROUND+g.cam,800,5);
    g.floors.forEach((f,i)=>block(c,f.x+offAt(i),GROUND-(i+1)*BH+g.cam,f.w,COLS[f.c],i===0));
    g.debris.forEach(d=>{c.save();c.translate(d.x,d.y+BH/2);c.rotate(d.r);rr(c,-d.w/2,-BH/2,d.w,BH,4);outlined(c,COLS[d.c],3);c.restore()});
    const hx=hookX();c.strokeStyle=INK;c.lineWidth=3;c.beginPath();c.moveTo(400,-10);c.lineTo(hx,HOOKY);c.stroke();
    c.fillStyle='#FFD23F';rr(c,hx-10,HOOKY-6,20,14,4);outlined(c,'#FFD23F',3);
    if(!g.drop){block(c,hx,HOOKY+10,g.curW,COLS[n()%COLS.length]);c.setLineDash([6,8]);c.strokeStyle='rgba(31,42,58,.35)';c.lineWidth=2;c.beginPath();c.moveTo(hx,HOOKY+10+BH);c.lineTo(hx,topY()+g.cam);c.stroke();c.setLineDash([])}
    else{c.save();if(g.drop.missed){c.translate(g.drop.x,g.drop.y+BH/2);c.rotate(g.drop.vx>0?.6:-.6);c.translate(-g.drop.x,-g.drop.y-BH/2)}block(c,g.drop.x,g.drop.y,g.drop.w,COLS[g.drop.c]);c.restore()}
    drawFloats(c,g.fl,1/60);
    hud(c,g,{combo:g.combo,mult:g.combo,lives:g.lives,lives0:3});
    txt(c,t('tb.floors')+' '+(n()-1),400,26,15,{font:'Press Start 2P',align:'center',sw:.45,fill:'#FFD23F'});
  };
  return g;
}});

/* ---------- Combo de frutas ---------- */
registerGame({id:'fruit_combo',name:{es:'Combo de frutas',en:'Fruit Combo'},category:'decision',duration:75,difficulty:2,cap:60000,phase:5,
  desc:{es:'Suelta frutas en la caja: dos iguales se juntan y se convierten en una más grande.',en:'Drop fruits in the box: two of the same merge into a bigger one.'},
  tips:{es:{ctrl:'Arrastra para apuntar y suelta el dedo para dejar caer la fruta',plus:'Cada fusión suma, y más mientras más grande sea la fruta · ¡la sandía vale +1,000!',minus:'Si las frutas pasan la línea punteada, la caja se vacía'},
        en:{ctrl:'Drag to aim and lift your finger to drop the fruit',plus:'Every merge scores, more for bigger fruits · the watermelon is worth +1,000!',minus:'If fruits cross the dashed line, the box empties'}},ctrlIcon:'drag',
  sim:k=>({raw:(500+Math.random()*5000)*k}),
  create(dur){
  const L0=240,R0=560,TOP=70,BOT=384,LINE=118,G=1400;
  const FR=[{r:13,c:'#3B6FD8'},{r:17,c:'#E8443A'},{r:21,c:'#D6336C'},{r:26,c:'#F7A08C'},{r:31,c:'#FFE066'},{r:36,c:'#8E5BB8'},{r:42,c:'#FF9A3C'},{r:48,c:'#E74C3C'},{r:55,c:'#F5C542'},{r:62,c:'#A8E063'},{r:70,c:'#2E9E4F'}];
  const g={dur,t:0,over:false,fl:[],bodies:[],cur:0,next:1,aim:400,aiming:false,cool:0,pts:0,merges:0,best:0,fullT:0,flash:0,uid:0,chain:0,chainT:0,mx:0};
  const rndLv=()=>[0,0,0,1,1,1,2,2,3,4][Math.random()*10|0];
  g.cur=rndLv();g.next=rndLv();
  const clampAim=x=>clamp(x,L0+FR[g.cur].r,R0-FR[g.cur].r);
  const drop=()=>{if(g.cool>0)return;const r=FR[g.cur].r,x=clampAim(g.aim);g.bodies.push({id:++g.uid,x,y:TOP-r+4,px:x,py:TOP-r+4,lv:g.cur,born:g.t});g.cur=g.next;g.next=rndLv();g.cool=.5;tone(500,.04,'triangle',.03)};
  g.down=(x)=>{g.aim=x;g.aiming=true};g.move=(x)=>{if(g.aiming)g.aim=x};g.up=(id,x)=>{if(!g.aiming)return;g.aiming=false;if(x!=null)g.aim=x;drop()};
  g.key=(k,d)=>{if(!d)return;if(k==='ArrowLeft')g.aim-=30;else if(k==='ArrowRight')g.aim+=30;else if(k==='Space'||k==='ArrowDown')drop()};
  const step=h=>{
    g.bodies.forEach(b=>{const vx=(b.x-b.px)*.995,vy=(b.y-b.py)*.995;b.px=b.x;b.py=b.y;b.x+=vx;b.y+=vy+G*h*h});
    for(let it=0;it<4;it++){
      const bs=g.bodies;
      for(let i=0;i<bs.length;i++){const a=bs[i];if(a.gone)continue;const ra=FR[a.lv].r;
        for(let j=i+1;j<bs.length;j++){const b=bs[j];if(b.gone)continue;const rb=FR[b.lv].r,dx=b.x-a.x,dy=b.y-a.y,d2=dx*dx+dy*dy,rs=ra+rb;if(d2>=rs*rs)continue;
          const d=Math.sqrt(d2)||.01;
          if(a.lv===b.lv&&!a.gone&&!b.gone){a.gone=b.gone=1;merge(a,b);break}
          const ov=(rs-d),ma=ra*ra,mb=rb*rb,k1=mb/(ma+mb),k2=ma/(ma+mb),nx=dx/d,ny=dy/d;a.x-=nx*ov*k1;a.y-=ny*ov*k1;b.x+=nx*ov*k2;b.y+=ny*ov*k2}}
      g.bodies.forEach(b=>{const r=FR[b.lv].r;if(b.x<L0+r){b.x=L0+r}if(b.x>R0-r){b.x=R0-r}if(b.y>BOT-r){b.y=BOT-r;b.px=b.x-(b.x-b.px)*.8}});
      g.bodies=g.bodies.filter(b=>!b.gone)}};
  const merge=(a,b)=>{const lv=a.lv+1,x=(a.x+b.x)/2,y=(a.y+b.y)/2;g.merges++;
    g.chain=g.chainT>0?g.chain+1:1;g.chainT=.8;g.mx=Math.max(g.mx,g.chain);
    if(lv>=FR.length){g.pts+=1000;floatTxt(g.fl,x,y,'+1000','#FFD23F',34);SFX.levelup();return}
    const p=(lv+1)*(lv+2)*5*(g.chain>1?2:1);g.pts+=p;g.best=Math.max(g.best,lv);floatTxt(g.fl,x,y-20,'+'+p,'#fff',lv>6?30:22);tone(500+lv*60,.08,'triangle',.06,1.3);
    g.bodies.push({id:++g.uid,x,y,px:x,py:y,lv,born:g.t})};
  g.update=dt=>{g.cool=Math.max(0,g.cool-dt);g.flash=Math.max(0,g.flash-dt);g.chainT=Math.max(0,g.chainT-dt);
    step(dt/2);step(dt/2);
    const over=g.bodies.some(b=>g.t-b.born>1.5&&b.y-FR[b.lv].r<LINE);g.fullT=over?g.fullT+dt:0;
    if(g.fullT>2){g.bodies=[];g.fullT=0;g.flash=.6;g.chain=0;floatTxt(g.fl,400,200,t('fr.full'),'#FF7A2F',30);tone(140,.4,'sawtooth',.06,.5)}};
  g.score=()=>g.pts;g.acc=()=>null;g.maxCombo=()=>g.mx;
  g.auto=dt=>{if(g.cool>0)return;g._bt=(g._bt||0)-dt;if(g._bt>0)return;g._bt=.7;
    const same=g.bodies.filter(b=>b.lv===g.cur).sort((a,b)=>a.y-b.y)[0];const x=same?same.x:rand(L0+30,R0-30);botTap(g,x,200)};
  const fruit=(c,x,y,lv,s=1)=>{const f=FR[lv],r=f.r*s;c.save();c.translate(x,y);
    c.beginPath();c.arc(0,0,r,0,7);c.fillStyle=f.c;c.fill();c.lineWidth=Math.max(2,3*s);c.strokeStyle=INK;c.stroke();
    c.fillStyle='rgba(255,255,255,.35)';c.beginPath();c.ellipse(-r*.35,-r*.42,r*.3,r*.18,-.5,0,7);c.fill();
    if(lv===10){c.strokeStyle='#1F6B33';c.lineWidth=3*s;for(let i=-2;i<=2;i++){c.beginPath();c.ellipse(i*r*.32,0,r*.12,r*.92,0,0,7);c.stroke()}}
    if(lv===8){c.strokeStyle='rgba(180,120,20,.6)';c.lineWidth=1.5;for(let i=-3;i<=3;i++){c.beginPath();c.moveTo(i*r*.3-r*.4,-r*.8);c.lineTo(i*r*.3+r*.4,r*.8);c.stroke()}c.fillStyle='#5BCB4A';c.beginPath();c.moveTo(-6*s,-r);c.lineTo(0,-r-16*s);c.lineTo(6*s,-r);c.fill()}
    if([1,3,6,7].includes(lv)){c.fillStyle='#4CAF50';c.beginPath();c.ellipse(r*.25,-r*.95,r*.28,r*.12,-.5,0,7);c.fill();c.strokeStyle=INK;c.lineWidth=1.5;c.stroke()}
    const e=Math.max(1.5,r*.09);c.fillStyle=INK;c.beginPath();c.arc(-r*.3,-r*.02,e,0,7);c.arc(r*.3,-r*.02,e,0,7);c.fill();
    c.lineWidth=Math.max(1.5,r*.07);c.beginPath();c.arc(0,r*.15,r*.2,.2,Math.PI-.2);c.stroke();
    if(r>20){c.fillStyle='rgba(255,120,140,.45)';c.beginPath();c.arc(-r*.5,r*.2,r*.12,0,7);c.arc(r*.5,r*.2,r*.12,0,7);c.fill()}
    c.restore()};
  g.draw=c=>{
    c.fillStyle='#C5E3C8';c.fillRect(0,0,800,400);
    c.fillStyle='#FCE7B8';c.fillRect(L0,TOP-10,R0-L0,BOT-TOP+10);
    c.fillStyle='rgba(255,210,150,.35)';for(let x=L0;x<R0;x+=30)c.fillRect(x,TOP-10,15,BOT-TOP+10);for(let y=TOP;y<BOT;y+=30)c.fillRect(L0,y,R0-L0,15);
    if(g.flash>0){c.fillStyle=`rgba(255,122,47,${g.flash})`;c.fillRect(L0,TOP-10,R0-L0,BOT-TOP+10)}
    c.fillStyle='#C8623F';rr(c,L0-16,TOP-26,16,BOT-TOP+42,8);c.fill();rr(c,R0,TOP-26,16,BOT-TOP+42,8);c.fill();c.fillRect(L0-16,BOT,R0-L0+32,16);
    c.strokeStyle=g.fullT>0&&(g.t*8|0)%2?'#E85A5A':'#E08A6A';c.lineWidth=4;c.setLineDash([14,10]);c.beginPath();c.moveTo(L0,LINE);c.lineTo(R0,LINE);c.stroke();c.setLineDash([]);
    const ax=clampAim(g.aim);if(g.cool<=0){c.strokeStyle='rgba(200,98,63,.6)';c.lineWidth=3;c.setLineDash([2,10]);c.beginPath();c.moveTo(ax,TOP+10);c.lineTo(ax,BOT);c.stroke();c.setLineDash([]);fruit(c,ax,TOP-FR[g.cur].r+4,g.cur)}
    g.bodies.forEach(b=>fruit(c,b.x,b.y,b.lv));
    rr(c,600,90,150,110,16);outlined(c,'rgba(255,253,246,.9)',3);txt(c,t('fr.next'),675,108,11,{font:'Press Start 2P',align:'center',stroke:false,fill:INK});fruit(c,675,152,g.next,Math.min(1,30/FR[g.next].r));
    rr(c,24,90,190,290,16);outlined(c,'rgba(255,253,246,.9)',3);
    FR.forEach((f,i)=>{const col=i%2,row=i/2|0;fruit(c,72+col*92,120+row*44,i,Math.min(1,18/f.r))});
    drawFloats(c,g.fl,1/60);hud(c,g,{combo:g.chain,mult:g.chain});
  };
  return g;
}});

/* ---------- Tiro con arco ---------- */
registerGame({id:'archery',name:{es:'Tiro con arco',en:'Archery'},category:'precision',duration:45,difficulty:2,cap:40000,phase:5,
  desc:{es:'La mira se mueve y el viento desvía la flecha: dispara en el momento justo.',en:'The sight wobbles and the wind pushes the arrow: shoot at the right moment.'},
  tips:{es:{ctrl:'Toca la pantalla para disparar',plus:'Centro amarillo = 10 · cada anillo vale menos · los 10 seguidos suben el combo',minus:'El viento mueve la flecha hacia donde apunta la flecha del viento; compénsalo'},
        en:{ctrl:'Tap the screen to shoot',plus:'Yellow center = 10 · each ring is worth less · tens in a row raise the combo',minus:'The wind pushes the arrow where the wind arrow points; aim against it'}},ctrlIcon:'tap',
  sim:k=>({raw:(500+Math.random()*2200)*k,acc:rand(.2,.7)}),
  create(dur){
  const CX=400,CY=196;
  const g={dur,t:0,over:false,fl:[],wind:0,ret:{x:CX,y:CY},flight:null,stuck:[],shots:0,tens:0,pts:0,streak:0,mx:0,wait:0,ph:Math.random()*9};
  const newWind=()=>{g.wind=Math.round(rand(-6,6)*10)/10};newWind();
  const scale=()=>1-Math.min(.35,g.shots*.015);
  const amp=()=>16+Math.min(26,g.shots*1.2);
  g.down=()=>{if(g.flight||g.wait>0)return;g.flight={x:g.ret.x+g.wind*4.2*scale(),y:g.ret.y+6,tt:0};g.shots++;tone(500,.1,'triangle',.05,.5)};
  g.update=dt=>{g.ph+=dt;const A=amp();g.ret.x=CX+A*Math.sin(g.ph*1.3)+A*.45*Math.sin(g.ph*3.1+1);g.ret.y=CY+A*.7*Math.sin(g.ph*1.7+.5)+A*.3*Math.cos(g.ph*2.6);
    g.wait=Math.max(0,g.wait-dt);
    const f=g.flight;if(f){f.tt+=dt/.45;if(f.tt>=1){const s=scale(),d=Math.hypot(f.x-CX,f.y-CY)/s,ring=Math.max(0,10-Math.floor(d/4));
      if(ring>=9)g.streak++;else g.streak=0;g.mx=Math.max(g.mx,g.streak);if(ring===10)g.tens++;
      const p=ring*10*(ring>=9?comboMult(g.streak):1);g.pts+=p;floatTxt(g.fl,f.x,f.y-40,ring?ring+' · +'+p:'MISS',ring>=9?'#FFD23F':ring?'#fff':'#E85A5A',ring===10?32:24);ring>=9?SFX.combo():tone(ring?300:120,.08,'square',.05);
      g.stuck.push({x:f.x,y:f.y});if(g.stuck.length>6)g.stuck.shift();g.flight=null;g.wait=.7;newWind()}}};
  g.score=()=>g.pts;g.acc=()=>g.shots?g.tens/g.shots:null;g.maxCombo=()=>g.mx;
  g.auto=dt=>{if(g.flight||g.wait>0)return;const lx=g.ret.x+g.wind*4.2*scale()-CX,ly=g.ret.y+6-CY;if(Math.hypot(lx,ly)<4+Math.random()*4)botTap(g,400,200)};
  const tree=(c,x,y,s)=>{c.fillStyle='#A0522D';c.fillRect(x-6*s,y-40*s,12*s,40*s);c.strokeStyle=INK;c.lineWidth=2.5;c.strokeRect(x-6*s,y-40*s,12*s,40*s);rr(c,x-34*s,y-90*s,68*s,56*s,10*s);outlined(c,'#3FAE4A',2.5);c.fillStyle='#62C36B';c.fillRect(x-22*s,y-80*s,22*s,12*s)};
  g.draw=c=>{
    skyBg(c,'#7FD3F0','#DDF4FB');
    c.fillStyle='#B3DDEE';[[80,150,140],[300,150,110],[560,150,150],[740,150,100]].forEach(([x,y,h])=>{c.beginPath();c.moveTo(x-h,y);c.lineTo(x,y-h*.7);c.lineTo(x+h,y);c.fill()});
    c.fillStyle='#7ACB45';c.fillRect(0,150,800,250);
    c.strokeStyle='#fff';c.lineWidth=3;c.beginPath();c.moveTo(CX-30,232);c.lineTo(-200,420);c.moveTo(CX+30,232);c.lineTo(1000,420);c.stroke();c.lineWidth=10;c.beginPath();c.moveTo(CX,232);c.lineTo(CX,400);c.stroke();
    tree(c,120,180,1.1);tree(c,660,170,1);tree(c,260,165,.6);tree(c,560,162,.55);
    const s=scale();c.save();c.translate(CX,CY);c.scale(s,s);
    c.fillStyle='#8A5A35';c.fillRect(-36,40,8,30);c.fillRect(28,40,8,30);c.strokeStyle=INK;c.lineWidth=3;c.strokeRect(-36,40,8,30);c.strokeRect(28,40,8,30);
    rr(c,-50,-50,100,96,8);outlined(c,'#B4693C',4);c.strokeStyle='rgba(31,42,58,.25)';c.lineWidth=2;for(let i=-40;i<50;i+=14){c.beginPath();c.moveTo(i,-48);c.lineTo(i,44);c.stroke()}
    [[40,'#fff'],[32,'#1F2A3A'],[24,'#2FA8E8'],[16,'#E85A5A'],[8,'#FFD23F']].forEach(([r,col])=>{c.beginPath();c.arc(0,0,r,0,7);c.fillStyle=col;c.fill();c.lineWidth=2;c.strokeStyle=INK;c.stroke()});
    c.restore();
    g.stuck.forEach(a=>{c.strokeStyle=INK;c.lineWidth=3;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(a.x+8,a.y+20);c.stroke();c.fillStyle='#E85A5A';c.fillRect(a.x+5,a.y+16,8,8)});
    const f=g.flight;if(f){const k=f.tt,x=CX+(f.x-CX)*k,y=400+(f.y-400)*k,sz=1-k*.8;c.strokeStyle=INK;c.lineWidth=6*sz+1;c.beginPath();c.moveTo(x,y);c.lineTo(x+(CX-x)*.1,y+60*sz);c.stroke();c.fillStyle='#E85A5A';c.fillRect(x-6*sz,y+50*sz,12*sz,14*sz)}
    if(!g.flight&&g.wait<=0){const r=g.ret;c.strokeStyle='rgba(31,42,58,.35)';c.lineWidth=10;c.beginPath();c.arc(r.x,r.y,46,0,7);c.stroke();
      c.strokeStyle='#E85A5A';c.lineWidth=4;c.beginPath();c.arc(r.x,r.y,46,-1.2,.3);c.stroke();
      c.lineWidth=3;c.beginPath();c.moveTo(r.x-16,r.y);c.lineTo(r.x-6,r.y);c.moveTo(r.x+6,r.y);c.lineTo(r.x+16,r.y);c.moveTo(r.x,r.y-16);c.lineTo(r.x,r.y-6);c.moveTo(r.x,r.y+6);c.lineTo(r.x,r.y+16);c.stroke()}
    const wx=CX,wy=100;rr(c,wx-90,wy-26,180,52,26);outlined(c,'rgba(31,42,58,.75)',3);
    c.beginPath();c.arc(wx-62,wy,20,0,7);outlined(c,'#F28B8B',3);
    const dir=Math.sign(g.wind)||1;c.save();c.translate(wx-62,wy);c.scale(dir,1);c.strokeStyle='#fff';c.lineWidth=3.5;for(let i=-1;i<=1;i++){c.beginPath();c.moveTo(i*7-4,-7);c.lineTo(i*7+3,0);c.lineTo(i*7-4,7);c.stroke()}c.restore();
    txt(c,t('ar.wind'),wx+22,wy-10,13,{align:'center',font:'Lilita One',stroke:false});txt(c,Math.abs(g.wind).toFixed(1).replace('.',','),wx+22,wy+11,20,{align:'center',stroke:false});
    drawFloats(c,g.fl,1/60);hud(c,g,{combo:g.streak});
  };
  return g;
}});

/* ---------- ¡Salta, que viene el toro! ---------- */
registerGame({id:'bull_jump',name:{es:'¡Salta, que viene el toro!',en:'Jump, the Bull Is Coming!'},category:'reflex',duration:45,difficulty:1,cap:40000,phase:5,
  desc:{es:'Los toros vienen corriendo: brinca en el momento justo para que pasen por debajo.',en:'Bulls come charging: jump at the right moment so they pass underneath.'},
  tips:{es:{ctrl:'Toca la pantalla para brincar',plus:'+100 por cada toro que saltas (más en racha)',minus:'Si el toro te alcanza pierdes una vida (tienes 3)'},
        en:{ctrl:'Tap the screen to jump',plus:'+100 for each bull you jump (more on a streak)',minus:'If a bull hits you, you lose a life (you have 3)'}},ctrlIcon:'tap',
  sim:k=>({raw:(400+Math.random()*3800)*k,acc:rand(.6,.95)}),
  create(dur){
  const GY=318,PX=580;
  const g={dur,t:0,over:false,fl:[],y:0,vy:0,lives:3,inv:0,bulls:[],spawnT:1.4,jumps:0,hits:0,streak:0,mx:0,pts:0,spin:0,dust:[]};
  g.down=()=>{if(g.y===0&&g.spin<=0){g.vy=-780;tone(600,.08,'triangle',.05,1.6)}};g.key=(k,d)=>{if(d&&(k==='Space'||k==='ArrowUp'))g.down()};
  g.update=dt=>{g.inv=Math.max(0,g.inv-dt);g.spin=Math.max(0,g.spin-dt);
    if(g.y<0||g.vy<0){g.vy+=2300*dt;g.y+=g.vy*dt;if(g.y>=0){g.y=0;g.vy=0}}
    g.spawnT-=dt;if(g.spawnT<=0){const v=(330+g.t*5)*rand(.85,1.25);g.bulls.push({x:-140,v,ph:0});if(g.t>12&&Math.random()<.25)g.bulls.push({x:-140-v*rand(.45,.6),v,ph:1});g.spawnT=rand(1.1,2.1)*Math.max(.6,1-g.t*.008)}
    g.bulls.forEach(b=>{b.x+=b.v*dt;b.ph+=dt*b.v/40;if(Math.random()<dt*12)g.dust.push({x:b.x-40,y:GY-6,l:1});
      if(!b.hit&&!b.done&&Math.abs(b.x-PX)<46&&g.y>-62&&g.inv<=0){b.hit=1;g.hits++;g.lives--;g.streak=0;g.inv=1.3;g.spin=.7;tone(110,.4,'sawtooth',.08,.4);if(g.lives<=0)g.over=true}
      if(!b.hit&&!b.done&&b.x>PX+50){b.done=1;g.jumps++;g.streak++;g.mx=Math.max(g.mx,g.streak);const p=100*comboMult(g.streak);g.pts+=p;floatTxt(g.fl,PX,GY-150,t('bull.ok')+' +'+p,'#FFD23F',24)}});
    g.bulls=g.bulls.filter(b=>b.x<940);g.dust.forEach(d=>{d.l-=dt*2;d.y-=dt*20});g.dust=g.dust.filter(d=>d.l>0)};
  g.score=()=>g.pts;g.acc=()=>g.jumps+g.hits?g.jumps/(g.jumps+g.hits):null;g.maxCombo=()=>g.mx;
  g.auto=dt=>{const b=g.bulls.filter(b=>!b.done&&b.x<PX).sort((a,b)=>b.x-a.x)[0];if(b&&g.y===0){const tt=(PX-50-b.x)/b.v;if(tt<.2&&tt>.05)botTap(g,400,200)}};
  function bull(c,b){c.save();c.translate(b.x,GY);const s=Math.sin(b.ph*1.3);
    c.lineWidth=6;c.strokeStyle=INK;c.lineCap='round';[[-34,s],[-20,-s],[22,-s],[36,s]].forEach(([x,d])=>{c.beginPath();c.moveTo(x,-36);c.lineTo(x+d*14,0);c.stroke()});
    c.beginPath();c.ellipse(0,-52,52,28,0,0,7);outlined(c,'#A0612F',4);
    c.beginPath();c.moveTo(-50,-60);c.quadraticCurveTo(-58,-40,-48,-28);c.lineTo(-56,-50);c.fillStyle='#A0612F';c.fill();
    c.beginPath();c.ellipse(26,-62,36,26,-.2,0,7);c.fillStyle='#5E3A1E';c.fill();
    c.beginPath();c.ellipse(56,-56,22,20,0,0,7);outlined(c,'#8A4F27',4);
    c.beginPath();c.ellipse(70,-46,12,9,0,0,7);outlined(c,'#D98C6A',3);c.fillStyle=INK;c.beginPath();c.arc(66,-46,2,0,7);c.arc(74,-46,2,0,7);c.fill();
    c.fillStyle='#fff';[[44,-72,-1],[64,-74,1]].forEach(([x,y,d])=>{c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+d*4,y-24,x+d*16,y-30);c.lineTo(x+d*6,y-6);c.closePath();c.fill();c.lineWidth=3;c.strokeStyle=INK;c.stroke()});
    c.fillStyle='#E85A5A';c.beginPath();c.arc(56,-62,4,0,7);c.fill();c.strokeStyle=INK;c.lineWidth=3;c.beginPath();c.moveTo(48,-68);c.lineTo(58,-64);c.stroke();
    c.restore()}
  function cowboy(c){if(g.inv>0&&(g.t*12|0)%2&&g.spin<=0)return;c.save();c.translate(PX,GY+g.y);if(g.spin>0){c.translate(0,-50);c.rotate(g.spin*14);c.translate(0,50)}
    stick(c,0,0,g.t*10,g.y<0?'jump':'run');
    c.fillStyle='#C0392B';c.beginPath();c.ellipse(9,-88,24,6,0,0,7);c.fill();c.strokeStyle=INK;c.lineWidth=3;c.stroke();rr(c,-3,-108,24,20,6);outlined(c,'#C0392B',3);
    c.fillStyle='#E85A5A';c.beginPath();c.moveTo(-2,-66);c.lineTo(20,-66);c.lineTo(9,-56);c.closePath();c.fill();c.restore()}
  g.draw=c=>{
    skyBg(c,'#9ED9D0','#F7D9A0');
    c.fillStyle='#F6C987';[[0,120,140],[150,160,90],[260,110,120],[420,150,70],[520,100,130],[680,140,120]].forEach(([x,h,w])=>{c.fillRect(x,GY-h,w,h);c.fillRect(x+w*.3,GY-h-24,w*.4,24)});
    c.fillStyle='#EFB774';c.save();c.translate(700,GY-120);c.rotate(g.t*.6);for(let i=0;i<4;i++){c.rotate(Math.PI/2);c.fillRect(-6,0,12,80)}c.restore();c.fillRect(694,GY-120,12,120);
    c.fillStyle='#E9A35A';c.fillRect(0,GY,800,90);c.fillStyle=INK;c.fillRect(0,GY-3,800,5);c.fillStyle='rgba(31,42,58,.12)';for(let x=(-g.t*120)%60;x<800;x+=60)c.fillRect(x,GY+30,26,6);
    c.fillStyle='rgba(31,42,58,.2)';c.beginPath();c.ellipse(PX+8,GY+4,26*(1+g.y/300),6,0,0,7);c.fill();
    g.dust.forEach(d=>{c.fillStyle=`rgba(80,70,60,${d.l*.5})`;c.beginPath();c.arc(d.x,d.y,10+(1-d.l)*10,0,7);c.fill()});
    g.bulls.forEach(b=>bull(c,b));cowboy(c);
    drawFloats(c,g.fl,1/60);hud(c,g,{combo:g.streak,lives:g.lives,lives0:3});
  };
  return g;
}});
