'use strict';

(function () {
  var MAX_COMMENTS_COUNT = 5;

  // Генерация массива объектов-комментариев
  window.comments = {
    // Генерация объект-комментарий
    generateCommentObject: function () {
      var commentObject = {};

      commentObject.avatar = 'avatar-' + window.data.getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg';
      commentObject.message = AUTHOR_COMMENTS[window.data.getRandomNumber(0, AUTHOR_COMMENTS.length)];
      commentObject.name = COMMENT_AUTHOR_NAME[window.data.getRandomNumber(0, COMMENT_AUTHOR_NAME.length)];

      return commentObject;
    }

    var generateCommentsObjectsArray = function () {
      var commentsObjectsArray = [];
      commentsObjectsArray.length = window.data.getRandomNumber(0, MAX_COMMENTS_COUNT);

      for (var i = 0; i < commentsObjectsArray.length; i++) {
        commentsObjectsArray[i] = generateCommentObject();
      }

      return commentsObjectsArray;
    }
  };
})();
