'use strict'

angular.module 'jsrolApp'
.controller 'EventsCtrl', ($scope,Events,DTOptionsBuilder, DTColumnBuilder) ->
  self = this

  $scope.dtOptions = DTOptionsBuilder.fromFnPromise ()->
    # list all events
    options = {$sort:{"dateTime":-1}}
    Events.all(options)

  $scope.dtColumns = [
    DTColumnBuilder.newColumn('name').withTitle('NAME')
    DTColumnBuilder.newColumn('dateTime.$date').withTitle('DATETIME')
  ]

