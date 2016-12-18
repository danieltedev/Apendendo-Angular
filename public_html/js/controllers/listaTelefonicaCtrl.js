/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, $filter, $http, apiContato, apiOperadoras, serialGenerator) {
//    console.log(serialGenerator.generate());
    $scope.app = "Listar Telefonica";
    $scope.pageSize = 5;
    $scope.currentPage = 1;
    $scope.maxSize = 5;
//    $scope.contatos = [
//        {nome: "Pedro", telefone: "(11) 9999-8888", operadora: "", data: new Date("2016-06-22")},
//        {nome: "Ana", telefone: "(11) 9999-8888", operadora: "", data: new Date("2016-07-06")},
//        {nome: "Claudoa", telefone: "(11) 9999-8888", operadora: "", data: new Date("2016-12-04")}
//    ];
//    $scope.operadoras = [
//        {nome: "Oi", codigo: 14, categoria: "Celular"},
//        {nome: "Tim", codigo: 41, categoria: "Celular"},
//        {nome: "Claro", codigo: 21, categoria: "Celular"}
//    ];
    $scope.contatos = [];
    $scope.operadoras = [];
    var carregarContato = function () {
//        $http.get("http://ws-agenda-api.atwebpages.com/?url=categorias/listar");
        apiContato.getContatos().success(function (dados) {
            if (typeof dados === "object") {
                $scope.contatos = dados;
                angular.forEach($scope.contatos, function (value, key) {
                    $scope.contatos[key].data = new Date(value.data);
                    $scope.contatos[key].data.setDate($scope.contatos[key].data.getDate() + 1);
                });
                $scope.mensagemContato = null;
            } else {
                $scope.mensagemContato = "Ocorreu um erro falta: " + dados;
            }
        }).error(function (dados, status) {
            $scope.mensagemContato = "Ocorreu um erro falta: " + dados + " " + status;
        });
    };
    var carregarOperadoras = function () {
        apiOperadoras.getOperadoras().success(function (dados) {
//        $http.get("http://ws-agenda-api.atwebpages.com/?url=operadoras/listar").success(function (dados) {
            $scope.operadoras = dados;
            $scope.mensagemOperadora = null;
        }).error(function (dados, status) {
            $scope.mensagemOperadora = "Ocorreu um erro falta: " + dados + " " + status;
        });
    };
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
        }).error(function (dados, status) {
            $scope.mensagemContato = "Ocorreu um erro falta: " + dados + " " + status;
        });
    };
    $scope.apagarContatos = function (contatos) {
        console.log(contatos);
//        var contatosSelecionados = contatos.filter(function (contato) {
//            $scope.contatos = contatos.filter(function (contato) {
//                if (!contato.selecionado)
//                    return contato;
//            });
//        });
        contatos.filter(function (contato) {
            if (contato.selecionado) {
                var index = contatos.indexOf(contato);
                var putContato = angular.copy(contato);
                putContato.operadora = putContato.operadora.id;
                putContato.status = 2;
                putContato.data = putContato.data.toISOString().substring(10, 0);
                delete putContato.selecionado;
                console.log(putContato);
                $http.put("http://ws-agenda-api.atwebpages.com/?url=contatos/alterarRertornoCompleto", putContato).success(function (dados) {
                    dados.data = new Date(dados.data);
                    console.log(dados);
                    dados.data.setDate(dados.data.getDate() + 1);
                    $scope.contatos.splice(index, 1, dados);
                    delete $scope.contato;
                    delete putContato;
//                    $scope.contatoForm.$setPristine();
                    $scope.mensagemContato = null;
                }).error(function (dados, status) {
                    $scope.mensagemContato = "Ocorreu um erro falta: " + dados + " " + status;
                });
            }
        });
    };
    $scope.selecionar = function (contato, contatos) {
        $scope.contato = angular.copy(contato);
        $scope.contato.index = contatos.indexOf(contato);
        $scope.contato.selecionar = true;
        $scope.contatoForm.nome.$setDirty();
        $scope.contatoForm.telefone.$setDirty();
        $scope.contatoForm.data.$setDirty();
        $scope.contatoForm.operadora.$setDirty();
//        console.log(contatos);
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
    $scope.isContatoSelecionado = function (contatos) {
        return contatos.some(function (contato) {
            return contato.selecionado;
        });
    };
    $scope.ordenarPor = function (campo) {
        $scope.ordenarCampo = campo;
        $scope.direcao = !$scope.direcao;
    };
//    $scope.numeroDePaginas = function () {
//        return Math.ceil($scope.contatos.length / $scope.maximoDeItens);
//    };
    $scope.$watch("buscarContato",function(nval){
        $scope.ncontatos = $filter("filter")($scope.contatos, nval).length;
    },true);
    carregarContato();
    carregarOperadoras();
});