'use strict';

(function () {

  var cardsArray = [];

  // выбор случайного числа в диапазоне
  function getRandomInRange(min, max) {
    var randomNumber = min + Math.random() * (max - min);
    return Math.round(randomNumber);
  }

  // создание массива карточек
  function cardArrayGeneration(quantity) {
    for (var i = 1; i <= quantity; i++) {
      var imgObj = {
        url: 'photos/' + i + '.jpg',
        description: 'Описание фотографии',
        likes: getRandomInRange(15, 200),
        comments: window.data.commentArrayGeneration(getRandomInRange(1, 10))
      };
      cardsArray.push(imgObj);
    }
    return cardsArray;
  }

  cardArrayGeneration(25);

  window.gallery = {
    cardsArray: cardsArray
  };

})();
