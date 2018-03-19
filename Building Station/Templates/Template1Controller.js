var app = angular.module("Tempalat1Arabic", [])
    .controller("template1_arabic", function ($scope, $http) {


    $http.get('../../TemplateData.asmx/StoreData').then(function (response) {
        $scope.Store = response.data;

        if ($scope.Store.SnapchatLink.toLowerCase().includes("https://www.snapchat.com/add/")) {
            $scope.Svisible = true;
        } 
        else { $scope.Svisible = false; }

        if ($scope.Store.TwitterLink.toLowerCase().includes("https://twitter.com/")) {
            $scope.Tvisible = true;
        }
        else {
            $scope.Tvisible = false;
        }

        if ($scope.Store.FacebookLink.toLowerCase().includes("https://www.facebook.com/")) {
            $scope.Fvisible = true;
        }
        else { $scope.Fvisible = false; }

        if ($scope.Store.InstagramLink.toLowerCase().includes("https://www.instagram.com/")) {
            $scope.Ivisible = true;
        }
        else { $scope.Ivisible = false; }

    });

   $http.get('../../TemplateData.asmx/ProductData').then(function (response) {

       $scope.Product = response.data;
    });



});