/**
 * Вашей задачей является создание веб-слайдера для отображения изображений на веб-странице.
 * Слайдер должен позволять переключаться между изображениями и отображать их в центре экрана.
 * 1. Создайте интерфейс веб-страницы, который включает в себя следующие элементы:
 *
 * a. Контейнер для отображения текущего изображения.
 * b. Кнопки "Предыдущее изображение" и "Следующее изображение" для переключения между изображениями.
 * c. Навигационные точки (индикаторы) для быстрого переключения между изображениями.
 *
 * 2. Используйте HTML для создания элементов интерфейса.
 *
 * 3. Используйте JavaScript для обработки событий:
 *
 * a. При клике на кнопку "Предыдущее изображение" должно отображаться предыдущее изображение.
 * b. При клике на кнопку "Следующее изображение" должно отображаться следующее изображение.
 * c. При клике на навигационные точки, слайдер должен переключаться к соответствующему изображению.
 *
 * 4. Слайдер должен циклически переключаться между изображениями, то есть после последнего изображения должно отображаться первое, и наоборот.
 *
 * 5. Добавьте стилизацию для слайдера и элементов интерфейса с использованием CSS для улучшения внешнего вида.
 */

var setImage = new Map([
  ['./image/BOTSimagen_NSTfield_image_socialmedia.var_1653879910.jpg', 'первое изображение'],
  ['./image/google-imagen-3-example-5.jpg', 'второе изображение'],
  ['./image/una-imagen-creada-por-la-herramienta-imagen-3-de-google.jpeg', 'третье изображение']
]);

var slides = document.querySelector('.slides');
var indicatorsContainer = document.querySelector('.indicators');
var prevButton = document.getElementById('prev');
var nextButton = document.getElementById('next');
var index = 0;

setImage.forEach((alt, src) => {
  var slide = document.createElement('div');
  slide.classList.add('slide');
  slide.appendChild(createImageElement(src, alt));
  slides.appendChild(slide);
});

var slideElements = document.querySelectorAll('.slide');

slideElements.forEach((_, i) => {
  var dot = document.createElement('div');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => moveToSlide(i));
  indicatorsContainer.appendChild(dot);
});

function updateIndicators() {
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

var interval;

function startAutoSlide() {
  interval = setInterval(() => {
    moveToSlide(index + 1);
  }, 5000);
}

function restartAutoSlide() {
  clearInterval(interval);
  startAutoSlide();
}

function moveToSlide(newIndex) {
  restartAutoSlide();
  index = (newIndex + slideElements.length) % slideElements.length;
  slides.style.transform = `translateX(-${index * 100}%)`;
  updateIndicators();
}

function createImageElement(src, alt) {
  var image = document.createElement('img');
  image.src = src;
  image.alt = alt;
  return image;
}

prevButton.addEventListener('click', () => moveToSlide(index - 1));
nextButton.addEventListener('click', () => moveToSlide(index + 1));
startAutoSlide();
