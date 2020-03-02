'use strict';

(function () {

  var body = document.querySelector('body');
  var bigPictureImg = document.querySelector('.big-picture__img');
  var socialComents = document.querySelector('.social__comments');
  var socialFooterText = document.querySelector('social__footer-text');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var pictures = document.querySelector('.pictures');
  var pictureCard = pictures.querySelector('.picture');

  console.log(pictureCard);

  var commentsListItem = document.querySelector('#commentsListItem').content.querySelector('.social__comment');
  var fragment = document.createDocumentFragment();

  // клавиши
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  function onPreviewEscPress(evt) {
    if (evt.key === ESC_KEY) {
      previewClose();
    }
  }

  function previewOpen() {
    body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    bigPictureShow(1);

    socialFooterText.addEventListener('keydown', onPreviewEscPress);
  }

  function previewClose() {
    body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
    socialFooterText.reset();
    document.removeEventListener('keydown', onPreviewEscPress);
  }

  // отрисовка комментария
  function renderComment(comment) {
    var commentItemElement = commentsListItem.cloneNode(true);
    commentItemElement.querySelector('.social__picture').src = comment.avatar;
    commentItemElement.querySelector('.social__picture').alt = comment.name;
    commentItemElement.querySelector('.social__text').textContent = comment.message;
    return commentItemElement;
  }

  // отрисовка окна просмотра
  function bigPictureShow(cardNumber) {

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

  // открытие/закрытие окна просмотра
  pictures.addEventListener('click', function () {
    event.preventDefault();
    previewOpen();
  });

  pictures.addEventListener('keydown', function (evt) {
    event.preventDefault();
    if (evt.key === ENTER_KEY) {
      previewOpen();
    }
  });

  bigPictureCancel.addEventListener('click', function () {
    previewClose();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === ESC_KEY) {
      previewClose();
    }
  });

})();
