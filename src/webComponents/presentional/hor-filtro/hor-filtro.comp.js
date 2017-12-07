angular
    .module('RDash')
    .controller('horFiltroCompCtrl',[
        '$scope',
        '$rootScope',
        function ($scope, $rootScope){
            var ctrl=this;

            //Convierte el objeto fuente en el objeto que se requiere para el select
            ctrl.convertToItemOb=function (lstOb,txId,txDesc) {
                var lstObItem=[];
                _.forEach(lstOb,function (ob){
                    if(ob.hasOwnProperty(txId) && ob.hasOwnProperty(txDesc)){
                        lstObItem.push({
                            idItem:ob[txId],
                            txItem:ob[txDesc],
                            obSrc:ob
                        });
                    }
                });
                return lstObItem;
            };

            ctrl.setDefaultSelect=function(obSrc,txIdField){
                if(!_.isNil(obSrc)){
                    var obItem=_.find(ctrl.lstObItems,function(o){
                        return o.obSrc[txIdField] == obSrc[txIdField];
                    });

                    ctrl.obSelectedItem=obItem;
                }
            };

            //<editor-fold desc="Eventos">
            $scope.$watch("$ctrl.obSelectedItem",function(newVal,oldVal){
                // console.log("obSelectedItem");
                // console.log(newVal);
                ctrl.onItemSelected({obItemSelected:newVal});
            });
            $scope.$watch("$ctrl.lstObSrc",function(newVal,oldVal){
                // console.log("obSelectedItem");
                // console.log(newVal);
                ctrl.lstObItems=ctrl.convertToItemOb(ctrl.lstObSrc,ctrl.txIdItemField,ctrl.txTxItemField);
                ctrl.setDefaultSelect(ctrl.obSrcDefault,ctrl.txIdItemField);
            });
            //</editor-fold>

            //<editor-fold desc="Component Lifecycle">
            ctrl.$onInit=function () {
                console.log('detalleServidoresTablaCtrl');

                ctrl.obSelectedItem={};
                ctrl.lstObItems=ctrl.convertToItemOb(ctrl.lstObSrc,ctrl.txIdItemField,ctrl.txTxItemField);
                ctrl.setDefaultSelect(ctrl.obSrcDefault,ctrl.txIdItemField);

                //console.log(ctrl.lstObServidor);
            };
            ctrl.$onChanges=function () {
                console.log(ctrl.lstObSrc);
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
    .component('horFiltro', {
        templateUrl:'templates/hor-filtro.comp.html',
        controller:'horFiltroCompCtrl',
        bindings:{
            lstObSrc:'<',
            txTitulo:'@',
            txIdItemField:'@',
            txTxItemField:'@',
            onItemSelected:'&',
            obSrcDefault:'<'
        }
    });
