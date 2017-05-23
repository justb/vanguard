var myapp=require('../app.js');
myapp.controller('MyorderDetailCtrl',function($http,$scope,$stateParams, $state) {
    $scope.lll=[{"id":1,"name":"superagent","version":[{"id":1,"name":"superagent","version":[1,2,3]},{"id":1,"name":"superagent","version":[1,2,3]},{"id":1,"name":"superagent","version":[1,2,3]}]},
    {"id":2,"name":"async","version":[{"id":1,"name":"superagent","version":[1,2,3]},{"id":1,"name":"superagent","version":[1,2,3]},{"id":1,"name":"superagent","version":[1,2,3]}]},
    {"id":3,"name":"eventproxy","version":[{"id":1,"name":"superagent","version":[1,2,3]},{"id":1,"name":"superagent","version":[1,2,3]},{"id":1,"name":"superagent","version":[1,2,3]}]},
    {"id":4,"name":"mysql","version":[{"id":1,"name":"superagent","version":[1,2,3]},{"id":1,"name":"superagent","version":[1,2,3]},{"id":1,"name":"superagent","version":[1,2,3]}]}];
    $scope.showComponent=0;
    $scope.count=[];
    $scope.order={};
    $scope.order.module=[];
    $scope.order.component=[];
    $scope.order.baseinfo={};
    $scope.order.framework={};
    $scope.order.template={};
    $scope.settings={
        displayProp: 'name', 
        idProp: 'name',
        buttonDefaultText:"Select Modules"
    };
    $scope.backends=[{"name":"Kraken"},{"name":"Express"}];
    $scope.frontends=[{"name":"angular"}];
    $scope.templates=[{"name":"Acxiom Style"},{"name":"Vanguard Style"}];
    $http({
        method: 'GET',
        url: 'module/',
        data: {
        }
    }).success(function(data, status, headers, config) {
        $scope.modules=data;
        data.forEach(function(v,i){
            $scope.modules[i].version=v.version.split(",");
        });
        console.log($scope.modules);
    }).error(function(data, status, headers, config) {
        
    });
    $http({
        method: 'GET',
        url: 'component/',
        data: {
        }
    }).success(function(data, status, headers, config) {
        $scope.components=data;
        data.forEach(function(v,i){
            $scope.components[i].version=v.version.split(",");
            
        })
        console.log($scope.components);
    }).error(function(data, status, headers, config) {
        
    });
    console.log($stateParams.id);
    $http({
            method: 'GET',
            url: 'order/'+$stateParams.id
        }).success(function(data, status, headers, config) {
            console.log(data[0]);
            $scope.order.baseinfo=JSON.parse(data[0].baseinfo);
            $scope.order.module=JSON.parse(data[0].modules);
            $scope.order.component=JSON.parse(data[0].component);
            $scope.order.template.name=data[0].template;
            $scope.order.framework.name=data[0].framework;
            
        }).error(function(data, status, headers, config) {
            
        });
    $scope.addComponent=function(c,v){
        var flag=0
        $scope.order.component.forEach(function(value,index){
            if(value.name==c.name){
                value.version=v;
                flag=1;
            }
        });
        if(flag==0){
            $scope.order.component.push({'name':c.name,'version':v});
        }
        
    }
    $scope.deleteComponent=function(i){
        $scope.order.component.splice(i,1);
    }
    $scope.addModule=function(m,v){
        var flag=0
        $scope.order.module.forEach(function(value,index){
            if(value.name==m.name){
                value.version=v;
                flag=1;
            }
        });
        if(flag==0){
            $scope.order.module.push({'name':m.name,'version':v});
        }
        
    }
    $scope.deleteModule=function(i){
        $scope.order.module.splice(i,1);
    }
    $scope.deleteC=function(c){
        $scope.order.component.forEach(function(value,index){
            if(value.name==c.name){
                $scope.order.component.splice(index,1);
            }
        });
    }
    $scope.isSelected=function(c){
        var flag=0
        $scope.order.component.forEach(function(value,index){
            if(value.name==c.name){
                flag=1;
            }
        })
        if(flag){
            return true;
        }
    }
    $scope.isSelectedVersion=function(c,v){
        var flag=0
        $scope.order.component.forEach(function(value,index){
            if(value.name==c.name){
                if(value.version==v){
                    flag=1;
                }
            }
        })
        if(flag){
            return true;
        }
    }
    $scope.save=function(){
        console.log($scope.order);
        $http({
            method: 'post',
            url: 'order/update',
            data: {
                id:$stateParams.id,
                order:$scope.order
            }
        }).success(function(data, status, headers, config) {
            console.log("chenggong");
        }).error(function(data, status, headers, config) {
            
        });
    }
})