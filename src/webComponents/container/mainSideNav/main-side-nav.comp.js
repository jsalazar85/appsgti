angular
    .module('RDash')
    .controller('mainSideNavCtrl',[
        '$scope',
        '$rootScope',
        '$mdSidenav',
        '$state',
        function ($scope,$rootScope,$mdSidenav,$state){
            var ctrl=this;


            ctrl.toggle=function () {
                $mdSidenav('left').toggle();
            };
            //<editor-fold desc="Events Callbacks">
            //</editor-fold>

            //<editor-fold desc="Component Lifecycle">

            //<editor-fold desc="FUNCIONES CLICK"> ///////////////
            ctrl.onMenuClick=function (m) {
                console.log("onMenuClick");
                console.log(m);
                $state.transitionTo(m.txGoTo);
            };
            //</editor-fold> ////////////////////

            ctrl.$onInit=function () {
                console.log('InitExecuted');

                ctrl.vm={
                    menu:{
                        catalogos:[
                            {
                                txName:"Etapas",
                                txGoTo:"catalogoetapas"
                            },
                            {
                                txName:"Personas",
                                txGoTo:"catalogopersonas"
                            },
                            {
                                txName:"Usuarios",
                                txGoTo:"catalogousuarios"
                            },
                            {
                                txName:"Tipo Involucrados",
                                txGoTo:"catTipoInvolucradosConsulta"
                            },
                            {
                                txName:"Subdirecciones",
                                txGoTo:"catsubdirconsulta"
                            },
                            {
                                txName:"Areas",
                                txGoTo:"catareaconsulta"
                            }
                        ],
                        proyectos:[
                            {
                                txName:"Proyectos",
                                txGoTo:"proyectosconsulta"
                            },
                            {
                                txName:"Mis Proyectos",
                                txGoTo:"avanceproyectos"
                            }
                        ]
                    }
                };
            };
            ctrl.$onChanges=function () {

            };
            ctrl.$doCheck=function () {

            };
            ctrl.$onDestroy=function () {

            };
            ctrl.$postLink=function () {

            };
            //</editor-fold>
        }
    ])
    .component('mainSideNav', {
        templateUrl:'templates/main-side-nav.comp.html',
        controller:'mainSideNavCtrl'
    });

