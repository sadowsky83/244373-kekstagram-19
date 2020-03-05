'use strict';

(function () {

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

      if (position <= 0) {
        position = 0;
      }

      if (position > 450) {
        position = 450;
      }

      makeValueOfFilter(position);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
