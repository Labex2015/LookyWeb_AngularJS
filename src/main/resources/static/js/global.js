angular.module('mainApp')
       .controller('globalController', function($scope, $http, $modal, $modalInstance, interaction, profileRequest, profileHelper, userService){

        $scope.askGlobal = interaction.user;
        $scope.globalHelp = [];

        $scope.cancel = function(){
            $modalInstance.dismiss('cancel');
        };

        $scope.editAskGlobal = function(){

            $modalInstance.close($scope);
            var modalInstance = $modal.open({
                templateUrl: '../views/editAskGlobal.html',
                controller: 'globalController',
            });
        }


        $scope.sendAskGlobal = function() {

            if ($scope.userForm.$valid) {

                $scope.title = document.getElementById('title').value;
                $scope.message = document.getElementById('message').value;

                var interactionGlobal = {idUser:userService.user.idUser,
                                        idRequestHelp:0,
                                        title:$scope.title,
                                        description:$scope.message,
                                        params:"Solicitacao de ajuda"};

                 console.log(interactionGlobal);

                $http.post('resource/user/request_help/global', interactionGlobal)
                    .success(function(data, status, headers, config) {
                        $scope.message = data;
                        $modalInstance.close($scope);
                      })
                    .error(function(data, status, headers, config) {
                        $scope.hasErrors = true;
                        $scope.error = data;

                })
            };
        };

});