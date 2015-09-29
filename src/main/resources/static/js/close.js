angular.module('mainApp')
       .controller('closeController', function($scope, $http, $modal, $modalInstance, profileRequest){

        $scope.request = profileRequest.user;

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.confirm = function(){

            console.log("Enviar mensagem para "+$scope.request.requested+" com id: "+$scope.request.idRequested+" que foi finalizada sua interação");
            console.log("Sala: "+$scope.request.chatRoom);
            $scope.removeFromInteractions(profileRequest.user);

            $modalInstance.close($scope);
        }

        $scope.removeFromInteractions = function removeFromInteractions(interaction){

              var counter = 0;
              for(; counter < $scope.interactionsUserIsHelper.length; ){
                  if($scope.interactionsUserIsHelper[counter].id === interaction.id){
                      $scope.interactionsUserIsHelper.splice(counter, 1);
                      break;
                  }
                  counter++;
              }
          }

       });
