var version = "v=" +"##ucVersion##";//appended to html files in modules(not for index.html)
require.config({
    baseUrl : '',
    waitSeconds: 0,
    urlArgs: "v=1",//this will be appended to the requested library js files
    paths : {
        'angular'               			: 'js/libs/angular.min',
        'angular-route'         			: 'js/libs/angular-route.min',
        'angularAMD'           				: 'js/libs/angularAMD.min',
        'angular-ui-router'     			: 'js/libs/angular-ui-router.min',
        'bootstrap'             			: 'js/libs/bootstrap.min',
        'toastr' 							: 'js/libs/toastr.min',
        'angucomplete'         				: 'js/libs/angucomplete',
		'angular-translate'					: 'js/libs/angular-translate.min',
		'angular-translate-loader-partial'	: 'js/libs/angular-translate-loader-partial.min',
        'angularanimate'					: 'js/libs/angular-animate.min',
        'app'						    	: 'js/app'
        
    },
    shim : {
        'angular'               			: {exports : 'angular'},
        'angularAMD'            			: ['angular'],
        'angular-route'         			: ['angular'],
        'angular-ui-router'     			: ['angular'],
        'bootstrap'             			: ['angular'],
        'angularanimate'					: ['angular'],
		'toastr'							: ['angularanimate'],
		'angucomplete'          			: ['angular'],
		'angular-translate'      			: ['angular'],
		'angular-translate-loader-partial'	: ['angular-translate'],
		
        
    },
    deps : ['app']
});
