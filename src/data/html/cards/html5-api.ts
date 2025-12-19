import { ContentSection } from '../../types';

export const html5ApiContent: ContentSection[] = [
  {
    title: 'Canvas API',
    content: 'HTML5 Canvas предоставляет мощные возможности для рисования 2D графики на веб-страницах с помощью JavaScript. Позволяет создавать игры, визуализации данных, редакторы изображений.',
    code: `<canvas id="myCanvas" width="400" height="200"></canvas>
<script>
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
// Рисуем прямоугольник
ctx.fillStyle = '#3ddac1';
ctx.fillRect(50, 50, 200, 100);
</script>`
  },
  {
    title: 'Web Storage API',
    content: 'Web Storage API позволяет хранить данные локально в браузере. localStorage сохраняет данные без срока давности, sessionStorage - только на время сессии.',
    code: `// Сохранение данных
localStorage.setItem('username', 'John');
sessionStorage.setItem('sessionId', '12345');

// Получение данных
const user = localStorage.getItem('username');
const session = sessionStorage.getItem('sessionId');

// Удаление данных
localStorage.removeItem('username');
sessionStorage.clear();`
  },
  {
    title: 'Geolocation API',
    content: 'Geolocation API позволяет запрашивать географическое положение пользователя с его согласия. Полезно для карт, локального контента, геотаргетинга.',
    code: `if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      console.log('Координаты:', lat, lng);
    },
    (error) => {
      console.error('Ошибка геолокации:', error.message);
    }
  );
} else {
  console.log('Геолокация не поддерживается');
}`
  },
  {
    title: 'SVG в HTML5',
    content: 'SVG (Scalable Vector Graphics) позволяет создавать векторную графику, которая масштабируется без потери качества. SVG можно встраивать непосредственно в HTML.',
    code: `<svg width="200" height="100" viewBox="0 0 200 100">
  <circle cx="50" cy="50" r="40" fill="#3ddac1" />
  <rect x="120" y="20" width="60" height="60" fill="#1a73e8" />
  <text x="100" y="85" text-anchor="middle" fill="#fff">
    SVG графика
  </text>
</svg>`
  },
  {
    title: 'Drag and Drop API',
    content: 'Drag and Drop API позволяет реализовать перетаскивание элементов мышью. Полезно для файловых менеджеров, канбан-досок, интерфейсов перетаскивания.',
    code: `// Элемент, который можно перетаскивать
<div id="dragElement" draggable="true">Перетащи меня</div>

// Зона сброса
<div id="dropZone">Сбрось сюда</div>

<script>
const dragElement = document.getElementById('dragElement');
const dropZone = document.getElementById('dropZone');

dragElement.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', 'dragged');
});

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const data = e.dataTransfer.getData('text/plain');
  console.log('Элемент сброшен:', data);
});
</script>`
  }
];
