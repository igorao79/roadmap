import { ContentSection } from '../../types';

export const formsValidationContent: ContentSection[] = [
  {
    title: 'HTML формы',
    content: 'Формы являются основным способом взаимодействия пользователя с веб-приложением. Они позволяют собирать, валидировать и отправлять данные на сервер.',
    code: `<form action="/api/contact" method="POST" enctype="multipart/form-data">
  <!-- Группа полей для лучшей доступности -->
  <fieldset>
    <legend>Контактная информация</legend>

    <div>
      <label for="name">Имя:</label>
      <input type="text" id="name" name="name" required>
    </div>

    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
    </div>
  </fieldset>

  <button type="submit">Отправить</button>
  <button type="reset">Очистить</button>
</form>`
  },
  {
    title: 'Типы полей ввода',
    items: [
      'text - однострочное текстовое поле',
      'email - поле для email с автоматической валидацией',
      'password - поле для пароля (символы скрыты)',
      'number - числовое поле с кнопками +/-',
      'tel - поле для телефонного номера',
      'url - поле для веб-адресов',
      'date/datetime-local - поля для даты и времени',
      'file - поле для загрузки файлов',
      'checkbox - флажок (множественный выбор)',
      'radio - радиокнопка (одиночный выбор)',
      'range - ползунок для выбора значения',
      'color - палитра цветов',
      'search - поле поиска'
    ]
  },
  {
    title: 'HTML5 валидация',
    content: 'Современные браузеры поддерживают встроенную валидацию форм без JavaScript. Атрибуты валидации автоматически проверяют вводимые данные.',
    code: `<!-- Обязательные поля -->
<input type="text" required>

<!-- Ограничения длины -->
<input type="password" minlength="8" maxlength="128">

<!-- Числовые ограничения -->
<input type="number" min="18" max="120" step="1">

<!-- Шаблоны валидации -->
<input type="text" pattern="[A-Za-z]{3,}" title="Только буквы, минимум 3">

<!-- Email валидация -->
<input type="email" multiple placeholder="email1@example.com, email2@example.com">

<!-- URL валидация -->
<input type="url" placeholder="https://example.com">`
  },
  {
    title: 'Сложные элементы форм',
    code: `<!-- Выпадающий список -->
<select name="country" required>
  <option value="">Выберите страну</option>
  <option value="ru">Россия</option>
  <option value="us">США</option>
</select>

<!-- Многострочный текст -->
<textarea name="message" rows="5" cols="30"
          placeholder="Введите ваше сообщение..."
          maxlength="500"></textarea>

<!-- Группа радиокнопок -->
<fieldset>
  <legend>Предпочитаемый способ связи:</legend>
  <label><input type="radio" name="contact" value="email"> Email</label>
  <label><input type="radio" name="contact" value="phone"> Телефон</label>
</fieldset>

<!-- Группа флажков -->
<fieldset>
  <legend>Интересующие темы:</legend>
  <label><input type="checkbox" name="topics" value="html"> HTML</label>
  <label><input type="checkbox" name="topics" value="css"> CSS</label>
  <label><input type="checkbox" name="topics" value="js"> JavaScript</label>
</fieldset>`
  },
  {
    title: 'Доступность форм',
    content: 'Правильно построенные формы доступны для всех пользователей, включая тех, кто использует скринридеры или клавиатурную навигацию.',
    code: `<!-- Правильная связь label и input -->
<label for="username">Имя пользователя:</label>
<input id="username" name="username" aria-describedby="username-help">

<!-- Подсказка для поля -->
<span id="username-help">Введите ваше имя без пробелов</span>

<!-- Группировка связанных полей -->
<fieldset>
  <legend>Адрес доставки</legend>
  <label for="street">Улица:</label>
  <input id="street" name="street">

  <label for="city">Город:</label>
  <input id="city" name="city">
</fieldset>

<!-- Пользовательские сообщения об ошибках -->
<input type="email" required aria-describedby="email-error">
<div id="email-error" role="alert" aria-live="polite">
  <!-- Сообщение об ошибке появляется здесь -->
</div>`
  }
];
