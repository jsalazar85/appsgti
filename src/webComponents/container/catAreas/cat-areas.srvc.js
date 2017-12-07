angular
    .module('RDash')
    .service('catAreasSrvc',[
        '$rootScope',
        'globalsController',
        'chartDataService',
        'eventService',
        'crudBaseSrvc',
        'isService',
        'catSubdireccionSrvc',
        function ($rootScope,gc,cds,es,cbs,iss, subdirSrvc){
            var srvc=this;

            //<editor-fold desc="FUNCIONES DE OBTENCION DE DATOS"> ///////////////
            srvc.getRequestAreasById=function (idArea) {
                var petition=null;
                if(!_.isNil(idArea)){
                    petition= {
                        url: gc.conf.xsServicesBaseUrl + '/execTabQueryFilter.xsjs',
                        query: {
                            idTab: 8001,
                            idGra: 10,
                            idQry: 1,
                            lstObConditions: [
                                {
                                    txCol: "ID_AREA",
                                    txAlias: "",
                                    varValue: idArea,
                                    txValueType: "NUMERO",
                                    txLogicOperator: "AND",
                                    txCompOperator: "="
                                }
                            ]
                        },
                        success: function (response) {
                            console.log("8001,8,9: success");
                            srvc.notify(srvc.e.getAreaById, response);
                        },
                        error: function (response, error) {
                            console.log("error");
                            console.log(response);
                        }
                    };
                }

                return petition;
            };

            srvc.getAreaById=function (idArea) {
                var request=srvc.getRequestAreasById(idArea);
                if(!_.isNil(request)){
                    cbs.getDataFromRequestObj(request);
                }
            };

            srvc.getRequestAreas=function () {
                var petition=null;
                petition= {
                    url: gc.conf.xsServicesBaseUrl + '/execTabQueryFilter.xsjs',
                    query: {
                        idTab: 8001,
                        idGra: 10,
                        idQry: 1,
                        lstObConditions: [
                            {
                                txCol: "BN_ACTIVO",
                                txAlias: "area",
                                varValue: 1,
                                txValueType: "NUMERO",
                                txLogicOperator: "AND",
                                txCompOperator: "="
                            }
                        ]
                    },
                    success: function (response) {
                        console.log("8001,10,1: success");
                        srvc.notify(srvc.e.getAreas, response);
                    },
                    error: function (response, error) {
                        console.log("error");
                        console.log(response);
                    }
                };

                return petition;
            };

            srvc.getAreas=function () {
                var request=srvc.getRequestAreas();
                cbs.getDataFromRequestObj(request);
            };

            srvc.getSubdirecciones=function () {
                //var request=subdirSrvc.getRequestSubdirecciones();
                //cbs.getDataFromRequestObj(request);
                subdirSrvc.getSubdirecciones();
            };

            srvc.getCatalogos=function (idArea) {
                var reqAreas=srvc.getRequestAreasById(idArea);
                var reqSubdir=subdirSrvc.getRequestSubdirecciones();

                cds.addWorkTask("catSubdireccionSrvc.reqSubdir",reqSubdir);
                cds.addWorkList("catSubdireccionSrvc.getCatalogos","catSubdireccionSrvc.reqSubdir");

                cds.addWorkTask("catSubdireccionSrvc.reqAreas",reqAreas);
                cds.addWorkList("catSubdireccionSrvc.getCatalogos","catSubdireccionSrvc.reqAreas");

                cds.doWorkList("catSubdireccionSrvc.getCatalogos");
            };
            //</editor-fold> ////////////////////


            //<editor-fold desc="TRANSACCIONES"> ///////////////
            srvc.toTabledefFromVm=function (vm) {
                console.log("catAreasSrvc.toTabledefFromVm ini");
                console.log(vm);
                var tabledef={};
                var data={};

                var modelData=vm.m.sd;

                if(!_.isNil(modelData.idArea)) data.idArea=modelData.idArea;
                if(!_.isNil(modelData.txArea)) data.txArea=modelData.txArea;
                if(!_.isNil(modelData.txAreaabbr)) data.txAreaabbr=modelData.txAreaabbr;
                if(!_.isNil(modelData.idSubdireccion)) data.idSubdireccion=modelData.idSubdireccion;
                data.bnActivo=iss.toNumberBoolFromVarWithDefault(modelData.bnActivo,1);

                if(!_.isNil(modelData.fhCrcn)) {
                    data.fhCrcn = srvc.getSafeDateTime(modelData.fhCrcn);
                }else{
                    data.fhCrcn = srvc.getSafeDateTime(new Date());
                }

                data.fhModf=srvc.getSafeDateTime(new Date());

                tabledef.tabledef={
                    txSchema:"DATAUSER",
                    txTable:"ASPS_SUBDIRAREA"
                };
                tabledef.data=[data];
                console.log(tabledef);
                console.log("catAreasSrvc.toTabledefFromVm end");
                return tabledef;
            };

            srvc.putData=function (obModel) {
                console.log("catAreasSrvc.putData ini");
                var subdir=srvc.toTabledefFromVm(obModel);
                cbs.putArrayData([subdir],srvc.e.putData);
                console.log("catAreasSrvc.putData end");
            };
            //</editor-fold> ////////////////////

            srvc.delElement=function (id) {
                var ob={
                    tabledef:{
                        txSchema:"DATAUSER",
                        txTable:"ASPS_SUBDIRAREA"
                    }
                    ,data:[{
                        idArea:id,
                        bnActivo:0,
                    }]
                };

                cbs.putArrayData([ob],srvc.e.delElement);
            };


            //Funcion de inicializacion -------
            srvc.initModel=function () {
                console.log("catAreasSrvc - Init Model - Ini");

                //Heredar de eventos
                srvc=_.extend(srvc,es);

                //Model
                srvc.m={};

                //Ids de query para catagolo de personas
                srvc.m.q={
                    idTab:8001,
                    idGra:10,
                    idQry:null
                };

                //Eventos
                srvc.e={
                    getAreaById:"catAreasSrvc.getAreaById",
                    putData:"catAreasSrvc.putData",
                    getAreas:"catAreasSrvc.getAreas",
                    delElement:"catAreasSrvc.delElement",
                    getSubdirecciones:subdirSrvc.e.getSubdirecciones
                };

                console.log("catAreasSrvc - Init Model - end");
            };
            srvc.initModel();
        }
    ]);