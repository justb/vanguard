var myapp=require('../app.js');
myapp.controller('LoginCtrl',function($http,$scope,$rootScope, $state,$location) {
    $scope.login=function(){
        $http({
                method: 'POST',
                url: 'user/login/',
                data: {
                    "name": $scope.username,
                    "password": $scope.password,
                }
            }).success(function(data, status, headers, config) {
                if(data){
                    console.log(data);
                    $rootScope.user=data;
                    $state.go('index', null, {
                        reload: true
                    });
                }
            }).error(function(data, status, headers, config) {
                
            });
    }
    
        
    
})