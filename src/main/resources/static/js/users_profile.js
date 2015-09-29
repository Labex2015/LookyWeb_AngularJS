angular.module('mainApp')
       .controller('ProfileController', function($scope, $http, $modal, $location, $filter, userService, profileService){

            $scope.hasErrors = false;
            $scope.message = "Testing scope";
            $scope.error = {};
            $scope.callForm = false;
            $scope.opened = false;
            $scope.validNewArea = true;

            $scope.userChatRoom = profileService;

            $scope.image = "study.jpg";

            $scope.requestHelp = function requestHelp(id){
                var url = 'resource/user/'+userService.user.idUser+'/request/'+$scope.user.idUser;
                var  verify = confirm("Solicitar ajuda?");
                if(verify == true){
                    $http.get(url)
                    .success(function(data, status, headers,config){
                        $scope.response = data;
                        alert($scope.response.message);
                    }).error(function(data, status, headers,config){
                        $scope.users = [];
                        $scope.error = data;
                        $scope.hasErrors = true;
                    });
                }
            }

       });
