class LoopController

  constructor: ($scope)->
    $scope.loopClick = @loopClick

  loopClick: (l)->
    console.log l

LoopController.$inject = ['$scope']
angular.module 'loop.button', []
.directive 'loop', ()->
  {
  restrict: 'E'
  scope: {
    label: "="
    loop: "="
  }
  templateUrl: 'components/loop/loop.directive.html'
  controller: LoopController
  }
