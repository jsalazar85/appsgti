angular
    .module('RDash')
    .controller('tituloContCompCtrl',[
        '$scope',
        '$rootScope',
        function ($scope, $rootScope){
            var ctrl=this;

            //<editor-fold desc="Component Lifecycle">
            ctrl.$onInit=function () {
            };
            ctrl.$onChanges=function () {
            };
            ctrl.$doCheck=function () {

            };
            ctrl.$onDestroy=function () {

            };
            ctrl.$postLink=function () {

            };
            //</editor-fold>
        }
    ])
    .component('tituloContComp', {
        templateUrl:'templates/titulo-cont.comp.html',
        controller:'tituloContCompCtrl',
        bindings:{
            txTitulo:'@'
        }
    });
