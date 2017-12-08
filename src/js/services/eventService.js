
angular
    .module('RDash')
    .service('eventService',[
        '$rootScope',
        function ($rootScope) {
            var srvc=this;

            //<editor-fold desc="Eventos">
            srvc.suscribe=function (scope,callback,txEvent){
                var handler=$rootScope.$on(txEvent,callback);
                scope.$on('$destroy',handler);
            };

            srvc.notify=function (txEventName,obParm) {
                $rootScope.$emit(txEventName,obParm);
            };

            srvc.getBigIntId=function () {
                var now=new Date();
                var str="";
                str+=now.getFullYear();
                str+=_.padStart(now.getMonth()+1,2,'0');
                str+=_.padStart(now.getDate(),2,'0');
                str+=_.padStart(now.getHours(),2,'0');
                str+=_.padStart(now.getMinutes(),2,'0');
                str+=_.padStart(now.getSeconds(),2,'0');
                return str;
            };

            srvc.getBigIntIdFromDate=function (dt) {
                var now=dt;
                var str="";
                str+=now.getFullYear();
                str+=_.padStart(now.getMonth()+1,2,'0');
                str+=_.padStart(now.getDate(),2,'0');
                str+=_.padStart(now.getHours(),2,'0');
                str+=_.padStart(now.getMinutes(),2,'0');
                str+=_.padStart(now.getSeconds(),2,'0');
                return str;
            };

            srvc.getSafeDate=function (date) {
                console.log("srvc.getSafeDate ini");

                var str=_.attempt(function (date) {
                    var str="";
                    str+=date.getFullYear();
                    str+="-"+_.padStart(date.getMonth()+1,2,'0');
                    str+="-"+_.padStart(date.getDate(),2,'0');
                    return str;
                },date);

                if(_.isError(str)){
                    console.log("is error, returning null");
                    str=null;
                }

                console.log("srvc.getSafeDate end");
                return str;
            };

            srvc.getSafeDateTime=function (date) {
                console.log("srvc.getSafeDate ini");

                var str=_.attempt(function (date) {
                    var str="";
                    str+=date.getFullYear();
                    str+="-"+_.padStart(date.getMonth()+1,2,'0');
                    str+="-"+_.padStart(date.getDate(),2,'0');
                    str+=" "+_.padStart(date.getHours(),2,'0');
                    str+=":"+_.padStart(date.getMinutes(),2,'0');
                    str+=":"+_.padStart(date.getSeconds(),2,'0');
                    return str;
                },date);

                if(_.isError(str)){
                    console.log("is error, returning null");
                    str=null;
                }

                console.log("srvc.getSafeDate end");
                return str;
            };

            //</editor-fold>
        }
    ]);


