'use strict';

(function () {

  var body = document.querySelector('body');
  var bigPictureImg = document.querySelector('.big-picture__img');
  var socialComents = document.querySelector('.social__comments');
  var socialFooterText = document.querySelector('.social__footer-text');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  var commentsListItem = document.querySelector('#commentsListItem').content.querySelector('.social__comment');
  var fragment = document.createDocumentFragment();

  // клавиши
  var ESC_KEY = 'Escape';

  function previewOpen() {
    body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
  }

  function previewClose() {
    body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
    socialFooterText.value = '';
  }

  function onInputKeyDown(evt) {
    evt.stopPropagation();
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
  function bigPictureShow(cardData) {

    bigPictureImg.querySelector('img').src = cardData.url;
    document.querySelector('.likes-count').textContent = cardData.likes;
    document.querySelector('.comments-count').textContent = cardData.comments.length;

    // добавление списка комментариев
    for (var y = 0; y < cardData.comments.length; y++) {
      fragment.appendChild(renderComment(cardData.comments[y]));
      socialComents.appendChild(fragment);
    }
    document.querySelector('.social__caption').textContent = cardData.description;
  }

  bigPictureCancel.addEventListener('click', function () {
    previewClose();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === ESC_KEY) {
      previewClose();
    }
  });

  socialFooterText.addEventListener('keydown', onInputKeyDown);

  window.preview = {
    bigPictureShow: bigPictureShow,
    previewOpen: previewOpen
  };

})();
