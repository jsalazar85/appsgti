angular
    .module('RDash')
    .controller('avanceProyectoConsultaCtrl',[
        '$scope',
        '$rootScope',
        '$mdSidenav',
        '$mdDialog',
        '$state',
        'avanceProyectoSrvc',
        '$mdToast',
        function ($scope,$rootScope,$mdSidenav,$mdDialog,$state,avanceProyectoSrvc,$mdToast){
            var ctrl=this;

            //<editor-fold desc="FUNCIONES CLICK"> ///////////////
            ctrl.clickNuevo=function (event,row) {
                console.log("clickNuevo");
                console.log(row);
                var data=row.entity;
                console.log(data);
                $state.transitionTo("reporteavance",{idProyecto:data.idProyecto});
            };
            ctrl.onGridClickEditar=function (event,row) {
                console.log("clickNuevo");
                console.log(row);
                var data=row.entity;
                console.log(data);
                $state.transitionTo("reporteavance",{idProyecto:data.idProyecto});
            };
            ctrl.onGridClickBorrar=function (event,row) {
                console.log("catEtapaGridClickBorrar");
                console.log(row);
                var data=row.entity;

                //Mostrar ventana de confirmación
                ctrl.showConfirm(event,function () {
                    avanceProyectoSrvc.delElement(data.idArea);
                });
            };
            //</editor-fold> ////////////////////

            //<editor-fold desc="EVENTOS SERVICIOS"> ///////////////
            ctrl.onGetAvancesAll=function (event,data) {
                console.log("avanceProyectoConsultaCtrl.onGetAvancesAll ini");
                console.log(data);
                ctrl.grid.data=data.data;
                console.log("avanceProyectoConsultaCtrl.onGetAvancesAll end");
            };

            ctrl.onDelElement=function (event,data) {
                ctrl.showMensaje("Registro eliminado");
                avanceProyectoSrvc.getAreas();
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
                            field:"txNmbrProy",
                            name:"Proyecto",
                            type:"string",
                            width:"50%"
                        },
                        {
                            field:"txNmbrProyCrto",
                            name:"Nombre Corto",
                            type:"string",
                            width:"20%"
                        },
                        {
                            field:"txAreaResponsable",
                            name:"Área responsable",
                            type:"string",
                            width:"40%"
                        },
                        {
                            field:"txAreaSolicitante",
                            name:"Área solicitante",
                            type:"string",
                            width:"40%"
                        },
                        {
                            field:"prReal",
                            name:"Avance Real",
                            type:"number",
                            width:"12%"
                        },
                        {
                            field:"prSigCorte",
                            name:"Avance Sig. Corte",
                            type:"number",
                            width:"15%"
                        },
                        {
                            field:"fhReporte",
                            name:"Ultimo Reporte",
                            type:"string",
                            width:"13%"
                        },
                        {
                            name:"Editar",
                            width:"9%",
                            cellTemplate:editCellTemplate,
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

            //<editor-fold desc="COMBOS AREAS"> ///////////////
            ctrl.onChangeSubdirSolicitante=function () {
                console.log(ctrl.vm.selSubdirSolicitante);

                ctrl.vm.selAreaSolicitante=null;

                var tmpArr=[];
                for(var i in ctrl.vm.lstArea){
                    if(ctrl.vm.lstArea[i].idSubdireccion == ctrl.vm.selSubdirSolicitante.idSubdireccion){
                        tmpArr.push(ctrl.vm.lstArea[i]);
                    }
                }
                ctrl.vm.lstAreaSolicitante=tmpArr;
            };

            ctrl.onChangeSubdirResponsable=function () {
                console.log(ctrl.vm.lstAreaResponsable);

                ctrl.vm.selAreaResponsable=null;

                var tmpArr=[];
                for(var i in ctrl.vm.lstArea){
                    if(ctrl.vm.lstArea[i].idSubdireccion == ctrl.vm.selSubdirResponsable.idSubdireccion){
                        tmpArr.push(ctrl.vm.lstArea[i]);
                    }
                }
                ctrl.vm.lstAreaResponsable=tmpArr;
            };
            //</editor-fold>

            ctrl.$onInit=function () {
                ctrl.initModel();

                //Inscribir a eventos del servicio
                avanceProyectoSrvc.suscribe($scope,ctrl.onGetAvancesAll,avanceProyectoSrvc.e.getAvancesAll);
                avanceProyectoSrvc.suscribe($scope,ctrl.onDelElement,avanceProyectoSrvc.e.delElement);

                //Obtener datos del servidor
                avanceProyectoSrvc.getAvancesAll();
            };
        }
    ])
    .component('avanceProyectoConsultaComp', {
        templateUrl:'templates/avance-proyecto-consulta.comp.html',
        controller:'avanceProyectoConsultaCtrl'
    });
