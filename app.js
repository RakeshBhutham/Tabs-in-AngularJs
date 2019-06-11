define(['angularAMD', 'angular', 'angular-route', 'angular-ui-router', 'bootstrap', 'toastr', 'angular-translate', 'angular-translate-loader-partial', 'js/constants/config', 'angucomplete'], function(angularAMD) {
    var app = angular.module("app", ['ngAnimate', 'ui.router', 'ui.bootstrap', 'toastr', 'pascalprecht.translate', 'angucomplete-alt']);

    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'config', function($stateProvider, $urlRouterProvider, $locationProvider, config) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/main');
        $stateProvider
            .state('home', {
                url: '',
                abstract: true,
                views: {
                    'mainsection': angularAMD.route({
                        templateUrl: 'views/homelayout.html?' + version,
                        controllerUrl: 'js/appctrl'
                    })
                }
            })
            .state('home.main', {
                url: '/main',
                views: {
                    'publicsection': angularAMD.route({
                        templateUrl: 'views/home.html?' + version,
                        controllerUrl: 'js/homectrl'
                    })
                },
                data: {
                    title: "Make Enriching Careers Happen | UnoCareer",
                    description: "UnoCareer is a unique product and services company creating a Talent Market Place for Employers, Institutes and Candidates to come together and bridge demand supply gaps."
                }
            });

    }]);


    app.config(['$compileProvider', function($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
    }]);

    app.run(['$rootScope', '$state', '$window', '$translate',
        function($rootScope, $state, $window, $translate) {
            $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
                $rootScope.metaTitle = "";
                $rootScope.metaDescription = '';
                if (toState.data != undefined) {
                    $rootScope.metaTitle = toState.data.title;
                    $rootScope.metaDescription = toState.data.description;
                }
            });

            $rootScope.$on("$stateChangeSuccess", function(event, currentRoute, previousRoute) {
                window.scrollTo(0, 0);
            });


            //Transload the json file dynamically
            $rootScope.$on('$translatePartialLoaderStructureChanged', function() {
                $translate.refresh();
            });

        }

    ]);

    app.service("httpService", ['$http', 'config', '$window', 'notifyMessage', function($http, config, $window, notifyMessage) {
        $http.defaults.headers.post['Content-Type'] = 'application/json';

        /**
         * commonHttpErrorHandler	: Common error handler which will be called from the catch block of http requests
         * @param					: error (error object)
         * @param					: options (optional object with handler functions)
         */

        this.postlogin = function(apiName, url, data) {
            return $http({
                url: config[apiName] + url,
                method: "POST",
                headers: {
                    "Authorization": "Basic 123==",
                    "Content-type": "application/json",
                    "timeout": 60000 //ms
                },
                data: data,
            });
        };

        this.get = function(apiName, url, data) {
            var headers = {
                "Authorization": localStorage.getItem('unoAccessToken')
            };
            return $http({
                url: config[apiName] + url,
                method: "GET",
                params: data,
                headers: headers
            });
        };

        this.post = function(apiName, url, data) {
            return $http({
                url: config[apiName] + url,
                method: "POST",
                data: data,
            });
        };

        this.head = function(apiName, url, data) {
            return $http({
                url: config[apiName] + url,
                method: 'HEAD',
                params: data
            });
        };

    }]);

    app.factory('notifyMessage', ['toastr',
        function(toastr) {
            return {
                showNotification: function(title, message, type) {
                    if (type == "success") {
                        toastr.success(message, title);
                    } else if (type == "error") {
                        toastr.error(message, title);
                    } else if (type == "snackbar") {
                        toastr.snackBar(message, {
                            closeButton: true,
                            closeHtml: '<button class="snack-bar-color">&times;</button>',
                            timeOut: 5000,
                            messageClass: 'snack-bar-color'
                        });
                    }
                }
            };
        }
    ]);

    app.factory('langStorage', ['$window',
        function($window) {
            return {
                put: function(name, value) {
                    $window.localStorage.setItem(name, value);
                },
                get: function(name) {
                    return $window.localStorage.getItem(name);
                }
            };
        }
    ]);

    app.config(['$translateProvider', '$translatePartialLoaderProvider',
        function($translateProvider, $translatePartialLoaderProvider) {
            $translateProvider.useLoader('$translatePartialLoader', {
                urlTemplate: 'modules/{part}/{lang}.json'
            });
            $translateProvider.preferredLanguage('en');
            $translateProvider.useStorage('langStorage');
            $translateProvider.forceAsyncReload(true);
            $translateProvider.useSanitizeValueStrategy('escaped');
        }
    ]);

    app.directive('onlyNumbers', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = text.replace(/[^0-9]/g, '');
                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return '';
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    });

    return angularAMD.bootstrap(app);
});