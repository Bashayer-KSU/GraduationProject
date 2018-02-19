﻿

var app = angular.module("CraetionStageArabicDemo", ["ngRoute"])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/0a", {
                templateUrl: "CreationStagePages/0a.html",
                controller: "0aController"
            })
            .when("/1a", {
                templateUrl: "CreationStagePages/1a.html",
                controller: "1aController"
            })
            .when("/2a", {
                templateUrl: "CreationStagePages/2a.html",
                controller: "2aController"
            })
            .when("/3.1a", {
                templateUrl: "CreationStagePages/3.1a.html",
                controller: "3.1aController"
            })
            .when("/3.2a", {
                templateUrl: "CreationStagePages/3.2a.html",
                controller: "3.2aController"
            })
            .when("/4.1a", {
                templateUrl: "CreationStagePages/4.1a.html",
                controller: "4.1aController"
            })
            .when("/4.2a", {
                templateUrl: "CreationStagePages/4.2a.html",
                controller: "4.2aController"
            })
            .when("/5a", {
                templateUrl: "CreationStagePages/5a.html",
                controller: "5aController"
            })
            .when("/6a", {
                templateUrl: "CreationStagePages/6a.html",
                controller: "6aController"
            })
            .when("/7a", {
                templateUrl: "CreationStagePages/7a.html",
                controller: "7aController"
            })
            .when("/8a", {
                templateUrl: "CreationStagePages/8a.html",
                controller: "8aController"
            })
            .when("/9a", {
                templateUrl: "CreationStagePages/9a.html",
                controller: "9aController"
            })
            .when("/10a", {
                templateUrl: "CreationStagePages/10a.html",
                controller: "10aController"
            })
            .otherwise({
                redirectTo: "/0a"
            })
        $locationProvider.html5Mode(true);
    })
    .controller("0aController", function ($scope) {
    })
    .controller("1aController", function ($scope) {
    })
    .controller("2aController", function ($scope) {
    })
    .controller("3.1aController", function ($scope) {
    })
    .controller("3.2aController", function ($scope) {
    })
    .controller("4.1aController", function ($scope) {
    })
    .controller("4.2aController", function ($scope) {
    })
    .controller("5aController", function ($scope) {
    })
    .controller("6aController", function ($scope) {
    })
    .controller("7aController", function ($scope) {
    })
    .controller("8aController", function ($scope) {
    })
    .controller("9aController", function ($scope) {
    })
    .controller("10aController", function ($scope) {
    });