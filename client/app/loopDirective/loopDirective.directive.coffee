'use strict'

class LoopDirectiveController

  constructor: ($scope,$location)->
    $scope.loopClick = @loopClick

  loopClick: (l)->
    console.log l
#    $location.url()


LoopDirectiveController.$inject = ['$scope','$location']
angular.module 'jsrolApp'
.directive 'loopDirective', ->
  templateUrl: 'app/loopDirective/loopDirective.html'
  restrict: 'E'
  controller: LoopDirectiveController
  scope:{
    loop:'='
    label:'='
  }
