'use strict'

angular.module 'jsrolApp'
.controller 'EventsCtrl', ($scope, Event, DTOptionsBuilder, DTColumnBuilder, DTInstances) ->
  self = this
  detailRows = []

  #
  # client event : Show or Display event details
  #
  self.clickHandler = (tr, data)->
    dt = $('#eventsTable').DataTable()
    row = dt.row tr
    idx = $.inArray tr.attr('id'), detailRows

    if row.child.isShown()
      tr.removeClass 'details'
      row.child.hide()
      #      Remove from the 'open' array
      detailRows.splice idx, 1
    else
      tr.addClass 'details'
      row.child(format(data)).show()

    #    Add to the 'open' array
    if idx == -1
      detailRows.push tr.attr('id')

  #
  # format event details
  #
  format = (d)-> d.description || ''

  #
  # Build callback
  #
  rowCallback = (nRow, aData, iDisplayIndex, iDisplayIndexFull) ->
#    Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
    dt = $('#eventsTable').DataTable()
    $('td', nRow).unbind('click')
    $('td', nRow).bind 'click', () ->
      $scope.$apply ()->
        self.clickHandler($(nRow), aData)
    return nRow

  $scope.dtOptions = DTOptionsBuilder.fromFnPromise ()->
    Event.query().$promise
  .withOption('paging', false)
  .withOption('searching', false)
  .withOption('rowCallback', rowCallback)
  .withBootstrap()

  $scope.dtColumns = [
    DTColumnBuilder.newColumn('dateTime').withTitle('DATE')
    DTColumnBuilder.newColumn('name').withTitle('NOM')
    DTColumnBuilder.newColumn('type').withTitle('TYPE').withOption('defaultContent', '')
  ]

