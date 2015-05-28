class AdminEventCtrl

  @$inject = ['$scope', '$stateParams', '$log', 'Event', 'config','Track']
  constructor: (@$scope, @$stateParams, @$log, @Event, config, @Track)->
    id = $stateParams.id
    $log.debug "Get Event with ID=#{id}"

#    Get Event details
    Event.get
      id: id
    .$promise.then (event)->
      $scope.event = event

    $scope.dateOptions = {}

#    Set types of events for type selection
    $scope.eventTypes = config.eventTypes

#    Get all available tracks for loop selection
    $scope.tracks = Track.query().$promise.then (tracks)->
      $scope.tracks = tracks

angular.module 'jsrolApp'
.controller 'AdminEventCtrl', AdminEventCtrl