angular.module("listaTelefonica").factory("apiContato",function($http, config){
    var _getContatos = function(){
        return $http.get(config.apiUrl + "contatos/listaComOperadora");
    };
    
    var _setContatos = function(postContato){
        return $http.post(config.apiUrl + "contatos/listaComOperadora",postContato);
    };
    
    return {
        getContatos: _getContatos,
        setContatos: _setContatos
    };
});