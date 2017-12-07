angular
    .module('RDash')
    .service('detalleServidoresSrvc',[
        '$rootScope',
        'chartDataService',
        'globalsController',
        function ($rootScope,cds,gc){
            var mockEnable=false;

            this.obEvents={
                TABLE_DATA_RESPONSE:'detalleServidoresSrvc.TableDataResponse',
                GET_TABLE_DATA:'',
                GET_FECHA_COMBO_DATA:'detalleServidoresSrvc.GET_FECHA_COMBO_DATA'
            };

            //<editor-fold desc="Eventos">
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
            this.getTableData=function (obFecha) {
                if(mockEnable){
                    var lstObServ=this.mockServidores();
                    this.notify(this.obEvents.TABLE_DATA_RESPONSE,lstObServ);
                }else{
                    //Llamar al servicios web
                    var obConditions=[
                        {
                            txCol:"NU_FECHA",
                            txAlias:"",
                            varValue:obFecha.nuFecha,
                            txValueType:"NUMERO",
                            txLogicOperator:"AND",
                            txCompOperator:"="
                        }
                    ];
                    var TABLE_DATA_RESPONSE=this.obEvents.TABLE_DATA_RESPONSE;
                    var srv=this;
                    cds.addWorkTask('detalleServidoresSrvc.detalle',{
                        url:gc.conf.xsDEVServicesBaseUrl+'/execTabQueryFilter.xsjs',
                        query:{
                            idTab:1001,
                            idGra:301,
                            idQry:1,
                            lstObConditions:obConditions
                        },
                        success: function(response){
                            console.log("success");
                            console.log(response);
                            srv.notify(TABLE_DATA_RESPONSE,response.data);
                        },
                        error: function(response,error){
                            console.log("Error");
                            console.log(error);
                        }
                    });
                    cds.doWorkTask('detalleServidoresSrvc.detalle');
                }
            };

            this.getFechaComboData=function(){
                var srv=this;
                cds.addWorkTask('detalleServidoresSrvc.fechas',{
                    url:gc.conf.xsDEVServicesBaseUrl+'/execTabQueryFilter.xsjs',
                    query:{
                        idTab:1001,
                        idGra:302,
                        idQry:1,
                        lstObConditions:null
                    },
                    success: function(response){
                        console.log("success");
                        console.log(response);
                        srv.notify(srv.obEvents.GET_FECHA_COMBO_DATA,response.data);
                    },
                    error: function(response,error){
                        console.log("Error");
                        console.log(error);
                    }
                });
                cds.doWorkTask('detalleServidoresSrvc.fechas');
            }

            //</editor-fold>


            //<editor-fold desc="Mock">
            this.mockServidores=function () {
                var mockDataGrid=[
                    {
                        txArea:"Area1",
                        txServidor:"Servidor 1",
                        obFecha:{},
                        nuCPU:0.0,
                        nuMemoria:0.0,
                        nuDisco:0.0,
                        obSem:{
                            CPU:1,
                            Memoria:2,
                            Disco:3
                        },
                        txRemCPU:"test",
                        txRemMemoria:"test",
                        txRemDisco:"test"
                    },
                    {
                        txArea:"Area1",
                        txServidor:"Servidor 2",
                        obFecha:{},
                        nuCPU:0.0,
                        nuMemoria:0.0,
                        nuDisco:0.0,
                        obSem:{
                            CPU:1,
                            Memoria:2,
                            Disco:3
                        },
                        txRemCPU:"test",
                        txRemMemoria:"test",
                        txRemDisco:"test"
                    }
                ];


                mockDataGrid= _.concat(mockDataGrid,mockDataGrid,mockDataGrid,mockDataGrid,mockDataGrid);
                return mockDataGrid;
            };
            //</editor-fold>
        }
    ]);
