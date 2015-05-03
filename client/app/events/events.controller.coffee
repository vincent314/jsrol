'use strict'

class EventsCtrl

  constructor: (@$scope, @$compile, @$rootScope, Event, DTOptionsBuilder, DTColumnBuilder) ->
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
    .withOption('rowCallback', _.bind(@rowCallback, @))
    .withBootstrap()

    @$scope.dtColumns = [
      DTColumnBuilder.newColumn('dateTime').withTitle('DATE')
      DTColumnBuilder.newColumn('name').withTitle('NOM')
      DTColumnBuilder.newColumn('type').withTitle('TYPE').withOption('defaultContent', '')
      DTColumnBuilder.newColumn('loop1').withTitle('BOUCLES').withOption('defaultContent', '').renderWith _.bind(@renderLoops,@)
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


  renderLoop: (l,idx)->
    scope = @$rootScope.$new()
    _.extend scope,
      {
        label:idx,
        loop:l
      }
    console.log l
    element = @$compile('<loop-directive label="label" loop="loop"></loop-directive>')(scope)
    scope.$digest()
    return element.html()

  renderLoops: (data,type,full)->
    self = @
    loops = []
    if full.loop1 then loops.push full.loop1
    if full.loop2 then loops.push full.loop2
    if full.loop3 then loops.push full.loop3
    content = _(loops).map (l,idx)->
      self.renderLoop l,idx
    .join(' ')
    return "<div>#{content}</div>"

#
# Register Controler in Angular
#
EventsCtrl.$inject = ['$scope', '$compile', '$rootScope', 'Event', 'DTOptionsBuilder', 'DTColumnBuilder']
angular.module 'jsrolApp'
.controller 'EventsCtrl', EventsCtrl

