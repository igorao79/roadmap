import { ContentSection } from '../types';

export const htmlContent: Record<string, ContentSection[]> = {
  'html-basics': [
    {
      title: 'Что такое HTML?',
      content: 'HTML (HyperText Markup Language) - это стандартный язык разметки для создания веб-страниц. Он определяет структуру и содержание веб-документа с помощью различных тегов и атрибутов.'
    },
    {
      title: 'Основные понятия',
      items: [
        'Теги: Элементы разметки, заключенные в угловые скобки. Например: <p>, <div>, <h1>',
        'Атрибуты: Свойства тегов, которые определяют их поведение или внешний вид',
        'Элементы: Полные конструкции из открывающего и закрывающего тегов',
        'Семантика: Правильное использование тегов по их назначению для SEO и доступности'
      ]
    },
    {
      title: 'Структура HTML документа',
      code: `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Моя страница</title>
</head>
<body>
    <header>
        <h1>Заголовок страницы</h1>
    </header>

    <main>
        <p>Основной контент страницы</p>
    </main>

    <footer>
        <p>Подвал сайта</p>
    </footer>
</body>
</html>`
    }
  ],

  'html5-api': [
    {
      title: 'Canvas API',
      content: 'HTML5 Canvas предоставляет мощные возможности для рисования графики на веб-страницах с помощью JavaScript.'
    },
    {
      title: 'Web Storage',
      content: 'Web Storage API позволяет хранить данные локально в браузере пользователя. Включает localStorage и sessionStorage.'
    },
    {
      title: 'Geolocation API',
      content: 'Geolocation API позволяет запрашивать географическое положение пользователя с его согласия.'
    }
  ],

  'seo-accessibility': [
    {
      title: 'Мета-теги для SEO',
      content: 'Правильное использование мета-тегов помогает поисковым системам лучше индексировать ваш сайт.'
    },
    {
      title: 'ARIA атрибуты',
      content: 'ARIA (Accessible Rich Internet Applications) - набор атрибутов для улучшения доступности веб-приложений.'
    },
    {
      title: 'Семантическая разметка',
      content: 'Использование правильных семантических тегов (header, nav, main, article, aside, footer) для лучшей структуры документа.'
    }
  ]
};

