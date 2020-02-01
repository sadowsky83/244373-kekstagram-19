'use strict';

// тексты комментариев
var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

// имена пользователей
var names = ['Валентин', 'Джек Шепард', 'Азура', 'Кабан', 'nagibator777', 'X0P0B0D', 'sveta98', 'KotVKedax', 'Ромашка'];

// переменные элементов карточки
var cardsArray = [];
var picture = document.querySelector('#picture').content.querySelector('.picture');
var pictures = document.querySelector('.pictures');

// выбор случайного числа в диапазоне
function getRandomInRange(min, max) {
  var randomNumber = min + Math.random() * (max - min);
  return Math.round(randomNumber);
}

// выбор случайного элемента массива
function getRandomElement(arrName) {
  return arrName[(Math.floor(arrName.length * (Math.random())))];
}

// создание массива комментариев
function commentArrayGeneration(quantity) {
  var commentsArray = [];
  for (var i = 1; i <= quantity; i++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomInRange(1, 6) + '.svg',
      message: getRandomElement(messages),
      name: getRandomElement(names)
    };
    commentsArray.push(comment);
  }
  return commentsArray;
}

// создание массива карточек
function cardArrayGeneration(quantity) {
  for (var i = 1; i <= quantity; i++) {
    var imgObj = {
      url: 'photos/' + i + '.jpg',
      description: 'Описание фотографии',
      likes: getRandomInRange(15, 200),
      comments: commentArrayGeneration(getRandomInRange(1, 10))
    };
    cardsArray.push(imgObj);
  }
  return cardsArray;
}

cardArrayGeneration(25);

// отрисовка карточки
function renderCard(card) {
  var cardElement = picture.cloneNode(true);
  cardElement.querySelector('.picture__img').src = card.url;
  cardElement.querySelector('.picture__comments').textContent = card.comments.length;
  cardElement.querySelector('.picture__likes').textContent = card.likes;
  return cardElement;
}

// создание фрагмента
var fragment = document.createDocumentFragment();

for (var i = 0; i < cardsArray.length; i++) {
  fragment.appendChild(renderCard(cardsArray[i]));
  pictures.appendChild(fragment);
}

function bigPictureShow(cardNumber) {
  var bigPictureImg = document.querySelector('.big-picture__img');
  var socialComents = document.querySelector('.social__comments');

  // показываем блок big-picture
  document.querySelector('.big-picture').classList.remove('hidden');
  bigPictureImg.querySelector('img').src = cardsArray[cardNumber].url;
  document.querySelector('.likes-count').textContent = cardsArray[cardNumber].likes;
  document.querySelector('.comments-count').textContent = cardsArray[cardNumber].comments.length;

  // добавление списка комментариев
  for (var y = 0; y < cardsArray[cardNumber].comments.length; y++) {
    var socialComment = '<li class="social__comment"><img class="social__picture" src="' + cardsArray[cardNumber].comments[y].avatar + '" alt="' + cardsArray[cardNumber].comments[y].name + '" width="35" height="35"><p class="social__text">' + cardsArray[cardNumber].comments[y].message + '</p></li>';
    socialComents.innetHTML = socialComment;
  }

  document.querySelector('.social__caption').textContent = cardsArray[cardNumber].description;
  document.querySelector('.social__comment-count', '.comments-loader').classList.add('hidden');
}

bigPictureShow(0);

document.querySelector('body').classList.add('modal-open');

