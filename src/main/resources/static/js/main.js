/*
  ngRoute => Módulo do Angular para usar as funcionalidades de rotas;
  ui.bootstrap => Módulo de terceiros que usa componentes do bootstrap e funcionalidades do Angular;
*/
var mainApp = angular.module('mainApp',['ngRoute', 'ui.bootstrap', 'ngCookies']);

    /**
        Módulo para carregar dados do usuário, ao logar.
    */
    angular.module('mainApp').service("userService", function(){
        var userService  = this;
        userService.user = {
            username: "Cássio Wollmann",
            email: "wollmann.cassio@gmail.com",
            degree: "Sistemas de Informação",
            rating: 4,
            picture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfp1/v/t1.0-1/p50x50/10968493_1380890182224493_8463517878088983332_n.jpg?oh=bc42603d8a07f6c3096071179583a56b&oe=569F30F4&__gda__=1452254062_129545f31534d3860cfd4c964f95aff8",
            idUser: 2
        };
    });
    /**
        Módulo para carregar dados de terceiros.
    */
    angular.module('mainApp').service("profileService", function(){
        var profileService  = this;
        profileService.user = {};
    });

    angular.module('mainApp').service("storeService", function(){
        var profileService  = this;
    });

    angular.module('mainApp').service('profileHelper', function(){
        var profileHelper = this;
        profileHelper.user = {};
        profileHelper.index = {};
    });

    angular.module('mainApp').service('ratingHelper', function(){
        var ratingHelper = this;
        ratingHelper.rating = {};
        ratingHelper.qOne = {};
        ratingHelper.qTwo = {};
        ratingHelper.comment = {};
    });

    angular.module('mainApp').service('interaction', function(){
        var interaction = this;
        interaction.chat = {};
    });

    angular.module('mainApp').service('profileRequest', function(){
        var profileRequest = this;
        profileRequest.user = {};
    });

    angular.module('mainApp').service('countInteractionsPending', function(){
        var countInteractionsPending = this;
        countInteractionsPending = 0;
    });

    angular.module('mainApp').service('currentRoom', function(){
        var currentRoom = this;
        currentRoom.room = 0;
    });


    /**
        Módulo que cuida das rotas;
    */
    angular.module('mainApp').config(function ($routeProvider){

        $routeProvider.when("/",{
            templateUrl: "./views/profile.html",
        });
        $routeProvider.when("/profile",{
            templateUrl: "./views/profile.html",
        });
        $routeProvider.when("/knowledges",{
            templateUrl: "./views/knowledges.html"
        });
        $routeProvider.when("/request_help",{
            templateUrl: "./views/request_help.html"
        });
        $routeProvider.when("/globalHelp",{
            templateUrl: "./views/globalHelp.html",
            controller: "GlobalHelpController"
        });
        $routeProvider.when("/search",{
            templateUrl: "./views/search.html",
            controller: "searchController"
        });
        $routeProvider.when("/waitingHelper",{
            templateUrl: "./views/waitingHelper.html",
            controller: "InteractionsController"
        });
        $routeProvider.when("/editUser",{
            templateUrl: "./views/editUser.html",
            controller: "UserController"
        });
        $routeProvider.when("/profileHelper",{
            templateUrl: "./views/profileHelper.html",
            controller: "searchController"
        });
        $routeProvider.when("/chat",{
            templateUrl: "./views/chat.html"
        });
        $routeProvider.otherwise({
            templateUrl: "./views/profile.html"
        });
    });

    angular.module('mainApp').run(['AuthUser', '$http', '$cookieStore', function(AuthUser, $http, $cookieStore, userService, $scope, $window){

        var caminho = window.location.pathname;

        console.log($cookieStore.get('LookyWeb'));



    }]);

    angular.module('mainApp').run(['AuthUser', '$http', '$rootScope', '$cookieStore', function(AuthUser, $http, $rootScope, $cookieStore, userService, $scope, $window){

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)){
                return;
            }
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        fbAsyncInit = function() {
            FB.init({
              appId      : '1639860942950097',
              xfbml      : true,
              version    : 'v2.4'
            });
        };

        var userToken;

        request = function(token, id, name, email, picture, url){

            console.log("AQUI:"+token);

            var informationUser = {"username":name,
                                   "name":name,
                                   "latitude":0,
                                   "longitude":0,
                                   "description":"",
                                   "degree":"",
                                   "degreeID":0,
                                   "semester":0,
                                   "picturePath":picture,
                                   "deviceKey":0,
                                   "token":token,
                                   "accountID":id};


            console.log(informationUser);

            $http.post('resource/user/signin/facebook', informationUser)
                .success(function(data, status){
                    console.log(data);
                    console.log(status);
                })
                .error(function(data,status){
                    console.log(data);
                    console.log(status);
                })

        }

    }]);

    mainApp.factory('AuthUser', ['$http', '$cookies', function($http, $cookieStore, userService, $scope){

        return {
            login : function(data){
                $cookieStore.put('LookyWeb', data.id);
            }
        }

    }]);

    //Módulo principal.
    angular.module('mainApp').controller('MainController', function($scope, $http, $modal, profileService){


    });





