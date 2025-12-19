import { ContentSection } from '../../types';

export const seoAccessibilityContent: ContentSection[] = [
  {
    title: 'Мета-теги для SEO',
    content: 'Мета-теги предоставляют информацию о странице поисковым системам и социальным сетям. Правильное использование повышает видимость сайта.',
    code: `<head>
  <!-- Основные мета-теги -->
  <meta name="description" content="Подробное описание страницы до 160 символов">
  <meta name="keywords" content="ключевые, слова, через, запятую">
  <meta name="author" content="Имя автора">

  <!-- Open Graph для социальных сетей -->
  <meta property="og:title" content="Заголовок для соцсетей">
  <meta property="og:description" content="Описание для соцсетей">
  <meta property="og:image" content="https://site.com/image.jpg">
  <meta property="og:url" content="https://site.com/page">

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Заголовок для Twitter">
</head>`
  },
  {
    title: 'ARIA атрибуты',
    content: 'ARIA (Accessible Rich Internet Applications) - спецификация для улучшения доступности веб-приложений. ARIA атрибуты описывают роль, состояние и свойства элементов.',
    code: `<!-- Роли элементов -->
<button aria-label="Закрыть модальное окно">×</button>

<!-- Состояния -->
<button aria-expanded="false" aria-controls="menu">
  Меню
</button>

<!-- Связи между элементами -->
<div role="tablist">
  <button role="tab"
          aria-selected="true"
          aria-controls="panel1"
          id="tab1">
    Вкладка 1
  </button>
</div>
<div role="tabpanel"
     aria-labelledby="tab1"
     id="panel1">
  Содержимое вкладки
</div>`
  },
  {
    title: 'Семантическая разметка',
    content: 'Семантические теги HTML5 несут смысловую нагрузку, помогая поисковикам и скринридерам лучше понимать структуру контента.',
    code: `<article>
  <header>
    <h1>Заголовок статьи</h1>
    <time datetime="2024-01-15">15 января 2024</time>
  </header>

  <section>
    <h2>Введение</h2>
    <p>Текст введения...</p>
  </section>

  <section>
    <h2>Основная часть</h2>
    <p>Основной контент...</p>
  </section>

  <aside>
    <h3>Похожие статьи</h3>
    <ul>
      <li><a href="#">Статья 1</a></li>
      <li><a href="#">Статья 2</a></li>
    </ul>
  </aside>

  <footer>
    <p>Автор: Иван Иванов</p>
  </footer>
</article>`
  },
  {
    title: 'Доступность изображений',
    content: 'Атрибуты alt и title для изображений, правильное использование фигур и подписи обеспечивают доступность для пользователей с ограниченными возможностями.',
    code: `<!-- Основное изображение -->
<img src="photo.jpg"
     alt="Кот играет с клубком ниток"
     title="Милый рыжий кот">

<!-- Декоративное изображение -->
<img src="decoration.png"
     alt=""
     role="presentation">

<!-- Изображение с подписью -->
<figure>
  <img src="diagram.png"
       alt="Схема работы алгоритма">
  <figcaption>
    Рисунок 1: Поток выполнения алгоритма
  </figcaption>
</figure>`
  },
  {
    title: 'Клавиатурная навигация',
    content: 'Обеспечение доступа ко всем интерактивным элементам с клавиатуры. Правильный порядок табуляции и видимые индикаторы фокуса.',
    code: `/* CSS для видимого фокуса */
button:focus,
a:focus,
input:focus {
  outline: 2px solid #3ddac1;
  outline-offset: 2px;
}

/* HTML с правильным порядком табуляции */
<nav>
  <ul>
    <li><a href="#main" tabindex="0">Пропустить навигацию</a></li>
    <li><a href="/home">Главная</a></li>
    <li><a href="/about">О нас</a></li>
  </ul>
</nav>

<main id="main" tabindex="-1">
  <!-- Основной контент -->
</main>`
  }
];
