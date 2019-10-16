'use strict';

var PICTURES_COUNT = 25;
var MAX_COMMENTS_COUNT = 5;
var MIN_LIKES_COUNT = 15;
var MAX_LIKES_COUNT = 200;
var MIN_AVATAR_NUMBER = 1;
var MAX_AVATAR_NUMBER = 6;


var AUTHOR_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var COMMENT_AUTHOR_NAME = [
  'Маша',
  'Лиза',
  'Аня',
  'Антон',
  'Егор',
  'Ренат'
];

// Генерация числа в заданном диапазоне, либо от 0 до указанного значения
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// Генерация объект-комментарий
var generateCommentObject = function () {
  var commentObject = {};

  commentObject.avatar = 'avatar-' + getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg';
  commentObject.message = AUTHOR_COMMENTS[getRandomNumber(0, AUTHOR_COMMENTS.length)];
  commentObject.name = COMMENT_AUTHOR_NAME[getRandomNumber(0, COMMENT_AUTHOR_NAME.length)];

  return commentObject;
};

// Генерация массива объектов-комментариев
var generateCommentsObjectsArray = function () {
  var commentsObjectsArray = [];
  commentsObjectsArray.length = getRandomNumber(0, MAX_COMMENTS_COUNT);

  for (var i = 0; i < commentsObjectsArray.length; i++) {
    commentsObjectsArray[i] = generateCommentObject();
  }

  return commentsObjectsArray;
};

// Генерация массива из объектов фотографий
var getPictureList = function () {
  var photo = [];
  for (var i = 0; i < PICTURES_COUNT; i++) {
    photo.push({
      url: 'photos/' + (i + 1) + '.jpg',
      description: '',
      likes: getRandomNumber(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
      comments: generateCommentsObjectsArray()
    });
  }

  return photo;
};

var pictureList = document.querySelector('.pictures');

// Рендер DOM элемента на основе объекта
var renderPicture = function (photo) {
  var templatePicture = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var pictureElement = templatePicture.cloneNode(true);

  pictureElement.querySelector('img').setAttribute('src', photo.url);
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;


  return pictureElement;
};

// Заполнение DOM элемента на основе массива
var renderPictureList = function (photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPicture(photos[i]));
  }
  return fragment;
};

var pictureListA = renderPictureList(getPictureList());
pictureList.appendChild(pictureListA);

// ОТКРЫТИЕ ФОРМЫ ЗАГРУЗКИ И РЕДАКТИРОВАНИЯ ФОТО
// Загрузка нового изображения
var uploadFile = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.img-upload__overlay');
var uploadOverlayCancel = uploadOverlay.querySelector('.img-upload__cancel');

uploadFile.addEventListener('change', function () {
  uploadOverlay.classList.remove('hidden');
});

uploadOverlayCancel.addEventListener('click', function (evt) {
  evt.preventDefault();
  uploadOverlay.classList.add('hidden');
});

// Увеличение масштаба изображения
var STEP = 25;
var imageUploadScale = document.querySelector('.img-upload__scale');
var scaleControlValue = imageUploadScale.querySelector('.scale__control--value');
var buttonSmall = imageUploadScale.querySelector('.scale__control--smaller');
var buttonlBig = imageUploadScale.querySelector('.scale__control--bigger');
var imageUploadPreview = document.querySelector('.img-upload__preview');

scaleControlValue.setAttribute('value', '100%');

var currentValue = parseInt(scaleControlValue.getAttribute('value'), 10);

buttonSmall.addEventListener('click', function (evt) {
  evt.preventDefault();
  changeValue(currentValue, false);
});

buttonlBig.addEventListener('click', function (evt) {
  evt.preventDefault();
  changeValue(currentValue, true);
});

function changeValue(value, isGrow) {
  if (!isGrow && value > STEP) {
    value -= STEP;
  } else if (isGrow && value < 100) {
    value += STEP;
  }
  resizeImage(value);
  currentValue = value;
  scaleControlValue.setAttribute('value', value + '%');
}

function resizeImage(value) {
  imageUploadPreview.style.transform = 'scale(' + value / 100 + ')';
}

// Наложение эффекта на изображение
var FILTERS = {
  'effect-chrome': 'effects__preview--chrome',
  'effect-sepia': 'effects__preview--sepia',
  'effect-marvin': 'effects__preview--marvin',
  'effect-phobos': 'effects__preview--phobos',
  'effect-heat': 'effects__preview--heat'
};
var imageUploadEffects = document.querySelector('.img-upload__effects');
var effectsItems = imageUploadEffects.querySelectorAll('.effects__item');

for (var i = 0; i < effectsItems.length; i++) {
  addThumbnailClickHandler(effectsItems[i]);
}

function addThumbnailClickHandler(thumbnail) {
  thumbnail.addEventListener('click', function () {
    var item = thumbnail.querySelector('.effects__label');
    var filterName = item.getAttribute('for');
    var picture = imageUploadPreview.querySelector('img');
    picture.removeAttribute('class');

    if (FILTERS[filterName]) {
      picture.classList.add(FILTERS[filterName]);
    }
  });
}

// ВАЛИДАЦИЯ ХЕШТЕГОВ

var HASHTAG_ERRORS = {
  'symbol': 'Отсутствует обязательный символ #',
  'symbol_wrong': 'Символ # должен стоять в начале хештега',
  'max': 'Максимальное кол-во хештегов должно быть 5',
  'same': 'Есть повторяющиеся хештеги',
  'maxLength': 'Слишком длинный хештег'
};

var inputHashtags = document.querySelector('.text__hashtags');

inputHashtags.addEventListener('change', function () {
  var hashtagsArr = inputHashtags.value.split(' ');
  var errorCode = checkHashtag(hashtagsArr);

  if (errorCode !== '') {
    inputHashtags.setCustomValidity(HASHTAG_ERRORS[errorCode]);
  } else {
    inputHashtags.setCustomValidity(errorCode);
  }
});

function checkHashtag(array) {
  if (array.length > 5) {
    return 'max';
  }

  for (var k = 0; k < array.length; k++) {
    if (array[k].length > 20) {
      return 'maxLength';
    }
    if (array[k].indexOf('#') < 0) {
      return 'symbol';
    }
    if (array[k].indexOf('#') > 0) {
      return 'symbol_wrong';
    }
    for (var j = 0; j < array.length; j++) {
      if ((array[k].toLowerCase() === array[j].toLowerCase()) && (k !== j)) {
        return 'same';
      }
    }
  }

  return '';
}
// Добавление комментария к изображению
var inputComments = document.querySelector('.text__description');

inputComments.addEventListener('change', function () {
  var str = inputComments.value;
  if (str.length > 140) {
    inputComments.setCustomValidity('Комментарий не должен превышать 140-ка символов');
  } else {
    inputComments.setCustomValidity('');
  }
});
