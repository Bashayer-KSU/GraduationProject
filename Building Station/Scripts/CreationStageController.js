

var app = angular.module("Demo", ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/1", {
            templateUrl: "CreationStagePages/1.html",
            controller: ""
            })
            .when("/2", {
                templateUrl: "CreationStagePages/2.html",
                controller: ""
            })
    });