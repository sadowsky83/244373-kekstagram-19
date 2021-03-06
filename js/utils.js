'use strict';
(function () {

  var DEBOUNCE_INTERVAL = 500; // ms

  // устранение дребезга
  function debounce(cb) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  }

  // удаление элеменотов из DOM-а по классу
  function removeElementsByClass(className) {
    var elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  }

  // запрет всплытия события
  function onElementKeyDown(evt) {
    evt.stopPropagation();
  }

  window.utils = {
    debounce: debounce,
    removeElementsByClass: removeElementsByClass,
    onElementKeyDown: onElementKeyDown
  };

})();
