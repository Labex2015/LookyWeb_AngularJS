angular.module('mainApp')
       .controller('KnowledgeController', function($scope, $http, $modal, $location, $filter, userService){

            $scope.hasErrors = false;
            $scope.message = "Testing scope";
            $scope.error = {};
            $scope.callForm = false;
            $scope.opened = false;
            $scope.validNewArea = true;

            $scope.knowledge = {};
            $scope.knowledges = [];
            

            $scope.areas = [];

            $http.get('resource/user/'+userService.user.idUser+'/knowledge')
                .success(function(data, status, headers,config){
                    console.log(data);
                    $scope.knowledges = data.knowledges;
                    $scope.areas = data.parameters;
                    $scope.nivel = data.nivel;
                    filterCombo(data.parameters);
                }).error(function(data, status, headers,config){
                    $scope.areas = [];
                    $scope.error = data;
                    $scope.hasErrors = true;
                });


            $scope.clear = function clear(){
                $scope.error = {};
                $scope.callForm = false;
                $scope.opened = false;

                $scope.knowledge = {};
                $scope.areas = [];
            }

            $scope.verifyName = function verifyName(param){
                for( k in $scope.knowledge){
                    if(param.toLowerCase().trim() == k.name.toLowerCase().trim()){
                        $scope.validNewArea = false;
                        break;
                    }
                    $scope.validNewArea = true;
                }
            }

            $scope.addArea = function addArea(){
                var url = "resource/user/"+userService.user.idUser+"/knowledge";
                var nivelKnowLedge = document.getElementsByName("rating");
                findArea(document.getElementById("areaInputName").value);
                for (var i = 0; i < nivelKnowLedge.length; i++){
                    if (nivelKnowLedge[i].checked) {
                        $scope.knowledge.nivel = nivelKnowLedge[i].value;
                    }

                }
                $scope.knowledge.area = $scope.area;
                $http.post(url, $scope.knowledge)
                    .success(function(data, status, headers, config) {
                        if(status == 200){
                            $scope.knowledges.push(data);
                            $scope.area = {};
                            $scope.knowledge = {};
                        }
                    }).error(function(data, status, headers, config) {
                        console.log(data);
                    });
            }


            $scope.removeArea = function removeArea(knowledge){
                var urlRemove = "resource/user/"+userService.user.idUser+"/knowledge/remove/"+knowledge.area.id;

                $http.post(urlRemove)
                    .success(function(data, status, headers, config) {
                        if(status == 200){
                            $scope.message = data;
                            $scope.removeFromKnowledges(knowledge.area.id);
                            $scope.status = true;
                            $scope.alertType = "success";
                        }
                    })
                    .error(function(data, status, headers, config) {
                        $scope.message = data;
                        $scope.alertType = "danger";
                        $scope.status = true;
                      });
            }

            $scope.removeFromKnowledges = function removeFromKnowledges(knowledge){
                var counter = 0;
                for(; counter < $scope.knowledges.length; ){
                    if($scope.knowledges[counter].area.id === knowledge){
                        $scope.knowledges.splice(counter, 1);
                        break;
                    }
                    counter++;
                }
            }

            var filterCombo =  function(data){
                var availableTags = data;
                $( "#areaInputName" ).autocomplete({
                  source: availableTags
                });
            };

            var findArea = function(area){
                var found = false;
                for(item in $scope.areas){
                    if(item == area){
                        $scope.area = item;
                        found = true;
                        break;
                    }
                }
                if(!found)
                    $scope.area.name = area;
                $scope.area.id = 0;
            }

            $scope.testeDelete = function(knowledge){

            var areaDelete = $scope.testeDelete;

            var deleteKnowledge = knowledge;

            $.confirm({
                'title'		: 'Confirmar',
                'message'	: 'Você esta deletando este item. <br />Você não irá conseguir recuperá-lo!<br /><b>Deseja continuar?</b>',
                'buttons'	: {
                    'Sim'	: {
                        'class'	: 'blue',
                        'action': function(){

                        }
                    },
                    'Não'	: {
                        'class'	: 'gray',
                        'action': function(){}	// Nothing to do in this case. You can as well omit the action property.
                    }
                }
            });

            }
       });



