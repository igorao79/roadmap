import { ContentSection } from '../types';

export const cssContent: Record<string, ContentSection[]> = {
  'css-basics': [
    {
      title: 'Что такое CSS?',
      content: 'CSS (Cascading Style Sheets) - это язык описания внешнего вида документа, написанного с использованием HTML. Он позволяет задавать цвета, шрифты, размеры, позиции и другие визуальные свойства элементов.'
    },
    {
      title: 'Селекторы',
      content: 'Способы выбора элементов для применения стилей:',
      code: `.class - по классу
#id - по идентификатору
tag - по имени тега
[attr] - по атрибуту`
    },
    {
      title: 'Box Model',
      content: 'Модель, описывающая пространство, занимаемое элементом: Margin → Border → Padding → Content'
    },
    {
      title: 'Позиционирование',
      items: [
        'static: По умолчанию',
        'relative: Относительно нормального положения',
        'absolute: Относительно ближайшего позиционированного родителя',
        'fixed: Относительно viewport'
      ]
    }
  ],

  'flexbox-grid': [
    {
      title: 'Flexbox',
      content: 'Flexbox - это одномерная система layout, предназначенная для распределения пространства между элементами в контейнере.'
    },
    {
      title: 'CSS Grid',
      content: 'CSS Grid - это двумерная система layout для веб, которая позволяет создавать сложные responsive макеты.'
    },
    {
      title: 'Основные свойства Flexbox',
      items: [
        'display: flex - включает flexbox',
        'flex-direction: row/column - направление',
        'justify-content - распределение по главной оси',
        'align-items - распределение по поперечной оси',
        'flex-wrap - перенос элементов'
      ]
    }
  ],

  'animations-transitions': [
    {
      title: 'CSS Transitions',
      content: 'CSS transitions позволяют плавно изменять значения CSS свойств со временем.'
    },
    {
      title: 'CSS Animations',
      content: 'CSS animations позволяют создавать анимации с помощью keyframes и более сложной логикой.'
    },
    {
      title: 'Transform свойства',
      items: [
        'translate() - перемещение',
        'rotate() - поворот',
        'scale() - масштабирование',
        'skew() - наклон'
      ]
    }
  ]
};


