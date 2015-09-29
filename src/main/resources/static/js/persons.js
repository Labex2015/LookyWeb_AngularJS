angular.module('mainApp')
       .controller('PersonController', function($scope, $http, alertService, $modal, $location, $filter){

            $scope.hasErrors = false;
            $scope.message = "Testing scope";
            $scope.error = {};
            $scope.callForm = false;
            $scope.opened = false;

            $scope.person = {};
            $scope.persons = [];

            $scope.address = {};
            $scope.addresses = [];

            $scope.phones = [];
            $scope.groups = [];

            $http.get('resource/persons')
            .success(function(data, status, headers,config){
                $scope.persons = data;
            }).error(function(data, status, headers,config){
                $scope.persons = [];
                $scope.error = data;
                $scope.hasErrors = true;
            });

            $scope.loadPerson = function loadPerson(id){
                $http.get('resource/persons/person/'+id)
                .success(function(data, status, headers,config){
                    $scope.person = data;
                    $scope.addresses = $scope.person.address;
                    $scope.phones = $scope.person.phones;
                    $scope.groups = $scope.person.groups;
                    console.log(angular.toJson($scope.person));
                }).error(function(data, status, headers,config){
                    $scope.persons = [];
                    $scope.error = data;
                    $scope.hasErrors = true;
                });
            }
            $scope.save = function save(){
                $scope.person.address = $scope.addresses;
                $scope.person.phones = $scope.phones;
                $scope.person.birthDate = $filter('date')($scope.person.birthDate, "dd/MM/yyyy");
                $scope.person.groups = $scope.groups;
                var url = "resource/persons/person";
                console.log($scope.person);
                $http.post(url, $scope.person)
                    .success(function(data, status, headers, config) {
                        if(!$scope.updatePersons(data))
                            $scope.persons.push(data);
                        $scope.callForm = false;
                        $scope.clear();
                      })
                     .error(function(data, status, headers, config) {
                        $scope.hasErrors = true;
                        $scope.error = data;
                        if(status = 404)
                            $location.path("/");
                      });
            }

            $scope.updatePersons = function updatePersons(person){
                var counter = 0;
                for(; counter < $scope.persons.length; ){
                    if($scope.persons[counter].id === person.id){
                        $scope.persons.splice(counter, 1,person);
                        return true;
                    }
                    counter++;
                }
                return false;
            }

            $scope.loadAddress = function loadAddress(address){
                $scope.address = address;
                $scope.open(address);
            }

            $scope.clearAddress = function clearAddress(){
                $scope.address = {};
            }

            var modalInstance = {};
            $scope.open = function (address) {
                  modalInstance = $modal.open({
                  templateUrl: './views/addressform.html',
                  controller: 'ModalInstanceCtrl',
                  resolve: {
                    address: function () {
                      return address;
                    },
                    cancelAction: function(){
                        return $scope.clearAddress;
                    }
                  }
                });

                modalInstance.result.then(function (address) {
                    if(!($scope.updateAddress(address))){
                        $scope.addresses.push(address);
                    }
                });

                $scope.updateAddress = function updateAddress(address){
                    var counter = 0;
                    for(; counter < $scope.addresses.length; ){
                        if($scope.addresses[counter] === $scope.address){
                            $scope.addresses.splice(counter, 1,address);
                            $scope.address = {};
                            return true;
                        }
                        counter++;
                    }
                    return false;
                }
            }

            $scope.deleteCompany = function deleteCompany(idPerson){
                $http['delete']('resource/persons/person/'+idPerson)
                     .success(function(data, status, headers, config) {
                        $scope.message = data;
                        $scope.removeFromPersons(idPerson);
                        $scope.status = true;
                        $scope.alertType = "success";
                      })
                     .error(function(data, status, headers, config) {
                        $scope.message = data;
                        $scope.alertType = "danger";
                        $scope.status = true;
                      });
            }

            $scope.removeFromPersons = function removeFromPersons(idPerson){
                var counter = 0;
                for(; counter < $scope.persons.length; ){
                    if($scope.persons[counter].id === idPerson){
                        $scope.persons.splice(counter, 1);
                        break;
                    }
                    counter++;
                }
            }

            $scope.clear = function clear(){
                $scope.person.lastname = "";
                $scope.person.name = "";
                $scope.person.occupation = "";
                $scope.person.birthDate = "";
                $scope.person.cpf = "";
                $scope.person.rg = "";
                $scope.person.id = "";
                $scope.person.email = "";

                $scope.address.streetAddress = "";
                $scope.address.district = "";
                $scope.address.zipCode = "";
                $scope.address.state = "";
                $scope.address.type = "";

                $scope.phone = {};

                $scope.phones = [];
                $scope.addresses = [];
                $scope.groups = [];
            }

             $scope.openCalendar = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
              };

             $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
             };


       });
       angular.module('DirectModule', []);
       angular.module('DirectModule').directive("phoneDirective", function(){
            return {
               restrict: 'E',
               //require: '^pgAction',
               templateUrl:'./views/phones.html',
               scope:{phones: "=phones"},
               link: function(scope, element, attrs){
                    scope.types= ["Contact","Emergency","Personal"];
                    scope.phone = {};

                    scope.addPhone = function addPhone(){
                        if(!scope.updatePhone())
                            scope.phones.push(scope.phone);
                        scope.clearPhone();
                    }

                    scope.updatePhone = function updatePhone(){
                        for(var counter = 0; counter < scope.phones.length; ){
                            if(scope.phones[counter] === scope.address){
                                scope.phones.splice(counter, 1,scope.address);
                                return true;
                            }
                            counter++;
                        }
                        return false;
                    }

                    scope.clearPhone = function clearPhone(){
                        scope.phone = {};
                    }

                    scope.loadPhone = function loadPhone(phone){
                        scope.phone = phone;
                    }

                    scope.removePhone = function removePhone(phone){
                        for(var counter = 0; counter < scope.phones.length; ){
                            if(scope.phones[counter] === phone){
                                scope.phones.splice(counter, 1);
                                break;
                            }
                            counter++;
                        }
                    }
               }
            }
       });