import { ContentSection } from '../../types';

export const webComponentsContent: ContentSection[] = [
  {
    title: 'Что такое Web Components?',
    content: 'Web Components - это набор стандартов W3C, позволяющий создавать переиспользуемые компоненты с инкапсулированными стилями и поведением. Компоненты работают во всех современных браузерах.'
  },
  {
    title: 'Custom Elements API',
    content: 'Custom Elements позволяют создавать свои собственные HTML элементы с кастомным поведением. Компоненты наследуются от HTMLElement.',
    code: `class TooltipButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Создаем разметку
    this.shadowRoot.innerHTML = \`
      <style>
        button { background: #3ddac1; border: none; padding: 10px; }
        .tooltip { display: none; position: absolute; background: black; color: white; }
        button:hover + .tooltip { display: block; }
      </style>
      <button><slot>Кнопка</slot></button>
      <div class="tooltip"><slot name="tooltip">Подсказка</slot></div>
    \`;
  }
}

// Регистрация компонента
customElements.define('tooltip-button', TooltipButton);

// Использование
<tooltip-button>
  Сохранить
  <span slot="tooltip">Сохранить изменения</span>
</tooltip-button>`
  },
  {
    title: 'Shadow DOM',
    content: 'Shadow DOM обеспечивает инкапсуляцию - стили и разметка компонента изолированы от основного документа. Существует открытый и закрытый режимы.',
    code: `class ShadowComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = \`
      <style>
        .wrapper { border: 2px solid #3ddac1; padding: 10px; }
        h3 { margin: 0; color: #1a73e8; }
        p { color: #666; }
      </style>
      <div class="wrapper">
        <h3><slot name="title">Заголовок</slot></h3>
        <p><slot name="content">Содержимое компонента</slot></p>
      </div>
    \`;
  }
}

customElements.define('shadow-component', ShadowComponent);

// Внешние стили не повлияют на Shadow DOM
<style>
  h3 { color: red !important; } /* Не сработает */
</style>

<shadow-component>
  <span slot="title">Мой компонент</span>
  <span slot="content">Это содержимое Shadow DOM</span>
</shadow-component>`
  },
  {
    title: 'HTML Templates',
    content: 'Элемент <template> позволяет определять фрагменты HTML, которые не отображаются на странице до тех пор, пока не будут клонированы с помощью JavaScript.',
    code: `<!-- Шаблон компонента -->
<template id="card-template">
  <style>
    .card { border: 1px solid #ddd; border-radius: 8px; padding: 16px; }
    .card-title { font-weight: bold; margin-bottom: 8px; }
    .card-content { color: #666; }
  </style>
  <div class="card">
    <div class="card-title"><slot name="title">Заголовок</slot></div>
    <div class="card-content"><slot name="content">Содержимое</slot></div>
  </div>
</template>

<script>
class CardComponent extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById('card-template');
    const templateContent = template.content;

    // Клонируем содержимое шаблона
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(templateContent.cloneNode(true));
  }
}

customElements.define('card-component', CardComponent);
</script>

<!-- Использование -->
<card-component>
  <span slot="title">Карточка товара</span>
  <span slot="content">Описание товара со скидкой</span>
</card-component>`
  },
  {
    title: 'Slots API',
    content: 'Slots позволяют вставлять контент в определенные места компонента. Именованные слоты дают точный контроль над размещением контента.',
    code: `class ArticleCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = \`
      <style>
        .card { border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; }
        .header { background: #3ddac1; color: white; padding: 16px; }
        .content { padding: 16px; }
        .footer { background: #f5f5f5; padding: 12px 16px; border-top: 1px solid #e0e0e0; }
      </style>
      <div class="card">
        <div class="header">
          <slot name="header">Заголовок статьи</slot>
        </div>
        <div class="content">
          <slot name="content">Содержимое статьи</slot>
        </div>
        <div class="footer">
          <slot name="footer">Автор и дата</slot>
        </div>
      </div>
    \`;
  }
}

customElements.define('article-card', ArticleCard);

// Использование с разными слотами
<article-card>
  <h2 slot="header">Web Components в 2024</h2>
  <p slot="content">Современные подходы к разработке компонентов...</p>
  <div slot="footer">
    <span>Автор: Иван Петров</span> |
    <time>15 декабря 2024</time>
  </div>
</article-card>`
  },
  {
    title: 'Жизненный цикл компонентов',
    content: 'Custom Elements имеют методы жизненного цикла, которые вызываются в определенные моменты существования компонента.',
    code: `class LifecycleComponent extends HTMLElement {
  static get observedAttributes() {
    return ['data-value', 'disabled'];
  }

  constructor() {
    super();
    console.log('constructor: компонент создан');
  }

  connectedCallback() {
    console.log('connectedCallback: компонент добавлен в DOM');
    this.render();
  }

  disconnectedCallback() {
    console.log('disconnectedCallback: компонент удален из DOM');
    // Очистка ресурсов, удаление слушателей событий
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(\`attributeChangedCallback: \${name} изменился с \${oldValue} на \${newValue}\`);
    this.render();
  }

  render() {
    this.innerHTML = \`<p>Значение: \${this.getAttribute('data-value') || 'не задано'}</p>\`;
  }
}

customElements.define('lifecycle-component', LifecycleComponent);

// Изменение атрибутов вызывает перерендеринг
const component = document.querySelector('lifecycle-component');
component.setAttribute('data-value', 'Новое значение');`
  }
];
