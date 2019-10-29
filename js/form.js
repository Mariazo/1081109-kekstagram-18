'use strict';

(function () {
  // ОТКРЫТИЕ ФОРМЫ ЗАГРУЗКИ И РЕДАКТИРОВАНИЯ ФОТО
  var FILTERS = {
    'effect-chrome': 'effects__preview--chrome',
    'effect-sepia': 'effects__preview--sepia',
    'effect-marvin': 'effects__preview--marvin',
    'effect-phobos': 'effects__preview--phobos',
    'effect-heat': 'effects__preview--heat'
  };
  var STEP = 25;
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
  var imageUploadScale = document.querySelector('.img-upload__scale');
  var scaleControlValue = imageUploadScale.querySelector('.scale__control--value');
  var buttonSmall = imageUploadScale.querySelector('.scale__control--smaller');
  var buttonlBig = imageUploadScale.querySelector('.scale__control--bigger');
  var imageUploadPreview = document.querySelector('.img-upload__preview');

  function resizeImage(value) {
    imageUploadPreview.style.transform = 'scale(' + value / 100 + ')';
  }

  var currentValue = parseInt(scaleControlValue.getAttribute('value'), 10);

  buttonSmall.addEventListener('click', function (evt) {
    evt.preventDefault();
    changeValue(currentValue, false);
  });

  buttonlBig.addEventListener('click', function (evt) {
    evt.preventDefault();
    changeValue(currentValue, true);
  });

  // Изменение значения при масштабировании изображения
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

  // Наложение эффекта на изображение
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
})();
