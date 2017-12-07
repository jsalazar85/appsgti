angular
    .module('RDash')
    .controller('catEtapasDetalleCtrl',[
        '$scope',
        '$rootScope',
        '$mdSidenav',
        '$mdDialog',
        '$state',
        'catEtapasSrvc',
        function ($scope,$rootScope,$mdSidenav,$mdDialog,$state,catEtapasSrvc){
            var ctrl=this;

            //<editor-fold desc="FUNCIONES CLICK"> ///////////////
            ctrl.clickGuardar=function () {
                if($scope.catEtapasDetalleForm.$valid){
                    console.log("clickGuardar");

                    //Llamar servicios
                    catEtapasSrvc.putEtapa(ctrl.vm.etapa);

                    //Invocar los eventos del componente
                    ctrl.onGuardar({data:null,msg:null});
                }
            };
            ctrl.clickSalir=function () {
                console.log("clickSalir");

                //Invocar los eventos del componente
                ctrl.onSalir({data:null,msg:null});
            };
            //</editor-fold> ////////////////////

            //<editor-fold desc="EVENTOS SERVICIOS"> ///////////////
            ctrl.onGetEtapaById=function (event,data) {
                //ctrl.grid.data=data;
                ctrl.vm.etapa=data;
            };

            ctrl.onPutEtapaSuccess=function (event,data) {
                //ctrl.grid.data=data;
                console.log("onPutEtapaSuccess");
            };
            //</editor-fold> ////////////////////

            //<editor-fold desc="INICIALIZADORES"> ///////////////
            ctrl.initModel=function () {
                //Inicializar Grid

                //Forma
                ctrl.form={};

                //Parámetros
                ctrl.initFormModo();

                //disbles
                ctrl.form.dsb=[];

                //Inscribir a eventos del servicio
                catEtapasSrvc.suscribe($scope,ctrl.onGetEtapaById,catEtapasSrvc.e.getEtapaById);
                catEtapasSrvc.suscribe($scope,ctrl.onPutEtapaSuccess,catEtapasSrvc.e.putEtapaSuccess);

                //ViewModel
                ctrl.vm={};
                ctrl.vm.etapa={};
                ctrl.vm.etapa.bnActivo=1;

                //Ejecutar servicio si se tiene parámetro
                if(ctrl.form.modo=="EDICIÓN"){
                    catEtapasSrvc.getEtapaById(ctrl.idPrycEtapa);
                }else{
                    //Generar id
                    ctrl.vm.etapa.idPrycEtapa=catEtapasSrvc.getBigIntId();
                }
            };

            ctrl.initFormModo=function(){
                if(_.isEmpty(ctrl.idPrycEtapa)){
                    ctrl.form.modo="NUEVO";
                }else{
                    ctrl.form.modo="EDICIÓN";
                }
            };
            //</editor-fold> ////////////////////

            ctrl.$onInit=function () {
                ctrl.initModel();
            };
        }
    ])
    .component('catEtapasDetalleComp', {
        templateUrl:'templates/cat-etapas-detalle.comp.html',
        controller:'catEtapasDetalleCtrl',
        bindings:{
            idPrycEtapa:'@',
            onGuardar:'&',
            onSalir:'&'
        }
    });
