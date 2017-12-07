/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', [
        '$mdSidenav', '$mdBottomSheet', '$timeout', '$log','$scope'
        , MasterCtrl
    ]);

function MasterCtrl($mdSidenav, $mdBottomSheet, $timeout, $log,$scope) {
    var self = this;

    self.selected     = null;
    self.users        = [ ];

    $scope.toggleUsersList=function() {
        $mdSidenav('left').toggle();
    };
}
