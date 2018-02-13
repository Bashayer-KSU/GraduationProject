
var app = angular.module("BS", ["ngRoute"])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/ManageStore", {
                templateUrl: "BS-MenuTabs/ManageStore.html",
                controller: "ManageStoreController"
            })
            .when("/DevelopmentEnvironment", {
                templateUrl: "BS-MenuTabs/DevelopmentEnvironment.html",
                controller: "DevelopmentEnvironmentController"
            })
            .when("/PreviewWebsite", {
                templateUrl: "BS-MenuTabs/PreviewWebsite.html",
                controller: "PreviewWebsiteController"
            })
            .when("/Template", {
                templateUrl: "BS-MenuTabs/Template.html",
                controller: "TemplateController"
            })
            .when("/Products", {
                templateUrl: "BS-MenuTabs/Products.html",
                controller: "ProductsController"
            })
            .otherwise({
                redirectTo: "/DevelopmentEnvironment"
            })
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    .controller("ManageStoreController", function ($scope) {
        $scope.tabHeader = "Manage Store";
    })
    .controller("DevelopmentEnvironmentController", function ($scope) {
        $scope.tabHeader = "Development Environment";
    })
    .controller("PreviewWebsiteController", function ($scope) {
        $scope.tabHeader = "Previe wWebsite";
    })
    .controller("TemplateController", function ($scope) {
        $scope.tabHeader = "Template";
    })
    .controller("ProductsController", function ($scope) {
        $scope.tabHeader = "Products";
    });
