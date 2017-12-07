angular
    .module('RDash')
    .controller('tableroTablaMensualCompCtrl',[
        '$scope',
        '$rootScope',
        function ($scope, $rootScope,tabResSrvc){
            var ctrl=this;

            //<editor-fold desc="Eventos">

            //</editor-fold>

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
    .component('tableroTablaMensualComp', {
        templateUrl:'templates/tablero-tabla-mensual.comp.html',
        controller:'tableroTablaMensualCompCtrl',
        bindings:{
        }
    });

