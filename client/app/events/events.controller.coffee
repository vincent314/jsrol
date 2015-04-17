'use strict'

angular.module 'jsrolApp'
.controller 'EventsCtrl', ($scope,Event,DTOptionsBuilder, DTColumnBuilder) ->
  self = this

  $scope.dtOptions = DTOptionsBuilder.fromFnPromise ()->
    # list all events
    options = {$sort:{"dateTime":-1}}
    Event.query().$promise

  $scope.dtColumns = [
    DTColumnBuilder.newColumn('name').withTitle('NAME')
    DTColumnBuilder.newColumn('dateTime.$date').withTitle('DATETIME')
  ]

