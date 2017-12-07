angular
    .module('RDash')
    .controller('tableroResumenViewCtrl', [
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
                    areas:{
                        title:"Áreas de Negocio",
                        data:"3",
                        classInfo:"fa-briefcase fa-3x"
                    },
                    plataformas:{
                        title:"Plataformas",
                        data:"3",
                        classInfo:"fa-archive fa-3x"
                    },
                    servidores:{
                        title:"Servidores",
                        data:"1001",
                        classInfo:"fa-server fa-3x"
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
                cds.addWorkTask('smfind.tab01.totales',{
                    url:gc.conf.xsDEVServicesBaseUrl+'/execTabQuery.xsjs',
                    query:{
                        idTab:1001,
                        idGra:1,
                        idQry:1
                    },
                    success: function(response){
                        console.log("success");
                        console.log(response);
                        var responseData=response.data[0];
                        $scope.info.servidores.data=responseData.nuServidores;
                        $scope.info.areas.data=responseData.nuAreaNegocio;
                        $scope.info.plataformas.data=responseData.nuPlataforma;
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

            $scope.init=function () {
                $scope.initInfos();
                $scope.initMock();
                $scope.initSrv();

                $rootScope.$on('area4Click',function (event,chartEvent,chart) {
                    console.log(chartEvent);
                });
                cds.doWorkTask('smfind.tab01.totales');

                $rootScope.$on('resumenAreaCick',function ($event,data) {

                    console.log("resumenAreaCick - INI");
                    console.log(data);
                    $rootScope.selectedArea=data.item.dataContext;
                    $rootScope.$emit('principalGoToTab',2);
                    console.log("resumenAreaCick - END");
                });

                $rootScope.$on('char1DataReady',function ($event,data) {
                    console.log("char1DataReady --- ini");
                    console.log($event);
                    console.log(data);

                    if(!_.isEmpty(data)){
                        $rootScope.selectedArea=data[0];
                    }

                    console.log("char1DataReady --- end");
                });
            };
            //</editor-fold desc="Init">

            $scope.init();
        }]);