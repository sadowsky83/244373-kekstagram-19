'use strict';

(function () {

  var imgFilters = document.querySelector('.img-filters');
  var imgFiltersForm = document.querySelector('.img-filters__form');
  var filterDefault = document.querySelector('#filter-default');
  var filterRandom = document.querySelector('#filter-random');
  var filterDiscussed = document.querySelector('#filter-discussed');
  var pictures = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var numberOfRandomCards = 10;
  var serverData = [];
  var serverDataForSort = [];

  // отрисовка галлереи карточек с сервера
  function renderCards(data) {
    imgFilters.classList.remove('img-filters--inactive');
    for (var i = 0; i < data.length; i++) {
      serverData.push(data[i]);
      serverDataForSort.push(data[i]);
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
    return [serverData, serverDataForSort];
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

  // наложение-снятие эффекта активации на кнопках
  imgFiltersForm.addEventListener('click', function (evt) {
    for (var i = 0; i < imgFiltersForm.children.length; i++) {
      imgFiltersForm.children[i].classList.remove('img-filters__button--active');
    }
    evt.target.classList.add('img-filters__button--active');
  });

  // удаление элеменотов из DOM-а по классу
  function removeElementsByClass(className) {
    var elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  }

  function renderFiltredCards(filtredArray, num) {
    for (var i = 0; i < num; i++) {
      var card = window.picture.renderCard(filtredArray[i]);
      (function (dataNumber) {
        card.addEventListener('click', function () {
          window.preview.bigPictureShow(filtredArray[dataNumber]);
          window.preview.previewOpen();
        });
      })(i);
      fragment.appendChild(card);
      pictures.appendChild(fragment);
    }
  }

  // отрисовка дефолтного массива карточек
  function renderDefaultCards() {
    removeElementsByClass('picture');
    renderFiltredCards(serverData, serverData.length);
  }

  // отрисовка случайных неповторяющихся карточек в заданном количестве
  function renderRandomCards() {
    removeElementsByClass('picture');
    serverDataForSort.sort(function () {
      return 0.5 - Math.random();
    });
    renderFiltredCards(serverDataForSort, numberOfRandomCards);
  }

  // отрисовка карточек с наибольшим количеством комментариев по убыванию
  function renderDiscussedCards() {
    removeElementsByClass('picture');
    serverDataForSort.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    renderFiltredCards(serverDataForSort, serverDataForSort.length);
  }

  filterDefault.addEventListener('click', renderDefaultCards);
  filterRandom.addEventListener('click', renderRandomCards);
  filterDiscussed.addEventListener('click', renderDiscussedCards);

  window.gallery = {
    renderCards: renderCards,
    renderError: renderError
  };

})();


