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
            $scope.logged=true;
            console.log("hola");

            $rootScope.$on("loginSuccess",function(usr){
                console.log("indexCtrl.loginSuccess ini");
                $scope.logged=true;
                $scope.$apply();
                console.log("indexCtrl.loginSuccess end");
            });

            $rootScope.$on("logout",function(){
                console.log("indexCtrl.logout ini");
                $scope.logged=false;
                $scope.$apply();
                console.log("indexCtrl.logout end");
            });
        }]);
