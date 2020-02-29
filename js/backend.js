'use strict';

(function () {

  var serverUrls = {
    GET: 'https://js.dump.academy/kekstagram/data'
  };

  var serverStatus = {
    OK: 200
  };

  var timeOutInMs = 10000;

  function load(onSuccess, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = timeOutInMs;

    xhr.addEventListener('load', function () {
      if (xhr.status === serverStatus.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', serverUrls.GET);
    xhr.send();
  }

  window.backend = {
    load: load
  };

})();