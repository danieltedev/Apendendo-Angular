/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("listaTelefonica").directive("uiAccordions", function () {
    return{
        controller: function ($scope, $element, $attrs) {
            var accordions = [];
            
            this.registerAccordion = function(accordion){
                accordions.push(accordion);
            };
            
            this.closeAll = function(){
                accordions.forEach(function(accordion){
                    accordion.isOpened = false;
                });
            };
        }
    };
});
angular.module("listaTelefonica").directive("uiAccordion", function () {
    return{
        templateUrl: "view/template/accordion.html",
        transclude: true,
        scope: {
            title: "@"
        },
        require: "^uiAccordions",
        link: function (scope, element, attrs, ctrl) {
            ctrl.registerAccordion(scope);
            scope.open = function () {
                ctrl.closeAll();
                scope.isOpened = true;
            };
        }
    };
});

