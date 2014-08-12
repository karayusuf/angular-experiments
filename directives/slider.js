myApp
.directive('slider', function($document) {
  function link(scope, element, attrs) {
    element.css({
      'height': '10px'
    , 'background-color': '#fbfbfb'
    , 'border-radius': '5px'
    , 'border': '1px solid #e2e2e2'
    , 'box-shadow': '2px 2px 2px #f2f2f2 inset'
    , 'position': 'relative'
    , 'width': '200px'
    , 'margin-left': '200px'
    });

    var button = element.find('button');
    button.css({
      'background-color': '#efefef'
    , 'bottom': '-10px'
    , 'border': '1px solid #d2d2d2'
    , 'border-radius': '5px'
    , 'left': scope.percent + '%'
    , 'position': 'absolute'
    , 'top': '-10px'
    , 'width': '10px'
    });

    var containerWidth = element.prop('offsetWidth')
      , leftBoundary = element.prop('offsetLeft')
      , rightBoundary = containerWidth + leftBoundary
      , width = button.prop('offsetWidth')
      , position = 0;

    element.on('mousedown', function(event) {
      $document.on('mouseup', stopInteraction)
      $document.on('mousemove', lateralMove)
    });

    function stopInteraction() {
      $document.off('mousemove', lateralMove);
      $document.off('mouseup', stopInteraction);
      scope.$apply();
    }

    function lateralMove(event) {
      event.preventDefault();

      if (event.pageX <= leftBoundary) {
        position = -(width / 2);
        scope.percent = 0;
      } else if(event.pageX >= rightBoundary) {
        position = containerWidth - (width / 2);
        scope.percent = 100;
      } else {
        position = (event.pageX % leftBoundary);
        scope.percent = Math.round((position / containerWidth) * 100);
      }

      button.css('left', position + 'px');
    }
  }

  return {
    'restrict': 'AE'
  , 'replace': true
  , 'template': '<div><button></button></div>'
  , 'scope': {
      'percent': '='
    }
  , 'link': link
  }
});
