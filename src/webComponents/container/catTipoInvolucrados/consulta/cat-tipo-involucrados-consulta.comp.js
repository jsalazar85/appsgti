angular
    .module('RDash')
    .controller('catTipoInvolucradosConsultaCtrl',[
        '$scope',
        '$rootScope',
        '$mdSidenav',
        '$mdDialog',
        '$state',
        'catTipoInvolucradosSrvc',
        '$mdToast',
        function ($scope,$rootScope,$mdSidenav,$mdDialog,$state,catTipoInvolucradosSrvc,$mdToast){
            var ctrl=this;

            //<editor-fold desc="FUNCIONES CLICK"> ///////////////
            ctrl.clickNuevo=function () {
                console.log("clickNuevo");
                $state.go("catalogotipoinvolucradosdetalle",{idInvlTipo:null});
            };

            ctrl.onGridClickEditar=function (event,row) {
                console.log("catEtapaGridClickEditar");
                console.log(row);
                var data=row.entity;
                $state.transitionTo("catalogotipoinvolucradosdetalle",{idInvlTipo:data.idInvlTipo});
            };

            ctrl.onGridClickBorrar=function (event,row) {
                console.log("catEtapaGridClickBorrar");
                console.log(row);
                var data=row.entity;

                //Mostrar ventana de confirmación
                ctrl.showConfirm(event,function () {
                    catTipoInvolucradosSrvc.delElement(data);
                });
            };
            //</editor-fold> ////////////////////

            //<editor-fold desc="EVENTOS SERVICIOS"> ///////////////
            ctrl.onGetConsulta=function (event,data) {
                ctrl.grid.data=data;
            };

            ctrl.onDelElement=function (event,data) {
                ctrl.showMensaje("Registro eliminado");
                catTipoInvolucradosSrvc.getConsulta();
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

                //Inscribir a eventos del servicio
                catTipoInvolucradosSrvc.suscribe($scope,ctrl.onGetConsulta,catTipoInvolucradosSrvc.e.getConsulta);
                catTipoInvolucradosSrvc.suscribe($scope,ctrl.onDelElement,catTipoInvolucradosSrvc.e.delElement);

                //Ejecutar la carga de datos
                catTipoInvolucradosSrvc.getConsulta();
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
                            field:"txInvlTipo",
                            name:"Tipo involucrado",
                            type:"string",
                            width:"25%"
                        },
                        {
                            field:"txInvlTipoDscr",
                            name:"Descripción",
                            type:"string",
                            width:"40%"
                        },
                        {
                            field:"nuOrden",
                            name:"Orden",
                            type:"number",
                            width:"10%"
                        },
                        {
                            name:"Editar",
                            width:"7%",
                            cellTemplate:editCellTemplate,
                            enableSorting:false
                        },
                        {
                            name:"Borrar",
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
            };
        }
    ])
    .component('catTipoInvolucradosConsultaComp', {
        templateUrl:'templates/cat-tipo-involucrados-consulta.comp.html',
        controller:'catTipoInvolucradosConsultaCtrl'
    });
