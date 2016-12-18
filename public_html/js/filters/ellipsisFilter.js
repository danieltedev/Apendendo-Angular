/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("listaTelefonica").filter("ellipsis",function(){
    return function(input,size){
        if(input.length <= size) return input;
        var output = input.substring(0,(size || 5)) + "...";
        return output;
    };
});