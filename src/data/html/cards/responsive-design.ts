import { ContentSection } from '../../types';

export const responsiveDesignContent: ContentSection[] = [
  {
    title: 'Viewport и мобильная адаптация',
    content: 'Viewport meta tag контролирует отображение страницы на мобильных устройствах. Правильная настройка viewport - основа responsive дизайна.',
    code: `<head>
  <!-- Базовая настройка viewport -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Расширенная настройка -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0,
        maximum-scale=5.0, user-scalable=yes">

  <!-- Для iOS Safari (цвет статус-бара) -->
  <meta name="theme-color" content="#3ddac1">
</head>`
  },
  {
    title: 'Media queries',
    content: 'Media queries позволяют применять разные стили в зависимости от характеристик устройства: ширины экрана, ориентации, плотности пикселей.',
    code: `/* Mobile First подход */
.container {
  padding: 10px;
}

/* Таблеты (портретная ориентация) */
@media (min-width: 768px) {
  .container {
    padding: 20px;
  }
}

/* Настольные компьютеры */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 30px;
  }
}

/* Ориентация устройства */
@media (orientation: landscape) {
  .sidebar {
    width: 200px;
  }
}

/* Высокая плотность пикселей (Retina) */
@media (-webkit-min-device-pixel-ratio: 2),
       (min-resolution: 192dpi) {
  .logo {
    background-image: url('logo@2x.png');
  }
}`
  },
  {
    title: 'Адаптивные изображения',
    content: 'HTML5 предоставляет несколько способов создания адаптивных изображений, которые загружаются оптимально для каждого устройства.',
    code: `<!-- Srcset для разных разрешений -->
<img src="image-800w.jpg"
     srcset="image-400w.jpg 400w,
             image-800w.jpg 800w,
             image-1200w.jpg 1200w"
     sizes="(max-width: 600px) 400px,
            (max-width: 1200px) 800px,
            1200px"
     alt="Адаптивное изображение">

<!-- Picture элемент для разных форматов -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Изображение">
</picture>`
  },
  {
    title: 'Fluid типографика',
    content: 'Fluid typography автоматически масштабирует размер текста в зависимости от размера экрана, обеспечивая отличную читаемость на всех устройствах.',
    code: `/* Fluid типографика с clamp() */
h1 {
  font-size: clamp(2rem, 5vw, 4rem);
}

p {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
}

/* Fluid spacing */
.section {
  padding: clamp(1rem, 4vw, 3rem);
}

/* Fluid grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(200px, 25vw, 300px), 1fr));
  gap: clamp(1rem, 3vw, 2rem);
}`
  },
  {
    title: 'CSS Grid и Flexbox',
    content: 'Современные CSS Grid и Flexbox позволяют создавать сложные адаптивные макеты без использования float или абсолютного позиционирования.',
    code: `/* CSS Grid для макета */
.container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 768px) {
  .container {
    grid-template-columns: 200px 1fr;
  }
}

@media (min-width: 1024px) {
  .container {
    grid-template-columns: 200px 1fr 200px;
  }
}

/* Flexbox для компонентов */
.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 600px) {
  .card {
    flex-direction: row;
  }
}`
  },
  {
    title: 'Тестирование responsive дизайна',
    content: 'Важно тестировать дизайн на реальных устройствах и использовать инструменты разработчика для симуляции разных экранов.',
    code: `/* CSS для тестирования breakpoint'ов */
.test-breakpoints::before {
  content: "Mobile";
  background: red;
  color: white;
  padding: 5px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}

@media (min-width: 768px) {
  .test-breakpoints::before {
    content: "Tablet";
    background: orange;
  }
}

@media (min-width: 1024px) {
  .test-breakpoints::before {
    content: "Desktop";
    background: green;
  }
}`
  }
];
