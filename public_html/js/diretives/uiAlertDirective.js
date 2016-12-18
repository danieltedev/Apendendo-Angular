/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("listaTelefonica").directive("uiAlert", function () {
    return{
        replace: true,
        retrict: "AE",
        templateUrl: "view/template/alert.html",
//        templateUrl: "js/template/alert.html",
//        templateUrl: "view/alert.html",
        scope: {
            title:"@",
            message:"="
        }
    };
});