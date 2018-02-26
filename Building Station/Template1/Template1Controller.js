var app = angular.module("Tempalat1Arabic", [])
    .controller("template1_arabic", function ($scope, $http) {


    $http.get('TemplateData.asmx/StoreData').then(function (response) {

        $scope.Store = response.data;
    });

    $http.get('TemplateData.asmx/ProductData').then(function (response) {

        $scope.Products = response.data;
    });



});