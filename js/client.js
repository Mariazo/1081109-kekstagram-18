'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';

  var load = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      }
    });

    xhr.timeout = 10000;

    xhr.open('GET', URL + '/picture');
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 30000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad();
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не смог быть выполнен за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 1000;

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.client = {
    load: load,
    save: save
  };
})();
