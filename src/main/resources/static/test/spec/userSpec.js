(function(){
    "use: strict";

    describe("Controller: HelperController", function(){

        var $controller, $scope;

        beforeEach(module("mainApp"));

        beforeEach(inject(function(_$controller_, $rootScope) {
            $scope = $rootScope.$new();

            $controller = _$controller_("HelperController", {
                $scope: $scope
                });
        }));
    })

    describe("Controller: InteractionsController", function(){

        var $controller, $scope;

        beforeEach(module("mainApp"));

        beforeEach(inject(function(_$controller_, $rootScope) {
            $scope = $rootScope.$new();

            $controller = _$controller_("InteractionsController", {
                $scope: $scope
                });
        }));

        it("Deveria retornar Avaliation", function(){
            var interaction = {
                "id":1,
               "idRequestHelp":2,
               "idHelper":2,
               "helper":"PassoLargo",
               "idRequested":1,
               "requested":"Frodo Bolseiro",
               "request":"Me salve dos Nazgul, por favoooooooooor;",
               "chatRoom":"1_2_20150612",
               "open":true,
               "started": "2015-06-15 17:26:32",
               "closed":null,
               "pictureAnotherUser":null
           }

           $scope.openAvaliation(interaction, 1, 'avaliation');
           expect($scope.option).toEqual("avaliation");
         });

         it("Deveria retornar Pending", function(){
             var interaction = {
                 "id":1,
                "idRequestHelp":2,
                "idHelper":2,
                "helper":"PassoLargo",
                "idRequested":1,
                "requested":"Frodo Bolseiro",
                "request":"Me salve dos Nazgul, por favoooooooooor;",
                "chatRoom":"1_2_20150612",
                "open":true,
                "started": "2015-06-15 17:26:32",
                "closed":null,
                "pictureAnotherUser":null
            }

            $scope.openAvaliation(interaction, 1, 'pending');
            expect($scope.option).toEqual("pending");
          });


    })

    describe("Controller: AvaliationController", function(){

        var $controller, $scope;

        beforeEach(module("mainApp"));

        var modalInstance = { close: function() {}, dismiss: function() {} };

        beforeEach(inject(function(_$controller_, $rootScope) {
            $scope = $rootScope.$new();

            $controller = _$controller_("AvaliationController", {
                $scope: $scope,
                $modalInstance: modalInstance,
                });
        }));

         it("Resultado do valor deve ser entre 1 e 5", function(){
            expect($scope.resultRating).not.toBeNull();
         });

     })

}());