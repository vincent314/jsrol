'use strict'

describe 'Directive: loopDirective', ->

# load the directive's module and view
  beforeEach module 'jsrolApp'
  beforeEach module 'app/loopDirective/loopDirective.html'
  element = undefined
  scope = undefined
  beforeEach inject ($rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    _.extend scope,
      {
        label: 'LABEL'
        loop: '1'
      }
    element = angular.element '<loop-directive label="label" loop="loop" ></loop-directive>'
    element = $compile(element) scope
    scope.$apply()
    expect(element.text()).toBe 'LABEL'

