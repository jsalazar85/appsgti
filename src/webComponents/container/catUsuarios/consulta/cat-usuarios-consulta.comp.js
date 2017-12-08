angular
    .module('RDash')
    .controller('catUsuariosConsultaCtrl',[
        '$scope',
        '$rootScope',
        '$mdSidenav',
        '$mdDialog',
        '$state',
        'catUsuariosSrvc',
        '$mdToast',
        function ($scope,$rootScope,$mdSidenav,$mdDialog,$state,catUsuariosSrvc,$mdToast){
            var ctrl=this;

            //<editor-fold desc="FUNCIONES CLICK"> ///////////////
            ctrl.clickNuevo=function () {
                console.log("clickNuevo");
                $state.go("catalogousuariosdetalle",{idLogin:null});
            };
            ctrl.onGridClickEditar=function (event,row) {
                console.log("catEtapaGridClickEditar");
                console.log(row);
                var data=row.entity;
                $state.transitionTo("catalogousuariosdetalle",{idLogin:data.idLogin});
            };
            ctrl.onGridClickBorrar=function (event,row) {
                console.log("catEtapaGridClickBorrar");
                console.log(row);
                var data=row.entity;

                //Mostrar ventana de confirmación
                ctrl.showConfirm(event,function () {
                    catUsuariosSrvc.delElement(data.idLogin);
                });
            };
            //</editor-fold> ////////////////////

            //<editor-fold desc="EVENTOS SERVICIOS"> ///////////////
            ctrl.onGetUsuarios=function (event,data) {
                ctrl.grid.data=data;
            };

            ctrl.onDelElement=function (event,data) {
                ctrl.showMensaje("Registro eliminado");
                catUsuariosSrvc.getUsuarios();
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
                catUsuariosSrvc.suscribe($scope,ctrl.onGetUsuarios,catUsuariosSrvc.e.getUsuarios);
                catUsuariosSrvc.suscribe($scope,ctrl.onDelElement,catUsuariosSrvc.e.delElement);

                //Ejecutar la carga de datos
                catUsuariosSrvc.getUsuarios();
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
                            field:"txLogin",
                            name:"Usuario",
                            type:"string",
                            width:"20%"
                        },
                        {
                            field:"txNombre",
                            name:"Nombre",
                            type:"string",
                            width:"20%"
                        },
                        {
                            field:"txApellido",
                            name:"Apellido",
                            type:"string",
                            width:"20%"
                        },
                        {
                            field:"txCorreo",
                            name:"Correo",
                            type:"string",
                            width:"20%"
                        },
                        {
                            field:"txLoginTipo",
                            name:"Tipo Seguridad",
                            type:"string",
                            width:"20%"
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
    .component('catUsuariosConsultaComp', {
        templateUrl:'templates/cat-usuarios-consulta.comp.html',
        controller:'catUsuariosConsultaCtrl'
    });
