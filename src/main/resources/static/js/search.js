angular.module('mainApp')
       .controller('searchController', function($scope, $http,
                                                userService){

       $scope.checkboxModel = {
               value1 : 'name',
               value2 : '',
               value3 : '',
               value4 : ''
       };

       $scope.degrees = [];

       $scope.menu = false;
       $scope.idUser = userService.user.idUser;

       $scope.search = function search(searchComponents){

            var url = "resource/user/"+userService.user.idUser+"/help/search:"+searchComponents.knowledge+"/0/0/0";

            if(searchComponents == undefined){
                console.log("IF1");
            }

            else{
                $http.get(url)
                    .success(function(data, status, headers, config) {
                         $scope.lookKnowledges = data
                      })
                    .error(function(data, status, headers, config) {
                        $scope.hasErrors = true;
                        $scope.error = data;
                    })
            }

       };

       $scope.askHelp = function askHelp(helper){

            var ask = {id:userService.user.idUser,
                       text:"O usuário esta disposto a lhe ajudar.",
                       accepted:true}

            console.log(ask);

             $http.put('resource/user/'+userService.user.idUser+'/respond', ask)
                .success(function(data, status, headers, config){
                    $scope.userHelper = data;
                    var result = confirm("Será enviado para o outro que você esta disposto a ajuda-lo");

                })
                .error(function(data, status, headers, config) {
                    $scope.hasErrors = true;
                    $scope.error = data;
                })
       };

       $scope.showProfileHelper = function showProfileHelper(knowledge){
            $http.get('resource/user/'+knowledge+'/profile')
                .success(function(data, status, headers, config){
                    $scope.userHelper = data;
                    console.log(data);
                })
                .error(function(data, status, headers, config) {
                    $scope.hasErrors = true;
                    $scope.error = data;
                })
       }

        function shadow(int){
               return "0px "+int/5+"px "+int/3+"px #555"; //shadow equation. accurate to the material design standards (approximately)
             }

             function update(){
               var list = document.getElementsByClassName("card");

               var len = list.length;
               for(i=0;i<len;i++){
                 list[i].style.display="block";
                 if(!list[i].hasAttribute("no-margin"))
                  list[i].style.margin="5px";
                 if(!list[i].hasAttribute("no-height"))
                  list[i].style.height="auto";
                 if(!list[i].hasAttribute("no-transition"))
                  list[i].style.transition=".15s box-shadow";
                 if(!list[i].hasAttribute("no-material-border"))
                  list[i].style.borderBottom="1px solid #AAA";
                 if(!list[i].hasAttribute("no-padding"))
                   list[i].style.padding="10px";
                 doDepth(list[i]);
               }
             }

             function setDepth(int,obj,type){
               if(int==null)
                 return
               obj.style.boxShadow = shadow(int);
               if(type==="hover")
                  obj.setAttribute("z",obj.getAttribute("z-hover"));
             }

             function doDepth(i){
               function ga(x) {return i.getAttribute(x);}

               var zh = ga("z-default") || null;
               var zhc = ga("z-click") || null;
               var zhh = ga("z-hover") || null;
               setDepth(zh,i);

               i.onmouseup   = function(){ setDepth(ga("z"),i)};
               i.onmouseout  = function(){ setDepth(zh,i)};

               i.onmousedown = function(){ setDepth(zhc,i)};
               i.onmouseover = function(){setDepth(zhh,i,"hover")};
             }

             update();
})

    .directive("starRatingUser", function(ratingHelper) {
          return {
            restrict : "EA",
            template : "<ul class='rating' ng-class='{readonly: readonly}'>" +
                       "  <li ng-repeat='star in stars' ng-class='star'>" +
                       "    <i class='fa fa-star'></i>" + //&#9733
                       "  </li>" +
                       "</ul>",
            scope : {
              ratingValue : "=ngModel",
              max : "=?",
              onRatingSelected : "&?",
              readonly: "=true"
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

              scope.$watch("ratingValue", function(oldVal, newVal) {
                if (newVal) { updateStars(); }
              });
            }
          }})