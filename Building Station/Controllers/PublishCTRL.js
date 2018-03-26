/// <reference path="../scripts/angular.min.js" />
/// <reference path="../scripts/angular-route.min.js" />

var publishApp = angular.module("published", ["ngRoute"])
    .config(function ($routeProvider, $locationProvider) {
    $routeProvider.caseInsensitiveMatch = true;
    $routeProvider
        .when("/BuildingStation", {
            templateUrl: "Stores/HomeBS.html",
            controller: "BS_HOME"
        })
        .when("/BuildingStation/:Domain", {
            templateUrl: "Stores/Store.html",
            controller: "PublishedStoreCtrl"
        })
        .otherwise({
            redirectTo: "/BuildingStation"
        });
    $locationProvider.html5Mode(true);
})
    .controller("BS_HOME", function ($scope) {

        $scope.test = "it works";
    })
    .controller("PublishedStoreCtrl", function ($scope, $http, $routeParams) {

        $http({
            url:"Published_Stores.asmx/GetTemplate",
            params:{StoreDomain: $routeParams.Domain},
            method: "get"
        })
            .then(function (response) {
                $scope.TemplateID = "/Stores/T" + response.data + ".html";

            });
    });

