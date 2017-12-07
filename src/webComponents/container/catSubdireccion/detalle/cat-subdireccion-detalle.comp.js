angular
    .module('RDash')
    .controller('catSubdireccionDetalleCtrl',[
        '$scope',
        '$rootScope',
        '$mdSidenav',
        '$mdDialog',
        '$state',
        'catSubdireccionSrvc',
        '$mdToast',
        'isService',
        function ($scope,$rootScope,$mdSidenav,$mdDialog,$state,catSubdireccionSrvc,$mdToast,iss){
            var ctrl=this;

            //<editor-fold desc="FUNCIONES CLICK"> ///////////////
            ctrl.clickGuardar=function () {
                if($scope.catUsuariosDetalleForm.$valid){
                    console.log("clickGuardar");
                    catSubdireccionSrvc.putData(ctrl.vm);
                }
            };

            ctrl.clickSalir=function () {
                console.log("clickSalir");

                //Invocar los eventos del componente
                ctrl.onSalir({data:null,msg:null});
            };
            //</editor-fold> ////////////////////

            //<editor-fold desc="EVENTOS SERVICIOS"> ///////////////
            ctrl.onGetSubdireccion=function (event,data) {
                console.log("catSubdireccionDetalleCtrl.onGetSubdireccion ini");
                //Obtener el dato----
                console.log(data);
                var obSubdireccion=data.data[0];

                //Cargar en el modelo el catalogo de tipos
                //ctrl.vm.m.lstLoginTipo=lstLoginTipos;
                ctrl.vm.m.sd.idSubdireccion=obSubdireccion.idSubdireccion;
                ctrl.vm.m.sd.txSubdireccion=obSubdireccion.txSubdireccion;
                ctrl.vm.m.sd.txSubdirabbr=obSubdireccion.txSubdirabbr;
                ctrl.vm.m.sd.bnActivo=(obSubdireccion.bnActivo==1)?true:false;

                if(!_.isNil(obSubdireccion.fhCrcn)){
                    ctrl.vm.m.sd.fhCrcn=iss.toDateTimeFromStr1(obSubdireccion.fhCrcn);
                }

                console.log("catSubdireccionDetalleCtrl.onGetSubdireccion end");
            };

            ctrl.onPutData=function (event,data) {
                console.log("catSubdireccionDetalleCtrl.onPutData ini");
                console.log(data);
                ctrl.showMensaje("Información guardada exitosamente");
                console.log("catSubdireccionDetalleCtrl.onPutData end");
            };
            //</editor-fold> ////////////////////

            //<editor-fold desc="FUNCIONES DE MENSAJES"> ///////////////
            ctrl.showConfirm = function(ev,eliminarCallBack) {
                // Appending dialog to document.body to cover sidenav in docs app
                var confirm = $mdDialog.confirm()
                    .title('ELIMINACIÓN DE REGISTRO')
                    .textContent('¿Está seguro de eliminar el elemento seleccionado?')
                    .ariaLabel('Lucky day')
                    .targetEvent(ev)
                    .ok('ELIMINAR')
                    .cancel('CANCELAR');

                $mdDialog.show(confirm).then(function() {
                    //ELIMINAR REGISTRO
                    console.log("Dialogo cerrado con confirmación para eliminar ");
                    eliminarCallBack();
                }, function() {
                    console.log("Dialono cerrado");
                });
            };

            ctrl.showMensaje=function (txMensaje) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(txMensaje)
                        .position('top right')
                        .hideDelay(3000)
                );
            };
            //</editor-fold>

            //<editor-fold desc="AUXILIARES"> ///////////////
            ctrl.getTxModo=function () {
                console.log("catSubdireccionDetalleCtrl.getTxModo ini");
                var txModo=_.attempt(function(txModo){
                    var txModo="nuevo";
                    console.log(ctrl.idSubdireccion);
                    console.log(iss.isEmptyStr(ctrl.idSubdireccion));
                    if(!iss.isEmptyStr(ctrl.idSubdireccion)){
                        txModo="edicion";
                    }
                    return txModo;
                },ctrl.txModo);

                console.log(txModo);

                if(_.isError(txModo) || _.isNil(txModo) || txModo=="nuevo"){
                    txModo="nuevo";
                }

                console.log("catSubdireccionDetalleCtrl.getTxModo end");
                return txModo;
            };
            //</editor-fold>

            //<editor-fold desc="INICIALIZADORES"> ///////////////
            ctrl.initModel=function () {
                //Forma
                ctrl.form={};

                //ViewModel
                ctrl.vm={};
                ctrl.vm.m={};
                ctrl.vm.m.sd={};        //Modelo de Subdireccion
                
                //Obtener modo
                ctrl.txModo=ctrl.getTxModo();

                //Parámetros
                ctrl.initFormModo();
            };

            ctrl.initFormModo=function(){
                console.log("catSubdireccionDetalleCtrl.initFormModo ini");
                
                if(ctrl.txModo=="nuevo"){
                    ctrl.form.modo="NUEVO";
                    ctrl.vm.m.sd.idSubdireccion=catSubdireccionSrvc.getBigIntId();
                }else{
                    ctrl.form.modo="EDICIÓN";
                    catSubdireccionSrvc.getSubdireccionById(ctrl.idSubdireccion);
                }
                
                console.log("catSubdireccionDetalleCtrl.initFormModo end");
            };
            //</editor-fold> ////////////////////

            ctrl.$onInit=function () {
                ctrl.initModel();

                //Inscribir a eventos del servicio
                catSubdireccionSrvc.suscribe($scope,ctrl.onGetSubdireccion,catSubdireccionSrvc.e.getSubdireccionById);
                catSubdireccionSrvc.suscribe($scope,ctrl.onPutData,catSubdireccionSrvc.e.putData);
            };
        }
    ])
    .component('catSubdireccionDetalleComp', {
        templateUrl:'templates/cat-subdireccion-detalle.comp.html',
        controller:'catSubdireccionDetalleCtrl',
        bindings:{
            idSubdireccion:'@',
            onGuardar:'&',
            onSalir:'&'
        }
    });
