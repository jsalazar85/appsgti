angular
    .module('RDash')
    .controller('proyectosConsultaCtrl',[
        '$scope',
        '$rootScope',
        '$mdSidenav',
        '$mdDialog',
        '$state',
        'proyectosSrvc',
        '$mdToast',
        function ($scope,$rootScope,$mdSidenav,$mdDialog,$state,proyectosSrvc,$mdToast){
            var ctrl=this;

            //<editor-fold desc="FUNCIONES CLICK"> ///////////////
            ctrl.clickNuevo=function () {
                console.log("clickNuevo");
                $state.go("proyectosnuevo",{idProyecto:null});
            };
            ctrl.onGridClickEditar=function (event,row) {
                console.log("catEtapaGridClickEditar");
                console.log(row);
                var data=row.entity;
                $state.transitionTo("proyectosnuevo",{idProyecto:data.idProyecto});
            };
            ctrl.onGridClickBorrar=function (event,row) {
                console.log("catEtapaGridClickBorrar");
                console.log(row);
                var data=row.entity;

                //Mostrar ventana de confirmación
                ctrl.showConfirm(event,function () {
                    proyectosSrvc.delElement(data.idLogin);
                });
            };
            //</editor-fold> ////////////////////

            //<editor-fold desc="EVENTOS SERVICIOS"> ///////////////
            ctrl.onGetProyectos=function (event,data) {
                console.log("onGetProyectos - ini");
                console.log(data);
                ctrl.grid.data=data.data;
                console.log("onGetProyectos - fin");
            };

            ctrl.onDelElement=function (event,data) {
                ctrl.showMensaje("Registro eliminado");
                proyectosSrvc.getUsuarios();
            } ;


            //</editor-fold> ////////////////////


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

            //<editor-fold desc="INICIALIZADORES"> ///////////////
            ctrl.initModel=function () {
                //Inicializar Grid
                ctrl.grid=ctrl.initGrid();
            };

            ctrl.initGrid=function () {
                var editCellTemplate = '<div class="ngCellText ui-grid-cell-contents" style="cursor: pointer;" >' +
                    ' <div ng-click="grid.appScope.onGridClickEditar($event,row)"><i class="fa fa-pencil" aria-hidden="true"></i></div>' +
                    '</div>';
                var deleteCellTemplate = '<div class="ngCellText ui-grid-cell-contents" style="cursor: pointer;" >' +
                    ' <div ng-click="grid.appScope.onGridClickBorrar($event,row)"><i class="fa fa-eraser" aria-hidden="true"></i></div>' +
                    '</div>';
                var gridOpts={
                    columnDefs:[
                        {
                            name:"Editar",
                            width:"7%",
                            cellTemplate:editCellTemplate,
                            enableSorting:false
                        },
                        {
                            name:"Borrar",
                            width:"7%",
                            cellTemplate:deleteCellTemplate,
                            enableSorting:false
                        },
                        {
                            field:"txNmbrProy",
                            name:"Poyecto",
                            type:"string",
                            width:"35%"
                        },
                        {
                            field:"txNmbrProyCrto",
                            name:"Nombre corto",
                            type:"string",
                            width:"25%"
                        },
                        {
                            field:"txAreaResponsable",
                            name:"Área responsable",
                            type:"string",
                            width:"25%"
                        },
                        {
                            field:"txSubidreccionResponsable",
                            name:"Subdirección responsable",
                            type:"string",
                            width:"30%"
                        },
                        {
                            field:"txFolioCii",
                            name:"Folio CII",
                            type:"string",
                            width:"17%"
                        },
                        {
                            field:"txFolioJira",
                            name:"Folio JIRA",
                            type:"string",
                            width:"17%"
                        },

                        {
                            field:"fhInicio",
                            name:"Fecha inicio",
                            type:"string",
                            width:"15%"
                        },
                        {
                            field:"fhFin",
                            name:"Fecha fin",
                            type:"string",
                            width:"15%"
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

                //Inscribir a eventos del servicio
                proyectosSrvc.suscribe($scope,ctrl.onDelElement,proyectosSrvc.e.delElement);
                proyectosSrvc.suscribe($scope,ctrl.onGetProyectos,proyectosSrvc.e.getProyectos);

                //Ejecutar la carga de datos
                proyectosSrvc.getProyectos();
            };
        }
    ])
    .component('proyectosConsultaComp', {
        templateUrl:'templates/proyectos-consulta.comp.html',
        controller:'proyectosConsultaCtrl'
    });
