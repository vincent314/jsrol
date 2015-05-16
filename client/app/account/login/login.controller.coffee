'use strict'

angular.module 'jsrolApp'
.controller 'LoginCtrl', ($scope, Auth, $location, $window) ->
  $scope.isFailure = $location.search().isFailure is 'true'

  $scope.loginOauth = (provider) ->
    $window.location.href = '/auth/' + provider
