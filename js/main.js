'use strict';

var PICTURES_COUNT = 25;
var MAX_COMMENTS_COUNT = 5;
var MIN_LIKES_COUNT = 15;
var MAX_LIKES_COUNT = 200;
var MIN_AVATAR_NUMBER = 1;
var MAX_AVATAR_NUMBER = 6;
var TAG_NUMBER = 5;
var ESC_BUTTON = 27;

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
var getRandomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// Генерация объект-комментарий
var generateCommentObject = function() {
  var commentObject = {};

  commentObject.avatar = 'avatar-' + getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg';
  commentObject.message = AUTHOR_COMMENTS[getRandomNumber(0, AUTHOR_COMMENTS.length)];
  commentObject.name = COMMENT_AUTHOR_NAME[getRandomNumber(0, COMMENT_AUTHOR_NAME.length)];

  return commentObject;
};

// Генерация массива объектов-комментариев
var generateCommentsObjectsArray = function() {
  var commentsObjectsArray = [];
  commentsObjectsArray.length = getRandomNumber(0, MAX_COMMENTS_COUNT);

  for (var i = 0; i < commentsObjectsArray.length; i++) {
    commentsObjectsArray[i] = generateCommentObject();
  }

  return commentsObjectsArray;
};

// Генерация массива из объектов фотографий
var getPictureList = function() {
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
var renderPicture = function(photo) {
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
var renderPictureList = function(photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPicture(photos[i]));
  }
  return fragment;
};

var pictureListA = renderPictureList(getPictureList());
pictureList.appendChild(pictureListA);

// ОТКРЫТИЕ ФОРМЫ ЗАГРУЗКИ И РЕДАКТИРОВАНИЯ ФОТО

var uploadForm = document.querySelector('#upload-file');
var editForm = document.querySelector('.img-upload__overlay');
var buttonClose = editForm.querySelector('#upload-cancel');
var photoHashtags = editForm.querySelector('.text__hashtags');
var photoDescription = editForm.querySelector('.text__description');

var openEditForm = function() {
  editForm.classList.remove('hidden');
  document.addEventListener('keydown', onEditFormEscPress);
};

var closeEditForm = function() {
  editForm.classList.add('hidden');
  document.removeEventListener('keydown', onEditFormEscPress);
};

var onInputTagsDescriptionPress = function(evt) {
  if (evt.keyCode === ESC_BUTTON) {
    evt.stopPropagation();
  }
};

var onEditFormEscPress = function(evt) {
  if (evt.keyCode === ESC_BUTTON) {
    editForm.classList.add('hidden');
  }
};

uploadForm.addEventListener('change', openEditForm);
buttonClose.addEventListener('click', closeEditForm);
photoHashtags.addEventListener('keydown', onInputTagsDescriptionPress);
photoDescription.addEventListener('keydown', onInputTagsDescriptionPress);

// ВАЛИДАЦИЯ ХЕШТЕГОВ

photoHashtags.addEventListener('invalid', function() {
  if (photoHashtags.validity.tooShort) {
    photoHashtags.setCustomValidity('Слишком короткий хештег');
  }
});

var hashtagHandler = function() {
  var hashtags = photoHashtags.value;

  if (!hashtags.includes(' ')) {
    return photoHashtags.setCustomValidity('Хештеги должны разделяться пробелами');
  }

  hashtags = hashtags.replace(/\s\s+/g, ' ').trim().toLowerCase().split(' ');

  if (hashtags.length > TAG_NUMBER) {
    return photoHashtags.setCustomValidity('Cлишком много хештегов, ограничьтесь пятью');
  }

  for (var i = 0; i < hashtags.length; i++) {
    if (hashtags[i][0] !== '#') {
      return photoHashtags.setCustomValidity('Хештеги должны начинаться со знака "#"');
    } else if (hashtags[i].length > 20) {
      return photoHashtags.setCustomValidity('Длина одного хештега не должна быть больше 20 знаков, включая "#"');
    } else if (hashtags.findIndex(function(tag, currentIndex) {
        return tag === hashtags[i] && currentIndex !== i;
      }) !== -1) {
      return photoHashtags.setCustomValidity('Хештеги не должны быть одинаковыми');
    }
  }

  return hashtags;
};

photoHashtags.addEventListener('change', hashtagHandler);

photoHashtags.addEventListener('input', function() {
  photoHashtags.setCustomValidity('');
});

// ИЗМЕНЕНИЕ ГЛУБИНЫ ЭФФЕКТА ФИЛЬТРА

var EFFECT_LEVEL_LINE_WIDTH = 455; // ширина блока линейки 495px минус отступы линии от границ блока слева справа по 20px

var effectLevelPin = editForm.querySelector('.effect-level__pin');
var effectLevelValue = editForm.querySelector('.effect-level__value');
var effectLevelDepth = editForm.querySelector('.effect-level__depth');

var onEffectLevelPinPress = function() {
  var currentEffectValue = Math.round(effectLevelDepth / (EFFECT_LEVEL_LINE_WIDTH / 100));
  effectLevelValue.setAttribute('value', currentEffectValue);
};

effectLevelPin.addEventListener('mouseup', onEffectLevelPinPress);
