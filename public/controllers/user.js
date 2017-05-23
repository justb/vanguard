var myapp=require('../app.js');
myapp.controller('UserCtrl',function($http,$scope,$rootScope, $state,$location) {
    $http({
            method: 'GET',
            url: 'user/session/',
        }).success(function(data, status, headers, config) {
            if(data){
                console.log(data);
                $rootScope.user=data;

            }
        }).error(function(data, status, headers, config) {
            
        });
    $scope.logout=function(){
        $http({
            method: 'GET',
            url: 'user/logout/',
        }).success(function(data, status, headers, config) {
            $rootScope.user=null;
             $state.go('index', null, {
                        reload: true
                    });
        }).error(function(data, status, headers, config) {
            
        });
    } 
    
})