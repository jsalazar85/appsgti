angular
    .module('RDash')
    .controller('catEtapasConsultaCtrl',[
        '$scope',
        '$rootScope',
        '$mdSidenav',
        'catEtapasConsultaSrvc',
        '$mdDialog',
        '$state',
        'catEtapasSrvc',
        '$mdToast',
        function ($scope,$rootScope,$mdSidenav,pdSrvc,$mdDialog,$state,catEtapasSrvc,$mdToast){
            var ctrl=this;

            //<editor-fold desc="FUNCIONES CLICK"> ///////////////
            ctrl.clickNuevo=function () {
                console.log("clickNuevo");
                $state.go("catalogoetapasdetalle",{idPrycEtapa:null});
            };
            ctrl.catEtapaGridClickEditar=function (event,row) {
                console.log("catEtapaGridClickEditar");
                console.log(row);
                var data=row.entity;
                $state.transitionTo("catalogoetapasdetalle",{idPrycEtapa:data.idPrycEtapa});
            };
            ctrl.catEtapaGridClickBorrar=function (event,row) {
                console.log("catEtapaGridClickBorrar");
                console.log(row);
                var data=row.entity;

                //Mostrar ventana de confirmación
                ctrl.showConfirm(event,function () {
                    catEtapasSrvc.delEtapaById(data);
                });
            };
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

            //<editor-fold desc="EVENTOS SERVICIOS"> ///////////////
            ctrl.onGetEtapas=function (event,data) {
                ctrl.grid.data=data;
            };

            ctrl.onDelElement=function (event,data) {
                ctrl.showMensaje("Registro eliminado");
                catEtapasSrvc.getEtapas();
            } ;

            //</editor-fold> ////////////////////



            //<editor-fold desc="INICIALIZADORES"> ///////////////
            ctrl.initModel=function () {
                //Inicializar Grid
                ctrl.grid=ctrl.initGrid();

                //Inscribir a eventos del servicio
                catEtapasSrvc.suscribe($scope,ctrl.onGetEtapas,catEtapasSrvc.e.getEtapas);
                catEtapasSrvc.suscribe($scope,ctrl.onDelElement,catEtapasSrvc.e.delElement);

                //Ejecutar la carga de datos
                catEtapasSrvc.getEtapas();

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
                            field:"txEtapa",
                            name:"ETAPA",
                            type:"string",
                            width:"60%"
                        },
                        {
                            field:"nuSecuencia",
                            name:"SECUENCIA",
                            type:"number",
                            width:"30%",
                            //cellFilter:"date:'yyyy-MM-dd'"
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
    .component('catEtapasConsultaComp', {
        templateUrl:'templates/cat-etapas-consulta.comp.html',
        controller:'catEtapasConsultaCtrl'
    });
