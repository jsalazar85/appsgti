angular
    .module('RDash')
    .controller('catAreasDetalleCtrl',[
        '$scope',
        '$rootScope',
        '$mdSidenav',
        '$mdDialog',
        '$state',
        'catAreasSrvc',
        '$mdToast',
        'isService',
        function ($scope,$rootScope,$mdSidenav,$mdDialog,$state,catAreasSrvc,$mdToast,iss){
            var ctrl=this;

            //<editor-fold desc="FUNCIONES CLICK"> ///////////////
            ctrl.clickGuardar=function () {
                if($scope.catUsuariosDetalleForm.$valid){
                    console.log("clickGuardar");
                    ctrl.vm.m.sd.idSubdireccion = ctrl.vm.selectedSubdir.idSubdireccion;
                    catAreasSrvc.putData(ctrl.vm);
                }
            };

            ctrl.clickSalir=function () {
                console.log("clickSalir");

                //Invocar los eventos del componente
                ctrl.onSalir({data:null,msg:null});
            };
            //</editor-fold> ////////////////////

            //<editor-fold desc="EVENTOS SERVICIOS"> ///////////////
            ctrl.onGetArea=function (event,data) {
                console.log("catAreasDetalleCtrl.onGetArea ini");
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
                ctrl.vm.m.sd.idArea=ob.idArea;
                ctrl.vm.m.sd.txArea=ob.txArea;
                ctrl.vm.m.sd.txAreaabbr=ob.txAreaabbr;
                ctrl.vm.m.sd.bnActivo=(ob.bnActivo==1)?true:false;

                if(!_.isNil(ob.fhCrcn)){
                    ctrl.vm.m.sd.fhCrcn=iss.toDateTimeFromStr1(ob.fhCrcn);
                }

                ctrl.vm.m.sd.idSubdireccion=ob.idSubdireccion;
                ctrl.vm.m.sd.txSubdireccion=ob.txSubdireccion;
                ctrl.vm.m.sd.txSubdirabbr=ob.txSubdirabbr;

                //Obtener el selected item
                if(!_.isNil(ob.idSubdireccion)){
                    for(var i in ctrl.vm.lstSubdir){
                        if(ctrl.vm.lstSubdir[i].idSubdireccion == ob.idSubdireccion){
                            ctrl.vm.selectedSubdir=ctrl.vm.lstSubdir[i];
                            break;
                        }
                    }
                }


                console.log("catAreasDetalleCtrl.onGetArea end");
            };

            ctrl.onPutData=function (event,data) {
                console.log("catAreasDetalleCtrl.onPutData ini");
                console.log(data);
                ctrl.showMensaje("Información guardada exitosamente");
                console.log("catAreasDetalleCtrl.onPutData end");
            };

            ctrl.onGetSubdirecciones=function (event,data) {
                console.log("catAreasDetalleCtrl.onGetSubdirecciones ini");
                console.log(data);
                var res=_.attempt(function (data) {
                    return data.data.data;
                },data);

                if(_.isError(res) || _.isNil(res)){
                    res=data.data;
                }
                var lstSubdir=res;
                console.log(lstSubdir);
                ctrl.vm.lstSubdir=lstSubdir;
                console.log("catAreasDetalleCtrl.onGetSubdirecciones end");
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
                console.log("catAreasDetalleCtrl.getTxModo ini");
                var txModo=_.attempt(function(txModo){
                    var txModo="nuevo";
                    console.log(ctrl.idArea);
                    console.log(iss.isEmptyStr(ctrl.idArea));
                    if(!iss.isEmptyStr(ctrl.idArea)){
                        txModo="edicion";
                    }
                    return txModo;
                },ctrl.txModo);

                console.log(txModo);

                if(_.isError(txModo) || _.isNil(txModo) || txModo=="nuevo"){
                    txModo="nuevo";
                }

                console.log("catAreasDetalleCtrl.getTxModo end");
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
                console.log("catAreasDetalleCtrl.initFormModo ini");
                
                if(ctrl.txModo=="nuevo"){
                    ctrl.form.modo="NUEVO";
                    ctrl.vm.m.sd.idArea=catAreasSrvc.getBigIntId();
                    catAreasSrvc.getSubdirecciones();
                }else{
                    ctrl.form.modo="EDICIÓN";
                    //catAreasSrvc.getAreaById(ctrl.idArea);
                    catAreasSrvc.getCatalogos(ctrl.idArea);
                }
                
                console.log("catAreasDetalleCtrl.initFormModo end");
            };
            //</editor-fold> ////////////////////

            ctrl.$onInit=function () {
                ctrl.initModel();

                //Inscribir a eventos del servicio
                catAreasSrvc.suscribe($scope,ctrl.onGetArea,catAreasSrvc.e.getAreaById);
                catAreasSrvc.suscribe($scope,ctrl.onPutData,catAreasSrvc.e.putData);
                catAreasSrvc.suscribe($scope,ctrl.onGetSubdirecciones,catAreasSrvc.e.getSubdirecciones);

            };
        }
    ])
    .component('catAreasDetalleComp', {
        templateUrl:'templates/cat-areas-detalle.comp.html',
        controller:'catAreasDetalleCtrl',
        bindings:{
            idArea:'@',
            onGuardar:'&',
            onSalir:'&'
        }
    });
