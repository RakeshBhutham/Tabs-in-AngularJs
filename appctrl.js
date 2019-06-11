define(['app'], function (app) {
	'use strict';
	return ['$scope', '$window', 'httpService', '$uibModal', 'notifyMessage', 'config', '$translatePartialLoader', '$translate',
		function ($scope, $window, httpService, $uibModal, notifyMessage, config, $translatePartialLoader, $translate, $state) {
			$translatePartialLoader.addPart('../lang');

		}
	];
});