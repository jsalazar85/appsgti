angular
    .module('RDash')
    .controller('proyectosCtrl',[
        '$scope',
        '$rootScope',
        '$mdSidenav',
        function ($scope,$rootScope,$mdSidenav){
            var ctrl=this;



            //<editor-fold desc="Events Callbacks">
            //</editor-fold>

            //<editor-fold desc="Component Lifecycle">
            ctrl.$onInit=function () {
                console.log('proyectosCtrl');
                ctrl.gridOptions1 = {
                    enableSorting: true,
                    columnDefs: [
                        { field: 'name' },
                        { field: 'gender' },
                        { field: 'company', enableSorting: false }
                    ],
                    data:[
                        {
                            "name": "Ethel Price",
                            "gender": "female",
                            "company": "Enersol"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        },
                        {
                            "name": "Claudine Neal",
                            "gender": "female",
                            "company": "Sealoud"
                        }
                    ]
                };
                $scope.gridOptions1=ctrl.gridOptions1;
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
    .component('proyectos', {
        templateUrl:'templates/proyectos.comp.html',
        controller:'proyectosCtrl'
    });

