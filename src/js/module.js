//angular.module('RDash', ['ui.bootstrap', 'ui.router', 'ngCookies','nvd3']);
angular.module('RDash', [
    'ui.router',
    'ui.grid',
    'ngMaterial',
    'ui.grid'
]).config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoadingInterceptor');
}]).config(["$locationProvider", function($locationProvider) {
    $locationProvider.hashPrefix('!');
}]).config(["$mdThemingProvider", function($mdThemingProvider) {
    var neonRedMap = $mdThemingProvider.extendPalette('red', {
        '500': '#DA1A32',
    });

    // Register the new color palette map with the name <code>neonRed</code>
    $mdThemingProvider.definePalette('neonRed', neonRedMap);

    // Use that theme for the primary intentions
    $mdThemingProvider.theme('default')
        .primaryPalette('neonRed');
}]);;

