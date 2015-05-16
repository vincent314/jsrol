'use strict'

angular.module 'jsrolApp'
.config ($stateProvider) ->
  $stateProvider
  .state 'admin.eventList',
    url: '/eventList'
    templateUrl: 'app/admin/events/eventList.html'
    controller: 'AdminEventListCtrl'
  .state 'admin.event',
    url: '/event/:id'
    templateUrl: 'app/admin/events/event.html'
    controller: 'AdminEventCtrl'