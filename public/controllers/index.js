var myapp=require('../app.js');
myapp.controller('IndexCtrl',function($http,$scope,$rootScope, $state,$location) {
    $scope.submit=function(){
        if($scope.template==undefined){
            $scope.template=true;
        }
        if($scope.description&&$scope.author){
            $('#submit').addClass('disabled');
            setTimeout(function(){
                $('#submit').removeClass('disabled');
            },2000)
            $http({
                method: 'POST',
                url: 'generate/',
                data: {
                "description": $scope.description,
                "author": $scope.author,
                "template":$scope.template
                }
            }).success(function(data, status, headers, config) {
                console.log(data);
                if(data=='"success"'){
                    $("#download").remove();
                    $('body').append('<a id="download" href="../vanguard.zip"></a>');
                    if(document.all) {
                        document.getElementById("download").click();
                    }
                    // 其它浏览器
                    else {
                        var e = document.createEvent("MouseEvents");
                        e.initEvent("click", true, true);
                        document.getElementById("download").dispatchEvent(e);
                    }
                }
            }).error(function(data, status, headers, config) {
                
            });
            // setTimeout(function() {
            //     // IE
            //     if(document.all) {
            //         document.getElementById("download").click();
            //     }
            //     // 其它浏览器
            //     else {
            //         var e = document.createEvent("MouseEvents");
            //         e.initEvent("click", true, true);
            //         document.getElementById("download").dispatchEvent(e);
            //     }
            // }, 1000); 
        }else{
            alert("Please fill in your base info.");
        }
        
    }
})