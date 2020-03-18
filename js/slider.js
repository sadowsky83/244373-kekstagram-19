'use strict';

(function () {

  var COORDINAT_MIN_VALUE = 0;
  var COORDINAT_MAX_VALUE = 450;

  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  function makeValueOfFilter(value) {
    effectLevelPin.style.left = value + 'px';
    effectLevelDepth.style.width = value + 'px';
  }

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = evt.clientX;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoords - moveEvt.clientX;
      var position = effectLevelPin.offsetLeft - shift;
      startCoords = moveEvt.clientX;

      if (position <= COORDINAT_MIN_VALUE) {
        position = COORDINAT_MIN_VALUE;
      }

      if (position > COORDINAT_MAX_VALUE) {
        position = COORDINAT_MAX_VALUE;
      }

      makeValueOfFilter(position);
      window.form.applyCurrentEffect(position);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.slider = {
    makeValueOfFilter: makeValueOfFilter,
    maxValue: COORDINAT_MAX_VALUE
  };

})();
