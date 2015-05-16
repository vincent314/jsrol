class AdminEventCtrl

  @$inject = ['$scope','$stateParams','$log','Event']
  constructor: (@$scope,@$stateParams,@$log,@Event)->
    id = $stateParams.id
    $log.debug "Get Event with ID=#{id}"

    Event.get
      id:id
    .$promise.then (event)->
      $scope.event = event




angular.module 'jsrolApp'
.controller 'AdminEventCtrl', AdminEventCtrl