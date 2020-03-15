'use strict';

(function () {

  var textHashtag = document.querySelector('.text__hashtags');

  function onInputKeyDown(evt) {
    evt.stopPropagation();
  }

  // валидация хэштэгов
  textHashtag.addEventListener('keydown', onInputKeyDown);

  function validatorHashtag(hashtag) {
    var regesp = /^[а-яёa-z0-9]+$/i;
    if (hashtag[0] !== '#') {
      textHashtag.setCustomValidity('Хэш-тег начинается с символа #');
      return false;
    } else if (hashtag.length < 2) {
      textHashtag.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
      return false;
    } else if (!regesp.test(hashtag.substr(1))) {
      textHashtag.setCustomValidity('Хэштэг должен состоять из букв и чисел');
      return false;
    } else if (hashtag.length > 20) {
      textHashtag.setCustomValidity('Максимальная длина одного хэш-тега 20 cимволов, включая решётку');
      return false;
    } else if (hashtag.indexOf('#', 1) > 0) {
      textHashtag.setCustomValidity('Хэш-теги разделяются пробелами');
      return false;
    }
    textHashtag.setCustomValidity('');
    return true;
  }

  function hashtagArrayCreate() {
    if (textHashtag.value !== '') {
      var hashtagArray = textHashtag.value.toLowerCase().split(' ');
      for (var j = 0; j < hashtagArray.length; j++) {
        var isHashtagValid = validatorHashtag(hashtagArray[j]);
        if (!isHashtagValid) {
          break;
        }
        var positionNextHashtag = j + 1;
        if (hashtagArray.indexOf(hashtagArray[j], positionNextHashtag) > 0) {
          textHashtag.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
          break;
        }
      }
      if (hashtagArray.length > 5) {
        textHashtag.setCustomValidity('Хэштегов может быть максимум 5');
      }
    }
  }

  textHashtag.addEventListener('input', hashtagArrayCreate);

})();
