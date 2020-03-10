'use strict';

(function () {

  var serverUrls = {
    POST: 'https://js.dump.academy/kekstagram'
  };

  var serverStatus = {
    OK: 200
  };

  function upload(data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === serverStatus.OK) {
        onSuccess();
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.open('POST', serverUrls.POST);
    xhr.send(data);
  }

  window.upload = {
    upload: upload
  };

})();
