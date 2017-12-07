angular
    .module('RDash')
    .service('catUsuariosSrvc',[
        '$rootScope',
        'globalsController',
        'chartDataService',
        'eventService',
        'crudBaseSrvc',
        function ($rootScope,gc,cds,es,cbs){
            var srvc=this;

            //Obtiene el grid de personas
            srvc.getUsuarios=function () {
                srvc.m.q.idQry=1;
                cbs.getAllData(srvc.m.q,srvc.e.getUsuarios);
            };

            srvc.getLoginTipo=function () {
                var peticion={
                    idTab:8001,
                    idGra:3,
                    idQry:1
                };

                cbs.getDataById(peticion,srvc.e.getLoginTipo);
            };

            srvc.getPetitionLoginTipo=function () {
                var petition={
                    url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
                        query:{
                    idTab:8001,
                        idGra:3,
                        idQry:1
                },
                    success: function(response){
                        srvc.notify(srvc.e.getLoginTipo,response);
                    },
                    error: function(response,error){
                        console.log("error");
                        console.log(response);
                    }
                };

                return petition;
            };

            srvc.getPetitionUsuario=function (idLogin) {
                var petition={
                    url:gc.conf.xsServicesBaseUrl+'/execTabQueryFilter.xsjs',
                    query:{
                        idTab:8001,
                        idGra:4,
                        idQry:2,
                        lstObConditions:[
                            {
                                txCol:"ID_LOGIN",
                                txAlias:"logins",
                                varValue:idLogin,
                                txValueType:"NUMERO",
                                txLogicOperator:"AND",
                                txCompOperator:"="
                            }
                        ]
                    },
                    success: function(response){
                        srvc.notify(srvc.e.getUsuarioById,response);
                    },
                    error: function(response,error){
                        console.log("error");
                        console.log(response);
                    }
                };

                return petition;
            };

            srvc.getPetitionRoles=function () {
                var petition={
                    url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
                    query:{
                        idTab:8001,
                        idGra:5,
                        idQry:1
                    },
                    success: function(response){
                        srvc.notify(srvc.e.getRoles,response);
                    },
                    error: function(response,error){
                        console.log("error");
                        console.log(response);
                    }
                };

                return petition;
            };

            srvc.getData=function (idLogin) {
                //Peticion del catalogo de tipos
                var catTipo=srvc.getPetitionLoginTipo();
                cds.cleanWorkList("catUsuariosSrvcLst");
                cds.addWorkTask(srvc.e.getLoginTipo,catTipo);
                cds.addWorkList("catUsuariosSrvcLst",srvc.e.getLoginTipo);

                //Peticion del catalogo de roles
                var catRoles=srvc.getPetitionRoles();
                cds.addWorkTask(srvc.e.getRoles,catRoles);
                cds.addWorkList("catUsuariosSrvcLst",srvc.e.getRoles);

                //Agregar peticion de login
                if(!_.isEmpty(idLogin)){
                    var catUsuario=srvc.getPetitionUsuario(idLogin);
                    cds.addWorkTask(srvc.e.getUsuarioById,catUsuario);
                    cds.addWorkList("catUsuariosSrvcLst",srvc.e.getUsuarioById);
                }

                cds.doWorkList("catUsuariosSrvcLst");
            };

            srvc.getCountTxUsuario=function (txUsuario,idLogin) {
                var peticion={
                    idTab:8001,
                    idGra:4,
                    idQry:3,
                    lstObConditions:[
                        {
                            txCol:"TX_LOGIN",
                            txAlias:"logins",
                            varValue:txUsuario,
                            txValueType:"TEXTO",
                            txLogicOperator:"AND",
                            txCompOperator:"="
                        },
                        {
                            txCol:"BN_ACTIVO",
                            txAlias:"logins",
                            varValue:1,
                            txValueType:"NUMERO",
                            txLogicOperator:"AND",
                            txCompOperator:"="
                        }
                    ]
                };

                if(!_.isEmpty(idLogin)){
                    peticion.lstObConditions.push({
                        txCol:"ID_LOGIN",
                        txAlias:"logins",
                        varValue:idLogin,
                        txValueType:"NUMERO",
                        txLogicOperator:"AND",
                        txCompOperator:"<>"
                    });
                }

                cbs.getDataById(peticion,srvc.e.getCountTxUsuario);
            }


            //<editor-fold desc="EVENTOS SERVICIOS"> ///////////////
            srvc.onGetEtapas=function (event,data) {
                ctrl.grid.data=data;
            };

            //</editor-fold> ////////////////////

            srvc.putDataEntities=function (obModel) {
                console.log(obModel);
                obModel.idPersona = (_.isEmpty(obModel.p.idPersona))?srvc.getBigIntId():obModel.p.idPersona;
                obModel.idLogin = (_.isEmpty(obModel.u.idLogin))?srvc.getBigIntId():obModel.u.idLogin;
                //Preparar modelo para realizar la inserción
                var obPersona={
                    tabledef:{
                        txSchema:"DATAUSER",
                        txTable:"ASPS_PERSONAS"
                    }
                    ,data:[{
                        idPersona:obModel.idPersona,
                        txNombre:obModel.p.txNombre,
                        txApellido:obModel.p.txApellido,
                        txCorreo:obModel.p.txCorreo,
                        txTitulo:obModel.p.txTitulo,
                        bnActivo:1,
                    }]
                };

                var obLogin={
                    tabledef:{
                        txSchema:"DATAUSER",
                        txTable:"ASPS_LOGINS"
                    }
                    ,data:[{
                        idLogin:obModel.idLogin,
                        txLogin:obModel.u.txLogin,
                        txPwd:obModel.u.txPwd,
                        idPersona:obModel.idPersona,
                        idLoginTipo:obModel.selectedLoginTipo.idLoginTipo,
                        idRol:obModel.selectedRol.idRol,
                        bnActivo:1,
                    }]
                };

                cbs.putArrayData([obPersona,obLogin],srvc.e.putUsuario);
            };

            srvc.delElement=function (id) {
                var ob={
                    tabledef:{
                        txSchema:"DATAUSER",
                        txTable:"ASPS_LOGINS"
                    }
                    ,data:[{
                        idLogin:id,
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
                console.log("catUsuariosSrvc - Init Model - Ini");

                //Heredar de eventos
                srvc=_.extend(srvc,es);

                //Model
                srvc.m={};

                //Ids de query para catagolo de personas
                srvc.m.q={
                    idTab:8001,
                    idGra:4,
                    idQry:null
                };

                //Eventos
                srvc.e={
                    putUsuario:"catUsuariosSrvc.putUsuario",
                    getUsuarioById:"catUsuariosSrvc.getUsuarioById",
                    getUsuarios:"catUsuariosSrvc.getUsuarios",
                    putPersona:"catUsuariosSrvc.putPersona",
                    putEtapaError:"catUsuariosSrvc.putEtapaError",
                    getLoginTipo:"catUsuariosSrvc.getLoginTipo",
                    getCountTxUsuario:"catUsuariosSrvc.getCountTxUsuario",
                    delElement:"catUsuariosSrvc.delElement",
                    getRoles:"catUsuariosSrvc.getRoles",
                };

                console.log("catUsuariosSrvc - Init Model - Ended");
            };


            srvc.initModel();
        }
    ]);