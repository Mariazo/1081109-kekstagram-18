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

var COMMENT_AUTHOR_AVATAR = [
  'img/avatar-1.svg',
  'img/avatar-2.svg',
  'img/avatar-3.svg',
  'img/avatar-4.svg',
  'img/avatar-5.svg',
  'img/avatar-6.svg'
]

// Генерация числа в заданном диапазоне, либо от 0 до указанного значения
var getRandomNumber = function(max, min) {
  return Math.floor((Math.random() * (max - min) + min));
};

// Получение случайного элемента из массива
var getRandomArrElement = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Генерация массива из объектов фотографий
var getPictureList = function() {
  var photo = [];
  photo.forEach(function(item) {
    photo.push({
      url: 'photos/' + (i + 1) + '.jpg',
      description: '',
      likes: randomNumber(LIKES_COUNT_MAX, LIKES_COUNT_MIN),
      comments: {
        name: getRandomArrElement(COMMENT_AUTHOR_NAME),
        avatar: getRandomArrElement(COMMENT_AUTHOR_AVATAR),
        massage: getRandomArrElement(AUTHOR_COMMENTS)
      }
    });
  })

  return photo;
};

var pictureList = document.querySelector('.pictures');
var templatePicture = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// Рендер DOM элемента на основе объекта
var renderPicture = function (photo) {
  var pictureElement = templatePictureItem.cloneNode(true);

  pictureElement.querySelector('img').setAttribute('src', photo.url);
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments;

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

pictureList.appendChild(renderPictureList(getPictureList));
