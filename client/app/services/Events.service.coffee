'use strict'

angular.module 'jsrolApp'
.factory 'Events', ($mongolabResourceHttp)->
  $mongolabResourceHttp('events')


