'use strict'

describe 'Service: Track', ->

# load the service's module
  beforeEach module 'jsrolApp'

  # instantiate service
  Track = undefined
  beforeEach inject (_Track_) ->
    Track = _Track_

  it 'should do something', ->
    expect(!!Track).toBe true
