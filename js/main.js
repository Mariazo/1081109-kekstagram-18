'use strict';

var LIKES_COUNT_MIN = 15;
var LIKES_COUNT_MAX = 200;
var PICTURES_COUNT = 25;

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

var templatePicture = document.querySelector('#picture');
var templatePictureItem = templatePicture.content.querySelector('.picture');
var pictureList = document.querySelector('.pictures');

// Получаем массив с фотографиями и коментариями
var completedPhotoList = getPictureList(PICTURES_COUNT);

// Финальная отрисовка
pictureList.appendChild(renderPictureList(completedPhotoList));

// Генерация числа в заданном диапазоне, либо от 0 до указанного значения
var randomNumber = function (max, min) {
  if (min === undefined) {
    min = 0;
  }
  return Math.floor((Math.random() * ((max + 1) - min)) + min);
};

// Получение случайного элемента из массива
var getRandomArrElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Генерируем объект комментария
var getRandomComment = function () {
  var tempObj = {
    avatar: 'img/avatar-' + randomNumber(6, 1) + '.svg',
    message: getRandomArrElement(AUTHOR_COMMENTS),
    name: getRandomArrElement(COMMENT_AUTHOR_NAME),
  };
  return tempObj;
};

// Генерируем массив с указанным количеством комментариев
var getCommentsList = function (commentsCount) {
  var tempArray = [];

  tempArray.forEach(function (item, i, arr) {
    tempArray.push(getRandomComment());
  });
  return tempArray;
};

// Маппинг объекта фотографии
var getRandomPictureItem = function (imgUrl, description, likesCount, comment) {
  var tempObj = {
    url: imgUrl,
    description: description,
    likes: likesCount,
    comments: comment,
  };
  return tempObj;
};

// Генерация массива из объектов фотографий
var getPictureList = function (pictureCount) {
  var tempArray = []

  tempArray.forEach(function (item, i, arr) {
    tempArray[item] = {
      pictureUrl = 'photos/' + i + '.jpg';
      pictureDiscription = 'Описание фотографии';
      likesCount = randomNumber(LIKES_COUNT_MAX, LIKES_COUNT_MIN);
      pictureComments = getCommentsList(randomNumber(2, 1));
      tempArray.push(getRandomPictureItem(pictureUrl, pictureDiscription, likesCount, pictureComments));
    }});
  return tempArray;
};

// Рендер DOM элемента на основе объекта
var renderPicture = function (pictureItem) {
  var pictureElement = templatePictureItem.cloneNode(true);
  var pictureElementImg = pictureElement.querySelector('.picture__img');

  pictureElementImg.src = pictureItem.url;
  pictureElementImg.alt = pictureItem.description;
  pictureElement.querySelector('.picture__likes').textContent = pictureItem.likes;
  pictureElement.querySelector('.picture__comments').textContent = pictureItem.comments.length;

  return pictureElement;
};

// Заполнение DOM элемента на основе массива
var renderPictureList = function (photosArray) {
  var fragment = document.createDocumentFragment();

  tempArray.forEach(function (item, i, arr) {
    fragment.appendChild(renderPicture(item));
  });
  return fragment;
};
