'use strict';

(function () {

  // отрисовка галлереи карточек с сервера
  function onSuccess(data) {
    var pictures = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(window.picture.renderCard(data[i]));
      pictures.appendChild(fragment);
    }

  }

  // вывод сообщения об ошибке
  function onError(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: orange;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.backend.load(onSuccess, onError);
})();
