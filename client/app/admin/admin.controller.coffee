'use strict'

angular.module 'jsrolApp'
.controller 'AdminCtrl', ($scope, $http, Auth, User) ->

  $http.get '/api/events'
  .success (events) ->
    $scope.events = events

  $scope.delete = (user) ->
    User.remove id: user._id
    _.remove $scope.users, user