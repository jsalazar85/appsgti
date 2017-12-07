angular
    .module('RDash')
    .service('catEtapasConsultaSrvc',[
        '$rootScope',
        'globalsController',
        function ($rootScope,gc){
            var srvc=this;

            srvc.initModel=function () {
                /*
                var m={
                    idPrctEtapa:null,
                    txEtapa:"",
                    nuSecuencia:null,
                    fhCrcn:new Date(),
                    fhModf:new Date(),
                };
                srvc.m=m;
                */

                //Lista de datos
                srvc.m={};
                srvc.m.lstEtapas=[];
            };

            srvc.initModel();
        }
    ]);