angular
    .module('RDash')
    .service('catEtapasSrvc',[
        '$rootScope',
        'globalsController',
        'chartDataService',
        'eventService',
        'crudBaseSrvc',
        function ($rootScope,gc,cds,es,cbs){
            var srvc=this;

            srvc.getRequestEtapas=function () {
                var request={
                    url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
                    query:{
                        idTab:8001,
                        idGra:1,
                        idQry:1
                    },
                    success: function(response){
                        console.log("success");
                        console.log(response);
                        console.log(srvc);
                        srvc.notify(srvc.e.getEtapas,response.data);
                    },
                    error: function(response,error){
                        console.log("Error");
                        console.log(error);
                    }
                };

                return request;
            };

            srvc.getEtapas=function () {
                cds.addWorkTask('catEtapasSrvc.getEtapas',{
                    url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
                    query:{
                        idTab:8001,
                        idGra:1,
                        idQry:1
                    },
                    success: function(response){
                        console.log("success");
                        console.log(response);
                        console.log(srvc);
                        srvc.notify(srvc.e.getEtapas,response.data);
                    },
                    error: function(response,error){
                        console.log("Error");
                        console.log(error);
                    }
                });
                cds.doWorkTask('catEtapasSrvc.getEtapas');
            };

            srvc.getEtapaById=function (idEtapa) {
                var obConditions=[
                    {
                        txCol:"ID_PRYC_ETAPA",
                        txAlias:"",
                        varValue:idEtapa,
                        txValueType:"NUMERO",
                        txLogicOperator:"AND",
                        txCompOperator:"="
                    }
                ];
                cds.addWorkTask('catEtapasSrvc.getEtapaById',{
                    url:gc.conf.xsServicesBaseUrl+'/execTabQueryFilter.xsjs',
                    query:{
                        idTab:8001,
                        idGra:1,
                        idQry:2,
                        lstObConditions:obConditions
                    },
                    success: function(response){
                        console.log("success");
                        console.log(response);
                        srvc.notify(srvc.e.getEtapaById,response.data[0]);
                    },
                    error: function(response,error){
                        console.log("Error");
                        console.log(error);
                    }
                });
                cds.doWorkTask('catEtapasSrvc.getEtapaById');
            };

            srvc.putEtapa=function (obEtapa) {
                obEtapa.bnActivo=1;

                var tabledef={
                    txSchema:"DATAUSER",
                    txTable:"ASPS_CTLG_PRYC_ETAPAS"
                };

                var obPut={
                    tabledef:tabledef,
                    data:[obEtapa]
                };

                cds.addWorkTask('catEtapasSrvc.putEtapa',{
                    url:gc.conf.xsServicesTranBaseUrl+'/tranUpsert.xsjs',
                    query:{
                        data:obPut
                    },
                    success:function (response) {
                        console.log("success");
                        console.log(response);

                        if(response.bnStatus){
                            srvc.notify(srvc.e.putEtapaSuccess,response);
                        }else{
                            srvc.notify(srvc.e.putEtapaError,response);
                        }
                    },
                    error:function (response,error) {
                        console.log("Error");
                        console.log(error);
                        srvc.notify(srvc.e.putEtapaError,response);
                    }
                });
                cds.doWorkTask('catEtapasSrvc.putEtapa');
            };

            srvc.delEtapaById=function (ob) {
                var ob={
                    tabledef:{
                        txSchema:"DATAUSER",
                        txTable:"ASPS_CTLG_PRYC_ETAPAS"
                    }
                    ,data:[{
                        idPrycEtapa:ob.idPrycEtapa,
                        nuSecuencia:ob.nuSecuencia,
                        bnActivo:0,
                    }]
                };

                cbs.putArrayData([ob],srvc.e.delElement);
            };


            //Funcion de inicializacion -------
            srvc.initModel=function () {
                console.log("catEtapasSrvc - Init Model - Ini");

                //Heredar de eventos
                srvc=_.extend(srvc,es);

                //Model
                srvc.m={};

                //Eventos
                srvc.e={
                    getEtapas:"catEtapasSrvc.getEtapas",
                    getEtapaById:"catEtapasSrvc.getEtapaById",
                    putEtapaSuccess:"catEtapasSrvc.putEtapaSuccess",
                    putEtapaError:"catEtapasSrvc.putEtapaError",
                    delElement:"catEtapasSrvc.delElement",
                };

                console.log("catEtapasSrvc - Init Model - Ended");
            };


            srvc.initModel();
        }
    ]);