angular
    .module('RDash')
    .controller('indexCtrl',[
        '$scope',
        '$rootScope',
        '$mdSidenav',
        '$state',
        function ($scope,$rootScope,$mdSidenav,$state) {
            var ctrl = this;
            $scope.txtest="hola";
            $scope.logged=false;
            console.log("hola");

            $rootScope.$on("loginSuccess",function(usr){
                console.log("indexCtrl.loginSuccess ini");
                $scope.logged=true;
                $state.go("avanceproyectos");
                $scope.$apply();

                console.log("indexCtrl.loginSuccess end");
                $rootScope.$emit("loginSuccessMenu");
            });

            $rootScope.$on("logout",function(){
                console.log("indexCtrl.logout ini");
                $scope.logged=false;
                $scope.$apply();
                console.log("indexCtrl.logout end");
            });
        }]);
