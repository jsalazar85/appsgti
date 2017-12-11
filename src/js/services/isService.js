angular
    .module('RDash')
    .service('isService',[
        '$rootScope',
        function ($rootScope) {
            var ctrl=this;

            //Valida si una cadena es nula o cadena vacia.
            ctrl.isEmptyStr=function (tx) {
                var response=false;

                if(_.isString(tx)){
                    if(tx.length<=0 || _.isNil(tx)){
                        response=true;
                    }
                }else{
                    response=true;
                }

                return response;
            };

            //Convierte una cadena de tipo 1 con el sig formato:
            //"2017-12-08 00:00:00.0000000"
            //Convierte a date solo tomando anio, mes y dia
            ctrl.toDateFromStr1=function (tx) {
                var response=null;

                if(!ctrl.isEmptyStr(tx)){
                    var tmpArray1=tx.split(" ");
                    var tmpStr=tmpArray1[0];
                    var tmpArray2=tmpStr.split("-");

                    response=new Date(tmpArray2[0],tmpArray2[1]-1,tmpArray2[2],0,0,0,0,0);

                }

                console.log(response);

                return response;
            };

            //Convierte una cadena de tipo 2017-12-08 con el sig formato:
            //"2017-12-08 00:00:00.0000000"
            //Convierte a date solo tomando anio, mes y dia
            ctrl.toDateFromStr1Date=function (tx) {
                var response=null;

                if(!ctrl.isEmptyStr(tx)){
                    var tmpArray2=tx.split("-");
                    response=new Date(tmpArray2[0],tmpArray2[1]-1,tmpArray2[2],0,0,0,0,0);
                }

                console.log(response);

                return response;
            };

            ctrl.toDateTimeFromStr1=function (tx) {
                console.log("isService.toDateTimeFromStr1 ini");
                var response=null;

                if(!_.isNil(tx)){
                    var tmpArray1=tx.split(" ");
                    console.log(tmpArray1);
                    var tmpStr=tmpArray1[0];
                    console.log(tmpStr);
                    var tmpArray2=tmpStr.split("-");
                    console.log(tmpArray2);

                    //obtener el tiempo hasta segundos
                    tmpStr=tmpArray1[1];
                    var timeArr=tmpStr.split(":");
                    console.log(timeArr);

                    response=new Date(tmpArray2[0],tmpArray2[1]-1,tmpArray2[2],timeArr[0],timeArr[1],timeArr[2].split(".")[0],0,0);
                }

                console.log(response);
                console.log("isService.toDateTimeFromStr1 end");
                return response;
            };

            //Convierte bnActivo
            ctrl.toNumberBoolFromVar=function (value) {
                var bnNumber=null;

                if(!_.isNil(value)){
                    if(_.isBoolean(value)){
                        bnNumber=(value)?1:0;
                    }else if(_.isNumber(value)){
                        bnNumber=(value>=1)?1:0;
                    }
                }

                return bnNumber;
            };

            //Convierte bnActivo
            ctrl.toNumberBoolFromVarWithDefault=function (value,defValue) {
                var bnNumber=defValue;
                if(!_.isNil(value)){
                    bnNumber=ctrl.toNumberBoolFromVar(value);
                }
                return bnNumber;
            };


        }]);