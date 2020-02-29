'use strict';

(function () {

  var picture = document.querySelector('#picture').content.querySelector('.picture');

  // создание карточки
  function renderCard(card) {
    var cardElement = picture.cloneNode(true);
    cardElement.querySelector('.picture__img').src = card.url;
    cardElement.querySelector('.picture__comments').textContent = card.comments.length;
    cardElement.querySelector('.picture__likes').textContent = card.likes;
    return cardElement;
  }

  window.picture = {
    renderCard: renderCard
  };

})();
