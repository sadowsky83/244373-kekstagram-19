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

  function renderCardsGallery(filtredArray, num) {
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

  // отрисовка галлереи карточек с сервера
  function renderCards(data) {
    imgFilters.classList.remove('img-filters--inactive');
    for (var i = 0; i < data.length; i++) {
      serverData.push(data[i]);
      serverDataForSort.push(data[i]);
    }
    renderCardsGallery(data, data.length);
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

  // наложение-снятие эффекта активации на кнопках фильтрации
  imgFiltersForm.addEventListener('click', function (evt) {
    for (var i = 0; i < imgFiltersForm.children.length; i++) {
      imgFiltersForm.children[i].classList.remove('img-filters__button--active');
    }
    if (evt.target !== imgFiltersForm) {
      evt.target.classList.add('img-filters__button--active');
    }
  });

  // отрисовка дефолтного массива карточек
  function renderDefaultCards() {
    window.utils.removeElementsByClass('picture');
    renderCardsGallery(serverData, serverData.length);
  }

  // отрисовка случайных неповторяющихся карточек в заданном количестве
  function renderRandomCards() {
    window.utils.removeElementsByClass('picture');
    serverDataForSort.sort(function () {
      return 0.5 - Math.random();
    });
    renderCardsGallery(serverDataForSort, numberOfRandomCards);
  }

  // отрисовка карточек с наибольшим количеством комментариев по убыванию
  function renderDiscussedCards() {
    window.utils.removeElementsByClass('picture');
    serverDataForSort.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    renderCardsGallery(serverDataForSort, serverDataForSort.length);
  }

  filterDefault.addEventListener('click', window.utils.debounce(renderDefaultCards));
  filterRandom.addEventListener('click', window.utils.debounce(renderRandomCards));
  filterDiscussed.addEventListener('click', window.utils.debounce(renderDiscussedCards));

  window.gallery = {
    renderCards: renderCards,
    renderError: renderError
  };

})();
