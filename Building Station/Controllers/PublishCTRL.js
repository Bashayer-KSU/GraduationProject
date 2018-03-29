/// <reference path="../scripts/angular.min.js" />
/// <reference path="../scripts/angular-route.min.js" />

var publishApp = angular.module("published", ["ngRoute"])
    .config(function ($routeProvider, $locationProvider) {
    $routeProvider.caseInsensitiveMatch = true;
    $routeProvider
        .when("/BuildingStation", {
            templateUrl: "Stores/HomeBS.html",
            controller: "BS_HOME"
        })
        .when("/BuildingStation/:Domain", {
            templateUrl: "Stores/Store.html",
            controller: "PublishedStoreCtrl"
        })
        .otherwise({
            redirectTo: "/BuildingStation"
        });
    $locationProvider.html5Mode(true);
})
    .controller("BS_HOME", function ($scope) {

        $scope.test = "it works";
    })
    .controller("PublishedStoreCtrl", function ($scope, $http, $routeParams, ProductService, CategoryService, AddProductService) {

        $http({
            url:"Published_Stores.asmx/GetTemplate",
            params:{StoreDomain: $routeParams.Domain},
            method: "get"
        })
            .then(function (response) {
                $scope.TemplateID = "/Stores/T" + response.data + ".html";

            });

        /////////////////////////////////

        $scope.Store = [];
        $scope.Produts = [];
        $scope.Categories = [];


        $scope.checkout = false;
        $scope.payment = false;
        $scope.buyerName = "";

        $scope.Store.PaymentMethod = {
            Cash: false,
            PayPal: false,
            BankTransfer: false
        };
        var init = function () {

            $http({
                url: "../Published_Stores.asmx/GetStore",
                params: { StoreDomain: $routeParams.Domain },
                method: "get"
            })
           .then(function (response) {
                $scope.Store = response.data;
                console.log($scope.Store);//Store Info


                //WEBSITE ICON and Title 
                document.title = $scope.Store.Name;
                document.getElementById("icon").href = $scope.Store.Logo;
                //Payment Methods
                if ($scope.Store.BankTransfer) {
                    if ($scope.Store.BankAccount.includes("No"))
                        $scope.Store.BankTransfer = false;
                }

                if ($scope.Store.Cash)
                    $scope.PaymentMethod = "Cash";
                else if ($scope.Store.BankTransfer)
                    $scope.PaymentMethod = "BankTransfer";
                else $scope.PaymentMethod = "PayPal";

                //Social Media Link
              /*  if ($scope.Store.SnapchatLink !== 'No Value') {
                    $scope.Snapchat = true;
                }
                else { $scope.Snapchat = false; }

                if ($scope.Store.TwitterLink !== 'No Value') {
                    $scope.Twitter = true;
                }
                else {
                    $scope.Twitter = false;
                }

                if ($scope.Store.FacebookLink !== 'No Value') {
                    $scope.Facebook = true;
                }
                else { $scope.Facebook = false; }

                if ($scope.Store.InstagramLink !== 'No Value') {
                    $scope.Instagram = true;
                }
                else { $scope.Instagram = false; }
                */

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

            $http({
                url: "../Published_Stores.asmx/GetElements",
                params: { StoreDomain: $routeParams.Domain },
                method: "get"
            })
             .then(function (response) {
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
                        $scope.AboutContent = $scope.elementInfo[i].Value;
                        if ($scope.AboutContent === null || $scope.AboutContent === "")
                            $scope.section.about = true;
                    }
                }

            }, function (error) {
                $scope.error = error;
            });
        };
        ElementsData();

        $scope.Checkout = function () {

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
                    TotalPrice: $scope.TotalPrice
                }),
                {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' }
                })
                .then(function (response) {
                    $scope.result = response.data;
                    $scope.addProductToOrder($scope.result.ID);
                    $scope.checkout = false;
                    $scope.payment = false;
                    $scope.ProductsArray.length = 0;

                }, function (error) {
                    $scope.error = error.data;
                });
        };



        //////////////// PRODUCTS AND CATEGORIES /////////////

        //Initialization
        $scope.Exist = false;
        $scope.TotalPrice = 0;
        $scope.ProductsArray = [];


        //Displaying All Category
        $scope.GetAllCategories = function () {
            CategoryService.GetAllCategories().then(function (response) {
                $scope.categories = response;
            });
        };
        $scope.GetAllCategories();

        //When Buyer change Category Tab display related products
        $scope.setTabItem = function (item) {
            $scope.currentTab = item;
            ProductService.GetAllProducts(item.Name).then(function (response) {
                $scope.products = response;
                $scope.HeaderCategoryName = item.Name;
            });
        };

        //Once buyer choose a product before displaying modal 
        $scope.AddProductToCart = function (product) {
            if (typeof product !== "undefined") {
                $scope.addProduct = product;
                $scope.quantity = 1;
            }
        };

        //After Buyer choose product and determine the amount
        $scope.addToCartlist = function (product, amount) {
            if (!(product === undefined || product === '' || amount === undefined || amount === '')) {
                $scope.isExist(product, amount); //If product exist don't add new product to list, only update the amount
                if (!$scope.Exist) {
                    $scope.ProductsArray.push({ ID: product.ID, Name: product.Name, Desc: product.Description, Price: product.Price, Image: product.Image, Discount: product.Discount, PriceAfterDiscount: product.PriceAfterDiscount, Amount: amount, PreviousAmount: product.Amount });
                    product.Amount = product.Amount - amount;
                }
                $scope.TotalPrice += product.PriceAfterDiscount * amount;
                $scope.Exist = false;
            }
        };
        $scope.ItemsInShoppingCart = function () {
            if ($scope.ProductsArray.length === 0)
                return 0;
            else {
                var sum = 0;
                angular.forEach($scope.ProductsArray, function (value, key) {
                    sum += value.Amount;
                });
                return sum;
            }
        };
        // Remove Product from shopping cart
        $scope.removeFromCart = function (product) {
            var index = $scope.ProductsArray.indexOf(product);
            $scope.addProduct.Amount = $scope.addProduct.Amount + $scope.ProductsArray[index].Amount; //return the amount of product to the orginal amount
            $scope.ProductsArray.splice(index, 1);
            $scope.TotalPrice -= product.PriceAfterDiscount * product.Amount;

        };

        $scope.isExist = function (product, amount) { //If product exist update the amount only
            angular.forEach($scope.ProductsArray, function (value, key) {
                if (value.ID === product.ID) {
                    $scope.message = ' already exists!';
                    value.Amount = value.Amount + amount;
                    product.Amount -= amount;
                    $scope.Exist = true;
                }
            });
        };


        // Add products to Buyer's Order
        $scope.addProductToOrder = function (OrderID) {
            angular.forEach($scope.ProductsArray, function (value, key) {
                AddProductService.AddProductToCart(OrderID, value.ID, value.Amount, value.PreviousAmount).then(function (response) {
                    $scope.ProductAdded = response;
                });
            });
        };

        //////////////////////////////////

        $http({
            url: "../Published_Stores.asmx/GetProducts",
            params: { StoreDomain: $routeParams.Domain },
            method: "get"
        })
            .then(function (response) {
                $scope.Product = response.data;
            });
    });

publishApp.factory('CategoryService', function ($http, $routeParams) {
    var GetAllCategories = function () {
        return $http({
            url: "../Published_Stores.asmx/GetAllCategories",
            params: { StoreDomain: $routeParams.Domain },
            method: "get"
        })
        .then(function (categories) {
            return categories.data;
        });
    };

    return { GetAllCategories: GetAllCategories };
});

publishApp.factory('ProductService', function ($http, $routeParams) {
    var GetAllProducts = function (CategoryName) {
        return $http.post(
            "/Published_Stores.asmx/GetAllProducts",
            $.param({
                Category: CategoryName,
                StoreDomain: $routeParams.Domain
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            })
            .then(function (response) {
                return response.data;

            });
    };
    return { GetAllProducts: GetAllProducts };

});


publishApp.factory('AddProductService', function ($http) {
    var AddProductToCart = function (OrderID, ProductID, Amount, PreviousAmount) {
        return $http.post(
            "/Published_Stores.asmx/AddProductToOrder",
            $.param({
                OrderID: OrderID,
                ProductID: ProductID,
                Amount: Amount,
                PreviousAmount: PreviousAmount
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' } })
            .then(function (response) {
                return response.data;
            });
    };
    return { AddProductToCart: AddProductToCart };

});