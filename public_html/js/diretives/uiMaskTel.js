/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("listaTelefonica").directive("uiMasktel", function () {
    return{
        require: "ngModel",
        link: function (scope, element, attrs, ctrl) {
            var _formatTel = function (tel) {
                tel = tel.replace(/[^0-9]+/g, "");
                if (tel.length > 0) {
                    tel = tel.substring(0, 0) + "(" + tel.substring(0);
                }
                if (tel.length > 3) {
                    tel = tel.substring(0, 3) + ") " + tel.substring(3);
                }
                if (tel.length > 9) {
                    tel = tel.substring(0, 9) + "-" + tel.substring(9, 13);
                }
                return tel;
            };
            element.bind("keyup", function () {
                ctrl.$setViewValue(_formatTel(ctrl.$viewValue));
                ctrl.$render();
//                console.log(ctrl.$viewValue);
            });
        }
    };
});