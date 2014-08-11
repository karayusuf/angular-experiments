window.myApp = angular.module('myApp', []);
myApp.controller('appController', function($scope) {
  $scope.feature = {
    percent: '25'
  }
});
