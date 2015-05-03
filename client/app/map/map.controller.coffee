'use strict'

class MapCtrl
  constructor: ($scope, leafletData)->
    angular.extend $scope, {
      maxZoom: 14,
      path: {
        weight: 10,
        color: '#800000',
        opacity: 1
      }
    }
    angular.extend $scope, {
      center: {
        lat: 51.505,
        lng: -0.09,
        zoom: 8
      }
    }

    leafletData.getMap().then (map)->
      kmlLayer = omnivore.kml('/api/tracks/5544e9df809b526f05b743af/kml').addTo(map)
      kmlLayer.on 'ready', ->
        map.fitBounds kmlLayer.getBounds()

MapCtrl.$inject = ['$scope','leafletData']
angular.module 'jsrolApp'
.controller 'MapCtrl', MapCtrl
