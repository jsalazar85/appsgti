angular
    .module('RDash')
    .controller('catAreasConsultaCtrl',[
        '$scope',
        '$rootScope',
        '$mdSidenav',
        '$mdDialog',
        '$state',
        'catAreasSrvc',
        '$mdToast',
        function ($scope,$rootScope,$mdSidenav,$mdDialog,$state,catAreasSrvc,$mdToast){
            var ctrl=this;

            //<editor-fold desc="FUNCIONES CLICK"> ///////////////
            ctrl.clickNuevo=function () {
                console.log("clickNuevo");
                $state.go("catarea",{idArea:null});
            };
            ctrl.onGridClickEditar=function (event,row) {
                console.log("catEtapaGridClickEditar");
                console.log(row);
                var data=row.entity;
                $state.transitionTo("catarea",{idArea:data.idArea});
            };
            ctrl.onGridClickBorrar=function (event,row) {
                console.log("catEtapaGridClickBorrar");
                console.log(row);
                var data=row.entity;

                //Mostrar ventana de confirmación
                ctrl.showConfirm(event,function () {
                    catAreasSrvc.delElement(data.idArea);
                });
            };
            //</editor-fold> ////////////////////

            //<editor-fold desc="EVENTOS SERVICIOS"> ///////////////
            ctrl.onGetAreas=function (event,data) {
                console.log("catAreasConsultaCtrl.onGetAreas ini");
                console.log(data);
                ctrl.grid.data=data.data;
                console.log("catAreasConsultaCtrl.onGetAreas end");
            };

            ctrl.onDelElement=function (event,data) {
                ctrl.showMensaje("Registro eliminado");
                catAreasSrvc.getAreas();
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
                            field:"txArea",
                            name:"Area",
                            type:"string",
                            width:"40%"
                        },
                        {
                            field:"txAreaabbr",
                            name:"Nombre Corto",
                            type:"string",
                            width:"20%"
                        },
                        {
                            field:"txSubdirabbr",
                            name:"Subdirección",
                            type:"string",
                            width:"20%"
                        },
                        {
                            name:"EDITAR",
                            width:"7%",
                            cellTemplate:editCellTemplate,
                            enableSorting:false
                        },
                        {
                            name:"BORRAR",
                            width:"9%",
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

                //Inscribir a eventos del servicio
                catAreasSrvc.suscribe($scope,ctrl.onGetAreas,catAreasSrvc.e.getAreas);
                catAreasSrvc.suscribe($scope,ctrl.onDelElement,catAreasSrvc.e.delElement);

                //Obtener datos del servidor
                catAreasSrvc.getAreas();
            };
        }
    ])
    .component('catAreasConsultaComp', {
        templateUrl:'templates/cat-areas-consulta.comp.html',
        controller:'catAreasConsultaCtrl'
    });
