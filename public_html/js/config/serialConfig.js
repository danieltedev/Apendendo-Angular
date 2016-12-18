/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("listaTelefonica").config(function (serialGeneratorProvider){
//    console.log(serialGeneratorProvider.getLength());
    serialGeneratorProvider.setLength(50);
});