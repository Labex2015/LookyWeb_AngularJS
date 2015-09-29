angular.module('mainApp')
       .controller('UserController', function($scope, $http, $modal, $location, $filter, userService){

            $scope.user = [];
            $scope.error = true;

            /*$http.get('http://192.168.1.102:8793/user/'+userService.user.idUser+'/profile')
                .success(function(data, status, headers, config){
                    $scope.user = data;
                })
                .error(function(data, status, headers, config){
                    $scope.error = data;
                })*/
       });
