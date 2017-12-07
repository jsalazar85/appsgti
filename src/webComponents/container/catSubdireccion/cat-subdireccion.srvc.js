angular
    .module('RDash')
    .service('catSubdireccionSrvc',[
        '$rootScope',
        'globalsController',
        'chartDataService',
        'eventService',
        'crudBaseSrvc',
        'isService',
        function ($rootScope,gc,cds,es,cbs,iss){
            var srvc=this;

            //<editor-fold desc="FUNCIONES DE OBTENCION DE DATOS"> ///////////////
            srvc.getRequestSubdireccionById=function (idSubdireccion) {
                var petition=null;
                if(!_.isNil(idSubdireccion)){
                    petition= {
                        url: gc.conf.xsServicesBaseUrl + '/execTabQueryFilter.xsjs',
                        query: {
                            idTab: 8001,
                            idGra: 8,
                            idQry: 9,
                            lstObConditions: [
                                {
                                    txCol: "ID_SUBDIRECCION",
                                    txAlias: "",
                                    varValue: idSubdireccion,
                                    txValueType: "NUMERO",
                                    txLogicOperator: "AND",
                                    txCompOperator: "="
                                }
                            ]
                        },
                        success: function (response) {
                            console.log("8001,8,9: success");
                            srvc.notify(srvc.e.getSubdireccionById, response);
                        },
                        error: function (response, error) {
                            console.log("error");
                            console.log(response);
                        }
                    };
                }

                return petition;
            };

            srvc.getSubdireccionById=function (idSubdireccion) {
                var request=srvc.getRequestSubdireccionById(idSubdireccion);
                if(!_.isNil(request)){
                    cbs.getDataFromRequestObj(request);
                }
            };

            srvc.getRequestSubdirecciones=function () {
                var petition=null;
                petition= {
                    url: gc.conf.xsServicesBaseUrl + '/execTabQueryFilter.xsjs',
                    query: {
                        idTab: 8001,
                        idGra: 8,
                        idQry: 9,
                        lstObConditions: [
                            {
                                txCol: "BN_ACTIVO",
                                txAlias: "",
                                varValue: 1,
                                txValueType: "NUMERO",
                                txLogicOperator: "AND",
                                txCompOperator: "="
                            }
                        ]
                    },
                    success: function (response) {
                        console.log("8001,8,9: success");
                        srvc.notify(srvc.e.getSubdirecciones, response);
                    },
                    error: function (response, error) {
                        console.log("error");
                        console.log(response);
                    }
                };

                return petition;
            };

            srvc.getSubdirecciones=function () {
                var request=srvc.getRequestSubdirecciones();
                cbs.getDataFromRequestObj(request);
            };
            //</editor-fold> ////////////////////


            //<editor-fold desc="FUNCIONES DE TRANSACCIONES"> ///////////////
            srvc.toTabledefFromVm=function (vm) {
                console.log("catSubdireccionSrvc.toTabledefFromVm ini");
                console.log(vm);
                var tabledef={};
                var data={};

                var modelData=vm.m.sd;

                if(!_.isNil(modelData.idSubdireccion)) data.idSubdireccion=modelData.idSubdireccion;
                if(!_.isNil(modelData.txSubdireccion)) data.txSubdireccion=modelData.txSubdireccion;
                if(!_.isNil(modelData.txSubdirabbr)) data.txSubdirabbr=modelData.txSubdirabbr;
                data.bnActivo=iss.toNumberBoolFromVarWithDefault(modelData.bnActivo,1);
                if(!_.isNil(modelData.fhCrcn)) {
                    data.fhCrcn = srvc.getSafeDateTime(modelData.fhCrcn);
                }else{
                    data.fhCrcn = srvc.getSafeDateTime(new Date());
                }

                data.fhModf=srvc.getSafeDateTime(new Date());

                tabledef.tabledef={
                    txSchema:"DATAUSER",
                    txTable:"ASPS_SUBDIRECCIONES"
                };
                tabledef.data=[data];
                console.log(tabledef);
                console.log("catSubdireccionSrvc.toTabledefFromVm end");
                return tabledef;
            };

            srvc.putData=function (obModel) {
                console.log("catSubdireccionSrvc.putData ini");
                var subdir=srvc.toTabledefFromVm(obModel);
                cbs.putArrayData([subdir],srvc.e.putData);
                console.log("catSubdireccionSrvc.putData end");
            };
            //</editor-fold> ////////////////////

            srvc.delElement=function (id) {
                var ob={
                    tabledef:{
                        txSchema:"DATAUSER",
                        txTable:"ASPS_SUBDIRECCIONES"
                    }
                    ,data:[{
                        idSubdireccion:id,
                        bnActivo:0,
                    }]
                };

                cbs.putArrayData([ob],srvc.e.delElement);
            };


            srvc.delEtapaById=function () {
                //TODO: Implementar baja lógica
            };


            //Funcion de inicializacion -------
            srvc.initModel=function () {
                console.log("catSubdireccionSrvc - Init Model - Ini");

                //Heredar de eventos
                srvc=_.extend(srvc,es);

                //Model
                srvc.m={};

                //Ids de query para catagolo de personas
                srvc.m.q={
                    idTab:8001,
                    idGra:9,
                    idQry:null
                };

                //Eventos
                srvc.e={
                    getSubdireccionById:"catSubdireccionSrvc.getSubdireccionById",
                    putData:"catSubdireccionSrvc.putData",
                    getSubdirecciones:"catSubdireccionSrvc.getSubdirecciones",
                    delElement:"catSubdireccionSrvc.delElement",
                };

                console.log("catSubdireccionSrvc - Init Model - end");
            };
            srvc.initModel();
        }
    ]);