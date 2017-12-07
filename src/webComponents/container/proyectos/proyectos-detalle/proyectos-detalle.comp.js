angular
    .module('RDash')
    .controller('proyectosDetalleCtrl',[
        '$scope',
        '$rootScope',
        '$mdSidenav',
        '$mdDialog',
        'proyectosSrvc',
        'isService',
        '$mdToast',
        function ($scope,$rootScope,$mdSidenav,$mdDialog,proyectosSrvc,iss,$mdToast){
            var ctrl=this;

            //<editor-fold desc="FUNCIONES DE INICIALIZACION"> ///////////////
            ctrl.initFormModo=function(){
                /*
                console.log("proyectosDetalleCtrl ctrl.initFormModo");
                console.log(ctrl.idProyecto);
                if(_.isEmpty(ctrl.idProyecto)){
                    ctrl.form.modo="NUEVO";
                    //ctrl.vm.m.p.idProyecto=catUsuariosSrvc.getBigIntId();
                }else{
                    ctrl.form.modo="EDICIÓN";
                }
                */
                if(ctrl.txModo=="nuevo"){
                    ctrl.form.modo="NUEVO";
                    //Establecer ids para los objetos
                    ctrl.vm.m.p.idProyecto=proyectosSrvc.getBigIntId();         //proyectos
                    ctrl.vm.m.pf.idPrycFecha=proyectosSrvc.getBigIntId();        //proyectos fechas
                }else{
                    ctrl.form.modo="EDICIÓN";
                }
            };

            ctrl.initGridEtapas=function () {
                var editCellTemplate = '<div class="ngCellText ui-grid-cell-contents" style="cursor: pointer;" >' +
                    ' <div ng-click="grid.appScope.onGridClickEditar($event,row)"><i class="fa fa-pencil" aria-hidden="true"></i></div>' +
                    '</div>';
                var deleteCellTemplate = '<div class="ngCellText ui-grid-cell-contents" style="cursor: pointer;" >' +
                    ' <div ng-click="grid.appScope.onGridClickBorrar($event,row)"><i class="fa fa-eraser" aria-hidden="true"></i></div>' +
                    '</div>';
                var gridOpts={
                    columnDefs:[
                        {
                            field:"etapa.txEtapa",
                            name:"Etapa",
                            type:"string",
                            width:"49%"
                        },
                        {
                            field:"fhInicio",
                            name:"Fecha Inicio",
                            type:"date",
                            width:"24%",
                            cellFilter:"date:'yyyy-MM-dd'"
                        },
                        {
                            field:"fhFin",
                            name:"Fecha Fin",
                            type:"date",
                            width:"24%",
                            cellFilter:"date:'yyyy-MM-dd'"
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

            ctrl.initGridInvolucrados=function () {
                var editCellTemplate = '<div class="ngCellText ui-grid-cell-contents" style="cursor: pointer;" >' +
                    ' <div ng-click="grid.appScope.onGridClickEditarInvolucrados($event,row)"><i class="fa fa-pencil" aria-hidden="true"></i></div>' +
                    '</div>';
                var deleteCellTemplate = '<div class="ngCellText ui-grid-cell-contents" style="cursor: pointer;" >' +
                    ' <div ng-click="grid.appScope.onGridClickBorrarInvolucrados($event,row)"><i class="fa fa-eraser" aria-hidden="true"></i></div>' +
                    '</div>';
                var gridOpts={
                    columnDefs:[
                        {
                            field:"txNombreCompleto",
                            name:"NOMBRE COMPLETO",
                            type:"string",
                            width:"49%"
                        },
                        {
                            field:"txInvlTipo",
                            name:"TIPO INVOLUCRADO",
                            type:"string",
                            width:"24%",
                        },
                        {
                            field:"bnReporta",
                            name:"REPORTA",
                            type:"number",
                            width:"10%",
                        },
                        {
                            field:"bnAprueba",
                            name:"APRUEBA",
                            type:"number",
                            width:"10%",
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

            ctrl.initModel=function(){
                console.log("proyectosDetalleCtrl.initModel - ini");
                ctrl.txModo=ctrl.getTxModo();
                console.log(ctrl.txModo);

                ctrl.vm={};
                ctrl.vm.m={};
                ctrl.vm.m.p={};         //proyectos
                ctrl.vm.m.pf={};        //proyectos fechas
                ctrl.vm.m.e={};         //Etapas
                ctrl.vm.m.invl={};         //Involucrados
                ctrl.vm.gridEtapas={};  //GridEtapas
                ctrl.vm.modalEtapaAccion=null;  //Indica el tipo de accion desde la pantalla padre que se tuvo.

                ctrl.form={};           //Objeto de Forma

                ctrl.vm.gridEtapas=ctrl.initGridEtapas();
                ctrl.vm.gridEtapas.data=[];

                ctrl.vm.gridInvl=ctrl.initGridInvolucrados();
                ctrl.vm.gridInvl.data=[];

                ctrl.initFormModo();
                console.log("proyectosDetalleCtrl.initModel - end");
            };
            //</editor-fold> ////////////////////

            //<editor-fold desc="CLICKS"> ///////////////
            ctrl.clickGuardar=function () {
                console.log("proyectosDetalleCtrl clickGuardar");

                //Ejecutar proceso de guardado
                proyectosSrvc.getTableDefFromVM(ctrl.vm);
            };

            ctrl.onPutData=function (event,data) {
                console.log("guardado");
                ctrl.showMensaje("Información guardada exitosamente");
            };

            ctrl.clickSalir=function () {
                console.log("proyectosDetalleCtrl clickSalir");
                console.log(ctrl.vm);
                ctrl.onSalir({data:null,msg:null});
            };
            //</editor-fold>

            //<editor-fold desc="FUNCIONES DE MENSAJES"> ///////////////
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
            //</editor-fold>

            //<editor-fold desc="EVENTOS DE SERVICIO"> ///////////////
            ctrl.onGetTipoProyecto=function (event,data){
                console.log("proyectosDetalleCtrl.onGetTipoProyecto ini");
                //console.log(data);
                var res=data.data.data;
                ctrl.vm.lstTipoProyecto=res;
                console.log(res);
                console.log("proyectosDetalleCtrl.onGetTipoProyecto end");
            };

            ctrl.onGetEstatus=function (event,data){
                console.log("proyectosDetalleCtrl.onGetEstatus ini");
                //console.log(data);
                var res=data.data.data;
                ctrl.vm.lstEstatus=res;
                console.log(res);
                console.log("proyectosDetalleCtrl.onGetEstatus end");
            };

            ctrl.onGetEtapas=function (event,data){
                console.log("proyectosDetalleCtrl.onGetEtapas ini");
                //console.log(data);
                var data=data.data;
                console.log(data);
                ctrl.vm.m.e=data;
                console.log(ctrl.vm.m.e);
                console.log("proyectosDetalleCtrl.onGetEtapas end");
            };

            ctrl.onGetRequestEtapasProyectoById=function (event,data) {
                console.log("proyectosDetalleCtrl.onGetRequestEtapasProyectoById ini");
                //console.log(data);
                var res=data.data.data;
                console.log(res);

                var lstGridEtapa=[];
                var ob;
                for(var i in res){
                    ob={};
                    ob.etapa={};
                    ob.etapa.txEtapa=res[i].txEtapa;
                    ob.etapa.idPrycEtapa=res[i].idPrycEtapa;
                    ob.etapa.bnResponsableReporte=res[i].bnResponsableReporte;
                    ob.idProyecto =res[i].idProyecto;
                    ob.idPrycEtapaFecha =res[i].idPrycEtapaFecha;

                    if(!_.isNil(res[i].fhInicio)){
                        ob.fhInicio=iss.toDateTimeFromStr1(res[i].fhInicio);
                    }

                    if(!_.isNil(res[i].fhFin)){
                        ob.fhFin=iss.toDateTimeFromStr1(res[i].fhFin);
                    }

                    lstGridEtapa.push(ob);
                }
                ctrl.vm.gridEtapas.data=lstGridEtapa;
                console.log(lstGridEtapa);

                console.log("proyectosDetalleCtrl.onGetRequestEtapasProyectoById end");
            };

            ctrl.onGetAreas=function (event,data){
                console.log("proyectosDetalleCtrl.onGetAreas - ini");

                console.log(data);
                var res=data.data.data;
                ctrl.vm.lstArea=res;

                console.log("proyectosDetalleCtrl.onGetAreas - end");
            };

            ctrl.onGetSubdirecciones=function (event,data){
                console.log("proyectosDetalleCtrl.onGetSubdirecciones - ini");

                console.log(data);
                var res=data.data.data;
                ctrl.vm.lstSubdir=res;

                console.log("proyectosDetalleCtrl.onGetSubdirecciones - end");
            };

            ctrl.onGetConsultaInvolucrados=function (event,data){
                console.log("proyectosDetalleCtrl.onGetConsultaInvolucrados - ini");
                //console.log(data);
                var data=data.data;
                console.log(data);
                ctrl.vm.m.invl=data;
                console.log(ctrl.vm.m.invl);
                console.log("proyectosDetalleCtrl.onGetConsultaInvolucrados - fin");
            };

            ctrl.onGetProyecto=function (event,data){
                console.log("proyectosDetalleCtrl.onGetProyecto - ini");
                var data=data.data.data[0];
                console.log(data);

                //Cargar informacion en el modelo
                ctrl.vm.m.p.idProyecto=data.idProyecto;
                ctrl.vm.m.p.txFolioCii=data.txFolioCii;
                ctrl.vm.m.p.fhSolicitud=iss.toDateFromStr1(data.fhSolicitud);//data.fhSolicitud;
                ctrl.vm.m.p.txFolioDcs=data.txFolioDcs;
                ctrl.vm.m.p.txFolioJira=data.txFolioJira;
                ctrl.vm.m.p.txNmbrProy=data.txNmbrProy;
                ctrl.vm.m.p.txNmbrProyCrto=data.txNmbrProyCrto;

                if(iss.isEmptyStr(data.idPrycFecha)){
                    ctrl.vm.m.pf.idPrycFecha=proyectosSrvc.getBigIntId();
                }else{
                    ctrl.vm.m.pf.idPrycFecha=data.idPrycFecha;
                }
                ctrl.vm.m.pf.fhInicio= iss.toDateFromStr1(data.fhInicio);
                ctrl.vm.m.pf.fhFin=iss.toDateFromStr1(data.fhFin);//data.fhFin;
                ctrl.vm.m.pf.fhFinEstimado=iss.toDateFromStr1(data.fhFinEstimado);//data.fhFinEstimado;

                //CARGAR COMBOS
                for(var i in ctrl.vm.lstArea){
                    if(ctrl.vm.lstArea[i].idArea == data.idAreaSolicitante){
                        ctrl.vm.lstAreaSolicitante=[ctrl.vm.lstArea[i]];
                        ctrl.vm.selAreaSolicitante=ctrl.vm.lstAreaSolicitante[0];

                        //Obtener la gerencia
                        for(var j in ctrl.vm.lstSubdir){
                            if(ctrl.vm.lstSubdir[j].idSubdireccion == ctrl.vm.selAreaSolicitante.idSubdireccion){
                                ctrl.vm.selSubdirSolicitante=ctrl.vm.lstSubdir[j];
                                break;
                            }
                        }
                    }
                    if(ctrl.vm.lstArea[i].idArea == data.idAreaResponsable){
                        ctrl.vm.lstAreaResponsable=[ctrl.vm.lstArea[i]];
                        ctrl.vm.selAreaResponsable=ctrl.vm.lstAreaResponsable[0];

                        //Obtener la gerencia
                        for(var j in ctrl.vm.lstSubdir){
                            if(ctrl.vm.lstSubdir[j].idSubdireccion == ctrl.vm.selAreaResponsable.idSubdireccion){
                                ctrl.vm.selSubdirResponsable=ctrl.vm.lstSubdir[j];
                                break;
                            }
                        }
                    }
                }

                //CARGAR TIPO DE PROYECTO
                _.forEach(ctrl.vm.lstTipoProyecto,function (item) {
                    if(item.idTipoProyecto == data.idTipoProyecto){
                        ctrl.vm.selTipoProyecto=item;
                        return false;
                    }
                });

                //CARGAR ESTATUS
                _.forEach(ctrl.vm.lstEstatus,function (item) {
                    if(item.idEstatus == data.idEstatus){
                        ctrl.vm.selEstatus=item;
                        return false;
                    }
                });



                console.log("proyectosDetalleCtrl.onGetProyecto - fin");
            };

            ctrl.onGetInvolucrados=function (event,data){
                console.log("proyectosDetalleCtrl.onGetInvolucrados - ini");
                var lstInvlData=[];
                var tmpObj;
                var data=data.data.data;
                console.log(data);

                for(var i in data){
                    tmpObj={};

                    tmpObj.idPrycInvolucrado=data[i].idPrycInvolucrado;
                    tmpObj.idProyecto=data[i].idProyecto;
                    tmpObj.idPersona=data[i].idPersona;
                    tmpObj.txNombreCompleto=data[i].txNombreCompleto;
                    tmpObj.txCorreo=data[i].txCorreo;
                    tmpObj.txTitulo=data[i].txTitulo;
                    tmpObj.idInvlTipo=data[i].idInvlTipo;
                    tmpObj.txInvlTipo=data[i].txInvlTipo;
                    tmpObj.txInvlTipoDscr=data[i].txInvlTipoDscr;
                    tmpObj.bnActivo=(data[i].bnActivo==1)?true:false;
                    tmpObj.bnReporta=(data[i].bnReporta==1)?true:false;
                    tmpObj.bnAprueba=(data[i].bnAprueba==1)?true:false;
                    tmpObj.bnResponsableReporte=(data[i].bnResponsableReporte==1)?true:false;

                    lstInvlData.push(tmpObj);
                }

                console.log(lstInvlData);
                ctrl.vm.gridInvl.data=lstInvlData;
                console.log("proyectosDetalleCtrl.onGetInvolucrados - fin");
            };
            //</editor-fold>

            //<editor-fold desc="FUNCIONES PARA ETAPAS"> ///////////////
            ctrl.clickAgregarEtapa=function(ev){
                console.log("modalEtapa");

                ctrl.vm.modalEtapaAccion="nuevo";
                ctrl.selectedEtapa=null;
                $mdDialog.show({
                    contentElement: '#etapaProyectoCompDlg',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false
                });
                $rootScope.$emit('etapasProyectoCtrl.onInicializar',{selectedEtapa:null,txModo:ctrl.vm.modalEtapaAccion});
            };

            ctrl.onGridClickEditar=function (ev,row) {
                console.log(ev);
                console.log(row.entity);

                ctrl.vm.modalEtapaAccion="edicion";
                ctrl.selectedEtapa=row.entity;
                //$scope.$apply();
                $mdDialog.show({
                    contentElement: '#etapaProyectoCompDlg',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false
                });
                $rootScope.$emit('etapasProyectoCtrl.onInicializar',{selectedEtapa:ctrl.selectedEtapa, txModo:ctrl.vm.modalEtapaAccion});
            };
            ctrl.onGridClickBorrar=function (event,row) {
                console.log("catEtapaGridClickBorrar");
                console.log(row);
                var data=row.entity;

                //Mostrar ventana de confirmación
                ctrl.showConfirm(event,function () {
                    //Eliminar del grid
                    _.remove(ctrl.vm.gridEtapas.data,function (n) {
                        return n.etapa.idPrycEtapa == data.etapa.idPrycEtapa
                    });
                });
            };

            ctrl.modalEtapaCerrar=function (data) {
                console.log("modalEtapaCerrar");
                $mdDialog.hide();
            };

            //Funciones para guardar (nuevo o en edicion) el elemento seleccionado
            ctrl.modalEtapaAgregar=function (data) {
                console.log("modalEtapaAgregar");
                console.log(data);


                if(ctrl.vm.modalEtapaAccion=="nuevo"){
                    ctrl.vm.gridEtapas.data.push(data);
                }else{
                    for(var i in ctrl.vm.gridEtapas.data){
                        if(ctrl.vm.gridEtapas.data[i].idPrycEtapaFecha == data.idPrycEtapaFecha){
                            ctrl.vm.gridEtapas.data[i]=data;
                            break;
                        }
                    }
                }

                /*
                 var nuevoElemento=true;
                 var newArr=[];
                 _.forEach(ctrl.vm.etapas,function (o) {
                 if(o.etapa.idPrycEtapa == data.etapa.idPrycEtapa){
                 nuevoElemento=false;
                 newArr.push(data);
                 }else{
                 newArr.push(o);
                 }
                 });
                 if(nuevoElemento){
                 newArr.push(data);
                 }
                 ctrl.vm.etapas=newArr;
                 ctrl.uiGridEtapa.data=ctrl.vm.etapas;
                 */

                $mdDialog.hide();
            };

            //Invoca el modal para editar un registro
            ctrl.modalEtapaEdicion=function(ev,row){
                console.log(ev);
                console.log(row.entity);

                ctrl.vm.modalEtapaAccion="edicion";
                ctrl.selectedEtapa=row.entity;
                //$scope.$apply();
                $mdDialog.show({
                    contentElement: '#etapaProyectoCompDlg',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false
                });
                $rootScope.$emit('etapasProyectoCtrl.onInicializar',{selectedEtapa:ctrl.selectedEtapa,txModo:ctrl.vm.modalEtapaAccion});
            };
            //</editor-fold>

            //<editor-fold desc="FUNCIONES PARA LOS INVOLUCRADOS"> ///////////////
            ctrl.clickAgregarInvl=function(ev){
                console.log("Modal Involucrado");
                ctrl.vm.modalInvolucradosAccion="nuevo";
                ctrl.vm.selectedInvolucrado=null;
                $mdDialog.show({
                    contentElement: '#involucradoProyectoCompDlg',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false
                });
                //$rootScope.$emit('involucradosProyectoCtrl.onInicializar',{selInvolucrado:null,txModo:ctrl.vm.modalInvolucradosAccion});
                $rootScope.$emit("involucradosProyectoCtrl.onInicializar",{selInvolucrado:null,txModo:ctrl.vm.modalInvolucradosAccion,addedInvolucrados:ctrl.vm.gridInvl.data});
            };

            ctrl.onGridClickEditarInvolucrados=function (ev,row) {
                console.log("onGridClickEditarInvolucrados - ini");
                console.log(row.entity);
                ctrl.vm.modalInvolucradosAccion="edicion";

                $mdDialog.show({
                    contentElement: '#involucradoProyectoCompDlg',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false
                });
                $rootScope.$emit("involucradosProyectoCtrl.onInicializar",{selInvolucrado:row.entity,txModo:ctrl.vm.modalInvolucradosAccion,addedInvolucrados:ctrl.vm.gridInvl.data});
                console.log("onGridClickEditarInvolucrados - end");
            };

            ctrl.onGridClickBorrarInvolucrados=function (event,row) {
                console.log("catEtapaGridClickBorrar");
                console.log(row);
                var data=row.entity;

                //Mostrar ventana de confirmación
                ctrl.showConfirm(event,function () {
                    //Eliminar del grid
                    _.remove(ctrl.vm.gridInvl.data,function (n) {
                        return n.idPrycInvolucrado == data.idPrycInvolucrado
                    });
                });
            };

            ctrl.onModalAgregarInvl=function (data) {
                console.log("Modal Agregar involucrado");
                console.log(data);

                if(ctrl.vm.modalInvolucradosAccion=="nuevo"){
                    ctrl.vm.gridInvl.data.push(data);
                }else{
                    for(var i in ctrl.vm.gridInvl.data){
                        if(ctrl.vm.gridInvl.data[i].idPrycInvolucrado == data.idPrycInvolucrado){
                            ctrl.vm.gridInvl.data[i]=data;
                            break;
                        }
                    }
                }

                $mdDialog.hide();
            };
            //</editor-fold>

            //<editor-fold desc="AUXILIARES"> ///////////////
            ctrl.getTxModo=function () {
                var txModo=_.attempt(function(txModo){
                    var txModo="nuevo";
                    if(!iss.isEmptyStr(ctrl.idProyecto)){
                        txModo="edicion";
                    }
                    return txModo;
                },ctrl.txModo);

                if(_.isError(txModo) || _.isEmpty(txModo)){
                    var txModo="nuevo";
                }

                return txModo;
            };
            //</editor-fold>

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
                console.log('proyectosDetalleCtrl.$onInit ini');

                ctrl.initModel();

                //Inscribir eventos
                proyectosSrvc.suscribe($scope,ctrl.onGetEtapas,proyectosSrvc.e.getEtapas);
                proyectosSrvc.suscribe($scope,ctrl.onGetConsultaInvolucrados,proyectosSrvc.e.getConsultaInvolucrados);
                proyectosSrvc.suscribe($scope,ctrl.onPutData,proyectosSrvc.e.putData);
                proyectosSrvc.suscribe($scope,ctrl.onGetProyecto,proyectosSrvc.e.getProyecto);
                proyectosSrvc.suscribe($scope,ctrl.onGetInvolucrados,proyectosSrvc.e.getInvolucrados);
                //getRequestEtapasProyectoById
                proyectosSrvc.suscribe($scope,ctrl.onGetRequestEtapasProyectoById,proyectosSrvc.e.getRequestEtapasProyectoById);

                proyectosSrvc.suscribe($scope,ctrl.onGetAreas,proyectosSrvc.e.getAreas);
                proyectosSrvc.suscribe($scope,ctrl.onGetSubdirecciones,proyectosSrvc.e.getSubdirecciones);
                proyectosSrvc.suscribe($scope,ctrl.onGetTipoProyecto,proyectosSrvc.e.getTipoProyecto);
                proyectosSrvc.suscribe($scope,ctrl.onGetEstatus,proyectosSrvc.e.getEstatus);




                //Cargar catalogos
                console.log(ctrl.idProyecto);
                proyectosSrvc.getCatalogos(ctrl.idProyecto);
                console.log('proyectosDetalleCtrl.$onInit end');

            };
        }
    ])
    .component('proyectosDetalle', {
        templateUrl:'templates/proyectos-detalle.comp.html',
        controller:'proyectosDetalleCtrl',
        bindings:{
            idProyecto:'@',
            onGuardar:'&',
            onSalir:'&'
        }
    });
