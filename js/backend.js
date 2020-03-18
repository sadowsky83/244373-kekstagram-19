'use strict';

(function () {

  var ServerUrls = {
    GET: 'https://js.dump.academy/kekstagram/data'
  };

  var ServerStatus = {
    OK: 200
  };

  var TIME_OUT_IN_MS = 10000;

  function load(onSuccess, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIME_OUT_IN_MS;

    xhr.addEventListener('load', function () {
      if (xhr.status === ServerStatus.OK) {
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

    xhr.open('GET', ServerUrls.GET);
    xhr.send();
  }

  window.backend = {
    load: load
  };

})();
