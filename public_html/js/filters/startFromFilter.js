/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("listaTelefonica").filter("startFrom",function(){
    return function(input, start){
        return input.slice(start);
    };
});