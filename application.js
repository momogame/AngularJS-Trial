angular.module('todo', [])
    .controller('page', ['$scope', 'todoApi',
        function ($s, todoApi) {
            var uiCurrent = 1;

            $s.tabs = [{
                tabName: 'shopping',
                number: 1
            }, {
                tabName: 'bussiness',
                number: 2
            
            }];
            $s.thisTab;


            $s.ui = {
                current: function (newUICurrent) {
                    if (typeof newUICurrent != 'undefined') {
                        uiCurrent = newUICurrent;
                    }
                    return uiCurrent;
                },
                isCurrent: function (c) {
                    return (uiCurrent === c);
                }
            };

            $s.dataMock = todoApi.query();

    }])
    .controller('tab1', ['$scope',
        function ($s) {
            $s.list = [{
                name: 'buy eggs',
                complete: false
            }, {
                name: 'buy milk',
                complete: true
            }];

            $s.itemMoved = '--Please selece--';


            $s.addMemo = function (list) {
                list.push($s.inputData);
                $s.inputData = {
                    name: '',
                    complete: false
                };

            };

            $s.transfer = function (list, item) {
                //list.pop();
                console.log(item);
                for(var i = 0; i < $s.list.length; i++) {
                    if($s.list[i].name == item.name) {
                        console.log('i found it ' + i);
                        list.splice(i,1);
                    }
                   //console.log(list[i].name);
                }
               
            };

    }])
    .controller('tab2', ['$scope',
        function ($s) {
        $s.list = [{
            name: 'collect underpants',
            complete: false
        }, {
            name: '...',
            complete: false
        }, {
            name: 'profit',
            complete: false
        }];
    }])
    .factory('todoApi', [function () {
    var data = [
        {
            list: 'shopping',
            name: 'buy eggs',
            complete: false
        },
        {
            list: 'shopping',
            name: 'buy milk',
            complete: true
        },
        {
            list: 'business',
            name: 'collect underpants',
            complete: false
        },
        {
            list: 'business',
            name: '...',
            complete: false
        },
        {
            list: 'business',
            name: 'profit',
            complete: false
        }
    ];
    return {
        query: function () {
            return data;
        },
        get: function (id) {
            return data[id];
        },
        create: function(obj) {
            data.push(obj);
            return obj;
        },
        update: function(id, obj) {
            data[id] = obj;
            return obj;
        },
        destroy: function(id) {
            data.splice(id, 1);
            return data;
        }
    };
}]);
