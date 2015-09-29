angular.module('mainApp')
       .controller('PerfilController', function($scope, $http, $modal, $location, $route, $filter, userService){

       $scope.subjects = [];
       $scope.areas = [];

       $scope.showKnowledgesUser = true;
       $scope.showCommentsUser = true;

       $http.get('resource/areas')
           .success(function(data, status, headers, config){
                $scope.areas = data;
           })
           .error(function(data, status, headers, config){
               $scope.hasErrors = true;
               $scope.error = data;
           });

       $scope.knowledge = {};
       $scope.knowledges = [];
       $scope.userProfile = true;

        $http.get('resource/subjects')
           .success(function(data, status, headers, config){
                $scope.subjects = data;
           })
           .error(function(data, status, headers, config){
               $scope.hasErrors = true;
               $scope.error = data;
        });

       $http.get('resource/user/'+userService.user.idUser+'/knowledge')
            .success(function(data, status, headers, config) {
                 $scope.knowledges = data;
                 $scope.allTags = data;
            })
            .error(function(data, status, headers, config) {
                 $scope.hasErrors = true;
                 $scope.error = data;
            });

       $scope.userProfile = function viewPerfil(user){

       };

           $scope.divConhecimentos = false;
           $scope.divComentarios = false;


       $scope.addKnowledge = function addKnowledge(selectedSubjects){

            var result = confirm("Tem certeza que deseja adicionar?");
            if(result == true){
                if(!selectedSubjects.knowledge.id_area){
                    var addNewKnowledge = document.getElementById("knowledge").value;
                    $scope.filterKnowledge(addNewKnowledge, selectedSubjects);
                }
                else{
                    $scope.filterKnowledge(selectedSubjects.knowledge.name, selectedSubjects);
                }
            }
        }

       $scope.filterKnowledge = function filterKnowledge(nameKnowledge, selectedSubjects){

            if(selectedSubjects.knowledge.id == null){
                var newKnowledge = '{"area":0,' +
                                     '"idUser":'+userService.user.idUser+',' +
                                     '"name":"'+nameKnowledge+'",' +
                                     '"subject":'+selectedSubjects.subject.id+'}'
            }
            else{
                var newKnowledge = '{"area":'+selectedSubjects.knowledge.id+',' +
                                     '"idUser":'+userService.user.idUser+',' +
                                     '"name":"'+nameKnowledge+'",' +
                                     '"subject":'+selectedSubjects.subject.id+'}'
            }

            console.log(newKnowledge);
            $http.post('resource/knowledge', newKnowledge)
                   .success(function(data, status, headers, config){
                       $scope.message = data;
                       $scope.status = this.status;
                       console.log(status);
                       $scope.knowledges.push(data);
                   })
                   .error(function(data, status, headers, config){
                       $scope.hasErrors = true;
                       $scope.error = data;
                       $scope.status = this.status;
                   })
        }

        $scope.deleteKnowledge = function deleteKnowledge(knowledge){

            console.log(knowledge);

            var result = confirm("Você tem certeza que deseja excluir?");
            if(result == true){
                $http.delete('resource/user/'+userService.user.idUser+'/knowledge/'+knowledge.area)
                    .success(function(data, status, headers, config){
                        $scope.message = data;
                        $scope.removeFromKnowledges(knowledge);
                    })
                    .error(function(data, status, headers, config){
                        $scope.hasErrors = data
                        $scope.status = this.status;
                    })
            }
        }

        $scope.removeFromKnowledges = function removeFromInteractions(knowledge){

              var counter = 0;
              for(; counter < $scope.knowledges.length; ){
                  if($scope.knowledges[counter].area === knowledge.area){
                      $scope.knowledges.splice(counter, 1);
                      break;
                  }
                  counter++;
              }
          }

})
