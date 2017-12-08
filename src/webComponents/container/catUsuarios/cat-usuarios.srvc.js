angular
    .module('RDash')
    .service('catUsuariosSrvc',[
        '$rootScope',
        'globalsController',
        'chartDataService',
        'eventService',
        'crudBaseSrvc',
        'catSubdireccionSrvc',
        'isService',
        function ($rootScope,gc,cds,es,cbs,catSubdireccionSrvc,isService){
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

            srvc.getRequestLoginSubdir=function (idLogin) {
                var petition={
                    url:gc.conf.xsServicesBaseUrl+'/execTabQueryFilter.xsjs',
                    query:{
                        idTab:8001,
                        idGra:4,
                        idQry:4,
                    },
                    success: function(response){
                        srvc.notify(srvc.e.getRequestLoginSubdir,response);
                    },
                    error: function(response,error){
                        console.log("error");
                        console.log(response);
                    }
                };


                if(!isService.isEmptyStr(idLogin)){
                    petition.query.lstObConditions=[
                        {
                            txCol:"ID_LOGIN",
                            txAlias:"loginSubdir",
                            varValue:idLogin,
                            txValueType:"NUMERO",
                            txLogicOperator:"AND",
                            txCompOperator:"="
                        }
                    ];
                }


                return petition;
            };

            srvc.getRequestLoginSubdirCross=function (idLogin) {
                var petition={
                    url:gc.conf.xsServicesBaseUrl+'/execTabQueryFilter.xsjs',
                    query:{
                        idTab:8001,
                        idGra:4,
                        idQry:5,
                    },
                    success: function(response){
                        srvc.notify(srvc.e.getRequestLoginSubdirCross,response);
                    },
                    error: function(response,error){
                        console.log("error");
                        console.log(response);
                    }
                };

                if(!isService.isEmptyStr(idLogin)){
                    petition.query.lstObConditions=[
                        {
                            txCol:"ID_LOGIN",
                            txAlias:"subdir",
                            varValue:idLogin,
                            txValueType:"NUMERO",
                            txLogicOperator:"AND",
                            txCompOperator:"="
                        }
                    ];
                }

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
                console.log("getData ini");
                //Peticion del catalogo de tipos
                var catTipo=srvc.getPetitionLoginTipo();
                cds.cleanWorkList("catUsuariosSrvcLst");
                cds.addWorkTask(srvc.e.getLoginTipo,catTipo);
                cds.addWorkList("catUsuariosSrvcLst",srvc.e.getLoginTipo);

                //Peticion del catalogo de roles
                var catRoles=srvc.getPetitionRoles();
                cds.addWorkTask(srvc.e.getRoles,catRoles);
                cds.addWorkList("catUsuariosSrvcLst",srvc.e.getRoles);

                //Peticion de catalogo de subdirecciones
                var reqSubdir=catSubdireccionSrvc.getRequestSubdirecciones();
                console.log(reqSubdir);
                cds.addWorkTask(srvc.e.getSubdirecciones,reqSubdir);
                cds.addWorkList("catUsuariosSrvcLst",srvc.e.getSubdirecciones);

                //Peticion de catalogo de login subdirecciones
                var reqLoginSubdir=srvc.getRequestLoginSubdirCross(idLogin);
                console.log(reqLoginSubdir);
                cds.addWorkTask(srvc.e.getRequestLoginSubdirCross,reqLoginSubdir);
                cds.addWorkList("catUsuariosSrvcLst",srvc.e.getRequestLoginSubdirCross);

                //Agregar peticion de login
                console.log(idLogin);
                if(!_.isEmpty(idLogin)){
                    console.log("no es vacio");
                    var catUsuario=srvc.getPetitionUsuario(idLogin);
                    cds.addWorkTask(srvc.e.getUsuarioById,catUsuario);
                    cds.addWorkList("catUsuariosSrvcLst",srvc.e.getUsuarioById);
                }else{
                    console.log("login vacio");
                }

                cds.doWorkList("catUsuariosSrvcLst");
                console.log("getData end");
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

            srvc.putDataEntities=function (vm) {
                var obModel=vm.m;
                console.log("putDataEntities ini");

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

                //Funciones para convertir las subdirecciones que fueron elegidas
                var obSubdir= {
                    tabledef: {
                        txSchema: "DATAUSER",
                        txTable: "ASPS_LOGIN_SUBDIR"
                    }
                    , data: []
                };
                _.forEach(vm.lstSubdirecciones,function (item) {
                    var ob={};
                    ob.idLoginSubdir=item.idLoginSubdir;
                    ob.idLogin=item.idLogin;
                    ob.idSubdireccion=item.idSubdireccion;
                    ob.bnAplica=isService.toNumberBoolFromVarWithDefault(item.bnAplica,0);

                    obSubdir.data.push(ob);
                });

                console.log(obSubdir);

                cbs.putArrayData([obPersona,obLogin,obSubdir],srvc.e.putUsuario);

                console.log("putDataEntities end");
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
                    getSubdirecciones:catSubdireccionSrvc.e.getSubdirecciones,
                    getRequestLoginSubdir:"catUsuariosSrvc.getRequestLoginSubdir",//catSubdireccionSrvc.e.getRequestLoginSubdir,
                    //getRequestLoginSubdirCross
                    getRequestLoginSubdirCross:"catUsuariosSrvc.getRequestLoginSubdirCross",//catSubdireccionSrvc.e.getRequestLoginSubdir,
                };

                console.log("catUsuariosSrvc - Init Model - Ended");
            };


            srvc.initModel();
        }
    ]);