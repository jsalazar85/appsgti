angular
    .module('RDash')
    .controller('tableroResumenCompCtrl',[
        '$scope',
        '$rootScope',
        'tableroResumenSrvc',
        function ($scope, $rootScope,tabResSrvc){
            var ctrl=this;

            //<editor-fold desc="Eventos">
            ctrl.onGetTotales=function (event,data) {
                //ctrl.models=tabResSrvc.models;
                ctrl.info=_.forEach(data,function (o) {
                    console.log(o);
                    o.iconClass=["fa-database","fa-3x"];
                });
            };

            ctrl.onGetTablasDW=function (event,data) {
                //ctrl.models=tabResSrvc.models;
                console.log(data);
                ctrl.tablasDW=data;
            };
            //</editor-fold>

            //<editor-fold desc="Component Lifecycle">
            ctrl.$onInit=function () {
                ctrl.tablasDW=[];


                //Inscripcion de eventsos
                tabResSrvc.suscribe($scope,ctrl.onGetTotales,tabResSrvc.obEvents.GET_TOTALES);
                //tabResSrvc.suscribe($scope,ctrl.onGetTablasDW,tabResSrvc.obEvents.GET_TABLAS_DW);

                //Obtener
                tabResSrvc.getDataTotales();
                //tabResSrvc.getDataTablasDW();
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
    .component('tableroResumenComp', {
        templateUrl:'templates/tablero-resumen.comp.html',
        controller:'tableroResumenCompCtrl',
        bindings:{
        }
    });
