'use strict';

(function () {

  var body = document.querySelector('body');
  var uploadCancel = document.querySelector('#upload-cancel');
  var imgUploadScale = document.querySelector('.img-upload__scale');
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var imgUploadEffects = document.querySelector('.img-upload__effects');
  var effectNoneButton = document.querySelector('#effect-none');
  var effectChromeButton = document.querySelector('#effect-chrome');
  var effectSepiaButton = document.querySelector('#effect-sepia');
  var effectMarvinButton = document.querySelector('#effect-marvin');
  var effectPhobosButton = document.querySelector('#effect-phobos');
  var effectHeatButton = document.querySelector('#effect-heat');
  var uploadFileInput = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadForm = document.querySelector('.img-upload__form');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var uploadSelectImage = document.querySelector('#upload-select-image');
  var main = document.querySelector('main');
  var successBlock = document.querySelector('#success').content.querySelector('.success');
  // var successButton = main.querySelector('.success__button');

  var errorBlock = document.querySelector('#error').content.querySelector('.error');
  // var errorButton = document.querySelector('.error__button');
  // var errorInner = document.querySelector('.error__inner');
  var imagePreviewScale = 100;
  var initEffectLevel = 450;

  var effectArray = {
    NONE: 'none',
    GRYSCALE: 'grayscale',
    SEPIA: 'sepia',
    INVERT: 'invert',
    BLUR: 'blur',
    BRIGHTNESS: 'brightness'
  };

  var currentEffect = effectArray.NONE;

  // клавиши
  var ESC_KEY = 'Escape';

  function onUploadEscPress(evt) {
    if (evt.key === ESC_KEY) {
      uploadClose();
    }
  }

  function uploadOpen() {
    body.classList.add('modal-open');
    imgUploadOverlay.classList.remove('hidden');

    uploadFileInput.addEventListener('keydown', onUploadEscPress);
  }

  function uploadClose() {
    body.classList.remove('modal-open');
    imgUploadOverlay.classList.add('hidden');
    imgUploadForm.reset();
    imgUploadPreview.style.filter = 'none';
    window.slider.makeValueOfFilter(450);
    imgUploadPreview.style.transform = 'scale(1)';
    document.removeEventListener('keydown', onUploadEscPress);
    imagePreviewScale = 100;
    return imagePreviewScale;
  }

  // отrрытие/закрытие формы загрузки
  uploadFileInput.addEventListener('change', function () {
    uploadOpen();
  });

  uploadCancel.addEventListener('click', function () {
    uploadClose();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === ESC_KEY) {
      uploadClose();
    }
  });

  // масштабирование изображения
  function changeScale(evt) {
    if (evt.target === scaleControlSmaller) {
      if (imagePreviewScale >= 50) {
        imagePreviewScale -= 25;
      }
    } else if (evt.target === scaleControlBigger) {
      if (imagePreviewScale <= 75) {
        imagePreviewScale += 25;
      }
    }

    scaleControlValue.value = imagePreviewScale + '%';
    imgUploadPreview.style.transform = 'scale(' + imagePreviewScale * 0.01 + ')';
    return imagePreviewScale;
  }

  imgUploadScale.addEventListener('click', changeScale);

  // наложение эффектов
  function changeEffect(evt) {
    applyEffect(convertor(evt.target), initEffectLevel);
    window.slider.makeValueOfFilter(450);
  }

  function applyEffect(name, value) {
    value = value / 450;
    if (name === effectArray.NONE) {
      imgUploadPreview.style.filter = 'none';
      imgUploadEffectLevel.classList.add('hidden');
      effectLevelValue.value = '100';
    }
    if (name === effectArray.GRYSCALE) {
      imgUploadPreview.style.filter = 'grayscale(' + value + ')';
      imgUploadEffectLevel.classList.remove('hidden');
      effectLevelValue.value = value;
    }
    if (name === effectArray.SEPIA) {
      imgUploadPreview.style.filter = 'sepia(' + value + ')';
      imgUploadEffectLevel.classList.remove('hidden');
      effectLevelValue.value = value;
    }
    if (name === effectArray.INVERT) {
      imgUploadPreview.style.filter = 'invert(' + value * 100 + '%)';
      imgUploadEffectLevel.classList.remove('hidden');
      effectLevelValue.value = value * 100;
    }
    if (name === effectArray.BLUR) {
      imgUploadPreview.style.filter = 'blur(' + value * 3 + 'px)';
      imgUploadEffectLevel.classList.remove('hidden');
      effectLevelValue.value = value * 3;
    }
    if (name === effectArray.BRIGHTNESS) {
      imgUploadPreview.style.filter = 'brightness(' + (1 + value * 2) + ')';
      imgUploadEffectLevel.classList.remove('hidden');
      effectLevelValue.value = (1 + value * 2);
    }
  }

  function convertor(button) {
    if (button === effectNoneButton) {
      currentEffect = effectArray.NONE;
      return effectArray.NONE;
    }
    if (button === effectChromeButton) {
      currentEffect = effectArray.GRYSCALE;
      return effectArray.GRYSCALE;
    }
    if (button === effectSepiaButton) {
      currentEffect = effectArray.SEPIA;
      return effectArray.SEPIA;
    }
    if (button === effectMarvinButton) {
      currentEffect = effectArray.INVERT;
      return effectArray.INVERT;
    }
    if (button === effectPhobosButton) {
      currentEffect = effectArray.BLUR;
      return effectArray.BLUR;
    }
    if (button === effectHeatButton) {
      currentEffect = effectArray.BRIGHTNESS;
      return effectArray.BRIGHTNESS;
    }
    currentEffect = effectArray.NONE;
    return effectArray.NONE;
  }

  function applyCurrentEffect(value) {
    applyEffect(currentEffect, value);
  }

  imgUploadEffects.addEventListener('change', changeEffect);

  function onInnerClick(evt) {
    evt.stopPropagation();
  }

  function onSuccessKeydown(evt) {
    if (evt.key === ESC_KEY) {
      removeSuccessTemp();
    }
  }

  function onErrorKeydown(evt) {
    if (evt.key === ESC_KEY) {
      removeErrorTemp();
    }
  }

  // отрисовка результата отправки данных на сервер
  function renderSuccessTemp() {
    main.appendChild(successBlock);
    var successButton = main.querySelector('.success__button');
    var successInner = document.querySelector('.success__inner');
    successButton.addEventListener('click', removeSuccessTemp);
    document.addEventListener('click', removeSuccessTemp);
    document.addEventListener('keydown', onSuccessKeydown);
    successInner.addEventListener('click', onInnerClick);
  }

  function renderErrorTemp() {
    main.appendChild(errorBlock);
    var errorButton = main.querySelector('.error__button');
    var errorInner = document.querySelector('.error__inner');
    errorButton.addEventListener('click', removeErrorTemp);
    document.addEventListener('click', removeErrorTemp);
    document.addEventListener('keydown', onErrorKeydown);
    errorInner.addEventListener('click', onInnerClick);
  }

  function removeSuccessTemp() {
    var successButton = main.querySelector('.success__button');
    var successInner = document.querySelector('.success__inner');
    successBlock.remove();
    successButton.removeEventListener('click', removeSuccessTemp);
    document.removeEventListener('click', removeSuccessTemp);
    document.removeEventListener('keydown', onSuccessKeydown);
    successInner.removeEventListener('click', onInnerClick);
  }

  function removeErrorTemp() {
    var errorButton = main.querySelector('.error__button');
    var errorInner = document.querySelector('.error__inner');
    errorBlock.remove();
    errorButton.removeEventListener('click', removeErrorTemp);
    document.removeEventListener('click', removeErrorTemp);
    document.removeEventListener('keydown', onErrorKeydown);
    errorInner.removeEventListener('click', onInnerClick);
  }

  uploadSelectImage.addEventListener('submit', function (evt) {
    window.upload.upload(new FormData(uploadSelectImage), renderSuccessTemp, renderErrorTemp);
    evt.preventDefault();
    uploadClose();
  });

  window.form = {
    applyCurrentEffect: applyCurrentEffect
  };

})();
