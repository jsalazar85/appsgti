angular
    .module('RDash')
    .controller('loginCtrl',[
        '$scope',
        '$rootScope',
        'appSecService',
        function ($scope,$rootScope,appSecService) {
            var ctrl = this;

            //<editor-fold desc="EVENTOS SERVICIOS"> ///////////////
            ctrl.onGetLoginInfoByTxLogin=function (event,data) {
                console.log("loginCtrl.onGetLoginInfoByTxLogin ini");
                console.log(data);
                var res=data.data;

                ctrl.txReqResponse="";

                if(_.isNil(res[0])){
                    ctrl.txReqResponse="Usuario o contraseña incorrecta";
                }else{
                    //Obtener el tipo de login
                    res=res[0];
                    console.log(res);
                    ctrl.usr=res;
                    if(res.idLoginTipo==1){
                        console.log("active directory");
                        appSecService.getLoginLdap(ctrl.txLogin,ctrl.txPwd);
                    }else{
                        console.log("sistema");
                        appSecService.getLoginAccess(ctrl.txLogin,ctrl.txPwd);
                    }
                }
                console.log("loginCtrl.onGetLoginInfoByTxLogin end");
            };

            ctrl.onGetLoginAccess=function (event,data) {
                console.log("loginCtrl.onGetLoginAccess ini");

                console.log(data);
                var res=data.data;
                if(_.isNil(res[0])){
                    ctrl.txReqResponse="Usuario o contraseña incorrecta";
                }else{
                    res=res[0];
                    appSecService.setLoguedUser(ctrl.usr,true);
                    $rootScope.$emit("loginSuccess",ctrl.usr);
                }

                console.log("loginCtrl.onGetLoginAccess end");

            };

            ctrl.onGetLoginLdap=function (event,data) {
                console.log("loginCtrl.onGetLoginLdap ini");
                console.log(data);
                var res=data;
                if(res.logueado){
                    appSecService.setLoguedUser();
                }else{

                }
                console.log("loginCtrl.onGetLoginLdap ini");
            };

            //</editor-fold>

            ctrl.clickGuardar=function () {
                console.log("loginCtrl.clickGuardar ini");

                //Ejecutar servicio para obtener tipo de login
                appSecService.getLoginInfoByTxLogin(ctrl.txLogin);

                console.log("loginCtrl.clickGuardar end");
            };

            ctrl.$onInit=function () {
                console.log('loginCtrl.$onInit ini');

                console.log(appSecService);

                //ctrl.initModel();

                //Inscribir eventos
                appSecService.suscribe($scope,ctrl.onGetLoginInfoByTxLogin,appSecService.e.getRequestLoginInfoByTxLogin);
                //getLoginAccess
                appSecService.suscribe($scope,ctrl.onGetLoginAccess,appSecService.e.getLoginAccess);
                //getLoginLdap
                appSecService.suscribe($scope,ctrl.onGetLoginLdap,appSecService.e.getLoginLdap);

                console.log('loginCtrl.$onInit end');
            };
        }])
        .component('loginComp', {
            templateUrl:'templates/login.comp.html',
            controller:'loginCtrl'
        });