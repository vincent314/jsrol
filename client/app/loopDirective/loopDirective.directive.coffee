'use strict'

class LoopDirectiveController

  constructor: ($scope)->
    @label = $scope.label
    @loop = $scope.loop

  loopClick: (l)->
    console.log l


LoopDirectiveController.$inject = ['$scope']
angular.module 'jsrolApp'
.controller 'LoopDirectiveController', LoopDirectiveController
.directive 'loopDirective', ->
  templateUrl: 'app/loopDirective/loopDirective.html'
  restrict: 'E'
  controller: LoopDirectiveController,
  controllerAs: 'ctrl',
  scope:{
    loop:'@'
    label:'@'
  }
