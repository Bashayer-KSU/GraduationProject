var myApp = angular.module("T6", []);

var T6 = myApp.controller("T6Ctrl", function ($scope, $http) {
    $scope.Store = [];
    var init = function () {

        $http.post('/TemplateData.asmx/StoreData').then(function (response) {
            $scope.Store = response.data;
            console.log($scope.Store);//Store Info

            //Payment Methods
            if ($scope.Store.BankTransfer) {
                if ($scope.Store.BankAccount.includes("No"))
                    $scope.Store.BankTransfer = false;
                }

            //Social Media Link
            $scope.Facebook = $scope.Store.FacebookLink.toLowerCase().includes("https://www.facebook.com/");
            $scope.Instagram = $scope.Store.InstagramLink.toLowerCase().includes("https://www.instagram.com/");
            $scope.Snapchat = $scope.Store.SnapchatLink.toLowerCase().includes("snapchat");
            $scope.Twitter = $scope.Store.TwitterLink.toLowerCase().includes("https://twitter.com/");


            //Menu
            $scope.MenuTitle = $scope.Store.MenuTitle;
        }, function (error) {
            $scope.error = error;
        });

    };
    init();


});
