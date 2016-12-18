/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("listaTelefonica").controller("novoContatoCtrl", function ($scope, $http, apiContato, $location, operadoras) {

    $scope.operadoras = operadoras.data;

//    var carregarOperadoras = function () {
//        apiOperadoras.getOperadoras().success(function (dados) {
////        $http.get("http://ws-agenda-api.atwebpages.com/?url=operadoras/listar").success(function (dados) {
//            $scope.operadoras = dados;
//            $scope.mensagemOperadora = null;
//        }).error(function (dados, status) {
//            $scope.mensagemOperadora = "Ocorreu um erro falta: " + dados + " " + status;
//        });
//    };
    
    $scope.adicionarContato = function (contato) {
//        $scope.contatos.push(angular.copy(contato));
//        delete $scope.contato;
//        $scope.contatoForm.$setPristine();
        var postContato = angular.copy(contato);
        postContato.operadora = postContato.operadora.id;
        postContato.data = postContato.data.toISOString().substring(10, 0);
        delete postContato.status;
//        $http.post("http://ws-agenda-api.atwebpages.com/?url=contatos/incluirRertornoCompleto", postContato).success(function (dados) {
        apiContato.setContato(postContato).success(function (dados) {
            contato.id = dados.id;
            contato.status = dados.status;
            $scope.contatos.push(angular.copy(contato));
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            $scope.mensagemContato = null;
            $location.path("/contatos");
        }).error(function (dados, status) {
            $scope.mensagemContato = "Ocorreu um erro falta: " + dados + " " + status;
        });
    };
    $scope.editarContatos = function (contato) {
//        $scope.contatos.splice(contato.index, 1, contato);
//        delete $scope.contato;
//        $scope.contatoForm.$setPristine();
        var putContato = angular.copy(contato);
        var index = putContato.index;
//        delete $scope.contato;
        putContato.operadora = putContato.operadora.id;
        putContato.status = putContato.status.id;
        putContato.data = putContato.data.toISOString().substring(10, 0);
        delete putContato.selecionar;
        delete putContato.index;
        console.log(putContato);
        $http.put("http://ws-agenda-api.atwebpages.com/?url=contatos/alterarRertornoCompleto", putContato).success(function (dados) {
            console.log(dados);
            dados.data = new Date(dados.data);
            dados.data.setDate(dados.data.getDate() + 1);
            $scope.contatos.splice(index, 1, dados);
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            $scope.mensagemContato = null;
            delete putContato;
        }).error(function (dados, status) {
            $scope.mensagemContato = "Ocorreu um erro falta: " + dados + " " + status;
        });
    };
//    carregarOperadoras();
});