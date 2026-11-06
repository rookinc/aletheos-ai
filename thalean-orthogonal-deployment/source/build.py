from pathlib import Path
root=Path(__file__).parent
src=root/'src'
html=(src/'ui.html').read_text()
for key,name in [('STYLE','style.css'),('DATA','native-data.json'),('MODEL','native-model.js'),('CAMERA','volume-camera.js'),('CLOCK','cycle-clock.js'),('INVERSE','inverse-volume.js'),('APP','app.js')]:
 html=html.replace('/*'+key+'*/',(src/name).read_text())
(root/'dist').mkdir(exist_ok=True)
(root/'dist'/'index.html').write_text(html)
print(f'Built self-contained observatory: {len(html.encode()):,} bytes')
