/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("ui", []);

//$templateCache.put("view/template/accordion.html","");
angular.module("ui").run(function($templateCache){
    $templateCache.put("view/template/accordion.html", 
    '<div class="panel panel-default">'
    +'<div class="panel-heading" ng-click="open()" style="cursor:pointer;">{{title}}</div>'
    +'<div class="panel-body" ng-show="isOpened" ng-transclude>'
    +'</div></div>');
});

angular.module("ui").directive("uiAccordions", function () {
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
angular.module("ui").directive("uiAccordion", function () {
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

