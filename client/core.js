
"use strict";
/* =====================================================================
   0. UTILIDADES, IDIOMA Y SONIDO
   ===================================================================== */
const $=s=>document.querySelector(s);
const INK='#1F2A3A', PLANK=['#FFD23F','#2FA8E8','#5BCB4A','#FF7A2F'];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const rand=(a,b)=>a+Math.random()*(b-a);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const mmss=s=>{s=Math.max(0,Math.ceil(s));return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')};
const comboMult=n=>n>=10?4:n>=5?3:n>=3?2:1;
const store={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};

const L={
es:{
 'sub':'Torneo de minijuegos para la oficina','steps.aria':'Cómo probar la demo',
 'step1':'Únete desde el celular','step2':'Inicia el torneo en Admin','step3':'Juega cada ronda','step4':'Corona al rey',
 'tab.screen':'Pantalla','tab.phone':'Celular','tab.admin':'Admin',
 'zone.screen':'Pantalla grande (proyector o TV)','zone.phone':'Celular de un participante','zone.admin':'Panel del administrador',
 'mute':'Silenciar sonidos','unmute':'Activar sonidos',
 'lobby.scan':'Simular escaneo','lobby.session':'SESIÓN','lobby.sub':'Escanea el código y compite por la corona',
 'lobby.joined':'/ 99 jugadores conectados','lobby.locked':'Sala cerrada',
 'round.of':'RONDA {r} DE {n}','intro.play':'Juega en tu celular',
 'live.title':'¿Quién será el rey de la oficina?','live.live':'En vivo','live.done':'{a} de {b} terminaron',
 'live.empty':'Todos están jugando. Aquí aparecen los primeros puntajes.','live.mine':'Tú vas en el lugar #{n} con {p} puntos',
 'toast.up':'{name} SUBE AL #{n}',
 'res.title':'Ronda {r}: {g}','res.best':'Mejor de la ronda: {name}','res.next':'SIGUIENTE RONDA EN {s}','res.wait':'ESPERANDO AL ADMINISTRADOR','res.final':'RESULTADOS FINALES EN {s}',
 'fin.podium':'Podio','fin.top':'Top 10','fin.cats':'Categorías','fin.king':'Rey','fin.title':'Resultados finales','fin.top10':'Top 10 del torneo','fin.catsTitle':'Mejores por categoría',
 'fin.kingof':'REY DE LA OFICINA','fin.none':'Nadie jugó este torneo','fin.h.cat':'CATEGORÍA','fin.h.best':'MEJOR JUGADOR','fin.h.avg':'PROMEDIO',
 'join.title':'¡Únete al torneo!','f.code':'Código de sesión','f.name':'Tu nombre','f.avatar':'Elige tu avatar','f.enter':'Entrar',
 'err.name':'Escribe tu nombre para entrar.','err.long':'Usa 20 caracteres o menos.','err.code':'Ese código no existe. Revisa el código en la pantalla grande.',
 'err.locked':'La sala está cerrada. Pide al administrador que la abra.','err.full':'La sala está llena (99 personas).','err.dup':'Ese nombre ya está en la sala. Agrega tu inicial.','err.over':'El torneo ya terminó. Espera la próxima sala.',
 'wait.hello':'Hola, {name}','wait.text':'Esperando al administrador…','wait.count':'{n} / 99 CONECTADOS','wait.tip':'Cada ronda es un juego distinto. Gira tu teléfono cuando empiece.',
 'late.title':'Entras en la siguiente ronda','late.text':'El torneo ya está en curso. Esta pantalla cambia sola cuando empiece la próxima ronda.',
 'kicked.title':'Saliste de la sala','kicked.text':'El administrador te quitó de la sala.','kicked.btn':'Volver a unirme',
 'over.score':'PUNTOS','over.combo':'COMBO MÁX.','over.acc':'PRECISIÓN','over.pos':'POSICIÓN','over.king':'KING SCORE',
 'over.wait':'Esperando a los demás: {a} de {b} terminaron','over.note':'Tu King Score de la ronda depende de tu posición y de qué tan cerca quedaste del mejor.',
 'pres.title':'Ronda {r} terminada','pres.round':'En esta ronda quedaste','pres.overall':'En el torneo vas #{n} con {p} puntos',
 'pres.up':'▲ SUBISTE {n}','pres.down':'▼ BAJASTE {n}','pres.same':'SIN CAMBIOS','pres.next':'Siguiente ronda en {s} s','pres.wait':'El administrador iniciará la siguiente ronda.','pres.miss':'No jugaste esta ronda.',
 'final.king':'¡Eres el rey de la oficina!','final.done':'Torneo terminado','final.of':'de {n} participantes · {p} puntos',
 'final.games':'TUS JUEGOS','final.cats':'RENDIMIENTO POR CATEGORÍA','final.ach':'LOGROS','final.total':'King Score',
 'ach.first':'Primer juego','ach.first.d':'Completaste tu primer juego','ach.perfect':'Perfecto','ach.perfect.d':'100% de precisión en un juego',
 'ach.comeback':'Remontada','ach.comeback.d':'Subiste {n} posiciones o más','ach.consistent':'Constante','ach.consistent.d':'Top 10 en todas las rondas',
 'ach.king':'Rey de la oficina','ach.king.d':'Ganaste el torneo',
 'hud.score':'PUNTOS','hud.lives':'VIDAS','hud.time':'TIEMPO','hud.dist':'DISTANCIA','hud.combo':'COMBO',
 'tab.hint':'Toca para saltar','globo.inflate':'INFLAR','globo.tie':'ATAR','globo.pressure':'PRESIÓN','globo.air':'AIRE','globo.balloons':'GLOBOS',
 'globo.perfect':'¡Globo perfecto!','globo.pop':'¡PUM! Se fue ese globo','globo.gold':'GLOBO DORADO x2','globo.small':'GLOBO PEQUEÑO','globo.big':'GLOBO GRANDE',
 'avion.hint1':'Mantén presionado para volar','avion.hint2':'Suelta para bajar','avion.crash':'¡Hasta ahí llegó!',
 'car.brake':'FRENO','car.off':'¡FUERA DEL CAMINO!',
 'roach.splat':'¡PLAF!','quick.fake':'FALSO','quick.miss':'MISS',
 'mem.watch':'MIRA LA SECUENCIA','mem.turn':'TU TURNO','mem.len':'SECUENCIA: {n}','mem.fail':'¡Fallaste!','mem.ok':'¡Bien!',
 'snake.hint':'Desliza o toca un lado para girar','snake.crash':'¡Chocaste!',
 'brick.launch':'Toca para lanzar','brick.clear':'¡Muro limpio! +200','brick.multi':'MULTIBOLA','brick.fast':'VELOCIDAD','brick.lost':'¡Se fue la pelota!',
 'red.hint':'Toca solo los verdes','red.clear':'¡Ronda limpia!','red.timeout':'¡Tiempo!','red.bad':'¡ROJO! -500',
 'ad.title':'Torneo','ad.tab.control':'Control','ad.tab.games':'Juegos','ad.tab.players':'Jugadores',
 'phase.LOBBY':'Sala de espera','phase.INTRO':'Presentando juego','phase.PLAY':'En juego','phase.RESULTS':'Ranking de ronda','phase.FINAL':'Terminado',
 'dash.connected':'Conectados','dash.active':'Terminaron la ronda','dash.round':'Ronda','dash.time':'Tiempo restante','dash.game':'Juego actual','dash.leader':'Líder',
 'btn.start':'Iniciar torneo','btn.next':'Siguiente ronda','btn.close':'Cerrar ronda','btn.finalres':'Ver final','btn.pause':'Pausar avance','btn.resume':'Reanudar avance',
 'btn.end':'Terminar torneo','btn.reset':'Reiniciar sala','btn.lock':'Bloquear sala','btn.unlock':'Abrir sala','btn.csv':'Copiar resultados (CSV)','csv.ok':'Copiado al portapapeles','csv.sel':'Selecciona y copia el texto',
 'confirm.reset':'Se borrarán {n} jugadores y sus puntajes. Se crea una sesión nueva y la pantalla vuelve al QR.','confirm.resetYes':'Borrar y reiniciar',
 'confirm.end':'El torneo termina ahora y se muestran los resultados con las rondas jugadas.','confirm.endYes':'Terminar ahora','confirm.no':'Cancelar',
 'g.event':'Nombre del evento','g.mode':'Modo','mode.random':'Aleatorio','mode.manual':'Manual','g.rounds':'Rondas: {n}','g.dur':'Duración por juego','dur.game':'Según juego',
 'g.draw':'Sortear juegos','g.plan':'Orden del torneo','g.planEmpty':'Toca "Sortear juegos" o se sortean al iniciar.','g.planManual':'Toca los números de la lista para armar el orden.',
 'g.hintRandom':'Desactiva los juegos que no quieras en el sorteo. El sorteo no repite juegos y mezcla categorías.','g.hintManual':'Toca el cuadro de número de cada juego en el orden en que quieres jugarlos.',
 'g.soon':'Próximamente · Fase {n}','g.locked':'Estos ajustes se cambian en la sala de espera.','g.on':'Activar','g.order':'Orden',
 'p.bots':'Compañeros simulados: {n}','p.kick':'Expulsar','p.you':'tú','p.empty':'Nadie se ha unido todavía.',
 'demo':'<b>Esto es una demo.</b> Los compañeros son simulados en tu navegador para que veas la tabla moverse. En la versión real cada persona juega en su celular y el servidor de Cloudflare guarda nombre, avatar y puntaje.',
 'tag.you':'Tú','tag.king':'REY','units.pts':'pts','units.m':'m','units.cc':'cc','sec':'{n} s'
},
en:{
 'sub':'Office minigame tournament','steps.aria':'How to try the demo',
 'step1':'Join from the phone','step2':'Start in Admin','step3':'Play each round','step4':'Crown the king',
 'tab.screen':'Screen','tab.phone':'Phone','tab.admin':'Admin',
 'zone.screen':'Big screen (projector or TV)','zone.phone':'Player phone','zone.admin':'Host panel',
 'mute':'Mute sounds','unmute':'Turn sounds on',
 'lobby.scan':'Simulate scan','lobby.session':'SESSION','lobby.sub':'Scan the code and compete for the crown',
 'lobby.joined':'/ 99 players connected','lobby.locked':'Room locked',
 'round.of':'ROUND {r} OF {n}','intro.play':'Play on your phone',
 'live.title':'Who will be King of the Office?','live.live':'Live','live.done':'{a} of {b} finished',
 'live.empty':'Everyone is playing. First scores will show up here.','live.mine':'You are #{n} with {p} points',
 'toast.up':'{name} MOVES UP TO #{n}',
 'res.title':'Round {r}: {g}','res.best':'Round MVP: {name}','res.next':'NEXT ROUND IN {s}','res.wait':'WAITING FOR THE HOST','res.final':'FINAL RESULTS IN {s}',
 'fin.podium':'Podium','fin.top':'Top 10','fin.cats':'Categories','fin.king':'King','fin.title':'Final results','fin.top10':'Tournament top 10','fin.catsTitle':'Best by category',
 'fin.kingof':'KING OF THE OFFICE','fin.none':'Nobody played this tournament','fin.h.cat':'CATEGORY','fin.h.best':'BEST PLAYER','fin.h.avg':'AVERAGE',
 'join.title':'Join the tournament!','f.code':'Session code','f.name':'Your name','f.avatar':'Pick your avatar','f.enter':'Join',
 'err.name':'Type your name to join.','err.long':'Use 20 characters or fewer.','err.code':'That code does not exist. Check the code on the big screen.',
 'err.locked':'The room is locked. Ask the host to open it.','err.full':'The room is full (99 players).','err.dup':'That name is taken. Add your initial.','err.over':'The tournament is over. Wait for the next room.',
 'wait.hello':'Hi, {name}','wait.text':'Waiting for the host…','wait.count':'{n} / 99 CONNECTED','wait.tip':'Each round is a different game. Turn your phone sideways when it starts.',
 'late.title':'You join next round','late.text':'The tournament is already running. This screen updates by itself when the next round starts.',
 'kicked.title':'You left the room','kicked.text':'The host removed you from the room.','kicked.btn':'Join again',
 'over.score':'SCORE','over.combo':'MAX COMBO','over.acc':'ACCURACY','over.pos':'POSITION','over.king':'KING SCORE',
 'over.wait':'Waiting for others: {a} of {b} finished','over.note':'Your round King Score depends on your position and how close you got to the best.',
 'pres.title':'Round {r} complete','pres.round':'This round you placed','pres.overall':'Overall you are #{n} with {p} points',
 'pres.up':'▲ UP {n}','pres.down':'▼ DOWN {n}','pres.same':'NO CHANGE','pres.next':'Next round in {s} s','pres.wait':'The host will start the next round.','pres.miss':'You did not play this round.',
 'final.king':'You are King of the Office!','final.done':'Tournament over','final.of':'of {n} players · {p} points',
 'final.games':'YOUR GAMES','final.cats':'CATEGORY PERFORMANCE','final.ach':'ACHIEVEMENTS','final.total':'King Score',
 'ach.first':'First game','ach.first.d':'You finished your first game','ach.perfect':'Perfect','ach.perfect.d':'100% accuracy in a game',
 'ach.comeback':'Comeback','ach.comeback.d':'You climbed {n} spots or more','ach.consistent':'Consistent','ach.consistent.d':'Top 10 in every round',
 'ach.king':'Office King','ach.king.d':'You won the tournament',
 'hud.score':'SCORE','hud.lives':'LIVES','hud.time':'TIME','hud.dist':'DISTANCE','hud.combo':'COMBO',
 'tab.hint':'Tap to jump','globo.inflate':'PUMP','globo.tie':'TIE','globo.pressure':'PRESSURE','globo.air':'AIR','globo.balloons':'BALLOONS',
 'globo.perfect':'Perfect balloon!','globo.pop':'POP! That one is gone','globo.gold':'GOLDEN BALLOON x2','globo.small':'SMALL BALLOON','globo.big':'BIG BALLOON',
 'avion.hint1':'Hold to fly up','avion.hint2':'Release to drop','avion.crash':'That is as far as it goes!',
 'car.brake':'BRAKE','car.off':'OFF THE ROAD!',
 'roach.splat':'SPLAT!','quick.fake':'FAKE','quick.miss':'MISS',
 'mem.watch':'WATCH THE SEQUENCE','mem.turn':'YOUR TURN','mem.len':'SEQUENCE: {n}','mem.fail':'Wrong!','mem.ok':'Nice!',
 'snake.hint':'Swipe or tap a side to turn','snake.crash':'Crash!',
 'brick.launch':'Tap to launch','brick.clear':'Wall cleared! +200','brick.multi':'MULTIBALL','brick.fast':'SPEED UP','brick.lost':'Ball lost!',
 'red.hint':'Tap only the greens','red.clear':'Clean round!','red.timeout':'Too slow!','red.bad':'RED! -500',
 'ad.title':'Tournament','ad.tab.control':'Control','ad.tab.games':'Games','ad.tab.players':'Players',
 'phase.LOBBY':'Waiting room','phase.INTRO':'Starting game','phase.PLAY':'Playing','phase.RESULTS':'Round ranking','phase.FINAL':'Finished',
 'dash.connected':'Connected','dash.active':'Finished the round','dash.round':'Round','dash.time':'Time left','dash.game':'Current game','dash.leader':'Leader',
 'btn.start':'Start tournament','btn.next':'Next round','btn.close':'Close round','btn.finalres':'Show final','btn.pause':'Pause auto-advance','btn.resume':'Resume auto-advance',
 'btn.end':'End tournament','btn.reset':'Reset room','btn.lock':'Lock room','btn.unlock':'Unlock room','btn.csv':'Copy results (CSV)','csv.ok':'Copied to clipboard','csv.sel':'Select and copy the text',
 'confirm.reset':'{n} players and their scores will be deleted. A new session is created and the screen goes back to the QR.','confirm.resetYes':'Delete and reset',
 'confirm.end':'The tournament ends now and shows results for the rounds played.','confirm.endYes':'End now','confirm.no':'Cancel',
 'g.event':'Event name','g.mode':'Mode','mode.random':'Random','mode.manual':'Manual','g.rounds':'Rounds: {n}','g.dur':'Duration per game','dur.game':'Per game',
 'g.draw':'Draw games','g.plan':'Tournament order','g.planEmpty':'Tap "Draw games" or they are drawn at start.','g.planManual':'Tap the number boxes in the list to build the order.',
 'g.hintRandom':'Turn off the games you do not want in the draw. The draw never repeats a game and mixes categories.','g.hintManual':'Tap each game\'s number box in the order you want to play them.',
 'g.soon':'Coming soon · Phase {n}','g.locked':'These settings can be changed in the waiting room.','g.on':'Enable','g.order':'Order',
 'p.bots':'Simulated coworkers: {n}','p.kick':'Kick','p.you':'you','p.empty':'No one has joined yet.',
 'demo':'<b>This is a demo.</b> Coworkers are simulated in your browser so you can watch the board move. In the real version everyone plays on their own phone and the Cloudflare server stores name, avatar and score.',
 'tag.you':'You','tag.king':'KING','units.pts':'pts','units.m':'m','units.cc':'cc','sec':'{n} s'
}};
let lang=store.get('ko-lang')==='en'?'en':'es';
function t(k,v){let s=(L[lang][k]??L.es[k]??k);if(v)for(const x in v)s=s.split('{'+x+'}').join(v[x]);return s}
const tx=o=>o?(o[lang]??o.es):'';
const nf=n=>new Intl.NumberFormat(lang==='es'?'es-HN':'en-US').format(Math.round(n));

let AC=null,muted=false,QUIET=false;
function tone(f=440,d=.08,type='square',vol=.05,slide=0,delay=0){
  if(muted||QUIET)return;
  try{
    AC=AC||new (window.AudioContext||window.webkitAudioContext)();
    const tt=AC.currentTime+delay,o=AC.createOscillator(),g=AC.createGain();
    o.type=type;o.frequency.setValueAtTime(f,tt);
    if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(40,f*slide),tt+d);
    g.gain.setValueAtTime(vol,tt);g.gain.exponentialRampToValueAtTime(.0001,tt+d);
    o.connect(g).connect(AC.destination);o.start(tt);o.stop(tt+d+.02);
  }catch(e){}
}
/* Efectos grabados (sound-web/sfx, incrustados por build.py en SFX_DATA). Si no cargan, se usa el sintetizador. */
const SBUF={};let sDec=false,lastJoinS=0;
const SFX_NAMES=['boton','gameover','listo','resultados','unirse'];
function sfxDecode(){
  if(sDec)return;
  const emb=typeof SFX_DATA!=='undefined',base=window.KO_SOUND;
  if(!emb&&!base)return;
  try{AC=AC||new (window.AudioContext||window.webkitAudioContext)()}catch(e){return}
  sDec=true;
  const dec=(k,buf)=>{try{const pr=AC.decodeAudioData(buf,b=>{SBUF[k]=b},()=>{});if(pr&&pr.catch)pr.catch(()=>{})}catch(e){}};
  if(emb)Object.keys(SFX_DATA).forEach(k=>{const bin=atob(SFX_DATA[k]),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);dec(k,u.buffer)});
  else SFX_NAMES.forEach(k=>fetch(base+'sfx/'+k+'.mp3').then(r=>r.ok?r.arrayBuffer():null).then(b=>{if(b)dec(k,b)}).catch(()=>{}));
}
/* iPhone: que los sonidos de la página suenen aunque el interruptor de silencio esté activado */
function audioUnlock(){
  try{if(navigator.audioSession&&navigator.audioSession.type!=='playback')navigator.audioSession.type='playback'}catch(e){}
  try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();
    const b=AC.createBuffer(1,1,22050),src=AC.createBufferSource();src.buffer=b;src.connect(AC.destination);src.start(0)}catch(e){}
  sfxDecode();
}
function sample(k,vol,fb){
  if(muted||QUIET)return;
  if(!SBUF[k]){sfxDecode();if(fb)fb();return}
  try{if(AC.state==='suspended')AC.resume();const src=AC.createBufferSource(),g=AC.createGain();src.buffer=SBUF[k];g.gain.value=vol;src.connect(g).connect(AC.destination);src.start()}catch(e){if(fb)fb()}
}
['pointerdown','keydown','touchend'].forEach(ev=>addEventListener(ev,audioUnlock,{passive:true}));
const SFX={
  countdown:()=>tone(440,.1,'square',.05),go:()=>tone(880,.18,'square',.06),
  click:()=>tone(1200,.03,'triangle',.03),hit:()=>tone(720,.07,'square',.05,1.6),
  miss:()=>tone(160,.18,'sawtooth',.05,.5),combo:()=>{tone(660,.07,'square',.05);tone(990,.09,'square',.05,0,.07)},
  levelup:()=>[523,659,784].forEach((f,i)=>tone(f,.09,'triangle',.06,0,i*.08)),
  gameover:()=>sample('gameover',.55,()=>[392,330,262].forEach((f,i)=>tone(f,.16,'square',.05,0,i*.14))),
  ui:()=>sample('boton',.6,()=>tone(1200,.03,'triangle',.03)),
  ready:()=>sample('listo',.6,()=>[523,659,784].forEach((f,i)=>tone(f,.09,'triangle',.06,0,i*.08))),
  joined:()=>sample('unirse',.6,()=>tone(660,.1,'triangle',.06,1.4)),
  results:()=>sample('resultados',.55,()=>[523,659,784].forEach((f,i)=>tone(f,.09,'triangle',.06,0,i*.08))),
  victory:()=>[523,659,784,1046,784,1046].forEach((f,i)=>tone(f,.16,'triangle',.07,0,i*.12)),
  rank:()=>tone(990,.06,'triangle',.04,1.3),join:()=>{const n=Date.now();if(n-lastJoinS<140)return;lastJoinS=n;sample('unirse',.32,()=>tone(880+Math.random()*300,.05,'triangle',.025))}
};

/* =====================================================================
   1. CATEGORÍAS, AVATARES E ÍCONOS
   ===================================================================== */
const CATS={
  reflex:{es:'Reflejos',en:'Reflexes',c:'#FF9A5C'},speed:{es:'Velocidad',en:'Speed',c:'#F28B8B'},
  precision:{es:'Precisión',en:'Precision',c:'#7CC6EE'},memory:{es:'Memoria',en:'Memory',c:'#C3B0F5'},
  control:{es:'Control',en:'Control',c:'#9BE08F'},decision:{es:'Decisión',en:'Decision',c:'#FFE07A'},
  endurance:{es:'Resistencia',en:'Endurance',c:'#86D9CD'}
};
const catChip=c=>`<span class="catchip" style="--c:${CATS[c].c}"><i></i>${esc(tx(CATS[c]))}</span>`;

const AVC=['#FFD23F','#2FA8E8','#5BCB4A','#FF7A2F','#E85A5A','#9B7BE8'];
const AVX=[
 '',
 '<g fill="none" stroke="#1F2A3A" stroke-width="2.5"><circle cx="19" cy="25" r="4.5" fill="#fff8"/><circle cx="30" cy="25" r="4.5" fill="#fff8"/><path d="M23.5 25h2"/></g>',
 '<path d="M10 20 Q24 4 38 20 Z" fill="#E85A5A" stroke="#1F2A3A" stroke-width="2.5" stroke-linejoin="round"/><path d="M30 19h12" stroke="#1F2A3A" stroke-width="3" stroke-linecap="round"/>',
 '<path d="M24 12l-8-5v10zM24 12l8-5v10z" fill="#F7A8C4" stroke="#1F2A3A" stroke-width="2.2" stroke-linejoin="round"/><circle cx="24" cy="12" r="2.5" fill="#F7A8C4" stroke="#1F2A3A" stroke-width="2"/>',
 '<path d="M10 26a14 14 0 0 1 28 0" fill="none" stroke="#1F2A3A" stroke-width="3"/><rect x="6.5" y="23" width="6" height="10" rx="2" fill="#2FA8E8" stroke="#1F2A3A" stroke-width="2.2"/><rect x="35.5" y="23" width="6" height="10" rx="2" fill="#2FA8E8" stroke="#1F2A3A" stroke-width="2.2"/>',
 '<path d="M17 32q3.5-3 7-1 3.5-2 7 1-3.5 2-7 0-3.5 2-7 0z" fill="#1F2A3A"/>',
 '<path d="M17 15 L24 0 L31 15 Z" fill="#5BCB4A" stroke="#1F2A3A" stroke-width="2.5" stroke-linejoin="round"/><path d="M20 9l8 2M18.5 13l10 1.5" stroke="#FFD23F" stroke-width="2"/><circle cx="24" cy="1.5" r="2.4" fill="#FFD23F" stroke="#1F2A3A" stroke-width="1.6"/>',
 '<path d="M10 21a14 12 0 0 1 28 0z" fill="#2FA8E8" stroke="#1F2A3A" stroke-width="2.5" stroke-linejoin="round"/><circle cx="24" cy="7.5" r="3.4" fill="#fff" stroke="#1F2A3A" stroke-width="2"/>',
 '<g stroke="#1F2A3A" stroke-width="2.4" stroke-linejoin="round"><rect x="13" y="21.5" width="9" height="6" rx="2" fill="#1F2A3A"/><rect x="26" y="21.5" width="9" height="6" rx="2" fill="#1F2A3A"/><path d="M22 23.5h4" fill="none"/></g>',
 '<circle cx="24" cy="9" r="5" fill="#8A5A35" stroke="#1F2A3A" stroke-width="2.4"/><path d="M10.5 22q2-10 13.5-10t13.5 10q-6-5-13.5-5t-13.5 5z" fill="#8A5A35" stroke="#1F2A3A" stroke-width="2.2" stroke-linejoin="round"/>',
 '<path d="M10.5 19q13.5-5 27 0" fill="none" stroke="#FF7A2F" stroke-width="4.5"/><path d="M10.5 19q13.5-5 27 0" fill="none" stroke="#1F2A3A" stroke-width="1.5" transform="translate(0 2.6)"/><path d="M24 11.5l1.4 2.9 3.1.4-2.3 2.1.6 3.1-2.8-1.5-2.8 1.5.6-3.1-2.3-2.1 3.1-.4z" fill="#FFD23F" stroke="#1F2A3A" stroke-width="1.3"/>',
 '<path d="M14 28l20 0" stroke="none"/><path d="M21 39l3-4 3 4-3 6z" fill="#E85A5A" stroke="#1F2A3A" stroke-width="2" stroke-linejoin="round"/>'
];
function avatarSVG(i){
  i=((i%12)+12)%12;const bg=AVC[i%6],acc=AVX[i];
  const eyes=(i===1||i===8)?'':'<circle cx="19" cy="25" r="1.9" fill="#1F2A3A"/><circle cx="29" cy="25" r="1.9" fill="#1F2A3A"/>';
  return `<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22" fill="${bg}" stroke="#1F2A3A" stroke-width="3"/><circle cx="24" cy="27" r="13" fill="#fff" stroke="#1F2A3A" stroke-width="3"/>${eyes}<path d="M19.5 31q4.5 4 9 0" fill="none" stroke="#1F2A3A" stroke-width="2.4" stroke-linecap="round"/>${acc}</svg>`;
}
const ICON_ATTR='viewBox="0 0 48 48" fill="none" stroke="#1F2A3A" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"';
const IC={
 tablita:`<svg ${ICON_ATTR}><rect x="4" y="34" width="18" height="8" rx="2" fill="#2FA8E8"/><rect x="27" y="34" width="17" height="8" rx="2" fill="#FFD23F"/><circle cx="27" cy="9" r="5" fill="#fff"/><path d="M26 14l-2 9M24 23l-6 5M24 23l6 4M25 17l-6 3M25 17l6-1"/></svg>`,
 globo:`<svg ${ICON_ATTR}><ellipse cx="24" cy="19" rx="12" ry="14" fill="#E85A5A"/><path d="M21 37l3-4 3 4z" fill="#E85A5A"/><path d="M24 37q-4 4 0 9" /><ellipse cx="19" cy="14" rx="2.5" ry="4" fill="#fff" stroke="none" opacity=".6"/></svg>`,
 avion:`<svg ${ICON_ATTR}><path d="M44 12L4 22l13 5 3 13 6-9 11 6z" fill="#fff"/><path d="M17 27l27-15-18 19" fill="#DDE6EE"/></svg>`,
 carrera:`<svg ${ICON_ATTR}><rect x="7" y="22" width="34" height="13" rx="3" fill="#FFD23F"/><rect x="14" y="13" width="20" height="10" rx="2" fill="#7CC6EE"/><rect x="9" y="34" width="8" height="5" fill="#1F2A3A"/><rect x="31" y="34" width="8" height="5" fill="#1F2A3A"/><rect x="10" y="26" width="5" height="3" fill="#E85A5A" stroke="none"/><rect x="33" y="26" width="5" height="3" fill="#E85A5A" stroke="none"/></svg>`,
 cockroach_smash:`<svg ${ICON_ATTR}><path d="M14 17l-6-4M13 24H5M14 31l-6 5M34 17l6-4M35 24h8M34 31l6 5M20 9l-4-6M28 9l4-6"/><ellipse cx="24" cy="26" rx="11" ry="15" fill="#8A5A35"/><circle cx="24" cy="12" r="6" fill="#8A5A35"/><circle cx="21.5" cy="11" r="2" fill="#fff" stroke-width="1.5"/><circle cx="26.5" cy="11" r="2" fill="#fff" stroke-width="1.5"/><path d="M24 17v22" stroke-width="2"/></svg>`,
 quick_shot:`<svg ${ICON_ATTR}><circle cx="24" cy="24" r="19" fill="#E85A5A"/><circle cx="24" cy="24" r="12.5" fill="#fff"/><circle cx="24" cy="24" r="6" fill="#E85A5A"/><circle cx="24" cy="24" r="1.8" fill="#FFD23F" stroke="none"/></svg>`,
 memory_flash:`<svg ${ICON_ATTR}><rect x="5" y="5" width="17" height="17" rx="4" fill="#E85A5A"/><rect x="26" y="5" width="17" height="17" rx="4" fill="#2FA8E8"/><rect x="5" y="26" width="17" height="17" rx="4" fill="#5BCB4A"/><rect x="26" y="26" width="17" height="17" rx="4" fill="#FFD23F"/></svg>`,
 snake_office:`<svg ${ICON_ATTR}><path d="M8 38h14a7 7 0 0 0 0-14h-6a7 7 0 0 1 0-14h18" stroke="#1F2A3A" stroke-width="10"/><path d="M8 38h14a7 7 0 0 0 0-14h-6a7 7 0 0 1 0-14h18" stroke="#5BCB4A" stroke-width="5"/><circle cx="38" cy="10" r="5" fill="#5BCB4A"/><circle cx="39" cy="9" r="1.2" fill="#1F2A3A" stroke="none"/></svg>`,
 brick_breaker:`<svg ${ICON_ATTR}><rect x="4" y="6" width="12" height="7" rx="1.5" fill="#FFD23F"/><rect x="18" y="6" width="12" height="7" rx="1.5" fill="#2FA8E8"/><rect x="32" y="6" width="12" height="7" rx="1.5" fill="#5BCB4A"/><rect x="11" y="15" width="12" height="7" rx="1.5" fill="#FF7A2F"/><rect x="25" y="15" width="12" height="7" rx="1.5" fill="#E85A5A"/><circle cx="28" cy="31" r="3.5" fill="#fff"/><rect x="12" y="38" width="24" height="5" rx="2.5" fill="#1F2A3A"/></svg>`,
 dont_touch_red:`<svg ${ICON_ATTR}><rect x="5" y="5" width="17" height="17" rx="4" fill="#5BCB4A"/><rect x="26" y="5" width="17" height="17" rx="4" fill="#E85A5A"/><rect x="5" y="26" width="17" height="17" rx="4" fill="#E85A5A"/><rect x="26" y="26" width="17" height="17" rx="4" fill="#5BCB4A"/><path d="M30 10l9 7M39 10l-9 7M9 31l9 7M18 31l-9 7" stroke="#fff" stroke-width="2.5"/></svg>`,
 survival_chaos:`<svg ${ICON_ATTR}><path d="M24 4L45 41H3z" fill="#FFD23F"/><path d="M24 17v11" stroke-width="4"/><circle cx="24" cy="34" r="1.8" fill="#1F2A3A"/></svg>`,
 space_invaders:`<svg ${ICON_ATTR}><ellipse cx="24" cy="27" rx="20" ry="7" fill="#9B7BE8"/><path d="M13 25a11 11 0 0 1 22 0z" fill="#7CC6EE"/><circle cx="13" cy="28" r="1.6" fill="#FFD23F" stroke="none"/><circle cx="24" cy="30" r="1.6" fill="#FFD23F" stroke="none"/><circle cx="35" cy="28" r="1.6" fill="#FFD23F" stroke="none"/><path d="M16 36l-3 6M32 36l3 6"/></svg>`,
 traffic_chaos:`<svg ${ICON_ATTR}><rect x="15" y="3" width="18" height="38" rx="6" fill="#43536A"/><circle cx="24" cy="12" r="4.5" fill="#E85A5A"/><circle cx="24" cy="22" r="4.5" fill="#FFD23F"/><circle cx="24" cy="32" r="4.5" fill="#5BCB4A"/><path d="M24 41v5"/></svg>`,
 office_bullseye:`<svg ${ICON_ATTR}><circle cx="22" cy="26" r="17" fill="#fff"/><circle cx="22" cy="26" r="11" fill="#2FA8E8"/><circle cx="22" cy="26" r="5" fill="#FFD23F"/><path d="M22 26L43 5M36 5h7v7"/></svg>`,
 coffee_rush:`<svg ${ICON_ATTR}><path d="M8 18h26l-3 23H11z" fill="#fff"/><path d="M34 22h4a5 5 0 0 1 0 10h-5"/><path d="M10 22h22" stroke="#8A5A35" stroke-width="5"/><path d="M16 4q-3 4 0 8M24 4q-3 4 0 8"/></svg>`,
 sky_patrol:`<svg ${ICON_ATTR}><rect x="4" y="4" width="40" height="40" rx="8" fill="#2F7FD0"/><path d="M10 24h22M24 24l-6-12h4l8 12-8 12h-4z" fill="#FFD23F"/><path d="M10 20l-3-4M10 28l-3 4" /><circle cx="38" cy="14" r="3" fill="#E85A5A"/></svg>`,
 printer_rage:`<svg ${ICON_ATTR}><rect x="12" y="4" width="24" height="12" fill="#fff"/><rect x="4" y="16" width="40" height="18" rx="4" fill="#9FB3C8"/><rect x="12" y="28" width="24" height="15" fill="#fff"/><path d="M16 33l4 3-4 3M24 34l6 4" stroke="#E85A5A"/><circle cx="37" cy="22" r="2" fill="#E85A5A" stroke="none"/></svg>`,
 number_ninja:`<svg ${ICON_ATTR}><rect x="8" y="4" width="32" height="40" rx="5" fill="#5BCB4A"/><rect x="12" y="8" width="24" height="10" rx="2" fill="#fff"/><path d="M15 25h4M17 23v4M29 25h4M15 35h4M29 33h4M29 37h4"/></svg>`
};

/* =====================================================================
   2. DIBUJO COMPARTIDO (lienzo lógico 800 x 400)
   ===================================================================== */
function rng(seed){return()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646}}
const CITY=(()=>{const r=rng(11),b=[];let x=0;while(x<1600){const w=28+r()*48,h=40+r()*110;b.push({x,w,h,roof:r()<.25?'tri':r()<.35?'dome':r()<.2?'spire':''});x+=w+r()*12}return b})();
const TREES=(()=>{const r=rng(5),t=[];for(let x=0;x<1600;x+=55+r()*90)t.push({x,s:20+r()*22});return t})();
const CLOUDS=[{x:60,y:66,s:1},{x:300,y:38,s:.7},{x:540,y:92,s:1.15},{x:760,y:48,s:.8}];
function rr(c,x,y,w,h,r){c.beginPath();if(c.roundRect)c.roundRect(x,y,w,h,r);else c.rect(x,y,w,h)}
function cloud(c,x,y,s){c.fillStyle='rgba(255,255,255,.88)';c.beginPath();c.arc(x,y,22*s,0,7);c.arc(x+26*s,y-10*s,28*s,0,7);c.arc(x+56*s,y,20*s,0,7);c.fill();c.fillRect(x,y-2,56*s,22*s*.9)}
function scene(c,scroll,ground='#C9D9B4',W=800,H=400,gy=318){
  const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#58B4E9');g.addColorStop(1,'#C7E8F9');c.fillStyle=g;c.fillRect(0,0,W,H);
  CLOUDS.forEach(k=>{const x=((k.x-scroll*.04)%(W+160)+(W+160))%(W+160)-80;cloud(c,x,k.y*(H/400),k.s)});
  c.fillStyle='#A9BFD2';const o1=(scroll*.12)%1600;
  for(const b of CITY)for(const rep of [0,1600]){const x=b.x-o1+rep;if(x<-90||x>W+10)continue;
    c.fillRect(x,gy-b.h,b.w,b.h+12);
    if(b.roof==='tri'){c.beginPath();c.moveTo(x-3,gy-b.h);c.lineTo(x+b.w/2,gy-b.h-22);c.lineTo(x+b.w+3,gy-b.h);c.fill()}
    else if(b.roof==='dome'){c.beginPath();c.arc(x+b.w/2,gy-b.h,b.w/2,Math.PI,0);c.fill()}
    else if(b.roof==='spire'){c.fillRect(x+b.w/2-3,gy-b.h-30,6,30)}}
  c.fillStyle='#7E98AE';const o2=(scroll*.3)%1600;
  for(const tr of TREES)for(const rep of [0,1600]){const x=tr.x-o2+rep;if(x<-60||x>W+60)continue;c.fillRect(x-3,gy-tr.s+6,6,tr.s);c.beginPath();c.arc(x,gy-tr.s*1.1,tr.s*.62,0,7);c.fill()}
  c.fillStyle='#8EA8BC';c.fillRect(0,gy+4,W,H);
  c.fillStyle=ground;c.fillRect(0,gy+34,W,H);
  c.fillStyle='rgba(31,42,58,.12)';c.fillRect(0,gy+56,W,5);
}
function plank(c,x,y,w,h,col){
  rr(c,x,y,w,h,7);c.fillStyle=col;c.fill();
  c.fillStyle='rgba(0,0,0,.16)';c.fillRect(x+4,y+h-Math.min(9,h*.35),w-8,Math.min(5,h*.2));
  c.fillStyle='rgba(255,255,255,.4)';c.fillRect(x+Math.min(9,w*.12),y+Math.min(6,h*.25),w*.33,Math.min(4,h*.18));
  c.lineWidth=4;c.strokeStyle=INK;rr(c,x,y,w,h,7);c.stroke();
}
function stick(c,x,y,ph,pose='run'){
  c.save();c.strokeStyle=INK;c.lineWidth=5;c.lineCap='round';c.lineJoin='round';
  const hip=[x,y-36],neck=[x+5,y-64];let Ls;
  if(pose==='jump'){Ls=[[hip,[x+12,y-26],[x+2,y-14]],[hip,[x-4,y-20],[x-16,y-12]],[[x+4,y-58],[x+16,y-66],[x+20,y-80]],[[x+4,y-58],[x-10,y-56],[x-18,y-66]]]}
  else if(pose==='pump'){const k=Math.sin(ph)*10;Ls=[[hip,[x-6,y-18],[x-10,y]],[hip,[x+8,y-18],[x+10,y]],[[x+4,y-58],[x-12,y-46+k*.5],[x-22,y-40+k]],[[x+4,y-58],[x-8,y-42+k*.5],[x-22,y-40+k]]]}
  else{const s=Math.sin(ph),s2=-s;
    const leg=v=>[hip,[x+4+v*10,y-19],[x+v*17-(v<0?4:0),y-(v>.3?4:0)]];
    const arm=v=>[[x+4,y-58],[x+4-v*11,y-46],[x+10-v*16,y-52+Math.abs(v)*-4]];
    Ls=[leg(s),leg(s2),arm(s),arm(s2)]}
  c.beginPath();c.moveTo(...hip);c.lineTo(...neck);c.stroke();
  Ls.forEach(p=>{c.beginPath();c.moveTo(...p[0]);c.lineTo(...p[1]);c.lineTo(...p[2]);c.stroke()});
  c.beginPath();c.arc(x+9,y-78,13,0,7);c.fillStyle='#fff';c.fill();c.stroke();
  c.restore();
}
function txt(c,s,x,y,size,o={}){
  const {fill='#fff',align='left',font='Lilita One',stroke=true,sw=.24}=o;
  c.font=`${size}px "${font}", "Arial Black", sans-serif`;c.textAlign=align;c.textBaseline='middle';
  if(stroke){c.lineJoin='round';c.lineWidth=Math.max(3,size*sw);c.strokeStyle=INK;c.strokeText(s,x,y)}
  c.fillStyle=fill;c.fillText(s,x,y);
}
function btnDraw(c,r,label,col,on,size=28){
  const y=r.y+(on?5:0);
  if(!on){rr(c,r.x,r.y+6,r.w,r.h,16);c.fillStyle=INK;c.fill()}
  rr(c,r.x,y,r.w,r.h,16);c.fillStyle=col;c.fill();c.lineWidth=4;c.strokeStyle=INK;c.stroke();
  txt(c,label,r.x+r.w/2,y+r.h/2+2,size,{align:'center'});
}
/* HUD común: puntaje, tiempo, vidas y combo */
function hud(c,g,o={}){
  const P='Press Start 2P';
  txt(c,(o.label||t('hud.score'))+' '+(o.value!=null?o.value:nf(Math.max(0,g.score()))),18,26,15,{font:P,sw:.45});
  if(o.lives!=null){for(let i=0;i<o.lives0;i++){const x=24+i*24,y=54;c.beginPath();c.moveTo(x,y+5);c.bezierCurveTo(x-11,y-4,x-5,y-12,x,y-5);c.bezierCurveTo(x+5,y-12,x+11,y-4,x,y+5);c.fillStyle=i<o.lives?'#E85A5A':'rgba(255,255,255,.5)';c.fill();c.lineWidth=2.5;c.strokeStyle=INK;c.stroke()}}
  const l=Math.max(0,g.dur-g.t);
  txt(c,t('hud.time')+' '+mmss(l),782,26,15,{font:P,align:'right',fill:l<=5?'#FFD23F':'#fff',sw:.45});
  if(o.combo>=2){
    const m=o.mult||comboMult(o.combo);const pulse=g._cb!==m?1.35:1;g._cb=m;
    c.save();c.translate(782,58);c.scale(pulse,pulse);
    txt(c,t('hud.combo')+' x'+m,0,0,13,{font:P,align:'right',fill:m>=4?'#FF7A2F':m>=3?'#FFD23F':'#fff',sw:.5});c.restore();
  }
}
const floatTxt=(arr,x,y,s,col='#fff',size=22)=>arr.push({x,y,s,col,size,l:1});
function drawFloats(c,arr,dt){arr.forEach(f=>{f.l-=dt*1.2;f.y-=dt*40;c.globalAlpha=Math.max(0,f.l);txt(c,f.s,f.x,f.y,f.size,{align:'center',fill:f.col});c.globalAlpha=1});for(let i=arr.length-1;i>=0;i--)if(arr[i].l<=0)arr.splice(i,1)}
/* Demostración automática: el juego se juega solo y una manito muestra qué tocar */
function botTap(g,x,y){g.down&&g.down(x,y,'bot');g.up&&g.up('bot',x,y);g.hand={x,y,p:.22}}
function botHold(g,x,y,on){if(on&&!g._bh){g.down&&g.down(x,y,'bot');g._bh=1}else if(!on&&g._bh){g.up&&g.up('bot',x,y);g._bh=0}g.hand={x,y,p:on?.22:0,hold:on}}
function drawHand(c,h,dt){
  if(!h)return;h.p=Math.max(0,(h.p||0)-dt);c.save();c.translate(h.x,h.y);
  if(h.p>0||h.hold){c.beginPath();c.arc(0,0,h.hold?24:22+(.22-h.p)*90,0,7);c.strokeStyle='rgba(255,255,255,.95)';c.lineWidth=5;c.stroke();c.strokeStyle=INK;c.lineWidth=2;c.stroke()}
  c.rotate(-.4);c.lineWidth=3.5;c.strokeStyle=INK;c.fillStyle='#fff';const k=(h.p>0||h.hold)?4:0;
  rr(c,-8,k,16,40,8);c.fill();c.stroke();rr(c,-20,26+k,44,40,14);c.fill();c.stroke();
  c.beginPath();c.moveTo(-8,30+k);c.lineTo(8,30+k);c.stroke();c.restore();
}
function officeFloor(c){
  c.fillStyle='#EFE8DA';c.fillRect(0,0,800,400);
  c.strokeStyle='#DDD2BE';c.lineWidth=2;
  for(let x=0;x<=800;x+=50){c.beginPath();c.moveTo(x,0);c.lineTo(x,400);c.stroke()}
  for(let y=0;y<=400;y+=50){c.beginPath();c.moveTo(0,y);c.lineTo(800,y);c.stroke()}
  c.fillStyle='rgba(31,42,58,.06)';for(let x=0;x<800;x+=100)for(let y=0;y<400;y+=100)c.fillRect(x,y,50,50);
}

/* =====================================================================
   3. REGISTRO DE JUEGOS
   Cada juego es un módulo: create(dur) devuelve un estado con
   update(dt), draw(c), down/up/move/key, score(), acc(), maxCombo().
   El motor (Engine) agrega start/pause/resume/end/getScore/... comunes.
   ===================================================================== */
const REG=[];
function registerGame(def){REG.push(Object.assign({enabled:true,playable:true},def))}

/* ---------- Salta la tablita ---------- */
registerGame({id:'tablita',name:{es:'Salta la tablita',en:'Plank Hop'},category:'reflex',duration:45,difficulty:1,cap:20000,
  desc:{es:'Toca para saltar. Cada tablita seguida sube tu combo.',en:'Tap to jump. Each plank in a row builds your combo.'},
  sim:k=>({raw:(300+Math.random()*1500)*k}),
  create(dur){
  const MX=230,PY=262;
  const g={dur,t:0,lives:3,passed:0,falls:0,pts:0,streak:0,mx:0,plats:[],y:PY,vy:0,gr:true,inv:0,ph:0,buf:0,coy:0,scroll:0,over:false,flash:0,fl:[]};
  let end=0;
  const lvl=()=>Math.floor(g.t/(dur/9));
  function add(){const Lv=lvl();const gap=55+Math.random()*(70+Lv*13);const w=Math.max(70,105+Math.random()*95-Lv*6);const x=end+gap;g.plats.push({x,w,c:PLANK[Math.random()*4|0],p:false});end=x+w}
  g.plats.push({x:-30,w:430,c:PLANK[1],p:true});end=400;while(end<1000)add();
  g.down=()=>{g.buf=.13};g.key=(k,d)=>{if(d&&(k==='Space'||k==='ArrowUp'))g.buf=.13};
  function respawn(){const p=g.plats.find(p=>p.x+p.w>MX+30);const sh=Math.max(0,p.x-(MX-34));g.plats.forEach(q=>{q.x-=sh;if(q.x+q.w<MX)q.p=true});end-=sh;g.y=PY;g.vy=0;g.gr=true;g.inv=1.3}
  g.update=dt=>{
    const sp=260*(1+.1*lvl()),dx=sp*dt;g.scroll+=dx;end-=dx;g.flash-=dt;
    g.plats.forEach(p=>{p.x-=dx;if(!p.p&&p.x+p.w<MX){p.p=true;g.passed++;g.streak++;g.mx=Math.max(g.mx,g.streak);const m=comboMult(g.streak);g.pts+=10*m;if(m>1&&comboMult(g.streak-1)<m)SFX.combo();else SFX.click()}});
    g.plats=g.plats.filter(p=>p.x+p.w>-60);while(end<1000)add();
    g.buf-=dt;g.coy-=dt;g.inv-=dt;g.ph+=dt*sp/24;
    if(g.buf>0&&(g.gr||g.coy>0)){g.vy=-830;g.gr=false;g.coy=0;g.buf=0;tone(520,.1,'square',.045,1.8)}
    const under=g.plats.find(p=>MX>=p.x-5&&MX<=p.x+p.w+5);
    if(g.gr){if(!under){g.gr=false;g.coy=.09}}
    else{const prev=g.y;g.vy+=2300*dt;g.y+=g.vy*dt;if(under&&g.vy>0&&prev<=PY+3&&g.y>=PY){g.y=PY;g.vy=0;g.gr=true}}
    if(g.y>480){g.lives--;g.falls++;g.streak=0;g.flash=.35;SFX.miss();if(g.lives<=0){g.over=true;return}respawn()}
  };
  g.score=()=>g.pts+Math.floor(g.t);g.acc=()=>g.passed+g.falls?g.passed/(g.passed+g.falls):null;g.maxCombo=()=>g.mx;
  g.auto=dt=>{const u=g.plats.find(p=>MX>=p.x-5&&MX<=p.x+p.w+5);if(g.gr&&u&&u.x+u.w-MX<24)botTap(g,420,210)};
  g.draw=c=>{
    scene(c,g.scroll);
    g.plats.forEach(p=>plank(c,p.x,PY,p.w,26,p.c));
    if(g.gr){c.strokeStyle='rgba(31,42,58,.5)';c.lineWidth=3;for(let i=0;i<3;i++){c.beginPath();c.moveTo(MX-40-i*14,PY-30+i*10);c.lineTo(MX-70-i*14,PY-30+i*10);c.stroke()}}
    if(!(g.inv>0&&(g.t*12|0)%2))stick(c,MX,g.y,g.ph,g.gr?'run':'jump');
    if(g.flash>0){c.fillStyle=`rgba(232,90,90,${g.flash})`;c.fillRect(0,0,800,400)}
    hud(c,g,{lives:g.lives,lives0:3,combo:g.streak});
    if(g.t<2.4)txt(c,t('tab.hint'),400,360,28,{align:'center'});
  };
  return g;
}});

/* ---------- No dejes caer el avión ---------- */
registerGame({id:'avion',name:{es:'No dejes caer el avión',en:'Keep the Plane Up'},category:'control',duration:60,difficulty:2,cap:20000,
  desc:{es:'Mantén presionado para subir y suelta para bajar. Un solo vuelo.',en:'Hold to climb, release to drop. One flight only.'},
  sim:k=>({raw:(60+Math.pow(Math.random(),1.4)*900)*Math.pow(k,.6)}),
  create(dur){
  const PX=200,GR=350;
  const g={dur,t:0,y:170,vy:0,hold:false,dist:0,arch:0,obs:[],cranes:[],nextX:900,over:false,crash:0,scroll:0,ang:0,fl:[]};
  g.down=()=>{g.hold=true};g.up=()=>{g.hold=false};g.key=(k,d)=>{if(k==='Space'||k==='ArrowUp')g.hold=d};
  function crash(){if(g.crash>0)return;g.crash=1;tone(150,.45,'sawtooth',.08,.3)}
  g.update=dt=>{
    if(g.crash>0){g.crash-=dt;g.vy=Math.min(500,g.vy+900*dt);g.y=Math.min(GR-8,g.y+g.vy*dt);g.ang+=dt*8;if(g.crash<=0)g.over=true;return}
    const sp=Math.min(430,220+g.t*3.2),dx=sp*dt;g.scroll+=dx;g.dist+=dx/20;
    g.vy+=(g.hold?-1700:950)*dt;g.vy=clamp(g.vy,-380,420);g.y+=g.vy*dt;g.ang=g.vy/900;
    g.nextX-=dx;
    if(g.nextX<=900){
      const gh=Math.max(118,196-g.t*1.4);const gy=70+gh/2+Math.random()*(GR-140-gh);
      g.obs.push({x:g.nextX,gy,gh,w:56,p:false});
      if(Math.random()<.5)g.cranes.push({x:g.nextX+rand(140,190),y:rand(60,GR-70),ph:Math.random()*6});
      g.nextX+=Math.max(230,345-g.t*1.8);
    }
    g.obs.forEach(o=>{o.x-=dx;if(!o.p&&o.x+o.w<PX-14){o.p=true;g.arch++;SFX.click()}});g.cranes.forEach(k=>{k.x-=dx*1.22;k.ph+=dt*5;k.y+=Math.cos(k.ph)*30*dt});
    g.obs=g.obs.filter(o=>o.x>-80);g.cranes=g.cranes.filter(k=>k.x>-40);
    if(g.y>GR-10||g.y<8)crash();
    g.obs.forEach(o=>{if(PX+14>o.x&&PX-14<o.x+o.w&&(g.y-9<o.gy-o.gh/2||g.y+9>o.gy+o.gh/2))crash()});
    g.cranes.forEach(k=>{if(Math.hypot(k.x-PX,k.y-g.y)<24)crash()});
  };
  g.score=()=>Math.round(g.dist)+g.arch*20;g.acc=()=>null;g.maxCombo=()=>g.arch;
  g.auto=dt=>{const o=g.obs.find(o=>o.x+o.w>PX-10);const ty=o&&o.x<PX+300?o.gy:190;botHold(g,520,230,g.y>ty-4&&g.vy>-160)};
  function pillar(c,x,y,w,h,top){
    c.fillStyle='#F4ECDD';c.fillRect(x,y,w,h);c.fillStyle='#E0D3BC';c.fillRect(x+w*.62,y,w*.38,h);
    c.lineWidth=3;c.strokeStyle=INK;c.strokeRect(x,y,w,h);
    const by=top?y+h-14:y;c.fillStyle='#F4ECDD';c.fillRect(x-12,by,w+24,14);c.strokeRect(x-12,by,w+24,14);
  }
  function crane(c,x,y,ph){c.save();c.translate(x,y);const f=Math.sin(ph)*8;c.fillStyle='#FFFDF6';c.strokeStyle=INK;c.lineWidth=2.5;c.lineJoin='round';
    c.beginPath();c.moveTo(-18,2);c.lineTo(0,-2);c.lineTo(16,-12);c.lineTo(12,2);c.lineTo(0,6);c.closePath();c.fill();c.stroke();
    c.beginPath();c.moveTo(-4,0);c.lineTo(4,-18-f);c.lineTo(8,0);c.closePath();c.fillStyle='#EDE3D0';c.fill();c.stroke();c.restore()}
  g.draw=c=>{
    scene(c,g.scroll,'#EFE6D2');
    g.obs.forEach(o=>{pillar(c,o.x,0,o.w,o.gy-o.gh/2,true);pillar(c,o.x,o.gy+o.gh/2,o.w,GR-(o.gy+o.gh/2)+30,false)});
    g.cranes.forEach(k=>crane(c,k.x,k.y,k.ph));
    c.fillStyle='#F7F0E1';c.fillRect(0,372,800,28);c.strokeStyle=INK;c.lineWidth=2;c.beginPath();c.moveTo(0,372);c.lineTo(800,372);c.stroke();
    const px0=g.dist*20;for(let m=Math.floor((g.dist-12)/10)*10;m<g.dist+40;m+=10){const x=PX+(m*20-px0);if(x<-20||x>820)continue;c.beginPath();c.moveTo(x,372);c.lineTo(x,m%50===0?386:380);c.stroke();if(m%50===0&&m>=0)txt(c,m+'m',x+4,392,12,{stroke:false,font:'Chakra Petch',fill:INK})}
    c.save();c.translate(PX,g.y);c.rotate(g.ang);c.lineJoin='round';c.lineWidth=3;c.strokeStyle=INK;
    c.beginPath();c.moveTo(26,0);c.lineTo(-20,-14);c.lineTo(-8,0);c.lineTo(-20,10);c.closePath();c.fillStyle='#fff';c.fill();c.stroke();
    c.beginPath();c.moveTo(26,0);c.lineTo(-8,0);c.lineTo(-14,6);c.closePath();c.fillStyle='#DDE6EE';c.fill();c.stroke();c.restore();
    if(!g.crash&&g.hold){c.strokeStyle='rgba(255,255,255,.8)';c.lineWidth=3;for(let i=0;i<3;i++){c.beginPath();c.moveTo(PX-30-i*12,g.y-6+i*6);c.lineTo(PX-56-i*12,g.y-6+i*6);c.stroke()}}
    hud(c,g,{label:t('hud.dist'),value:Math.round(g.dist)+' m',combo:g.arch>=3?g.arch:0,mult:Math.min(9,g.arch)});
    if(g.t<2.6){rr(c,240,300,320,56,14);c.fillStyle='rgba(31,42,58,.75)';c.fill();txt(c,t('avion.hint1'),400,318,18,{align:'center',stroke:false});txt(c,t('avion.hint2'),400,340,18,{align:'center',stroke:false})}
    if(g.crash>0)txt(c,t('avion.crash'),400,180,40,{align:'center',fill:'#FFD23F'});
  };
  return g;
}});

/* ---------- Carrera costera (pixel) ---------- */
registerGame({id:'carrera',name:{es:'Carrera costera',en:'Race Runner'},category:'endurance',duration:60,difficulty:2,cap:30000,
  desc:{es:'Toca izquierda o derecha para esquivar autos. El centro frena.',en:'Tap left or right to dodge cars. The center brakes.'},
  sim:k=>({raw:(1700+Math.random()*3200)*k}),
  create(dur){
  const W=320,H=160,HOR=58;
  const off=document.createElement('canvas');off.width=W;off.height=H;const o=off.getContext('2d');
  const g={dur,t:0,pos:0,v:0,x:0,steer:0,brake:false,cars:[],nextCar:140,pads:[],nextPad:260,boost:0,turbos:0,fl:[],shake:0,bg:0,over:false,ptrs:new Map(),keys:{},pass:0,hits:0,streak:0,mx:0,bonus:0};
  const CURV=[0,0,0,.8,0,0,-.8,0,0,0,.55,0,-.55,0,0];const curve=s=>{const L2=650,seg=Math.floor(Math.max(0,s)/L2),u=(Math.max(0,s)%L2)/L2;return CURV[seg%CURV.length]*Math.sin(u*Math.PI)};
  const BL={x:24,y:292,w:140,h:84},BR={x:636,y:292,w:140,h:84},BB={x:340,y:322,w:120,h:58};
  g.down=(x,y,id)=>g.ptrs.set(id,x);g.up=id=>g.ptrs.delete(id);g.key=(k,d)=>{g.keys[k]=d};
  g.update=dt=>{
    let Lf=g.keys.ArrowLeft||g.keys.KeyA,R=g.keys.ArrowRight||g.keys.KeyD,B=g.keys.ArrowDown||g.keys.Space;
    g.ptrs.forEach(px=>{if(px<300)Lf=true;else if(px>500)R=true;else B=true});
    g.steer=(R?1:0)-(Lf?1:0);g.brake=!!B;
    g.boost=Math.max(0,g.boost-dt);
    const offr=Math.abs(g.x)>1.08,vmax=offr?28:g.boost>0?128:85;
    if(B)g.v-=60*dt;else if(g.v<vmax)g.v+=(offr?10:g.boost>0?70:17)*dt*(g.boost>0?1:(1.15-g.v/100));
    if(g.v>vmax)g.v-=45*dt;g.v=Math.max(0,g.v);
    const k=g.v/85;g.x+=g.steer*1.9*dt*(.35+k);g.x-=curve(g.pos+12)*k*k*.8*dt;g.x=clamp(g.x,-2.2,2.2);
    g.pos+=g.v*dt;g.bg+=curve(g.pos+12)*g.v*dt*.12;g.shake=Math.max(0,g.shake-dt);
    if(g.pos+320>g.nextCar){g.cars.push({s:g.nextCar,lane:[-.55,0,.55][Math.random()*3|0]+rand(-.08,.08),v:rand(22,38),c:['#F4F4F4','#C9D2DC','#7FD1C7','#F7A8C4','#B9A6F0'][Math.random()*5|0]});g.nextCar+=Math.max(55,140-g.t*.5)+Math.random()*80}
    g.cars.forEach(c=>{c.s+=c.v*dt;const z=c.s-g.pos;
      if(!c.hit&&z>0&&z<4.2&&Math.abs(c.lane-g.x)<.33){c.hit=1;g.hits++;g.streak=0;g.v*=.35;g.shake=.45;tone(90,.3,'square',.08,.5);c.s=g.pos+9;c.v+=14}
      if(!c.hit&&!c.passed&&z<0){c.passed=1;g.pass++;g.streak++;g.mx=Math.max(g.mx,g.streak);g.bonus+=25*comboMult(g.streak);if(comboMult(g.streak)>comboMult(g.streak-1))SFX.combo()}});
    if(g.pos+320>g.nextPad){g.pads.push({s:g.nextPad,lane:[-.55,0,.55][Math.random()*3|0]});g.nextPad+=180+Math.random()*220}
    g.pads.forEach(p=>{const z=p.s-g.pos;if(!p.used&&z<3.5&&z>-6&&Math.abs(p.lane-g.x)<.32){p.used=1;g.boost=2.4;g.turbos++;g.bonus+=100;floatTxt(g.fl,400,170,'TURBO +100','#FFD23F',28);tone(300,.35,'sawtooth',.06,3.2)}});
    g.pads=g.pads.filter(p=>p.s-g.pos>-12);
    g.cars=g.cars.filter(c=>c.s-g.pos>-10);
  };
  g.score=()=>Math.round(g.pos)+g.bonus;g.acc=()=>g.pass+g.hits?g.pass/(g.pass+g.hits):null;g.maxCombo=()=>g.mx;
  g.auto=dt=>{let tx=0;g.cars.filter(c=>c.s-g.pos>2&&c.s-g.pos<45).forEach(c=>{if(Math.abs(c.lane-tx)<.45)tx=c.lane>0?-.6:.6});
    g.ptrs.delete('bot');if(g.x<tx-.1){g.ptrs.set('bot',700);g.hand={x:706,y:334,p:.2,hold:1}}else if(g.x>tx+.1){g.ptrs.set('bot',100);g.hand={x:94,y:334,p:.2,hold:1}}else if(g.hand)g.hand.hold=0};
  function palm(x,y,s){
    const h=s*1.15,tw=Math.max(1,Math.round(s*.07));
    o.fillStyle='#8A5A35';for(let i=0;i<h;i++){o.fillRect(Math.round(x+Math.sin(i/h*1.6)*s*.12),Math.round(y-i),tw,1)}
    const tx2=x+Math.sin(1.6)*s*.12,ty=y-h;o.fillStyle='#2E9E4F';
    [[-.55,.05],[.55,.05],[-.3,-.18],[.3,-.18],[0,-.22]].forEach(([a,b])=>{o.beginPath();o.ellipse(tx2+a*s*.6,ty+b*s*.6+2,s*.38,s*.1,a*.9,0,7);o.fill()});
  }
  function car(x,y,w,col){
    const h=w*.5;x=Math.round(x-w/2);y=Math.round(y-h);w=Math.round(w);
    o.fillStyle='#1F2A3A';o.fillRect(x-1,y+Math.round(h*.35)-1,w+2,Math.round(h*.65)+2);
    o.fillStyle=col;o.fillRect(x,y+Math.round(h*.35),w,Math.round(h*.65));
    o.fillStyle='#1F2A3A';o.fillRect(x+Math.round(w*.18)-1,y-1,Math.round(w*.64)+2,Math.round(h*.4)+2);
    o.fillStyle='#5B7896';o.fillRect(x+Math.round(w*.18),y,Math.round(w*.64),Math.round(h*.4));
    const lw=Math.max(1,Math.round(w*.14)),lh=Math.max(1,Math.round(h*.14));
    o.fillStyle='#E85A5A';o.fillRect(x+1,y+Math.round(h*.5),lw,lh);o.fillRect(x+w-1-lw,y+Math.round(h*.5),lw,lh);
  }
  function player(){
    const tt=Math.round(g.steer*3),x=W/2-26+tt,y=H-30;
    o.fillStyle='#1F2A3A';o.fillRect(x-1,y+7,54,22);o.fillRect(x+3,y+26,10,5);o.fillRect(x+39,y+26,10,5);
    o.fillStyle='#FFD23F';o.fillRect(x,y+8,52,16);
    o.fillStyle='#F5B400';o.fillRect(x,y+20,52,4);
    o.fillStyle='#1F2A3A';o.fillRect(x+9,y-1,34,11);
    o.fillStyle='#7CC6EE';o.fillRect(x+10,y,32,8);
    o.fillStyle='#fff';o.fillRect(x+12,y+1,6,2);
    o.fillStyle='#E85A5A';o.fillRect(x+3,y+12,8,4);o.fillRect(x+41,y+12,8,4);
    o.fillStyle='#1F2A3A';o.fillRect(x+20,y+15,12,6);
    o.fillStyle='#fff';o.fillRect(x+22,y+16,8,4);
    if(g.v>60&&!g.brake){o.fillStyle='#ffffff90';o.fillRect(x+6,y+31,3,2);o.fillRect(x+43,y+31,3,2)}
  }
  g.draw=c=>{
    o.fillStyle='#3FA9EE';o.fillRect(0,0,W,HOR);o.fillStyle='#7CC6EE';o.fillRect(0,HOR-26,W,20);
    const cb=-g.bg*.4;o.fillStyle='#fff';[[20,12,30],[120,20,40],[230,8,26],[300,24,34]].forEach(([x,y,w])=>{const xx=((x+cb)%400+400)%400-40;o.fillRect(xx,y,w,6);o.fillRect(xx+6,y-4,w-12,4)});
    o.fillStyle='#9BB6CF';const hb=-g.bg*.8;for(let i=0;i<6;i++){const x=((i*70+hb)%420+420)%420-50;o.beginPath();o.moveTo(x,HOR-6);o.lineTo(x+30,HOR-24-(i%3)*5);o.lineTo(x+60,HOR-6);o.fill()}
    o.fillStyle='#2F7FD0';o.fillRect(0,HOR-6,W,7);o.fillStyle='#BFE4FA';for(let i=0;i<10;i++)o.fillRect(((i*37-g.bg*1.2)%W+W)%W,HOR-4+(i%3),6,1);
    const cx=[],hw=[];let dx=0,ddx=0;
    for(let y=H-1;y>HOR;y--){
      const dy=y-HOR,z=400/dy,s=g.pos+z;ddx+=curve(s)*.016;dx+=ddx;
      const half=dy*1.55,ctr=W/2-g.x*half+dx;cx[y]=ctr;hw[y]=half;const alt=Math.floor(s/7)%2;
      o.fillStyle=alt?'#F2D79C':'#E7C985';o.fillRect(0,y,W,1);
      const rw=Math.max(1,half*.12);o.fillStyle=alt?'#E85A5A':'#FFFFFF';o.fillRect(ctr-half-rw,y,rw,1);o.fillRect(ctr+half,y,rw,1);
      o.fillStyle=alt?'#7B8290':'#737A87';o.fillRect(ctr-half,y,half*2,1);
      if(alt){o.fillStyle='#fff';const lw=Math.max(1,half*.03);o.fillRect(ctr-half*.33-lw/2,y,lw,1);o.fillRect(ctr+half*.33-lw/2,y,lw,1)}
      for(const p of g.pads){const u=s-p.s;if(u>=0&&u<9){const pw=half*.3,px=ctr+p.lane*half;const band=Math.floor(u/1.5)%3;
        o.fillStyle=p.used?'#9AA3AF':band===0?'#FF7A2F':band===1?'#FFD23F':'#FFF4B0';const k=(u%1.5)/1.5;o.fillRect(px-pw/2+pw*.5*k*.0,y,pw,1);
        o.fillStyle=p.used?'#7B8290':'#E8590C';const cw=Math.max(1,pw*.22);o.fillRect(px-cw/2,y,cw,1)}}
    }
    const spr=[];
    for(let s=Math.ceil((g.pos+3)/30)*30;s<g.pos+240;s+=30)spr.push({z:s-g.pos,kind:'palm',side:((s/30)%2?1:-1)});
    g.cars.forEach(k=>spr.push({z:k.s-g.pos,kind:'car',k}));
    spr.filter(p=>p.z>2.5).sort((a,b)=>b.z-a.z).forEach(p=>{
      const dy=400/p.z,y=Math.round(HOR+dy);if(y<=HOR||y>=H)return;
      if(p.kind==='palm')palm(cx[y]+p.side*hw[y]*1.5,y,dy*1.1);
      else car(cx[y]+p.k.lane*hw[y],y,hw[y]*.46,p.k.c);
    });
    if(g.boost>0){o.fillStyle='rgba(255,255,255,.75)';for(let i=0;i<14;i++){const yy=HOR+8+((i*37+g.pos*9)%((H-HOR)-10)),xx=(i*53)%W;o.fillRect(xx<W/2?xx*.5:W-(W-xx)*.5,yy,1,6)}}
    player();
    if(g.boost>0){const x=W/2,y=H-2;o.fillStyle=(g.t*20|0)%2?'#FFD23F':'#FF7A2F';o.fillRect(x-22,y-2,6,3+((g.t*30|0)%3));o.fillRect(x+16,y-2,6,3+((g.t*30|0)%3))}
    const sx=g.shake>0?rand(-8,8):0,sy=g.shake>0?rand(-5,5):0;
    c.imageSmoothingEnabled=false;c.drawImage(off,sx,sy,800,400);
    hud(c,g,{label:t('hud.dist'),value:(g.score()/1000).toFixed(2)+' KM',combo:g.streak});
    const P='Press Start 2P',seg=14,on=Math.round(g.v/85*seg);
    for(let i=0;i<seg;i++){const y=268-i*11;c.fillStyle=i<on?`hsl(${120-i*8.5},85%,52%)`:'rgba(31,42,58,.45)';c.fillRect(24,y,26,8);c.strokeStyle=INK;c.lineWidth=2;c.strokeRect(24,y,26,8)}
    txt(c,Math.round(g.v*3.6)+' KM/H',60,268,12,{font:P,sw:.5});
    const arrow=(r,dir,on2)=>{rr(c,r.x,r.y+(on2?4:0),r.w,r.h,14);c.fillStyle=on2?'rgba(255,210,63,.85)':'rgba(255,253,246,.55)';c.fill();c.lineWidth=3;c.strokeStyle=INK;c.stroke();
      const mx=r.x+r.w/2,my=r.y+r.h/2+(on2?4:0);c.beginPath();c.moveTo(mx+dir*16,my);c.lineTo(mx-dir*12,my-18);c.lineTo(mx-dir*12,my+18);c.closePath();c.fillStyle=INK;c.fill()};
    arrow(BL,-1,g.steer<0);arrow(BR,1,g.steer>0);
    rr(c,BB.x,BB.y+(g.brake?4:0),BB.w,BB.h,14);c.fillStyle=g.brake?'rgba(232,90,90,.9)':'rgba(255,253,246,.55)';c.fill();c.lineWidth=3;c.strokeStyle=INK;c.stroke();
    txt(c,t('car.brake'),400,BB.y+BB.h/2+(g.brake?4:0),12,{align:'center',font:P,stroke:false,fill:INK});
    if(Math.abs(g.x)>1.08)txt(c,t('car.off'),400,130,14,{align:'center',font:P,fill:'#FF7A2F',sw:.5});
    if(g.boost>0)txt(c,'TURBO!',400,100,22,{align:'center',font:P,fill:(g.t*8|0)%2?'#FFD23F':'#FF7A2F',sw:.45});
    drawFloats(c,g.fl,1/60);
  };
  return g;
}});

/* ---------- FASE 1 · Aplasta cucarachas ---------- */
registerGame({id:'cockroach_smash',name:{es:'Aplasta cucarachas',en:'Roach Smash'},category:'reflex',duration:30,difficulty:1,cap:60000,phase:1,
  desc:{es:'Toca las cucarachas antes de que escapen. La dorada vale 500. Tocar el piso resta 100.',en:'Tap the roaches before they escape. Gold is worth 500. Tapping the floor costs 100.'},
  sim:k=>({raw:(1500+Math.random()*8500)*k,acc:rand(.6,1)}),
  create(dur){
  const g={dur,t:0,bugs:[],fx:[],fl:[],pts:0,streak:0,mx:0,hits:0,taps:0,spawn:.5,over:false};
  const maxOn=()=>Math.min(4,2+Math.floor(g.t/10));
  function spawn(){
    const r=Math.random(),type=r<.07?'gold':r<.35?'fast':'norm';
    const life=(type==='gold'?1.1:type==='fast'?1.5:1.9)*Math.max(.55,1-g.t/dur*.45);
    const sp=type==='fast'?rand(150,210):type==='gold'?rand(60,90):rand(25,55);
    g.bugs.push({x:rand(80,720),y:rand(110,360),ang:Math.random()*6.28,sp,type,life,age:0,ph:Math.random()*6,turn:rand(-1.2,1.2)});
  }
  g.update=dt=>{
    g.spawn-=dt;if(g.spawn<=0&&g.bugs.length<maxOn()){spawn();g.spawn=Math.max(.22,.8-g.t/dur*.5)*rand(.6,1.2)}
    g.bugs.forEach(b=>{b.age+=dt;b.ph+=dt*(b.sp/7+8);b.ang+=b.turn*dt;b.x+=Math.cos(b.ang)*b.sp*dt;b.y+=Math.sin(b.ang)*b.sp*dt;
      if(b.x<50||b.x>750){b.ang=Math.PI-b.ang;b.x=clamp(b.x,50,750)}if(b.y<100||b.y>375){b.ang=-b.ang;b.y=clamp(b.y,100,375)}});
    for(let i=g.bugs.length-1;i>=0;i--)if(g.bugs[i].age>g.bugs[i].life){g.bugs.splice(i,1);g.streak=0}
    g.fx.forEach(f=>f.l-=dt*1.6);g.fx=g.fx.filter(f=>f.l>0);
  };
  g.down=(x,y)=>{
    g.taps++;let best=null,bd=1e9;
    g.bugs.forEach(b=>{const d=Math.hypot(b.x-x,b.y-y);if(d<bd){bd=d;best=b}});
    if(best&&bd<(best.type==='fast'?50:44)){
      g.hits++;g.streak++;g.mx=Math.max(g.mx,g.streak);const m=comboMult(g.streak);
      const base=best.type==='gold'?500:best.type==='fast'?150:100,gain=base*m;g.pts+=gain;
      g.fx.push({x:best.x,y:best.y,l:1,gold:best.type==='gold'});floatTxt(g.fl,best.x,best.y-36,'+'+gain,best.type==='gold'?'#FFD23F':'#fff',24);
      g.bugs.splice(g.bugs.indexOf(best),1);
      if(m>comboMult(g.streak-1))SFX.combo();else SFX.hit();
    }else{g.pts-=100;g.streak=0;floatTxt(g.fl,x,y-20,'-100','#E85A5A',22);SFX.miss()}
  };
  g.score=()=>g.pts;g.acc=()=>g.taps?g.hits/g.taps:null;g.maxCombo=()=>g.mx;
  g.auto=dt=>{g._bt=(g._bt||0)-dt;if(g._bt>0)return;const b=g.bugs.filter(b=>b.age>.3).sort((a,b)=>(b.type==='gold')-(a.type==='gold'))[0];if(b){botTap(g,b.x,b.y);g._bt=.42}};
  function bug(c,b){
    const fade=b.life-b.age<.35&&(b.age*14|0)%2;if(fade)c.globalAlpha=.45;
    c.save();c.translate(b.x,b.y);c.rotate(b.ang+Math.PI/2);
    const s=b.type==='gold'?1.15:1,body=b.type==='gold'?'#FFD23F':b.type==='fast'?'#C9662B':'#8A5A35';
    c.scale(s,s);c.strokeStyle=INK;c.lineWidth=3;c.lineCap='round';
    for(let i=-1;i<=1;i++){const w=Math.sin(b.ph+i*1.4)*5;c.beginPath();c.moveTo(-10,i*8);c.lineTo(-22,i*10+w);c.stroke();c.beginPath();c.moveTo(10,i*8);c.lineTo(22,i*10-w);c.stroke()}
    c.beginPath();c.moveTo(-4,-18);c.quadraticCurveTo(-10,-30,-14,-30);c.moveTo(4,-18);c.quadraticCurveTo(10,-30,14,-30);c.stroke();
    c.beginPath();c.ellipse(0,4,13,18,0,0,7);c.fillStyle=body;c.fill();c.stroke();
    c.beginPath();c.moveTo(0,-10);c.lineTo(0,20);c.lineWidth=2;c.stroke();
    c.beginPath();c.arc(0,-15,8,0,7);c.fillStyle=body;c.fill();c.lineWidth=3;c.stroke();
    c.fillStyle='#fff';c.beginPath();c.arc(-3.5,-17,3,0,7);c.arc(3.5,-17,3,0,7);c.fill();
    c.fillStyle=INK;c.beginPath();c.arc(-3.5,-18,1.4,0,7);c.arc(3.5,-18,1.4,0,7);c.fill();
    if(b.type==='fast'){c.strokeStyle='rgba(255,255,255,.9)';c.lineWidth=2;c.beginPath();c.moveTo(-8,30);c.lineTo(-8,40);c.moveTo(0,32);c.lineTo(0,44);c.moveTo(8,30);c.lineTo(8,40);c.stroke()}
    c.restore();c.globalAlpha=1;
    if(b.type==='gold'){c.fillStyle='#fff';const a=b.age*6;c.beginPath();c.arc(b.x+Math.cos(a)*26,b.y+Math.sin(a)*26,3,0,7);c.fill()}
  }
  g.draw=c=>{
    officeFloor(c);
    rr(c,560,250,250,170,14);c.fillStyle='#C99A6B';c.fill();c.lineWidth=4;c.strokeStyle=INK;c.stroke();
    rr(c,600,230,90,26,6);c.fillStyle='#fff';c.fill();c.stroke();
    g.fx.forEach(f=>{c.save();c.translate(f.x,f.y);c.scale(1+(1-f.l)*.4,1+(1-f.l)*.4);c.globalAlpha=f.l;c.fillStyle=f.gold?'#FFD23F':'#FFF4B8';c.strokeStyle=INK;c.lineWidth=3;
      c.beginPath();for(let i=0;i<16;i++){const r=i%2?16:32,a=i/16*6.28;c.lineTo(Math.cos(a)*r,Math.sin(a)*r)}c.closePath();c.fill();c.stroke();
      txt(c,t('roach.splat'),0,2,13,{align:'center',fill:'#E85A5A',sw:.3});c.restore()});
    g.bugs.forEach(b=>bug(c,b));
    drawFloats(c,g.fl,1/60);
    hud(c,g,{combo:g.streak});
  };
  return g;
}});

/* ---------- FASE 1 · Tiro rápido ---------- */
registerGame({id:'quick_shot',name:{es:'Tiro rápido',en:'Quick Shot'},category:'precision',duration:30,difficulty:2,cap:40000,phase:1,
  desc:{es:'Toca cada diana lo más rápido que puedas. Evita las moradas: restan 500.',en:'Tap each target as fast as you can. Avoid the purple ones: they cost 500.'},
  sim:k=>({raw:(1200+Math.random()*7000)*k,acc:rand(.55,1)}),
  create(dur){
  const RT=[300,500,800]; /* PERFECT < 300 ms, GREAT < 500, GOOD < 800, MISS después */
  const g={dur,t:0,tg:null,wait:.9,pts:0,streak:0,mx:0,hits:0,shots:0,fl:[],last:null,lastT:0,over:false};
  g.update=dt=>{
    g.lastT-=dt;
    if(!g.tg){g.wait-=dt;if(g.wait<=0){const fake=g.t>3&&Math.random()<.2;g.tg={x:rand(90,710),y:rand(120,345),r:Math.max(28,46-g.t/dur*16),fake,age:0,ttl:fake?1.1:RT[2]/1000}}}
    else{g.tg.age+=dt;if(g.tg.age>g.tg.ttl){if(!g.tg.fake){g.shots++;g.streak=0;g.last={k:'MISS',c:'#E85A5A'};g.lastT=.8;SFX.miss()}g.tg=null;g.wait=rand(.35,.95)}}
  };
  g.down=(x,y)=>{
    const tg=g.tg;
    if(tg&&Math.hypot(tg.x-x,tg.y-y)<=tg.r+14){
      if(tg.fake){g.pts-=500;g.streak=0;floatTxt(g.fl,tg.x,tg.y-40,'-500','#E85A5A',26);g.last={k:t('quick.fake'),c:'#9B7BE8'};g.lastT=.8;SFX.miss()}
      else{const ms=tg.age*1000,k=ms<RT[0]?'PERFECT':ms<RT[1]?'GREAT':'GOOD',base={PERFECT:300,GREAT:200,GOOD:100}[k];
        g.hits++;g.shots++;g.streak++;g.mx=Math.max(g.mx,g.streak);const m=comboMult(g.streak),gain=base*m;g.pts+=gain;
        g.last={k:k+' '+Math.round(ms)+' ms',c:k==='PERFECT'?'#FFD23F':k==='GREAT'?'#5BCB4A':'#fff'};g.lastT=.8;floatTxt(g.fl,tg.x,tg.y-40,'+'+gain,'#fff',24);
        if(m>comboMult(g.streak-1))SFX.combo();else SFX.hit()}
      g.tg=null;g.wait=rand(.3,.9);
    }else{g.shots++;g.streak=0;floatTxt(g.fl,x,y-16,'×','#E85A5A',26);tone(220,.06,'square',.03)}
  };
  g.score=()=>g.pts;g.acc=()=>g.shots?g.hits/g.shots:null;g.maxCombo=()=>g.mx;
  g.auto=dt=>{if(g.tg&&!g.tg.fake&&g.tg.age>.32)botTap(g,g.tg.x,g.tg.y)};
  g.draw=c=>{
    const gr=c.createLinearGradient(0,0,0,400);gr.addColorStop(0,'#2F5D73');gr.addColorStop(1,'#244B5E');c.fillStyle=gr;c.fillRect(0,0,800,400);
    c.fillStyle='rgba(255,255,255,.06)';for(let x=0;x<800;x+=80)c.fillRect(x,0,40,400);
    for(let i=0;i<9;i++){c.fillStyle=i%2?'#E85A5A':'#fff';c.beginPath();c.moveTo(i*100-20,0);c.lineTo(i*100+80,0);c.lineTo(i*100+60,44);c.lineTo(i*100,44);c.closePath();c.fill()}
    c.strokeStyle=INK;c.lineWidth=4;c.beginPath();c.moveTo(0,44);c.lineTo(800,44);c.stroke();
    plank(c,-10,372,820,40,'#C99A6B');
    const tg=g.tg;
    if(tg){const sc=Math.min(1,tg.age/.08),r=tg.r*sc;c.save();c.translate(tg.x,tg.y);
      if(tg.fake){c.beginPath();c.arc(0,0,r,0,7);c.fillStyle='#9B7BE8';c.fill();c.lineWidth=4;c.strokeStyle=INK;c.stroke();
        c.beginPath();c.arc(0,0,r*.62,0,7);c.fillStyle='#C3B0F5';c.fill();c.stroke();
        c.strokeStyle='#fff';c.lineWidth=6;c.beginPath();c.moveTo(-r*.35,-r*.35);c.lineTo(r*.35,r*.35);c.moveTo(r*.35,-r*.35);c.lineTo(-r*.35,r*.35);c.stroke()}
      else{[[1,'#E85A5A'],[.68,'#fff'],[.38,'#E85A5A']].forEach(([f,col])=>{c.beginPath();c.arc(0,0,r*f,0,7);c.fillStyle=col;c.fill();c.lineWidth=4;c.strokeStyle=INK;c.stroke()});
        c.beginPath();c.arc(0,0,r*.12,0,7);c.fillStyle='#FFD23F';c.fill();
        c.beginPath();c.arc(0,0,r+9,-Math.PI/2,-Math.PI/2+6.283*(1-tg.age/tg.ttl));c.strokeStyle='#FFD23F';c.lineWidth=5;c.stroke()}
      c.restore()}
    drawFloats(c,g.fl,1/60);
    if(g.last&&g.lastT>0)txt(c,g.last.k,400,90,24,{align:'center',fill:g.last.c,font:'Press Start 2P',sw:.4});
    hud(c,g,{combo:g.streak});
  };
  return g;
}});

/* ---------- FASE 2 · Rompe bloques ---------- */
registerGame({id:'brick_breaker',name:{es:'Rompe bloques',en:'Brick Breaker'},category:'precision',duration:60,difficulty:2,cap:20000,phase:2,
  desc:{es:'Arrastra para mover la barra. Rompe bloques seguidos para subir el combo.',en:'Drag to move the paddle. Break bricks in a row to raise the combo.'},
  sim:k=>({raw:(300+Math.random()*3500)*k,acc:rand(.5,1)}),
  create(dur){
  const PY=366,COLS=10,ROWS=5,BW=68,BH=22,GAP=5,BX=400-(COLS*(BW+GAP)-GAP)/2,BY=82;
  const g={dur,t:0,pw:124,px:400,tx:400,balls:[],bricks:[],pts:0,streak:0,mx:0,lives:3,hits:0,lost:0,speed:340,boostT:0,fl:[],over:false,msg:'',msgT:0,keys:{}};
  function wall(){g.bricks=[];for(let r=0;r<ROWS;r++)for(let col=0;col<COLS;col++){const rnd=Math.random();g.bricks.push({x:BX+col*(BW+GAP),y:BY+r*(BH+GAP),c:PLANK[(r+col)%4],sp:rnd<.05?'multi':rnd<.1?'fast':rnd<.17?'gold':rnd<.22?'bonus':null})}}
  wall();
  const stuck=()=>g.balls.push({x:g.px,y:PY-12,vx:0,vy:0,stuck:true});stuck();
  function launch(){g.balls.forEach(b=>{if(b.stuck){b.stuck=false;const a=rand(-.5,.5);b.vx=Math.sin(a)*g.speed;b.vy=-Math.cos(a)*g.speed}})}
  let dragId=null;
  g.down=(x,y,id)=>{dragId=id;g.tx=x;launch()};g.move=(x,y,id)=>{if(id===dragId)g.tx=x};g.up=id=>{if(id===dragId)dragId=null};
  g.key=(k,d)=>{g.keys[k]=d;if(d&&(k==='Space'||k==='ArrowUp'))launch()};
  g.update=dt=>{
    g.msgT-=dt;g.boostT-=dt;
    if(g.keys.ArrowLeft)g.tx=g.px-400*dt*3;if(g.keys.ArrowRight)g.tx=g.px+400*dt*3;
    g.px+= (clamp(g.tx,g.pw/2+10,790-g.pw/2)-g.px)*Math.min(1,dt*18);
    const spMul=g.boostT>0?1.25:1;
    for(const b of g.balls){
      if(b.stuck){b.x=g.px;b.y=PY-12;continue}
      const sp=Math.hypot(b.vx,b.vy),steps=Math.ceil(sp*spMul*dt/6);
      for(let s=0;s<steps;s++){
        b.x+=b.vx*spMul*dt/steps;b.y+=b.vy*spMul*dt/steps;
        if(b.x<18){b.x=18;b.vx=Math.abs(b.vx)}if(b.x>782){b.x=782;b.vx=-Math.abs(b.vx)}if(b.y<58){b.y=58;b.vy=Math.abs(b.vy)}
        if(b.vy>0&&b.y>PY-9&&b.y<PY+10&&Math.abs(b.x-g.px)<g.pw/2+8){const off=(b.x-g.px)/(g.pw/2),a=off*1.05,v=Math.hypot(b.vx,b.vy);b.vx=Math.sin(a)*v;b.vy=-Math.cos(a)*v;b.y=PY-9;g.streak=0;g.hits++;SFX.click()}
        for(let i=0;i<g.bricks.length;i++){const k=g.bricks[i];
          if(b.x+8>k.x&&b.x-8<k.x+BW&&b.y+8>k.y&&b.y-8<k.y+BH){
            const ox=Math.min(b.x+8-k.x,k.x+BW-(b.x-8)),oy=Math.min(b.y+8-k.y,k.y+BH-(b.y-8));
            if(ox<oy)b.vx=-b.vx;else b.vy=-b.vy;
            g.bricks.splice(i,1);g.streak++;g.mx=Math.max(g.mx,g.streak);
            const m=g.streak>=10?4:g.streak>=5?3:g.streak>=2?2:1;let gain=10*m;
            if(k.sp==='gold')gain+=100;if(k.sp==='bonus')gain+=50;
            if(k.sp==='multi'){g.msg=t('brick.multi');g.msgT=1;const v=Math.hypot(b.vx,b.vy);[-.5,.5].forEach(a=>g.balls.push({x:b.x,y:b.y,vx:Math.sin(a)*v,vy:-Math.abs(Math.cos(a)*v),stuck:false}))}
            if(k.sp==='fast'){g.msg=t('brick.fast');g.msgT=1;g.boostT=5;gain*=2}
            g.pts+=gain;floatTxt(g.fl,k.x+BW/2,k.y,'+'+gain,k.sp?'#FFD23F':'#fff',18);
            if(m>(g.streak-1>=10?4:g.streak-1>=5?3:g.streak-1>=2?2:1))SFX.combo();else tone(520+g.streak*20,.05,'square',.04);
            break;
          }}
      }
    }
    const before=g.balls.length;g.balls=g.balls.filter(b=>b.y<420);
    if(g.balls.length===0&&before>0){g.lives--;g.lost++;g.streak=0;SFX.miss();g.msg=t('brick.lost');g.msgT=1;if(g.lives<=0){g.over=true;return}stuck()}
    if(!g.bricks.length){g.pts+=200;g.msg=t('brick.clear');g.msgT=1.3;SFX.levelup();g.speed=Math.min(520,g.speed+40);wall()}
  };
  g.score=()=>g.pts;g.acc=()=>g.hits+g.lost?g.hits/(g.hits+g.lost):null;g.maxCombo=()=>g.mx;
  g.auto=dt=>{if(g.balls.some(b=>b.stuck)){botTap(g,g.px,300);return}const b=g.balls.slice().sort((a,b)=>b.y-a.y)[0];if(b){g.tx=b.x+(b.vx>0?8:-8);g.hand={x:g.px,y:384,p:0,hold:1}}};
  g.draw=c=>{
    scene(c,0);c.fillStyle='rgba(31,42,58,.35)';c.fillRect(0,0,800,400);
    g.bricks.forEach(k=>{plank(c,k.x,k.y,BW,BH,k.sp==='gold'?'#F5B400':k.c);
      if(k.sp){const cx=k.x+BW/2,cy=k.y+BH/2;c.fillStyle='#fff';c.strokeStyle=INK;c.lineWidth=2;
        if(k.sp==='multi'){[-10,0,10].forEach(o=>{c.beginPath();c.arc(cx+o,cy,4,0,7);c.fill();c.stroke()})}
        else if(k.sp==='fast'){c.beginPath();c.moveTo(cx-6,cy-7);c.lineTo(cx+2,cy-1);c.lineTo(cx-2,cy+1);c.lineTo(cx+6,cy+7);c.lineTo(cx-2,cy+1);c.lineTo(cx+2,cy-1);c.closePath();c.fill();c.stroke()}
        else{c.beginPath();for(let i=0;i<10;i++){const r=i%2?3:7,a=-Math.PI/2+i*Math.PI/5;c.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r)}c.closePath();c.fill();c.stroke()}}});
    rr(c,g.px-g.pw/2,PY+6,g.pw,16,8);c.fillStyle=INK;c.fill();
    rr(c,g.px-g.pw/2,PY,g.pw,16,8);c.fillStyle='#FFD23F';c.fill();c.lineWidth=4;c.strokeStyle=INK;c.stroke();
    g.balls.forEach(b=>{c.beginPath();c.arc(b.x,b.y,8,0,7);c.fillStyle=g.boostT>0?'#FF7A2F':'#fff';c.fill();c.lineWidth=3;c.strokeStyle=INK;c.stroke()});
    drawFloats(c,g.fl,1/60);
    if(g.balls.some(b=>b.stuck))txt(c,t('brick.launch'),400,300,20,{align:'center'});
    if(g.msgT>0)txt(c,g.msg,400,236,26,{align:'center',fill:'#FFD23F'});
    const m=g.streak>=10?4:g.streak>=5?3:g.streak>=2?2:1;
    hud(c,g,{lives:g.lives,lives0:3,combo:g.streak>=2?g.streak:0,mult:m});
  };
  return g;
}});

/* ---------- FASE 2 · No toques el rojo ---------- */
registerGame({id:'dont_touch_red',name:{es:'No toques el rojo',en:'Don\'t Touch Red'},category:'decision',duration:45,difficulty:1,cap:40000,phase:2,
  desc:{es:'Toca todos los verdes antes de que se acabe el tiempo. Tocar rojo resta 500.',en:'Tap all the greens before time runs out. Touching red costs 500.'},
  sim:k=>({raw:(800+Math.random()*8000)*k,acc:rand(.6,1)}),
  create(dur){
  const ROWS=3,TW=124,TH=82,GP=14,Y0=104;
  const g={dur,t:0,tiles:[],wave:0,cols:3,lim:5,left:5,mult:1,clears:0,mx:0,pts:0,good:0,bad:0,fl:[],msg:'',msgT:0,shake:0,pause:1,over:false};
  /* Dificultad gradual: empieza con 3x3, pocos rojos y 5 s por ronda; termina en 3x5, más rojos y ~1.6 s */
  function newWave(){g.wave++;g.cols=g.wave<=4?3:g.wave<=9?4:5;const n=g.cols*ROWS;
    const nRed=Math.min(n-3,(g.wave<=2?2:g.wave<=5?3:4)+(Math.random()*2|0)+Math.floor(g.wave/7));
    const idx=[...Array(n).keys()].sort(()=>Math.random()-.5);
    g.tiles=idx.map((v,i)=>({i:v,red:i<nRed,done:false})).sort((a,b)=>a.i-b.i);
    g.lim=Math.max(1.6,5-g.wave*.2);g.left=g.lim}
  newWave();
  const rect=i=>{const X0=400-(g.cols*(TW+GP)-GP)/2;return{x:X0+(i%g.cols)*(TW+GP),y:Y0+Math.floor(i/g.cols)*(TH+GP)}};
  g.update=dt=>{g.msgT-=dt;g.shake=Math.max(0,g.shake-dt);
    if(g.pause>0){g.pause-=dt;if(g.pause<=0&&g.needWave){g.needWave=false;newWave()}return}
    g.left-=dt;if(g.left<=0){g.clears=0;g.mult=1;g.msg=t('red.timeout');g.msgT=.8;SFX.miss();g.pause=.45;g.needWave=true}};
  g.down=(x,y)=>{
    if(g.pause>0)return;
    const tl=g.tiles.find(q=>{const r=rect(q.i);return x>=r.x&&x<=r.x+TW&&y>=r.y&&y<=r.y+TH});if(!tl||tl.done)return;
    const r=rect(tl.i);
    if(tl.red){g.bad++;g.pts-=500;g.clears=0;g.mult=1;g.shake=.35;floatTxt(g.fl,r.x+TW/2,r.y,'-500','#E85A5A',24);g.msg=t('red.bad');g.msgT=.8;SFX.miss();g.pause=.5;g.needWave=true;tl.done=true;return}
    tl.done=true;g.good++;const gain=100*g.mult;g.pts+=gain;floatTxt(g.fl,r.x+TW/2,r.y,'+'+gain,'#fff',20);SFX.click();
    if(g.tiles.every(q=>q.red||q.done)){g.clears++;g.mx=Math.max(g.mx,g.clears);const nm=Math.min(4,1+Math.floor(g.clears/2));if(nm>g.mult)SFX.combo();else SFX.hit();g.mult=nm;g.msg=t('red.clear');g.msgT=.7;g.pause=.35;g.needWave=true}
  };
  g.score=()=>g.pts;g.acc=()=>g.good+g.bad?g.good/(g.good+g.bad):null;g.maxCombo=()=>g.mx;
  g.auto=dt=>{g._bt=(g._bt||0)-dt;if(g.pause>0||g._bt>0)return;const q=g.tiles.find(q=>!q.red&&!q.done);if(q){const r=rect(q.i);botTap(g,r.x+TW/2,r.y+TH/2);g._bt=.38}};
  g.draw=c=>{
    scene(c,0);c.fillStyle='rgba(31,42,58,.25)';c.fillRect(0,0,800,400);
    c.save();if(g.shake>0)c.translate(rand(-7,7),rand(-4,4));
    g.tiles.forEach(q=>{const r=rect(q.i);
      if(!q.done){rr(c,r.x,r.y+6,TW,TH,14);c.fillStyle=INK;c.fill()}
      rr(c,r.x,r.y+(q.done?6:0),TW,TH,14);c.fillStyle=q.red?(q.done?'#B33A3A':'#E85A5A'):(q.done?'#BFE8B6':'#5BCB4A');c.fill();c.lineWidth=4;c.strokeStyle=INK;c.stroke();
      const cx=r.x+TW/2,cy=r.y+TH/2+(q.done?6:0);c.strokeStyle='#fff';c.lineWidth=7;c.lineCap='round';c.beginPath();
      if(q.red){c.moveTo(cx-14,cy-14);c.lineTo(cx+14,cy+14);c.moveTo(cx+14,cy-14);c.lineTo(cx-14,cy+14)}else{c.moveTo(cx-15,cy);c.lineTo(cx-4,cy+11);c.lineTo(cx+16,cy-12)}
      c.stroke()});
    c.restore();
    const w=560,f=g.pause>0?0:clamp(g.left/g.lim,0,1);rr(c,400-w/2,76,w,14,7);c.fillStyle='rgba(255,255,255,.6)';c.fill();c.lineWidth=3;c.strokeStyle=INK;c.stroke();
    if(f>0){rr(c,400-w/2,76,w*f,14,7);c.fillStyle=f<.3?'#E85A5A':'#FFD23F';c.fill()}
    drawFloats(c,g.fl,1/60);
    if(g.t<2.5)txt(c,t('red.hint'),400,392,18,{align:'center'});
    if(g.msgT>0)txt(c,g.msg,400,200,34,{align:'center',fill:'#FFD23F'});
    hud(c,g,{combo:g.mult>1?g.clears+1:0,mult:g.mult});
  };
  return g;
}});

