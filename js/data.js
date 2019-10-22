'use strict';

(function () {
  // Генерация числа в заданном диапазоне, либо от 0 до указанного значения
  window.data = {
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
  };
})();
