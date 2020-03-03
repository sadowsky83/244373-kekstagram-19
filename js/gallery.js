'use strict';

(function () {

  // отрисовка галлереи карточек с сервера
  function renderCards(data) {
    var pictures = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      var card = window.picture.renderCard(data[i]);
      (function (dataNumber) {
        card.addEventListener('click', function () {
          window.preview.bigPictureShow(data[dataNumber]);
          window.preview.previewOpen();
        });
      })(i);
      fragment.appendChild(card);
      pictures.appendChild(fragment);
    }
  }

  // вывод сообщения об ошибке
  function renderError(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: orange;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.gallery = {
    renderCards: renderCards,
    renderError: renderError
  };

})();


