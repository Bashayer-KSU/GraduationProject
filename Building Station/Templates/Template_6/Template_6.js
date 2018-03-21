var myApp = angular.module("T6", []);

/*myApp.run(function (initialSetup) {
    initialSetup.getStoreInfo();

});*/

myApp.service('initialSetup', function ($http) {
    var promise;
    return {
        InitialSetup: function () {
            promise = $http.get();
        },
        getStoreInfo: function () {
            return promise;
        }
    };
});

var T6 = myApp.controller("T6Ctrl", function ($scope, $http, ProductService, CategoryService) {
    /*   initialSetup.getStoreInfo().then(function (resp) {
           $scope.data = resp.data;
       });
       */
    $scope.Store = [];
    $scope.Produts = [];
    $scope.Categories = [];


    $scope.checkout = false;
    $scope.payment = false;
    $scope.buyerName = "";
    $scope.PaymentMethod = {
        Cash: false,
        PayPal: false,
        BankTransfer: false
    };

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

            if ($scope.Store.Cash)
                $scope.PaymentMethod.Cash = "Cash";
            else if ($scope.Store.BankTransfer)
                $scope.PaymentMethod = "BankTransfer";
            else $scope.PaymentMethod = "PayPal";



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

    $scope.Checkout = function () {
        console.log("Hi " + $scope.BuyerName);
        console.log("Hi " + $scope.BuyerPhone);
        console.log("Hi " + $scope.BuyerEmail);
        console.log("Hi " + $scope.BuyerLocation);
        console.log("Hi " + $scope.PaymentMethod);
        console.log("Hi " + $scope.HolName);
        console.log("Hi " + $scope.TotalPrice);

        
        $http.post(
            "/BuyerOrder.asmx/CreateOrder",
            $.param({
                BuyerName: $scope.BuyerName,
                BuyerPhone: $scope.BuyerPhone,
                BuyerEmail: $scope.BuyerEmail,
                BuyerLocation: $scope.BuyerLocation,
                PaymentMethod: $scope.PaymentMethod,
                BankAccount: $scope.HolName,
                OrderID: $scope.OrderID,
                TotalPrice: 44.4
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

        )
            .then(function (response) {
                $scope.result = response.data;
                console.log(response.data);

            }, function (error) {
                $scope.error = error.data;
            });
    };

    $scope.DisplayProducts = function () {
        CategoryService.GetAllCategories().then(function (response) {
            $scope.categories = response;
            console.log($scope.categories);
        });

        ProductService.GetAllProducts('Cat').then(function (response) {
            $scope.products = response;
            console.log($scope.products);
        });
    };
   $scope.DisplayProducts();
});





myApp.factory('CategoryService', function ($http) {
    var GetAllCategories = function () {
        return $http.post('/Products.asmx/GetAllCategories').then(function (categories) {
            return categories.data;
        });
    };

    return { GetAllCategories: GetAllCategories };
});

myApp.factory('ProductService', function ($http) {
    var GetAllProducts = function (CategoryName) {
        return $http.post(
            "/Products.asmx/GetAllProducts",
            $.param({
                Category: CategoryName
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            })
            .then(function (response) {
                return response.data;

            }, function (error) {
                $scope.error = error.data;
            });

        /*
        return $http.post('/Products.asmx/GetAllProducts', CategoryName).then(function (products) {
            return products.data;
        });*/
    };
    return { GetAllProducts: GetAllProducts };
});


