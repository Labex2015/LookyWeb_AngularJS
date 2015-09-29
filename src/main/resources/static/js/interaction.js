var mainApp = angular.module('mainApp')

        mainApp.controller('InteractionsController', function($scope, $http, $modal, $location, $filter,
                                                userService, interaction, profileService, countInteractionsPending, profileHelper, ratingHelper, profileRequest){

            $scope.hasErrors = false;
            $scope.message = "Testing scope";
            $scope.error = {};

            $scope.user = userService.user;
            $scope.idUser = userService.user.idUser;

            $scope.interactions = [];
            $scope.interactionsUserIsHelper = [];
            $scope.interactionsUserIsRequested = [];
            $scope.interaction = {};
            $scope.interactionsPendingUserRequester = [];
            $scope.interactionsPendingUserHelper = [];

            $scope.loader = {
                loading : false
            };

            $scope.registerWindow = function(userInteraction){
                 interaction.chat = userInteraction;
                 window.location.href = "#/chat.html";
                 $(".chatscreen").empty();
                 console.log(interaction.chat);
            }

            $scope.userInteractions = function userInteractions(){
                $http.get('resource/user/'+$scope.user.idUser+'/interactions')
                    .success(function(data, status, headers, config) {
                            $scope.interactions = data;
                            for(var i = 0; i < $scope.interactions.length; i++){
                                if($scope.interactions[i].requestHelp.helper.id == $scope.idUser){
                                    $scope.interactionsUserIsHelper.push($scope.interactions[i]);
                                }
                            }

                            for(var i = 0; i < $scope.interactions.length; i++){
                                if($scope.interactions[i].requestHelp.requester.id == $scope.idUser){
                                    $scope.interactionsUserIsRequested.push($scope.interactions[i]);
                                }
                            }
                           $scope.loader.loading = true;
                      })
                    .error(function(data, status, headers, config) {
                        $scope.hasErrors = true;
                        $scope.error = data;
                        $scope.loader.loading = true;
                    }
            )};

            $scope.userInteractionPending = function userInteractionPending(){
                $http.get('resource/user/'+userService.user.idUser+'/interactions/pending')
                    .success(function(data, status, headers, config) {
                         $scope.interactionsPending = data;
                         for(i = 0; i < $scope.interactionsPending.length; i++){
                             if($scope.interactionsPending[i].requester.id == userService.user.idUser){
                                $scope.interactionsPendingUserRequester.push($scope.interactionsPending[i]);
                             }
                             else $scope.interactionsPendingUserHelper.push($scope.interactionsPending[i]);
                         }
                     })
                    .error(function(data, status, headers, config) {
                         $scope.hasErrors = true;
                         $scope.error = data;
                    }
            )};

            $scope.clear = function clear(){
                $scope.error = {};
                $scope.callForm = false;
                $scope.opened = false;

                $scope.user = {};
                $scope.users = [];
            }

            $scope.openAvaliation = function openAvaliation(thisInteraction, index, type){

                    $scope.rating1 = 3;
                    $scope.rating2 = 3;

                    ratingHelper.qOne = 3;
                    ratingHelper.qTwo = 3;

                    interaction.user = thisInteraction;
                    profileHelper.index = index;
                    ratingHelper.helper = 3;

                    if(type == 'avaliation'){
                        $scope.option = 'avaliation';
                        var modalInstance = $modal.open({
                            templateUrl: '../views/avaliation.html',
                            controller: 'AvaliationController',
                            scope: $scope
                          });
                    }

                    else if (type == 'pending'){
                        $scope.option = 'pending';
                        var modalInstance = $modal.open({
                             templateUrl: '../views/avaliation.html',
                             controller: 'AvaliationController',
                             scope: $scope
                           });
                    }

                    else if (type != 'avaliation' && type != 'pending'){
                        alert("Ocorreu um problema inesperado, favor fechar o aplicativo e abrir novamente");
                    }
            }

            $scope.helperCloseInteraction = function helperCloseInteraction(interaction){

                profileRequest.user = interaction;
                var modalInstance = $modal.open({
                    templateUrl: '../views/closeInteraction.html',
                    controller: 'closeController',
                    scope: $scope
                  });
            }

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.openInteractionsPending = function pending()
            {
                var modalInstance = $modal.open({
                    templateUrl: '../views/interactionsPending.html',
                    controller: 'AvaliationController',
                    scope: $scope
                  });
            }
       })

       .directive("starRating", function(ratingHelper) {
                 return {
                   restrict : "EA",
                   template : "<ul class='rating' ng-class='{readonly: readonly}'>" +
                              "  <li ng-repeat='star in stars' ng-class='star' ng-click='toggle($index)'>" +
                              "    <i class='fa fa-star'></i>" + //&#9733
                              "  </li>" +
                              "</ul>",
                   scope : {
                     ratingValue : "=ngModel",
                     max : "=?",
                     onRatingSelected : "&?",
                     readonly: "=?"
                   },
                   link : function(scope, elem, attrs) {
                     if (scope.max == undefined) { scope.max = 5; }
                     function updateStars() {
                       scope.stars = [];
                       for (var i = 0; i < scope.max; i++) {
                         scope.stars.push({
                           filled : i < scope.ratingValue
                         });
                       }
                     };

                     scope.toggle = function(index) {
                       if (scope.readonly == undefined || scope.readonly == false){
                             scope.ratingValue = index + 1;
                         ratingHelper.qOne = scope.ratingValue;
                       }
                     };
                     scope.$watch("ratingValue", function(oldVal, newVal) {
                       if (newVal) { updateStars(); }
                     });
                   }
                 }})

        .directive("starRatingTwo", function(ratingHelper) {
             return {
               restrict : "EA",
               template : "<ul class='rating' ng-class='{readonly: readonly}'>" +
                          "  <li ng-repeat='star in stars' ng-class='star' ng-click='toggle($index)'>" +
                          "    <i class='fa fa-star'></i>" + //&#9733
                          "  </li>" +
                          "</ul>",
               scope : {
                 ratingValue : "=ngModel",
                 max : "=?",
                 onRatingSelected : "&?",
                 readonly: "=?"
               },
               link : function(scope, elem, attrs) {
                 if (scope.max == undefined) { scope.max = 5; }
                 function updateStars() {
                   scope.stars = [];
                   for (var i = 0; i < scope.max; i++) {
                     scope.stars.push({
                       filled : i < scope.ratingValue
                     });
                   }
                 };

                 scope.toggle = function(index) {
                   if (scope.readonly == undefined || scope.readonly == false){
                         scope.ratingValue = index + 1;
                     ratingHelper.qTwo = scope.ratingValue;
                   }
                 };
                 scope.$watch("ratingValue", function(oldVal, newVal) {
                   if (newVal) { updateStars(); }
                 });
               }
             }})

angular.module('mainApp')
    .controller('AvaliationController', function($http, $scope, $modal, $modalInstance, interaction, userService, profileHelper, ratingHelper) {


        $scope.nameHelper = interaction.user.requestHelp.helper.name;
        console.log(interaction);


        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        if($scope.option == 'pending'){
             var urlRemove = 'resource/'+userService.user.idUser+'/interactions/pending';
             $scope.url = urlRemove;
        }
        else {
             var urlRemove = 'resource/user/'+userService.user.idUser+'/interaction/'+interaction.user.id+'/close';
             $scope.url = urlRemove;
        }

        $scope.rateFunction = function() {

              $scope.comment = document.getElementById("comment").value;
              $scope.resultRating = (ratingHelper.qOne + ratingHelper.qTwo) / 2;
                console.log($scope.option);
              if($scope.option == 'pending'){
                      $scope.removeFromInteractionsPending(interaction.user);
                }
                else {
                      $scope.removeFromInteractionsUserIdRequested(interaction.user)
                }


               if($scope.resultRating <= 2){
                      var modalInstance = $modal.open({
                          templateUrl: '../views/sendToGlobal.html',
                          controller: 'globalController',
                      });
                  }

           /*   var today = new Date();
              var evaluationMod =   {id:0,
                                    helpPoints:ratingHelper.qOne,
                                    answerPoints:ratingHelper.qTwo,
                                    comment:$scope.comment,
                                    evaluated:'2015-09-12 12:12:00',
                                    userEvaluator:null};

              console.log(evaluationMod);

              $http.put(urlRemove, evaluationMod)
                  .success(function(data, status, headers, config) {
                      if(status == 200){


                          }
                  })
                  .error(function(data, status, headers, config) {
                      $scope.message = data;
                      $scope.alertType = "danger";
                      $scope.status = true;
                    });*/



            $modalInstance.close($scope);
        }

        $scope.removeFromInteractionsPending = function removeFromInteractionsPending(thisInteraction){
              var counter = 0;
              for(; counter < $scope.interactionsPending.length; ){
                  if($scope.interactionsPending[counter].id == thisInteraction.id){
                      $scope.interactionsPending.splice(counter, 1);
                      break;
                  }
                  counter++;
              }
          }

          $scope.removeFromInteractionsUserIdRequested = function removeFromInteractionsUserIdRequested(thisInteraction){
              var counter = 0;
              for(; counter < $scope.interactionsUserIsRequested.length; ){
                  if($scope.interactionsUserIsRequested[counter].id == thisInteraction.id){
                      $scope.interactionsUserIsRequested.splice(counter, 1);
                      break;
                  }
                  counter++;
              }
          }
});
