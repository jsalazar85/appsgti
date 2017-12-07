angular
    .module('RDash')
    .service('catPersonasSrvc',[
        '$rootScope',
        'globalsController',
        'chartDataService',
        'eventService',
        'crudBaseSrvc',
        function ($rootScope,gc,cds,es,cbs){
            var srvc=this;

            //Obtiene el grid de personas
            srvc.getPersonas=function () {
                srvc.m.q.idQry=1;
                cbs.getAllData(srvc.m.q,srvc.e.getPersonas);
            };

            srvc.getPersonaById=function (idPersona) {
                var obQuery=srvc.m.q;

                obQuery.idQry=2;
                obQuery.lstObConditions=[
                    {
                        txCol:"ID_PERSONA",
                        txAlias:"",
                        varValue:idPersona,
                        txValueType:"NUMERO",
                        txLogicOperator:"AND",
                        txCompOperator:"="
                    }
                ];

                cbs.getDataById(obQuery,srvc.e.getPersonaById);
            };

            //<editor-fold desc="EVENTOS SERVICIOS"> ///////////////
            srvc.onGetEtapas=function (event,data) {
                ctrl.grid.data=data;
            };
            //</editor-fold> ////////////////////

            srvc.putPersona=function (obData) {
                obData.bnActivo=1;
                var tabledef={
                    txSchema:"DATAUSER",
                    txTable:"ASPS_PERSONAS"
                };

                var obPut={
                    tabledef:tabledef,
                    data:[obData]
                };

                cbs.putData(obPut,srvc.e.putPersona);
            };

            srvc.delEtapaById=function () {

            };


            //Funcion de inicializacion -------
            srvc.initModel=function () {
                console.log("catPersonasSrvc - Init Model - Ini");

                //Heredar de eventos
                srvc=_.extend(srvc,es);

                //Model
                srvc.m={};

                //Ids de query para catagolo de personas
                srvc.m.q={
                    idTab:8001,
                    idGra:2,
                    idQry:null
                };

                //Eventos
                srvc.e={
                    getPersonas:"catPersonasSrvc.getEtapas",
                    getPersonaById:"catPersonasSrvc.getPersonaById",
                    putPersona:"catPersonasSrvc.putPersona",
                    putEtapaError:"catPersonasSrvc.putEtapaError",
                };

                console.log("catPersonasSrvc - Init Model - Ended");
            };


            srvc.initModel();
        }
    ]);