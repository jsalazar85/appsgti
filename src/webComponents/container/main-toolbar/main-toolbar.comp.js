angular
    .module('RDash')
    .controller('mainToolbarCtrl',[
        '$scope',
        '$rootScope',
        '$mdSidenav',
        'appSecService',
        function ($scope,$rootScope,$mdSidenav,appSecService){
            var ctrl=this;

            ctrl.loadingIndicatorTask;

            ctrl.toggleList=function () {
                $mdSidenav('left').toggle();
            };

            //<editor-fold desc="Events Callbacks">
            //</editor-fold>

            //<editor-fold desc="Component Lifecycle">
            ctrl.$onInit=function () {
                console.log('InitExecuted');
                ctrl.txLogin=appSecService.usr.txLogin;
            };
            ctrl.$onChanges=function () {

            };
            ctrl.$doCheck=function () {

            };
            ctrl.$onDestroy=function () {

            };
            ctrl.$postLink=function () {

            };

            ctrl.confirmarSalir=function () {
                var res=confirm("¿Desea cerrar sesión?");
                if(res){
                    appSecService.logout();
                    $rootScope.$emit("logout");
                }
            };

            $rootScope.$on('onHttpActivity', function (event,data){
                //console.log('onHttpActivity *****************');
                //console.log(data);
                var isLoading=data;
                if(isLoading){
                    console.log("$rootScope.$on('onHttpActivity' 1");
                    $('#globalLoading').show();
                }else{
                    //$('#globalLoading').hide();
                    if(_.isNil(ctrl.loadingIndicatorTask)){
                        console.log("$rootScope.$on('onHttpActivity' 2");
                        var _ctrl=ctrl;
                        _ctrl.loadingIndicatorTask=setTimeout(function () {
                            $('#globalLoading').hide();
                            clearTimeout(_ctrl.loadingIndicatorTask);
                            _ctrl.loadingIndicatorTask=null;
                        },800);
                    }
                }
            });
            //</editor-fold>
        }
    ])
    .component('mainToolbar', {
        templateUrl:'templates/main-toolbar.comp.html',
        controller:'mainToolbarCtrl'
    });

