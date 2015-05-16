describe 'Test AdminEventListCtrl', ->

#  ------------ Event list Mock -----------------
  mockEventList = [{
    "name": "RFN",
    "dateTime": "2013-06-27T22:00:00.000Z",
    "type": "LRFN",
    "loop1": "5193f31484ae096d60cb91be",
    "_id": "55577b53150ddb222f188527",
    "__v": 0
  },
    {
      "feedId": "http://www.google.com/calendar/feeds/94u7im1kq3ck9mn2j12vd8sc5k%40group.calendar.google.com/public/full/itm5vhdfeniokk8gceg113tkn0",
      "name": "ROL Parade",
      "dateTime": "2013-07-07T00:00:00.000Z",
      "type": "ROL_PARADE",
      "loop1": "5193f31b84ae096d60cb91c8",
      "loop2": "5193f31c84ae096d60cb91cc",
      "description": "1e boucle : Lille\n2e boucle : Lille, Loos",
      "_id": "55577b53150ddb222f188521",
      "__v": 0
    },
    {
      "feedId": "http://www.google.com/calendar/feeds/94u7im1kq3ck9mn2j12vd8sc5k%40group.calendar.google.com/public/full/n1pnpfvhnbaaq9tqb5r289nt7o_20130712T184500Z",
      "name": "RFN",
      "dateTime": "2013-07-12T18:45:00.000Z",
      "type": "LRFN",
      "loop1": "5193f30384ae096d60cb91a3",
      "loop2": "5193f31084ae096d60cb91b8",
      "description": "1e boucle : Lille, Lambersart, St André Lez Lille, La Madeleine, Lille\n2e boucle : Lille, La Madeleine, Marquette Lez Lille, St André Lez Lille, Lambersart, Lille",
      "_id": "55577b53150ddb222f188522",
      "__v": 0
    },
  ]

  $rootScope=undefined
  $httpBackend=undefined
  $controller = undefined
  $log = undefined

  beforeEach module 'jsrolApp'
  beforeEach inject (_$controller_, _$rootScope_, _$httpBackend_,_$log_)->
    $controller = _$controller_
    $httpBackend = _$httpBackend_
    $rootScope = _$rootScope_
    $log = _$log_


  it 'Should list all events', ()->
#    Mock list of events from REST api
    $httpBackend.whenGET('/api/events').respond mockEventList
    waits(0)

    scope = $rootScope.$new()
    AdminEventListCtrl = $controller 'AdminEventListCtrl',
      $scope: scope

    $httpBackend.flush()
    expect(scope.events.length).toBe 3