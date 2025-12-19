import { ContentSection } from '../../types';

export const semanticMicrodataContent: ContentSection[] = [
  {
    title: 'Расширенная семантика HTML5',
    content: 'HTML5 предоставляет богатый набор семантических элементов, которые несут смысловую нагрузку и улучшают доступность и SEO веб-страниц.',
    code: `<!-- Полная семантическая структура страницы -->
<!DOCTYPE html>
<html lang="ru">
<head>
  <title>Frontend Roadmap - Изучаем веб-разработку</title>
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="#html">HTML</a></li>
        <li><a href="#css">CSS</a></li>
        <li><a href="#js">JavaScript</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="html">
      <article>
        <header>
          <h1>Основы HTML</h1>
          <p>Изучаем структуру веб-документов</p>
        </header>

        <section>
          <h2>Что такое HTML?</h2>
          <p>HTML - это язык разметки гипертекста...</p>
        </section>

        <aside>
          <h3>Полезные ссылки</h3>
          <ul>
            <li><a href="#">MDN документация</a></li>
          </ul>
        </aside>
      </article>
    </section>
  </main>

  <footer>
    <p>&copy; 2024 Frontend Roadmap</p>
  </footer>
</body>
</html>`
  },
  {
    title: 'Специализированные семантические теги',
    items: [
      '<time> - дата/время (datetime атрибут)',
      '<figure>/<figcaption> - иллюстрации с подписями',
      '<mark> - выделенный текст',
      '<details>/<summary> - раскрывающиеся блоки',
      '<progress> - индикатор прогресса',
      '<meter> - шкала измерения',
      '<output> - результат вычислений',
      '<data> - машиночитаемые данные (value атрибут)',
      '<dialog> - модальные диалоги',
      '<address> - контактная информация'
    ]
  },
  {
    title: 'Микроразметка Schema.org',
    content: 'Schema.org - это совместный проект Google, Microsoft, Yahoo и Yandex по созданию единого словаря для структурированных данных.',
    code: `<!-- Микроразметка организации -->
<div itemscope itemtype="https://schema.org/Organization">
  <span itemprop="name">Frontend Roadmap</span>
  <div itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
    <span itemprop="addressLocality">Москва</span>,
    <span itemprop="addressCountry">Россия</span>
  </div>
  <span itemprop="email">contact@frontendroadmap.com</span>
  <a itemprop="url" href="https://frontendroadmap.com">frontendroadmap.com</a>
</div>

<!-- Микроразметка продукта -->
<div itemscope itemtype="https://schema.org/Product">
  <span itemprop="name">Курс по HTML</span>
  <div itemprop="offers" itemscope itemtype="https://schema.org/Offer">
    <span itemprop="priceCurrency" content="RUB">₽</span>
    <span itemprop="price" content="2990">2990</span>
  </div>
  <div itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">
    <span itemprop="ratingValue">4.8</span> из
    <span itemprop="bestRating">5</span> на основе
    <span itemprop="ratingCount">125</span> отзывов
  </div>
</div>`
  },
  {
    title: 'JSON-LD формат',
    content: 'JSON-LD (JavaScript Object Notation for Linking Data) - рекомендованный Google формат структурированных данных. Он не влияет на отображение страницы.',
    code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Frontend Roadmap",
  "description": "Комплексный курс по фронтенд разработке",
  "provider": {
    "@type": "Organization",
    "name": "Frontend Roadmap",
    "url": "https://frontendroadmap.com"
  },
  "courseMode": "online",
  "educationalLevel": "Beginner to Advanced",
  "teaches": [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js"
  ],
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "online",
    "instructor": {
      "@type": "Person",
      "name": "Игорь Ао"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "847"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "RUB",
    "availability": "https://schema.org/InStock"
  }
}
</script>`
  },
  {
    title: 'Open Graph и Twitter Cards',
    content: 'Специальные мета-теги для социальных сетей, которые определяют, как будет выглядеть превью ссылки при публикации.',
    code: `<!-- Open Graph для Facebook, VK, Telegram -->
<meta property="og:title" content="Frontend Roadmap - Изучай веб-разработку">
<meta property="og:description" content="Интерактивная дорожная карта для изучения фронтенд разработки от основ до продвинутых технологий">
<meta property="og:image" content="https://frontendroadmap.com/og-image.jpg">
<meta property="og:url" content="https://frontendroadmap.com">
<meta property="og:type" content="website">
<meta property="og:locale" content="ru_RU">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Frontend Roadmap">
<meta name="twitter:description" content="Изучай веб-разработку с интерактивной дорожной картой">
<meta name="twitter:image" content="https://frontendroadmap.com/twitter-image.jpg">
<meta name="twitter:site" content="@frontendroadmap">

<!-- VK и другие соцсети -->
<meta property="vk:image" content="https://frontendroadmap.com/vk-image.jpg">`
  },
  {
    title: 'Проверка структурированных данных',
    content: 'Google предлагает инструменты для проверки правильности микроразметки: Rich Results Test, Schema Markup Validator.',
    code: `<!-- Пример валидной микроразметки для поиска -->
<div itemscope itemtype="https://schema.org/FAQPage">
  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">Что такое HTML?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <div itemprop="text">
        <p>HTML (HyperText Markup Language) - это стандартный язык разметки для создания веб-страниц.</p>
      </div>
    </div>
  </div>

  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">Зачем нужна семантика?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <div itemprop="text">
        <p>Семантическая разметка улучшает доступность, SEO и делает код более понятным для разработчиков.</p>
      </div>
    </div>
  </div>
</div>`
  }
];
