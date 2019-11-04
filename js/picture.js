'use strict';

(function () {
  var PICTURES_COUNT = 25;
  var MIN_LIKES_COUNT = 15;
  var MAX_LIKES_COUNT = 200;

  // Генерация массива из объектов фотографий
  var getPictureList = function () {
    var photo = [];
    for (var i = 0; i < PICTURES_COUNT; i++) {
      photo.push({
        url: 'photos/' + (i + 1) + '.jpg',
        description: '',
        likes: window.data.getRandomNumber(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
        comments: window.comments.generateCommentsObjectsArray()
      });
    }

    return photo;
  };

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

  function setPictures() {
    var pictureList = document.querySelector('.pictures');
    var photoCards = getPictureList();
    pictureList.appendChild(renderPictureList(photoCards));
  }

  setPictures();

var photoData = [];
   for (var i = 0; i < PICTURES_COUNT; i++) {
    photoData.push(getPictureList(i));
  }

  window.photoData = photoData;
})();
