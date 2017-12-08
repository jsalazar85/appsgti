angular
    .module('RDash')
    .service('appSecService',[
        '$rootScope',
        'globalsController',
        'chartDataService',
        'eventService',
        'crudBaseSrvc',
        'isService',
        'catUsuariosSrvc',
        function ($rootScope,gc,cds,es,cbs,iss,catUsuariosSrvc){
            var srvc=this;

            //<editor-fold desc="CONSULTAS"> ///////////////
            srvc.getRequestLoginInfoByTxLogin=function (txLogin) {
                console.log("catAreasSrvc.getRequestLoginInfoByTxLogin ini");
                var req=null;
                if(!_.isNil(txLogin)){
                    req= {
                        url: gc.conf.xsServicesBaseUrl + '/execTabQueryFilter.xsjs',
                        query: {
                            idTab: 8001,
                            idGra: 11,
                            idQry: 1,
                            lstObConditions: [
                                {
                                    txCol: "TX_LOGIN",
                                    txAlias: "lgn",
                                    varValue: txLogin,
                                    txValueType: "TEXTO",
                                    txLogicOperator: "AND",
                                    txCompOperator: "="
                                },
                                {
                                    txCol: "BN_ACTIVO",
                                    txAlias: "lgn",
                                    varValue: 1,
                                    txValueType: "NUMERO",
                                    txLogicOperator: "AND",
                                    txCompOperator: "="
                                },
                            ]
                        },
                        success: function (response) {
                            console.log("8001,11,1: success");
                            srvc.notify(srvc.e.getRequestLoginInfoByTxLogin, response);
                        },
                        error: function (response, error) {
                            console.log("8001,11,1: error");
                            console.log(response);
                        }
                    };
                }

                console.log("catAreasSrvc.getRequestLoginInfoByTxLogin end");
                return req;
            };

            srvc.getLoginInfoByTxLogin=function (txLogin) {
                console.log("catAreasSrvc.getLoginInfoByTxLogin ini");
                var request=srvc.getRequestLoginInfoByTxLogin(txLogin);
                cbs.getDataFromRequestObj(request);
                console.log("catAreasSrvc.getLoginInfoByTxLogin end");
            };

            srvc.getRequestLoginAccess=function (txLogin,txPwd) {
                console.log("appSecService.getRequestLoginAccess ini");
                var req=null;
                req= {
                    url: gc.conf.xsServicesBaseUrl + '/execTabQueryFilter.xsjs',
                    query: {
                        idTab: 8001,
                        idGra: 11,
                        idQry: 2,
                        lstObConditions: [
                            {
                                txCol: "TX_LOGIN",
                                txAlias: "lgn",
                                varValue: txLogin,
                                txValueType: "TEXTO",
                                txLogicOperator: "AND",
                                txCompOperator: "="
                            },
                            {
                                txCol: "BN_ACTIVO",
                                txAlias: "lgn",
                                varValue: 1,
                                txValueType: "NUMERO",
                                txLogicOperator: "AND",
                                txCompOperator: "="
                            },
                            {
                                txCol: "TX_PWD",
                                txAlias: "lgn",
                                varValue: txPwd,
                                txValueType: "TEXTO",
                                txLogicOperator: "AND",
                                txCompOperator: "="
                            },
                        ]
                    },
                    success: function (response) {
                        console.log("8001,11,2: success");
                        srvc.notify(srvc.e.getLoginAccess, response);
                    },
                    error: function (response, error) {
                        console.log("8001,11,2: error");
                        console.log(response);
                    }
                };

                console.log("appSecService.getRequestLoginAccess end");
                return req;
            };

            srvc.getLoginAccess=function (txLogin,txPwd) {
                console.log("catAreasSrvc.getLoginAccess ini");
                var request=srvc.getRequestLoginAccess(txLogin,txPwd);
                cbs.getDataFromRequestObj(request);
                console.log("catAreasSrvc.getLoginAccess end");
            };

            srvc.getRequestLoginLdap=function (txLogin,txPwd) {
                console.log("catAreasSrvc.getRequestLoginLdap ini");
                var req=null;
                if(!_.isNil(txLogin)){
                    req= {
                        url: gc.conf.xsServicesTranBaseUrl+'/loginldap.xsjs',//gc.conf.xsServicesBaseUrl + '/execTabQueryFilter.xsjs',
                        query: {
                            txLogin:txLogin,
                            txPwd:txPwd,
                        },
                        success: function (response) {
                            console.log("getRequestLoginLdap: success");
                            srvc.notify(srvc.e.getLoginLdap, response);
                        },
                        error: function (response, error) {
                            console.log("8001,11,1: error");
                            console.log(response);
                        }
                    };
                }

                console.log("catAreasSrvc.getRequestLoginLdap end");
                return req;
            };

            srvc.getLoginLdap=function (txLogin,txPwd) {
                console.log("catAreasSrvc.getLoginLdap ini");
                var request=srvc.getRequestLoginLdap(txLogin,txPwd);
                cbs.getDataFromRequestObj(request);
                console.log("catAreasSrvc.getLoginLdap end");
            };

            srvc.getRequestLoginLdap=function (txLogin,txPwd) {
                console.log("catAreasSrvc.getRequestLoginLdap ini");
                var req=null;
                if(!_.isNil(txLogin)){
                    req= {
                        url: gc.conf.xsServicesTranBaseUrl+'/loginldap.xsjs',//gc.conf.xsServicesBaseUrl + '/execTabQueryFilter.xsjs',
                        query: {
                            txLogin:txLogin,
                            txPwd:txPwd,
                        },
                        success: function (response) {
                            console.log("getRequestLoginLdap: success");
                            srvc.notify(srvc.e.getLoginLdap, response);
                        },
                        error: function (response, error) {
                            console.log("8001,11,1: error");
                            console.log(response);
                        }
                    };
                }

                console.log("catAreasSrvc.getRequestLoginLdap end");
                return req;
            };

            srvc.getAttemptLogin=function (txLogin,txPwd) {
                console.log("getAttemptLogin ini");
                var attemptLoginReq;
                var listName="appSecService.getAttemptLogin";
                console.log(srvc.usr);
                if(!_.isNil(srvc.usr)){
                    console.log("crear responses");
                    //Obtener el request del login
                    if(srvc.usr.idLoginTipo==1){
                        //Active Directory
                        attemptLoginReq=srvc.getLoginLdap(txLogin,txPwd);
                    }else{
                        //Inicio de Sesion por sistema
                        attemptLoginReq=srvc.getRequestLoginAccess(txLogin,txPwd);
                    }

                    //console.log(attemptLoginReq);

                    //Obtener el request de la consulta de catalogo de subdirecciones
                    var loginSubdir=catUsuariosSrvc.getRequestLoginSubdirCross(srvc.usr.idLogin);

                    //Agregar tareas a la lista
                    cds.cleanWorkList(listName);
                    cds.addWorkTask(srvc.e.getAttemptLogin,attemptLoginReq);
                    cds.addWorkList(listName,srvc.e.getAttemptLogin);

                    cds.addWorkTask(srvc.e.getRequestLoginSubdirCross,loginSubdir);
                    cds.addWorkList(listName,srvc.e.getRequestLoginSubdirCross);

                    cds.doWorkList(listName);
                }else{
                    console.log("usr is null");
                }
                console.log("getAttemptLogin end");

            };
            //</editor-fold> ////////////////////

            srvc.setLoguedUser=function (usr,isLogged) {
                srvc.usr=usr;
                srvc.usr.isLogged=true;
            };

            srvc.logout=function () {
                srvc.usr={};
                srvc.usr.isLogged=false;
            };

            //<editor-fold desc="INICIALIZACION"> ///////////////
            srvc.initModel=function () {
                console.log("appSecService - Init Model - Ini");

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
                    getRequestLoginInfoByTxLogin:"appSecService.getRequestLoginInfoByTxLogin",
                    getLoginAccess:"appSecService.getLoginAccess",
                    getLoginLdap:"appSecService.getLoginLdap",
                    getAttemptLogin:"appSecService.getAttemptLogin",
                    getRequestLoginSubdir:catUsuariosSrvc.e.getRequestLoginSubdir,
                    getRequestLoginSubdirCross:catUsuariosSrvc.e.getRequestLoginSubdirCross,

                };

                console.log("appSecService - Init Model - end");
            };
            srvc.initModel();
            //</editor-fold> ////////////////////
        }
    ]);//endService