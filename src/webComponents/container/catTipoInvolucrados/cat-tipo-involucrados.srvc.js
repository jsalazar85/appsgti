angular
    .module('RDash')
    .service('catTipoInvolucradosSrvc',[
        '$rootScope',
        'globalsController',
        'chartDataService',
        'eventService',
        'crudBaseSrvc',
        function ($rootScope,gc,cds,es,cbs){
            var srvc=this;

            //Obtiene el grid de personas
            srvc.getRequestConsulta=function () {
                var request={
                    url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
                    query:srvc.m.q,
                    success: function(response){
                        console.log("success");
                        console.log(response);
                        console.log(srvc);
                        srvc.notify(srvc.e.getConsulta,response.data);
                    },
                    error: function(response,error){
                        console.log("Error");
                        console.log(error);
                    }
                };

                request.query.idQry=1;

                return request;
            };

            srvc.getConsulta=function () {
                srvc.m.q.idQry=1;
                cbs.getAllData(srvc.m.q,srvc.e.getConsulta);
            };

            srvc.getPetitionDetalleById=function (id) {
                var petition={
                    url:gc.conf.xsServicesBaseUrl+'/execTabQueryFilter.xsjs',
                    query:{
                        idTab:8001,
                        idGra:6,
                        idQry:1,
                        lstObConditions:[
                            {
                                txCol:"ID_INVL_TIPO",
                                txAlias:"",
                                varValue:id,
                                txValueType:"NUMERO",
                                txLogicOperator:"AND",
                                txCompOperator:"="
                            }
                        ]
                    },
                    success: function(response){
                        srvc.notify(srvc.e.getDataDetalleById,response);
                    },
                    error: function(response,error){
                        console.log("error");
                        console.log(response);
                    }
                };

                return petition;
            };

            srvc.getDataDetalleById=function (id) {
                //Peticion del catalogo de tipos
                var cat=srvc.getPetitionDetalleById(id);
                cds.cleanWorkList("catTipoInvolucradosSrvcLst");
                cds.addWorkTask(srvc.e.getDataDetalleById,cat);
                cds.addWorkList("catTipoInvolucradosSrvcLst",srvc.e.getDataDetalleById);

                cds.doWorkList("catTipoInvolucradosSrvcLst");
            };


            //<editor-fold desc="EVENTOS SERVICIOS"> ///////////////


            //</editor-fold> ////////////////////

            srvc.putDataEntities=function (obModel) {
                console.log(obModel);

                //Preparar modelo para realizar la inserción
                var obData={
                    tabledef:{
                        txSchema:"DATAUSER",
                        txTable:"ASPS_CTLG_INVL_TIPOS"
                    }
                    ,data:[{
                        idInvlTipo:obModel.i.idInvlTipo,
                        txInvlTipo:obModel.i.txInvlTipo,
                        nuOrden:obModel.i.nuOrden,
                        txInvlTipoDscr:obModel.i.txInvlTipoDscr,
                        bnActivo:obModel.i.bnActivo,
                    }]
                };

                cbs.putArrayData([obData],srvc.e.putDataEntities);
            };

            srvc.delElement=function (obData) {
                var ob={
                    tabledef:{
                        txSchema:"DATAUSER",
                        txTable:"ASPS_CTLG_INVL_TIPOS"
                    }
                    ,data:[{
                        idInvlTipo:obData.idInvlTipo,
                        bnActivo:0,
                        nuOrden:obData.nuOrden
                    }]
                };

                cbs.putArrayData([ob],srvc.e.delElement);
            };


            //Funcion de inicializacion -------
            srvc.initModel=function () {
                console.log("catTipoInvolucradosSrvc - Init Model - Ini");

                //Heredar de eventos
                srvc=_.extend(srvc,es);

                //Model
                srvc.m={};

                //Ids de query para catagolo de personas
                srvc.m.q={
                    idTab:8001,
                    idGra:6,
                    idQry:null
                };

                //Eventos
                srvc.e={
                    putDataEntities:"catTipoInvolucradosSrvc.putDataEntities",
                    getDataDetalleById:"catTipoInvolucradosSrvc.getDataDetalleById",
                    getConsulta:"catTipoInvolucradosSrvc.getConsulta",
                    delElement:"catTipoInvolucradosSrvc.delElement",
                };

                console.log("catTipoInvolucradosSrvc - Init Model - Ended");
            };


            srvc.initModel();
        }
    ]);