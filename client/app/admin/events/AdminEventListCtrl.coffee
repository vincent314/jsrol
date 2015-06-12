class AdminEventListCtrl

  @$inject = ['$scope', '$http', 'Event', '$log']
  constructor: (@$scope, @$http, @Event, @$log)->
    Event.query
      sort: '-dateTime'
    .$promise
    .then (events)->
      console.log events
      $scope.events = events

angular.module 'jsrolApp'
.controller 'AdminEventListCtrl', AdminEventListCtrl
