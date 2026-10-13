# King Office

Torneos de minijuegos para la oficina, al estilo Kahoot. Quien organiza crea una sala y proyecta el QR; cada persona juega desde su celular; la pantalla grande muestra la tabla en vivo y corona al **Rey de la oficina**.

Funciona gratis en **Cloudflare Workers + D1**. Cloudflare publica el sitio solo cada vez que cambia este repositorio.

---

## Conectar Cloudflare con este repositorio (una sola vez)

1. En **dash.cloudflare.com** entra a **Workers & Pages** y abre el Worker **`king-office`**.
2. Ve a **Settings → Builds → Connect**.
3. Elige **GitHub**, la cuenta **KuroRaptor** y el repositorio **`king-office`**. Rama: **`main`**.
4. Deja vacío **Build command**. En **Deploy command** deja `npx wrangler deploy`.
5. Toca **Connect** o **Save**.

Desde ese momento cada cambio en `main` se publica solo en unos 30 a 60 segundos. Para ver el estado, abre la pestaña **Deployments** del Worker.

La base de datos `king-office` ya está indicada en `wrangler.jsonc`, así que se conecta sola. La dirección del sitio no cambia: `https://king-office.<tu-subdominio>.workers.dev`.

---

## Direcciones

| Dirección | Qué hay |
|---|---|
| `/` | Inicio: **Unirme a una sala** o **Crear una sala** |
| `/host` | Consola de quien creó la sala: pantalla con QR y todos los controles |
| `/pantalla?s=CÓDIGO` | Solo la pantalla grande, para otra computadora o TV |
| `/jugar?s=CÓDIGO` | El celular de cada jugador (el QR lleva aquí) |
| `/demo` | Demo con compañeros simulados, sin crear sala |

---

## Salas: cerrar y borrado automático

- **Terminar torneo** pasa al podio y la coronación. La sala sigue existiendo.
- **Reiniciar sala** borra jugadores y puntajes, pero conserva el código y el QR.
- **Cerrar sala** borra todo al instante: jugadores, puntajes y código. Pide confirmación. Los celulares salen con el aviso "Esta sala se cerró o venció".
- **Borrado automático:** una sala se borra después de **24 horas sin actividad**. Cuenta como actividad que alguien se una, que se envíe un puntaje o cualquier botón de la consola. La limpieza corre sola todos los días a las 3:00 a. m. (hora de Honduras), con el cron configurado en `wrangler.jsonc`, y también cada vez que alguien crea una sala.

## Sonido

- **Pantalla grande:** la música cambia sola según el momento: sala de espera, instrucciones, juego, resultados y coronación. La pestaña **Música** de la consola tiene pausa, siguiente, volumen y la canción de cada momento.
- **Celulares:** música bajita solo durante las instrucciones y el juego. Es la misma canción que la pantalla. Cada jugador la apaga con el botón de nota musical.
- **Botón "Probar sonido"** en el celular, en la sala de espera, y en la pestaña Música de la consola.
- **iPhone:** la página pide sonar aunque el interruptor de silencio esté activado (iOS 17 o más reciente).
- Los navegadores solo dejan sonar después del primer toque. Si la pantalla grande se abrió sin tocar nada, aparece el botón **Activar música**.

Para cambiar canciones, edita `public/sound/` y `client/playlist.json` y vuelve a armar la página (abajo).

---

## Estructura

| Carpeta | Contenido |
|---|---|
| `client/` | **Código fuente** de la página: `body.html`, `styles.css`, `core.js` (dibujo, sonidos y juegos base), `games2.js`, `games3.js` (juegos nuevos), `engine_tail.js` (instrucciones y motor), `app.js` (torneo, pantalla, celular y consola), `music.js`, `playlist.json` |
| `public/` | Lo que Cloudflare publica: `index.html`, `app.css`, `app.js` (generados) y `sound/` (música y efectos) |
| `worker/index.js` | La API (`/api/*`): salas, jugadores, rondas, puntajes y validaciones |
| `tools/build.py` | Arma `public/` a partir de `client/` |
| `wrangler.jsonc` | Configuración de Cloudflare (Worker, archivos estáticos y base D1) |
| `schema.sql` | Tablas de la base (se crean solas al primer uso) |

### Hacer cambios

```bash
python3 tools/build.py      # regenera public/index.html, app.css y app.js
npx wrangler dev            # prueba local en http://localhost:8787
git commit -am "..." && git push   # Cloudflare publica solo
```

---

## Juegos (26)

| Categoría | Juegos |
|---|---|
| Reflejos | Salta la tablita · Aplasta cucarachas · Invasores rebeldes · Patrulla aérea · ¡Que no te aplasten! · ¡Salta, que viene el toro! · Lanza cuchillos |
| Velocidad | Café express · Motomamacita · Pelotas y flechas · Leñador |
| Precisión | Tiro rápido · Rompe bloques · Indios vs Conquistadores · Torre de bloques · Tiro con arco |
| Memoria | Memoria pizza |
| Control | No dejes caer el avión · Sube brincando · Torre del pollito |
| Decisión | No toques el rojo · No mueras · Lluvia de bloques · Combo de frutas |
| Resistencia | Carrera costera (con turbos) · Impresora furiosa |

Antes de cada juego aparece "Así se juega", con un video automático, los controles, qué suma y qué resta, el botón **Probar** y el botón **¡Estoy listo!**. Un torneo puede tener hasta 25 rondas.

**Puntaje por juego:** de 0 a 1000. El 70 % depende de tu posición y el 30 % de qué tan cerca quedaste del mejor. Además, cada ronda en la mitad de arriba suma +40. El total es el **King Score**.

## Límites del plan gratuito

El plan gratuito de Cloudflare incluye 100,000 consultas al día al Worker. Los archivos estáticos (página y música) no cuentan para ese límite. En D1 incluye 5 millones de filas leídas y 100,000 escritas al día. Un torneo de 99 personas usa alrededor de 15,000 a 25,000 consultas.
