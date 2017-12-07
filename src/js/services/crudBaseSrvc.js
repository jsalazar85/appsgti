angular
    .module('RDash')
    .service('crudBaseSrvc',[
        '$rootScope',
        'globalsController',
        'chartDataService',
        'eventService',
        function ($rootScope,gc,cds,es){
            var srvc=this;
            var bnSuccess=true;

            //Get catalog data
            srvc.getAllData=function (obQuery,notifyEvent) {
                cds.addWorkTask(srvc.e.getAllData,{
                    url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
                    query:obQuery,
                    success: function(response){
                        srvc.notify(srvc.e.getAllData,response.data,bnSuccess);
                        if(notifyEvent){
                            srvc.notify(notifyEvent,response.data,bnSuccess);
                        }
                    },
                    error: function(response,error){
                        console.log("Error");
                        console.log(error);
                        bnSuccess=false;
                        srvc.notify(srvc.e.getAllData,response.data,bnSuccess);
                        if(notifyEvent){
                            srvc.notify(notifyEvent,response.data,bnSuccess);
                        }
                    }
                });
                cds.doWorkTask(srvc.e.getAllData);
            };

            //Get catalog data
            srvc.getDataFromRequestObj=function (obRequest) {
                cds.addWorkTask(srvc.e.getDataFromRequestObj,{
                    url:obRequest.url,
                    query:obRequest.query,
                    success:obRequest.success,
                    error: obRequest.error
                });
                cds.doWorkTask(srvc.e.getDataFromRequestObj);
            };

            //Obtiene un registro por Id
            srvc.getDataById=function (obQuery,notifyEvent) {

                cds.addWorkTask(srvc.e.getDataById,{
                    url:gc.conf.xsServicesBaseUrl+'/execTabQueryFilter.xsjs',
                    query:obQuery,
                    success: function(response){
                        srvc.notify(srvc.e.getDataById,response.data[0],bnSuccess);
                        if(notifyEvent){
                            srvc.notify(notifyEvent,response.data[0],bnSuccess);
                        }
                    },
                    error: function(response,error){
                        console.log("Error");
                        console.log(error);
                        bnSuccess=false;
                        srvc.notify(srvc.e.getDataById,response.data,bnSuccess);
                        if(notifyEvent){
                            srvc.notify(notifyEvent,response.data,bnSuccess);
                        }
                    }
                });
                cds.doWorkTask(srvc.e.getDataById);
            };

            //Obtiene un registro por Id
            srvc.getAllDataById=function (obQuery,notifyEvent) {

                cds.addWorkTask(srvc.e.getDataById,{
                    url:gc.conf.xsServicesBaseUrl+'/execTabQueryFilter.xsjs',
                    query:obQuery,
                    success: function(response){
                        srvc.notify(srvc.e.getDataById,response,bnSuccess);
                        if(notifyEvent){
                            srvc.notify(notifyEvent,response,bnSuccess);
                        }
                    },
                    error: function(response,error){
                        console.log("Error");
                        console.log(error);
                        bnSuccess=false;
                        srvc.notify(srvc.e.getDataById,response,bnSuccess);
                        if(notifyEvent){
                            srvc.notify(notifyEvent,response,bnSuccess);
                        }
                    }
                });
                cds.doWorkTask(srvc.e.getDataById);
            };

            //Insercion de registros
            srvc.putData=function (obData,notifyEvent) {
                var bnSuccess=true;
                cds.addWorkTask(srvc.e.putData,{
                    url:gc.conf.xsServicesTranBaseUrl+'/tranUpsert.xsjs',
                    query:{
                        data:obData
                    },
                    success:function (response) {
                        console.log("success");
                        console.log(response);

                        if(response.bnStatus){
                            bnSuccess=true;
                        }else{
                            bnSuccess=false;
                        }

                        srvc.notify(srvc.e.putData,response,bnSuccess);
                        if(notifyEvent){
                            srvc.notify(notifyEvent,response,bnSuccess);
                        }
                    },
                    error:function (response,error) {
                        bnSuccess=false;
                        srvc.notify(srvc.e.putData,response,bnSuccess);
                        if(notifyEvent){
                            srvc.notify(notifyEvent,response,bnSuccess);
                        }
                    }
                });
                cds.doWorkTask(srvc.e.putData);
            };

            //Insercion de registros de varias entidades
            srvc.putArrayData=function (lstObData,notifyEvent) {
                var bnSuccess=true;
                cds.addWorkTask(srvc.e.putData,{
                    url:gc.conf.xsServicesTranBaseUrl+'/tranUpsertArray.xsjs',
                    query:{
                        data:lstObData
                    },
                    success:function (response) {
                        console.log("success");
                        console.log(response);

                        if(response.bnStatus){
                            bnSuccess=true;
                        }else{
                            bnSuccess=false;
                        }

                        srvc.notify(srvc.e.putData,response,bnSuccess);
                        if(notifyEvent){
                            srvc.notify(notifyEvent,response,bnSuccess);
                        }
                    },
                    error:function (response,error) {
                        bnSuccess=false;
                        srvc.notify(srvc.e.putData,response,bnSuccess);
                        if(notifyEvent){
                            srvc.notify(notifyEvent,response,bnSuccess);
                        }
                    }
                });
                cds.doWorkTask(srvc.e.putData);
            };

            //Funcion de inicializacion -------
            srvc.initModel=function () {
                console.log("crudBaseSrvc - Init Model - Ini");

                //Heredar de eventos
                srvc=_.extend(srvc,es);

                //Model
                srvc.m={};

                //Eventos
                srvc.e={
                    getAllData:"crudBaseSrvc.getAllData",
                    getDataById:"crudBaseSrvc.getDataById",
                    putData:"crudBaseSrvc.putData",
                    getDataFromRequestObj:"crudBaseSrvc.getDataFromRequestObj",
                };

                console.log("crudBaseSrvc - Init Model - Ended");
            };

            srvc.initModel();
        }
    ]);