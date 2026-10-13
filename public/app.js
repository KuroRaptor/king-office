(()=>{
"use strict";
const DEFAULT_PL={"tracks": {"menu": {"file": "menu.mp3", "title": "Menú gamer", "credit": "backgroundmusicmaster · gamer menu"}, "instrucciones": {"file": "instrucciones.mp3", "title": "Pensando (loop)", "credit": "vadim_makes_sound · quiz thinking timer loop"}, "resultados": {"file": "resultados.mp3", "title": "Jazz indie", "credit": "idoberg · fun indie game jazz"}, "final": {"file": "final.mp3", "title": "Retro de montaña", "credit": "the_mountain · retro game"}, "carreras-01": {"file": "carreras-01.mp3", "title": "Carreras 1", "credit": "hitslab · racing car automotive"}, "carreras-02": {"file": "carreras-02.mp3", "title": "Carreras 2", "credit": "mfcc · racing speed action"}, "juego-01": {"file": "juego-01.mp3", "title": "Chiptune 1", "credit": "hitslab · chiptune video game"}, "juego-02": {"file": "juego-02.mp3", "title": "Arcade retro 1", "credit": "mfcc · retro arcade game"}, "juego-03": {"file": "juego-03.mp3", "title": "Chiptune 2", "credit": "tatamusic · chiptune video game"}, "juego-04": {"file": "juego-04.mp3", "title": "Gaming 1", "credit": "hitslab · game gaming video game"}, "juego-05": {"file": "juego-05.mp3", "title": "Arcade retro 2", "credit": "moodmode · retro game arcade"}, "juego-06": {"file": "juego-06.mp3", "title": "Gaming 2", "credit": "tatamusic · game music"}, "juego-07": {"file": "juego-07.mp3", "title": "Gaming 3", "credit": "atlasaudio · game music"}, "juego-08": {"file": "juego-08.mp3", "title": "Gaming 4", "credit": "tatamusic · gaming game video game"}, "juego-09": {"file": "juego-09.mp3", "title": "Bajo potente", "credit": "karumaru · bass go brrr"}, "juego-10": {"file": "juego-10.mp3", "title": "Gaming 5", "credit": "tatamusic · game gaming video game"}, "juego-11": {"file": "juego-11.mp3", "title": "Videojuego corto", "credit": "moodmode · a video game (short)"}, "juego-12": {"file": "juego-12.mp3", "title": "Loop 13", "credit": "xtremefreddy · game music loop 13"}, "juego-13": {"file": "juego-13.mp3", "title": "8 bits", "credit": "moodmode · game 8-bit on (short)"}, "juego-14": {"file": "juego-14.mp3", "title": "Desafío", "credit": "u_9gm93txock · game challenge scene"}, "juego-15": {"file": "juego-15.mp3", "title": "Loop 17", "credit": "xtremefreddy · game music loop 17"}, "juego-16": {"file": "juego-16.mp3", "title": "Gaming 6", "credit": "mfcc · game music"}}, "moments": {"lobby": ["menu"], "intro": ["instrucciones"], "play": ["juego-01", "juego-02", "juego-03", "juego-04", "juego-05", "juego-06", "juego-07", "juego-08", "juego-09", "juego-10", "juego-11", "juego-12", "juego-13", "juego-14", "juego-15", "juego-16"], "race": ["carreras-01", "carreras-02"], "results": ["resultados"], "final": ["final"]}, "volume": {"lobby": 0.5, "intro": 0.3, "play": 0.25, "race": 0.25, "results": 0.45, "final": 0.7}, "raceGames": ["carrera", "sky_patrol", "motomamacita"]};

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
 'confirm.reset':'Se borrarán {n} jugadores y sus puntajes. La sala queda lista para otra partida con el mismo código y QR.','confirm.resetYes':'Borrar y reiniciar',
 'btn.close':'Cerrar sala','confirm.close':'La sala se borrará por completo: jugadores, puntajes y código. Los celulares conectados saldrán. No se puede deshacer.','confirm.closeYes':'Cerrar y borrar','err.gone':'Esta sala se cerró o venció. Pide el código nuevo en la pantalla grande.',
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
 'confirm.reset':'{n} players and their scores will be deleted. The room stays ready for another game with the same code and QR.','confirm.resetYes':'Delete and reset',
 'btn.close':'Close room','confirm.close':'The room will be deleted completely: players, scores and code. Connected phones will leave. This cannot be undone.','confirm.closeYes':'Close and delete','err.gone':'This room was closed or expired. Ask for the new code on the big screen.',
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

/* Instrucciones de cada juego: control, qué suma y qué resta */
const TIPS={
 tablita:{ctrlIcon:'tap',tips:{es:{ctrl:'Toca la pantalla para saltar',plus:'+10 por cada tablita · más si encadenas varias',minus:'Si caes entre tablitas pierdes una vida (tienes 3)'},en:{ctrl:'Tap the screen to jump',plus:'+10 per plank · more if you chain them',minus:'Falling between planks costs a life (you have 3)'}}},
 avion:{ctrlIcon:'hold',tips:{es:{ctrl:'Mantén presionado para subir; suelta para bajar',plus:'Cada metro suma · +20 por cada arco que cruzas',minus:'Si chocas con un arco, una grulla, el suelo o el techo, se acaba'},en:{ctrl:'Hold to climb; release to drop',plus:'Every meter counts · +20 per arch you pass',minus:'Hitting an arch, a crane, the floor or ceiling ends it'}}},
 carrera:{ctrlIcon:'buttons',tips:{es:{ctrl:'Toca IZQUIERDA o DERECHA para mover el auto; el centro frena',plus:'Cada metro suma · bono por rebasar autos · pasa sobre las flechas de TURBO: +100 y mucha velocidad',minus:'Chocar o salirte del camino te frena mucho'},en:{ctrl:'Tap LEFT or RIGHT to steer; the center brakes',plus:'Every meter counts · bonus for passing cars · drive over the TURBO arrows: +100 and a burst of speed',minus:'Crashing or going off-road slows you down'}}},
 cockroach_smash:{ctrlIcon:'tap',tips:{es:{ctrl:'Toca las cucarachas antes de que escapen',plus:'+100 normal · +150 rápida · +500 dorada',minus:'Tocar el piso vacío resta 100'},en:{ctrl:'Tap the roaches before they escape',plus:'+100 normal · +150 fast · +500 gold',minus:'Tapping the empty floor costs 100'}}},
 quick_shot:{ctrlIcon:'tap',tips:{es:{ctrl:'Toca cada diana roja apenas aparezca',plus:'PERFECT +300 · GREAT +200 · GOOD +100',minus:'Las dianas moradas con X restan 500'},en:{ctrl:'Tap each red target as soon as it appears',plus:'PERFECT +300 · GREAT +200 · GOOD +100',minus:'Purple targets with an X cost 500'}}},
 brick_breaker:{ctrlIcon:'drag',tips:{es:{ctrl:'Arrastra el dedo para mover la barra; toca para lanzar la pelota',plus:'Cada bloque suma · más si rompes varios seguidos',minus:'Si la pelota cae pierdes una vida (tienes 3)'},en:{ctrl:'Drag to move the paddle; tap to launch the ball',plus:'Every brick scores · more if you break several in a row',minus:'If the ball falls you lose a life (you have 3)'}}},
 dont_touch_red:{ctrlIcon:'tap',tips:{es:{ctrl:'Toca todos los cuadros VERDES antes de que se acabe la barra',plus:'+100 por verde · cada ronda limpia sube el multiplicador',minus:'Tocar un ROJO resta 500'},en:{ctrl:'Tap all the GREEN squares before the bar runs out',plus:'+100 per green · each clean round raises the multiplier',minus:'Touching a RED costs 500'}}},
 space_invaders:{ctrlIcon:'drag',tips:{es:{ctrl:'Mantén el dedo en la pantalla: la nave lo sigue y dispara',plus:'+50 normal · +100 rápido · +250 platillo · +1000 jefe',minus:'Si te tocan las balas pierdes una vida (tienes 3)'},en:{ctrl:'Keep your finger on the screen: the ship follows and shoots',plus:'+50 normal · +100 fast · +250 saucer · +1000 boss',minus:'Getting hit costs a life (you have 3)'}}},
 survival_chaos:{ctrlIcon:'buttons',tips:{es:{ctrl:'Toca IZQ. o DER. para cambiar de carril; el centro es SALTAR',plus:'+100 por cada peligro que sobrevives · bono cada 5',minus:'Si algo te alcanza, se acaba el juego'},en:{ctrl:'Tap LEFT or RIGHT to change lanes; the center is JUMP',plus:'+100 for every danger you survive · bonus every 5',minus:'If something gets you, the game ends'}}},
};
REG.forEach(d=>{if(TIPS[d.id]&&!d.tips)Object.assign(d,TIPS[d.id])});
REG.forEach(d=>{d.icon=IC[d.id]||IC.quick_shot});
const GAME=Object.fromEntries(REG.map(d=>[d.id,d]));

/* Motor común: misma interfaz para todos los juegos */
class Engine{
  constructor(def,dur){this.def=def;this.g=def.create(dur);this.g.dur=dur;this.g.t=0;this.paused=false;this.ended=false;this.actions=0;this.realT=0}
  start(){this.paused=false}
  pause(){this.paused=true}
  resume(){this.paused=false}
  update(dt){if(this.paused||this.ended)return;this.realT+=dt;this.g.t+=dt;this.g.update(dt)}
  render(c){this.g.draw(c)}
  handleInput(type,a,b,id){const g=this.g;if(this.ended)return;if(type==='down'||(type==='key'&&b))this.actions++;
    if(type==='down'&&g.down)g.down(a,b,id);else if(type==='up'&&g.up)g.up(id,a,b);else if(type==='move'&&g.move)g.move(a,b,id);else if(type==='key'&&g.key)g.key(a,b)}
  end(){this.ended=true}
  get over(){return this.g.over||this.g.t>=this.g.dur}
  getScore(){return clamp(Math.round(this.g.score()),0,this.def.cap)}
  getAccuracy(){const a=this.g.acc?this.g.acc():null;return a==null?null:clamp(a,0,1)}
  getDuration(){return Math.min(this.realT,this.g.dur)}
  getMaxCombo(){return this.g.maxCombo?this.g.maxCombo():0}
}

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

/* =====================================================================
   11. MÚSICA DE FONDO (solo en la pantalla grande)
   Los archivos viven en la carpeta sound-web (subida a Cloudflare Pages)
   y el Worker los sirve en /sound/. playlist.json dice qué suena en cada
   momento; si no carga, se usa la lista incrustada (DEFAULT_PL).
   ===================================================================== */
Object.assign(L.es,{
 'ad.tab.music':'Música','mus.pause':'Pausar música','mus.play':'Poner música','mus.next':'Siguiente',
 'mus.vol':'Volumen de la música: {n}%','mus.hint':'La música suena solo en la computadora que muestra la pantalla grande. Los celulares solo tienen efectos. Si proyectas desde otra computadora, la música suena allá; aquí puedes pausarla.',
 'mus.auto':'Automático (rotar {n})','mus.auto1':'Automático','mus.momentsT':'Qué suena en cada momento',
 'mus.m.lobby':'Sala de espera (QR)','mus.m.intro':'Instrucciones','mus.m.play':'Juegos','mus.m.race':'Carrera y Patrulla aérea','mus.m.results':'Resultados','mus.m.final':'Coronación',
 'mus.off':'Música en pausa','mus.none':'Sin música en este momento','mus.blocked':'El navegador espera un clic para sonar. Toca cualquier parte de la pantalla.',
 'mus.missing':'No se encontró la música. Revisa que subiste la carpeta sound-web a Cloudflare (guía LEEME).','mus.unlock':'Activar música','mus.muted':'Sonido silenciado con el botón de bocina',
 'mus.now':'Sonando ahora · {m}'
});
Object.assign(L.en,{
 'ad.tab.music':'Music','mus.pause':'Pause music','mus.play':'Play music','mus.next':'Next',
 'mus.vol':'Music volume: {n}%','mus.hint':'Music plays only on the computer showing the big screen. Phones only get sound effects. If you project from another computer, music plays there; you can pause it here.',
 'mus.auto':'Automatic (rotate {n})','mus.auto1':'Automatic','mus.momentsT':'What plays at each moment',
 'mus.m.lobby':'Waiting room (QR)','mus.m.intro':'Instructions','mus.m.play':'Games','mus.m.race':'Race & Sky patrol','mus.m.results':'Results','mus.m.final':'Coronation',
 'mus.off':'Music paused','mus.none':'No music right now','mus.blocked':'The browser needs a click to play sound. Tap anywhere on the screen.',
 'mus.missing':'Music not found. Check that you uploaded the sound-web folder to Cloudflare (see LEEME).','mus.unlock':'Turn on music','mus.muted':'Sound muted with the speaker button',
 'mus.now':'Now playing · {m}'
});

const MUS=(()=>{
  const MOMENTS=['lobby','intro','play','race','results','final'];
  const base=window.KO_SOUND&&!/^__/.test(window.KO_SOUND)?window.KO_SOUND:(MODE==='live'?'/sound/':'sound-web/');
  const PHONE=HAS.phone&&!HAS.screen;   // celular: música bajita solo durante las instrucciones y el juego
  let PL=typeof DEFAULT_PL!=='undefined'?DEFAULT_PL:{tracks:{},moments:{},volume:{},raceGames:[]};
  let st={};try{st=JSON.parse(store.get('ko-music')||'{}')||{}}catch(e){}
  if(PHONE){try{st=JSON.parse(store.get('ko-music-phone')||'{}')||{}}catch(e){st={}}}
  let on=st.on!==false,master=typeof st.master==='number'?st.master:(PHONE?.55:.8),ov=PHONE?{}:(st.ov||{});
  const save=()=>PHONE?store.set('ko-music-phone',JSON.stringify({on})):store.set('ko-music',JSON.stringify({on,master,ov}));
  let moment=null,key=null,curId=null,blocked=false,missing=0,ai=0;
  const rot={};
  const els=[new Audio(),new Audio()];
  els.forEach(a=>{
    a.preload='auto';a.volume=0;
    a.addEventListener('ended',()=>{if(a===els[ai])advance()});
    a.addEventListener('playing',()=>{if(a===els[ai]){missing=0;blocked=false}});
    a.addEventListener('error',()=>{if(a!==els[ai]||!a.getAttribute('src'))return;missing++;if(missing<3&&cands(moment).length>1)setTimeout(advance,800)});
  });
  const cur=()=>els[ai];
  const cands=m=>{if(!m)return[];const o=ov[m];if(o&&o!=='auto'&&PL.tracks[o])return[o];return(PL.moments[m]||[]).filter(id=>PL.tracks[id])};
  const hsh=s=>{let h=7;for(const ch of String(s))h=(h*31+ch.charCodeAt(0))>>>0;return h};
  const pick=(m,manual)=>{const l=cands(m);if(!l.length)return null;if(l.length===1)return l[0];
    if(!manual&&(m==='play'||m==='race'))return l[(hsh(S.code)+Math.max(0,S.round)*5)%l.length];   // misma canción en la pantalla y en todos los celulares
    if(rot[m]===undefined)rot[m]=Math.random()*l.length|0;else rot[m]=(rot[m]+1)%l.length;return l[rot[m]%l.length]};
  const target=()=>on&&!muted&&moment&&curId?Math.max(0,Math.min(1,(PL.volume[moment]??.4)*master)):0;
  function play(id){
    if(!id){curId=null;return}
    ai=1-ai;const a=cur();curId=id;
    try{a.pause()}catch(e){}
    a.loop=cands(moment).length===1;a.volume=0;a.src=base+PL.tracks[id].file;
    try{const pr=a.play();if(pr&&pr.catch)pr.catch(e=>{if(e&&e.name==='NotAllowedError'){blocked=true;renderNow()}})}catch(e){}
    renderNow();
  }
  function advance(){if(!moment||!on)return;const l=cands(moment);if(l.length<=1){const a=cur();a.currentTime=0;a.play().catch(()=>{})}else play(pick(moment))}
  function momentNow(){
    if(!S.code)return null;
    const ph=S.phase;
    if(PHONE){if(!S.me||S.me.kicked||!activeIn(S.me,S.round))return null;
      if(ph==='INTRO')return'intro';
      if(ph==='PLAY'&&typeof phoneState!=='undefined'&&['intro','play'].includes(phoneState)&&!(S.me.res&&S.me.res[S.round]))return(PL.raceGames||[]).includes(S.plan[S.round])?'race':'play';
      return null}
    if(!HAS.screen)return null;
    if(ph==='LOBBY')return'lobby';if(ph==='INTRO')return'intro';if(ph==='RESULTS')return'results';if(ph==='FINAL')return'final';
    if(ph==='PLAY')return(PL.raceGames||[]).includes(S.plan[S.round])?'race':'play';
    return null;
  }
  /* fundido suave entre pistas */
  let lastF=performance.now();
  setInterval(()=>{
    const t0=performance.now(),dt=Math.min(.3,(t0-lastF)/1000);lastF=t0;
    els.forEach(a=>{
      const tv=a===cur()?target():0,v=a.volume,rate=tv>v?dt/1.6:dt/1.1;
      const nv=Math.abs(tv-v)<=rate?tv:v+Math.sign(tv-v)*rate;
      if(nv!==v)a.volume=Math.max(0,Math.min(1,nv));
      if(a!==cur()&&a.volume<=.001&&!a.paused)a.pause();
      if(a===cur()&&!on&&a.volume<=.001&&!a.paused)a.pause();
    });
  },50);
  function update(){
    const m=momentNow(),k=m?m+(['intro','play','race'].includes(m)?':'+S.round:''):null;
    if(k===key)return;key=k;moment=m;
    if(!m){curId=null;renderNow();return}
    if(on)play(pick(m));else{curId=null;renderNow()}
  }
  function unlock(){if(!blocked||!on)return;const a=cur();if(a.getAttribute('src'))a.play().then(()=>{blocked=false;renderNow()}).catch(()=>{})}
  ['pointerdown','keydown','touchend'].forEach(ev=>addEventListener(ev,unlock,{passive:true}));

  /* ---------- panel de quien organiza ---------- */
  const titleOf=id=>id&&PL.tracks[id]?PL.tracks[id].title||id:'—';
  function renderNow(){
    if(!HAS.screen)return;
    const ub=$('#musUnlock');if(ub){ub.hidden=!(blocked&&on&&moment&&!missing);ub.textContent=t('mus.unlock')}
    if(!HAS.admin)return;
    $('#musPlay').textContent=on?t('mus.pause'):t('mus.play');$('#musNext').textContent=t('mus.next');$('#musPlay').setAttribute('aria-pressed',!on);
    $('#musNext').disabled=!on||!moment||cands(moment).length<2;
    $('#musMom').textContent=moment?t('mus.now',{m:t('mus.m.'+moment)}):'';
    $('#musTitle').textContent=!on?t('mus.off'):!moment||!curId?t('mus.none'):titleOf(curId);
    const msg=missing>=1&&on?t('mus.missing'):blocked&&on?t('mus.blocked'):muted?t('mus.muted'):'';
    const w=$('#musWarn');w.textContent=msg;w.hidden=!msg;
    $('#musDisc').classList.toggle('spin',on&&!!curId&&!blocked&&!muted&&!reduce);
  }
  function buildPanel(){
    if(!HAS.admin)return;
    $('#musVol').value=Math.round(master*100);$('#musVolL').textContent=t('mus.vol',{n:Math.round(master*100)});
    const tb=$('.atabs [data-at=music]');if(tb)tb.textContent=t('ad.tab.music');
    $('#musHint').textContent=t('mus.hint');$('#musMomT').textContent=t('mus.momentsT');
    const box=$('#musMoments');box.innerHTML='';
    MOMENTS.forEach(m=>{
      const row=document.createElement('div');row.className='mus-row';
      const id='musSel-'+m,lab=document.createElement('label');lab.htmlFor=id;lab.textContent=t('mus.m.'+m);
      const sel=document.createElement('select');sel.id=id;
      const auto=document.createElement('option');auto.value='auto';const nm=(PL.moments[m]||[]).length;auto.textContent=nm>1?t('mus.auto',{n:nm}):t('mus.auto1');sel.append(auto);
      Object.keys(PL.tracks).forEach(tid=>{const o=document.createElement('option');o.value=tid;o.textContent=titleOf(tid);sel.append(o)});
      sel.value=ov[m]&&PL.tracks[ov[m]]?ov[m]:'auto';
      sel.addEventListener('change',()=>{ov[m]=sel.value;save();if(moment===m&&on)play(pick(m));renderNow()});
      row.append(lab,sel);box.append(row);
    });
    renderNow();
  }
  if(HAS.admin){
    $('#musPlay').addEventListener('click',()=>{on=!on;save();if(on){blocked=false;missing=0;if(moment)play(pick(moment))}renderNow()});
    $('#musNext').addEventListener('click',()=>{if(on&&moment)play(pick(moment,true))});
    $('#musVol').addEventListener('input',e=>{master=e.target.value/100;$('#musVolL').textContent=t('mus.vol',{n:e.target.value});save()});
  }
  const ubtn=$('#musUnlock');if(ubtn)ubtn.addEventListener('click',unlock);
  document.querySelectorAll('.lang-seg button').forEach(b=>b.addEventListener('click',buildPanel));
  document.querySelectorAll('.mute-btn').forEach(b=>b.addEventListener('click',()=>setTimeout(renderNow,0)));

  /* botón de música del celular y botones de prueba de sonido */
  const mpb=$('#musPhone');
  const syncPhoneBtn=()=>{if(mpb){mpb.setAttribute('aria-pressed',on);mpb.setAttribute('aria-label',t('mus.phone'))}};
  if(mpb)mpb.addEventListener('click',()=>{on=!on;save();syncPhoneBtn();if(on&&moment){key=null}});
  syncPhoneBtn();
  function testSound(msgEl){
    audioUnlock();if(muted){muted=false;document.querySelectorAll('.mute-btn').forEach(x=>x.setAttribute('aria-pressed',false))}
    SFX.ready();setTimeout(()=>tone(880,.12,'triangle',.07),350);
    if(blocked){blocked=false;unlock()}
    if(msgEl){msgEl.textContent=t('snd.ok');msgEl.hidden=false}
  }
  const stb=$('#sndTest');if(stb)stb.addEventListener('click',()=>testSound($('#sndMsg')));
  const mtb=$('#musTest');if(mtb)mtb.addEventListener('click',()=>{testSound(null);if(on&&moment&&cur().paused)play(curId||pick(moment))});

  if(HAS.screen||PHONE){
    fetch(base+'playlist.json',{cache:'no-cache'}).then(r=>r.ok?r.json():null).then(j=>{
      if(j&&j.tracks&&j.moments){PL={tracks:j.tracks,moments:j.moments,volume:Object.assign({},PL.volume,j.volume||{}),raceGames:j.raceGames||PL.raceGames};key=null;buildPanel()}
    }).catch(()=>{});
    buildPanel();
    setInterval(()=>{update();if(PHONE)return;const ub=$('#musUnlock'),hid=!(blocked&&on&&moment&&!missing);if(ub.hidden!==hid)renderNow();else if(HAS.admin&&!$('#ap-music').hidden)renderNow()},250);
  }
  return{get state(){return{on,master,moment,curId,blocked,missing,vol:els.map(a=>+a.volume.toFixed(2)),paused:els.map(a=>a.paused),src:els.map(a=>a.getAttribute('src'))}},next:()=>moment&&play(pick(moment))};
})();
window.KO_DEBUG.MUS=MUS;window.KO_DEBUG.SBUF=SBUF;

})();
