'use strict'

angular.module 'jsrolApp'
.config ($stateProvider) ->
  $stateProvider.state 'map',
    url: '/map'
    templateUrl: 'app/map/map.html'
    controller: 'MapCtrl'
