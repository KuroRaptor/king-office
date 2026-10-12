#!/usr/bin/env python3
"""Arma la página de King Office a partir de client/.

   public/index.html   la página (inicio, consola, pantalla grande, celular, demo)
   public/app.css      estilos
   public/app.js       todos los juegos y la lógica (un solo paquete)
   public/sound/playlist.json  lista de música (copia de client/playlist.json)
   dist/artifact.html  demo en un solo archivo (para vista previa sin servidor)

   Uso:  python tools/build.py
"""
import base64, hashlib, json, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC, PUB, DIST = ROOT / 'client', ROOT / 'public', ROOT / 'dist'
PUB.mkdir(exist_ok=True); DIST.mkdir(exist_ok=True); (PUB / 'sound').mkdir(exist_ok=True)
rd = lambda n: (SRC / n).read_text(encoding='utf-8')

ORDER = ['core.js', 'games2.js', 'games3.js', 'games4.js', 'games5.js', 'engine_tail.js', 'app.js', 'music.js']
css, body = rd('styles.css'), rd('body.html')
PL = json.loads(rd('playlist.json')); PL.pop('_info', None)
pre = 'const DEFAULT_PL=' + json.dumps(PL, ensure_ascii=False) + ';\n'
js = '(()=>{\n"use strict";\n' + pre + ''.join(rd(n) for n in ORDER) + '\n})();\n'
assert '</script' not in js.lower()

HEAD = ('<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
        '<meta name="theme-color" content="#4FA9DE">\n<title>King Office</title>\n'
        '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Nunito:wght@500;700;800;900&family=Chakra+Petch:wght@600;700&family=Press+Start+2P&display=swap">\n'
        '<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>\n')
v = lambda s: hashlib.sha1(s.encode()).hexdigest()[:10]

(PUB / 'app.css').write_text(css, encoding='utf-8')
(PUB / 'app.js').write_text(js, encoding='utf-8')
(PUB / 'sound' / 'playlist.json').write_text(rd('playlist.json'), encoding='utf-8')
index = ('<!doctype html>\n<html lang="es">\n<head>\n' + HEAD +
         f'<link rel="stylesheet" href="/app.css?v={v(css)}">\n</head>\n<body>\n' + body +
         "\n<script>window.KO_MODE=location.pathname.replace(/\\/+$/,'')==='/demo'?'demo':'live';window.KO_SOUND='/sound/';</script>\n"
         f'<script src="/app.js?v={v(js)}"></script>\n</body>\n</html>\n')
(PUB / 'index.html').write_text(index, encoding='utf-8')

# Demo en un solo archivo (efectos incrustados; la música no carga fuera del sitio)
sfx = {f.stem: base64.b64encode(f.read_bytes()).decode() for f in sorted((PUB / 'sound' / 'sfx').glob('*.mp3'))}
demo_js = 'const SFX_DATA=' + json.dumps(sfx) + ';\n' + js
(DIST / 'artifact.html').write_text('<title>King Office</title>\n' + HEAD.split('<title>')[0] + HEAD.split('</title>\n')[1] +
    f'<style>\n{css}</style>\n{body}\n<script>window.KO_MODE="demo";</script>\n<script>\n{demo_js}</script>\n', encoding='utf-8')
(DIST / '_check.js').write_text(js, encoding='utf-8')
print('index.html', len(index) // 1024, 'KB · app.js', len(js) // 1024, 'KB · app.css', len(css) // 1024, 'KB')
