angular
    .module('RDash')
    .controller('mainContentCtrl',[
        '$scope',
        '$rootScope',
        function ($scope,$rootScope){
            var ctrl=this;


            //<editor-fold desc="Events Callbacks">
            //</editor-fold>

            //<editor-fold desc="Component Lifecycle">
            ctrl.$onInit=function () {
                console.log('InitExecuted');
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
    .component('mainContent', {
        templateUrl:'templates/main-content.comp.html',
        controller:'mainContentCtrl'
    });


