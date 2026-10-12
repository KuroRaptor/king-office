
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
