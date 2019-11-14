'use strict';

(function () {
  window.ESC = 27;
  // Генерация числа в заданном диапазоне, либо от 0 до указанного значения
  window.utils = {
    randomInteger: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    serverLink: 'https://js.dump.academy/kekstagram'
  };
})();
