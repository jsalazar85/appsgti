angular
    .module('RDash')
    .service('avanceProyectoSrvc',[
        '$rootScope',
        'globalsController',
        'chartDataService',
        'eventService',
        'crudBaseSrvc',
        'isService',
        'catAreasSrvc',
        'catSubdireccionSrvc',
        'appSecService',
        function ($rootScope,gc,cds,es,cbs,iss, catAreasSrvc,catSubdireccionSrvc,appSecService){
            var srvc=this;

            //<editor-fold desc="FUNCIONES DE OBTENCION DE DATOS"> ///////////////
            srvc.getRequestAvanceById=function (idProyecto) {
                var petition=null;
                if(!_.isNil(idProyecto)){
                    petition= {
                        url: gc.conf.xsServicesBaseUrl + '/execTabQueryFilter.xsjs',
                        query: {
                            idTab: 8001,
                            idGra: 12,
                            idQry: 1,
                            lstObConditions: [
                                {
                                    txCol: "ID_PROYECTO",
                                    txAlias: "p",
                                    varValue: idProyecto,
                                    txValueType: "NUMERO",
                                    txLogicOperator: "AND",
                                    txCompOperator: "="
                                }
                            ]
                        },
                        success: function (response) {
                            console.log("8001,12,1: success");
                            srvc.notify(srvc.e.getAvance, response);
                        },
                        error: function (response, error) {
                            console.log("error");
                            console.log(response);
                        }
                    };
                }

                return petition;
            };

            srvc.getAvance=function (idProyecto) {
                var request=srvc.getRequestAvanceById(idProyecto);
                if(!_.isNil(request)){
                    cbs.getDataFromRequestObj(request);
                }
            };

            srvc.getRequestAvances=function () {
                var petition=null;
                petition= {
                    url: gc.conf.xsServicesBaseUrl + '/execTabQueryFilter.xsjs',
                    query: {
                        idTab: 8001,
                        idGra: 12,
                        idQry: 1,
                        lstObConditions: [
                            {
                                txCol:"ID_LOGIN",
                                txAlias:"logins",
                                varValue:appSecService.usr.idLogin,
                                txValueType:"NUMERO",
                                txLogicOperator:"AND",
                                txCompOperator:"="
                            },
                            {
                                txCol:"BN_APLICA",
                                txAlias:"subdirLogin",
                                varValue:1,
                                txValueType:"NUMERO",
                                txLogicOperator:"AND",
                                txCompOperator:"="
                            }

                        ]
                    },
                    success: function (response) {
                        console.log("8001,12,1: success");
                        srvc.notify(srvc.e.getAvancesAll, response);
                    },
                    error: function (response, error) {
                        console.log("error");
                        console.log(response);
                    }
                };
                return petition;
            };

            srvc.getAvancesAll=function () {
                var request=srvc.getRequestAvances();
                if(!_.isNil(request)){
                    cbs.getDataFromRequestObj(request);
                }
            };
            //</editor-fold> ////////////////////


            //<editor-fold desc="TRANSACCIONES"> ///////////////
            srvc.toTabledefFromVm=function (vm) {
                console.log("avanceProyectoSrvc.toTabledefFromVm ini");
                console.log(vm);
                var tabledef={};
                var data={};

                var modelData=vm.m.av;
                modelData.idProyecto=vm.m.p.idProyecto;

                if(!_.isNil(modelData.idPrycSeguimiento)) data.idPrycSeguimiento=modelData.idPrycSeguimiento;
                if(!_.isNil(modelData.idProyecto)) data.idProyecto=modelData.idProyecto;
                if(!_.isNil(modelData.prReal)) data.prReal=modelData.prReal;
                if(!_.isNil(modelData.prSigCorte)) data.prSigCorte=modelData.prSigCorte;
                if(!_.isNil(modelData.prComprometido)) data.prComprometido=modelData.prComprometido;
                if(!_.isNil(modelData.txAccnSemana)) data.txAccnSemana=modelData.txAccnSemana;
                if(!_.isNil(modelData.txAccnSiguiente)) data.txAccnSiguiente=modelData.txAccnSiguiente;
                if(!_.isNil(modelData.txAccnRiesgos)) data.txAccnRiesgos=modelData.txAccnRiesgos;

                if(!_.isNil(modelData.fhReporte)) {
                    data.fhReporte = srvc.getSafeDate(modelData.fhReporte);
                }

                /*
                data.bnActivo=iss.toNumberBoolFromVarWithDefault(modelData.bnActivo,1);

                if(!_.isNil(modelData.fhCrcn)) {
                    data.fhCrcn = srvc.getSafeDateTime(modelData.fhCrcn);
                }else{
                    data.fhCrcn = srvc.getSafeDateTime(new Date());
                }

                data.fhModf=srvc.getSafeDateTime(new Date());
                */

                tabledef.tabledef={
                    txSchema:"DATAUSER",
                    txTable:"ASPS_PRYC_SEGUIMIENTO"
                };
                tabledef.data=[data];
                console.log(tabledef);
                console.log("avanceProyectoSrvc.toTabledefFromVm end");
                return tabledef;
            };

            srvc.putData=function (obModel) {
                console.log("avanceProyectoSrvc.putData ini");
                var subdir=srvc.toTabledefFromVm(obModel);
                cbs.putArrayData([subdir],srvc.e.putData);
                console.log("avanceProyectoSrvc.putData end");
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
                console.log("avanceProyectoSrvc - Init Model - Ini");

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
                    getAvance:"avanceProyectoSrvc.getAvance",
                    getAvancesAll:"avanceProyectoSrvc.getAvancesAll",
                    putData:"avanceProyectoSrvc.putData",
                    delElement:"avanceProyectoSrvc.delElement"
                };

                console.log("avanceProyectoSrvc - Init Model - end");
            };
            srvc.initModel();
        }
    ]);