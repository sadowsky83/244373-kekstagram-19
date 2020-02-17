'use strict';

// тексты комментариев
var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

// имена пользователей
var names = ['Валентин', 'Джек Шепард', 'Азура', 'Кабан', 'nagibator777', 'X0P0B0D', 'sveta98', 'KotVKedax', 'Ромашка'];

// переменные элементов
var cardsArray = [];
var picture = document.querySelector('#picture').content.querySelector('.picture');
var commentsListItem = document.querySelector('#commentsListItem').content.querySelector('.social__comment');
var pictures = document.querySelector('.pictures');
var body = document.querySelector('body');
var imgUploadForm = document.querySelector('.img-upload__form');
var uploadFileInput = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
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
var textHashtag = document.querySelector('.text__hashtags');
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

function onInputKeyDown(evt) {
  evt.stopPropagation();
}

// выбор случайного числа в диапазоне
function getRandomInRange(min, max) {
  var randomNumber = min + Math.random() * (max - min);
  return Math.round(randomNumber);
}

// выбор случайного элемента массива
function getRandomElement(arrName) {
  return arrName[(Math.floor(arrName.length * (Math.random())))];
}

// создание массива комментариев
function commentArrayGeneration(quantity) {
  var commentsArray = [];
  for (var i = 1; i <= quantity; i++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomInRange(1, 6) + '.svg',
      message: getRandomElement(messages),
      name: getRandomElement(names)
    };
    commentsArray.push(comment);
  }
  return commentsArray;
}

// создание массива карточек
function cardArrayGeneration(quantity) {
  for (var i = 1; i <= quantity; i++) {
    var imgObj = {
      url: 'photos/' + i + '.jpg',
      description: 'Описание фотографии',
      likes: getRandomInRange(15, 200),
      comments: commentArrayGeneration(getRandomInRange(1, 10))
    };
    cardsArray.push(imgObj);
  }
  return cardsArray;
}

cardArrayGeneration(25);

// отрисовка карточки
function renderCard(card) {
  var cardElement = picture.cloneNode(true);
  cardElement.querySelector('.picture__img').src = card.url;
  cardElement.querySelector('.picture__comments').textContent = card.comments.length;
  cardElement.querySelector('.picture__likes').textContent = card.likes;
  return cardElement;
}

// создание фрагмента
var fragment = document.createDocumentFragment();

for (var i = 0; i < cardsArray.length; i++) {
  fragment.appendChild(renderCard(cardsArray[i]));
  pictures.appendChild(fragment);
}

// отрисовка комментария
function renderComment(comment) {
  var commentItemElement = commentsListItem.cloneNode(true);
  commentItemElement.querySelector('.social__picture').src = comment.avatar;
  commentItemElement.querySelector('.social__picture').alt = comment.name;
  commentItemElement.querySelector('.social__text').textContent = comment.message;
  return commentItemElement;
}

function bigPictureShow(cardNumber) {
  var bigPictureImg = document.querySelector('.big-picture__img');
  var socialComents = document.querySelector('.social__comments');

  // показываем блок big-picture
  // document.querySelector('.big-picture').classList.remove('hidden');
  bigPictureImg.querySelector('img').src = cardsArray[cardNumber].url;
  document.querySelector('.likes-count').textContent = cardsArray[cardNumber].likes;
  document.querySelector('.comments-count').textContent = cardsArray[cardNumber].comments.length;

  // добавление списка комментариев
  for (var y = 0; y < cardsArray[cardNumber].comments.length; y++) {
    fragment.appendChild(renderComment(cardsArray[cardNumber].comments[y]));
    socialComents.appendChild(fragment);
  }
  document.querySelector('.social__caption').textContent = cardsArray[cardNumber].description;
}

// скрытие блоков .social__comment-count и .comments-loader
document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.comments-loader').classList.add('hidden');

bigPictureShow(0);

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

