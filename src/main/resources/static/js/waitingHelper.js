angular.module('mainApp')
       .controller('WaitingHelperController', function($scope, $http, userService){

       $scope.waitingHelper = [];

       $http.get('resource/user/'+userService.user.idUser+'/interactions/pending)
            .success(function(data, status){
                $scope.waitingHelper = data;
            })
            .error(function(data, status){
                $scope.message = data;
                $scope.status = this.status;
            });

       $scope.acceptHelp = function acceptHelp(userWaitingHelper){
            console.log(userWaitingHelper);
       }
})


