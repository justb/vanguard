var myapp=require('../app.js');
myapp.controller('OrderCtrl',function($http,$scope,$rootScope, $state) {
            $scope.showComponent=0;
            $scope.count=[];
            $scope.order={};
            $scope.order.component=[];
            $scope.order.module=[];
            $scope.order.baseinfo={};
            $scope.settings={
                displayProp: 'name', 
                idProp: 'name',
                buttonDefaultText:"Select Modules"
            };
            $scope.frameworks=[{"name":"Kraken"}];
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
                })
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
                    console.log($scope.components[i]);
                })
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
            $scope.isSelected=function(c,v){
                $scope.order.component.forEach(function(value,index){
                    if(value==c){
                        return true;
                    }
                })
            }
            $scope.submit=function(){

                console.log($scope.order);
                if($rootScope.user){
                        $http({
                            method: 'post',
                            url: 'order/add',
                            data: {
                                order:$scope.order
                            }
                        }).success(function(data, status, headers, config) {
                            // $http({
                            //     method: 'POST',
                            //     url: 'http://localhost:8000/generate/',
                            //     data: {
                            //         order:$scope.order
                            //     }
                            // }).success(function(data, status, headers, config) {
                                
                            // }).error(function(data, status, headers, config) {
                                
                            // });
                            $('#SubmitSuccess').modal('show');
                        }).error(function(data, status, headers, config) {
                            
                        });
                }else{
                    $('#myModal').modal('show');
                }
                 
            }
            $scope.toLogin=function(){
                $('#myModal').modal('hide');
                 $state.go('login', null, {
                        reload: true
                    });
            }
           
        
    
})