"use client";

import React, { useState, useEffect } from 'react';

interface RoadmapModalProps {
  isOpen: boolean;
  selectedTech: string;
  onClose: () => void;
}

export function RoadmapModal({ isOpen, selectedTech, onClose }: RoadmapModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setSelectedCard(null); // Сбрасываем выбранную карточку при открытии
    } else {
      // Даем время на анимацию закрытия
      const timer = setTimeout(() => setIsVisible(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Эффект для плавного открытия
  useEffect(() => {
    if (isVisible && !isOpen) {
      // Небольшая задержка для правильного применения начальных стилей
      const timer = setTimeout(() => {
        // Этот таймер очищается, но помогает браузеру применить стили
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [isVisible, isOpen]);

  if (!isVisible && !isOpen) return null;

  // Функция для получения цвета технологии
  const getTechColor = (techName: string) => {
    const key = techName.toLowerCase();

    // Fallback цвета для технологий
    const fallbacks: Record<string, string> = {
      'html': '#E34F26',
      'css': '#1572B6',
      'javascript': '#F7DF1E',
      'typescript': '#3178C6',
      'react': '#61DAFB',
      'tailwindcss': '#06B6D4',
      'tailwind': '#06B6D4',
      'vite': '#646CFF',
      'next.js': '#000000',
      'nextjs': '#000000',
      'next': '#000000',
      'git': '#F05032'
    };

    return fallbacks[key] || '#3ddac1'; // fallback на зеленый
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-600 ease-out-cubic ${
        isOpen ? 'backdrop-blur-md bg-black/10 opacity-100 visible' : 'backdrop-blur-0 bg-black/0 opacity-0 invisible'
      }`}
      style={{
        transitionProperty: 'opacity, backdrop-filter, background-color, visibility',
        transitionDuration: '600ms',
        transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
      <div
        className={`backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl w-[1200px] h-[800px] overflow-hidden ${
          isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
        }`}
        style={{
          transition: 'all 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full flex flex-col">
          {/* Кнопка закрытия */}
          <button
            onClick={() => onClose()}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl font-bold z-10"
          >
            ×
          </button>

          {/* Заголовок модального окна по центру */}
          <div className="text-center py-6 px-6 border-b border-gray-200 dark:border-gray-700 relative flex-shrink-0">
            {selectedCard && (
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute left-6 top-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl font-bold flex items-center gap-2"
              >
                ← Назад
              </button>
            )}
            <h2
              className="text-4xl font-bold"
              style={{ color: getTechColor(selectedTech) }}
            >
              {selectedCard || selectedTech}
            </h2>
          </div>

          {/* Содержимое дорожной карты с прокруткой */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <RoadmapContent
              tech={selectedTech}
              selectedCard={selectedCard}
              onCardSelect={setSelectedCard}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Компонент дорожной карты
const RoadmapContent = ({
  tech,
  selectedCard,
  onCardSelect
}: {
  tech: string;
  selectedCard: string | null;
  onCardSelect: (card: string | null) => void;
}) => {
  // Детальный контент для каждой карточки
  const getDetailedContent = (title: string): React.ReactElement => {
    const detailedContent: Record<string, React.ReactElement> = {
      'Основы HTML': (
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Что такое HTML?</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              HTML (HyperText Markup Language) - это стандартный язык разметки для создания веб-страниц.
              Он определяет структуру и содержание веб-документа с помощью различных тегов и атрибутов.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Основные понятия</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Теги</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Элементы разметки, заключенные в угловые скобки. Например: &lt;p&gt;, &lt;div&gt;, &lt;h1&gt;
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Атрибуты</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Свойства тегов, которые определяют их поведение или внешний вид
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Элементы</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Полные конструкции из открывающего и закрывающего тегов
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Семантика</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Правильное использование тегов по их назначению для SEO и доступности
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Структура HTML документа</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`<!DOCTYPE html>
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
</html>`}</pre>
            </div>
          </div>
        </div>
      ),

      'Основы CSS': (
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Что такое CSS?</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              CSS (Cascading Style Sheets) - это язык описания внешнего вида документа, написанного с использованием HTML.
              Он позволяет задавать цвета, шрифты, размеры, позиции и другие визуальные свойства элементов.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Основные понятия</h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Селекторы</h5>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Способы выбора элементов для применения стилей:
                </p>
                <div className="bg-gray-900 text-yellow-400 p-3 rounded font-mono text-sm">
                  <div>.class - по классу</div>
                  <div>#id - по идентификатору</div>
                  <div>tag - по имени тега</div>
                  <div>[attr] - по атрибуту</div>
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Box Model</h5>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Модель, описывающая пространство, занимаемое элементом:
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="text-center mb-2">
                    <span className="bg-red-200 dark:bg-red-800 px-2 py-1 rounded text-sm">Margin</span>
                  </div>
                  <div className="border-2 border-red-300 dark:border-red-700 p-2">
                    <div className="text-center mb-1">
                      <span className="bg-orange-200 dark:bg-orange-800 px-2 py-1 rounded text-sm">Border</span>
                    </div>
                    <div className="border-2 border-orange-300 dark:border-orange-700 p-2">
                      <div className="text-center mb-1">
                        <span className="bg-yellow-200 dark:bg-yellow-800 px-2 py-1 rounded text-sm">Padding</span>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 p-2 text-center">
                        <span className="bg-white dark:bg-gray-600 px-2 py-1 rounded text-sm">Content</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Позиционирование</h5>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded">
                    <div className="font-semibold text-blue-600 dark:text-blue-400">static</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">По умолчанию</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded">
                    <div className="font-semibold text-blue-600 dark:text-blue-400">relative</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Относительно нормального положения</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded">
                    <div className="font-semibold text-blue-600 dark:text-blue-400">absolute</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Относительно ближайшего позиционированного родителя</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded">
                    <div className="font-semibold text-blue-600 dark:text-blue-400">fixed</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Относительно viewport</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),

      'Основы JS': (
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Что такое JavaScript?</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              JavaScript - это высокоуровневый интерпретируемый язык программирования, который является одной из основных технологий Всемирной паутины.
              Он позволяет создавать динамически обновляемый контент, управлять мультимедиа, анимировать изображения и многое другое.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Переменные</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Переменные - это контейнеры для хранения значений данных. В JavaScript есть три способа объявления переменных:
            </p>
            <div className="bg-gray-900 text-yellow-400 p-4 rounded font-mono text-sm">
              <div><span className="text-blue-400">var</span> oldVariable = <span className="text-green-400">&quot;устаревший способ&quot;</span>;</div>
              <div><span className="text-blue-400">let</span> changeableVar = <span className="text-green-400">&quot;можно изменять&quot;</span>;</div>
              <div><span className="text-blue-400">const</span> constantVar = <span className="text-green-400">&quot;нельзя изменять&quot;</span>;</div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Функции</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Функции - это блоки кода, предназначенные для выполнения определенной задачи. Они могут принимать параметры и возвращать значения.
            </p>
            <div className="bg-gray-900 text-yellow-400 p-4 rounded font-mono text-sm">
              <div><span className="text-purple-400">function</span> greet(name) {'{'}</div>
              <div className="ml-4"><span className="text-blue-400">return</span> <span className="text-green-400">`Привет, ${'{name}'}!`</span>;</div>
              <div>{'}'}</div>
              <br />
              <div><span className="text-blue-400">const</span> greet = (name) =&gt; <span className="text-green-400">`Привет, ${'{name}'}!`</span>;</div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Объекты</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Объекты - это коллекции свойств, где каждое свойство имеет имя и значение. Они используются для хранения структурированных данных.
            </p>
            <div className="bg-gray-900 text-yellow-400 p-4 rounded font-mono text-sm">
              <div><span className="text-blue-400">const</span> person = {'{'} </div>
              <div className="ml-4">name: <span className="text-green-400">&apos;Иван&apos;</span>,</div>
              <div className="ml-4">age: <span className="text-orange-400">25</span>,</div>
              <div className="ml-4">greet: <span className="text-purple-400">function</span>() {'{'} <span className="text-blue-400">return</span> <span className="text-green-400">&apos;Привет!&apos;</span>; {'}'} </div>
              <div>{'}'};</div>
              <br />
              <div><span className="text-green-400">person.name</span>; <span className="text-gray-400">{/* 'Иван' */}</span></div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Массивы</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Массивы - это упорядоченные списки значений. Они могут содержать элементы разных типов и имеют множество встроенных методов.
            </p>
            <div className="bg-gray-900 text-yellow-400 p-4 rounded font-mono text-sm">
              <div><span className="text-blue-400">const</span> numbers = [<span className="text-orange-400">1</span>, <span className="text-orange-400">2</span>, <span className="text-orange-400">3</span>, <span className="text-orange-400">4</span>, <span className="text-orange-400">5</span>];</div>
              <div><span className="text-blue-400">const</span> mixed = [<span className="text-green-400">&apos;text&apos;</span>, <span className="text-orange-400">42</span>, <span className="text-blue-400">true</span>, <span className="text-purple-400">null</span>];</div>
              <br />
              <div><span className="text-green-400">numbers.length</span>; <span className="text-gray-400">{/* 5 */}</span></div>
              <div><span className="text-green-400">numbers[0]</span>; <span className="text-gray-400">{/* 1 */}</span></div>
              <div><span className="text-green-400">numbers.push(6)</span>; <span className="text-gray-400">{/* добавляет элемент */}</span></div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Типы данных</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Примитивные</h5>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">string</code> - строки</li>
                  <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">number</code> - числа</li>
                  <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">boolean</code> - true/false</li>
                  <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">undefined</code> - не определено</li>
                  <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">null</code> - пустое значение</li>
                  <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">symbol</code> - уникальные идентификаторы</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Сложные</h5>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">object</code> - объекты</li>
                  <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">array</code> - массивы</li>
                  <li><code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">function</code> - функции</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    };

    return detailedContent[title] || (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        Детальная информация для «{title}» пока не готова
      </div>
    );
  };

  const getRoadmapData = (techName: string) => {
    const roadmaps: Record<string, Array<{ title: string; description: string; level: string; duration: string }>> = {
      'HTML': [
        { title: 'Основы HTML', description: 'Структура документа, семантические теги, формы', level: 'Начинающий', duration: '1-2 недели' },
        { title: 'HTML5 API', description: 'Canvas, SVG, Web Storage, Geolocation', level: 'Средний', duration: '2-3 недели' },
        { title: 'SEO и доступность', description: 'Мета-теги, ARIA, семантическая разметка', level: 'Продвинутый', duration: '1-2 недели' }
      ],
      'CSS': [
        { title: 'Основы CSS', description: 'Селекторы, свойства, box model, позиционирование', level: 'Начинающий', duration: '2-3 недели' },
        { title: 'Flexbox и Grid', description: 'Современные layout-технологии', level: 'Средний', duration: '1-2 недели' },
        { title: 'Анимации и переходы', description: 'CSS animations, transforms, transitions', level: 'Продвинутый', duration: '2-3 недели' }
      ],
      'JavaScript': [
        { title: 'Основы JS', description: 'Переменные, функции, объекты, массивы', level: 'Начинающий', duration: '3-4 недели' },
        { title: 'DOM и события', description: 'Манипуляция DOM, обработка событий', level: 'Средний', duration: '2-3 недели' },
        { title: 'ES6+ и асинхронность', description: 'Promises, async/await, модули', level: 'Продвинутый', duration: '3-4 недели' }
      ],
      'TypeScript': [
        { title: 'Основы TypeScript', description: 'Типы, интерфейсы, классы', level: 'Средний', duration: '2-3 недели' },
        { title: 'Продвинутые типы', description: 'Generics, utility types, conditional types', level: 'Продвинутый', duration: '2-3 недели' },
        { title: 'Интеграция с проектами', description: 'Конфигурация, миграция, best practices', level: 'Продвинутый', duration: '1-2 недели' }
      ],
      'React': [
        { title: 'Основы React', description: 'Компоненты, props, state, lifecycle', level: 'Средний', duration: '3-4 недели' },
        { title: 'Hooks и Context', description: 'useState, useEffect, useContext, custom hooks', level: 'Средний', duration: '2-3 недели' },
        { title: 'Продвинутые паттерны', description: 'HOC, render props, compound components', level: 'Продвинутый', duration: '3-4 недели' }
      ],
      'Next.js': [
        { title: 'Основы Next.js', description: 'App Router, pages, routing', level: 'Средний', duration: '2-3 недели' },
        { title: 'SSR и SSG', description: 'Server components, data fetching', level: 'Продвинутый', duration: '2-3 недели' },
        { title: 'Оптимизация', description: 'Performance, SEO, deployment', level: 'Продвинутый', duration: '2-3 недели' }
      ]
    };

    return roadmaps[techName] || [];
  };

  const roadmapSteps = getRoadmapData(tech);

  if (roadmapSteps.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        Дорожная карта для {tech} пока не готова
      </div>
    );
  }

  // Если выбрана карточка, показываем детальную информацию
  if (selectedCard) {
    const cardData = roadmapSteps.find(step => step.title === selectedCard);
    if (!cardData) return null;

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 shadow-lg border border-gray-200 dark:border-gray-600">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {cardData.title}
          </h3>

          <div className="mb-6">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded text-sm font-medium">
              {cardData.level}
            </span>
            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded text-sm font-medium ml-2">
              {cardData.duration}
            </span>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
              {cardData.description}
            </p>

            {/* Детальный контент для каждой карточки */}
            {getDetailedContent(cardData.title)}
          </div>
        </div>
      </div>
    );
  }

  // Группируем блоки по 3 в ряд
  const rows: Array<Array<{ title: string; description: string; level: string; duration: string }>> = [];
  for (let i = 0; i < roadmapSteps.length; i += 3) {
    rows.push(roadmapSteps.slice(i, i + 3));
  }

  // Функция для расчета позиции блока в сетке
  const getBlockPosition = (rowIndex: number, colIndex: number, totalCols: number) => {
    const blockWidth = 280; // ширина блока
    const blockHeight = 140; // высота блока
    const marginX = 30; // горизонтальный отступ между блоками
    const marginY = 150; // вертикальный отступ между рядами

    // Центрируем блоки в ряду
    const totalRowWidth = totalCols * blockWidth + (totalCols - 1) * marginX;
    const startX = (800 - totalRowWidth) / 2; // центрируем по ширине контейнера

    const x = startX + colIndex * (blockWidth + marginX);
    const y = rowIndex * (blockHeight + marginY);

    return { x, y, width: blockWidth, height: blockHeight };
  };

  // Разные AOS анимации для блоков
  const aosAnimations = [
    'fade-up',
    'fade-down',
    'fade-left',
    'fade-right',
    'zoom-in',
    'zoom-in-up',
    'zoom-in-down',
    'flip-left',
    'flip-right',
    'slide-up',
    'slide-down',
    'slide-left',
    'slide-right'
  ];


  return (
    <div className="relative" style={{ minHeight: '500px' }}>
      {/* SVG линии соединения */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <defs>
          <style>
            {`
              @keyframes drawRoadmapLine {
                from {
                  stroke-dashoffset: 100;
                }
                to {
                  stroke-dashoffset: 0;
                }
              }
            `}
          </style>
        </defs>

        {/* Линии между блоками в зигзагообразном порядке */}
        {rows.map((row, rowIndex) => {
          return row.map((_, colIndex) => {
            const currentIndex = rowIndex * 3 + colIndex;
            const nextIndex = currentIndex + 1;

            if (nextIndex >= roadmapSteps.length) return null;

            const currentPos = getBlockPosition(rowIndex, colIndex, row.length);
            const nextRowIndex = Math.floor(nextIndex / 3);
            const nextColIndex = nextIndex % 3;
            const nextPos = getBlockPosition(nextRowIndex, nextColIndex, rows[nextRowIndex]?.length || 3);

            // Координаты центров блоков
            const startX = currentPos.x + currentPos.width / 2;
            const startY = currentPos.y + currentPos.height / 2;
            const endX = nextPos.x + nextPos.width / 2;
            const endY = nextPos.y + nextPos.height / 2;

            return (
              <line
                key={`line-${currentIndex}`}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="#3ddac1"
                strokeWidth="3"
                opacity="0.8"
                style={{
                  strokeDasharray: '100',
                  strokeDashoffset: '100',
                  animation: `drawRoadmapLine ${(currentIndex + 1) * 0.3 + 0.5}s ease-out ${(currentIndex + 1) * 0.2}s forwards`
                }}
              />
            );
          });
        })}
      </svg>

      {/* Блоки дорожной карты */}
      <div className="relative z-10">
        {rows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex justify-center mb-12">
            {row.map((step, colIndex) => {
              const blockIndex = rowIndex * 3 + colIndex;
              const position = getBlockPosition(rowIndex, colIndex, row.length);

              return (
                <div
                  key={blockIndex}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 flex flex-col cursor-pointer"
                  style={{
                    width: `${position.width}px`,
                    height: `${position.height}px`,
                    margin: '0 10px'
                  }}
                  data-aos={aosAnimations[blockIndex % aosAnimations.length]}
                  data-aos-delay={blockIndex * 100}
                  data-aos-duration="600"
                  data-aos-easing="ease-out-cubic"
                  onClick={() => onCardSelect(step.title)}
                >
                  {/* Номер блока */}
                  <div className="flex justify-between items-start p-3">
                    <div className="w-6 h-6 bg-[#3ddac1] rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {blockIndex + 1}
                    </div>
                  </div>

                  {/* Содержимое блока */}
                  <div className="flex-1 px-3 pb-3">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                      {step.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                      {step.description}
                    </p>
                    <div className="flex flex-col gap-1">
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-1.5 py-0.5 rounded text-xs text-center">
                        {step.level}
                      </span>
                      <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-1.5 py-0.5 rounded text-xs text-center">
                        {step.duration}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
