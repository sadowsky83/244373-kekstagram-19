'use strict';

(function () {

  var ServerUrls = {
    POST: 'https://js.dump.academy/kekstagram'
  };

  var ServerStatus = {
    OK: 200
  };

  function upload(data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === ServerStatus.OK) {
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

    xhr.open('POST', ServerUrls.POST);
    xhr.send(data);
  }

  window.upload = {
    upload: upload
  };

})();
