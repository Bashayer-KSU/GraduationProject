

var app = angular.module("Demo", ["ngRoute"])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/0", {
                templateUrl: "CreationStagePages/0.html",
                controller: "0Controller"
            })
            .when("/1", {
                templateUrl: "CreationStagePages/1.html",
                controller: "1Controller"
            })
            .when("/2", {
                templateUrl: "CreationStagePages/2.html",
                controller: "2Controller"
            })
            .otherwise({
                redirectTo: "/0"
            })
        $locationProvider.html5Mode(true);
    })
    .controller("0Controller", function ($scope) {
    })
    .controller("1Controller", function ($scope) {
    })
    .controller("2Controller", function ($scope) {
    });