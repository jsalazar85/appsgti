angular
    .module('RDash')
    .controller('catTipoInvolucradosDetalleCtrl',[
        '$scope',
        '$rootScope',
        '$mdSidenav',
        '$mdDialog',
        '$state',
        'catTipoInvolucradosSrvc',
        '$mdToast',
        function ($scope,$rootScope,$mdSidenav,$mdDialog,$state,catTipoInvolucradosSrvc,$mdToast){
            var ctrl=this;

            //<editor-fold desc="FUNCIONES CLICK"> ///////////////
            ctrl.clickGuardar=function () {
                if($scope.catUsuariosDetalleForm.$valid){
                    console.log("clickGuardar");

                    //Validar el nombre del usuario (que no se repita)
                    console.log(ctrl.vm.m.i.idInvlTipo);

                    catTipoInvolucradosSrvc.putDataEntities(ctrl.vm.m);
                }
            };

            ctrl.clickSalir=function () {
                console.log("clickSalir");

                //Invocar los eventos del componente
                ctrl.onSalir({data:null,msg:null});
            };
            //</editor-fold> ////////////////////

            //<editor-fold desc="EVENTOS SERVICIOS"> ///////////////
            ctrl.onGetDataDetalleById=function (event,data) {
                //Obtener el dato----
                console.log("onGetDataDetalleById");
                var response=data.data.data[0];
                console.log(response);

                //Cargar datos:
                ctrl.vm.m.i.idInvlTipo=response.idInvlTipo;
                ctrl.vm.m.i.txInvlTipo=response.txInvlTipo; //TX_INVL_TIPO
                ctrl.vm.m.i.nuOrden=response.nuOrden; //NU_ORDEN
                ctrl.vm.m.i.txInvlTipoDscr=response.txInvlTipoDscr; //TX_INVL_TIPO_DSCR
                ctrl.vm.m.i.bnActivo=response.bnActivo; //BN_ACTIVO
            };

            ctrl.onPutDataResponse=function (event,data) {
                console.log(data);
                ctrl.showMensaje("Información guardada exitosamente");
            };
            //</editor-fold> ////////////////////

            ctrl.showMensaje=function (txMensaje) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(txMensaje)
                        .position('top right')
                        .hideDelay(3000)
                );
            };


            //<editor-fold desc="INICIALIZADORES"> ///////////////
            ctrl.initModel=function () {
                //Inicializar Grid

                //Forma
                ctrl.form={};

                //ViewModel
                ctrl.vm={};
                ctrl.vm.m={};
                ctrl.vm.m.i={};

                //Parámetros
                ctrl.initFormModo();

                //disbles
                ctrl.form.dsb=[];

                //Inscribir a eventos del servicio
                catTipoInvolucradosSrvc.suscribe($scope,ctrl.onGetDataDetalleById,catTipoInvolucradosSrvc.e.getDataDetalleById);
                catTipoInvolucradosSrvc.suscribe($scope,ctrl.onPutDataResponse,catTipoInvolucradosSrvc.e.putDataEntities);

                /*
                catTipoInvolucradosSrvc.suscribe($scope,ctrl.onGetUsuarioById,catTipoInvolucradosSrvc.e.getUsuarioById);
                catTipoInvolucradosSrvc.suscribe($scope,ctrl.onGetCountTxUsuario,catTipoInvolucradosSrvc.e.getCountTxUsuario);
                catTipoInvolucradosSrvc.suscribe($scope,ctrl.onGetRoles,catTipoInvolucradosSrvc.e.getRoles);

                */
                //catTipoInvolucradosSrvc.suscribe($scope,ctrl.onPutEtapaSuccess,catTipoInvolucradosSrvc.e.putEtapaSuccess);
            };

            ctrl.initFormModo=function(){
                console.log("ctrl.initFormModo");
                //--ID_INVL_TIPO
                console.log(ctrl.idInvlTipo);
                if(_.isEmpty(ctrl.idInvlTipo)){
                    ctrl.form.modo="NUEVO";
                    ctrl.vm.m.i.idInvlTipo=catTipoInvolucradosSrvc.getBigIntId();
                    ctrl.vm.m.i.bnActivo=1;
                }else{
                    ctrl.form.modo="EDICIÓN";
                    catTipoInvolucradosSrvc.getDataDetalleById(ctrl.idInvlTipo);
                }
            };
            //</editor-fold> ////////////////////

            ctrl.$onInit=function () {
                ctrl.initModel();
            };
        }
    ]).component('catTipoInvolucradosDetalleComp', {
             templateUrl:'templates/cat-tipo-involucrados-detalle.comp.html',
             controller:'catTipoInvolucradosDetalleCtrl',
             bindings:{
                 idInvlTipo:'@',
                 onGuardar:'&',
                 onSalir:'&'
            }
 });

