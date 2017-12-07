angular
    .module('RDash')
    .controller('catPersonasConsultaCtrl',[
        '$scope',
        '$rootScope',
        '$mdSidenav',
        '$mdDialog',
        '$state',
        'catPersonasSrvc',
        function ($scope,$rootScope,$mdSidenav,$mdDialog,$state,catPersonasSrvc){
            var ctrl=this;

            //<editor-fold desc="FUNCIONES CLICK"> ///////////////
            ctrl.clickNuevo=function () {
                console.log("clickNuevo");
                $state.go("catalogopersonasdetalle",{idPersona:null});
            };
            ctrl.catEtapaGridClickEditar=function (event,row) {
                console.log("catEtapaGridClickEditar");
                console.log(row);
                var data=row.entity;
                $state.transitionTo("catalogopersonasdetalle",{idPersona:data.idPersona});
            };
            ctrl.catEtapaGridClickBorrar=function (event,row) {
                console.log("catEtapaGridClickBorrar");
                console.log(row);
            };
            //</editor-fold> ////////////////////

            //<editor-fold desc="EVENTOS SERVICIOS"> ///////////////
            ctrl.onGetPersonas=function (event,data) {
                ctrl.grid.data=data;
            };
            //</editor-fold> ////////////////////



            //<editor-fold desc="INICIALIZADORES"> ///////////////
            ctrl.initModel=function () {
                //Inicializar Grid
                ctrl.grid=ctrl.initGrid();

                //Inscribir a eventos del servicio
                catPersonasSrvc.suscribe($scope,ctrl.onGetPersonas,catPersonasSrvc.e.getPersonas);

                //Ejecutar la carga de datos
                catPersonasSrvc.getPersonas();
            };
            ctrl.initGrid=function () {
                var editCellTemplate = '<div class="ngCellText ui-grid-cell-contents" style="cursor: pointer;" >' +
                    ' <div ng-click="grid.appScope.catEtapaGridClickEditar($event,row)"><i class="fa fa-pencil" aria-hidden="true"></i></div>' +
                    '</div>';
                var deleteCellTemplate = '<div class="ngCellText ui-grid-cell-contents" style="cursor: pointer;" >' +
                    ' <div ng-click="grid.appScope.catEtapaGridClickBorrar($event,row)"><i class="fa fa-eraser" aria-hidden="true"></i></div>' +
                    '</div>';
                var gridOpts={
                    columnDefs:[
                        {
                            field:"txNombre",
                            name:"NOMBRE",
                            type:"string",
                            width:"25%"
                        },
                        {
                            field:"txApellido",
                            name:"APELLIDO",
                            type:"string",
                            width:"25%"
                        },
                        {
                            field:"txCorreo",
                            name:"CORREO",
                            type:"string",
                            width:"25%"
                        },
                        {
                            field:"txTitulo",
                            name:"TITULO",
                            type:"string",
                            width:"25%"
                        },
                        {
                            name:"EDITAR",
                            width:"5%",
                            cellTemplate:editCellTemplate,
                            enableSorting:false
                        },
                        {
                            name:"BORRAR",
                            width:"5%",
                            cellTemplate:deleteCellTemplate,
                            enableSorting:false
                        },
                    ]
                };
                //Asignar el scope
                gridOpts.appScopeProvider=ctrl;
                gridOpts.data=[];
                //Asignar al grid
                return gridOpts;
            };
            //</editor-fold> ////////////////////

            ctrl.$onInit=function () {
                ctrl.initModel();
            };
        }
    ])
    .component('catPersonasConsultaComp', {
        templateUrl:'templates/cat-personas-consulta.comp.html',
        controller:'catPersonasConsultaCtrl'
    });
