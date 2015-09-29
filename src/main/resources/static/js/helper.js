angular.module('mainApp')
       .controller('HelperController', function($scope, $http, $modal, $location, $filter,
                                                userService, profileService, storeService){

            $scope.hasErrors = false;
            $scope.message = "Testing scope";
            $scope.error = {};
            $scope.callForm = false;
            $scope.opened = false;
            $scope.validNewArea = true;
            $scope.user = {};
            $scope.users = [];
            $scope.openProfile = null;
            $scope.idUser = userService.user.idUser;

            $scope.knowledges = [];

            if(storeService.users){
                 $scope.users = storeService.users;
                 $scope.search = storeService.search;
            }else{
                $scope.search = "";
                $scope.users = [];
            }
            $scope.image = "study.jpg";

            $scope.helpWrapper = {
                user: userService.user,
                searchTerms: [],
                text:""
            };

            $scope.response = {};

            $scope.clear = function clear(){
                $scope.error = {};
                $scope.callForm = false;
                $scope.opened = false;

                $scope.user = {};
                $scope.users = [];
            }

            $scope.openProfile = function openProfile(user){

                var url = "resource/user/"+user.id+"/profile";
                $scope.url = url;
                $http.get(url)
                .success(function(data) {
                     $scope.requestHelp = data;
                     $scope.users = data;
                  })
                 .error(function(data) {
                    $scope.hasErrors = true;
                    $scope.error = data;

                   //ABRE MODAL DO PROFILE, DEVE IR PARA A PARTE DE SUCESSO DEPOIS
                    profileService.user = user;

                    var modalInstance = $modal.open({
                    templateUrl: 'views/profile.html'})

                  });

                  return null;
            }
       });
