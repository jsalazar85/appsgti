angular
    .module('RDash')
    .controller('involucradosProyectoCtrl',[
        '$scope',
        '$rootScope',
        '$mdSidenav',
        'etapasProyectoSrvc',
        '$q',
        'proyectosSrvc',
        '$mdToast',
        function ($scope,$rootScope,$mdSidenav,etapaSrvc,$q,proyectosSrvc,$mdToast){
            var ctrl=this;

            //<editor-fold desc="FUNCIONES DE INICIALIZACION"> ///////////////
            ctrl.initModel=function () {
                console.log("involucradosProyectoCtrl.initModel - ini");
                //Controla comportamiento de la forma
                ctrl.forma={};
                ctrl.forma.disables={};

                //ViewModel: Modelo de datos para enlazar con la forma
                ctrl.vm={};
                //MODEL: Modelo de datos
                ctrl.vm.m={};
                ctrl.vm.m.invl={};       //Objeto para contener toda la información del Involucrado

                ctrl.vm.queryInvDefer={
                    defer:null,
                    isRunning:false,
                    lastResult:[]
                };

                ctrl.vm.invproy={
                    bnReporta:false,
                    bnAprueba:false,
                    bnResponsableReporte:false
                };

                ctrl.ons=[]; //Array que guarda los eventos que se inscriben

                //Opciones para el autocompleta
                ctrl.vm.ac={
                    isDisabled:false,
                    noCache:true,
                    searchTextChange:function (txSearch) {
                        console.log(txSearch)
                    },
                    searchText:"",
                    selectedItemChange:function (item) {
                        console.log("selectedItemChange");
                        console.log(item);
                    },
                    querySearch:function (txSearch) {
                        var prom=ctrl.queryInvolucrados(txSearch);
                        return prom;
                    }
                };

                ctrl.initModo();


                //Cargar datos del elemento seleccionadoc
                console.log("selInvolucrado");
                console.log(ctrl.selInvolucrado);
                console.log("txModo");
                console.log(ctrl.txModo);
                if(!_.isEmpty(ctrl.selInvolucrado) && ctrl.txModo == "edicion"){
                    ctrl.initFromSelected(ctrl.selInvolucrado);
                }
                console.log("involucradosProyectoCtrl.initModel - end");
            };

            ctrl.initModo=function () {
                //Vaildar el objeto proyecto

                var res = _.attempt(function (modo) {
                    if (modo == "edicion") {
                        ctrl.forma.modo = "EDICION";
                    } else {
                        ctrl.forma.modo = "NUEVO";
                        //Establecer id
                        ctrl.vm.m.invl.idPrycInvolucrado = proyectosSrvc.getBigIntId(); //ID_PRYC_INVOLUCRADO

                    }
                }, ctrl.txModo);

                if (_.isError(res)) {
                    ctrl.forma.modo = "NUEVO";
                }
            }
            //</editor-fold> ////////////////////


            //<editor-fold desc="FUNCIONES DE MODELO"> ///////////////
            ctrl.getResponseModel=function () {
                console.log("getResponseModel ini");
                var m={};

                m.idInvlTipo=ctrl.vm.selectedTipoInv.idInvlTipo;            //ID_INVL_TIPO
                m.txInvlTipo=ctrl.vm.selectedTipoInv.txInvlTipo;            //TX_INVL_TIPO
                m.idPersona=ctrl.vm.ac.selectedItem.idPersona;                                 //ID_PERSONA
                m.txNombreCompleto=ctrl.vm.ac.selectedItem.txNombreCompleto;                   //TX_NOMBRE_COMPLETO
                m.idLogin=ctrl.vm.ac.selectedItem.idLogin;                     //ID_LOGIN
                m.txLogin=ctrl.vm.ac.selectedItem.txLogin;                     //TX_LOGIN
                m.bnReporta=ctrl.vm.invproy.bnReporta;
                m.bnAprueba=ctrl.vm.invproy.bnAprueba;
                m.bnResponsableReporte=ctrl.vm.invproy.bnResponsableReporte;
                m.idPrycInvolucrado = ctrl.vm.m.invl.idPrycInvolucrado;
                m.bnResponsableReporte = ctrl.vm.invproy.bnResponsableReporte;

                if(m.bnResponsableReporte){
                    _.forEach(ctrl.lstInvolucrados,function (ob) {
                        ob.bnResponsableReporte=false;
                        if(ob.idPrycInvolucrado == m.idPrycInvolucrado){
                            ob.bnResponsableReporte=true;
                        }
                    });
                }

                console.log(ctrl.lstInvolucrados);

                console.log("getResponseModel end");
                return m;
            };

            ctrl.initFromSelected=function (obSelInvl) {
                console.log("initFromSelected - ini");
                console.log(obSelInvl);
                for(var i in ctrl.catTipoInv){
                    if(ctrl.catTipoInv[i].idInvlTipo ==  obSelInvl.idInvlTipo){
                        ctrl.vm.selectedTipoInv=ctrl.catTipoInv[i];
                        break;
                    }
                }

                ctrl.vm.ac.selectedItem={
                    idPersona:obSelInvl.idPersona,
                    txNombreCompleto:obSelInvl.txNombreCompleto,
                    idLogin:obSelInvl.idLogin,
                    txLogin:obSelInvl.txLogin,
                };

                ctrl.vm.invproy.bnReporta=obSelInvl.bnReporta;
                ctrl.vm.invproy.bnAprueba=obSelInvl.bnAprueba;
                //bnResponsableReporte
                ctrl.vm.invproy.bnResponsableReporte=obSelInvl.bnResponsableReporte;

                ctrl.vm.m.invl.idPrycInvolucrado = obSelInvl.idPrycInvolucrado;

                console.log("initFromSelected - end");
            };

            ctrl.queryInvolucrados=function (txSearch) {
                if(!ctrl.vm.queryInvDefer.isRunning){
                    ctrl.vm.queryInvDefer.isRunning=true;
                    var defer=$q.defer();
                    ctrl.vm.queryInvDefer.defer=defer;
                    proyectosSrvc.getInvolucradosBusqueda(txSearch);
                }
                return ctrl.vm.queryInvDefer.defer.promise;
            };

            ctrl.onQueryInvolucrados=function (event,data) {
                console.log("onQueryInvolucrados");
                console.log(data);
                var lstResult=data.data;
                ctrl.vm.queryInvDefer.lastResult=lstResult;
                ctrl.vm.queryInvDefer.defer.resolve(lstResult);
                ctrl.vm.queryInvDefer.isRunning=false;
            };
            //</editor-fold> ////////////////////

            //<editor-fold desc="EVENTOS BOTONES"> ///////////////
            ctrl.cerrar=function () {
                console.log($scope.etapasProyectosComp.$dirty);
                console.log("test");
                ctrl.onCerrar({data:"cerrar"});
            };

            ctrl.guardar=function (){
                if($scope.etapasProyectosComp.$valid){
                    console.log("Guardar");
                    console.log(ctrl.getResponseModel());

                    //Validar que no existe ya el elemento seleccionado
                    if( ctrl.existsPersona(ctrl.vm.ac.selectedItem.idPersona,ctrl.addedInvolucrados) && ctrl.txModo=="nuevo" ){
                        ctrl.showMensaje("La persona seleccionada ya se encuentra añadida");
                    }else{
                        //No existen errores en la forma.
                        ctrl.onGuardar({data:ctrl.getResponseModel()});
                    }


                }else{
                    if(!_.isEmpty($scope.etapasProyectosComp.$error.required)){
                        console.log($scope.etapasProyectosComp.$error.required.length);
                    }
                    //console.log($scope.etapasProyectosComp.$error.required.length);
                }
                //console.log($scope.etapasProyectosComp.$error);
            };

            ctrl.onInicializar=function(event,data){
                console.log("involucradosProyectoCtrl.onInicializar - ini");
                ctrl.selInvolucrado=data.selInvolucrado;
                ctrl.txModo=data.txModo;
                ctrl.addedInvolucrados=data.addedInvolucrados;
                console.log("addedInvolucrados");
                console.log(ctrl.addedInvolucrados);
                ctrl.initModel();
                console.log("involucradosProyectoCtrl.onInicializar - end");
            };
            //</editor-fold> ////////////////////

            //<editor-fold desc="FUNCIONES AUXILIARES"> ///////////////
            ctrl.suscribe=function (scope,callback,txEvent){
                var handler=$rootScope.$on(txEvent,callback);
                //scope.$on('$destroy',handler);
                ctrl.ons.push(handler);
            };

            //Validar que no exista el elemento a añadir
            ctrl.existsPersona=function (idPersona,lstData) {
                console.log("involucradosProyectoCtrl.existsPersona - ini");
                console.log("idPersona");
                console.log(idPersona);
                console.log("lstData");
                console.log(lstData);
                var exist=false;
                for(var i in lstData){
                    if(lstData[i].idPersona == idPersona){
                        exist=true;
                        break;
                    }
                }
                console.log("involucradosProyectoCtrl.existsPersona - end");
                return exist;
            };

            ctrl.showMensaje=function (txMensaje) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(txMensaje)
                        .position('top right')
                        .hideDelay(3000)
                );
            };
            //</editor-fold> ////////////////////

            ctrl.eventoConfirmarSalir=function () {
                var locationChangeStart=$scope.$on('$locationChangeStart',function(event){
                    if($scope.etapasProyectosComp.$dirty){
                        var res=confirm("Existen cambios sin guardar: \n¿Desea salir sin guardar cambios?\n(Los cambios realizados se perderán)");
                        if(!res){
                            event.preventDefault();
                        }
                    }
                });

                ctrl.ons.push(locationChangeStart);
            };

            ctrl.$onInit=function () {
                console.log('InitExecuted -- involucradosProyectoCtrl');

                ctrl.initModel();

                //Registrar eventos
                ctrl.suscribe($scope,ctrl.onInicializar,"involucradosProyectoCtrl.onInicializar");
                proyectosSrvc.suscribe($scope,ctrl.onQueryInvolucrados,proyectosSrvc.e.getInvolucradosBusqueda);
            };

            ctrl.$onDestroy=function () {
                for(var i in ctrl.ons){
                    ctrl.ons[i]();
                }
            };
            //</editor-fold>
        }
    ])
    .component('involucradosProyectoComp', {
        templateUrl:'templates/involucrados-proyecto.comp.html',
        controller:'involucradosProyectoCtrl',
        bindings:{
            catTipoInv:'<',         //Catalog de tipo de inventarios para el select
            onGuardar:'&',          //Funcion a ejecutar para guardar
            onCerrar:'&',
            txModo:'<',             //Indica si el modo es edicion o es nuevo
            lstInvolucrados:'<',     //Listado de involucrados para validar la exitencia
        }
    });