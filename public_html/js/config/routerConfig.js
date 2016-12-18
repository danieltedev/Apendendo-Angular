/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("listaTelefonica").config(function ($routeProvider,$locationProvider) {
    
    $routeProvider.when("/contatos", {
        templateUrl: "view/contatos.html",
        controller: "listaTelefonicaCtrl"
    });
    $routeProvider.when("/novoContato", {
        templateUrl: "view/novoContato.html",
        controller: "novoContatoCtrl",
        resolve:{
            operadoras: function(apiOperadoras){
                return apiOperadoras.getOperadoras();
            }
        }
    });
    $routeProvider.otherwise({redirectTo:"/contatos"});
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
});