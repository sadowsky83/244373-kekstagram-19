'use strict';

(function () {

  // тексты комментариев
  var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  // имена пользователей
  var names = ['Валентин', 'Джек Шепард', 'Азура', 'Кабан', 'nagibator777', 'X0P0B0D', 'sveta98', 'KotVKedax', 'Ромашка'];


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

  window.data = {
    commentArrayGeneration: commentArrayGeneration
  };

})();
