define(['app'], function() {
    'use strict';
    return ['$scope', '$state', 'httpService', '$http', '$interval',
        function($scope, $state, httpService, $http, $interval) {
            //$scope.loader = false;
            //$scope.tabdata = "Im data";
            //$scope.tryagain = false;
            //$scope.progress = 0;
            $scope.tryindex = 0;
            var httpresponse = false;
            var time = 0;
            var timeexpired = false;
            $scope.tabs = [
                { name: "menu1", url: "https://www.reddit.com/.json", isActive: "active" },
                { name: "menu2", url: "https://www.reddit.com/.json", isActive: "inactive" },
                { name: "menu3", url: "https://www.reddit.com/.json", isActive: "inactive" },
                { name: "menu4", url: "https://www.redit.com/.json", isActive: "inactive" },
                { name: "menu5", url: "https://www.reddit.com/.json", isActive: "inactive" }
            ];
            //$scope.taburl = [{ url: "https://www.reddit.com/.json" }, { url: "https://www.reddit.com/.json" }, { url: "https://www.reddit.com/.json" }, { url: "https://www.reddit.com/.json" }];
            $scope.tabaction = function(tabindex) {
                clearTimeout(time);
                var setActiveTab = function() {
                    $scope.tabs[$scope.tryindex].isActive = "inactive";
                    $scope.tabs[tabindex].isActive = "active";
                };
                setActiveTab();
                var displayLoader = function() {
                    $scope.loader = true;
                };
                var hideLoader = function() {
                    $scope.loader = false;
                };
                var displayTryagain = function() {
                    $scope.tryagain = true;
                };
                var hideTryagain = function() {
                    $scope.tryagain = false;
                };
                httpresponse = false;
                $scope.tryindex = tabindex;
                hideTryagain(); //$scope.tryagain = false;
                displayLoader(); //$scope.loader = true;
                $scope.progress = 0;
                timeexpired = false;

                //state change
                $interval(function() {
                    $scope.progress = $scope.progress + 40;
                }, 500);

                //http request and response
                $http({
                    method: "GET",
                    url: $scope.tabs[tabindex].url
                }).then(function mySuccess(response) {
                    if (!timeexpired) {
                        httpresponse = true;
                        hideLoader(); //$scope.loader = false;
                        $scope.tabdata = response.data;
                    }
                }, function myError(response) {
                    hideLoader(); //$scope.loader = false;
                    displayTryagain(); //$scope.tryagain = true;
                    // $scope.tabdata = "";
                });

                //Timeout 
                time = setTimeout(function() {
                    if (!httpresponse) {
                        timeexpired = true;
                        hideLoader(); //$scope.loader = false;
                        displayTryagain(); //$scope.tryagain = true;
                        //  $scope.tabdata = "";
                    }
                }, 3000);


            };
        }

    ];
});