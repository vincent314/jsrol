'use strict'

class MapCtrl
  constructor: (leafletData, $stateParams, @$state)->
    @maxZoom = 14
    @path =
      weight: 10
      color: '#800000'
      opacity: 1
    @center =
      lat: 50.62925
      lng: 3.057256
      zoom: 8

    leafletData.getMap().then (map)->
      kmlLayer = omnivore.kml("/api/tracks/#{$stateParams.l}/kml").addTo(map)
      kmlLayer.on 'ready', ->
        map.fitBounds kmlLayer.getBounds()

  backToEvents: ()->
    @$state.go 'events'

MapCtrl.$inject = ['leafletData', '$stateParams', '$state']
angular.module 'jsrolApp'
.controller 'MapCtrl', MapCtrl
