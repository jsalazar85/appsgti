angular
    .module('RDash')
    .service('etapasProyectoSrvc',[
        '$rootScope',
        'globalsController',
        function ($rootScope,gc){
            srvc=this;

            //mock model
            srvc.mockData=function () {
                var etapas=[
                    {
                        idPrycEtapa:1,
                        txEtapa:"Análisis",
                        nuSecuencia:1
                    },
                    {
                        idPrycEtapa:2,
                        txEtapa:"Diseño",
                        nuSecuencia:2
                    }
                ];

                var estatus=[
                    {
                        idPrycEstatus:1,
                        txEstatus:"En Ejecución"
                    },
                    {
                        idPrycEstatus:2,
                        txEstatus:"Cerrado"
                    }
                ];

                srvc.model={};
                srvc.model.etapas=etapas;
                srvc.model.estatus=estatus;
            };
        }
    ]);