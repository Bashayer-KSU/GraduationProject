

var app = angular.module("CraetionStageEnglishDemo", ["ngRoute"])
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
            .when("/3.1", {
                templateUrl: "CreationStagePages/3.1.html",
                controller: "3.1Controller"
            })
            .when("/3.2", {
                templateUrl: "CreationStagePages/3.2.html",
                controller: "3.2Controller"
            })
            .when("/4.1", {
                templateUrl: "CreationStagePages/4.1.html",
                controller: "4.1Controller"
            })
            .when("/4.2", {
                templateUrl: "CreationStagePages/4.2.html",
                controller: "4.2Controller"
            })
            .when("/5", {
                templateUrl: "CreationStagePages/5.html",
                controller: "5Controller"
            })
            .when("/6", {
                templateUrl: "CreationStagePages/6.html",
                controller: "6Controller"
            })
            .when("/7", {
                templateUrl: "CreationStagePages/7.html",
                controller: "7Controller"
            })
            .when("/8", {
                templateUrl: "CreationStagePages/8.html",
                controller: "8Controller"
            })
            .when("/9", {
                templateUrl: "CreationStagePages/9.html",
                controller: "9Controller"
            })
            .when("/10", {
                templateUrl: "CreationStagePages/10.html",
                controller: "10Controller"
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
    })
    .controller("3.1Controller", function ($scope) {
    })
    .controller("3.2Controller", function ($scope) {
    })
    .controller("4.1Controller", function ($scope) {
    })
    .controller("4.2Controller", function ($scope) {
    })
    .controller("5Controller", function ($scope) {
    })
    .controller("6Controller", function ($scope) {
    })
    .controller("7Controller", function ($scope) {
    })
    .controller("8Controller", function ($scope) {
    })
    .controller("9Controller", function ($scope) {
    })
    .controller("10Controller", function ($scope) {
    });