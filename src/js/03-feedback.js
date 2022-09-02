// HTML містить розмітку форми.Напиши скрипт, який буде зберігати значення
// полів у локальне сховище, коли користувач щось друкує.

// <form class="feedback-form" autocomplete="off">
//   <label>
//     Email
//     <input type="email" name="email" autofocus />
//   </label>
//   <label>
//     Message
//     <textarea name="message" rows="8"></textarea>
//   </label>
//   <button type="submit">Submit</button>
// </form>

// Виконуй це завдання у файлах 03-feedback.html і 03-feedback.js. Розбий
// його на декілька підзавдань:

// Відстежуй на формі подію input, і щоразу записуй у локальне сховище
// об'єкт з полями email і message, у яких зберігай поточні значення полів
// форми.Нехай ключем для сховища буде рядок "feedback-form-state".
// Під час завантаження сторінки перевіряй стан сховища, і якщо там є
// збережені дані, заповнюй ними поля форми.В іншому випадку поля повинні
// бути порожніми.
// Під час сабміту форми очищуй сховище і поля форми, а також виводь у
// консоль об'єкт з полями email, message та їхніми поточними значеннями.
// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд.
//  Для цього додай до проекту і використовуй бібліотеку lodash.throttle.

import throttle from 'lodash.throttle';
// Витягуємо refs.form та refs.textarea
const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');
// console.log(refs.form);
// console.log(refs.textarea);
const STORAGE_KEY = 'feedback-form-state';
const formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
// На form вішаємо слухача та метод, отримуэмо те що знаходиться в input і записуємо в localStorage
// отримуємо дані з textarea при вводі та заберігаємо їх в localStorage
form.addEventListener('input', throttle(onTextareaInput, 500));
function onTextareaInput(event) {
  const { name, value } = event.target;
  formData[name] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
// На textarea вішаємо слухача та метод щоб данні зберігались при перезагрузці очищуємо форму
// очищуємо localStorage і виводимо інформацію в обєт
form.addEventListener('submit', onFormSubmit);
function onFormSubmit(event) {
  event.preventDefault();
  event.target.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
}
// Отримуємо значення з localStorage, якщо щось було там, обновлюємо DOM
function savedInputMessage() {
  const { email, message } = form.elements;
  email.value = formData.email || '';
  message.value = formData.message || '';
}
savedInputMessage();
