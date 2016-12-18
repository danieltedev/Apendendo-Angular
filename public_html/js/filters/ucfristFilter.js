/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("listaTelefonica").filter("ucfrist",function(){
    return function(input){
        var listaDeNomes = input.split(" ");
        var nomesFormatados = listaDeNomes.map(function(nome){
            if(/(da|de)/.test(nome)) return nome;
            return nome.charAt(0).toUpperCase() + nome.substring(1).toLowerCase();
        });
        return nomesFormatados.join(" ");
    };
});