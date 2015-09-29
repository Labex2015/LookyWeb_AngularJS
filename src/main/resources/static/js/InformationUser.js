var mainApp = angular.module('mainApp')

       mainApp.controller('InformationUserController', function($scope, $http, $modal, userService){

            $scope.user = userService.user;

       });


