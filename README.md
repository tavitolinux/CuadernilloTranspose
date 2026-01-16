# 🎸 Cuadernillo Digital con Transposición de Acordes

Este proyecto es un generador automático de cancioneros web diseñado para músicos. Utiliza **Python** para procesar un archivo maestro de cantos y generar un sitio web interactivo, responsivo y con capacidad de transponer acordes en tiempo real.

## 🚀 Características

- **Generación Automática:** Convierte un archivo HTML maestro en cientos de páginas individuales.
- **Transposición en Tiempo Real:** Gracias al plugin de jQuery integrado, permite subir o bajar el tono de cualquier canción.
- **Buscador Dinámico:** Filtro instantáneo por título o número de índice (A1, B2, etc.).
- **Diseño Mobile-First:** Interfaz moderna y minimalista optimizada para celulares y tablets.
- **Navegación Fluida:** Botones de navegación (Anterior, Inicio, Siguiente) en cada página.
- **Orden Natural:** Clasificación lógica de canciones (A1, A2, A10...).

## 🛠️ Tecnologías utilizadas

- **Python 3.x**: Lógica central del procesamiento.
- **BeautifulSoup4**: Scraping y manipulación de HTML.
- **HTML5 & CSS3**: Diseño moderno con Flexbox y variables CSS.
- **JavaScript (Vanilla)**: Buscador dinámico y menú desplegable.
- **jQuery & [jQuery Chord Transposer](https://github.com/jessegavin/jQuery-Chord-Transposer)**: Motor central para la detección y transposición dinámica de acordes musicales.
- 
## 📦 Instalación y Uso

1. **Clona el repositorio:**
   ```bash
   git clone [https://github.com/tavitolinux/CuadernilloTranspose.git](https://github.com/tavitolinux/CuadernilloTranspose.git)

2. Instala las dependencias de Python:
   ```bash
   pip install beautifulsoup4

3. Ejecuta el generador: Coloca tu archivo CuadernilloTranspose.html en la raíz y ejecuta:
   ```bash
   python generate_songs.py

4. Visualiza el resultado: Abre el archivo index.html generado en tu navegador.

📄 Estructura del Proyecto
generate_songs.py: El script principal encargado de la lógica de división y limpieza.

script.js: Plugin encargado de detectar y transponer los acordes.

index.html: Página principal con el buscador y menú de navegación.

style.css: Estilos globales para la visualización de los acordes.

<img width="1366" height="720" alt="image" src="https://github.com/user-attachments/assets/54cfd77f-e74e-49ba-a65e-42fc58ee3781" />
<img width="1366" height="720" alt="image" src="https://github.com/user-attachments/assets/2349bd5d-aa61-45ee-9418-f2f713eef656" />

👤 Autor
Gustavo Ramirez - gustavo@atec.mx

Instagram: @tavitolinux
