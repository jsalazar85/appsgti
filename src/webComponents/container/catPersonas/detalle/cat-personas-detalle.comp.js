angular
    .module('RDash')
    .controller('catPersonasDetalleCtrl',[
        '$scope',
        '$rootScope',
        '$mdSidenav',
        '$mdDialog',
        '$state',
        'catPersonasSrvc',
        function ($scope,$rootScope,$mdSidenav,$mdDialog,$state,catPersonasSrvc){
            var ctrl=this;

            //<editor-fold desc="FUNCIONES CLICK"> ///////////////
            ctrl.clickGuardar=function () {
                if($scope.catPersonasDetalleForm.$valid){
                    console.log("clickGuardar");

                    //Llamar servicios
                    catPersonasSrvc.putPersona(ctrl.vm.m);

                    //Invocar los eventos del componente
                    //ctrl.onGuardar({data:null,msg:null});
                }
            };
            ctrl.clickSalir=function () {
                console.log("clickSalir");

                //Invocar los eventos del componente
                ctrl.onSalir({data:null,msg:null});
            };
            //</editor-fold> ////////////////////

            //<editor-fold desc="EVENTOS SERVICIOS"> ///////////////
            ctrl.onGetPersonaById=function (event,data) {
                //ctrl.grid.data=data;
                console.log(data);
                ctrl.vm.m=data;
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
                catPersonasSrvc.suscribe($scope,ctrl.onGetPersonaById,catPersonasSrvc.e.getPersonaById);
                catPersonasSrvc.suscribe($scope,ctrl.onPutEtapaSuccess,catPersonasSrvc.e.putEtapaSuccess);

                //ViewModel
                ctrl.vm={};
                ctrl.vm.m={};

                //Ejecutar servicio si se tiene parámetro
                if(ctrl.form.modo=="EDICIÓN"){
                    catPersonasSrvc.getPersonaById(ctrl.idPersona);
                }else{
                    //Generar id
                    ctrl.vm.m.idPersona=catPersonasSrvc.getBigIntId();
                }
            };

            ctrl.initFormModo=function(){
                if(_.isEmpty(ctrl.idPersona)){
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
    .component('catPersonasDetalleComp', {
        templateUrl:'templates/cat-personas-detalle.comp.html',
        controller:'catPersonasDetalleCtrl',
        bindings:{
            idPersona:'@',
            onGuardar:'&',
            onSalir:'&'
        }
    });
