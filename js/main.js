'use strict';

function getRandomInRange(min, max) {
  var randomNumber = min + Math.random() * (max - min);
  return Math.round(randomNumber);
}

function getRandomElement(arrName) {
  return arrName[(Math.floor(arrName.length * (Math.random())))];
}

function commentGeneration(messages) {
  var x = getRandomElement(messages);
  var y = getRandomElement(messages);
  if (x === y) {
    return x;
  }
  return x + ' ' + y;
}

var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var names = ['Валентин', 'Джек Шепард', 'Азура', 'Кабан', 'nagibator777', 'X0P0B0D', 'sveta98', 'KotVKedax', 'Ромашка'];

function cardArrayGeneration(quantity) {
  var cardArray = [];
  for (var i = 0; i < quantity; i++) {
    var imgObj = {
      url: 'photos/' + i + '.jpg',
      description: 'Описание фотографии',
      likes: getRandomInRange(15, 200),
      comments: {
        avatar: 'img/avatar-' + getRandomInRange(1, 6) + '.svg',
        message: commentGeneration(messages),
        name: getRandomElement(names)
      }
    };
    cardArray.push(imgObj);
  }
  return cardArray;
}

cardArrayGeneration(25);

console.log(cardArrayGeneration(25));

