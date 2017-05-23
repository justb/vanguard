var myapp=require('../app.js');
myapp.directive('mydropdown', function() {
  return {
    restrict: 'E',
    scope: {
      list: '=',
      selected: '='
    },
    templateUrl:'directives/dropdown.html',
    controller: function($rootScope,$scope) {
        $scope.addComponent=function(c,v){
            var flag=0
            $scope.selected.forEach(function(value,index){
                if(value.name==c.name){
                    if(value.version==v){
                        $scope.selected.splice(index,1);
                    }
                    value.version=v;
                    flag=1;
                }
            });
            if(flag==0){
                $scope.selected.push({'name':c.name,'version':v});
            }
            
        }
        $scope.deleteComponent=function(i){
            $scope.selected.splice(i,1);
        }
        $scope.deleteC=function(c){
            $scope.selected.forEach(function(value,index){
                if(value.name==c.name){
                    $scope.selected.splice(index,1);
                }
            });
        }
        $scope.isSelected=function(c){
            var flag=0
            $scope.selected.forEach(function(value,index){
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
            $scope.selected.forEach(function(value,index){
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
    }
  };
});