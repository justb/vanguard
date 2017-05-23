var myapp=angular.module('vanguard', [ 'ui.utils', 'ui.router', 'angularjs-dropdown-multiselect', 'ngAnimate']);
myapp.config(function($stateProvider,$urlRouterProvider){
    $stateProvider
        .state('index', {
            url: "/index",
            
            views:{
                'title':{
                    templateUrl: '/app/carousel.html',
                },
                'content':{
                    templateUrl: '/app/index.html',
                }
            }
        })
        .state('order', {
            url: "/order",
            views:{
                'content':{
                    templateUrl: '/app/order.html',
                }
            }
        })
        .state('login', {
            url: "/login",
            views:{
                'content':{
                    templateUrl: '/app/login.html',
                }
            }
        })
        .state('myorder', {
            url: "/myorder",
            views:{
                'content':{
                    templateUrl: '/app/myorder.html',
                }
            }
        })
        .state('detail', {
            url: "/myorder/:id",
            views:{
                'content':{
                    templateUrl: '/app/myorder_detail.html',
                }
            }
        })
        $urlRouterProvider.otherwise('/index');
})
myapp.run(function($rootScope,$http,$state) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
        // $rootScope.isActive= [1,0,0,0];
        // $scope.isClick=function(id){
        //     $scope.isActive.forEach(function(v,i){
        //         $scope.isActive[i]=0;
        //     });
        //     $scope.isActive[id]=1;
        // }
        console.log(toState)
        if(toState.name=='login'){// 如果是进入登录界面则允许
           $rootScope.isActive= [0,0,1,0];
        }
        if(toState.name=='order'){// 如果是进入登录界面则允许
           $rootScope.isActive= [0,1,0,0];
        }
        if(toState.url.substr(1,7)=='myorder'){// 如果是进入登录界面则允许
           $rootScope.isActive= [0,0,0,1];
        }
        if(toState.name=='index'){// 如果是进入登录界面则允许
           $rootScope.isActive= [1,0,0,0];
        }
        
        // // 如果用户不存在
        // if($rootScope.user){

        //     $http({
        //         method: 'POST',
        //         url: 'http://localhost:8000/user/isLogin/',
        //         data: {
        //             user:$rootScope.user
        //         }
        //     }).success(function(data, status, headers, config) {
        //         console.log(data);
        //         if(data){
                        
        //         }else{
        //             event.preventDefault();// 取消默认跳转行为
        //             $state.go("login",{from:fromState.name,w:'notLogin'});//跳转到登录界面
        //         }
        //     }).error(function(data, status, headers, config) {
                
        //     });
            
            
        // }else{
        //     event.preventDefault();// 取消默认跳转行为
        //     $state.go("login",{from:fromState.name,w:'notLogin'});//跳转到登录界面
        // }
    });

    // $rootScope.$on('$viewContentLoading',function(event, viewConfig){
    //     console.log(123);
    // });

});

module.exports=myapp;
