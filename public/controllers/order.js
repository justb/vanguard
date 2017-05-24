var myapp=require('../app.js');
myapp.controller('OrderCtrl',function($http,$scope,$rootScope, $state) {
            $scope.order={};
            $scope.order.baseinfo={};
            $scope.order.ui='';
            $scope.order.frontend='';
            $scope.order.backend='';
            $scope.uis=[{id:1,name:'bootstrap',display:'Bootstrap'},{id:2,name:'flatui',display:'Flat UI'}];
            $scope.frontends=[{id:1,name:'angular',display:'AngularJs'},{id:2,name:'vue',display:'Vue'},{id:3,name:'react',display:'React'}];
            $scope.backends=[{id:1,name:'express',display:'Express'},{id:2,name:'koa',display:'Koa.js'}];
            
            $scope.disabled=false;
            $scope.submit=function(){
                if($scope.order.baseinfo.name&&$scope.order.baseinfo.description&&$scope.order.baseinfo.author&&$scope.order.ui&&
                $scope.order.frontend&&$scope.order.backend){

                }else{
                    $('#SubmitSuccess').modal('show');
                    return;
                }
                $scope.order.createtime=new Date();
                console.log($scope.order);
                $('#submit').attr("disabled","disabled");
                NProgress.start();
                $http({
                    method: 'post',
                    url: 'generate/download',
                    data: {
                        order:$scope.order
                    }
                }).success(function(data, status, headers, config) {
                    NProgress.done();
                    setTimeout(function(){
                         $('#submit').removeAttr("disabled"); 
                    },1000);
                   
                    // $http({
                    //     method: 'POST',
                    //     url: 'http://localhost:8000/generate/',
                    //     data: {
                    //         order:$scope.order
                    //     }
                    // }).success(function(data, status, headers, config) {
                        
                    // }).error(function(data, status, headers, config) {
                        
                    // });
                    // $('#SubmitSuccess').modal('show');
                    // console.log(data, status, headers, config);
                    // var a=document.createElement('a');
                    // a.href=data.substring(1,data.length-1);
                    // document.body.appendChild(a);
                    // a.click();
                    // document.body.removeChild(a);
                    // window.open(data.substring(1,data.length-1));
                    // window.open('generate/download/'+id);
                    var iframe = document.createElement('iframe');
                    iframe.src = data.substring(1,data.length-1);
                    iframe.style.display = "none";
                    document.body.appendChild(iframe);
                }).error(function(data, status, headers, config) {
                    
                });
        
                 
            }
            
           
        
    
})