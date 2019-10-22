'use strict';

(function () {
  var MIN_AVATAR_NUMBER = 1;
  var MAX_AVATAR_NUMBER = 6;
  var MAX_COMMENTS_COUNT = 5;
  var COMMENT_AUTHOR_NAME = [
    'Маша',
    'Лиза',
    'Аня',
    'Антон',
    'Егор',
    'Ренат'
  ];
  var AUTHOR_COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];


  window.comments = {
    // Генерация объект-комментарий
    generateCommentObject: function () {
      var commentObject = {};

      commentObject.avatar = 'avatar-' + window.data.getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg';
      commentObject.message = AUTHOR_COMMENTS[window.data.getRandomNumber(0, AUTHOR_COMMENTS.length)];
      commentObject.name = COMMENT_AUTHOR_NAME[window.data.getRandomNumber(0, COMMENT_AUTHOR_NAME.length)];

      return commentObject;
    },

    // Генерация массива объектов-комментариев
    generateCommentsObjectsArray: function () {
      var commentsObjectsArray = [];
      commentsObjectsArray.length = window.data.getRandomNumber(0, MAX_COMMENTS_COUNT);

      for (var i = 0; i < commentsObjectsArray.length; i++) {
        commentsObjectsArray[i] = generateCommentObject();
      }

      return commentsObjectsArray;
    }
  };
})();
