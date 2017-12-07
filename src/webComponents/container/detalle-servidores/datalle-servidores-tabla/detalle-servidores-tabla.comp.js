angular
    .module('RDash')
    .controller('detalleServidoresTablaCtrl',[
        '$scope',
        '$rootScope',
        function ($scope, $rootScope){
            var ctrl=this;

            //<editor-fold desc="Component Lifecycle">
            ctrl.$onInit=function () {
                console.log('detalleServidoresTablaCtrl');

                //console.log(ctrl.lstObServidor);
            };
            ctrl.$onChanges=function () {
                console.log(ctrl.lstObServidor);

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
    .component('detalleServidoresTabla', {
        templateUrl:'templates/detalle-servidores-tabla.comp.html',
        controller:'detalleServidoresTablaCtrl',
        bindings:{
            lstObServidor:'<'
        }
    });
