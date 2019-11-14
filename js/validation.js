'use strict';

(function () {
  // ВАЛИДАЦИЯ ХЕШТЕГОВ
  var COMMENTS_MAX_LENGTH = 140;
  var HASHTAG_MAX_LENGTH = 20;
  var MAX_HASHTAG = 5;
  var HASHTAG_ERRORS = {
    'symbol': 'Отсутствует обязательный символ #',
    'symbol_wrong': 'Символ # должен стоять в начале хештега',
    'max': 'Максимальное кол-во хештегов должно быть 5',
    'same': 'Есть повторяющиеся хештеги',
    'maxLength': 'Слишком длинный хештег',
    'space': 'Хэштеги должны быть разделены пробелом'
  };

  var inputHashtags = document.querySelector('.text__hashtags');
  var inputComments = document.querySelector('.text__description');


  inputHashtags.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  function checkHashtag(array) {
    if (array.length > MAX_HASHTAG) {
      return 'max';
    }

    for (var k = 0; k < array.length; k++) {
      if (array[k].length > HASHTAG_MAX_LENGTH) {
        return 'maxLength';
      }
      if (array[k].indexOf('#') < 0) {
        return 'symbol';
      }
      if (array[k].indexOf('#') > 0) {
        return 'symbol_wrong';
      }
      if (array[k].slice(1).includes('#')) {
        return 'space';
      }
      for (var j = 0; j < array.length; j++) {
        if ((array[k].toLowerCase() === array[j].toLowerCase()) && (k !== j)) {
          return 'same';
        }
      }
    }

    return '';
  }

  inputHashtags.addEventListener('change', function () {
    var hashtagsArr = inputHashtags.value.split(' ');
    var newHashtagsArr = [];

    hashtagsArr.forEach(function (tag) {
      if (tag && tag.length > 0) {
        newHashtagsArr.push(tag);
      }
    });

    var errorCode = checkHashtag(newHashtagsArr);

    if (errorCode !== '') {
      inputHashtags.setCustomValidity(HASHTAG_ERRORS[errorCode]);
    } else {
      inputHashtags.setCustomValidity(errorCode);
    }
  });

  // Добавление комментария к изображению

  inputComments.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  inputComments.addEventListener('change', function () {
    var str = inputComments.value;
    if (str.length > COMMENTS_MAX_LENGTH) {
      inputComments.setCustomValidity('Комментарий не должен превышать 140 символов');
    } else {
      inputComments.setCustomValidity('');
    }
  });
})();
