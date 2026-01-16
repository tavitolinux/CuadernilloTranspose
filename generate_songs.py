import re
import os
from bs4 import BeautifulSoup

def create_index_html(song_titles):
    """Genera el archivo index.html con buscador y menú superior."""
    def natural_sort_key(s):
        return [int(text) if text.isdigit() else text.lower()
                for text in re.split('([0-9]+)', s[0])]

    index_html_template = """
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Índice de Cantos</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        :root {{ --primary: #2563eb; --bg: #f4f4f4; --text: #333; }}
        body {{ font-family: Arial, sans-serif; background-color: var(--bg); margin: 0; padding: 0; }}
        
        .navbar {{ background: var(--primary); padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; color: white; position: sticky; top: 0; z-index: 1000; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }}
        .navbar a {{ color: white; text-decoration: none; font-size: 14px; font-weight: bold; padding: 8px 12px; border-radius: 4px; }}
        .navbar a:hover {{ background: rgba(255,255,255,0.2); }}

        .container {{ max-width: 600px; margin: 20px auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); min-height: 80vh; }}
        h1 {{ text-align: center; color: #333; font-size: 22px; }}

        .search-box {{ width: 100%; padding: 12px; margin: 20px 0; border: 2px solid #e2e8f0; border-radius: 6px; box-sizing: border-box; font-size: 16px; outline: none; }}
        .search-box:focus {{ border-color: var(--primary); }}

        .song-list {{ display: flex; flex-direction: column; }}
        .song-item {{ border-bottom: 1px solid #eee; }}
        .song-item a {{ text-decoration: none; color: #333; display: block; padding: 12px; font-size: 16px; }}
        .song-item a:hover {{ background: #f9f9f9; color: var(--primary); }}
        .index-number {{ font-weight: bold; color: var(--primary); margin-right: 10px; min-width: 40px; display: inline-block; }}
        
        footer {{ margin-top: 40px; padding: 25px; background: #fff; border-top: 1px solid #ddd; text-align: center; color: #666; }}
        .social-links {{ display: flex; justify-content: center; gap: 20px; margin-top: 10px; }}
        .social-links a {{ color: #666; font-size: 20px; text-decoration: none; transition: 0.3s; }}
        .social-links a:hover {{ color: var(--primary); }}
    </style>
</head>
<body>
    <div class="navbar">
        <div class="nav-brand">Cuadernillo Digital</div>
        <div class="nav-links">
            <a href="https://cuadernillo.atec.mx/indexold.htm">Versión Anterior</a>
        </div>
    </div>

    <div class="container">
        <h1>Índice de Canciones</h1>
        <input type="text" id="searchInput" class="search-box" placeholder="Buscar por título o número..." onkeyup="filterSongs()">
        <div class="song-list" id="songList">{}</div>
        <div id="no-results" style="display:none; text-align:center; padding:20px; color:#999;">No se encontraron canciones.</div>
    </div>

    <footer>
        <p>Desarrollado por Gustavo R. &copy; 2026</p>
        <div class="social-links">
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-whatsapp"></i></a>
        </div>
    </footer>

    <script>
        function filterSongs() {{
            const filter = document.getElementById('searchInput').value.toLowerCase();
            const items = document.getElementsByClassName('song-item');
            let hasResults = false;
            for (let i = 0; i < items.length; i++) {{
                let text = items[i].textContent || items[i].innerText;
                if (text.toLowerCase().indexOf(filter) > -1) {{
                    items[i].style.display = "";
                    hasResults = true;
                }} else {{
                    items[i].style.display = "none";
                }}
            }}
            document.getElementById('no-results').style.display = hasResults ? "none" : "block";
        }}
    </script>
</body>
</html>
"""
    items = ""
    sorted_songs = sorted(song_titles, key=natural_sort_key)
    for title, filename in sorted_songs:
        parts = title.split('.', 1)
        idx = parts[0]
        name = parts[1].strip() if len(parts) > 1 else ""
        items += f'<div class="song-item"><a href="{filename}"><span class="index-number">{idx}.</span><span>{name}</span></a></div>'
    
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(index_html_template.format(items))
    print("✅ Archivo index.html generado con éxito.")

def create_song_file(content, title, filename, original_key, prev_file, next_file):
    """Genera cada archivo HTML de canción con navegación y transposición."""
    song_html_template = f"""
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>{title}</title>
    <style>
        body {{ font-family: Arial, sans-serif; background: #fff; margin: 0; padding-bottom: 90px; }}
        .song-header {{ background: #f8fafc; padding: 15px; border-bottom: 1px solid #e2e8f0; text-align: center; }}
        h1.title {{ margin: 0; font-size: 18px; color: #2563eb; }}
        
        pre {{ 
            font-family: Arial, sans-serif !important; 
            font-size: 10pt !important; 
            line-height: 1.2; 
            white-space: pre; 
            overflow-x: auto; 
            padding: 20px; 
            margin: 0; 
        }}

        /* Estilo para acordes azules y negritas */
        span.c {{ 
            color: #2563eb !important; 
            font-weight: bold !important; 
            font-style: normal;
        }}
        
        .nav-bar {{ position: fixed; bottom: 0; left: 0; right: 0; background: #fff; display: flex; justify-content: space-around; padding: 12px; border-top: 1px solid #ddd; z-index: 1000; }}
        .nav-btn {{ text-decoration: none; color: #444; padding: 10px 15px; border-radius: 6px; border: 1px solid #ccc; font-size: 14px; background: #fdfdfd; }}
        .nav-btn.primary {{ background: #2563eb; color: white; border: none; }}
        
        .transpose-controls {{ position: fixed; right: 15px; top: 70px; display: flex; flex-direction: column; gap: 10px; z-index: 1100; }}
        .transpose-controls button {{ width: 45px; height: 45px; border-radius: 50%; border: none; background: #2563eb; color: white; font-size: 22px; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }}
        
        @media (max-width: 600px) {{
            .transpose-controls {{ top: 80px; right: 10px; flex-direction: row; }}
            .transpose-controls button {{ width: 40px; height: 40px; font-size: 18px; }}
        }}
    </style>
</head>
<body>
    <div class="song-header">
        <h1 class="title">{title}</h1>
    </div>

    <pre data-key="{original_key}">{content.strip()}</pre>

    <div class="transpose-controls">
        <button id="transpose-up">+</button>
        <button id="transpose-down">-</button>
    </div>

    <nav class="nav-bar">
        <a href="{prev_file if prev_file else '#'}" class="nav-btn" {'style="visibility:hidden"' if not prev_file else ''}>Anterior</a>
        <a href="index.html" class="nav-btn primary">Inicio</a>
        <a href="{next_file if next_file else '#'}" class="nav-btn" {'style="visibility:hidden"' if not next_file else ''}>Siguiente</a>
    </nav>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="script.js"></script>
    <script>$(document).ready(function() {{ $("pre").transpose(); }});</script>
</body>
</html>
"""
    with open(filename, "w", encoding="utf-8") as f:
        f.write(song_html_template)

def generate_songs_from_html(html_file):
    print(f"--- Iniciando procesamiento de {html_file} ---")
    if not os.path.exists(html_file):
        print(f"Error: No se encuentra el archivo {html_file}")
        return

    with open(html_file, "r", encoding="utf-8", errors="replace") as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')
    pre_tag = soup.find('pre')
    if not pre_tag:
        print("Error: No se encontró la etiqueta <pre> en el archivo maestro.")
        return

    full_text = pre_tag.get_text()
    original_key = pre_tag.get('data-key', 'C')
    pattern = re.compile(r'(^[A-Z]\d+\.\s*.*?)(?=\n[A-Z]\d+\.\s+|\Z)', re.DOTALL | re.MULTILINE)
    matches = list(pattern.finditer(full_text))
    
    song_data = []
    for match in matches:
        content = match.group(1).strip()
        lines = [l.strip() for l in content.split('\n') if l.strip()]
        if not lines: continue
        
        idx_match = re.match(r'^([A-Z]\d+\.)', lines[0])
        index_str = idx_match.group(1) if idx_match else "S."
        
        extracted_title = ""
        for line in lines:
            text_only = line.replace(index_str, "").strip()
            if not text_only: continue
            # Detectar si la línea NO es de acordes para usarla de título
            is_chords = re.match(r'^([A-G][b\#]?(m|maj|dim|7|add)?\d?(\s+|$))+$', text_only)
            if not is_chords:
                extracted_title = text_only
                break
        
        title = extracted_title if extracted_title else "Canto"
        final_title = f"{index_str} {title}"
        file_idx = index_str.replace('.', '').lower().strip().replace(' ', '')
        filename = f"cancion_{file_idx}.html"
        
        song_data.append({
            'title': final_title,
            'filename': filename,
            'content': content
        })

    # Ordenar naturalmente antes de generar archivos para que la navegación sea lógica
    def natural_sort_key(s):
        return [int(text) if text.isdigit() else text.lower()
                for text in re.split('([0-9]+)', s['title'])]
    
    song_data.sort(key=natural_sort_key)

    for i, song in enumerate(song_data):
        prev_f = song_data[i-1]['filename'] if i > 0 else None
        next_f = song_data[i+1]['filename'] if i < len(song_data)-1 else None
        create_song_file(song['content'], song['title'], song['filename'], 
                         original_key, prev_f, next_f)

    create_index_html([(s['title'], s['filename']) for s in song_data])
    print(f"🚀 Proceso completado. {len(song_data)} canciones generadas.")

if __name__ == "__main__":
    generate_songs_from_html("CuadernilloTranspose.html")