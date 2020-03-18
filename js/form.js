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
  var errorBlock = document.querySelector('#error').content.querySelector('.error');
  var textHashtag = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');

  var IMAGE_DEFAULT_SCALE = 100; // масштаб изображения по умолчанию
  var IMAGE_SCALE_MAX = 100; // максимальный масштаб изображения
  var IMAGE_SCALE_MIN = 25; // минимальный масштаб изображения
  var IMAGE_SCALE_STEP = 25; // шаг увеличения/уменьшения масштаба
  var EFFECT_DEFAULT_VALUE = 100; // глубина эффекта п умолчанию

  var Effects = {
    NONE: 'none',
    GRYSCALE: 'grayscale',
    SEPIA: 'sepia',
    INVERT: 'invert',
    BLUR: 'blur',
    BRIGHTNESS: 'brightness'
  };

  var currentEffect = Effects.NONE;
  var imagePreviewScale = IMAGE_DEFAULT_SCALE;

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
    scaleControlValue.value = imagePreviewScale + '%';
    imgUploadPreview.style.transform = 'scale(' + imagePreviewScale * 0.01 + ')';
    textHashtag.style.borderColor = 'initial';
    uploadFileInput.addEventListener('keydown', onUploadEscPress);
  }

  function uploadClose() {
    body.classList.remove('modal-open');
    imgUploadOverlay.classList.add('hidden');
    imgUploadForm.reset();
    imgUploadPreview.style.filter = 'none';
    window.slider.makeValueOfFilter(window.slider.maxValue);
    imgUploadPreview.style.transform = 'scale(1)';
    document.removeEventListener('keydown', onUploadEscPress);
    imagePreviewScale = IMAGE_DEFAULT_SCALE;
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
      if (imagePreviewScale >= (IMAGE_SCALE_MIN + IMAGE_SCALE_STEP)) {
        imagePreviewScale -= IMAGE_SCALE_STEP;
      }
    } else if (evt.target === scaleControlBigger) {
      if (imagePreviewScale <= (IMAGE_SCALE_MAX - IMAGE_SCALE_STEP)) {
        imagePreviewScale += IMAGE_SCALE_STEP;
      }
    }

    scaleControlValue.value = imagePreviewScale + '%';
    imgUploadPreview.style.transform = 'scale(' + imagePreviewScale * 0.01 + ')';
    return imagePreviewScale;
  }

  imgUploadScale.addEventListener('click', changeScale);

  // наложение эффектов
  function changeEffect(evt) {
    applyEffect(convertor(evt.target), window.slider.maxValue);
    window.slider.makeValueOfFilter(window.slider.maxValue);
  }

  function applyEffect(name, value) {
    var valueForEffect = value / window.slider.maxValue;
    var valueForInput = (value / window.slider.maxValue * 100).toFixed(0);
    if (name === Effects.NONE) {
      imgUploadPreview.style.filter = 'none';
      imgUploadEffectLevel.classList.add('hidden');
      effectLevelValue.value = EFFECT_DEFAULT_VALUE;
    }
    if (name === Effects.GRYSCALE) {
      imgUploadPreview.style.filter = 'grayscale(' + valueForEffect + ')';
      imgUploadEffectLevel.classList.remove('hidden');
      effectLevelValue.value = valueForInput;
    }
    if (name === Effects.SEPIA) {
      imgUploadPreview.style.filter = 'sepia(' + valueForEffect + ')';
      imgUploadEffectLevel.classList.remove('hidden');
      effectLevelValue.value = valueForInput;
    }
    if (name === Effects.INVERT) {
      imgUploadPreview.style.filter = 'invert(' + valueForEffect * 100 + '%)';
      imgUploadEffectLevel.classList.remove('hidden');
      effectLevelValue.value = valueForInput;
    }
    if (name === Effects.BLUR) {
      imgUploadPreview.style.filter = 'blur(' + valueForEffect * 3 + 'px)';
      imgUploadEffectLevel.classList.remove('hidden');
      effectLevelValue.value = valueForInput;
    }
    if (name === Effects.BRIGHTNESS) {
      imgUploadPreview.style.filter = 'brightness(' + (1 + valueForEffect * 2) + ')';
      imgUploadEffectLevel.classList.remove('hidden');
      effectLevelValue.value = valueForInput;
    }
  }

  function convertor(button) {
    if (button === effectNoneButton) {
      currentEffect = Effects.NONE;
      return Effects.NONE;
    }
    if (button === effectChromeButton) {
      currentEffect = Effects.GRYSCALE;
      return Effects.GRYSCALE;
    }
    if (button === effectSepiaButton) {
      currentEffect = Effects.SEPIA;
      return Effects.SEPIA;
    }
    if (button === effectMarvinButton) {
      currentEffect = Effects.INVERT;
      return Effects.INVERT;
    }
    if (button === effectPhobosButton) {
      currentEffect = Effects.BLUR;
      return Effects.BLUR;
    }
    if (button === effectHeatButton) {
      currentEffect = Effects.BRIGHTNESS;
      return Effects.BRIGHTNESS;
    }
    currentEffect = Effects.NONE;
    return Effects.NONE;
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
    body.classList.add('modal-open');
  }

  function renderErrorTemp() {
    main.appendChild(errorBlock);
    var errorButton = main.querySelector('.error__button');
    var errorInner = document.querySelector('.error__inner');
    errorButton.addEventListener('click', removeErrorTemp);
    document.addEventListener('click', removeErrorTemp);
    document.addEventListener('keydown', onErrorKeydown);
    errorInner.addEventListener('click', onInnerClick);
    body.classList.add('modal-open');
  }

  function removeSuccessTemp() {
    var successButton = main.querySelector('.success__button');
    var successInner = document.querySelector('.success__inner');
    successBlock.remove();
    successButton.removeEventListener('click', removeSuccessTemp);
    document.removeEventListener('click', removeSuccessTemp);
    document.removeEventListener('keydown', onSuccessKeydown);
    successInner.removeEventListener('click', onInnerClick);
    body.classList.remove('modal-open');
  }

  function removeErrorTemp() {
    var errorButton = main.querySelector('.error__button');
    var errorInner = document.querySelector('.error__inner');
    errorBlock.remove();
    errorButton.removeEventListener('click', removeErrorTemp);
    document.removeEventListener('click', removeErrorTemp);
    document.removeEventListener('keydown', onErrorKeydown);
    errorInner.removeEventListener('click', onInnerClick);
    body.classList.remove('modal-open');
  }

  uploadSelectImage.addEventListener('submit', function (evt) {
    window.upload.upload(new FormData(uploadSelectImage), renderSuccessTemp, renderErrorTemp);
    evt.preventDefault();
    uploadClose();
  });

  textDescription.addEventListener('keydown', window.utils.onElementKeyDown);

  window.form = {
    applyCurrentEffect: applyCurrentEffect
  };

})();
