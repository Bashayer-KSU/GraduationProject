var myApp = angular.module("T6", []);

var T6 = myApp.controller("T6Ctrl", function ($scope, $http) {
    $scope.resultset = [];
    $scope.color1;
    var init = function () {

        $http.get('/TemplateData.asmx/StoreData').then(function (response) {
            $scope.resultset = response.data;
            console.log($scope.resultset);
            //Store Info
            $scope.logo = $scope.resultset.Logo;
            $scope.StoreName = $scope.resultset.Name;
            $scope.desc = $scope.resultset.Description;
            $scope.address = $scope.resultset.Address;
            $scope.Phone = $scope.resultset.Phone;
            $scope.Email = $scope.resultset.Email;
            //Store Colors
            $scope.color1 = $scope.resultset.Color1;//Header
            $scope.color2 = $scope.resultset.Color2;//Content
            $scope.color3 = $scope.resultset.Color3;//Footer
            $scope.color4 = $scope.resultset.Color4;//Text color

            //Slider Images
            $scope.SliderImage = $scope.resultset.SliderImage;

            //Payment Methods
            $scope.paypal = $scope.resultset.PayPal;
            $scope.bankTransfer = $scope.resultset.BankTransfer;
            $scope.bankAccount = $scope.resultset.BankAccount;
            $scope.cash = $scope.resultset.Cash;

            //Social Media Link
            $scope.Facebook = $scope.resultset.FacebookLink.includes("https");
            $scope.Instagram = $scope.resultset.InstagramLink.includes("No");
            $scope.Snapchat = $scope.resultset.SnapchatLink.includes("https");
            $scope.Twitter = $scope.resultset.TwitterLink.includes("No");

            //Menu
            $scope.MenuTitle = $scope.resultset.MenuTitle;
        }, function (error) {
            $scope.error = error;
        });

    };
    init();


});
