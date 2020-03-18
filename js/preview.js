'use strict';

(function () {

  var body = document.querySelector('body');
  var bigPictureImg = document.querySelector('.big-picture__img');
  var socialComents = document.querySelector('.social__comments');
  var socialFooterText = document.querySelector('.social__footer-text');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var commentsListItem = document.querySelector('#commentsListItem').content.querySelector('.social__comment');
  var socialCommentsLoader = document.querySelector('.social__comments-loader');
  var renderedCommentsCount = document.querySelector('.rendered-comments-count');
  var fragment = document.createDocumentFragment();

  var COMMENTS_COUNTER = 5; // шаг увеличения количества комментариев
  var COMMENTS_DEFAULT_NUMBER = 5; // количество показываемых по умолчанию комментариев

  // клавиши
  var ESC_KEY = 'Escape';

  var commentsNumber = COMMENTS_DEFAULT_NUMBER;
  var commentsCount = 0;
  var cardData = {};

  // открытие окна просмотра
  function previewOpen() {
    body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
  }

  // закрытие окна просмотра
  function previewClose() {
    body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
    socialFooterText.value = '';
    window.utils.removeElementsByClass('social__comment');
    socialCommentsLoader.removeEventListener('click', renderMoreComments);
    commentsNumber = COMMENTS_DEFAULT_NUMBER;
    commentsCount = 0;
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
  function bigPictureShow(data) {
    cardData = data;

    bigPictureImg.querySelector('img').src = cardData.url;
    document.querySelector('.likes-count').textContent = cardData.likes;
    document.querySelector('.comments-count').textContent = cardData.comments.length;

    // добавление списка комментариев
    window.utils.removeElementsByClass('social__comment');
    renderComments();
    socialCommentsLoader.addEventListener('click', renderMoreComments);
    socialCommentsLoader.classList.remove('hidden');
    document.querySelector('.social__caption').textContent = cardData.description;
  }

  // добавить комментарии
  function renderComments() {
    window.utils.removeElementsByClass('social__comment');
    if (commentsNumber >= cardData.comments.length) {
      commentsCount = cardData.comments.length;
      socialCommentsLoader.classList.add('hidden');
    } else {
      commentsCount = commentsNumber;
    }
    for (var i = 0; i < commentsCount; i++) {
      fragment.appendChild(renderComment(cardData.comments[i]));
      socialComents.appendChild(fragment);
    }
    renderedCommentsCount.textContent = commentsCount;
  }

  // добавить больше комментариев
  function renderMoreComments() {
    window.utils.removeElementsByClass('social__comment');
    commentsNumber = commentsNumber + COMMENTS_COUNTER;
    renderComments();
  }

  bigPictureCancel.addEventListener('click', function () {
    previewClose();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === ESC_KEY) {
      previewClose();
    }
  });

  socialFooterText.addEventListener('keydown', window.utils.onElementKeyDown);

  window.preview = {
    bigPictureShow: bigPictureShow,
    previewOpen: previewOpen
  };

})();
