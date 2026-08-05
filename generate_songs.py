import re
import os
from bs4 import BeautifulSoup

def create_app_js(song_data):
    """Genera un archivo app.js independiente para manejar búsquedas, setlist y exportaciones."""
    
    db_entries = []
    for s in song_data:
        title_safe = s['title'].replace("'", "\\'")
        db_entries.append(f"{{ title: '{title_safe}', url: '{s['filename']}' }}")
    
    song_db_str = ",\n        ".join(db_entries)

    app_js_template = """// Diccionarios de Tonos
const keysDict = [
    { name: 'Ab', value: 0, type: 'F' }, { name: 'A', value: 1, type: 'N' },
    { name: 'A#', value: 2, type: 'S' }, { name: 'Bb', value: 2, type: 'F' },
    { name: 'B', value: 3, type: 'N' }, { name: 'C', value: 4, type: 'N' },
    { name: 'C#', value: 5, type: 'S' }, { name: 'Db', value: 5, type: 'F' },
    { name: 'D', value: 6, type: 'N' }, { name: 'D#', value: 7, type: 'S' },
    { name: 'Eb', value: 7, type: 'F' }, { name: 'E', value: 8, type: 'N' },
    { name: 'F', value: 9, type: 'N' }, { name: 'F#', value: 10, type: 'S' },
    { name: 'Gb', value: 10, type: 'F' }, { name: 'G', value: 11, type: 'N' },
    { name: 'G#', value: 0, type: 'S' }
];

const displayKeys = [
    { name: 'C', value: 4, type: 'N' }, { name: 'C#', value: 5, type: 'S' },
    { name: 'D', value: 6, type: 'N' }, { name: 'Eb', value: 7, type: 'F' },
    { name: 'E', value: 8, type: 'N' }, { name: 'F', value: 9, type: 'N' },
    { name: 'F#', value: 10, type: 'S' }, { name: 'G', value: 11, type: 'N' },
    { name: 'Ab', value: 0, type: 'F' }, { name: 'A', value: 1, type: 'N' },
    { name: 'Bb', value: 2, type: 'F' }, { name: 'B', value: 3, type: 'N' }
];

const chordRegexLine = /^[A-G][b\\#]?(2|4|5|6|7|9|11|13|6\\/9|7\\-5|7\\-9|7\\#5|7\\#9|7\\+5|7\\+9|b5|#5|#9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|dim|dim7|m\\/maj7|m6|m7|m7b5|m9|m11|m13|maj7|maj9|maj11|maj13|M7|M9|M11|M13|mb5|m|sus|sus2|sus4)*(\\/[A-G][b\\#]*)*$/;
const chordReplaceRegex = /([A-G][b\\#]?(2|4|5|6|7|9|11|13|6\\/9|7\\-5|7\\-9|7\\#5|7\\#9|7\\+5|7\\+9|b5|#5|#9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|dim|dim7|m\\/maj7|m6|m7|m7b5|m9|m11|m13|maj7|maj9|maj11|maj13|M7|M9|M11|M13|mb5|m|sus|sus2|sus4)*)/g;

const songDatabase = [
    {{SONG_DB}}
];

let favorites = JSON.parse(localStorage.getItem('mySetlist')) || [];
let currentMode = 'all';

function getKeyByName(n) {
    if (!n) return null;
    if (n.charAt(n.length-1) == "m") n = n.substring(0, n.length-1);
    return keysDict.find(k => k.name === n) || null;
}

function getChordRoot(i) {
    if (i.length > 1 && (i.charAt(1) == "b" || i.charAt(1) == "#")) return i.substr(0, 2);
    return i.substr(0, 1);
}

function getNewKey(oldKey, delta, targetKey) {
    let orig = getKeyByName(oldKey);
    if (!orig) return null;
    let val = orig.value + delta;
    if (val > 11) val -= 12; else if (val < 0) val += 12;
    
    let i=0;
    if ([0,2,5,7,10].includes(val)) {
        if (targetKey && targetKey.type == "F") {
            let k = keysDict.find(k => k.value === val && k.type === "F");
            if (k) return k;
        }
        let k = keysDict.find(k => k.value === val && k.type === "S");
        if (k) return k;
    }
    let k = keysDict.find(k => k.value === val && k.type === "N");
    if (k) return k;
    return keysDict.find(k => k.value === val) || null;
}

window.getTransposedLines = function(hiddenPre, origKeyName, targetKeyName) {
    let lines = hiddenPre.textContent.split(/\\r\\n|\\n/g);
    let output = [];
    
    let origK = getKeyByName(origKeyName);
    let targetK = targetKeyName ? getKeyByName(targetKeyName) : origK;
    let delta = (targetK && origK) ? targetK.value - origK.value : 0;
    if (delta < 0) delta += 12;

    for (let line of lines) {
        let isChord = true;
        let tokens = line.replace(/\\s+/g, " ").trim().split(" ");
        if (tokens.length === 0 || line.trim() === "") isChord = false;
        else {
            for (let j = 0; j < tokens.length; j++) {
                let match = tokens[j].match(chordRegexLine);
                if (tokens[j] !== "" && !match) { isChord = false; break; }
            }
        }
        
        if (isChord && delta !== 0) {
            line = line.replace(chordReplaceRegex, function(match) {
                let root = getChordRoot(match);
                let newR = getNewKey(root, delta, targetK);
                return newR ? newR.name + match.substr(root.length) : match;
            });
        }
        output.push({ text: line, isChord: isChord });
    }
    return output;
}

$(document).ready(function() {
    // ----------------------------------------------------
    // LÓGICA DE MENÚ MÓVIL (Global)
    // ----------------------------------------------------
    const btn = $('#mobile-menu');
    const menu = $('#nav-list');
    if (btn.length && menu.length) {
        btn.on('click', function(e) {
            e.preventDefault();
            const icon = $(this).find('i');
            if (menu.is(':visible')) {
                menu.hide();
                icon.removeClass('fa-times').addClass('fa-bars');
            } else {
                menu.css('display', 'flex');
                icon.removeClass('fa-bars').addClass('fa-times');
            }
        });
    }

    // ----------------------------------------------------
    // LÓGICA DE ÍNDICE (index.html)
    // ----------------------------------------------------
    if ($('#songList').length > 0) {
        updateCounts();

        $('#tab-all').click(() => {
            currentMode = 'all';
            $('#tab-all').css({'background': '#2563eb', 'color': 'white'});
            $('#tab-setlist').css({'background': '#e2e8f0', 'color': '#475569'});
            $('#setlist-actions').hide();
            window.filterSongs();
        });

        $('#tab-setlist').click(() => {
            currentMode = 'setlist';
            $('#tab-setlist').css({'background': '#2563eb', 'color': 'white'});
            $('#tab-all').css({'background': '#e2e8f0', 'color': '#475569'});
            $('#setlist-actions').css('display', 'flex');
            window.filterSongs();
        });

        $('#searchInput').on('input', window.filterSongs);
        window.filterSongs();
    }
    
    // ----------------------------------------------------
    // LÓGICA DE CANCIÓN INDIVIDUAL
    // ----------------------------------------------------
    let songContentEl = document.getElementById('song-content');
    if (songContentEl) {
        let originalKeyName = songContentEl.getAttribute('data-key');
        let trackedKey = keysDict.find(k => k.name === originalKeyName) || keysDict.find(k => k.name === 'C');
        let currentFilename = window.location.pathname.split('/').pop() || "";

        // Rastrear los clics de los botones de transposición para guardar la llave
        $('#transpose-up').click(() => {
            let idx = displayKeys.findIndex(k => k.value === trackedKey.value);
            trackedKey = displayKeys[(idx + 1) % 12];
        });

        $('#transpose-down').click(() => {
            let idx = displayKeys.findIndex(k => k.value === trackedKey.value);
            trackedKey = displayKeys[(idx - 1 + 12) % 12];
        });

        $('#btn-add-setlist').click(() => {
            let existingIndex = favorites.findIndex(f => f.id === currentFilename);
            let entry = {id: currentFilename, key: trackedKey.name};
            
            if (existingIndex > -1) favorites[existingIndex] = entry;
            else favorites.push(entry);
            
            localStorage.setItem('mySetlist', JSON.stringify(favorites));
            
            let btn = document.getElementById('btn-add-setlist');
            btn.style.backgroundColor = '#f59e0b';
            setTimeout(() => { btn.style.backgroundColor = '#10b981'; }, 1000);
            alert("Añadido al Setlist con éxito.");
        });

        // Modal del Buscador
        $('body').append(`
            <div id="searchModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(255,255,255,0.98); z-index:2000; overflow-y:auto; padding:20px; box-sizing:border-box;">
                <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                        <h2 style="margin:0; color:#2563eb;">Buscar Canción</h2>
                        <button id="closeSearchBtn" style="background:none; border:none; font-size:28px; color:#333; cursor:pointer;">&times;</button>
                    </div>
                    <input type="text" id="songSearchInputModal" style="width:100%; padding:12px; border:2px solid #e2e8f0; border-radius:6px; font-size:16px; margin-bottom:15px; box-sizing:border-box; outline:none;" placeholder="Escribe el nombre o número...">
                    <div id="songSearchResults" style="display:flex; flex-direction:column; gap:10px;"></div>
                </div>
            </div>
        `);

        $('#openSearchBtn').click(() => {
            $('#searchModal').fadeIn(200);
            $('#songSearchInputModal').val('').focus();
            renderSearchResults("");
        });

        $('#closeSearchBtn').click(() => $('#searchModal').fadeOut(200));

        $('#songSearchInputModal').on('input', function() {
            renderSearchResults($(this).val());
        });

        function renderSearchResults(filterText) {
            const cleanText = (text) => text.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").replace(/[.,]/g, "").trim();
            const filter = cleanText(filterText);
            const resultsContainer = $('#songSearchResults');
            resultsContainer.empty();

            let matches = songDatabase.filter(s => cleanText(s.title).includes(filter));
            if (matches.length === 0) {
                resultsContainer.append('<div style="text-align:center; color:#999; padding:20px;">No se encontraron canciones.</div>');
                return;
            }

            matches.slice(0, 50).forEach(s => {
                resultsContainer.append(`
                    <a href="${s.url}" style="text-decoration:none; color:#333; padding:12px; border-bottom:1px solid #eee; display:block; border-radius:4px; transition:0.2s;">
                        ${s.title}
                    </a>
                `);
            });
        }
    }
});

// FUNCIONES GLOBALES PARA ÍNDICE
window.removeSong = function(id, event) {
    event.preventDefault();
    event.stopPropagation();
    favorites = favorites.filter(f => f.id !== id);
    localStorage.setItem('mySetlist', JSON.stringify(favorites));
    updateCounts();
    window.filterSongs();
}

window.clearSetlist = function() {
    if(confirm("¿Estás seguro de que deseas eliminar todas las canciones del Setlist actual?")) {
        favorites = [];
        localStorage.setItem('mySetlist', '[]');
        updateCounts();
        window.filterSongs();
    }
}

window.moveSong = function(btn, direction, event) {
    event.preventDefault();
    event.stopPropagation();
    let item = btn.closest('.song-item');
    let id = item.getAttribute('data-id');
    let favIndex = favorites.findIndex(f => f.id === id);
    
    if (favIndex === -1) return;
    if (direction === -1 && favIndex > 0) {
        let temp = favorites[favIndex - 1];
        favorites[favIndex - 1] = favorites[favIndex];
        favorites[favIndex] = temp;
    } else if (direction === 1 && favIndex < favorites.length - 1) {
        let temp = favorites[favIndex + 1];
        favorites[favIndex + 1] = favorites[favIndex];
        favorites[favIndex] = temp;
    } else return;
    
    localStorage.setItem('mySetlist', JSON.stringify(favorites));
    window.filterSongs();
}

window.filterSongs = function() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    const cleanText = (text) => text.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").replace(/[.,]/g, "").trim();
    const filter = cleanText(input.value);
    const songList = document.getElementById('songList');
    const items = Array.from(songList.getElementsByClassName('song-item'));
    let hasResults = false;

    if (currentMode === 'setlist') {
        items.sort((a, b) => {
            let idA = a.getAttribute('data-id');
            let idB = b.getAttribute('data-id');
            let idxA = favorites.findIndex(f => f.id === idA);
            let idxB = favorites.findIndex(f => f.id === idB);
            if (idxA === -1) idxA = 99999;
            if (idxB === -1) idxB = 99999;
            return idxA - idxB;
        });
    } else {
        items.sort((a, b) => parseInt(a.getAttribute('data-index')) - parseInt(b.getAttribute('data-index')));
    }
    
    items.forEach(item => songList.appendChild(item));

    for (let i = 0; i < items.length; i++) {
        let songText = cleanText(items[i].textContent || items[i].innerText);
        let sortBtns = items[i].querySelector('.sort-btns');
        let rmBtn = items[i].querySelector('.remove-btn');
        let itemId = items[i].getAttribute('data-id');
        
        let isFav = favorites.findIndex(f => f.id === itemId) > -1;
        let matchesSearch = songText.indexOf(filter) > -1;
        let matchesTab = currentMode === 'all' || (currentMode === 'setlist' && isFav);

        if (matchesSearch && matchesTab) {
            items[i].style.display = "flex";
            hasResults = true;
        } else {
            items[i].style.display = "none";
        }

        if (sortBtns) sortBtns.style.display = (currentMode === 'setlist') ? 'flex' : 'none';
        if (rmBtn) rmBtn.style.display = (currentMode === 'setlist') ? 'block' : 'none';
    }
    let noRes = document.getElementById('no-results');
    if (noRes) noRes.style.display = hasResults ? "none" : "block";
}

function updateCounts() {
    let el = document.getElementById('setlist-count');
    if(el) el.innerText = favorites.length;
}

window.copySetlistToWord = function() {
    const justTitles = confirm("¿Deseas copiar SÓLO LOS TÍTULOS de las canciones?\\n\\n- Haz clic en 'Aceptar' para solo los títulos.\\n- Haz clic en 'Cancelar' para copiar el repertorio COMPLETO (Ideal para pegar en Word, respetando espacios).");
    
    let container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    
    let header = document.createElement('h2');
    header.innerText = 'MI SETLIST';
    header.style.color = '#2563eb';
    header.style.fontFamily = 'Arial, sans-serif';
    container.appendChild(header);
    
    const items = document.getElementsByClassName('song-item');
    let hasSongs = false;
    
    for (let i = 0; i < items.length; i++) {
        let filename = items[i].getAttribute('data-id');
        let fav = favorites.find(f => f.id === filename);
        
        if (fav && items[i].style.display !== "none") {
            hasSongs = true;
            let titleText = items[i].querySelector('a').innerText;
            
            let titleEl = document.createElement('h3');
            titleEl.innerText = titleText;
            titleEl.style.color = '#333';
            titleEl.style.fontFamily = 'Arial, sans-serif';
            titleEl.style.marginTop = '20px';
            titleEl.style.marginBottom = '10px';
            container.appendChild(titleEl);
            
            if (!justTitles) {
                let hiddenPre = document.getElementById('raw-' + filename);
                if (hiddenPre) {
                    let origKeyName = items[i].getAttribute('data-orig-key');
                    let targetKeyName = fav.key ? fav.key : origKeyName;
                    
                    let blockEl = document.createElement('div');
                    blockEl.style.fontFamily = "Arial, sans-serif";
                    blockEl.style.fontSize = "10pt";
                    blockEl.style.marginBottom = "20px";
                    
                    let linesData = getTransposedLines(hiddenPre, origKeyName, targetKeyName);
                    let outputHTML = "";
                    
                    for (let lineData of linesData) {
                        let htmlText = lineData.text;
                        if (lineData.isChord) {
                            htmlText = htmlText.replace(chordReplaceRegex, "<span style='color: #2563eb; font-weight: bold;'>$1</span>");
                        }
                        
                        // Reemplazar espacios por &nbsp; solo fuera de los tags HTML para no afectar estilos
                        let parts = htmlText.split(/(<[^>]+>)/);
                        for(let p=0; p<parts.length; p++) {
                            if(!parts[p].startsWith('<')) {
                                parts[p] = parts[p].replace(/ /g, '&nbsp;');
                            }
                        }
                        htmlText = parts.join('');
                        
                        // Uso estricto de interlineado 0
                        outputHTML += `<div style="margin:0; padding:0; line-height:1; mso-line-height-rule:exactly;">${htmlText || "&nbsp;"}</div>`;
                    }
                    blockEl.innerHTML = outputHTML;
                    container.appendChild(blockEl);
                }
            }
        }
    }
    
    if (!hasSongs) { alert("Tu setlist está vacío."); return; }
    
    document.body.appendChild(container);
    let range = document.createRange();
    range.selectNodeContents(container);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    
    try {
        document.execCommand('copy');
        alert("¡Setlist copiado al portapapeles!\\n\\nAbre Microsoft Word y presiona Pegar. Se conservarán acordes y espacios.");
    } catch (err) { alert("Tu navegador no soporta el copiado automático."); }
    
    sel.removeAllRanges();
    document.body.removeChild(container);
}

function buildPrintZone() {
    const printZone = document.getElementById('print-zone');
    if(!printZone) return false;
    printZone.innerHTML = ''; 
    let hasSongs = false;
    let totalLines = 0;
    
    const items = document.getElementsByClassName('song-item');
    for (let i = 0; i < items.length; i++) {
        let filename = items[i].getAttribute('data-id');
        let fav = favorites.find(f => f.id === filename);
        
        if (fav && items[i].style.display !== "none") {
            hasSongs = true;
            let hiddenPre = document.getElementById('raw-' + filename);
            if (hiddenPre) {
                let origKeyName = items[i].getAttribute('data-orig-key');
                let targetKeyName = fav.key ? fav.key : origKeyName;

                let div = document.createElement('div');
                div.className = 'print-song';
                
                let titleText = items[i].querySelector('a').innerText;
                let titleDiv = document.createElement('div');
                titleDiv.innerHTML = "<strong>" + titleText + "</strong><br><br>";
                div.appendChild(titleDiv);

                let linesData = getTransposedLines(hiddenPre, origKeyName, targetKeyName);
                totalLines += linesData.length + 3; // Estimar cantidad de líneas
                let htmlLines = linesData.map(ld => {
                    let t = ld.text;
                    if (ld.isChord) t = t.replace(chordReplaceRegex, "<span class='c'>$1</span>");
                    return t;
                });
                
                let bodyDiv = document.createElement('div');
                bodyDiv.innerHTML = htmlLines.join("<br>");
                div.appendChild(bodyDiv);
                
                printZone.appendChild(div);
            }
        }
    }
    
    // Asignación de columnas dinámicas según la longitud de líneas
    if (totalLines < 60) {
        printZone.style.columnCount = "1";
    } else if (totalLines < 120) {
        printZone.style.columnCount = "2";
    } else {
        printZone.style.columnCount = "3";
    }
    
    return hasSongs;
}

window.printSetlist = function() {
    if (!buildPrintZone()) {
        alert("Tu setlist está vacío.");
        return;
    }
    window.print();
}

window.sendToWhatsApp = function() {
    if (favorites.length === 0) { alert("Tu setlist está vacío."); return; }
    alert("⚠️ WhatsApp no permite enviar archivos PDF directamente desde enlaces web.\\n\\nA continuación se abrirá la vista de impresión. Por favor:\\n\\n1. Cambia el Destino a 'Guardar como PDF'.\\n2. Guárdalo y envíalo manualmente por WhatsApp.");
    window.printSetlist();
}
"""
    app_js_content = app_js_template.replace("{{SONG_DB}}", song_db_str)
    
    with open("app.js", "w", encoding="utf-8") as f:
        f.write(app_js_content)
    print("✅ Archivo app.js generado con éxito.")


def create_index_html(song_data):
    """Genera el archivo index.html central tomando como referencia la base y añadiendo las funciones de Setlist."""
    
    index_html_template = """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Cuadernillo con Acordes 2.0</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        :root { --primary: #2563eb; --bg: #f4f4f4; --text: #333; }
        body { font-family: Arial, sans-serif; background-color: var(--bg); margin: 0; padding: 0; }
        
        .navbar { background: var(--primary); padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; color: white; position: sticky; top: 0; z-index: 1000; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .navbar a { color: white; text-decoration: none; font-size: 14px; font-weight: bold; padding: 8px 12px; border-radius: 4px; }
        .navbar a:hover { background: rgba(255,255,255,0.2); }

        .container { max-width: 700px; margin: 20px auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); min-height: 80vh; }
        h1 { text-align: center; color: #333; font-size: 22px; margin-bottom: 20px; }

        /* Estilos de Pestañas (Tabs) */
        .tabs-container { display: flex; gap: 10px; margin-bottom: 15px; }
        .tab-btn { flex: 1; padding: 12px; border: none; background: #e2e8f0; color: #475569; font-size: 15px; font-weight: bold; border-radius: 6px; cursor: pointer; transition: 0.3s; }
        .tab-btn:hover { background: #cbd5e1; }
        .tab-btn.active { background: var(--primary); color: white; box-shadow: 0 2px 4px rgba(37, 99, 235, 0.3); }

        /* Botones de Acción Setlist */
        #setlist-actions { display: none; gap: 10px; margin-bottom: 20px; justify-content: center; flex-wrap: wrap; }
        .action-btn { flex: 1; background: #10b981; color: white; border: none; padding: 12px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.3s; font-size: 14px; min-width: 130px; }
        .action-btn:hover { background: #059669; }
        .action-btn.txt-btn { background: #3b82f6; } 
        .action-btn.txt-btn:hover { background: #2563eb; }
        .action-btn.clear-btn { background: #ef4444; }
        .action-btn.clear-btn:hover { background: #dc2626; }
        .action-btn.wp-btn { background: #25D366; color: white; }
        .action-btn.wp-btn:hover { background: #128C7E; }

        .search-box { width: 100%; padding: 12px; margin-bottom: 20px; border: 2px solid #e2e8f0; border-radius: 6px; box-sizing: border-box; font-size: 16px; outline: none; transition: border-color 0.3s; }
        .search-box:focus { border-color: var(--primary); }

        .song-list { display: flex; flex-direction: column; }
        .song-item { display: flex; align-items: center; border-bottom: 1px solid #eee; padding-left: 10px; transition: background-color 0.2s; }
        .song-item:hover { background: #f8fafc; }
        
        /* Botones de Ordenamiento y Remover */
        .sort-btns { display: none; flex-direction: column; align-items: center; justify-content: center; margin-right: 15px; color: #94a3b8; }
        .sort-btns i { padding: 4px 8px; cursor: pointer; transition: color 0.2s; font-size: 14px; }
        .sort-btns i:hover { color: var(--primary); }
        
        .remove-btn { display: none; color: #ef4444; cursor: pointer; margin-right: 15px; font-size: 16px; padding: 5px; transition: 0.2s; }
        .remove-btn:hover { color: #dc2626; transform: scale(1.1); }

        .song-item a { flex-grow: 1; text-decoration: none; color: #333; display: block; padding: 12px 10px; font-size: 16px; }
        .song-item a:hover { color: var(--primary); }
        .index-number { font-weight: bold; color: var(--primary); margin-right: 10px; min-width: 35px; display: inline-block; }
        
        footer { margin-top: 40px; padding: 25px; background: #fff; border-top: 1px solid #ddd; text-align: center; color: #666; }
        .social-links { display: flex; justify-content: center; gap: 20px; margin-top: 10px; }
        .social-links a { color: #666; font-size: 20px; text-decoration: none; transition: 0.3s; }
        .social-links a:hover { color: var(--primary); }

        /* Zona de Impresión Oculta en Web */
        #print-zone { display: none; }

        /* Estilos de Impresión Continua a 3 Columnas */
        @media print {
            * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
            }
            body > *:not(#print-zone) { display: none !important; }
            body { background: white; margin: 0; padding: 0; }
            #print-zone {
                display: block !important;
                /* El JS calculará dinámicamente cuántas columnas renderizar */
                column-gap: 25px;
                width: 100%;
            }
            .print-song {
                margin-bottom: 15px;
                font-family: Arial, sans-serif !important;
                font-size: 10pt !important;
                white-space: pre-wrap;
                line-height: 1.1;
                overflow: hidden;
                /* Flujo continuo para ahorrar páginas */
                break-inside: auto; 
                page-break-inside: auto;
            }
            .print-song span.c {
                font-weight: bold !important;
                color: #2563eb !important; 
            }
        }
    </style>
</head>
<body>
    <nav class="navbar" style="background:white; height:65px; display:flex; justify-content:space-between; align-items:center; padding:0 20px; position:sticky; top:0; z-index:9999; box-shadow:0 2px 10px rgba(0,0,0,0.1); font-family:Arial, sans-serif;">
        <div style="font-weight:bold; color:#2563eb; font-size:1.2rem;">Cuadernillo Digital 2.0</div>
        
        <div id="mobile-menu" style="cursor:pointer; font-size:1.5rem; color:#333;">
            <i class="fas fa-bars"></i>
        </div>

        <ul id="nav-list" style="position:absolute; top:65px; left:0; width:100%; background:white; list-style:none; margin:0; padding:0; display:none; flex-direction:column; box-shadow:0 5px 10px rgba(0,0,0,0.1);">
            <li style="border-bottom:1px solid #eee;"><a href="https://cuadernillo.atec.mx/indexold.htm" style="display:block; padding:15px; text-decoration:none; color:#333;">Versión Anterior</a></li>
            <li style="border-bottom:1px solid #eee;"><a href="https://cuadernillo.atec.mx/circulomusical.htm" style="display:block; padding:15px; text-decoration:none; color:#333;">Círculo Musical</a></li>
        </ul>
    </nav>

    <div class="container">
        <h1>Índice de Canciones</h1>
        
        <div class="tabs-container">
            <button class="tab-btn active" id="tab-all" style="background: #2563eb; color: white;">Todas</button>
            <button class="tab-btn" id="tab-setlist">Mi Setlist (<span id="setlist-count">0</span>)</button>
        </div>

        <div id="setlist-actions">
            <button onclick="clearSetlist()" class="action-btn clear-btn"><i class="fas fa-trash"></i> Nuevo Setlist</button>
            <button onclick="copySetlistToWord()" class="action-btn txt-btn"><i class="fas fa-file-word"></i> Copiar a Word</button>
            <button onclick="printSetlist()" class="action-btn"><i class="fas fa-print"></i> Imprimir a PDF</button>
            <button onclick="sendToWhatsApp()" class="action-btn wp-btn"><i class="fab fa-whatsapp"></i> PDF por WhatsApp</button>
        </div>

        <input type="text" id="searchInput" class="search-box" placeholder="Buscar por título o número...">
        
        <div class="song-list" id="songList">
            {{ITEMS}}
        </div>
        <div id="no-results" style="display:none; text-align:center; padding:20px; color:#999;">No se encontraron canciones.</div>
    </div>

    <!-- Contenedor oculto con los datos crudos para impresión y word -->
    <div id="raw-data-container" style="display:none;">
        {{RAW_PRES}}
    </div>

    <div id="print-zone"></div>

    <footer>
        <p>Desarrollado por www.atec.mx &copy; 2026</p>
        <div class="social-links">
            <a href="https://www.instagram.com/tavitolinux/"><i class="fab fa-instagram"></i></a>
            <a href="https://wa.me/525518000437"><i class="fab fa-whatsapp"></i></a>
        </div>
    </footer>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="app.js"></script>
</body>
</html>
"""
    items = ""
    raw_pres = ""
    
    def natural_sort_key(s):
        return [int(text) if text.isdigit() else text.lower()
                for text in re.split('([0-9]+)', s['title'])]
    
    sorted_songs = sorted(song_data, key=natural_sort_key)
    
    for i, song in enumerate(sorted_songs):
        title = song['title']
        filename = song['filename']
        content = song['content']
        original_key = song.get('original_key', 'C')
        
        parts = title.split('.', 1)
        idx = parts[0]
        name = parts[1].strip() if len(parts) > 1 else ""
        
        sort_btns = '<div class="sort-btns"><i class="fas fa-chevron-up" onclick="moveSong(this, -1, event)"></i><i class="fas fa-chevron-down" onclick="moveSong(this, 1, event)"></i></div>'
        remove_btn = f'<i class="fas fa-trash remove-btn" onclick="removeSong(\'{filename}\', event)" title="Quitar del Setlist"></i>'
        
        items += f'<div class="song-item" data-id="{filename}" data-index="{i}" data-orig-key="{original_key}">{sort_btns}{remove_btn}<a href="{filename}"><span class="index-number">{idx}.</span><span>{name}</span></a></div>\n'
        
        escaped_content = content.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
        raw_pres += f'<pre id="raw-{filename}">{escaped_content}</pre>\n'
    
    final_html = index_html_template.replace("{{ITEMS}}", items).replace("{{RAW_PRES}}", raw_pres)
    
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(final_html)
    print("✅ Archivo index.html generado con éxito.")

def create_song_file(content, title, filename, original_key, prev_file, next_file):
    """Genera cada archivo HTML de canción tomando la plantilla original provista por el usuario."""

    song_html_template = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>{title}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        body {{ font-family: Arial, sans-serif; background: #fff; margin: 0; padding-bottom: 90px; }}
        .song-header {{ background: #f8fafc; padding: 15px; border-bottom: 1px solid #e2e8f0; text-align: center; position: relative; }}
        h1.title {{ margin: 0; font-size: 18px; color: #2563eb; padding-right: 40px; }}
        
        /* Botón Lupa Buscador */
        .song-search-btn {{ position: absolute; right: 15px; top: 15px; background: none; border: none; font-size: 18px; color: #2563eb; cursor: pointer; }}

        pre {{ 
            font-family: Arial, sans-serif !important; 
            font-size: 10pt !important; 
            line-height: 1.2; 
            white-space: pre; 
            padding: 20px; 
            margin: 0; 
        }}

        span.c {{ color: #2563eb !important; font-weight: bold !important; font-style: normal; }}
        
        .nav-bar {{ position: fixed; bottom: 0; left: 0; right: 0; background: #fff; display: flex; justify-content: space-around; padding: 12px; border-top: 1px solid #ddd; z-index: 1000; }}
        .nav-btn {{ text-decoration: none; color: #444; padding: 10px 15px; border-radius: 6px; border: 1px solid #ccc; font-size: 14px; background: #fdfdfd; cursor: pointer; display: flex; align-items: center; gap: 5px; }}
        .nav-btn.primary {{ background: #2563eb; color: white; border: none; }}
        
        /* Controles + Agregar Estrella */
        .transpose-controls {{ position: fixed; right: 15px; top: 70px; display: flex; flex-direction: column; gap: 10px; z-index: 1100; }}
        .transpose-controls button {{ width: 45px; height: 45px; border-radius: 50%; border: none; background: #2563eb; color: white; font-size: 22px; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.2); display:flex; justify-content:center; align-items:center; transition: 0.2s; }}
        .transpose-controls button:hover {{ transform: scale(1.05); }}
        .btn-setlist {{ background: #10b981 !important; font-size: 18px !important; }}
        
        @media (max-width: 600px) {{
            .transpose-controls {{ top: 80px; right: 10px; flex-direction: row; }}
            .transpose-controls button {{ width: 40px; height: 40px; font-size: 18px; }}
        }}
    </style>
</head>
<body>
    <div class="song-header">
        <h1 class="title">{title}</h1>
        <button class="song-search-btn" id="openSearchBtn" title="Buscar otra canción"><i class="fas fa-search"></i></button>
    </div>

    <!-- Contenedor Visual (La transposición se hace a nivel local en script.js) -->
    <pre id="song-content" data-key="{original_key}">{content.strip()}</pre>

    <!-- El contenido inmutable oculto para que app.js lo utilice al guardar el tono en el Setlist -->
    <script id="original-content" type="text/plain">{content.strip()}</script>

    <div class="transpose-controls">
        <button id="transpose-up" title="Subir tono">+</button>
        <button id="transpose-down" title="Bajar tono">-</button>
        <button id="btn-add-setlist" class="btn-setlist" title="Agregar al Setlist con el tono actual"><i class="fas fa-star"></i></button>
    </div>

    <nav class="nav-bar">
        <a href="{prev_file if prev_file else '#'}" class="nav-btn" {'style="visibility:hidden"' if not prev_file else ''}><i class="fas fa-arrow-left"></i> Ant</a>
        <a href="index.html" class="nav-btn primary"><i class="fas fa-home"></i> Inicio</a>
        <a href="{next_file if next_file else '#'}" class="nav-btn" {'style="visibility:hidden"' if not next_file else ''}>Sig <i class="fas fa-arrow-right"></i></a>
    </nav>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="script.js"></script>
    <script src="app.js"></script>
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

    # Usamos la lógica de lectura y Regex original de tu base
    with open(html_file, "r", encoding="utf-8", errors="replace") as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')
    pre_tag = soup.find('pre')
    if not pre_tag:
        print("Error: No se encontró la etiqueta <pre> en el archivo maestro.")
        return

    full_text = pre_tag.get_text()
    original_key_global = pre_tag.get('data-key', 'C')
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
            'content': content,
            'original_key': original_key_global
        })

    def natural_sort_key(s):
        return [int(text) if text.isdigit() else text.lower()
                for text in re.split('([0-9]+)', s['title'])]
    
    song_data.sort(key=natural_sort_key)

    # Generamos el nuevo script externo
    create_app_js(song_data)

    # Generamos las canciones sin alterar el footer
    for i, song in enumerate(song_data):
        prev_f = song_data[i-1]['filename'] if i > 0 else None
        next_f = song_data[i+1]['filename'] if i < len(song_data)-1 else None
        create_song_file(song['content'], song['title'], song['filename'], 
                         song['original_key'], prev_f, next_f)

    # Generamos el índice
    create_index_html(song_data)
    
    print(f"🚀 Proceso completado. {len(song_data)} canciones individuales y app.js fueron generados correctamente.")

if __name__ == "__main__":
    generate_songs_from_html("CuadernilloTranspose.html")