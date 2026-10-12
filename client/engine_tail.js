
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

