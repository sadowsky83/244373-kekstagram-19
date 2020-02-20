'use strict';

(function () {

  var commentsListItem = document.querySelector('#commentsListItem').content.querySelector('.social__comment');
  var pictures = document.querySelector('.pictures');

  // отрисовка комментария
  function renderComment(comment) {
    var commentItemElement = commentsListItem.cloneNode(true);
    commentItemElement.querySelector('.social__picture').src = comment.avatar;
    commentItemElement.querySelector('.social__picture').alt = comment.name;
    commentItemElement.querySelector('.social__text').textContent = comment.message;
    return commentItemElement;
  }

  function bigPictureShow(cardNumber) {
    var bigPictureImg = document.querySelector('.big-picture__img');
    var socialComents = document.querySelector('.social__comments');

    // показываем блок big-picture
    // document.querySelector('.big-picture').classList.remove('hidden');
    bigPictureImg.querySelector('img').src = window.gallery.cardsArray[cardNumber].url;
    document.querySelector('.likes-count').textContent = window.gallery.cardsArray[cardNumber].likes;
    document.querySelector('.comments-count').textContent = window.gallery.cardsArray[cardNumber].comments.length;

    // добавление списка комментариев
    for (var y = 0; y < window.gallery.cardsArray[cardNumber].comments.length; y++) {
      fragment.appendChild(renderComment(window.gallery.cardsArray[cardNumber].comments[y]));
      socialComents.appendChild(fragment);
    }
    document.querySelector('.social__caption').textContent = window.gallery.cardsArray[cardNumber].description;
  }


  // создание фрагмента
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < window.gallery.cardsArray.length; i++) {
    fragment.appendChild(window.picture.renderCard(window.gallery.cardsArray[i]));
    pictures.appendChild(fragment);
  }


  // скрытие блоков .social__comment-count и .comments-loader
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');

  bigPictureShow(0);

})();
