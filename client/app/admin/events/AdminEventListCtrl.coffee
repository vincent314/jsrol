class AdminEventListCtrl

  @$inject = ['$scope','$http','Event','$log']
  constructor: (@$scope,@$http,@Event,@$log)->
    Event.query().$promise
    .then (events)->
      $log.info "Got #{events.length} events"
      $scope.events = events

angular.module 'jsrolApp'
.controller 'AdminEventListCtrl', AdminEventListCtrl
