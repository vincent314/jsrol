'use strict'

angular.module 'jsrolApp'
.controller 'EventsCtrl', ($scope,Event) ->
  self = this


  Event.query().$promise.then (events)->
    $scope.events = events

