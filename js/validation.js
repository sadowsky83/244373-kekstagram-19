'use strict';

(function () {

  var textHashtag = document.querySelector('.text__hashtags');
  var uploadSubmit = document.querySelector('#upload-submit');
  var hashtags = [];

  var HestagData = {
    MAX_COUNT: 5,
    MIN_LENGTH: 2,
    MAX_LENGTH: 20,
    VALID_POSITION: 1
  };

  var CustomMessage = {
    HESHTAGS_LIST_START: 'Список хэш-тэгов не может начинаться пробелом',
    HESHTAGS_LIST_END: 'Список хэш-тэгов не может оканчиваться пробелом',
    HESHTAG_SEPARATOR: 'Хэш-теги разделяются одним пробелом',
    HESHTAG_START: 'Хэш-тег должен начинаеться с символа #',
    HESHTAG_MIN_LENGTH: 'Хеш-тег не может состоять только из одной решётки',
    HASHTAG_CONTENT: 'Хэш-тэг должен состоять из букв и чисел',
    HESHTAG_MAX_LENGTH: 'Максимальная длина одного хэш-тега ',
    HESHTAG_VALUE_INCLUSIVE: ' имволов, включая решётку',
    HESHTAG_NO_REPEAT: 'Один и тот же хэш-тег не может быть использован дважды',
    HESHTAG_MAX_NUMBER: 'Хэштегов может быть максимум '
  };

  // валидация хэштэгов
  textHashtag.addEventListener('keydown', window.utils.onElementKeyDown);

  function validatorHashtag(hashtag) {
    var regesp = /^[а-яёa-z0-9]+$/i;
    if (hashtags[0] === '') {
      textHashtag.setCustomValidity(CustomMessage.HESHTAGS_LIST_START);
      return false;
    } else if (hashtags[hashtags.length - 1] === '') {
      textHashtag.setCustomValidity(CustomMessage.HESHTAGS_LIST_END);
      return false;
    } else if (hashtag.indexOf('#', HestagData.VALID_POSITION) > 0 || hashtag.length === 0) {
      textHashtag.setCustomValidity(CustomMessage.HESHTAG_SEPARATOR);
      return false;
    } else if (hashtag[0] !== '#') {
      textHashtag.setCustomValidity(CustomMessage.HESHTAG_START);
      return false;
    } else if (hashtag.length < 2) {
      textHashtag.setCustomValidity(CustomMessage.HESHTAG_MIN_LENGTH);
      return false;
    } else if (!regesp.test(hashtag.substr(1))) {
      textHashtag.setCustomValidity(CustomMessage.HASHTAG_CONTENT);
      return false;
    } else if (hashtag.length > HestagData.MAX_LENGTH) {
      textHashtag.setCustomValidity(CustomMessage.HESHTAG_MAX_LENGTH + HestagData.MAX_LENGTH + CustomMessage.HESHTAG_VALUE_INCLUSIVE);
      return false;
    } else if (hashtags.length > HestagData.MAX_COUNT) {
      textHashtag.setCustomValidity(CustomMessage.HESHTAG_MAX_NUMBER + HestagData.MAX_COUNT);
    }
    return true;
  }

  function hashtagsArrayCreate() {
    if (textHashtag.value !== '') {
      hashtags = textHashtag.value.toLowerCase().split(' ');
      for (var i = 0; i < hashtags.length; i++) {
        var isHashtagValid = validatorHashtag(hashtags[i]);
        if (!isHashtagValid) {
          textHashtag.style.borderColor = 'red';
          break;
        }
        var positionNextHashtag = i + 1;
        if (hashtags.indexOf(hashtags[i], positionNextHashtag) > 0) {
          textHashtag.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
          break;
        }
      }
    }
  }

  function onTextHashtagInput() {
    textHashtag.setCustomValidity('');
    textHashtag.style.borderColor = 'initial';
  }

  textHashtag.addEventListener('input', onTextHashtagInput);
  uploadSubmit.addEventListener('click', hashtagsArrayCreate);

})();
