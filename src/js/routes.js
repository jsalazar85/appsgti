'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

    
        // For unmatched routes
        $urlRouterProvider.otherwise('/avanceproyectos');

        // Application routes
        $stateProvider
            .state('carga', {
                url: '/carga',
                views:{
                    '':{
                        templateUrl: 'templates/tablero-carga-archivo-gen.view.html',
                        controller: 'tableroCargaArchivoGenCtrl'
                    }
                }
            })
            .state('test', {
                url: '/test',
                component:'involucradosProyectoComp',
                resolve:{
                }
            })
            .state('tablero', {
                url: '/tablero',
                views:{
                    '':{
                        templateUrl: 'templates/tablero-principal.view.html',
                        controller:'tableroPrincipalViewCtrl'
                    },
                    'resumen@tablero':{
                        templateUrl: 'templates/tablero-resumen.view.html',
                        controller:'tableroResumenViewCtrl'
                    },
                    'porArea@tablero':{
                        templateUrl: 'templates/tablero-area-negocio.view.html',
                        controller:'tableroAreaNegocioViewCtrl'
                    }
                }
            })
            .state('etapasproyecto', {
                url: '/etapasproyecto',
                component:'etapasProyectoComp',
                resolve:{
                    proyecto: function(){
                        return {
                            fhInicio: new Date(2017,0,2),
                            fhFin: new Date(2017,0,20),
                        };
                    },
                    etapa:function () {
                        return {
                            idPrycEtapa:1,
                            txEtapa:"Análisis"
                        };
                    }
                }
            })
            .state('catalogoetapas', {
                url: '/catalogoetapas',
                component:'catEtapasConsultaComp',
                resolve:{
                }
            })
            .state('catalogoetapasdetalle', {
                url: '/catalogoetapasdetalle/{idPrycEtapa}',
                component:'catEtapasDetalleComp',
                resolve:{
                    idPrycEtapa:['$transition$',function($transition$){
                        var _idPrycEtapa;
                        console.log("Init Transition idPrycEtapa");
                        console.log($transition$.params());
                        var parms=$transition$.params();
                        if(!_.isEmpty(parms) && !_.isEmpty(parms.idPrycEtapa)){
                            _idPrycEtapa=parms.idPrycEtapa;
                        }
                        console.log(_idPrycEtapa);
                        return _idPrycEtapa;
                    }],
                    onGuardar:['$transition$',function($transition$){
                        var guardar=function(event,data,msg){
                            console.log("Redireccionar - guardar");
                        };

                        return guardar;
                    }],
                    onSalir:['$transition$','$state',function($transition$,$state){
                        var evento=function(event,data,msg){
                            console.log("Redireccionar - salir");
                            $state.go("catalogoetapas");
                        };

                        return evento;
                    }]
                }
            })
            .state('catalogopersonas', {
                url: '/catalogopersonas',
                component:'catPersonasConsultaComp',
                resolve:{
                }
            })
            .state('catalogousuarios', {
                url: '/catalogousuarios',
                component:'catUsuariosConsultaComp',
                resolve:{
                }
            })
            .state('catalogopersonasdetalle', {
                url: '/catalogopersonasdetalle/{idPersona}',
                component:'catPersonasDetalleComp',
                resolve:{
                    idPersona:['$transition$',function($transition$){
                        var _id;
                        console.log("Init Transition idPersona");
                        console.log($transition$.params());
                        var parms=$transition$.params();
                        if(!_.isEmpty(parms) && !_.isEmpty(parms.idPersona)){
                            _id=parms.idPersona;
                        }
                        console.log(_id);
                        return _id;
                    }],
                    onGuardar:['$transition$',function($transition$){
                        var guardar=function(event,data,msg){
                            console.log("Redireccionar - guardar");
                        };

                        return guardar;
                    }],
                    onSalir:['$transition$','$state',function($transition$,$state){
                        var evento=function(event,data,msg){
                            console.log("Redireccionar - salir");
                            $state.go("catalogopersonas");
                        };

                        return evento;
                    }]
                }
            })
            .state('catalogousuariosdetalle', {
                url: '/catalogousuariosdetalle/{idLogin}',
                component:'catUsuariosDetalleComp',
                resolve:{
                    idLogin:['$transition$',function($transition$){
                        var _idLogin;
                        console.log("Init Transition _idLidLoginogin");
                        console.log($transition$.params());
                        var parms=$transition$.params();
                        if(!_.isEmpty(parms) && !_.isEmpty(parms.idLogin)){
                            _idLogin=parms.idLogin;
                        }
                        console.log(_idLogin);
                        return _idLogin;
                    }],
                    onGuardar:['$transition$',function($transition$){
                        var guardar=function(event,data,msg){
                            console.log("Redireccionar - guardar");
                        };

                        return guardar;
                    }],
                    onSalir:['$transition$','$state',function($transition$,$state){
                        var evento=function(event,data,msg){
                            console.log("Redireccionar - salir");
                            $state.go("catalogousuarios");
                        };

                        return evento;
                    }]
                }
            })
            .state('catTipoInvolucradosConsulta', {
                url: '/catTipoInvolucradosConsulta',
                component:'catTipoInvolucradosConsultaComp',
                resolve:{
                }
            })
            .state('catalogotipoinvolucradosdetalle', {
                url: '/catalogotipoinvolucradosdetalle/{idInvlTipo}',
                component:'catTipoInvolucradosDetalleComp',
                resolve:{
                    idInvlTipo:['$transition$',function($transition$){
                        var _id;
                        console.log("Init Transition _idLidLoginogin");
                        console.log($transition$.params());
                        var parms=$transition$.params();
                        if(!_.isEmpty(parms) && !_.isEmpty(parms.idInvlTipo)){
                            _id=parms.idInvlTipo;
                        }
                        console.log(_id);
                        return _id;
                    }],
                    onGuardar:['$transition$',function($transition$){
                        var guardar=function(event,data,msg){
                            console.log("Redireccionar - guardar");
                        };

                        return guardar;
                    }],
                    onSalir:['$transition$','$state',function($transition$,$state){
                        var evento=function(event,data,msg){
                            console.log("Redireccionar - salir");
                            $state.go("catTipoInvolucradosConsulta");
                        };

                        return evento;
                    }]
                }
            })
            .state('proyectosconsulta', {
                url: '/proyectosconsulta',
                component:'proyectosConsultaComp',
                resolve:{
                }
            })
            .state('proyectosnuevo', {
                url: '/proyectosnuevo/{idProyecto}',
                component:'proyectosDetalle',
                resolve:{
                    idProyecto:['$transition$',function($transition$){
                        var _id;
                        console.log("Init Transition idProyecto");
                        console.log($transition$.params());
                        var parms=$transition$.params();
                        if(!_.isEmpty(parms) && !_.isEmpty(parms.idProyecto)){
                            _id=parms.idProyecto;
                        }
                        console.log(_id);
                        return _id;
                    }],
                    onGuardar:['$transition$',function($transition$){
                        var guardar=function(event,data,msg){
                            console.log("Redireccionar - guardar");
                        };

                        return guardar;
                    }],
                    onSalir:['$transition$','$state',function($transition$,$state){
                        var evento=function(event,data,msg){
                            console.log("Redireccionar - salir");
                            $state.go("proyectosconsulta");
                        };

                        return evento;
                    }]
                }
            })
            .state('catsubdirconsulta', {
                url: '/catsubdirconsulta',
                component:'catSubdireccionConsultaComp',
                resolve:{
                }
            })
            .state('catsubdir', {
                url: '/catsubdir/{idSubdireccion}',
                component:'catSubdireccionDetalleComp',
                resolve:{
                    idSubdireccion:['$transition$',function($transition$){
                        var _id;
                        console.log("Init Transition idProyecto");
                        console.log($transition$.params());
                        var parms=$transition$.params();
                        if(!_.isEmpty(parms) && !_.isEmpty(parms.idSubdireccion)){
                            _id=parms.idSubdireccion;
                        }
                        console.log(_id);
                        return _id;
                    }],
                    onGuardar:['$transition$',function($transition$){
                        var guardar=function(event,data,msg){
                            console.log("Redireccionar - guardar");
                        };

                        return guardar;
                    }],
                    onSalir:['$transition$','$state',function($transition$,$state){
                        var evento=function(event,data,msg){
                            console.log("Redireccionar - salir");
                            $state.go("catsubdirconsulta");
                        };

                        return evento;
                    }]
                }
            })
            //catAreasConsultaComp
            .state('catareaconsulta', {
                url: '/catareaconsulta',
                component:'catAreasConsultaComp',
                resolve:{
                }
            })
            .state('catarea', {
                url: '/catarea/{idArea}',
                component:'catAreasDetalleComp',
                resolve:{
                    idArea:['$transition$',function($transition$){
                        var _id;
                        console.log("Init Transition idArea");
                        console.log($transition$.params());
                        var parms=$transition$.params();
                        if(!_.isEmpty(parms) && !_.isEmpty(parms.idArea)){
                            _id=parms.idArea;
                        }
                        console.log(_id);
                        return _id;
                    }],
                    onGuardar:['$transition$',function($transition$){
                        var guardar=function(event,data,msg){
                            console.log("Redireccionar - guardar");
                        };

                        return guardar;
                    }],
                    onSalir:['$transition$','$state',function($transition$,$state){
                        var evento=function(event,data,msg){
                            console.log("Redireccionar - salir");
                            $state.go("catsubdirconsulta");
                        };

                        return evento;
                    }]
                }
            })
            .state('login', {
                url: '/login',
                component:'loginComp',
                resolve:{
                }
            })
            .state('reporteavance', {
                url: '/reporteavance/{idProyecto}',
                component:'avanceProyectoDetalleComp',
                resolve:{
                    idProyecto:['$transition$',function($transition$){
                        var _id;
                        console.log("Init Transition idProyecto");
                        console.log($transition$.params());
                        var parms=$transition$.params();
                        if(!_.isEmpty(parms) && !_.isEmpty(parms.idProyecto)){
                            _id=parms.idProyecto;
                        }
                        console.log(_id);
                        return _id;
                    }],
                    onGuardar:['$transition$',function($transition$){
                        var guardar=function(event,data,msg){
                            console.log("Redireccionar - guardar");
                        };

                        return guardar;
                    }],
                    onSalir:['$transition$','$state',function($transition$,$state){
                        var evento=function(event,data,msg){
                            console.log("Redireccionar - salir");
                            $state.go("avanceproyectos");
                        };

                        return evento;
                    }]
                }
            })
            .state('avanceproyectos', {
                url: '/avanceproyectos',
                component:'avanceProyectoConsultaComp',
                resolve:{
                }
            })


        /*
         resolve:{
         idPrycEtapa:function($transition$){
         console.log("Init Transition idPrycEtapa");
         var idPrycEtapa=$transition$.params().idPrycEtapa;
         console.log(idPrycEtapa);
         return idPrycEtapa;
         }
         }
         */
            /*
            .state('proyectosnuevo', {
                url: '/proyectosnuevo',
                component:'proyectosDetalle',
                resolve:{
                }
            })
            */
    }
]).filter('percentFilter', function () {
    return function (value, scope) {
        var res="";
        if(angular.isDefined(value)){
            if(angular.isDefined(value.toFixed)){
                res=(value.toFixed(1)) +" %";
            }else{
                res=value+" %";
            }

        }
        return res;
    };
});;


