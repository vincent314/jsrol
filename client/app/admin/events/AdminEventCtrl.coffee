class AdminEventCtrl

  @$inject = ['$scope', '$stateParams', '$log', 'Event', 'config']
  constructor: (@$scope, @$stateParams, @$log, @Event, config)->
    id = $stateParams.id
    $log.debug "Get Event with ID=#{id}"

    Event.get
      id: id
    .$promise.then (event)->
      $scope.event = event

    $scope.dateOptions = {}

    $scope.eventTypes = config.eventTypes

angular.module 'jsrolApp'
.controller 'AdminEventCtrl', AdminEventCtrl