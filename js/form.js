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
  var imagePreviewScale = 100;

  // клавиши
  var ESC_KEY = 'Escape';
  // var ENTER_KEY = 'Enter';

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
    document.removeEventListener('keydown', onUploadEscPress);
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
  var effectLevel = 1; // времменное значение уровня эффекта, потом будет задаваться бегунком в img-upload__effect-level

  function changeEffect(evt) {
    if (evt.target === effectNoneButton) {
      imgUploadPreview.style.filter = 'none';
    }
    if (evt.target === effectChromeButton) {
      imgUploadPreview.style.filter = 'grayscale(' + effectLevel * 1 + ')';
    }
    if (evt.target === effectSepiaButton) {
      imgUploadPreview.style.filter = 'sepia(' + effectLevel * 1 + ')';
    }
    if (evt.target === effectMarvinButton) {
      imgUploadPreview.style.filter = 'invert(' + effectLevel * 100 + '%)';
    }
    if (evt.target === effectPhobosButton) {
      imgUploadPreview.style.filter = 'blur(' + effectLevel * 3 + 'px)';
    }
    if (evt.target === effectHeatButton) {
      imgUploadPreview.style.filter = 'brightness(' + 1 + effectLevel * 2 + ')';
    }
  }

  imgUploadEffects.addEventListener('change', changeEffect);

})();
