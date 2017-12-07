angular
    .module('RDash')
    .controller('catUsuariosDetalleCtrl',[
        '$scope',
        '$rootScope',
        '$mdSidenav',
        '$mdDialog',
        '$state',
        'catUsuariosSrvc',
        '$mdToast',
        function ($scope,$rootScope,$mdSidenav,$mdDialog,$state,catUsuariosSrvc,$mdToast){
            var ctrl=this;

            //<editor-fold desc="FUNCIONES CLICK"> ///////////////
            ctrl.clickGuardar=function () {
                if($scope.catUsuariosDetalleForm.$valid){
                    console.log("clickGuardar");

                    //Validar el nombre del usuario (que no se repita)
                    console.log(ctrl.vm.m.u.txLogin);

                    var idLogin=null;
                    if(ctrl.form.modo=="EDICIÓN"){
                        idLogin=ctrl.vm.m.u.idLogin;
                    }
                    catUsuariosSrvc.getCountTxUsuario(ctrl.vm.m.u.txLogin,idLogin);
                }
            };

            ctrl.clickSalir=function () {
                console.log("clickSalir");

                //Invocar los eventos del componente
                ctrl.onSalir({data:null,msg:null});
            };
            //</editor-fold> ////////////////////

            //<editor-fold desc="EVENTOS SERVICIOS"> ///////////////
            ctrl.onGetLoginTipo=function (event,data) {
                //Obtener el dato----
                console.log(data);
                var lstLoginTipos=data.data.data;
                console.log(lstLoginTipos);

                //Cargar en el modelo el catalogo de tipos
                ctrl.vm.m.lstLoginTipo=lstLoginTipos;

            };

            ctrl.onGetRoles=function (event,data) {
                //Obtener el dato----
                console.log(data);
                var lst=data.data.data;
                console.log(lst);

                //Cargar en el modelo el catalogo de tipos
                ctrl.vm.m.lstRoles=lst;
            };

            ctrl.onGetUsuarioById=function (event,data) {
                //Obtener el dato----
                console.log(data);
                var response=data.data.data[0];
                console.log(response);

                //Cargar datos:
                ctrl.vm.m.p.idPersona=response.idPersona;
                ctrl.vm.m.p.txNombre=response.txNombre;
                ctrl.vm.m.p.txApellido=response.txApellido;
                ctrl.vm.m.p.txCorreo=response.txCorreo;
                ctrl.vm.m.p.txTitulo=response.txTitulo;

                ctrl.vm.m.u.idLogin=response.idLogin;
                ctrl.vm.m.u.txLogin=response.txLogin;
                ctrl.vm.m.u.txPwd=response.txPwd;

                for(var i in ctrl.vm.m.lstLoginTipo){
                    if(ctrl.vm.m.lstLoginTipo[i].idLoginTipo==response.idLoginTipo){
                        ctrl.vm.m.selectedLoginTipo= ctrl.vm.m.lstLoginTipo[i];
                    }
                }

                for(var i in ctrl.vm.m.lstRoles){
                    if(ctrl.vm.m.lstRoles[i].idRol==response.idRol){
                        ctrl.vm.m.selectedRol= ctrl.vm.m.lstRoles[i];
                    }
                }
            };

            ctrl.onGetCountTxUsuario=function (event,data) {
                console.log("onGetCountTxUsuario INI");
                console.log(data);
                var response=data;

                if(response.nuCount<=0){
                    //Guardar
                    catUsuariosSrvc.putDataEntities(ctrl.vm.m);
                }else{
                    ctrl.showMensaje("Nombre de usuario ya existe");
                }
            };

            ctrl.onPutUsuario=function (event,data) {
                console.log(data);
                ctrl.showMensaje("Información guardada exitosamente");
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

            //<editor-fold desc="INICIALIZADORES"> ///////////////
            ctrl.initModel=function () {
                //Inicializar Grid

                //Forma
                ctrl.form={};

                //ViewModel
                ctrl.vm={};
                ctrl.vm.m={};
                ctrl.vm.m.u={};
                ctrl.vm.m.p={};
                ctrl.vm.m.selectedLoginTipo={};


                //Parámetros
                ctrl.initFormModo();

                //disbles
                ctrl.form.dsb=[];

                //Inscribir a eventos del servicio
                catUsuariosSrvc.suscribe($scope,ctrl.onGetLoginTipo,catUsuariosSrvc.e.getLoginTipo);
                catUsuariosSrvc.suscribe($scope,ctrl.onGetUsuarioById,catUsuariosSrvc.e.getUsuarioById);
                catUsuariosSrvc.suscribe($scope,ctrl.onGetCountTxUsuario,catUsuariosSrvc.e.getCountTxUsuario);
                catUsuariosSrvc.suscribe($scope,ctrl.onGetRoles,catUsuariosSrvc.e.getRoles);
                catUsuariosSrvc.suscribe($scope,ctrl.onPutUsuario,catUsuariosSrvc.e.putUsuario);

                //catUsuariosSrvc.suscribe($scope,ctrl.onPutEtapaSuccess,catUsuariosSrvc.e.putEtapaSuccess);
            };

            ctrl.initFormModo=function(){
                console.log("ctrl.initFormModo");
                console.log(ctrl.idLogin);
                if(_.isEmpty(ctrl.idLogin)){
                    ctrl.form.modo="NUEVO";
                    ctrl.vm.m.p.idPersona=catUsuariosSrvc.getBigIntId();
                    ctrl.vm.m.u.idLogin=catUsuariosSrvc.getBigIntId();
                }else{
                    ctrl.form.modo="EDICIÓN";
                }
            };
            //</editor-fold> ////////////////////

            ctrl.$onInit=function () {
                ctrl.initModel();
                catUsuariosSrvc.getData(ctrl.idLogin);
            };
        }
    ])
    .component('catUsuariosDetalleComp', {
        templateUrl:'templates/cat-usuarios-detalle.comp.html',
        controller:'catUsuariosDetalleCtrl',
        bindings:{
            idLogin:'@',
            onGuardar:'&',
            onSalir:'&'
        }
    });
