/* =====================================================================
   KING OFFICE · Worker de Cloudflare (solo la API)
   La página, los estilos, los juegos y la música son archivos estáticos
   en public/ (Cloudflare los sirve directo). Este archivo atiende /api/*.
   Rutas de la página (todas sirven public/index.html):
     /            inicio: crear una sala o unirse con código
     /host        consola de quien creó la sala (pantalla con QR + controles)
     /pantalla?s= solo la pantalla grande de una sala
     /jugar?s=    celular de los jugadores (el QR lleva aquí)
     /demo        demo sin servidor, con compañeros simulados
   Cualquiera puede crear salas. Cada sala tiene una llave secreta que solo
   conoce el navegador que la creó; sin esa llave nadie puede controlarla.
   Requiere la base D1 enlazada como DB (ver wrangler.jsonc). Las tablas se crean solas.
   ===================================================================== */
/* d: duración por defecto (s) · cap: puntaje máximo aceptado · lo/hi/e: rango de los jugadores de prueba */
const GAMES = {
  tablita:{d:45,cap:20000,lo:300,hi:1800,e:1}, avion:{d:60,cap:20000,lo:60,hi:960,e:.6},
  carrera:{d:60,cap:40000,lo:1700,hi:5600,e:1}, motomamacita:{d:60,cap:60000,lo:1500,hi:7000,e:1},
  cockroach_smash:{d:30,cap:60000,lo:1500,hi:10000,e:1}, quick_shot:{d:30,cap:40000,lo:1200,hi:8200,e:1},
  brick_breaker:{d:60,cap:20000,lo:300,hi:3800,e:1}, dont_touch_red:{d:45,cap:40000,lo:800,hi:8800,e:1},
  space_invaders:{d:60,cap:40000,lo:800,hi:6000,e:1}, survival_chaos:{d:60,cap:20000,lo:300,hi:4500,e:.8},
  coffee_rush:{d:45,cap:30000,lo:400,hi:4000,e:1}, sky_patrol:{d:60,cap:40000,lo:700,hi:5900,e:1},
  printer_rage:{d:45,cap:40000,lo:1200,hi:7200,e:1},
  jump_up:{d:60,cap:40000,lo:400,hi:4200,e:1}, block_rain:{d:75,cap:60000,lo:300,hi:4800,e:1},
  village_defense:{d:75,cap:60000,lo:800,hi:6300,e:1}, rat_run:{d:60,cap:40000,lo:300,hi:4500,e:1},
  color_arrows:{d:45,cap:60000,lo:800,hi:6800,e:1},
  tower_blox:{d:60,cap:60000,lo:500,hi:5000,e:1}, fruit_combo:{d:75,cap:60000,lo:500,hi:5500,e:1},
  archery:{d:45,cap:40000,lo:500,hi:2700,e:1}, bull_jump:{d:45,cap:40000,lo:400,hi:4200,e:1}
};
const BOT_NAMES=['Ana L.','Luis R.','Carla M.','Pedro S.','Sofía G.','Diego P.','Valeria C.','Jorge A.','Camila R.','Andrés F.','Daniela H.','Marco T.','Lucía B.','Fernando V.','Gabriela O.','Ricardo N.','Paola D.','Héctor Z.','Mariela E.','Oscar I.','Karla U.','Esteban Q.','Fabiola J.','Rodrigo K.','Natalia Y.','Mauricio W.','Alejandra X.','Iván M.','Rocío P.','Kevin S.','Melissa A.','Cristian L.','Andrea G.','Erick R.','Patricia C.','Samuel D.','Gloria F.','Javier H.','Lorena B.','Manuel T.','Tatiana V.','Raúl O.','Silvia N.','Bryan E.','Yesenia I.','Walter U.','Dayana Q.','Allan J.','Rebeca K.','Nelson Y.'];
const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS session(code TEXT PRIMARY KEY,host_key TEXT,event TEXT,phase TEXT,round INTEGER,plan TEXT,dur INTEGER,dur_mode TEXT,mode TEXT,rounds INTEGER,cfg TEXT,locked INTEGER,auto INTEGER,intro_end INTEGER,play_end INTEGER,results_end INTEGER,close_at INTEGER,ended_at INTEGER,ver INTEGER,created INTEGER)`,
  `CREATE TABLE IF NOT EXISTS player(id TEXT PRIMARY KEY,code TEXT,name TEXT,name_lc TEXT,av INTEGER,token TEXT,jr INTEGER,bot INTEGER,kicked INTEGER,created INTEGER)`,
  `CREATE INDEX IF NOT EXISTS player_code ON player(code)`,
  `CREATE TABLE IF NOT EXISTS result(pid TEXT,code TEXT,round INTEGER,game TEXT,raw INTEGER,acc REAL,combo INTEGER,dur REAL,actions INTEGER,at INTEGER,PRIMARY KEY(pid,round))`,
  `CREATE INDEX IF NOT EXISTS result_code ON result(code,round)`,
  `CREATE TABLE IF NOT EXISTS ticket(pid TEXT,round INTEGER,issued INTEGER,PRIMARY KEY(pid,round))`,
  `CREATE TABLE IF NOT EXISTS ready(pid TEXT,code TEXT,round INTEGER,PRIMARY KEY(pid,round))`
];
const COUNT_MS=5000, RESULTS_MS=10000, PLAY_GRACE=1800, MAX_PLAYERS=99;
/* Instrucciones (15/25/40 s, configurable) + 5 s de cuenta regresiva */
const introMs=s=>([15,25,40].includes(s.cfg&&s.cfg.intro)?s.cfg.intro:25)*1000+COUNT_MS;

const json=(o,status=200)=>new Response(JSON.stringify(o),{status,headers:{'content-type':'application/json;charset=utf-8','cache-control':'no-store'}});
const bad=(error,status=400)=>json({error},status);
const rnd=(a,b)=>a+Math.random()*(b-a);
const CH='23456789ABCDEFGHJKMNPQRSTUVWXYZ';
const newCode=()=>'KO-'+Array.from(crypto.getRandomValues(new Uint8Array(5)),b=>CH[b%31]).join('');
const id=()=>crypto.randomUUID();

let ready=false;
async function init(env){
  if(ready)return;await env.DB.batch(SCHEMA.map(q=>env.DB.prepare(q)));
  try{await env.DB.prepare('ALTER TABLE session ADD COLUMN host_key TEXT').run()}catch(e){/* ya existe */}
  ready=true;
}
function parse(s){s.plan=JSON.parse(s.plan||'[]');s.cfg=JSON.parse(s.cfg||'{}');return s}
const normCode=v=>{v=String(v||'').toUpperCase().replace(/[^A-Z0-9]/g,'');if(v.startsWith('KO'))v=v.slice(2);return v?'KO-'+v.slice(0,5):''};
async function load(env,code){if(!code)return null;const s=await env.DB.prepare('SELECT * FROM session WHERE code=?').bind(code).first();return s?parse(s):null}
async function createSession(env,event){
  const s={code:'',host_key:id(),event:event||'Torneo King Office',phase:'LOBBY',round:-1,plan:'[]',dur:30,dur_mode:'game',mode:'random',
    rounds:5,cfg:'{}',locked:0,auto:1,intro_end:0,play_end:0,results_end:0,close_at:0,ended_at:0,ver:1,created:Date.now()};
  const k=Object.keys(s);
  for(let i=0;i<6;i++){
    s.code=newCode();
    const r=await env.DB.prepare(`INSERT OR IGNORE INTO session(${k.join(',')}) VALUES(${k.map(()=>'?').join(',')})`).bind(...k.map(x=>s[x])).run();
    if(r.meta.changes)return parse(s);
  }
  throw new Error('no_code');
}
/* Borra salas de más de 2 días para que la base de datos no crezca sin límite */
async function cleanup(env){
  const old=(await env.DB.prepare('SELECT code FROM session WHERE created<? LIMIT 20').bind(Date.now()-2*864e5).all()).results;
  for(const o of old)await env.DB.batch([env.DB.prepare('DELETE FROM ticket WHERE pid IN (SELECT id FROM player WHERE code=?)').bind(o.code),env.DB.prepare('DELETE FROM ready WHERE code=?').bind(o.code),env.DB.prepare('DELETE FROM result WHERE code=?').bind(o.code),
    env.DB.prepare('DELETE FROM player WHERE code=?').bind(o.code),env.DB.prepare('DELETE FROM session WHERE code=?').bind(o.code)]);
}
const reload=(env,s)=>load(env,s.code);
const durOf=(s,gid)=>s.dur_mode==='game'?GAMES[gid].d:Math.max(10,Math.min(120,+s.dur_mode||30));
function light(s){return{code:s.code,event:s.event,phase:s.phase,round:s.round,plan:s.plan,dur:s.dur,durMode:s.dur_mode,mode:s.mode,rounds:s.rounds,cfg:s.cfg,
  locked:!!s.locked,auto:!!s.auto,introEnd:s.intro_end,playEnd:s.play_end,resultsEnd:s.results_end,endedAt:s.ended_at,ver:s.ver}}

/* Avanza las fases según el reloj. Se ejecuta en cada consulta; las condiciones WHERE evitan dobles avances. */
async function advance(env,s){
  const DB=env.DB;
  for(let i=0;i<4;i++){
    const now=Date.now();
    if(s.phase==='INTRO'&&now<s.intro_end-COUNT_MS){
      /* Si todos los jugadores reales ya tocaron "¡Estoy listo!", se salta a la cuenta regresiva */
      const q=await DB.prepare(`SELECT (SELECT COUNT(*) FROM player WHERE code=?1 AND kicked=0 AND bot=0 AND jr<=?2) a,(SELECT COUNT(*) FROM ready r JOIN player p ON p.id=r.pid WHERE r.code=?1 AND r.round=?2 AND p.kicked=0 AND p.bot=0) b`).bind(s.code,s.round).first();
      if(q.a>0&&q.b>=q.a){await DB.prepare(`UPDATE session SET intro_end=?,ver=ver+1 WHERE code=? AND phase='INTRO' AND round=? AND intro_end>?`).bind(now+COUNT_MS,s.code,s.round,now+COUNT_MS).run();s=await reload(env,s);continue}
    }
    if(s.phase==='INTRO'&&now>=s.intro_end){
      const pe=s.intro_end+s.dur*1000+PLAY_GRACE;
      const r=await DB.prepare(`UPDATE session SET phase='PLAY',play_end=?,close_at=0,ver=ver+1 WHERE code=? AND phase='INTRO' AND round=?`).bind(pe,s.code,s.round).run();
      if(r.meta.changes)await botResults(env,s);
      s=await reload(env,s);continue;
    }
    if(s.phase==='PLAY'){
      let close=now>=s.play_end;
      if(!close){
        const q=await DB.prepare(`SELECT (SELECT COUNT(*) FROM player WHERE code=?1 AND kicked=0 AND jr<=?2) a,(SELECT COUNT(*) FROM result r JOIN player p ON p.id=r.pid WHERE r.code=?1 AND r.round=?2 AND p.kicked=0 AND r.at<=?3) b`).bind(s.code,s.round,now).first();
        if(q.a>0&&q.b>=q.a){
          if(!s.close_at){await DB.prepare(`UPDATE session SET close_at=? WHERE code=? AND phase='PLAY' AND round=? AND close_at=0`).bind(now+1500,s.code,s.round).run();s.close_at=now+1500}
          else if(now>=s.close_at)close=true;
        }
      }
      if(close){await closeRound(env,s);s=await reload(env,s);continue}
    }
    if(s.phase==='RESULTS'&&s.auto&&now>=s.results_end){await nextRound(env,s,'RESULTS');s=await reload(env,s);continue}
    break;
  }
  return s;
}
async function closeRound(env,s){
  await env.DB.prepare(`UPDATE session SET phase='RESULTS',results_end=?,close_at=0,ver=ver+1 WHERE code=? AND phase='PLAY' AND round=?`).bind(Date.now()+RESULTS_MS,s.code,s.round).run();
}
async function nextRound(env,s,from){
  const now=Date.now();
  if(s.round+1>=s.plan.length)
    return env.DB.prepare(`UPDATE session SET phase='FINAL',ended_at=?,ver=ver+1 WHERE code=? AND phase=? AND round=?`).bind(now,s.code,from,s.round).run();
  const r=s.round+1;
  return env.DB.prepare(`UPDATE session SET phase='INTRO',round=?,dur=?,intro_end=?,close_at=0,ver=ver+1 WHERE code=? AND phase=? AND round=?`).bind(r,durOf(s,s.plan[r]),now+introMs(s),s.code,from,s.round).run();
}
/* Los jugadores de prueba "terminan" en momentos futuros: la página solo los muestra cuando llega su hora. */
async function botResults(env,s){
  const gid=s.plan[s.round],g=GAMES[gid];if(!g)return;
  const bots=(await env.DB.prepare('SELECT id FROM player WHERE code=? AND bot=1 AND kicked=0 AND jr<=?').bind(s.code,s.round).all()).results;
  if(!bots.length)return;
  const k=g.e?Math.pow(s.dur/g.d,g.e):1,start=s.intro_end;
  const st=bots.map(b=>{const raw=Math.round(Math.min(g.cap,rnd(g.lo,g.hi)*k)),at=Math.round(start+s.dur*1000*(Math.random()<.55?rnd(.97,1):rnd(.35,.95)));
    return env.DB.prepare('INSERT OR IGNORE INTO result(pid,code,round,game,raw,acc,combo,dur,actions,at) VALUES(?,?,?,?,?,?,?,?,?,?)').bind(b.id,s.code,s.round,gid,raw,Math.round(rnd(.55,1)*100)/100,2+(Math.random()*12|0),s.dur,0,at)});
  await env.DB.batch(st);
}
const bump=(env,code)=>env.DB.prepare('UPDATE session SET ver=ver+1 WHERE code=?').bind(code).run();
async function auth(env,body){
  const p=await env.DB.prepare('SELECT * FROM player WHERE id=?').bind(String(body.id||'')).first();
  if(!p||p.token!==body.token)return null;return p;
}
async function readBody(req){try{return await req.json()}catch(e){return{}}}
const cleanName=v=>String(v||'').replace(/[\u0000-\u001f\u007f<>]/g,'').replace(/\s+/g,' ').trim();

async function api(req,env,url){
  await init(env);
  const path=url.pathname,DB=env.DB;
  if(path==='/api/state'){
    const s0=await load(env,normCode(url.searchParams.get('code')));if(!s0)return bad('code',404);
    let s=await advance(env,s0);
    const out={now:Date.now(),s:light(s)};
    if(+url.searchParams.get('v')===s.ver)return json(Object.assign(out,{same:true}));
    const [pl,rs,rd]=await DB.batch([
      DB.prepare('SELECT id,name,av,bot,jr,kicked FROM player WHERE code=? ORDER BY created').bind(s.code),
      DB.prepare('SELECT pid p,round r,raw,acc,combo,at FROM result WHERE code=?').bind(s.code),
      DB.prepare('SELECT pid FROM ready WHERE code=? AND round=?').bind(s.code,s.round)]);
    out.players=pl.results;out.results=rs.results;out.ready=rd.results.map(r=>r.pid);return json(out);
  }
  if(req.method!=='POST')return bad('method',405);
  const body=await readBody(req);
  if(path==='/api/create'){
    await cleanup(env);
    const s=await createSession(env,cleanName(body.event).slice(0,40));
    return json({ok:true,code:s.code,key:s.host_key});
  }
  if(path==='/api/join'){
    const s0=await load(env,normCode(body.code));if(!s0)return bad('code');
    const s=await advance(env,s0);
    const name=cleanName(body.name);if(!name)return bad('name');if(name.length>20)return bad('long');
    if(s.phase==='FINAL')return bad('over');if(s.locked)return bad('locked');
    const n=await DB.prepare('SELECT COUNT(*) n FROM player WHERE code=? AND kicked=0').bind(s.code).first();if(n.n>=MAX_PLAYERS)return bad('full');
    const lc=name.toLowerCase(),ex=await DB.prepare('SELECT id,kicked FROM player WHERE code=? AND name_lc=?').bind(s.code,lc).first();
    if(ex&&!ex.kicked)return bad('dup');
    if(ex)await DB.batch([DB.prepare('DELETE FROM result WHERE pid=?').bind(ex.id),DB.prepare('DELETE FROM player WHERE id=?').bind(ex.id)]);
    const pid=id(),token=id(),jr=s.phase==='LOBBY'?0:s.round+1,av=Math.max(0,Math.min(11,body.av|0));
    await DB.batch([DB.prepare('INSERT INTO player(id,code,name,name_lc,av,token,jr,bot,kicked,created) VALUES(?,?,?,?,?,?,?,0,0,?)').bind(pid,s.code,name,lc,av,token,jr,Date.now()),
      DB.prepare('UPDATE session SET ver=ver+1 WHERE code=?').bind(s.code)]);
    return json({ok:true,id:pid,token,code:s.code});
  }
  if(path==='/api/ready'){
    const p=await auth(env,body);if(!p||p.kicked)return bad('auth',401);
    const s0=await load(env,p.code);if(!s0)return bad('code');const s=await advance(env,s0);
    if(body.round!==s.round||s.phase!=='INTRO'||p.jr>s.round)return bad('round');
    const r=await DB.prepare('INSERT OR IGNORE INTO ready(pid,code,round) VALUES(?,?,?)').bind(p.id,s.code,s.round).run();
    if(r.meta.changes)await bump(env,s.code);
    return json({ok:true});
  }
  if(path==='/api/ticket'){
    const p=await auth(env,body);if(!p||p.kicked)return bad('auth',401);
    const s0=await load(env,p.code);if(!s0)return bad('code');const s=await advance(env,s0);
    if(body.round!==s.round||!['INTRO','PLAY'].includes(s.phase))return bad('round');
    await DB.prepare('INSERT OR IGNORE INTO ticket(pid,round,issued) VALUES(?,?,?)').bind(p.id,s.round,Date.now()).run();
    return json({ok:true});
  }
  if(path==='/api/result'){
    const p=await auth(env,body);if(!p||p.kicked)return bad('auth',401);
    const s0=await load(env,p.code);if(!s0)return bad('code');const s=await advance(env,s0),now=Date.now();
    if(body.round!==s.round||p.jr>s.round)return bad('round');
    if(!['PLAY','RESULTS','FINAL'].includes(s.phase)||now>s.play_end+8000)return bad('late');
    const gid=s.plan[s.round],g=GAMES[gid];if(body.game!==gid||!g)return bad('game');
    const raw=Math.round(+body.raw),dur=+body.dur,actions=Math.round(+body.actions||0);
    if(!Number.isFinite(raw)||raw<0||raw>g.cap)return bad('score');
    if(!Number.isFinite(dur)||dur<0||dur>s.dur+3)return bad('duration');
    if(raw>0&&actions<1)return bad('actions');
    const tk=await DB.prepare('SELECT issued FROM ticket WHERE pid=? AND round=?').bind(p.id,s.round).first();
    if(!tk)return bad('ticket');
    if(now-tk.issued<dur*1000*.7-2500)return bad('too_fast');
    const acc=body.acc==null?null:Math.max(0,Math.min(1,+body.acc));
    const r=await DB.prepare('INSERT OR IGNORE INTO result(pid,code,round,game,raw,acc,combo,dur,actions,at) VALUES(?,?,?,?,?,?,?,?,?,?)').bind(p.id,s.code,s.round,gid,raw,acc,Math.max(0,body.combo|0),dur,actions,now).run();
    if(!r.meta.changes)return bad('dup');
    await bump(env,s.code);return json({ok:true});
  }
  if(path==='/api/admin'){
    const s0=await load(env,normCode(body.code));if(!s0)return bad('code',404);
    const key=req.headers.get('x-host-key')||'';
    if(!s0.host_key||key!==s0.host_key)return bad('host',403);
    let s=await advance(env,s0);const now=Date.now(),A=body.action;
    const run=(sql,...a)=>DB.prepare(sql).bind(...a).run();
    const validPlan=a=>[...new Set((Array.isArray(a)?a:[]).filter(x=>GAMES[x]))].slice(0,18);
    switch(A){
      case 'ping':return json({ok:true});
      case 'config':{
        if(s.phase!=='LOBBY')return bad('not_lobby',409);
        const event=cleanName(body.event).slice(0,40),mode=body.mode==='manual'?'manual':'random',rounds=Math.max(2,Math.min(18,body.rounds|0||5));
        const durMode=['game','20','45'].includes(String(body.durMode))?String(body.durMode):'game';
        const cfg={manual:validPlan(body.manual),disabled:(Array.isArray(body.disabled)?body.disabled:[]).filter(x=>GAMES[x]),intro:[15,25,40].includes(+body.intro)?+body.intro:25};
        await run(`UPDATE session SET event=?,mode=?,rounds=?,dur_mode=?,cfg=?,plan=?,ver=ver+1 WHERE code=? AND phase='LOBBY'`,event,mode,rounds,durMode,JSON.stringify(cfg),JSON.stringify(validPlan(body.plan)),s.code);break}
      case 'start':{
        if(s.phase!=='LOBBY')return bad('not_lobby',409);
        const n=await DB.prepare('SELECT COUNT(*) n FROM player WHERE code=? AND kicked=0').bind(s.code).first();if(!n.n)return bad('no_players');
        const plan=validPlan(body.plan);if(!plan.length)return bad('no_plan');
        await run(`UPDATE session SET plan=?,round=0,phase='INTRO',dur=?,intro_end=?,close_at=0,ended_at=0,ver=ver+1 WHERE code=? AND phase='LOBBY'`,JSON.stringify(plan),durOf(s,plan[0]),now+introMs(s),s.code);break}
      case 'next':
        if(s.phase==='PLAY')await closeRound(env,s);else if(s.phase==='RESULTS')await nextRound(env,s,'RESULTS');
        else if(s.phase==='INTRO'&&s.intro_end>now+COUNT_MS)await run(`UPDATE session SET intro_end=?,ver=ver+1 WHERE code=? AND phase='INTRO'`,now+COUNT_MS,s.code);break;
      case 'pause':{
        const auto=s.auto?0:1,re=auto&&s.phase==='RESULTS'?now+5000:s.results_end;
        await run('UPDATE session SET auto=?,results_end=?,ver=ver+1 WHERE code=?',auto,re,s.code);break}
      case 'end':
        if(['INTRO','PLAY','RESULTS'].includes(s.phase))await run(`UPDATE session SET phase='FINAL',round=?,ended_at=?,ver=ver+1 WHERE code=?`,s.phase==='INTRO'?s.round-1:s.round,now,s.code);break;
      case 'reset':
        await DB.batch([DB.prepare('DELETE FROM ticket WHERE pid IN (SELECT id FROM player WHERE code=?)').bind(s.code),DB.prepare('DELETE FROM ready WHERE code=?').bind(s.code),DB.prepare('DELETE FROM result WHERE code=?').bind(s.code),
          DB.prepare('DELETE FROM player WHERE code=?').bind(s.code),
          DB.prepare(`UPDATE session SET phase='LOBBY',round=-1,plan=?,locked=0,auto=1,intro_end=0,play_end=0,results_end=0,close_at=0,ended_at=0,ver=ver+1 WHERE code=?`).bind(JSON.stringify(s.mode==='manual'?(s.cfg.manual||[]):[]),s.code)]);
        break;
      case 'lock':await run('UPDATE session SET locked=?,ver=ver+1 WHERE code=?',s.locked?0:1,s.code);break;
      case 'kick':await run('UPDATE player SET kicked=1 WHERE id=? AND code=?',String(body.pid||''),s.code);await bump(env,s.code);break;
      case 'bots':{
        if(s.phase!=='LOBBY')return bad('not_lobby',409);
        const want=Math.max(0,Math.min(MAX_PLAYERS-1,body.n|0));
        const bots=(await DB.prepare('SELECT id,name_lc FROM player WHERE code=? AND bot=1 ORDER BY created').bind(s.code).all()).results;
        const real=await DB.prepare('SELECT COUNT(*) n FROM player WHERE code=? AND bot=0 AND kicked=0').bind(s.code).first();
        const target=Math.min(want,MAX_PLAYERS-real.n);
        if(bots.length>target){await DB.batch(bots.slice(target).map(b=>DB.prepare('DELETE FROM player WHERE id=?').bind(b.id)))}
        else if(bots.length<target){
          const used=new Set((await DB.prepare('SELECT name_lc FROM player WHERE code=?').bind(s.code).all()).results.map(r=>r.name_lc));
          const pool=BOT_NAMES.filter(x=>!used.has(x.toLowerCase())),st=[];let k=0;
          for(let i=bots.length;i<target;i++){let nm=pool[k++]||('Bot '+(i+1));if(used.has(nm.toLowerCase()))nm='Bot '+(i+1)+'·';used.add(nm.toLowerCase());
            st.push(DB.prepare('INSERT INTO player(id,code,name,name_lc,av,token,jr,bot,kicked,created) VALUES(?,?,?,?,?,?,0,1,0,?)').bind(id(),s.code,nm,nm.toLowerCase(),Math.random()*12|0,id(),Date.now()+i))}
          await DB.batch(st);
        }
        await bump(env,s.code);break}
      default:return bad('action');
    }
    return json({ok:true});
  }
  return bad('not_found',404);
}

export default {
  async fetch(req,env){
    const url=new URL(req.url);
    try{
      if(url.pathname.startsWith('/api/')){
        if(!env.DB)return bad('no_db',500);
        return await api(req,env,url);
      }
      if(url.pathname==='/admin')return Response.redirect(url.origin+'/',302);
      return env.ASSETS.fetch(req);
    }catch(e){return json({error:'server',detail:String(e&&e.message||e)},500)}
  }
};
