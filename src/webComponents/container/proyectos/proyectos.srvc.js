angular
    .module('RDash')
    .service('proyectosSrvc',[
        '$rootScope',
        'globalsController',
        'chartDataService',
        'eventService',
        'crudBaseSrvc',
        'catEtapasSrvc',
        'catTipoInvolucradosSrvc',
        'isService',
        'catAreasSrvc',
        'catSubdireccionSrvc',
        'appSecService',
        function ($rootScope,gc,cds,es,cbs,catEtapasSrvc,catTipoInvolucradosSrvc,iss,catAreasSrvc,catSubdireccionSrvc,appSecService){
            var srvc=this;

            //<editor-fold desc="FUNCIONES DE INICIALIZACION"> ///////////////

            srvc.getRequestEtapasProyectoById=function (idProyecto) {
                var req=null;
                req= {
                    url: gc.conf.xsServicesBaseUrl + '/execTabQueryFilter.xsjs',
                    query: {
                        idTab: 8001,
                        idGra: 8,
                        idQry: 4,
                        lstObConditions: [
                            {
                                txCol: "BN_ACTIVO",
                                txAlias: "pef",
                                varValue: 1,
                                txValueType: "NUMERO",
                                txLogicOperator: "AND",
                                txCompOperator: "="
                            },
                            {
                                txCol: "ID_PROYECTO",
                                txAlias: "pef",
                                varValue: idProyecto,
                                txValueType: "NUMERO",
                                txLogicOperator: "AND",
                                txCompOperator: "="
                            }
                        ]
                    },
                    success: function (response) {
                        console.log("8001,8,4: success");
                        srvc.notify(srvc.e.getRequestEtapasProyectoById, response);
                    },
                    error: function (response, error) {
                        console.log("error");
                        console.log(response);
                    }
                };

                return req;
            };

            srvc.getRequestTipoProyecto=function () {
                var req=null;
                req= {
                    url: gc.conf.xsServicesBaseUrl + '/execTabQueryFilter.xsjs',
                    query: {
                        idTab: 8001,
                        idGra: 13,
                        idQry: 1,
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
                        console.log("8001,13,1: success");
                        srvc.notify(srvc.e.getTipoProyecto, response);
                    },
                    error: function (response, error) {
                        console.log("error");
                        console.log(response);
                    }
                };

                return req;
            };

            srvc.getRequestEstatus=function () {
                var req=null;
                req= {
                    url: gc.conf.xsServicesBaseUrl + '/execTabQueryFilter.xsjs',
                    query: {
                        idTab: 8001,
                        idGra: 8,
                        idQry: 5,
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
                        console.log("8001,13,1: success");
                        srvc.notify(srvc.e.getEstatus, response);
                    },
                    error: function (response, error) {
                        console.log("error");
                        console.log(response);
                    }
                };

                return req;
            };

            srvc.getCatalogos=function (idProyecto) {
                console.log("proyectosSrvc.getCatalogos");
                cds.cleanWorkList("proyectosSrvcLst");

                //Petición para catalogo de etapas
                var catEtapas=catEtapasSrvc.getRequestEtapas();
                console.log(catEtapas);
                cds.addWorkTask(srvc.e.getEtapas,catEtapas);
                cds.addWorkList("proyectosSrvcLst",srvc.e.getEtapas);

                //Petición de catalogos de involucrados
                var catInvl=catTipoInvolucradosSrvc.getRequestConsulta();
                console.log(catInvl);
                cds.addWorkTask(srvc.e.getConsultaInvolucrados,catInvl);
                cds.addWorkList("proyectosSrvcLst",srvc.e.getConsultaInvolucrados);

                //Peticion de catalogo de subdirecciones
                var reqSubdir=catSubdireccionSrvc.getRequestSubdirecciones();
                console.log(reqSubdir);
                cds.addWorkTask(srvc.e.getSubdirecciones,reqSubdir);
                cds.addWorkList("proyectosSrvcLst",srvc.e.getSubdirecciones);

                //Peticion de catalogo de areas
                var reqAreas=catAreasSrvc.getRequestAreas();
                console.log(reqAreas);
                cds.addWorkTask(srvc.e.getAreas,reqAreas);
                cds.addWorkList("proyectosSrvcLst",srvc.e.getAreas);

                //Catalogo de Tipo de Proyectos
                var tipoProyecto=srvc.getRequestTipoProyecto();
                console.log(tipoProyecto);
                cds.addWorkTask(srvc.e.getTipoProyecto,tipoProyecto);
                cds.addWorkList("proyectosSrvcLst",srvc.e.getTipoProyecto);

                //Catalogo de estatus
                var catEstatus=srvc.getRequestEstatus();
                console.log(catEstatus);
                cds.addWorkTask(srvc.e.getEstatus,catEstatus);
                cds.addWorkList("proyectosSrvcLst",srvc.e.getEstatus);

                if(!iss.isEmptyStr(idProyecto)){
                    //Obtener datos segun del proyecto

                    //Tabla Proyecto Y FECHAS
                    var proyecto= {
                        url: gc.conf.xsServicesBaseUrl + '/execTabQueryFilter.xsjs',
                        query: {
                            idTab: 8001,
                            idGra: 8,
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
                            console.log("8001,8,1: success");
                            srvc.notify(srvc.e.getProyecto, response);
                        },
                        error: function (response, error) {
                            console.log("error");
                            console.log(response);
                        }
                    };
                    console.log(proyecto);
                    cds.addWorkTask(srvc.e.getProyecto,proyecto);
                    cds.addWorkList("proyectosSrvcLst",srvc.e.getProyecto);

                    //Tabla Etapa Fechas
                    var etapaFechas=srvc.getRequestEtapasProyectoById(idProyecto);
                    console.log(etapaFechas);
                    cds.addWorkTask(srvc.e.getRequestEtapasProyectoById,etapaFechas);
                    cds.addWorkList("proyectosSrvcLst",srvc.e.getRequestEtapasProyectoById);

                    //Tabla Involucrados
                    var invl={
                        url: gc.conf.xsServicesBaseUrl + '/execTabQueryFilter.xsjs',
                        query: {
                            idTab: 8001,
                            idGra: 8,
                            idQry: 3,
                            lstObConditions: [
                                {
                                    txCol: "ID_PROYECTO",
                                    txAlias: "proy",
                                    varValue: idProyecto,
                                    txValueType: "NUMERO",
                                    txLogicOperator: "AND",
                                    txCompOperator: "="
                                },
                                {
                                    txCol: "BN_ACTIVO",
                                    txAlias: "invl",
                                    varValue: 1,
                                    txValueType: "NUMERO",
                                    txLogicOperator: "AND",
                                    txCompOperator: "="
                                }
                            ]
                        },
                        success: function (response) {
                            console.log("8001,8,3: success");
                            srvc.notify(srvc.e.getInvolucrados, response);
                        },
                        error: function (response, error) {
                            console.log("error");
                            console.log(response);
                        }
                    };
                    console.log(proyecto);
                    cds.addWorkTask(srvc.e.getInvolucrados,invl);
                    cds.addWorkList("proyectosSrvcLst",srvc.e.getInvolucrados);
                }//endIf

                /*
                //Peticion del catalogo de roles
                var catRoles=srvc.getPetitionRoles();
                cds.addWorkTask(srvc.e.getRoles,catRoles);
                cds.addWorkList("proyectosSrvcLst",srvc.e.getRoles);

                //Agregar peticion de login
                if(!_.isEmpty(idLogin)){
                    var catUsuario=srvc.getPetitionUsuario(idLogin);
                    cds.addWorkTask(srvc.e.getUsuarioById,catUsuario);
                    cds.addWorkList("proyectosSrvcLst",srvc.e.getUsuarioById);
                }
                */

                cds.doWorkList("proyectosSrvcLst");
            };
            //</editor-fold> ////////////////////

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

            srvc.getProyectos=function () {
                var peticion={
                    idTab:8001,
                    idGra:8,
                    idQry:1,
                    lstObConditions:[
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

                };

                cbs.getAllDataById(peticion,srvc.e.getProyectos);
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
                cds.cleanWorkList("proyectosSrvcLst");
                cds.addWorkTask(srvc.e.getLoginTipo,catTipo);
                cds.addWorkList("proyectosSrvcLst",srvc.e.getLoginTipo);

                //Peticion del catalogo de roles
                var catRoles=srvc.getPetitionRoles();
                cds.addWorkTask(srvc.e.getRoles,catRoles);
                cds.addWorkList("proyectosSrvcLst",srvc.e.getRoles);

                //Agregar peticion de login
                if(!_.isEmpty(idLogin)){
                    var catUsuario=srvc.getPetitionUsuario(idLogin);
                    cds.addWorkTask(srvc.e.getUsuarioById,catUsuario);
                    cds.addWorkList("proyectosSrvcLst",srvc.e.getUsuarioById);
                }

                cds.doWorkList("proyectosSrvcLst");
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
            };

            srvc.getInvolucradosBusqueda=function (txSearch) {
                txSearch="%"+txSearch+"%";
                txSearch=txSearch.toLowerCase();
                var peticion={
                    idTab:8001,
                    idGra:7,
                    idQry:1,
                    lstObConditions:[
                        {
                            txCol:"LOWER(TX_NOMBRE_COMPLETO)",
                            txAlias:"",
                            varValue:txSearch,
                            txValueType:"TEXTO",
                            txLogicOperator:"AND",
                            txCompOperator:"LIKE"
                        }
                    ]
                };

                cbs.getAllDataById(peticion,srvc.e.getInvolucradosBusqueda);
            };


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

            //Convierte el objeto recibido desde el componenete para preparar su inserción
            srvc.convertProyectoToTableDef=function (m,vm) {
                var ob={
                    tabledef:{
                        txSchema:"DATAUSER",
                        txTable:"ASPS_PROYECTOS"
                    },
                    data:[]
                };

                var data={};
                if(!_.isNull(m.idProyecto)) data.idProyecto=m.idProyecto;
                if(!_.isNull(m.txFolioCii)) data.txFolioCii=m.txFolioCii;
                if(!_.isNull(m.txFolioJira)) data.txFolioJira=m.txFolioJira;
                if(!_.isNull(m.txFolioDcs)) data.txFolioDcs=m.txFolioDcs;
                if(!_.isNull(m.txNmbrProy)) data.txNmbrProy=m.txNmbrProy;
                if(!_.isNull(m.txNmbrProyCrto)) data.txNmbrProyCrto=m.txNmbrProyCrto;
                if(!_.isNil(m.fhCrcn)) {data.fhCrcn=srvc.getSafeDate(m.fhCrcn)};
                if(!_.isNil(m.fhModf)) {data.fhModf=srvc.getSafeDate(m.fhModf)};
                if(!_.isNil(m.fhSolicitud)) {data.fhSolicitud=srvc.getSafeDate(m.fhSolicitud)};
                if(!_.isNil(vm.selAreaSolicitante.idArea)) {data.idAreaSolicitante=vm.selAreaSolicitante.idArea};
                if(!_.isNil(vm.selAreaResponsable.idArea)) {data.idAreaResponsable=vm.selAreaResponsable.idArea};
                if(!_.isNil(vm.selTipoProyecto.idTipoProyecto)) {data.idTipoProyecto=vm.selTipoProyecto.idTipoProyecto};
                if(!_.isNil(vm.selEstatus.idEstatus)) {data.idEstatus=vm.selEstatus.idEstatus};

                ob.data.push(data);

                return ob;
            };

            srvc.convertPrycFechasToTableDef=function (pf,p) {
                console.log("proyectosSrvc.convertPrycFechasToTableDef - ini");
                var ob={
                    tabledef:{
                        txSchema:"DATAUSER",
                        txTable:"ASPS_PRYC_FECHAS"
                    },
                    data:[
                        /*
                        {
                            idPrycFecha:pf.idPrycFecha,//ID_PRYC_FECHA
                            idProyecto:p.idProyecto,//ID_PROYECTO
                            fhInicio:srvc.getSafeDate(pf.fhInicio),//FH_INICIO
                            fhFin:srvc.getSafeDate(pf.fhFin),//pf.fhFin,//FH_FIN
                            fhFinEstimado:srvc.getSafeDate(pf.fhFinEstimado),//pf.fhFinEstimado,//FH_FIN_ESTIMADO
                            fhCierre:srvc.getSafeDate(pf.fhCierre),//pf.fhCierre,//FH_CIERRE
                            fhCrcn:srvc.getSafeDate(pf.fhCrcn),//pf.fhCrcn,//FH_CRCN
                            fhModf:srvc.getSafeDate(pf.fhModf),//pf.fhModf,//FH_MODF
                        }
                        */
                    ]
                };

                console.log(pf);
                console.log(p);
                var data={};
                if(!_.isNil(pf.idPrycFecha)) data.idPrycFecha=pf.idPrycFecha;
                if(!_.isNil(p.idProyecto)) data.idProyecto=p.idProyecto;
                if(!_.isNil(pf.fhInicio)) data.fhInicio=srvc.getSafeDate(pf.fhInicio);
                if(!_.isNil(pf.fhFin)) data.fhFin=srvc.getSafeDate(pf.fhFin);
                if(!_.isNil(pf.fhFinEstimado)) data.fhFinEstimado=srvc.getSafeDate(pf.fhFinEstimado);
                if(!_.isNil(pf.fhCierre)) data.fhCierre=srvc.getSafeDate(pf.fhCierre);
                if(!_.isNil(pf.fhCrcn)) data.fhCrcn=srvc.getSafeDate(pf.fhCrcn);
                if(!_.isNil(pf.fhModf)) data.fhModf=srvc.getSafeDate(pf.fhModf);
                console.log(data);

                ob.data.push(data);

                console.log("proyectosSrvc.convertPrycFechasToTableDef - end");

                return ob;
            };

            srvc.convertPrycEtapaFechasToTableDef=function (proy,lstEtapas) {
                console.log("proyectosSrvc.convertPrycEtapaFechasToTableDef - ini");
                var ob={
                    tabledef:{
                        txSchema:"DATAUSER",
                        txTable:"ASPS_PRYC_ETAPA_FECHAS"
                    },
                    data:[]
                };

                var tmpOb;
                var tmpData;
                for(var i in lstEtapas){
                    tmpOb=lstEtapas[i];
                    tmpData={};
                    if(!_.isNil(tmpOb.idPrycEtapaFecha)) tmpData.idPrycEtapaFecha=tmpOb.idPrycEtapaFecha;
                    if(!_.isNil(proy.idProyecto)) tmpData.idProyecto=proy.idProyecto;
                    if(!_.isNil(tmpOb.etapa.idPrycEtapa)) tmpData.idPrycEtapa=tmpOb.etapa.idPrycEtapa;
                    if(!_.isNil(tmpOb.fhInicio)) tmpData.fhInicio=srvc.getSafeDate(tmpOb.fhInicio);
                    if(!_.isNil(tmpOb.fhFin)) tmpData.fhFin=srvc.getSafeDate(tmpOb.fhFin);
                    if(!_.isNil(tmpOb.fhFinEstimado)) tmpData.fhFinEstimado=srvc.getSafeDate(tmpOb.fhFinEstimado);
                    if(!_.isNil(tmpOb.fhCierre)) tmpData.fhCierre=srvc.getSafeDate(tmpOb.fhCierre);
                    if(!_.isNil(tmpOb.fhCrcn)) tmpData.fhCrcn=srvc.getSafeDate(tmpOb.fhCrcn);
                    if(!_.isNil(tmpOb.fhModf)) tmpData.fhModf=srvc.getSafeDate(tmpOb.fhModf);
                    tmpData.bnActivo=iss.toNumberBoolFromVarWithDefault(tmpOb.bnActivo,1);

                    ob.data.push(tmpData);
                }

                console.log(ob);

                console.log("proyectosSrvc.convertPrycEtapaFechasToTableDef - ini");

                return ob;
            };

            //ASPS_PRYC_INVOLUCRADOS
            srvc.convertPrycInvolucradosToTableDef=function (p,gridInvl) {
                console.log("proyectosSrvc.convertPrycInvolucradosToTableDef - ini");

                console.log(p);
                console.log(gridInvl);

                var lstInvlData=gridInvl.data;

                var ob={
                    tabledef:{
                        txSchema:"DATAUSER",
                        txTable:"ASPS_PRYC_INVOLUCRADOS"
                    },
                    data:[]
                };

                var iOb;
                for(var i in lstInvlData){
                    iOb={};

                    if(!_.isNil(p.idProyecto)) iOb.idProyecto = p.idProyecto;

                    if(!_.isNil(lstInvlData[i].idPrycInvolucrado)){
                        iOb.idPrycInvolucrado = lstInvlData[i].idPrycInvolucrado;
                    }

                    if(!_.isNil(lstInvlData[i].idPersona)) iOb.idPersona = lstInvlData[i].idPersona;
                    if(!_.isNil(lstInvlData[i].idInvlTipo)) iOb.idInvlTipo = lstInvlData[i].idInvlTipo;
                    if(!_.isNil(lstInvlData[i].bnAprueba)) iOb.bnAprueba = lstInvlData[i].bnAprueba?1:0;
                    if(!_.isNil(lstInvlData[i].bnReporta)) iOb.bnReporta = lstInvlData[i].bnReporta?1:0;
                    if(!_.isNil(lstInvlData[i].bnResponsableReporte)) iOb.bnResponsableReporte = lstInvlData[i].bnResponsableReporte?1:0;


                    if(!_.isNil(lstInvlData[i].fhCrcn)){
                        iOb.fhCrcn = srvc.getSafeDateTime(iOb.fhCrcn);
                    }else{
                        iOb.fhCrcn = srvc.getSafeDateTime(new Date());
                    }

                    if(!_.isNil(lstInvlData[i].bnActivo)){
                        iOb.bnActivo = (lstInvlData[i].bnActivo)?1:0;
                    }else{
                        iOb.bnActivo = 1;
                    }


                    ob.data.push(iOb);
                }

                console.log(ob);

                console.log("proyectosSrvc.convertPrycInvolucradosToTableDef - end");

                return ob;
            };

            //ASPS_PRYC_INVOLUCRADOS
            srvc.convertPrycInvolucradosToTableDefUpdateWhere=function (p) {
                console.log("proyectosSrvc.convertPrycInvolucradosToTableDefUpdateWhere - ini");
                console.log(p);

                var ob={
                    tabledef:{
                        txSchema:"DATAUSER",
                        txTable:"ASPS_PRYC_INVOLUCRADOS",
                        tranType:"updateWhere"
                    },
                    data:{
                        bnActivo:0
                    },
                    lstObConditions:[
                        {
                            txCol: "ID_PROYECTO",
                            tAlias:"",
                            varValue: p.idProyecto,
                            txValueType: "NUMERO",
                            txLogicOperator: "AND",
                            txCompOperator: "="
                        }
                    ]
                };

                console.log("proyectosSrvc.convertPrycInvolucradosToTableDefUpdateWhere - end");

                return ob;
            };

            srvc.getRequestEtapaFechasUpdateWhere=function (p) {
                console.log("proyectosSrvc.getRequestEtapaFechasUpdateWhere - ini");
                console.log(p);

                var ob={
                    tabledef:{
                        txSchema:"DATAUSER",
                        txTable:"ASPS_PRYC_ETAPA_FECHAS",
                        tranType:"updateWhere"
                    },
                    data:{
                        bnActivo:0
                    },
                    lstObConditions:[
                        {
                            txCol: "ID_PROYECTO",
                            tAlias:"",
                            varValue: p.idProyecto,
                            txValueType: "NUMERO",
                            txLogicOperator: "AND",
                            txCompOperator: "="
                        }
                    ]
                };

                console.log("proyectosSrvc.getRequestEtapaFechasUpdateWhere - end");

                return ob;
            };




            srvc.getTableDefFromVM=function (vm) {
                console.log("proyectosSrvc.getTableDefFromVM - ini");
                //vm.m.p.txFolioCii
                var proyecto=srvc.convertProyectoToTableDef(vm.m.p,vm);
                //vm.m.pf.fhInicio
                var prycFechas=srvc.convertPrycFechasToTableDef(vm.m.pf,vm.m.p);

                var etapasUpdate=srvc.getRequestEtapaFechasUpdateWhere(vm.m.p);

                var etapas=srvc.convertPrycEtapaFechasToTableDef(vm.m.p,vm.gridEtapas.data);

                var invlUpdate=srvc.convertPrycInvolucradosToTableDefUpdateWhere(vm.m.p);

                var invl=srvc.convertPrycInvolucradosToTableDef(vm.m.p,vm.gridInvl);

                console.log([proyecto,prycFechas,etapas,invl]);

                cbs.putArrayData([proyecto,prycFechas,etapasUpdate,etapas,invlUpdate,invl],srvc.e.putData);
                console.log("proyectosSrvc.getTableDefFromVM - end");
            };



            //Funcion de inicializacion -------
            srvc.initModel=function () {
                console.log("proyectosSrvc - Init Model - Ini");

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
                    getCatalogos:"proyectosSrvc.getCatalogos",
                    getEtapas:catEtapasSrvc.e.getEtapas,
                    getUsuarioById:"proyectosSrvc.getUsuarioById",
                    getUsuarios:"proyectosSrvc.getUsuarios",
                    putPersona:"proyectosSrvc.putPersona",
                    putEtapaError:"proyectosSrvc.putEtapaError",
                    getLoginTipo:"proyectosSrvc.getLoginTipo",
                    getCountTxUsuario:"proyectosSrvc.getCountTxUsuario",
                    delElement:"proyectosSrvc.delElement",
                    getRoles:"proyectosSrvc.getRoles",
                    getInvolucradosBusqueda:"proyectosSrvc.getInvolucradosBusqueda",
                    getConsultaInvolucrados:catTipoInvolucradosSrvc.e.getConsulta,
                    putData:"proyectosSrvc.putData",
                    getProyectos:"proyectosSrvc.getProyectos",
                    getProyecto:"proyectosSrvc.getProyecto",
                    getInvolucrados:"proyectosSrvc.getInvolucrados",
                    getRequestEtapasProyectoById:'proyectosSrvc.getRequestEtapasProyectoById',
                    getAreas:catAreasSrvc.e.getAreas,
                    getSubdirecciones:catSubdireccionSrvc.e.getSubdirecciones,
                    getTipoProyecto:'proyectosSrvc.getTipoProyecto',
                    getEstatus:'proyectosSrvc.getEstatus',
                };

                console.log("proyectosSrvc - Init Model - Ended");
            };


            srvc.initModel();
        }
    ]);