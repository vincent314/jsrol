'use strict'

angular.module 'jsrolApp'
.config ($stateProvider) ->
  $stateProvider.state 'map',
    url: '/map/:l'
    templateUrl: 'app/map/map.html'
    controller: 'MapCtrl'
    controllerAs: 'ctrl'
