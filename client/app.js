/* =====================================================================
   4. MODO, ESTADO Y PUNTUACIÓN
   MODE 'demo': todo corre en este navegador con compañeros simulados.
   MODE 'live': el estado viene del Worker de Cloudflare (D1).
   ROLE: 'all' (demo), 'home' (/: crear sala o unirse), 'host' (/host: consola de quien creó la sala),
         'screen' (/pantalla?s=CODIGO), 'phone' (/jugar?s=CODIGO).
   ===================================================================== */
const MODE=window.KO_MODE||'demo';
const PATH=location.pathname,QS=new URLSearchParams(location.search);
const ROLE=MODE==='demo'?'all':/^\/pantalla/.test(PATH)?'screen':/^\/host/.test(PATH)?'host':(/^\/jugar/.test(PATH)||QS.get('s'))?'phone':'home';
const HAS={screen:['all','screen','host'].includes(ROLE),phone:['all','phone'].includes(ROLE),admin:['all','host'].includes(ROLE)};
document.body.classList.add('mode-'+MODE,'role-'+ROLE);
let clockOff=0;const now=()=>Date.now()+clockOff;

Object.assign(L.es,{
 'err.net':'Sin conexión. Revisa tu internet e inténtalo otra vez.','err.generic':'No se pudo completar. Inténtalo otra vez.','net.off':'Sin conexión, reintentando…',
 'rot.title':'Gira tu teléfono','rot.text':'Los juegos se juegan en horizontal.','rot.full':'Pantalla completa',
 'home.sub':'Torneos de minijuegos para la oficina','home.joinT':'Unirme a una sala','home.joinD':'Escribe el código que aparece en la pantalla grande o escanea el QR.','home.joinB':'Unirme',
 'home.hostT':'Crear una sala','home.hostD':'Para quien organiza. Obtienes el código, el QR, la pantalla para proyectar y todos los controles.','home.hostB':'Crear sala','home.back':'Volver a mi sala {c}','home.demo':'Ver la demo con compañeros simulados',
 'err.host':'Esta sala se creó en otro navegador. Crea una sala nueva desde el inicio.','err.nocode':'Escribe el código de la sala.','links.new':'Ir al inicio',
 'links.screen':'Pantalla grande','links.join':'Enlace para unirse','links.copy':'Copiar','links.copied':'Copiado','links.open':'Abrir en otra ventana','links.project':'Proyectar aquí',
 'p.botsLive':'Jugadores de prueba: {n}','join.reset':'La sala se reinició. Escribe tu nombre para unirte otra vez.',
 'err.no_players':'Todavía no hay jugadores en la sala.','tut.round':'RONDA {r} DE {n} · ASÍ SE JUEGA','tut.demo':'ASÍ SE JUEGA','tut.try':'Probar','tut.ready':'¡Estoy listo!','tut.readyOk':'✓ ¡Listo!','tut.practice':'PRÁCTICA · no cuenta para el puntaje','tut.back':'Ver instrucciones','tut.status':'Listos: {a} de {b} · empieza en {s} s','tut.prep':'¡PREPÁRATE!','tut.tvReady':'LISTOS {a} / {b}','tut.tvStart':'EMPIEZA EN {s} S','tut.ctrl':'Cómo se juega','g.intro':'Tiempo de instrucciones','dash.ready':'Listos','btn.skip':'Empezar ya','g.phase':'Fase {n}','err.no_plan':'Elige al menos un juego.','err.not_lobby':'Solo se puede cambiar en la sala de espera.'
});
Object.assign(L.en,{
 'err.net':'No connection. Check your internet and try again.','err.generic':'Could not complete. Try again.','net.off':'No connection, retrying…',
 'rot.title':'Turn your phone','rot.text':'Games are played sideways.','rot.full':'Full screen',
 'home.sub':'Office minigame tournaments','home.joinT':'Join a room','home.joinD':'Type the code shown on the big screen or scan the QR.','home.joinB':'Join',
 'home.hostT':'Create a room','home.hostD':'For the organizer. You get the code, the QR, the screen to project and all the controls.','home.hostB':'Create room','home.back':'Back to my room {c}','home.demo':'See the demo with simulated coworkers',
 'err.host':'This room was created in another browser. Create a new room from the home page.','err.nocode':'Type the room code.','links.new':'Go home',
 'links.screen':'Big screen','links.join':'Join link','links.copy':'Copy','links.copied':'Copied','links.open':'Open in new window','links.project':'Project here',
 'p.botsLive':'Test players: {n}','join.reset':'The room was reset. Type your name to join again.',
 'err.no_players':'There are no players in the room yet.','tut.round':'ROUND {r} OF {n} · HOW TO PLAY','tut.demo':'HOW TO PLAY','tut.try':'Try it','tut.ready':'I\'m ready!','tut.readyOk':'✓ Ready!','tut.practice':'PRACTICE · does not count','tut.back':'See instructions','tut.status':'Ready: {a} of {b} · starts in {s} s','tut.prep':'GET READY!','tut.tvReady':'READY {a} / {b}','tut.tvStart':'STARTS IN {s} S','tut.ctrl':'How to play','g.intro':'Instruction time','dash.ready':'Ready','btn.skip':'Start now','g.phase':'Phase {n}','err.no_plan':'Pick at least one game.','err.not_lobby':'Can only be changed in the waiting room.'
});

const NAMES=['Ana L.','Luis R.','Carla M.','Pedro S.','Sofía G.','Diego P.','Valeria C.','Jorge A.','Camila R.','Andrés F.','Daniela H.','Marco T.','Lucía B.','Fernando V.','Gabriela O.','Ricardo N.','Paola D.','Héctor Z.','Mariela E.','Oscar I.','Karla U.','Esteban Q.','Fabiola J.','Rodrigo K.','Natalia Y.','Mauricio W.','Alejandra X.','Iván M.','Rocío P.','Kevin S.','Melissa A.','Cristian L.','Andrea G.','Erick R.','Patricia C.','Samuel D.','Gloria F.','Javier H.','Lorena B.','Manuel T.','Tatiana V.','Raúl O.','Silvia N.','Bryan E.','Yesenia I.','Walter U.','Dayana Q.','Allan J.','Rebeca K.','Nelson Y.','Ingrid W.','Gerardo X.','Wendy M.','Josué P.','Vanessa S.','Elvin A.','Marisol L.','Adrián G.','Brenda R.','Franklin C.','Heidy D.','Roberto F.','Nadia H.','Carlos B.','Jimena T.','Álvaro V.','Irene O.','Sergio N.','Pamela E.','Omar I.','Lidia U.','Hugo Q.','Celeste J.','Ramón K.','Ivonne Y.','Mario W.','Stephanie X.','Edwin M.','Tania P.','Saúl S.','Laura A.','Emilio L.','Rosa G.','Dennis R.','Claudia C.','Arturo D.','Zulema F.','Julio H.','Abigail B.','Ernesto T.','Miriam V.','Gustavo O.','Elena N.','Douglas E.','Yolanda I.','Marvin U.','Susana Q.','Tomás J.','Olga K.','Rafael Y.'];
const newCode=()=>'KO-'+Array.from({length:5},()=>'23456789ABCDEFGHJKMNPQRSTUVWXYZ'[Math.random()*31|0]).join('');
const S={phase:'LOBBY',event:'',code:MODE==='demo'?'KO-8F29A':'',locked:false,mode:'random',rounds:5,durMode:'game',manual:[],plan:[],round:-1,
  players:[],me:null,botTarget:MODE==='demo'?46:0,auto:true,introEnd:0,playEnd:0,resultsEnd:0,closeAt:0,dur:30,nextJoin:0,pv:0,gv:0,finalAt:0,finalView:'podium',endedAt:0,
  ver:-1,results:[],cfgKey:'',introSec:25,ready:new Set()};let myReadyRound=-9;const COUNT_MS=5000;
let uid=0;
const activeIn=(p,r)=>!p.kicked&&p.joinedRound<=r;
const durFor=def=>S.durMode==='game'?def.duration:+S.durMode;

/* Puntos por juego (0-1000): 70% posición + 30% cercanía al mejor */
function roundPoints(r){
  const subs=S.players.filter(p=>!p.kicked&&p.res[r]&&p.res[r].raw>0).map(p=>({p,raw:p.res[r].raw,at:p.res[r].at}));
  subs.sort((a,b)=>b.raw-a.raw||a.at-b.at);
  const N=subs.length,best=N?subs[0].raw:1,map=new Map();
  subs.forEach((s,i)=>{let pos=i;while(pos>0&&subs[pos-1].raw===s.raw)pos--;const rk=N<=1?1:(N-1-pos)/(N-1);map.set(s.p.id,{pts:Math.round(700*rk+300*s.raw/best),pos:pos+1,N,raw:s.raw})});
  return map;
}
function closedRounds(){const n=S.phase==='PLAY'||S.phase==='INTRO'?S.round:S.round+1;return Math.max(0,n)}
/* King Score = suma de puntos por juego + 40 por ronda cerrada en la mitad de arriba */
function standings(upto=S.round,nClosed=closedRounds()){
  const maps=[];for(let r=0;r<=upto;r++)maps[r]=roundPoints(r);
  const rows=S.players.filter(p=>!p.kicked).map(p=>{
    let tot=0,bonus=0,last=0;const per=[];
    for(let r=0;r<=upto;r++){const m=maps[r].get(p.id);per[r]=m||null;if(m){tot+=m.pts;if(r<nClosed&&m.pos<=Math.ceil(m.N/2))bonus+=40}if(p.res[r])last=Math.max(last,p.res[r].at)}
    return{p,tot:tot+bonus,bonus,per,last:last||Infinity};
  });
  rows.sort((a,b)=>b.tot-a.tot||a.last-b.last||String(a.p.id).localeCompare(String(b.p.id)));
  return rows;
}
const histRanks=r=>r<0?null:new Map(standings(r,r+1).map((x,i)=>[x.p.id,i+1]));

/* =====================================================================
   5. FLUJO DEL TORNEO
   ===================================================================== */
function drawPlan(){
  const pool=REG.filter(d=>d.playable&&d.enabled).sort(()=>Math.random()-.5);
  const n=Math.min(S.rounds,pool.length),out=[],used=new Set();
  while(out.length<n){const fresh=pool.find(d=>!out.includes(d)&&!used.has(d.category));const pick=fresh||pool.find(d=>!out.includes(d));if(!pick)break;out.push(pick);used.add(pick.category);if(used.size>=Object.keys(CATS).length)used.clear()}
  return out.map(d=>d.id);
}
function planForStart(){
  if(S.mode==='manual')return S.manual.filter(id=>GAME[id]&&GAME[id].playable&&GAME[id].enabled);
  const p=S.plan.filter(id=>GAME[id]&&GAME[id].enabled);return p.length?p:drawPlan();
}
/* --- demo: el flujo corre en el navegador --- */
function freeName(){const used=new Set(S.players.map(p=>p.name.toLowerCase()));const pool=NAMES.filter(n=>!used.has(n.toLowerCase()));return pool.length?pool[Math.random()*pool.length|0]:null}
function addBot(){if(S.players.filter(p=>!p.kicked).length>=99)return;const n=freeName();if(!n)return;S.players.push({id:++uid,name:n,av:Math.random()*12|0,bot:true,res:{},joinedRound:0});S.pv++}
const demo={
  start(){if(S.phase!=='LOBBY'||!S.players.some(p=>!p.kicked))return;S.plan=planForStart();if(!S.plan.length)return;S.round=-1;S.gv++;demo.next()},
  next(){if(S.round+1>=S.plan.length){demo.final();return}S.round++;S.phase='INTRO';S.dur=durFor(GAME[S.plan[S.round]]);S.introEnd=now()+S.introSec*1000+COUNT_MS;S.closeAt=0;S.ready=new Set();S.players.forEach(p=>{if(p.bot)p.readyAt=now()+rand(2500,Math.min(14000,S.introSec*900))})},
  play(){S.phase='PLAY';S.playEnd=S.introEnd+S.dur*1000+1800;
    S.players.forEach(p=>{if(p.bot&&activeIn(p,S.round))p.fin=S.introEnd+S.dur*1000*(Math.random()<.55?rand(.97,1):rand(.35,.95))})},
  close(){if(S.phase!=='PLAY')return;S.phase='RESULTS';S.resultsEnd=now()+10000},
  final(){if(S.phase==='INTRO')S.round--;S.phase='FINAL';S.endedAt=now()},
  reset(){Object.assign(S,{phase:'LOBBY',code:newCode(),players:[],me:null,round:-1,plan:S.mode==='manual'?[...S.manual]:[],closeAt:0,nextJoin:now()+600});S.pv++;S.gv++},
  tick(){
    const t0=now();
    if(S.phase==='LOBBY'){const bots=S.players.filter(p=>p.bot&&!p.kicked).length;if(!S.locked&&bots<S.botTarget&&t0>=S.nextJoin){addBot();S.nextJoin=t0+rand(160,600)}}
    else if(S.phase==='INTRO'){
      S.players.forEach(p=>{if(p.bot&&activeIn(p,S.round)&&!S.ready.has(p.id)&&t0>=p.readyAt)S.ready.add(p.id)});
      const act=S.players.filter(p=>activeIn(p,S.round));
      if(act.length&&act.every(p=>S.ready.has(p.id))&&S.introEnd-t0>COUNT_MS)S.introEnd=t0+COUNT_MS;
      if(t0>=S.introEnd)demo.play()}
    else if(S.phase==='PLAY'){
      const r=S.round,def=GAME[S.plan[r]];
      S.players.forEach(p=>{if(p.bot&&activeIn(p,r)&&!p.res[r]&&t0>=p.fin){const s=def.sim(S.dur/def.duration);p.res[r]={raw:Math.round(clamp(s.raw,1,def.cap)),acc:s.acc??null,combo:2+Math.random()*12|0,at:t0}}});
      const act=S.players.filter(p=>activeIn(p,r));
      if(act.length&&act.every(p=>p.res[r])&&!S.closeAt)S.closeAt=t0+1500;
      if((S.closeAt&&t0>=S.closeAt)||t0>=S.playEnd)demo.close();
    }else if(S.phase==='RESULTS'){if(S.auto&&t0>=S.resultsEnd)demo.next()}
  }
};

/* --- live: conexión con el Worker --- */
let HOST=null;try{HOST=JSON.parse(store.get('ko-host')||'null')}catch(e){}
async function api(path,body,admin){
  try{
    const r=await fetch(path,{method:body?'POST':'GET',cache:'no-store',headers:Object.assign({'content-type':'application/json'},admin&&HOST?{'x-host-key':HOST.key}:{}),body:body?JSON.stringify(body):undefined});
    const j=await r.json().catch(()=>({error:'generic'}));if(!r.ok&&!j.error)j.error='generic';return j;
  }catch(e){return{error:'net'}}
}
const meKey='ko-me';
const loadMe=()=>{try{return JSON.parse(store.get(meKey)||'null')}catch(e){return null}};
const saveMe=m=>store.set(meKey,JSON.stringify(m));
const clearMe=()=>store.set(meKey,'null');
let myLocal={},queue=[],flushing=false,lastPoll=0,polling=false,netOk=true,joinNote='';
function pollEvery(){
  if(ROLE==='screen'||ROLE==='host')return 1500;
  if(!S.code)return 1e9;if(!S.me)return 4000;if(S.phase==='PLAY'&&phoneState==='play')return 20000;if(S.phase==='FINAL')return 4000;return 2500;
}
async function poll(force){
  if(MODE!=='live'||polling)return;if(!force&&Date.now()-lastPoll<pollEvery())return;
  polling=true;lastPoll=Date.now();const t0=Date.now();
  if(!S.code){polling=false;return}
  const j=await api('/api/state?code='+encodeURIComponent(S.code)+'&v='+S.ver);
  const t1=Date.now();polling=false;
  if(j.error==='code'){roomGone();return}
  if(j.error){setNet(false);return}
  setNet(true);clockOff=j.now-(t0+t1)/2;merge(j);
}
function roomGone(){
  if(ROLE==='host'){store.set('ko-host','null');location.replace('/')}
  else if(ROLE==='screen')location.replace('/');
  else if(ROLE==='phone'){clearMe();myLocal={};S.me=null;S.code='';S.ver=-1;joinNote='';S.players=[];stopGame();phoneShow('join');$('#joinErr').textContent=t('err.gone')}
}
function setNet(ok){if(ok===netOk)return;netOk=ok;$('#net').hidden=ok}
function merge(j){
  const s=j.s,editing=Date.now()<cfgHold;
  Object.assign(S,{code:s.code,phase:s.phase,round:s.round,dur:s.dur,locked:s.locked,auto:s.auto,introEnd:s.introEnd,playEnd:s.playEnd,resultsEnd:s.resultsEnd,endedAt:s.endedAt,ver:s.ver});
  if(s.phase!=='LOBBY'||!editing){
    S.event=s.event;S.mode=s.mode;S.rounds=s.rounds;S.durMode=s.durMode;S.manual=(s.cfg&&s.cfg.manual)||[];S.plan=s.plan||[];S.introSec=(s.cfg&&s.cfg.intro)||25;
    const dis=new Set((s.cfg&&s.cfg.disabled)||[]);REG.forEach(d=>{if(d.playable)d.enabled=!dis.has(d.id)});
    const key=JSON.stringify([s.event,s.mode,s.rounds,s.durMode,s.cfg,s.plan]);if(key!==S.cfgKey){S.cfgKey=key;S.gv++;syncAdminInputs()}
  }
  if(S.phase==='INTRO'&&now()>=S.introEnd){S.phase='PLAY';S.playEnd=S.introEnd+S.dur*1000+1800}
  if(j.players){
    S.players=j.players.map(p=>({id:p.id,name:p.name,av:p.av,bot:!!p.bot,joinedRound:p.jr,kicked:!!p.kicked,res:{}}));
    S.results=j.results||[];S.ready=new Set(j.ready||[]);S.pv++;identifyMe();if(S.me&&myReadyRound===S.round)S.ready.add(S.me.id);
  }
  applyResults();
}
function identifyMe(){
  if(!HAS.phone)return;const m=loadMe();
  if(!m){S.me=null;return}
  if(m.code!==S.code){S.me=null;return}
  S.me=S.players.find(p=>p.id===m.id)||null;if(!S.me){clearMe();myLocal={};joinNote=t('join.reset');$('#codeIn').value=S.code}
}
function applyResults(){
  if(MODE!=='live')return;const t0=now(),by=new Map(S.players.map(p=>[p.id,p]));
  S.players.forEach(p=>p.res={});
  for(const r of S.results){if(r.at>t0)continue;const p=by.get(r.p);if(p)p.res[r.r]={raw:r.raw,acc:r.acc,combo:r.combo,at:r.at}}
  if(S.me)for(const k in myLocal)if(!S.me.res[k])S.me.res[k]=myLocal[k];
}
async function flushQueue(){
  if(flushing)return;flushing=true;
  while(queue.length){const j=await api(queue[0].path,queue[0].body);if(j.error==='net'){flushing=false;setTimeout(flushQueue,2000);return}queue.shift()}
  flushing=false;poll(true);
}
function send(path,body){if(MODE!=='live')return;queue.push({path,body});flushQueue()}

/* --- acciones del administrador (mismas en demo y en vivo) --- */
let cfgHold=0,cfgTimer=0,botTimer=0;
async function adminAct(action,extra={}){
  if(MODE==='demo'){
    if(action==='start')demo.start();
    else if(action==='next'){if(S.phase==='PLAY')demo.close();else if(S.phase==='RESULTS')demo.next();else if(S.phase==='INTRO'&&S.introEnd-now()>COUNT_MS)S.introEnd=now()+COUNT_MS}
    else if(action==='pause'){S.auto=!S.auto;if(S.auto&&S.phase==='RESULTS')S.resultsEnd=now()+5000}
    else if(action==='end'){if(['INTRO','PLAY','RESULTS'].includes(S.phase))demo.final()}
    else if(action==='reset')demo.reset();
    else if(action==='lock')S.locked=!S.locked;
    else if(action==='kick'){const p=S.players.find(q=>q.id===extra.pid);if(p){p.kicked=true;S.pv++}}
    tick();return{ok:true};
  }
  if(action==='start')extra={plan:planForStart()};
  const j=await api('/api/admin',Object.assign({action,code:S.code},extra),true);
  showAdErr(j.error);
  await poll(true);tick();return j;
}
function showAdErr(e){const el=$('#adErr');el.textContent=e?(L[lang]['err.'+e]?t('err.'+e):t('err.generic')):'';el.hidden=!e}
function pushConfig(){
  if(MODE!=='live')return;cfgHold=Date.now()+4000;clearTimeout(cfgTimer);
  cfgTimer=setTimeout(async()=>{
    const j=await api('/api/admin',{action:'config',code:S.code,intro:S.introSec,event:S.event,mode:S.mode,rounds:S.rounds,durMode:S.durMode,manual:S.manual,
      disabled:REG.filter(d=>d.playable&&!d.enabled).map(d=>d.id),plan:S.mode==='manual'?S.manual:S.plan},true);
    showAdErr(j.error);cfgHold=Date.now()+1200;poll(true);
  },400);
}

/* =====================================================================
   6. REACCIONES A CAMBIOS DE FASE (mismas en demo y en vivo)
   ===================================================================== */
let seen={code:null,phase:null,round:null,me:null,kicked:false};
function react(){
  const k={code:S.code,phase:S.phase,round:S.round,me:S.me?S.me.id:null,kicked:!!(S.me&&S.me.kicked)};
  if(k.code===seen.code&&k.phase===seen.phase&&k.round===seen.round&&k.me===seen.me&&k.kicked===seen.kicked)return;
  const prev=seen;seen=k;
  if(k.code&&k.code!==prev.code){
    $('#chips').innerHTML='';boards.forEach(b=>{b.map.clear();b.el.innerHTML=''});stopConfetti();prevRanks=null;introBuilt=-1;makeQR();
    if(prev.code){stopGame();if(MODE==='demo')S.me=null}
    if(!$('#codeIn').value||prev.code)$('#codeIn').value=urlCode&&!prev.code?urlCode:k.code;
  }
  if(k.phase!==prev.phase||k.round!==prev.round){
    if(k.phase==='INTRO')introBuilt=-1;else stopTvDemo();
    if(k.phase==='RESULTS'&&prev.phase)SFX.results();
    if(k.phase==='FINAL'){S.finalAt=now();S.finalView='podium';if(HAS.screen)buildFinal();if(prev.phase&&HAS.screen)SFX.victory()}
    if(k.phase==='LOBBY')stopConfetti();
  }
  if(HAS.phone)phoneReact();
  render(true);
}
function phoneReact(){
  if(!S.me){if(!['join','kicked'].includes(phoneState)){stopGame();phoneShow('join')}$('#joinNote').textContent=joinNote;$('#joinNote').hidden=!joinNote;return}
  if(S.me.kicked){stopGame();if(MODE==='live')clearMe();phoneShow('kicked');if(MODE==='demo')S.me=null;return}
  const me=S.me,r=S.round;
  $('#hello').textContent=t('wait.hello',{name:me.name});$('#waitAv').innerHTML=avatarSVG(me.av);
  if(S.phase==='LOBBY')phoneShow('wait');
  else if(S.phase==='INTRO'){if(activeIn(me,r))phoneIntro();else phoneShow('late')}
  else if(S.phase==='PLAY'){
    if(!activeIn(me,r)){phoneShow('late');return}
    if(me.res[r]){phoneShowOver();return}
    if(phoneState==='intro')phoneGo();
    else{const rem=(S.playEnd-1800-now())/1000;if(rem>4){phoneIntro();phoneGo(rem)}else phoneShow('late')}
  }
  else if(S.phase==='RESULTS'){if(E&&!E.ended)finishGame(true);phoneResults()}
  else if(S.phase==='FINAL'){if(E&&!E.ended)finishGame(true);phoneFinal()}
}

function tick(){
  if(MODE==='demo')demo.tick();
  else{poll();if(S.phase==='INTRO'&&S.introEnd&&now()>=S.introEnd){S.phase='PLAY';S.playEnd=S.introEnd+S.dur*1000+1800}applyResults()}
  if(S.phase==='FINAL'&&S.finalView==='podium'&&S.finalAt&&now()-S.finalAt>7000){S.finalAt=0;setFinalView('king')}
  react();render();
}

/* =====================================================================
   6b. INSTRUCCIONES: demo automática, listos y práctica
   ===================================================================== */
const CTRL_IC={
  tap:'<svg viewBox="0 0 40 40" aria-hidden="true" fill="none" stroke="#1F2A3A" stroke-width="3" stroke-linejoin="round"><circle cx="16" cy="12" r="8" stroke-dasharray="3 3"/><rect x="12" y="10" width="8" height="18" rx="4" fill="#fff"/><rect x="8" y="22" width="22" height="14" rx="6" fill="#fff"/></svg>',
  hold:'<svg viewBox="0 0 40 40" aria-hidden="true" fill="none" stroke="#1F2A3A" stroke-width="3" stroke-linejoin="round"><circle cx="16" cy="12" r="9" stroke="#FF7A2F"/><rect x="12" y="12" width="8" height="16" rx="4" fill="#fff"/><rect x="8" y="23" width="22" height="13" rx="6" fill="#fff"/><path d="M30 6v8l4 2" stroke="#FF7A2F"/></svg>',
  drag:'<svg viewBox="0 0 40 40" aria-hidden="true" fill="none" stroke="#1F2A3A" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"><path d="M4 10h10M4 10l3-3M4 10l3 3M36 10H26M36 10l-3-3M36 10l-3 3"/><rect x="16" y="6" width="8" height="20" rx="4" fill="#fff"/><rect x="11" y="20" width="20" height="16" rx="6" fill="#fff"/></svg>',
  swipe:'<svg viewBox="0 0 40 40" aria-hidden="true" fill="none" stroke="#1F2A3A" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"><path d="M6 30C14 12 24 10 34 10M34 10l-6-4M34 10l-5 5" stroke="#2FA8E8"/><rect x="6" y="22" width="8" height="14" rx="4" fill="#fff"/></svg>',
  buttons:'<svg viewBox="0 0 40 40" aria-hidden="true" fill="none" stroke="#1F2A3A" stroke-width="3" stroke-linejoin="round"><rect x="3" y="12" width="15" height="16" rx="4" fill="#FFD23F"/><rect x="22" y="12" width="15" height="16" rx="4" fill="#5BCB4A"/></svg>'
};
const tipsOf=def=>{const tp=def.tips?(def.tips[lang]||def.tips.es):null;return tp||{ctrl:tx(def.desc),plus:'',minus:''}};
function readyStats(){const act=S.players.filter(p=>activeIn(p,S.round));const n=act.filter(p=>S.ready.has(p.id)||(MODE==='live'&&p.bot)).length;return{a:n,b:act.length}}
class DemoRunner{
  constructor(def,canvas,dur){this.def=def;this.cv=canvas;this.c=canvas.getContext('2d');this.dur=dur||def.duration;this.alive=true;this.last=0;this.reset();this.loop=this.loop.bind(this);this.raf=requestAnimationFrame(this.loop)}
  reset(){this.e=new Engine(this.def,this.dur);this.e.start()}
  loop(ts){
    if(!this.alive)return;const dt=Math.min(.05,(ts-(this.last||ts))/1000);this.last=ts;
    const r=this.cv.getBoundingClientRect();
    if(r.width>10){const dpr=Math.min(2,devicePixelRatio||1),w=Math.round(r.width*dpr),h=Math.round(r.height*dpr);if(this.cv.width!==w||this.cv.height!==h){this.cv.width=w;this.cv.height=h}
      QUIET=true;
      try{if(this.e.g.auto)this.e.g.auto(dt);this.e.update(dt);this.c.setTransform(this.cv.width/800,0,0,this.cv.height/400,0,0);this.e.render(this.c);drawHand(this.c,this.e.g.hand,dt)}catch(err){console.warn('demo',err)}
      QUIET=false;if(this.e.over)this.reset()}
    this.raf=requestAnimationFrame(this.loop);
  }
  stop(){this.alive=false;cancelAnimationFrame(this.raf)}
}

/* =====================================================================
   7. PANTALLA GRANDE
   ===================================================================== */
const boards=[{el:$('#board'),map:new Map()},{el:$('#board2'),map:new Map()},{el:$('#board3'),map:new Map()}];
let prevRanks=null,toastQ=[],toastBusy=false,lastPhase='',lastLang=lang,introBuilt=-1,introLang='';
function toast(msg){if(toastQ.length>2)return;toastQ.push(msg);if(!toastBusy)nextToast()}
function nextToast(){const m=toastQ.shift();if(!m){toastBusy=false;return}toastBusy=true;const el=document.createElement('div');el.className='toast';el.textContent=m;$('#toasts').append(el);SFX.rank();setTimeout(()=>{el.remove();nextToast()},reduce?1400:1900)}
function renderBoard(b,rows){
  const wrap=b.el,map=b.map;
  const first=new Map();map.forEach((el,id)=>first.set(id,el.getBoundingClientRect().top));
  const keep=new Set(rows.map(r=>r.id));
  map.forEach((el,id)=>{if(!keep.has(id)){el.remove();map.delete(id)}});
  wrap.querySelector('.empty-board')?.remove();
  rows.forEach((r,i)=>{
    let el=map.get(r.id),fresh=false;
    if(!el){el=document.createElement('div');el.className='row enter';
      el.innerHTML=`<span class="pos"></span><span class="av">${avatarSVG(r.av)}</span><span class="nm"><span></span></span><span class="ex"></span><span class="tot"></span>`;
      map.set(r.id,el);fresh=true;el.dataset.tot=r.tot}
    el.style.setProperty('--c',i===0?'#FFD23F':['#8FD3F7','#9BE08F','#FFB07F'][i%3]);
    el.querySelector('.pos').textContent=i+1;
    const nm=el.querySelector('.nm'),key=r.name+'|'+r.me+'|'+(i===0)+'|'+lang;
    if(nm.dataset.k!==key){nm.dataset.k=key;nm.innerHTML='';const sp=document.createElement('span');sp.textContent=r.name;nm.append(sp);
      if(r.me)nm.insertAdjacentHTML('beforeend',`<em class="tag">${t('tag.you')}</em>`);
      if(i===0)nm.insertAdjacentHTML('beforeend',`<em class="tag king">${t('tag.king')}</em>`)}
    el.classList.toggle('me-row',!!r.me);
    const cr=el.querySelector('.crown');
    if(i===0&&!cr)el.insertAdjacentHTML('beforeend','<svg class="crown" viewBox="0 0 64 50" aria-hidden="true"><use href="#crown"/></svg>');
    if(i!==0&&cr)cr.remove();
    const ex=el.querySelector('.ex'),exh=r.ex||'';if(ex.innerHTML!==exh)ex.innerHTML=exh;
    const prev=+el.dataset.tot;el.querySelector('.tot').textContent=nf(r.tot);
    if(!fresh&&r.tot>prev&&!reduce){const pl=document.createElement('span');pl.className='plus';pl.textContent='+'+nf(r.tot-prev);el.append(pl);setTimeout(()=>pl.remove(),1200)}
    el.dataset.tot=r.tot;
    if(wrap.children[i]!==el)wrap.insertBefore(el,wrap.children[i]||null);
  });
  if(!reduce)map.forEach((el,id)=>{if(!first.has(id))return;const dy=first.get(id)-el.getBoundingClientRect().top;if(Math.abs(dy)<1)return;
    el.style.transition='none';el.style.transform=`translateY(${dy}px)`;el.offsetHeight;el.style.transition='transform .65s cubic-bezier(.2,.9,.3,1.15)';el.style.transform=''});
}
function emptyBoard(b,msg){b.map.clear();b.el.innerHTML=`<div class="empty-board">${esc(msg)}</div>`}
const isMe=p=>!!(S.me&&p.id===S.me.id);
function renderTV(force){
  const tv=$('#tv');if(tv.dataset.phase!==S.phase)tv.dataset.phase=S.phase;
  const def=S.round>=0?GAME[S.plan[S.round]]:null;
  $('#tvBar').hidden=S.phase==='LOBBY';
  $('#barEv').textContent=S.event||'King Office';
  $('#barRd').textContent=def&&S.phase!=='FINAL'?t('round.of',{r:S.round+1,n:S.plan.length})+' · '+tx(def.name).toUpperCase():S.phase==='FINAL'?t('fin.title').toUpperCase():'';
  $('#barCd').textContent=S.code;
  if(S.phase==='LOBBY')renderLobby();
  if(S.phase==='INTRO')renderIntroTV();
  if(S.phase==='PLAY'||S.phase==='RESULTS'){
    const st=standings(),r=S.round;
    const nowRanks=new Map(st.map((x,i)=>[x.p.id,i+1]));
    if(prevRanks&&S.phase==='PLAY')st.slice(0,5).forEach((x,i)=>{const o=prevRanks.get(x.p.id);if(o&&o>i+1&&x.tot>0)toast(t('toast.up',{name:x.p.name.toUpperCase(),n:i+1}))});
    prevRanks=nowRanks;
    if(S.phase==='PLAY'){
      const act=S.players.filter(p=>activeIn(p,r)),fin=act.filter(p=>p.res[r]).length;
      $('#liveTitle').textContent=t('live.title');
      $('#clock').textContent=mmss((S.playEnd-1800-now())/1000);
      $('#doneTxt').textContent=t('live.done',{a:fin,b:act.length});
      $('#doneFill').style.width=(act.length?fin/act.length*100:0)+'%';
      const top=st.slice(0,9).filter(x=>x.tot>0);
      if(!top.length){if(!boards[0].el.querySelector('.empty-board'))emptyBoard(boards[0],t('live.empty'))}
      else renderBoard(boards[0],top.map(x=>({id:x.p.id,name:x.p.name,av:x.p.av,me:isMe(x.p),tot:x.tot,ex:x.p.res[r]?'<span class="ok">✓</span>':activeIn(x.p,r)?'<span class="pend"></span>':''})));
      const mi=S.me?st.findIndex(x=>isMe(x.p)):-1;
      $('#mine').textContent=mi>=9?t('live.mine',{n:mi+1,p:nf(st[mi].tot)}):'';
    }else{
      const before=histRanks(r-1),rp=roundPoints(r);
      $('#resTitle').textContent=t('res.title',{r:r+1,g:tx(def.name)});
      renderBoard(boards[1],st.slice(0,9).map((x,i)=>{
        const o=before?before.get(x.p.id):null,d=o?o-(i+1):0,m=rp.get(x.p.id);
        const mv=!before?'':d>0?`<span class="mv up">▲${d}</span>`:d<0?`<span class="mv dn">▼${-d}</span>`:'<span class="mv eq">—</span>';
        return{id:x.p.id,name:x.p.name,av:x.p.av,me:isMe(x.p),tot:x.tot,ex:(m?`<span>+${nf(m.pts)}</span>`:'')+mv}}));
      let mvp=null;rp.forEach((v,id)=>{if(v.pos===1&&!mvp)mvp=S.players.find(p=>p.id===id)});
      $('#resMvp').textContent=mvp?t('res.best',{name:mvp.name}):'';$('#resMvp').hidden=!mvp;
      const s=Math.max(0,Math.ceil((S.resultsEnd-now())/1000)),last=r+1>=S.plan.length;
      $('#resNext').textContent=S.auto?t(last?'res.final':'res.next',{s}):t('res.wait');
    }
  }
  if(S.phase==='FINAL'&&lang!==lastLang)buildFinal();
  if(S.phase!==lastPhase){attractRun(S.phase==='LOBBY');lastPhase=S.phase}
}
function renderLobby(){
  const conn=S.players.filter(p=>!p.kicked);
  $('#joinN').textContent=conn.length;$('#joinL').textContent=t('lobby.joined');
  $('#lockBadge').hidden=!S.locked;$('#codeBig').textContent=S.code;$('#evName').textContent=S.event||'King Office';$('#evName').hidden=!S.event;
  const box=$('#chips');const shown=new Map([...box.children].map(c=>[c.dataset.id,c]));
  conn.forEach(p=>{if(shown.has(String(p.id)))return;
    const c=document.createElement('span');c.className='chip new'+(isMe(p)?' me':'');c.dataset.id=p.id;c.innerHTML=avatarSVG(p.av)+'<span></span>';c.lastChild.textContent=p.name;
    box.prepend(c);SFX.join()});
  const ids=new Set(conn.map(p=>String(p.id)));shown.forEach((c,id)=>{if(!ids.has(id))c.remove()});
}
let tvDR=null;
function stopTvDemo(){if(tvDR){tvDR.stop();tvDR=null}}
function renderIntroTV(){
  const def=GAME[S.plan[S.round]],box=$('#introTv');if(!def)return;
  if(introBuilt!==S.round||introLang!==lang||!tvDR){introBuilt=S.round;introLang=lang;stopTvDemo();
    const tp=tipsOf(def);
    box.innerHTML=`<div class="tvi-head"><span class="tvi-round">${t('tut.round',{r:S.round+1,n:S.plan.length})}</span></div>
      <div class="tvi-body"><div class="tvi-demo"><canvas id="tvDemo"></canvas><span class="tvi-tag">${t('tut.demo')}</span></div>
      <div class="tvi-info"><div class="tvi-title"><span class="gicon">${def.icon}</span><div><h2 class="big-text"></h2>${catChip(def.category)}</div></div>
      <ul class="tvi-list"><li><span class="ti">${CTRL_IC[def.ctrlIcon||'tap']}</span><span class="tc"></span></li><li class="tplus"><span class="ti">+</span><span class="tp"></span></li><li class="tminus"><span class="ti">−</span><span class="tm"></span></li></ul>
      <div class="tvi-foot"><span class="tvi-ready" id="tvReady"></span><span class="tvi-start" id="tvStart"></span></div></div></div>
      <div class="tvi-count" id="tvCount" hidden><span id="tvCnt"></span></div>`;
    box.querySelector('h2').textContent=tx(def.name);box.querySelector('.tc').textContent=tp.ctrl;box.querySelector('.tp').textContent=tp.plus;box.querySelector('.tm').textContent=tp.minus;
    tvDR=new DemoRunner(def,$('#tvDemo'));
  }
  const left=S.introEnd-now(),rs=readyStats();
  $('#tvReady').textContent=t('tut.tvReady',rs);$('#tvStart').textContent=t('tut.tvStart',{s:Math.max(0,Math.ceil((left-COUNT_MS)/1000))});
  const cnt=$('#tvCount');
  if(left<=COUNT_MS){cnt.hidden=false;const sec=Math.ceil(left/1000),v=sec>3?t('tut.prep'):sec>0?String(sec):'GO!';const el=$('#tvCnt');el.classList.toggle('prep',sec>3);if(el.textContent!==v){el.textContent=v;el.style.animation='none';void el.offsetWidth;el.style.animation=''}}
  else cnt.hidden=true;
}
function setFinalView(v){S.finalView=v;document.querySelectorAll('#finNav button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v));
  document.querySelectorAll('.s-final .fv').forEach(f=>f.classList.toggle('on',f.dataset.v===v));if(v==='king'&&HAS.screen){confetti();SFX.victory()}}
document.querySelectorAll('#finNav button').forEach(b=>b.addEventListener('click',()=>{S.finalAt=0;setFinalView(b.dataset.v)}));
function catPerf(p){
  const out={};S.plan.forEach((id,r)=>{if(r>S.round)return;const c=GAME[id].category;const m=roundPoints(r).get(p.id);(out[c]=out[c]||[]).push(m?m.pts:0)});
  return Object.fromEntries(Object.entries(out).map(([c,a])=>[c,a.reduce((x,y)=>x+y,0)/a.length]));
}
function buildFinal(){
  const st=standings(),pd=$('#podium');
  const slot=(x,cls,n)=>x?`<div class="pd ${cls}">${n===1?'<svg class="crownbig" viewBox="0 0 64 50" aria-hidden="true"><use href="#crown"/></svg>':''}<div class="avb">${avatarSVG(x.p.av)}</div><div class="who"></div><div class="pts">${nf(x.tot)} pts</div><div class="blk">${n}</div></div>`:`<div class="pd ${cls}"></div>`;
  pd.innerHTML=`<h2 class="big-text">${esc(t('fin.title'))}</h2><div class="steps3">${slot(st[1],'p2',2)}${slot(st[0],'p1',1)}${slot(st[2],'p3',3)}</div>`;
  const ord=[st[1],st[0],st[2]];pd.querySelectorAll('.pd').forEach((el,i)=>{const w=el.querySelector('.who');if(w)w.textContent=ord[i].p.name+(isMe(ord[i].p)?' ('+t('p.you')+')':'')});
  boards[2].map.clear();boards[2].el.innerHTML='';
  renderBoard(boards[2],st.slice(0,10).map(x=>({id:x.p.id,name:x.p.name,av:x.p.av,me:isMe(x.p),tot:x.tot,ex:''})));
  const cats=[...new Set(S.plan.slice(0,S.round+1).map(id=>GAME[id].category))];
  const tbl=$('#catsTbl');
  tbl.innerHTML=`<span class="h">${t('fin.h.cat')}</span><span class="h">${t('fin.h.best')}</span><span class="h" style="text-align:right">${t('fin.h.avg')}</span>`;
  const perfs=st.map(x=>({x,c:catPerf(x.p)}));
  cats.forEach(c=>{let best=null;perfs.forEach(q=>{if(q.c[c]!=null&&(!best||q.c[c]>best.v))best={x:q.x,v:q.c[c]}});
    const games=S.plan.slice(0,S.round+1).filter(id=>GAME[id].category===c).map(id=>tx(GAME[id].name)).join(', ');
    tbl.insertAdjacentHTML('beforeend',`<span>${catChip(c)}<br><span class="gl">${esc(games)}</span></span><span class="who2">${best?avatarSVG(best.x.p.av):''}<span></span></span><b>${best?nf(best.v):'—'}</b>`);
    tbl.lastElementChild.previousElementSibling.lastElementChild.textContent=best?best.x.p.name:'—'});
  const k=st[0],kv=$('#kingV');
  if(!k||!k.tot){kv.innerHTML=`<h2 class="big-text">${esc(t('fin.none'))}</h2>`}
  else{const date=new Intl.DateTimeFormat(lang==='es'?'es-HN':'en-US',{dateStyle:'long'}).format(S.endedAt||Date.now());
    kv.innerHTML=`<svg class="kc" viewBox="0 0 64 50" aria-hidden="true"><use href="#crown"/></svg><div class="kav">${avatarSVG(k.p.av)}</div><div class="kt">${esc(t('fin.kingof'))}</div><h2 class="big-text kn"></h2><div class="ks">KING SCORE ${nf(k.tot)}</div><div class="km"></div>`;
    kv.querySelector('.kn').textContent=k.p.name;kv.querySelector('.km').textContent=(S.event||'King Office')+' · '+date}
  setFinalView(S.finalView);
}
let cfRaf=0;
function confetti(){
  if(reduce)return;
  const cv2=$('#confetti'),c=cv2.getContext('2d');
  const W=cv2.width=Math.max(1,cv2.clientWidth*1.5),H=cv2.height=Math.max(1,cv2.clientHeight*1.5);
  const P=Array.from({length:170},()=>({x:Math.random()*W,y:-Math.random()*H*.6,vx:rand(-60,60),vy:rand(120,300),r:Math.random()*6,vr:rand(-6,6),s:rand(6,14),c:['#FFD23F','#2FA8E8','#5BCB4A','#FF7A2F','#E85A5A','#fff'][Math.random()*6|0]}));
  let last=performance.now(),t0=last;cancelAnimationFrame(cfRaf);
  const step=ts=>{const dt=Math.min(.05,(ts-last)/1000);last=ts;c.clearRect(0,0,W,H);
    P.forEach(p=>{p.x+=p.vx*dt+Math.sin(ts/300+p.s)*.8;p.y+=p.vy*dt;p.r+=p.vr*dt;if(p.y>H+20&&ts-t0<5000){p.y=-20;p.x=Math.random()*W}
      c.save();c.translate(p.x,p.y);c.rotate(p.r);c.fillStyle=p.c;c.strokeStyle=INK;c.lineWidth=1.5;c.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);c.strokeRect(-p.s/2,-p.s/4,p.s,p.s/2);c.restore()});
    if(ts-t0<9000)cfRaf=requestAnimationFrame(step)};
  cfRaf=requestAnimationFrame(step);
}
function stopConfetti(){cancelAnimationFrame(cfRaf);const c2=$('#confetti');c2.getContext('2d').clearRect(0,0,c2.width,c2.height)}
let atRaf=0;
function attractRun(on){
  cancelAnimationFrame(atRaf);if(!on||!HAS.screen)return;
  const ac=$('#attract'),c=ac.getContext('2d');
  const st={plats:[],y:78,vy:0,gr:true,ph:0,end:0},PY=78,MX=300;
  const add=()=>{const gap=st.plats.length?rand(50,110):0,w=rand(100,180);st.plats.push({x:st.end+gap,w,c:PLANK[Math.random()*4|0]});st.end+=gap+w};
  st.plats.push({x:-20,w:400,c:PLANK[1]});st.end=380;while(st.end<1700)add();
  let last=performance.now();
  const frame=ts=>{
    const r=ac.getBoundingClientRect();if(!r.width){atRaf=requestAnimationFrame(frame);return}
    const dpr=Math.min(2,devicePixelRatio||1),Wd=1600,Hd=Wd*r.height/r.width;
    if(ac.width!==Math.round(r.width*dpr)){ac.width=Math.round(r.width*dpr);ac.height=Math.round(r.height*dpr)}
    c.setTransform(ac.width/Wd,0,0,ac.height/Hd,0,0);
    const dt=Math.min(.05,(ts-last)/1000);last=ts;
    if(!reduce){const dx=230*dt;st.end-=dx;st.plats.forEach(p=>p.x-=dx);st.plats=st.plats.filter(p=>p.x+p.w>-40);while(st.end<1700)add();st.ph+=dt*10;
      const under=st.plats.find(p=>MX>=p.x-4&&MX<=p.x+p.w+4),edge=st.plats.find(p=>p.x<=MX&&p.x+p.w>MX);
      if(st.gr&&edge&&edge.x+edge.w-MX<46){st.vy=-760;st.gr=false}
      if(!st.gr){const pv=st.y;st.vy+=2200*dt;st.y+=st.vy*dt;if(under&&st.vy>0&&pv<=PY+3&&st.y>=PY){st.y=PY;st.vy=0;st.gr=true}if(st.y>Hd+60){st.y=PY;st.vy=0;st.gr=true}}}
    c.clearRect(0,0,Wd,Hd);c.fillStyle='#8EA8BC';c.fillRect(0,Hd*.62,Wd,Hd);
    st.plats.forEach(p=>plank(c,p.x,PY,p.w,24,p.c));stick(c,MX,st.y,st.ph,st.gr?'run':'jump');
    if(S.phase==='LOBBY')atRaf=requestAnimationFrame(frame)};
  atRaf=requestAnimationFrame(frame);
}

/* =====================================================================
   8. CELULAR
   ===================================================================== */
let phoneState='',E=null,gRaf=0,gLast=0,myAv=Math.random()*12|0,lastCnt=0;
const cv=$('#gcv'),gc=cv.getContext('2d');
const urlCode=(new URLSearchParams(location.search).get('s')||'').toUpperCase().trim();
function setLand(on){const ph=$('#phone');if(ph.classList.contains('land')===on)return;ph.classList.toggle('land',on);ph.classList.remove('turn');void ph.offsetWidth;if(!reduce&&ROLE==='all')ph.classList.add('turn')}
function phoneShow(st){
  phoneState=st;
  ['join','wait','late','kicked','results','final'].forEach(k=>$('#pv-'+k).hidden=k!==st);
  const land=['intro','play','over'].includes(st);setLand(land);cv.hidden=!land;
  if(!land)['ov-over','ov-count','ov-go'].forEach(id=>$('#'+id).hidden=true);
  requestAnimationFrame(sizeCanvas);
}
function sizeCanvas(){const r=cv.getBoundingClientRect();const dpr=Math.min(2,devicePixelRatio||1);if(!r.width)return;const w=Math.round(r.width*dpr),h=Math.round(r.height*dpr);if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h}drawG()}
new ResizeObserver(()=>sizeCanvas()).observe($('#ps'));
addEventListener('resize',()=>requestAnimationFrame(sizeCanvas));
function drawG(){gc.setTransform(cv.width/800,0,0,cv.height/400,0,0);if(E)E.render(gc);else{gc.fillStyle='#26364E';gc.fillRect(0,0,800,400)}}

function buildAvGrid(){const g=$('#avGrid');g.innerHTML='';for(let i=0;i<12;i++){const b=document.createElement('button');b.type='button';b.innerHTML=avatarSVG(i);b.setAttribute('aria-pressed',i===myAv);b.setAttribute('aria-label','Avatar '+(i+1));b.addEventListener('click',()=>{myAv=i;g.querySelectorAll('button').forEach((x,j)=>x.setAttribute('aria-pressed',j===i));SFX.ui()});g.append(b)}}
let joining=false;
$('#pv-join').addEventListener('submit',async e=>{
  e.preventDefault();if(joining)return;
  const v=$('#nameIn').value.trim().replace(/\s+/g,' '),code=$('#codeIn').value.trim().toUpperCase(),err=$('#joinErr');
  const fail=k=>{err.textContent=t('err.'+k);SFX.miss()};
  if(!v)return fail('name');if(v.length>20)return fail('long');
  if(MODE==='demo'){
    if(code!==S.code)return fail('code');if(S.phase==='FINAL')return fail('over');if(S.locked)return fail('locked');
    if(S.players.filter(p=>!p.kicked).length>=99)return fail('full');
    if(S.players.some(p=>!p.kicked&&p.name.toLowerCase()===v.toLowerCase()))return fail('dup');
    S.me={id:++uid,name:v,av:myAv,bot:false,res:{},joinedRound:S.phase==='LOBBY'?0:S.round+1};S.players.push(S.me);S.pv++;
  }else{
    joining=true;const j=await api('/api/join',{code,name:v,av:myAv});joining=false;
    if(j.error)return fail(j.error);
    saveMe({code:j.code,id:j.id,token:j.token});myLocal={};joinNote='';S.code=j.code;S.ver=-1;try{history.replaceState(null,'','/jugar?s='+j.code)}catch(e){}await poll(true);
  }
  err.textContent='';SFX.joined();
  tick();
  if(ROLE==='all'&&S.phase==='LOBBY'&&matchMedia('(max-width:1179px)').matches)setTab('admin');
});
$('#rejoin').addEventListener('click',()=>{$('#nameIn').value='';phoneShow('join')});

let DR=null,PE=null,peRaf=0,peLast=0,tutState='';
function stopDemo(){if(DR){DR.stop();DR=null}cancelAnimationFrame(peRaf);PE=null}
function phoneIntro(){
  stopGame();const def=GAME[S.plan[S.round]];if(!def)return;
  phoneShow('intro');tutState='';lastCnt=0;
  $('#ov-over').hidden=true;$('#ov-go').hidden=true;$('#ov-count').hidden=true;
  const tp=tipsOf(def);
  $('#tutRound').textContent=t('round.of',{r:S.round+1,n:S.plan.length});$('#tutName').textContent=tx(def.name);$('#tutChip').innerHTML=catChip(def.category);
  $('#tutIcon').innerHTML=CTRL_IC[def.ctrlIcon||'tap'];$('#tutCtrl').textContent=tp.ctrl;$('#tutPlus').textContent=tp.plus;$('#tutMinus').textContent=tp.minus;
  $('#tutPlus').parentElement.hidden=!tp.plus;$('#tutMinus').parentElement.hidden=!tp.minus;
  updateIntro();
}
function startTut(){const def=GAME[S.plan[S.round]];stopDemo();tutState='tut';$('#tut').hidden=false;$('#practiceBar').hidden=true;$('#demoTag').hidden=false;DR=new DemoRunner(def,cv);updateTutStatus()}
function startPractice(){
  const def=GAME[S.plan[S.round]];stopDemo();tutState='practice';$('#tut').hidden=true;$('#practiceBar').hidden=false;$('#demoTag').hidden=true;
  PE=new Engine(def,def.duration);PE.start();peLast=performance.now();
  const step=ts=>{if(!PE||tutState!=='practice')return;const dt=Math.min(.05,(ts-peLast)/1000);peLast=ts;PE.update(dt);gc.setTransform(cv.width/800,0,0,cv.height/400,0,0);PE.render(gc);if(PE.over){PE=new Engine(def,def.duration);PE.start()}peRaf=requestAnimationFrame(step)};
  peRaf=requestAnimationFrame(step);
}
function enterCount(){
  const def=GAME[S.plan[S.round]];stopDemo();ptrs.clear();tutState='count';$('#tut').hidden=true;$('#practiceBar').hidden=true;$('#demoTag').hidden=true;
  E=new Engine(def,S.dur);requestAnimationFrame(()=>sizeCanvas());
  const box=$('#countBox');$('#ov-count').hidden=false;
  box.innerHTML=`<small>${t('round.of',{r:S.round+1,n:S.plan.length})}</small><h4></h4><div class="count" id="cnum"></div>`;
  box.querySelector('h4').textContent=tx(def.name);lastCnt=0;
}
function updateTutStatus(){
  if(!S.me)return;const rs=readyStats(),left=S.introEnd-now(),mine=S.ready.has(S.me.id);
  $('#tutStatus').textContent=t('tut.status',{a:rs.a,b:rs.b,s:Math.max(0,Math.ceil((left-COUNT_MS)/1000))});
  const rb=$('#tutReady');rb.textContent=mine?t('tut.readyOk'):t('tut.ready');rb.disabled=mine;
}
function updateIntro(){
  if(phoneState!=='intro')return;const left=S.introEnd-now();
  if(left>COUNT_MS){if(!tutState)startTut();else updateTutStatus();return}
  if(tutState!=='count')enterCount();
  const sec=Math.ceil(left/1000),el=$('#cnum');if(!el)return;
  const v=sec>3?t('tut.prep'):sec>0?String(sec):'';
  if(v&&v!==lastCnt){lastCnt=v;el.textContent=v;el.classList.toggle('prep',sec>3);el.style.animation='none';void el.offsetWidth;el.style.animation='';if(sec<=3)SFX.countdown()}
}
$('#tutTry').addEventListener('click',()=>{SFX.ui();startPractice()});
$('#tutBack').addEventListener('click',()=>{SFX.ui();startTut()});
$('#tutReady').addEventListener('click',()=>{
  if(!S.me||S.ready.has(S.me.id))return;S.ready.add(S.me.id);myReadyRound=S.round;SFX.ready();
  if(MODE==='live'){const m=loadMe();if(m)send('/api/ready',{id:m.id,token:m.token,round:S.round})}
  updateTutStatus();
});
function phoneGo(rem){
  if(tutState!=='count'||!E){stopDemo();E=new Engine(GAME[S.plan[S.round]],S.dur)}tutState='';$('#tut').hidden=true;$('#practiceBar').hidden=true;$('#demoTag').hidden=true;
  if(rem)E.g.dur=Math.min(E.g.dur,rem);
  phoneState='play';$('#ov-count').hidden=true;const go=$('#ov-go');go.hidden=false;const gt=$('#goTxt');gt.style.animation='none';void gt.offsetWidth;gt.style.animation='';
  setTimeout(()=>{go.hidden=true},700);SFX.go();
  if(MODE==='live'){const m=loadMe();if(m)send('/api/ticket',{id:m.id,token:m.token,round:S.round})}
  E.start();gLast=performance.now();cancelAnimationFrame(gRaf);gRaf=requestAnimationFrame(loop);
}
function loop(ts){
  if(!E||E.ended)return;const dt=Math.min(.05,(ts-gLast)/1000);gLast=ts;
  E.update(dt);drawG();
  if(E.over){finishGame(false);return}
  gRaf=requestAnimationFrame(loop);
}
function stopGame(){cancelAnimationFrame(gRaf);E=null;ptrs.clear();stopDemo();tutState='';['tut','practiceBar','demoTag'].forEach(id=>{const el=$('#'+id);if(el)el.hidden=true})}
function finishGame(forced){
  if(!E||E.ended||!S.me)return;const r=S.round;E.end();cancelAnimationFrame(gRaf);
  if(!S.me.res[r]){
    const res={raw:E.actions>0?E.getScore():0,acc:E.getAccuracy(),combo:E.getMaxCombo(),dur:E.getDuration(),at:now()};   // sin tocar nada no hay puntos (el servidor lo exige)
    S.me.res[r]=res;myLocal[r]=res;
    if(MODE==='live'){const m=loadMe();if(m)send('/api/result',{id:m.id,token:m.token,round:r,game:S.plan[r],raw:res.raw,acc:res.acc,combo:res.combo,dur:Math.round(res.dur*10)/10,actions:E.actions})}
  }
  ptrs.clear();drawG();
  gc.save();gc.setTransform(cv.width/800,0,0,cv.height/400,0,0);gc.fillStyle='rgba(31,42,58,.55)';gc.fillRect(0,0,800,400);
  txt(gc,t('hud.time')+' 00:00',400,150,18,{align:'center',font:'Press Start 2P',sw:.4});txt(gc,'GAME OVER',400,210,40,{align:'center',font:'Press Start 2P',fill:'#E85A5A',sw:.3});gc.restore();
  SFX.gameover();
  if(!forced){phoneState='over';setTimeout(()=>{if(phoneState==='over'&&S.phase==='PLAY'){$('#ov-over').hidden=false;renderOver(true)}},900)}
}
function phoneShowOver(){if(phoneState==='over'&&!$('#ov-over').hidden)return;stopGame();phoneShow('over');drawG();$('#ov-over').hidden=false;renderOver(true)}
function renderOver(build){
  const r=S.round,def=GAME[S.plan[r]],res=S.me&&S.me.res[r];if(!res||!def)return;
  const rp=roundPoints(r).get(S.me.id),act=S.players.filter(p=>activeIn(p,r)),fin=act.filter(p=>p.res[r]).length;
  const card=$('#overCard');
  if(build||card.dataset.l!==lang){card.dataset.l=lang;
    card.innerHTML=`<div class="go-t">GAME OVER</div><div class="gname"></div>
    <div class="stats"><div><small>${t('over.score')}</small><b id="oS"></b></div><div><small>${t('over.combo')}</small><b id="oC"></b></div><div><small>${t('over.acc')}</small><b id="oA"></b></div><div><small>${t('over.pos')}</small><b id="oP"></b></div><div class="k"><small>${t('over.king')}</small><b id="oK"></b></div></div>
    <div class="note" id="oW"></div>`;
    card.querySelector('.gname').textContent=tx(def.name)}
  $('#oS').textContent=nf(res.raw);$('#oC').textContent='x'+(res.combo||0);$('#oA').textContent=res.acc==null?'—':Math.round(res.acc*100)+'%';
  $('#oP').textContent=rp?'#'+rp.pos:'—';$('#oK').textContent=rp?nf(rp.pts):'0';
  $('#oW').textContent=t('over.wait',{a:fin,b:act.length});
}
function phoneResults(){stopGame();phoneShow('results');$('#pv-results').dataset.h='';renderPhoneResults()}
function renderPhoneResults(){
  const r=S.round,st=standings(),i=st.findIndex(x=>isMe(x.p));if(i<0)return;
  const before=histRanks(r-1),o=before?before.get(S.me.id):null,d=o?o-(i+1):0,rp=roundPoints(r).get(S.me.id);
  const mv=!o?'':d>0?`<span class="mvbadge up">${t('pres.up',{n:d})}</span>`:d<0?`<span class="mvbadge dn">${t('pres.down',{n:-d})}</span>`:`<span class="mvbadge eq">${t('pres.same')}</span>`;
  const s=Math.max(0,Math.ceil((S.resultsEnd-now())/1000));
  const html=`<h3>${esc(t('pres.title',{r:r+1}))}</h3>${rp?`<p>${t('pres.round')}</p><div class="rank-big">#${rp.pos}</div><p>+${nf(rp.pts)} King Score</p>`:`<p>${t('pres.miss')}</p>`}
    ${mv}<div class="box"><span>${t('pres.overall',{n:i+1,p:nf(st[i].tot)})}</span></div><p style="font-size:13px">${S.auto?t('pres.next',{s}):t('pres.wait')}</p>`;
  const el=$('#pv-results');if(el.dataset.h!==html){el.dataset.h=html;el.innerHTML=html}
}
function achievements(st){
  const me=S.me,i=st.findIndex(x=>isMe(x.p)),N=st.length;
  const played=Object.keys(me.res).length,perfect=Object.values(me.res).some(r=>r.acc===1);
  const ranks=[];for(let r=0;r<=S.round;r++){const h=histRanks(r);if(h&&h.get(me.id))ranks.push(h.get(me.id))}
  let climb=0;for(let a=0;a<ranks.length;a++)for(let b=a+1;b<ranks.length;b++)climb=Math.max(climb,ranks[a]-ranks[b]);
  const need=Math.min(20,Math.max(3,Math.ceil(N/4)));
  const rounds=S.round+1;let cons=rounds>=2;for(let r=0;r<rounds;r++){const m=roundPoints(r).get(me.id);if(!m||m.pos>10)cons=false}
  return[['first',played>0],['perfect',perfect],['comeback',climb>=need,{n:need}],['consistent',cons],['king',i===0&&st[0].tot>0]];
}
function phoneFinal(){
  stopGame();phoneShow('final');
  const st=standings(),i=st.findIndex(x=>isMe(x.p)),x=st[i],f=$('#pv-final');
  if(!x){f.innerHTML=`<h3>${esc(t('final.done'))}</h3>`;return}
  const king=i===0&&x.tot>0,cp=catPerf(S.me);
  const games=S.plan.slice(0,S.round+1).map((id,r)=>`<span>${esc(tx(GAME[id].name))}</span><b>${x.per[r]?nf(x.per[r].pts):'0'}</b>`).join('');
  const cats=Object.entries(cp).map(([c,v])=>`<div class="cbar"><span>${esc(tx(CATS[c]))}</span><div class="tr"><div class="fl" style="width:${v/10}%;background:${CATS[c].c}"></div></div><b>${nf(v)}</b></div>`).join('');
  const ach=achievements(st).map(([k,ok,v])=>`<div class="ach${ok?'':' off'}"><svg aria-hidden="true"><use href="#medal"/></svg><div><b>${esc(t('ach.'+k))}</b><small>${esc(t('ach.'+k+'.d',v))}</small></div></div>`).join('');
  f.innerHTML=`${king?'<div class="king-me"><svg viewBox="0 0 64 50" aria-hidden="true"><use href="#crown"/></svg></div>':''}
    <h3>${esc(t(king?'final.king':'final.done'))}</h3><div class="rank-big">#${i+1}</div><p>${esc(t('final.of',{n:st.length,p:nf(x.tot)}))}</p>
    <div class="box"><h5>${t('final.games')}</h5><div class="kv">${games}${x.bonus?`<span>Bonus</span><b>${nf(x.bonus)}</b>`:''}<span class="t">${t('final.total')}</span><b class="t">${nf(x.tot)}</b></div></div>
    <div class="box"><h5>${t('final.cats')}</h5>${cats}</div>
    <div class="box"><h5>${t('final.ach')}</h5><div class="achs">${ach}</div></div>`;
}
/* entrada del juego */
const ptrs=new Map();
function toLogical(e){const r=cv.getBoundingClientRect();return[(e.clientX-r.left)/r.width*800,(e.clientY-r.top)/r.height*400]}
const inTarget=()=>phoneState==='play'?E:(phoneState==='intro'&&tutState==='practice'?PE:null);
cv.addEventListener('pointerdown',e=>{const T=inTarget();if(!T)return;e.preventDefault();cv.setPointerCapture?.(e.pointerId);const[x,y]=toLogical(e);ptrs.set(e.pointerId,1);T.handleInput('down',x,y,e.pointerId)});
cv.addEventListener('pointermove',e=>{const T=inTarget();if(!T||!ptrs.has(e.pointerId))return;const[x,y]=toLogical(e);T.handleInput('move',x,y,e.pointerId)});
const up=e=>{if(!ptrs.has(e.pointerId))return;ptrs.delete(e.pointerId);const[x,y]=toLogical(e);const T=inTarget();T&&T.handleInput('up',x,y,e.pointerId)};
cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
cv.addEventListener('contextmenu',e=>e.preventDefault());
const GK=['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Enter','Backspace','KeyA','KeyD','KeyW','KeyS','KeyQ','KeyE','KeyR','Digit1','Digit2','Digit3','Digit4','Digit5','Digit6'];
addEventListener('keydown',e=>{const T=inTarget();if(!T||!GK.includes(e.code))return;if(/INPUT|TEXTAREA|BUTTON/.test(e.target.tagName))return;e.preventDefault();if(e.repeat&&e.code!=='Space')return;T.handleInput('key',e.code,true)});
addEventListener('keyup',e=>{const T=inTarget();if(!T||!GK.includes(e.code))return;T.handleInput('key',e.code,false)});
$('#fullBtn').addEventListener('click',async()=>{try{await document.documentElement.requestFullscreen();await screen.orientation.lock('landscape')}catch(e){}});

/* =====================================================================
   9. ADMINISTRADOR
   ===================================================================== */
let confirmAct=null,builtGv=-1,builtPv=-1,builtLang='';
function renderAdmin(){
  const st=$('#aState');st.dataset.s=S.phase;st.lastElementChild.textContent=t('phase.'+S.phase);
  $('#aCode').textContent=S.code;
  const conn=S.players.filter(p=>!p.kicked).length,r=S.round,def=r>=0?GAME[S.plan[r]]:null;
  $('#dConn').textContent=conn+' / 99';
  const act=r>=0?S.players.filter(p=>activeIn(p,r)):[];
  $('#dActL').textContent=S.phase==='INTRO'?t('dash.ready'):t('dash.active');
  if(S.phase==='INTRO'){const rs=readyStats();$('#dAct').textContent=rs.a+' / '+rs.b}else $('#dAct').textContent=r>=0&&S.phase!=='FINAL'?act.filter(p=>p.res[r]).length+' / '+act.length:'—';
  $('#dRound').textContent=r>=0?(r+1)+' / '+S.plan.length:'—';
  $('#dTime').textContent=S.phase==='PLAY'?mmss((S.playEnd-1800-now())/1000):S.phase==='RESULTS'&&S.auto?mmss((S.resultsEnd-now())/1000):S.phase==='INTRO'?mmss((S.introEnd-now())/1000):'—';
  $('#dGame').textContent=def?tx(def.name):'—';
  const stn=standings();$('#dLead').textContent=stn[0]&&stn[0].tot>0?stn[0].p.name+' · '+nf(stn[0].tot):'—';
  $('#aStart').disabled=S.phase!=='LOBBY'||!conn;
  const nx=$('#aNext');nx.disabled=!(S.phase==='PLAY'||S.phase==='RESULTS'||(S.phase==='INTRO'&&S.introEnd-now()>COUNT_MS));
  nx.textContent=S.phase==='INTRO'?t('btn.skip'):S.phase==='PLAY'?t('btn.close'):S.phase==='RESULTS'&&r+1>=S.plan.length?t('btn.finalres'):t('btn.next');
  $('#aPause').textContent=S.auto?t('btn.pause'):t('btn.resume');$('#aPause').setAttribute('aria-pressed',!S.auto);
  $('#aEnd').disabled=!(S.phase==='INTRO'||S.phase==='PLAY'||S.phase==='RESULTS');
  $('#aLock').textContent=S.locked?t('btn.unlock'):t('btn.lock');
  const mr=stn.slice(0,5).filter(x=>x.tot>0).map((x,i)=>`<b>#${i+1}</b>${avatarSVG(x.p.av)}<span class="n">${esc(x.p.name)}</span><b>${nf(x.tot)}</b>`).join('');
  if($('#miniRank').dataset.h!==mr){$('#miniRank').dataset.h=mr;$('#miniRank').innerHTML=mr}
  const lobby=S.phase==='LOBBY';
  $('#lockHint').hidden=lobby;
  ['#evIn','#roundsIn','#drawBtn'].forEach(s=>$(s).disabled=!lobby);
  document.querySelectorAll('#modeSeg button,#durSeg button,#introSeg button').forEach(b=>b.disabled=!lobby);
  $('#roundsLbl').textContent=t('g.rounds',{n:S.rounds});$('#roundsSet').hidden=S.mode==='manual';$('#drawBtn').hidden=S.mode==='manual';
  if(builtGv!==S.gv||builtLang!==lang){builtGv=S.gv;buildGames()}
  if(builtPv!==S.pv||builtLang!==lang){builtPv=S.pv;buildPlayers()}
  const nb=MODE==='live'&&Date.now()>botWait?S.players.filter(p=>p.bot&&!p.kicked).length:S.botTarget;
  $('#botsLbl').textContent=t(MODE==='live'?'p.botsLive':'p.bots',{n:nb});if(MODE==='live'&&Date.now()>botWait)$('#bots').value=nb;$('#bots').disabled=!lobby;
  if(MODE==='live'){const join=location.origin+'/jugar?s='+S.code;$('#lkJoin').textContent=join;$('#lkScreen').textContent=location.origin+'/pantalla?s='+S.code}
  builtLang=lang;
}
function syncAdminInputs(){
  if(!HAS.admin)return;if(document.activeElement!==$('#evIn'))$('#evIn').value=S.event;
  $('#roundsIn').value=S.rounds;
  document.querySelectorAll('#modeSeg button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.m===S.mode));
  document.querySelectorAll('#durSeg button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.d===String(S.durMode)));
  document.querySelectorAll('#introSeg button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.i===String(S.introSec)));
}
function buildGames(){
  const lobby=S.phase==='LOBBY',man=S.mode==='manual';
  $('#glistHint').textContent=t(man?'g.hintManual':'g.hintRandom');
  const plan=man?S.manual:S.plan;
  $('#planBox').innerHTML=plan.length?plan.map((id,i)=>GAME[id]?`<span class="pc"><b>${i+1}</b>${esc(tx(GAME[id].name))}</span>`:'').join(''):`<span class="hint">${t(man?'g.planManual':'g.planEmpty')}</span>`;
  const gl=$('#glist'),sc=gl.scrollTop;gl.innerHTML='';
  REG.forEach(d=>{
    const row=document.createElement('div');row.className='gi';
    row.innerHTML=`<span class="ic">${d.icon}</span><span class="tx"><b></b><small>${catChip(d.category)}<span>${t('sec',{n:d.duration})} · ${t('g.phase',{n:d.phase||1})}</span></small></span><span class="ctl"></span>`;
    row.querySelector('b').textContent=tx(d.name);
    const ctl=row.querySelector('.ctl');
    if(man){const oi=S.manual.indexOf(d.id),b=document.createElement('button');b.className='ord';b.type='button';b.textContent=oi>=0?oi+1:'+';b.setAttribute('aria-pressed',oi>=0);b.setAttribute('aria-label',t('g.order')+': '+tx(d.name));b.disabled=!lobby||!d.enabled;b.dataset.id=d.id;
      b.addEventListener('click',()=>{const k=S.manual.indexOf(d.id);if(k>=0)S.manual.splice(k,1);else S.manual.push(d.id);S.plan=[...S.manual];S.gv++;SFX.ui();pushConfig();renderAdmin();$(`#glist .ord[data-id="${d.id}"]`)?.focus({preventScroll:true})});ctl.append(b)}
    const sw=document.createElement('label');sw.className='sw';sw.innerHTML=`<input type="checkbox" ${d.enabled?'checked':''} ${lobby?'':'disabled'} aria-label="${esc(t('g.on')+': '+tx(d.name))}"><span></span>`;
    sw.querySelector('input').addEventListener('change',e=>{d.enabled=e.target.checked;if(!d.enabled){S.manual=S.manual.filter(x=>x!==d.id);S.plan=S.plan.filter(x=>x!==d.id)}S.gv++;pushConfig();renderAdmin()});
    ctl.append(sw);gl.append(row);
  });
  gl.scrollTop=sc;
}
function buildPlayers(){
  const pl=$('#plist'),list=S.players.filter(p=>!p.kicked);
  if(!list.length){pl.innerHTML=`<p class="hint">${t('p.empty')}</p>`;return}
  pl.innerHTML='';
  list.slice().reverse().forEach(p=>{const row=document.createElement('div');row.className='pl';row.innerHTML=avatarSVG(p.av)+'<span></span><button type="button"></button>';
    row.querySelector('span').textContent=p.name+(isMe(p)?' ('+t('p.you')+')':p.bot&&MODE==='live'?' · bot':'');const b=row.querySelector('button');b.textContent=t('p.kick');
    b.addEventListener('click',()=>adminAct('kick',{pid:p.id}));pl.append(row)});
}
function askConfirm(msg,yes,act){$('#aConfirmTxt').textContent=msg;$('#aYes').textContent=yes;confirmAct=act;$('#aConfirm').hidden=false;$('#aYes').focus()}
$('#aStart').addEventListener('click',()=>adminAct('start'));
$('#aNext').addEventListener('click',()=>adminAct('next'));
$('#aPause').addEventListener('click',()=>adminAct('pause'));
$('#aEnd').addEventListener('click',()=>askConfirm(t('confirm.end'),t('confirm.endYes'),()=>adminAct('end')));
$('#aClose').addEventListener('click',()=>askConfirm(t('confirm.close'),t('confirm.closeYes'),async()=>{if(MODE==='demo'){adminAct('reset');return}const j=await adminAct('close');if(j&&j.ok){store.set('ko-host','null');location.replace('/')}}));
$('#aReset').addEventListener('click',()=>{const n=S.players.filter(p=>!p.kicked).length;askConfirm(t('confirm.reset',{n}),t('confirm.resetYes'),()=>adminAct('reset'))});
$('#aLock').addEventListener('click',()=>{SFX.ui();adminAct('lock')});
$('#aNo').addEventListener('click',()=>{$('#aConfirm').hidden=true;confirmAct=null});
$('#aYes').addEventListener('click',()=>{$('#aConfirm').hidden=true;const a=confirmAct;confirmAct=null;a&&a()});
$('#evIn').addEventListener('input',e=>{S.event=e.target.value.trim();pushConfig();render()});
document.querySelectorAll('#modeSeg button').forEach(b=>b.addEventListener('click',()=>{S.mode=b.dataset.m;syncAdminInputs();S.plan=S.mode==='manual'?[...S.manual]:[];S.gv++;pushConfig();renderAdmin()}));
document.querySelectorAll('#durSeg button').forEach(b=>b.addEventListener('click',()=>{S.durMode=b.dataset.d;syncAdminInputs();pushConfig()}));
document.querySelectorAll('#introSeg button').forEach(b=>b.addEventListener('click',()=>{S.introSec=+b.dataset.i;syncAdminInputs();pushConfig()}));
$('#roundsIn').addEventListener('input',e=>{S.rounds=+e.target.value;if(S.mode==='random'){S.plan=[];S.gv++}pushConfig();renderAdmin()});
$('#drawBtn').addEventListener('click',()=>{S.plan=drawPlan();S.gv++;SFX.levelup();pushConfig();renderAdmin()});
let botWait=0;
$('#bots').addEventListener('input',e=>{S.botTarget=+e.target.value;
  if(MODE==='demo'){if(S.phase==='LOBBY'){let bots=S.players.filter(p=>p.bot&&!p.kicked);while(bots.length>S.botTarget){const p=bots.pop();S.players.splice(S.players.indexOf(p),1)}S.pv++}render();return}
  botWait=Date.now()+4000;$('#botsLbl').textContent=t('p.botsLive',{n:S.botTarget});clearTimeout(botTimer);botTimer=setTimeout(()=>adminAct('bots',{n:S.botTarget}),450)});
document.querySelectorAll('.atabs button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.atabs button').forEach(x=>x.setAttribute('aria-selected',x===b));['control','games','players','music'].forEach(k=>$('#ap-'+k).hidden=k!==b.dataset.at)}));
$('#aCsv').addEventListener('click',async()=>{
  const st=standings(),games=S.plan.slice(0,Math.max(0,S.round+1));
  const head=['posicion','nombre','avatar',...games.flatMap(id=>[id+'_raw',id+'_acc',id+'_king']),'bonus','king_score'];
  const rows=st.map((x,i)=>[i+1,'"'+x.p.name.replace(/"/g,'""')+'"',x.p.av,...games.flatMap((id,r)=>{const res=x.p.res[r];return[res?res.raw:'',res&&res.acc!=null?Math.round(res.acc*100):'',x.per[r]?x.per[r].pts:0]}),x.bonus,x.tot].join(','));
  const csv=[head.join(','),...rows].join('\n'),box=$('#csvBox');box.value=csv;
  try{await navigator.clipboard.writeText(csv);$('#aCsv').textContent=t('csv.ok');box.hidden=true}
  catch(e){box.hidden=false;box.select();$('#aCsv').textContent=t('csv.sel')}
  setTimeout(()=>$('#aCsv').textContent=t('btn.csv'),2200);
});
document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{const el=$(b.dataset.copy);try{await navigator.clipboard.writeText(el.textContent);b.textContent=t('links.copied');setTimeout(()=>b.textContent=t('links.copy'),1500)}catch(e){const r=document.createRange();r.selectNodeContents(el);const s=getSelection();s.removeAllRanges();s.addRange(r)}}));
$('#lkOpen').addEventListener('click',()=>{const a=document.createElement('a');a.href='/pantalla?s='+encodeURIComponent(S.code);a.target='_blank';a.rel='noopener';a.click()});
$('#lkFull').addEventListener('click',()=>{const tv=$('.tv');try{(tv.requestFullscreen||tv.webkitRequestFullscreen).call(tv)}catch(e){}});
/* Inicio: crear sala o unirse (solo en vivo) */
const normCode=v=>{v=String(v||'').toUpperCase().replace(/[^A-Z0-9]/g,'');if(v.startsWith('KO'))v=v.slice(2);return v?'KO-'+v.slice(0,5):''};
$('#homeJoin').addEventListener('submit',async e=>{
  e.preventDefault();const c=normCode($('#homeCode').value),err=$('#homeJoinErr');
  if(!c){err.textContent=t('err.nocode');return}
  const j=await api('/api/state?code='+encodeURIComponent(c)+'&v=-2');
  if(j.error){err.textContent=t(j.error==='net'?'err.net':'err.code');SFX.miss();return}
  location.href='/jugar?s='+encodeURIComponent(c);
});
let creating=false;
$('#homeHost').addEventListener('submit',async e=>{
  e.preventDefault();if(creating)return;creating=true;
  const j=await api('/api/create',{event:$('#homeEvent').value.trim()});creating=false;
  if(j.error){$('#homeHostErr').textContent=t(j.error==='net'?'err.net':'err.generic');return}
  store.set('ko-host',JSON.stringify({code:j.code,key:j.key}));location.href='/host';
});
$('#homeBack').addEventListener('click',()=>{location.href='/host'});
$('#lkNew').addEventListener('click',()=>{location.href='/'});

/* =====================================================================
   10. RENDER GENERAL, IDIOMA, PESTAÑAS, QR, INICIO
   ===================================================================== */
function render(force){
  $('#st1').classList.toggle('on',!!S.me);
  $('#st2').classList.toggle('on',S.phase!=='LOBBY');
  $('#st3').classList.toggle('on',!!S.me&&Object.keys(S.me.res).length>0);
  $('#st4').classList.toggle('on',S.phase==='FINAL');
  if(HAS.screen)renderTV(force);
  if(HAS.admin)renderAdmin();
  if(HAS.phone&&S.me){
    if(phoneState==='wait')$('#waitCount').textContent=t('wait.count',{n:S.players.filter(p=>!p.kicked).length});
    if(phoneState==='intro')updateIntro();
    if(phoneState==='over'&&!$('#ov-over').hidden)renderOver(false);
    if(phoneState==='results')renderPhoneResults();
    if(phoneState==='final'&&lang!==lastLang)phoneFinal();
  }
  lastLang=lang;
}
function applyLang(){
  document.documentElement.lang=lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));
  document.querySelectorAll('[data-i18n-aria]').forEach(el=>el.setAttribute('aria-label',t(el.dataset.i18nAria)));
  $('#demoNote').innerHTML=t('demo');$('#demoNote').hidden=MODE!=='demo';
  document.querySelectorAll('.mute-btn').forEach(b=>b.setAttribute('aria-label',muted?t('unmute'):t('mute')));
  document.querySelectorAll('.lang-seg button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.l===lang));
  if(S.me)$('#hello').textContent=t('wait.hello',{name:S.me.name});
  boards.forEach(b=>b.map.forEach(el=>{const nm=el.querySelector('.nm');if(nm)nm.dataset.k=''}));
  if(phoneState==='intro'&&E){const def=GAME[S.plan[S.round]],box=$('#countBox');box.querySelector('small').textContent=t('round.of',{r:S.round+1,n:S.plan.length});box.querySelector('h4').textContent=tx(def.name);box.querySelector('p').textContent=tx(def.desc);box.querySelector('.catchip').outerHTML=catChip(def.category)}
  if(phoneState==='results')$('#pv-results').dataset.h='';
  if(S.phase==='FINAL'&&HAS.screen)buildFinal();
  render(true);
  if(E&&E.ended)drawG();
}
document.querySelectorAll('.lang-seg button').forEach(b=>b.addEventListener('click',()=>{lang=b.dataset.l;store.set('ko-lang',lang);applyLang()}));
document.querySelectorAll('.mute-btn').forEach(m=>m.addEventListener('click',()=>{muted=!muted;document.querySelectorAll('.mute-btn').forEach(x=>{x.setAttribute('aria-pressed',muted);x.setAttribute('aria-label',muted?t('unmute'):t('mute'));const w=x.querySelector('.waves');if(w)w.style.opacity=muted?0:1})}));
$('#tvFull').addEventListener('click',()=>{try{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}catch(e){}});

function setTab(tb){document.body.dataset.tab=tb;document.querySelectorAll('.tabs button').forEach(b=>b.setAttribute('aria-selected',b.dataset.tab===tb));requestAnimationFrame(sizeCanvas)}
document.querySelectorAll('.tabs button').forEach(b=>b.addEventListener('click',()=>setTab(b.dataset.tab)));
setTab(ROLE==='all'?'phone':ROLE==='host'?'admin':ROLE);
$('#scanBtn').addEventListener('click',()=>{
  if(MODE!=='demo')return;
  if(matchMedia('(max-width:1179px)').matches)setTab('phone');
  if(phoneState==='join'||phoneState==='kicked'){phoneShow('join');$('#codeIn').value=S.code;$('#nameIn').focus({preventScroll:true});$('#phone').scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});SFX.ui()}
});
$('#scanBtn').hidden=MODE!=='demo';
function makeQR(){
  if(!HAS.screen)return;const box=$('#qr');box.innerHTML='';
  const url=(MODE==='live'?location.origin:'https://king-office.workers.dev')+'/jugar?s='+S.code;
  $('#qrUrl').textContent=MODE==='live'?location.host:'king-office.workers.dev';
  try{new QRCode(box,{text:url,width:256,height:256,colorDark:INK,colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.M})}
  catch(e){box.innerHTML='<div style="font-weight:900;font-size:1.6cqw;text-align:center">QR</div>'}
}
let toolT=0;addEventListener('mousemove',()=>{if(ROLE!=='screen')return;document.body.classList.add('show-tools');clearTimeout(toolT);toolT=setTimeout(()=>document.body.classList.remove('show-tools'),2500)});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)poll(true)});

/* ---------- inicio ---------- */
if(MODE==='demo'){S.event=lang==='es'?'Torneo de octubre':'October tournament';$('#evIn').value=S.event;S.nextJoin=Date.now()+800}
else{
  $('#liveLinks').hidden=false;
  if(ROLE==='home'){$('#home').hidden=false;
    if(HOST&&HOST.code)api('/api/state?code='+encodeURIComponent(HOST.code)+'&v=-2').then(j=>{if(!j.error){const b=$('#homeBack');b.hidden=false;b.textContent=t('home.back',{c:HOST.code})}});
    const qc=normCode(QS.get('c'));if(qc)$('#homeCode').value=qc}
  else if(ROLE==='host'){if(!HOST||!HOST.code)location.replace('/');else S.code=HOST.code}
  else if(ROLE==='screen'){S.code=normCode(QS.get('s'));if(!S.code)location.replace('/')}
  else if(ROLE==='phone'){const m=loadMe();if(m&&urlCode&&m.code!==urlCode){clearMe()}const m2=loadMe();if(m2&&m2.code)S.code=m2.code}
}
if(urlCode)$('#codeIn').value=urlCode;
buildAvGrid();applyLang();
if(HAS.phone)phoneShow(MODE==='demo'?'join':'join');
if(MODE==='live')poll(true);
setInterval(tick,250);
window.KO_DEBUG={REG,GAME,Engine,S};
