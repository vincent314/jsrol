'use strict'

class EventsCtrl

  constructor: (@$scope, Event, DTOptionsBuilder, DTColumnBuilder) ->
    @detailRows = []

    @$scope.dtOptions = DTOptionsBuilder.fromFnPromise ()->
      Event.query(
        {
          fromDate: moment().format(),
        }
      )
      .$promise
    .withOption('paging', false)
    .withOption('searching', false)
    .withOption('rowCallback', _.bind(@rowCallback,@))
    .withBootstrap()

    @$scope.dtColumns = [
      DTColumnBuilder.newColumn('dateTime').withTitle('DATE')
      DTColumnBuilder.newColumn('name').withTitle('NOM')
      DTColumnBuilder.newColumn('type').withTitle('TYPE').withOption('defaultContent', '')
    ]

#
# format event details
#
  format: (d)-> d.description || ''

#
# Build callback
# Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
#
  rowCallback: (nRow, aData, iDisplayIndex, iDisplayIndexFull) ->
    self = @
    dt = $('#eventsTable').DataTable()
    $('td', nRow).unbind('click')
    $('td', nRow).bind 'click', () ->
      self.$scope.$apply ()->
        self.clickHandler($(nRow), aData)
    return nRow

#
# client event : Show or Display event details
#
  clickHandler: (tr, data)->
    dt = $('#eventsTable').DataTable()
    row = dt.row tr
    idx = $.inArray tr.attr('id'), @detailRows

    if row.child.isShown()
      tr.removeClass 'details'
      row.child.hide()
      #      Remove from the 'open' array
      @detailRows.splice idx, 1
    else
      tr.addClass 'details'
      row.child(this.format(data)).show()

    #    Add to the 'open' array
    if idx == -1
      @detailRows.push tr.attr('id')

#
# Register Controler in Angular
#
EventsCtrl.$inject = ['$scope', 'Event', 'DTOptionsBuilder', 'DTColumnBuilder', '$sce']
angular.module 'jsrolApp'
.controller 'EventsCtrl', EventsCtrl

