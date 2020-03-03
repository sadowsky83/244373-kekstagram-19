'use strict';

(function () {
  function init() {
    window.backend.load(window.gallery.renderCards, window.gallery.renderError);
  }

  init();
})();
