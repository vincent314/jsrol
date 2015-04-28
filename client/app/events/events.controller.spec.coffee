'use strict'

ddescribe 'Controller: EventsCtrl', ->

# load the controller's module
  beforeEach module 'jsrolApp'
  EventsCtrl = undefined
  scope = undefined
  dtOptions = undefined

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope, DTOptionsBuilder, DTColumnBuilder, Event) ->
    dtOptions = jasmine.createSpyObj 'dtOptions', ['withOption', 'withBootstrap']
    dtOptions.withOption.andReturn dtOptions
    dtOptions.withBootstrap.andReturn dtOptions
    spyOn(DTOptionsBuilder, 'fromFnPromise').andReturn dtOptions

    scope = $rootScope.$new()
    EventsCtrl = $controller 'EventsCtrl',
      $scope: scope

  it 'should configure DataTables', ->
    expect(dtOptions.withOption.callCount).toBe(3)
    expect(dtOptions.withBootstrap.callCount).toBe(1)
    expect(scope.dtColumns.length).toBe(3)
    expect(_.pick(scope.dtColumns[0],['mData','sTitle'])).toEqual {mData: 'dateTime', sTitle: 'DATE'}
    expect(_.pick(scope.dtColumns[1],['mData','sTitle'])).toEqual {mData: 'name', sTitle: 'NOM'}
    expect(_.pick(scope.dtColumns[2],['mData','sTitle'])).toEqual {mData: 'type', sTitle: 'TYPE'}

  it 'should bind click event', ->
    spyOn($.fn,'DataTable').andReturn 'blah'
    spyOn($.fn,'unbind').andCallThrough()
    spyOn($.fn,'bind').andCallThrough()

    EventsCtrl.rowCallback()

    expect($('#toto','titi').DataTable()).toBe 'blah'
    expect($.fn.unbind).toHaveBeenCalledWith 'click'
    expect($.fn.bind).toHaveBeenCalledWith 'click', jasmine.any(Function)
