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
