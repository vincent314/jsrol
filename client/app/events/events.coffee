'use strict'

angular.module 'jsrolApp'
.config ($stateProvider) ->
  $stateProvider.state 'events',
    url: '/events'
    templateUrl: 'app/events/events.html'
    controller: 'EventsCtrl'
