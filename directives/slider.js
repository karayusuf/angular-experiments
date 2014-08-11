myApp
.directive('sliderButton', function($document) {
  function link(scope, element, attrs) {
    var percent = scope.percent;

    element.css({
      'background-color': '#efefef'
    , 'bottom': '-10px'
    , 'border': '1px solid #d2d2d2'
    , 'border-radius': '5px'
    , 'left': percent + '%'
    , 'position': 'absolute'
    , 'top': '-10px'
    , 'width': '10px'
    });

    element.on('mousedown', function() {
      $document.on('mouseup', stopInteraction)
      $document.on('mousemove', lateralMove)
    });

    function stopInteraction() {
      $document.off('mousemove', lateralMove);
      $document.off('mouseup', stopInteraction);
      scope.percent = percent;
      scope.$apply();
    }

    function lateralMove(event) {
      event.preventDefault();
      percent = Math.ceil((event.pageX / scope.rightBoundary) * 100);

      if (percent <= 0) {
        percent = 0;
      } else if(percent >= 100) {
        percent = 100;
      }

      element.css('left', percent + '%');
    }
  }

  return {
    'restrict': 'AE'
  , 'replace': true
  , 'template': '<div></div>'
  , 'link': link
  }
})
.directive('slider', function() {
  function link(scope, element, attrs) {
    element.css({
      'height': '10px'
    , 'background-color': '#fbfbfb'
    , 'border-radius': '5px'
    , 'border': '1px solid #e2e2e2'
    , 'box-shadow': '2px 2px 2px #f2f2f2 inset'
    , 'position': 'relative'
    , 'width': '200px'
    });

    scope.containerWidth = element.prop('offsetWidth');
    scope.leftBoundary = element.prop('offsetLeft');
    scope.rightBoundary = scope.containerWidth + scope.leftBoundary;
  }

  return {
    'restrict': 'AE'
  , 'replace': true
  , 'template': '<div><slider-button></slider-button></div>'
  , 'scope': {
      'percent': '='
    }
  , 'link': link
  }
});
