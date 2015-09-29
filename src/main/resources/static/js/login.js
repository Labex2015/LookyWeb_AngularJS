var mainApp = angular.module('mainApp');

    mainApp.controller('LoginController', function($cookieStore, $http, userService, AuthUser, $scope, $window){

    (function() {
          var po = document.createElement('script');
          po.type = 'text/javascript'; po.async = true;
          po.src = 'https://apis.google.com/js/client:plusone.js?onload=render';
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(po, s);
    })();

    $scope.logout = function(){
        $cookieStore.remove('LookyWeb');
        location.href="index.html";
    }


    $scope.render = function render() {
          gapi.signin.render('customBtn', {
              'callback':  function (authResult) {
                              if (authResult['access_token']) {
                                  getUserInfo();
                                  $scope.token = authResult['id_token'];
                              }
                              else if (authResult['error']) {
                                  console.log('There was an error: ' + authResult['error']);
                              }
                          },
              'clientid': '1079617689354-4b3nmfeu8sn47hgdp238iq7pqh8bl5of.apps.googleusercontent.com',
              'cookiepolicy': 'single_host_origin',
              'requestvisibleactions': 'http://schemas.google.com/AddActivity',
              'scope': 'https://www.googleapis.com/auth/plus.login'
          });

    }

      function getUserInfo(){
          gapi.client.load('oauth2', 'v2', function() {
              var request = gapi.client.oauth2.userinfo.get();
              request.execute(getUserCallback);
          });
      }

      function getUserCallback(obj){

          var user = {username:obj['name'],
                     name:obj['name'],
                     latitude:0,
                     longitude:0,
                     description:"",
                     degree:"",
                     degreeID:0,
                     semester:0,
                     picturePath:obj['picture'],
                     deviceKey:null,
                     accountID:obj['id'],
                     token:$scope.token}

          AuthUser.login(obj);

          $http.post('resource/user/signin/google', user)
               .success(function(data, status, headers, config){
                    console.log(data);
                    console.log(status);
                    location.href="login.html";
               })
               .error(function(data, status, headers, config){
                    console.log(data);
                    console.log(status);
               })

      }
    });

/*LOGIN COM FACEBOOK*/

    var idUserFacebook;
    var accessToken;

    function statusChangeCallback(response, token) {

        accessToken = '1639860942950097|yBKnIxRugrHxlvjZlbiHu5yI8D4';
        idUserFacebook = response.authResponse.userID;

        if (response.status === 'connected') {
          testAPI(token);
        }
  }

  function checkLoginState(){
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response, response.authResponse.accessToken);
    });
  }

  function testAPI(token) {
    FB.api('/me',{"fields":"id,name,picture{url},email,location,address"}, function(response) {
        request(token, response.id, response.name, response.email, response.picture.data.url);
    });
  };