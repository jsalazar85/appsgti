angular
    .module('RDash')
    .controller('catSubdireccionConsultaCtrl',[
        '$scope',
        '$rootScope',
        '$mdSidenav',
        '$mdDialog',
        '$state',
        'catSubdireccionSrvc',
        '$mdToast',
        function ($scope,$rootScope,$mdSidenav,$mdDialog,$state,catSubdireccionSrvc,$mdToast){
            var ctrl=this;

            //<editor-fold desc="FUNCIONES CLICK"> ///////////////
            ctrl.clickNuevo=function () {
                console.log("clickNuevo");
                $state.go("catsubdir",{idSubdireccion:null});
            };
            ctrl.onGridClickEditar=function (event,row) {
                console.log("catEtapaGridClickEditar");
                console.log(row);
                var data=row.entity;
                $state.transitionTo("catsubdir",{idSubdireccion:data.idSubdireccion});
            };
            ctrl.onGridClickBorrar=function (event,row) {
                console.log("catEtapaGridClickBorrar");
                console.log(row);
                var data=row.entity;

                //Mostrar ventana de confirmación
                ctrl.showConfirm(event,function () {
                    catSubdireccionSrvc.delElement(data.idSubdireccion);
                });
            };
            //</editor-fold> ////////////////////

            //<editor-fold desc="EVENTOS SERVICIOS"> ///////////////
            ctrl.onGetSubdirecciones=function (event,data) {
                console.log("catSubdireccionConsultaCtrl.onGetSubdirecciones ini");
                console.log(data);
                ctrl.grid.data=data.data;
                console.log("catSubdireccionConsultaCtrl.onGetSubdirecciones end");
            };

            ctrl.onDelElement=function (event,data) {
                ctrl.showMensaje("Registro eliminado");
                catSubdireccionSrvc.getSubdirecciones();
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
                            field:"txSubdireccion",
                            name:"Subdirección",
                            type:"string",
                            width:"60%"
                        },
                        {
                            field:"txSubdirabbr",
                            name:"Nombre Corto",
                            type:"string",
                            width:"25%"
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

                //Inscribir a eventos del servicio
                catSubdireccionSrvc.suscribe($scope,ctrl.onGetSubdirecciones,catSubdireccionSrvc.e.getSubdirecciones);
                catSubdireccionSrvc.suscribe($scope,ctrl.onDelElement,catSubdireccionSrvc.e.delElement);

                //Obtener datos del servidor
                catSubdireccionSrvc.getSubdirecciones();
            };
        }
    ])
    .component('catSubdireccionConsultaComp', {
        templateUrl:'templates/cat-subdireccion-consulta.comp.html',
        controller:'catSubdireccionConsultaCtrl'
    });
