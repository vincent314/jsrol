'use strict'

angular.module 'jsrolApp'
.controller 'NavbarCtrl', ($scope, $location, Auth) ->
  $scope.menu = [{
    title: 'Home'
    link: '/'
  },{
    title: 'Évènements',
    link: '/admin/events'
  }
  ]
  $scope.isCollapsed = true
  $scope.isLoggedIn = Auth.isLoggedIn
  $scope.isAdmin = Auth.isAdmin
  $scope.getCurrentUser = Auth.getCurrentUser

  $scope.logout = ->
    Auth.logout()
    $location.path '/login'

  $scope.isActive = (route) ->
    route is $location.path()