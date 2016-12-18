angular.module("listaTelefonica").service("apiOperadoras", function ($http, config) {
    this.getOperadoras = function () {
        return $http.get(config.apiUrl + "operadoras/listaCompleta");
    };
});