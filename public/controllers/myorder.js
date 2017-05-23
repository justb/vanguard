var myapp=require('../app.js');
myapp.controller('MyorderCtrl',function($http,$scope,$rootScope, $state,$location) {
    $http({
            method: 'POST',
            url: 'order/get/',
            data: {
                user:$rootScope.user?$rootScope.user:{}
            }
        }).success(function(data, status, headers, config) {
            console.log(data);
            if(data){
                data.forEach(function(item){
                    item.baseinfo=JSON.parse(item.baseinfo);
                    item.component=JSON.parse(item.component);
                    item.modules=JSON.parse(item.modules);
                })
                $scope.order=data;
                
            }else{

            }
        }).error(function(data, status, headers, config) {
            
        });
    $scope.detail=function(id){
        $state.go(
            'detail',{'id':id}, {
                        reload: true
                    }
        )
    }
    $scope.cancel=function(id){
        $http({
            method: 'POST',
            url: 'order/delete/',
            data: {
                id:id
            }
        }).success(function(data, status, headers, config) {
            $state.go(
            'myorder',{}, {
                        reload: true
                    }
            )
            
        }).error(function(data, status, headers, config) {
            
        });
    }
    $scope.download=function(id){
        
            window.open('generate/download/'+id);
        // var iframe = document.createElement('iframe');
        // iframe.src = 'generate/download/'+id;
        // iframe.style.display = "none";
        // document.body.appendChild(iframe);


    }
})