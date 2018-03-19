var myApp = angular.module("T6", []);

var T6 = myApp.controller("T6Ctrl", function ($scope, $http) {
    $scope.Store = [];
    $scope.checkout = false;
    $scope.payment = false;
    $scope.buyerName = "";
    var init = function () {

        $http.post('/TemplateData.asmx/StoreData').then(function (response) {
            $scope.Store = response.data;
            console.log($scope.Store);//Store Info

            document.title = $scope.Store.Name;
            document.getElementById("icon").href = $scope.Store.Logo;
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
    var ElementsData = function () {
        $scope.icon = {
            snapchat: false,
            twitter: false,
            facebook: false,
            instagram: false
        };
        $scope.section = {
            slider: false,
            about: false
        };

        $http.post('/ShowHideElement.asmx/GetElementsInfo').then(function (response) {
            $scope.elementInfo = response.data;
            console.log($scope.elementInfo);
            for (var i = 0; i < $scope.elementInfo.length; i++) {
                if ($scope.elementInfo[i].Name === "Snapchat") {
                    $scope.icon.snapchat = !$scope.elementInfo[i].Hidden;
                        $scope.Snapchat = !$scope.elementInfo[i].Hidden;
                }
                else if ($scope.elementInfo[i].Name === "Facebook") {
                    $scope.icon.facebook = !$scope.elementInfo[i].Hidden;
                    $scope.Facebook = !$scope.elementInfo[i].Hidden;
                }
                else if ($scope.elementInfo[i].Name === "Twitter") {
                    $scope.icon.twitter = !$scope.elementInfo[i].Hidden;
                    $scope.Twitter = !$scope.elementInfo[i].Hidden;
                }
                else if ($scope.elementInfo[i].Name === "Instagram") {
                    $scope.icon.instagram = !$scope.elementInfo[i].Hidden;
                    $scope.Instagram = !$scope.elementInfo[i].Hidden;
                }
                else if ($scope.elementInfo[i].Name === "Slider") {
                    $scope.section.slider = !$scope.elementInfo[i].Hidden;
                    $scope.section.slider.content = $scope.elementInfo[i].Value;
                }
                else if ($scope.elementInfo[i].Name === "About") {
                    $scope.section.about = !$scope.elementInfo[i].Hidden;
                    $scope.section.about.content = $scope.elementInfo[i].Value;
                }
            }

        }, function (error) {
            $scope.error = error;
        });
    };
    ElementsData();


});
