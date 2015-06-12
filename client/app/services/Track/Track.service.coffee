'use strict'

angular.module 'jsrolApp'
.service 'Track', ($resource)->
  return $resource '/api/tracks/:id', {
    id: '@id'
  }
