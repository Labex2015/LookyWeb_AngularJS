angular.module('mainApp')
       .controller('GlobalHelpController', function($scope, $http, $location){

        $scope.globalHelp = [];
        $scope.globalAsk = {};

        $http.get('resource/request_help/global')
               .success(function(data, status, headers, config) {
                    $scope.globalHelp = data;
                })
               .error(function(data, status, headers, config) {
                    $scope.hasErrors = true;
                    $scope.error = data;
               });


});