'use strict'

angular.module 'jsrolApp'
.factory 'Event', ($resource)->
  return $resource '/api/events/:id',{
    id:'@id'
  }


