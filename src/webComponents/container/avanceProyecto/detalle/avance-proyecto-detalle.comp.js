angular
    .module('RDash')
    .controller('avanceProyectoDetalleCtrl',[
        '$scope',
        '$rootScope',
        '$mdSidenav',
        '$mdDialog',
        '$state',
        'avanceProyectoSrvc',
        '$mdToast',
        'isService',
        function ($scope,$rootScope,$mdSidenav,$mdDialog,$state,avanceProyectoSrvc,$mdToast,iss){
            var ctrl=this;

            //<editor-fold desc="FUNCIONES CLICK"> ///////////////
            ctrl.clickGuardar=function () {
                if($scope.catUsuariosDetalleForm.$valid){
                    console.log("clickGuardar");
                    avanceProyectoSrvc.putData(ctrl.vm);
                }
            };

            ctrl.clickSalir=function () {
                console.log("clickSalir");

                //Invocar los eventos del componente
                ctrl.onSalir({data:null,msg:null});
            };
            //</editor-fold> ////////////////////

            //<editor-fold desc="EVENTOS SERVICIOS"> ///////////////
            ctrl.onGetAvance=function (event,data) {
                console.log("avanceProyectoDetalleCtrl.onGetAvance ini");
                console.log(data);
                var res=_.attempt(function (data) {
                    return data.data.data[0];
                },data);

                if(_.isError(res) || _.isNil(res)){
                    res=data.data[0];
                }

                var ob=res;

                //Cargar en el modelo el catalogo de tipos
                //ctrl.vm.m.lstLoginTipo=lstLoginTipos;
                ctrl.vm.m.p.idProyecto=ob.idProyecto;
                ctrl.vm.m.p.txNmbrProy=ob.txNmbrProy;
                ctrl.vm.m.p.txNmbrProyCrto=ob.txNmbrProyCrto;
                //ctrl.vm.m.p.bnActivo=(ob.bnActivo==1)?true:false;


                if(!_.isNil(ob.fhReporte)){
                    ctrl.vm.m.av.fhReporteAnt=iss.toDateFromStr1Date(ob.fhReporte);
                    ctrl.vm.m.av.fhReporteAnt.setDate(ctrl.vm.m.av.fhReporteAnt.getDate()+1);
                }


                if(!_.isNil(ob.prSigCorte)){
                    ctrl.vm.m.av.prComprometido=ob.prSigCorte==null?0:parseInt(ob.prSigCorte.replace("%",""));
                }else{
                    ctrl.vm.m.av.prComprometido=0;
                }
                ctrl.vm.m.av.fhReporte=iss.toDateFromStr1Date(ob.fhReporte);
                ctrl.vm.m.av.prReal=ob.prReal==null?0:parseInt(ob.prReal.replace("%",""));
                ctrl.vm.m.av.prSigCorte=ob.prSigCorte==null?0:parseInt(ob.prSigCorte.replace("%",""));
                ctrl.vm.m.av.txAccnSemana=ob.txAccnSemana;
                ctrl.vm.m.av.txAccnSiguiente=ob.txAccnSiguiente;
                ctrl.vm.m.av.txAccnRiesgos=ob.txAccnRiesgos;
                ctrl.vm.m.av.idPrycSeguimiento=avanceProyectoSrvc.getBigIntId();

                console.log("avanceProyectoDetalleCtrl.onGetAvance end");
            };

            ctrl.onPutData=function (event,data) {
                console.log("avanceProyectoDetalleCtrl.onPutData ini");
                console.log(data);
                ctrl.showMensaje("Información guardada exitosamente");
                console.log("avanceProyectoDetalleCtrl.onPutData end");
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
                console.log("avanceProyectoDetalleCtrl.getTxModo ini");
                var txModo=_.attempt(function(txModo){
                    var txModo="nuevo";
                    console.log(ctrl.idProyecto);
                    console.log(iss.isEmptyStr(ctrl.idProyecto));
                    if(!iss.isEmptyStr(ctrl.idProyecto)){
                        txModo="edicion";
                    }
                    return txModo;
                },ctrl.txModo);

                console.log(txModo);

                if(_.isError(txModo) || _.isNil(txModo) || txModo=="nuevo"){
                    txModo="nuevo";
                }

                console.log("avanceProyectoDetalleCtrl.getTxModo end");
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
                ctrl.vm.m.p={};        //Modelo de Subdireccion
                ctrl.vm.m.av={};        //Avance
                
                //Obtener modo
                ctrl.txModo=ctrl.getTxModo();

                //Parámetros
                ctrl.initFormModo();
            };

            ctrl.initFormModo=function(){
                console.log("avanceProyectoDetalleCtrl.initFormModo ini");
                
                if(ctrl.txModo=="nuevo"){
                    console.log("No puede no existir id de proyecto");
                    //TODO: Mandar a página de grid de consulta
                }else{
                    ctrl.form.modo="EDICIÓN";
                    avanceProyectoSrvc.getAvance(ctrl.idProyecto);
                }
                
                console.log("avanceProyectoDetalleCtrl.initFormModo end");
            };
            //</editor-fold> ////////////////////

            ctrl.$onInit=function () {
                ctrl.initModel();
                //Inscribir a eventos del servicio
                avanceProyectoSrvc.suscribe($scope,ctrl.onGetAvance,avanceProyectoSrvc.e.getAvance);
               //avanceProyectoSrvc.suscribe($scope,ctrl.onPutData,avanceProyectoSrvc.e.putData);
                //avanceProyectoSrvc.suscribe($scope,ctrl.onGetSubdirecciones,avanceProyectoSrvc.e.getSubdirecciones);
            };
        }
    ])
    .component('avanceProyectoDetalleComp', {
        templateUrl:'templates/avance-proyecto-detalle.comp.html',
        controller:'avanceProyectoDetalleCtrl',
        bindings:{
            idProyecto:'@',
            onGuardar:'&',
            onSalir:'&'
        }
    });
