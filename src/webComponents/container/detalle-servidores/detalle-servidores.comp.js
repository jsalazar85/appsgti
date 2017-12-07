angular
    .module('RDash')
    .controller('detalleServidoresCtrl',[
        '$scope',
        '$rootScope',
        'detalleServidoresSrvc',
        'globalsController',
        function ($scope,$rootScope,detSerSrvc,gc){
            var ctrl=this;


            //<editor-fold desc="Events Callbacks">
            ctrl.onGetTableData=function (event,lstObServidores) {
                console.log(lstObServidores);
                ctrl.lstObServidores=lstObServidores;
                $scope.lstObServidores=lstObServidores;
            };

            ctrl.onGetFechaData=function (event,lstObFecha) {
                console.log('onGetFechaData ini');

                ctrl.lstObFecha=lstObFecha;
                //Establecer la fecha por defecto
                ctrl.obFechaDefault=lstObFecha[0];

                //Llamar servicios para obtener datos de la tabla

                console.log('onGetFechaData end');
            };

            //Evento seleccion de item de fecha
            ctrl.fechaSelected=function (obSelectedItem) {
                console.log('ctrl.fechaSelected init');

                console.log(obSelectedItem);
                detSerSrvc.getTableData(obSelectedItem.obSrc);


                console.log('ctrl.fechaSelected end');
            };
            //</editor-fold>

            //<editor-fold desc="Component Lifecycle">
            ctrl.$onInit=function () {
                console.log('InitExecuted');

                //Definir atributos
                ctrl.obFechaDefault={};
                //suscribir eventos
                detSerSrvc.suscribe($scope,ctrl.onGetTableData,detSerSrvc.obEvents.TABLE_DATA_RESPONSE);
                detSerSrvc.suscribe($scope,ctrl.onGetFechaData,detSerSrvc.obEvents.GET_FECHA_COMBO_DATA);

                //Obtener datos
                //detSerSrvc.getTableData();
                detSerSrvc.getFechaComboData();


                ctrl.lstObFecha=[
                    {
                        txFecha: "Octubre - 2017",
                        nuId: 201710
                    },
                    {
                        txFecha: "Noviembre - 2017",
                        nuId: 201711
                    }
                ];
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
    .component('detalleServidores', {
        templateUrl:'templates/detalle-servidores.comp.html',
        controller:'detalleServidoresCtrl'
    });
