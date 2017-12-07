angular
    .module('RDash')
    .service('tableroResumenSrvc',[
        '$rootScope',
        'chartDataService',
        'globalsController',
        function ($rootScope,cds,gc){
            var mockEnable=true;

            //<editor-fold desc="MODEL">
            //Definición de los modelos
            this.models={
                lstObTotales:[],
                lstObTablasEsquemasDW:[
                ],
                lstObTablasEsquemasSA:[
                ]
            };
            //</editor-fold>


            //<editor-fold desc="Eventos">
            this.obEvents={
                GET_TOTALES:'tableroResumenSrvc.getTotales',
                GET_TABLAS_DW:'tableroResumenSrvc.getTablasDW'
            };

            this.suscribe=function (scope,callback,txEvent){
                var handler=$rootScope.$on(txEvent,callback);
                scope.$on('$destroy',handler);
            };

            this.notify=function (txEventName,obParm) {
                $rootScope.$emit(txEventName,obParm);
            };
            //</editor-fold>

            //<editor-fold desc="Definiciones">
            this.lstObServData=[];
            //</editor-fold>

            //<editor-fold desc="Funciones de Servicios">
            this.getDataTotales=function () {
                /*
                if(mockEnable){
                    var lstObTotales=this.mockTotales();
                    this.models.lstObTotales=lstObTotales;
                    this.notify(this.obEvents.GET_TOTALES,this.models.lstObTotales);
                }else{
                    //Llamar al servicios web
                    var EVENT_NAME=this.obEvents.GET_TOTALES;
                    var srv=this;
                    cds.addWorkTask('tableroResumenSrvc.getDataTotales',{
                        url:gc.conf.xsServicesBaseUrl+'/execTabQueryFilter.xsjs',
                        query:{
                            idTab:3001,
                            idGra:30101001,
                            idQry:1,
                            lstObConditions:null
                        },
                        success: function(response){
                            console.log("success");
                            console.log(response);
                            srv.notify(EVENT_NAME,response.data);
                        },
                        error: function(response,error){
                            console.log("Error");
                            console.log(error);
                        }
                    });
                    cds.doWorkTask('tableroResumenSrvc.getDataTotales   ');

                }
                */

                //Llamar al servicios web
                var EVENT_NAME=this.obEvents.GET_TOTALES;
                var srv=this;
                cds.addWorkTask('tableroResumenSrvc.getDataTotales',{
                    url:gc.conf.xsServicesBaseUrl+'/execTabQueryFilter.xsjs',
                    query:{
                        idTab:3001,
                        idGra:30101001,
                        idQry:1,
                        lstObConditions:null
                    },
                    success: function(response){
                        console.log("success");
                        console.log(response);
                        srv.notify(EVENT_NAME,response.data);
                    },
                    error: function(response,error){
                        console.log("Error");
                        console.log(error);
                    }
                });
                cds.doWorkTask('tableroResumenSrvc.getDataTotales');
            };

            this.getDataTablasDW=function(){
                /*
                if(mockEnable){
                    var lstOb=this.mockTablasDW();
                    this.models.lstObTablasEsquemasDW=lstOb;
                    this.notify(this.obEvents.GET_TABLAS_DW,this.models.lstObTablasEsquemasDW);
                }else{

                }
                */
                var EVENT_NAME=this.obEvents.GET_TABLAS_DW;
                var srv=this;
                cds.addWorkTask('tableroResumenSrvc.getDataTablasDW',{
                    url:gc.conf.xsServicesBaseUrl+'/execTabQueryFilter.xsjs',
                    query:{
                        idTab:3001,
                        idGra:30101002,
                        idQry:1,
                        lstObConditions:null
                    },
                    success: function(response){
                        console.log("success");
                        console.log(response);
                        srv.notify(EVENT_NAME,response.data);
                    },
                    error: function(response,error){
                        console.log("Error");
                        console.log(error);
                    }
                });
                cds.doWorkTask('tableroResumenSrvc.getDataTablasDW');
            };
            //</editor-fold>


            //<editor-fold desc="Mock">
            //Obtiene los totales
            this.mockTotales=function () {
                var mockEsquema=[
                    {
                        txSchema:'DW',
                        nuTotalRows:100
                    },
                    {
                        txSchema:'SA',
                        nuTotalRows:100
                    }
                ];

                return mockEsquema;
            };

            this.mockTablasDW=function () {
                var mock=[
                    {
                        txSchema:"CRDDW",
                        txTabla:"CRDO_RCL_PRD",
                        txSchemaTabla:"CRDDW.CRDO_RCL_PRD",
                        nuRows:1231
                    },
                    {
                        txSchema:"CRDDW",
                        txTabla:"SLCD",
                        txSchemaTabla:"CRDDW.SLCD",
                        nuRows:12341
                    },
                    {
                        txSchema:"CRDDW",
                        txTabla:"CRDO_CNC",
                        txSchemaTabla:"CRDDW.CRDO_CNC",
                        nuRows:982
                    }
                ];
                return mock;
            };
            //</editor-fold>
        }
    ]);
