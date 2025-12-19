import { ContentSection } from '../../types';

export const multimediaContent: ContentSection[] = [
  {
    title: 'HTML5 Video',
    content: 'HTML5 video элемент позволяет воспроизводить видео файлы без использования сторонних плагинов. Поддерживает несколько форматов и предоставляет богатый API для управления воспроизведением.',
    code: `<video width="640" height="360" controls poster="poster.jpg">
  <!-- Несколько источников для кроссбраузерности -->
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.webm" type="video/webm">
  <source src="movie.ogv" type="video/ogg">

  <!-- Fallback контент -->
  <p>Ваш браузер не поддерживает HTML5 video.
     <a href="movie.mp4">Скачать видео</a>
  </p>
</video>`
  },
  {
    title: 'Атрибуты видео',
    items: [
      'controls - отображение элементов управления',
      'autoplay - автоматическое воспроизведение (с осторожностью)',
      'loop - зацикленное воспроизведение',
      'muted - отключение звука по умолчанию',
      'poster - изображение-заставка',
      'preload - предзагрузка видео (none/metadata/auto)',
      'width/height - размеры видеоэлемента'
    ]
  },
  {
    title: 'HTML5 Audio',
    content: 'HTML5 audio элемент позволяет воспроизводить аудио файлы с поддержкой различных форматов. Полностью контролируется через JavaScript API.',
    code: `<audio controls preload="metadata">
  <source src="music.mp3" type="audio/mpeg">
  <source src="music.ogg" type="audio/ogg">
  <source src="music.wav" type="audio/wav">

  <!-- Fallback -->
  <p>Ваш браузер не поддерживает HTML5 audio.
     <a href="music.mp3">Скачать аудио</a>
  </p>
</audio>

<!-- Фоновый звук (без элементов управления) -->
<audio autoplay loop muted>
  <source src="background-music.mp3" type="audio/mpeg">
</audio>`
  },
  {
    title: 'Встраивание контента',
    content: 'Элемент iframe позволяет встраивать внешний контент (видео с YouTube, карты, документы) в вашу веб-страницу.',
    code: `<!-- YouTube видео -->
<iframe width="560" height="315"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write;
               encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
</iframe>

<!-- Google Maps -->
<iframe src="https://www.google.com/maps/embed?pb=!1m18!..."
        width="600" height="450" style="border:0;"
        allowfullscreen="" loading="lazy">
</iframe>

<!-- Атрибуты безопасности -->
<iframe src="https://example.com"
        sandbox="allow-scripts allow-same-origin"
        referrerpolicy="no-referrer">
</iframe>`
  },
  {
    title: 'SVG в HTML',
    content: 'SVG (Scalable Vector Graphics) - формат векторной графики, который масштабируется без потери качества. SVG можно встраивать непосредственно в HTML.',
    code: `<svg width="200" height="100" viewBox="0 0 200 100">
  <!-- Прямоугольник -->
  <rect x="10" y="10" width="80" height="40"
        fill="#3ddac1" stroke="#000" stroke-width="2"/>

  <!-- Окружность -->
  <circle cx="150" cy="50" r="30"
          fill="#1a73e8" stroke="#fff" stroke-width="3"/>

  <!-- Путь (произвольная форма) -->
  <path d="M 50 80 L 80 80 L 65 95 Z"
        fill="#ea4335" stroke="#000" stroke-width="1"/>
</svg>

<!-- Встроенный SVG -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
</svg>`
  },
  {
    title: 'Canvas API',
    content: 'Canvas предоставляет API для рисования 2D графики с помощью JavaScript. Позволяет создавать интерактивные визуализации, игры и редакторы изображений.',
    code: `<canvas id="myCanvas" width="400" height="200">
  Ваш браузер не поддерживает HTML5 Canvas
</canvas>

<script>
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Настройка стиля
ctx.strokeStyle = '#3ddac1';
ctx.lineWidth = 3;
ctx.fillStyle = '#1a73e8';

// Рисуем фигуры
ctx.beginPath();
ctx.arc(100, 100, 50, 0, 2 * Math.PI);
ctx.stroke();

ctx.fillRect(200, 50, 100, 100);

// Текст
ctx.fillStyle = '#000';
ctx.font = '20px Arial';
ctx.fillText('Canvas графика', 220, 120);
</script>`
  },
  {
    title: 'Адаптивные изображения',
    content: 'Современные подходы к работе с изображениями обеспечивают оптимальную загрузку и отображение на всех устройствах.',
    code: `<!-- Атрибут srcset для разных разрешений -->
<img src="image-800w.jpg"
     srcset="image-400w.jpg 400w,
             image-800w.jpg 800w,
             image-1200w.jpg 1200w"
     sizes="(max-width: 600px) 400px,
            (max-width: 1200px) 800px,
            1200px"
     alt="Адаптивное изображение">

<!-- Элемент picture для разных форматов -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Изображение в разных форматах">
</picture>`
  }
];
