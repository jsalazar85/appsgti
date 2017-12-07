angular
    .module('RDash')
    .controller('etapasProyectoCtrl',[
        '$scope',
        '$rootScope',
        '$mdSidenav',
        '$q',
        'proyectosSrvc',
        'etapasProyectoSrvc',
        function ($scope,$rootScope,$mdSidenav,$q,proyectosSrvc,srvc){
            var ctrl=this;

            //<editor-fold desc="FUNCIONES DE INICIALIZACION"> ///////////////
            ctrl.initModel=function () {
                console.log("etapasProyectoCtrl.initModel - ini");
                //Controla comportamiento de la forma
                ctrl.forma={};
                ctrl.forma.disables={};

                //ViewModel: Modelo de datos para enlazar con la forma
                ctrl.vm={};

                //Inicializar
                ctrl.fhInicio=null;
                ctrl.fhFin=null;
                ctrl.selectedEtapa=null;
                ctrl.selectedEstatus=null;
                if(!_.isEmpty(ctrl.proyecto)){
                    ctrl.vm.proyecto=ctrl.proyecto;
                }

                if(ctrl.txModo == "edicion"){
                    //ctrl.vm.etapa=ctrl.etapa;
                    //ctrl.selectedEtapa=ctrl.etapa;
                    ctrl.selectedEtapa={
                        txEtapa:ctrl.etapa.etapa.txEtapa,
                        idPrycEtapa:ctrl.etapa.etapa.idPrycEtapa,
                    };
                    ctrl.fhInicio=ctrl.etapa.fhInicio;
                    ctrl.fhFin=ctrl.etapa.fhFin;
                    ctrl.selectedEstatus=ctrl.etapa.estatus;
                    ctrl.idPrycEtapaFecha=ctrl.etapa.idPrycEtapaFecha;
                    //ctrl.bnResponsableReporte=ctrl.etapa.bnResponsableReporte;
                }

                ctrl.etapas=ctrl.getCatalogoEtapasCross();

                //$on eventos
                ctrl.ons=[];
                ctrl.initDisables();
                ctrl.initModo();
                console.log("etapasProyectoCtrl.initModel - end");
            };

            ctrl.initDisables=function () {
                ctrl.forma.disables={
                    "etapas":false,
                    "fhInicio":false,
                    "fhFin":false,
                    "estatus":false,
                    "btnGuardar":false,
                    "btnCerrar":false,
                };
            };

            ctrl.initModo=function () {
                //Vaildar el objeto proyecto

                var res = _.attempt(function (modo) {
                    if (modo == "edicion") {
                        ctrl.forma.modo = "EDICION";
                    } else {
                        ctrl.forma.modo = "NUEVO";
                        //Establecer id ID_PRYC_ETAPA_FECHA
                        ctrl.idPrycEtapaFecha = proyectosSrvc.getBigIntId(); //ID_PRYC_INVOLUCRADO
                    }
                }, ctrl.txModo);

                if (_.isError(res)) {
                    ctrl.forma.modo = "NUEVO";
                }
            };
            //</editor-fold> ////////////////////


            //<editor-fold desc="FUNCIONES DE MODELO"> ///////////////
            ctrl.getResponseModel=function () {
                var m={};

                m.etapa=ctrl.selectedEtapa;
                m.fhInicio=ctrl.fhInicio;
                m.fhFin=ctrl.fhFin;
                m.estatus=ctrl.selectedEstatus;
                m.idPrycEtapaFecha=ctrl.idPrycEtapaFecha;

                return m;
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
                    //No existen errores en la forma.
                    ctrl.onGuardar({data:ctrl.getResponseModel()});
                }else{
                    if(!_.isEmpty($scope.etapasProyectosComp.$error.required)){
                        console.log($scope.etapasProyectosComp.$error.required.length);
                    }
                    //console.log($scope.etapasProyectosComp.$error.required.length);
                }
                //console.log($scope.etapasProyectosComp.$error);
            };

            ctrl.getEtapa=function () {
                var obEtapa={};

                return obEtapa;
            };

            ctrl.onInicializar=function(event,data){
                console.log("etapasProyectoCtrl.onInicializar - ini");

                console.log("txModo");
                ctrl.txModo=data.txModo;
                console.log(ctrl.txModo);

                console.log("etapa");
                ctrl.etapa=data.selectedEtapa;
                console.log(ctrl.etapa);

                ctrl.initModel();
                console.log("etapasProyectoCtrl.onInicializar - end");
            };


            ctrl.suscribe=function (scope,callback,txEvent){
                var handler=$rootScope.$on(txEvent,callback);
                //scope.$on('$destroy',handler);
                ctrl.ons.push(handler);
            };

            //</editor-fold> ////////////////////

            //<editor-fold desc="FUNCIONES AUXILIARES"> ///////////////
            ctrl.getCatalogoEtapasCross=function () {
                console.log("getCatalogoEtapasCross");
                //Obtener los elementos del catalog de etapas que no estén añadidos
                var tmpCatEtapas=[];

                //Obtener grid
                // Avoid throwing errors for invalid selectors.
                var addedEtapas = _.attempt(function(proyecto) {
                    return proyecto.gridEtapas.data;
                }, ctrl.proyecto);

                if (_.isError(addedEtapas)) {
                    addedEtapas = [];
                }
                //console.log(ctrl.catEtapas);
                //console.log(addedEtapas);

                var found=false;

                _.forEach(ctrl.catEtapas,function (o) {
                    //console.log(o);
                    found=false;
                    for(var i in addedEtapas){
                        if(o.idPrycEtapa == addedEtapas[i].etapa.idPrycEtapa){
                            found=true;
                            break;
                        }
                    }

                    if(!found){
                        tmpCatEtapas.push(o);
                    }
                });

                return tmpCatEtapas;
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
                console.log('InitExecuted -- etapasProyectoCtrl');

                ctrl.fromEdit=false;

                //Modelos de catalogos
                srvc.mockData();
                ctrl.etapas=ctrl.catEtapas;
                ctrl.estatus=srvc.model.estatus;

                ctrl.initModel();
                ctrl.eventoConfirmarSalir();

                console.log(ctrl.proyecto);
                console.log(ctrl.onCerrar);
                console.log(ctrl.catEtapas);

                ctrl.etapas=ctrl.catEtapas;

                //Registrar eventos
                ctrl.suscribe($scope,ctrl.onInicializar,"etapasProyectoCtrl.onInicializar");
            };
            //</editor-fold>
        }
    ])
    .component('etapasProyectoComp', {
        templateUrl:'templates/etapas-proyectos.comp.html',
        controller:'etapasProyectoCtrl',
        bindings:{
            proyecto:'<',
            etapa:'<',
            catEtapas:'<',
            onGuardar:'&',
            onCerrar:'&',
            txModo:'<'
        }
    });