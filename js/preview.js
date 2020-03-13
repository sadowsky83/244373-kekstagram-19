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
  var commentsNumber = 5;
  var commentsCounter = 5;
  var commentsCount = 0;

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
    window.utils.removeElementsByClass('social__comment');
    socialCommentsLoader.removeEventListener('click', renderMoreComments);
    commentsNumber = 5;
    commentsCount = 0;
    console.log('>нажат previewClose');
    console.log('commentsNumber =' + commentsNumber);
    console.log('commentsCount =' + commentsCount);
    console.log('commentsCounter =' + commentsCounter);
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
    window.utils.removeElementsByClass('social__comment');
    renderComments(cardData);
    socialCommentsLoader.addEventListener('click', function () {
      renderMoreComments(cardData);
    });
    document.querySelector('.social__caption').textContent = cardData.description;
  }

  // добавить комментарии
  function renderComments(cardData) {
    window.utils.removeElementsByClass('social__comment');
    if (commentsNumber >= cardData.comments.length) {
      commentsCount = cardData.comments.length;
    } else {
      commentsCount = commentsNumber;
    }
    for (var y = 0; y < commentsCount; y++) {
      fragment.appendChild(renderComment(cardData.comments[y]));
      socialComents.appendChild(fragment);
    }
    renderedCommentsCount.textContent = commentsCount;
  }

  // добавить больше комментариев
  function renderMoreComments(cardData) {
    window.utils.removeElementsByClass('social__comment');
    commentsNumber = commentsNumber + commentsCounter;
    renderComments(cardData);
    console.log('>нажат renderMoreComments');
    console.log('commentsNumber =' + commentsNumber);
    console.log('commentsCount =' + commentsCount);
    console.log('commentsCounter =' + commentsCounter);
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
