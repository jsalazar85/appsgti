angular
    .module('RDash')
    .controller('tableroAreaNegocioViewCtrl', [
        '$scope',
        '$rootScope',
        '$state',
        '$stateParams',
        'dataController',
        'globalsController',
        'dataStoreService',
        'consoleService',
        '$interval',
        'toolsService',
        'chartDataService',
        'uiGridConstants',
        function ($scope,$rootScope,$state,$stateParams,dc,gc,dss,cs,$interval,tools,cds,uiGridConstants)  {
            //<editor-fold desc="Mapa">

            ///<editor-fold desc="Mapa">


            //<editor-fold desc="Init">
            $scope.initInfos=function () {
                $scope.info={
                    cpu:{
                        title:"Uso CPU Promedio Total",
                        data:"3",
                        classInfo:"fa-microchip fa-3x"
                    },
                    disco:{
                        title:"Uso de Disco Promedio",
                        data:"3",
                        classInfo:"fa-hdd-o fa-3x"
                    },
                    servidores:{
                        title:"Servidores del Area",
                        data:"1001",
                        classInfo:"fa-server fa-3x"
                    },
                    memoria:{
                        title:"Uso de Memoria Promedio",
                        data:"1001",
                        classInfo:"fa-building-o fa-3x"
                    }
                }
            };

            $scope.initMock=function () {
                $scope.areaAcumulado=[
                    {
                        txArea:"Area 1",
                        nuCPU:9230,
                        nuMemoria:40,
                        nuDisco:30
                    },
                    {
                        txArea:"Area 2",
                        nuCPU:9230,
                        nuMemoria:40,
                        nuDisco:30
                    },
                    {
                        txArea:"Area 3",
                        nuCPU:59,
                        nuMemoria:40,
                        nuDisco:30
                    },
                    {
                        txArea:"Area 4",
                        nuCPU:59,
                        nuMemoria:40,
                        nuDisco:30
                    }
                ];
            };

            $scope.initSrv=function () {
                var lstObConditions=[];
                lstObConditions.push($scope.area.filters[0]);
                    cds.addWorkTask('smfind.tab02.totales',{
                        url:gc.conf.xsDEVServicesBaseUrl+'/execTabQueryFilter.xsjs',
                        query:{
                            idTab:1001,
                            idGra:204,
                            idQry:1,
                            lstObConditions:lstObConditions
                        },
                        success: function(response){
                            console.log("success");
                            console.log(response);
                            var responseData=response.data[0];
                            $scope.info.servidores.data=responseData.nuServidores;
                            $scope.info.cpu.data=responseData.nuCpuPromedio / 100;
                            $scope.info.memoria.data=responseData.nuMemoriaPromedio / 100;
                            $scope.info.disco.data=responseData.nuDiscoPromedio / 100;
                        },
                        error: function(response,error){
                            console.log("Error");
                            console.log(error);
                            $scope.detalleExcelOpt.matchColumnDef  = [];
                            $scope.colRequeridasOpt.data = [];
                            $scope.detalleExcelOpt.matchColumnHead = [];
                        }
                    });
            };

            $scope.actualizarFiltro=function ($event) {
                $scope.area.filters=[
                    {
                        txCol:"RN",
                        txAlias:"",
                        varValue:20,
                        txValueType:"NUMERO",
                        txLogicOperator:"AND",
                        txCompOperator:"<="
                    }
                ];
            };
            
            $scope.init=function () {
                if(angular.isDefined($rootScope.selectedArea)){
                    var txArea=$rootScope.selectedArea.txArea;
                    $scope.txAreaNegocio=txArea;
                    //Filtros
                    $scope.area={
                        filters:[
                            {
                                txCol:"TX_AREA_NEGOCIO",
                                txAlias:"",
                                varValue:txArea,
                                txValueType:"TEXTO",
                                txLogicOperator:"AND",
                                txCompOperator:"="
                            },
                            {
                                txCol:"RN",
                                txAlias:"",
                                varValue:20,
                                txValueType:"NUMERO",
                                txLogicOperator:"AND",
                                txCompOperator:"<="
                            }
                        ]
                    };
                }


                $scope.initInfos();
                $scope.initMock();
                $scope.initSrv();

                $rootScope.$on('area4Click',function (event,chartEvent,chart) {
                    console.log(chartEvent);
                });
                cds.doWorkTask('smfind.tab02.totales');

            };
            //</editor-fold desc="Init">

            $scope.init();
        }]);