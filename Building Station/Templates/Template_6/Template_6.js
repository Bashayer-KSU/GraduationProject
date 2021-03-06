﻿var myApp = angular.module("T6", []);

var T6 = myApp.controller("T6Ctrl", function ($scope, $http, $window, ProductService, CategoryService) {

    //$scope.SwitchLanguage = function () {
  //      $location.href = "/Templates/Template_6/Template_6.html";
  //  };
    $scope.SwitchLanguage = function (lang) {
        if (lang === "Arabic")
           $window.location.href = "/Templates/Template_3/Template_3.html";
        else 
            $window.location.href = "/Templates/Template_6/Template_6.html";

    };

    $scope.Store = [];
    $scope.Produts = [];
    $scope.categoriesList = [];


    $scope.checkout = false;
    $scope.payment = false;
    $scope.buyerName = "";
    
    $scope.Store.PaymentMethod = {
        Cash: false,
        PayPal: false,
        BankTransfer: false
    };
    var init = function () {
        //Store Info
        $http.post('/TemplateData.asmx/StoreData').then(function (response) {
            $scope.Store = response.data;

            //WEBSITE ICON and Title 
            document.title = $scope.Store.Name;
            document.getElementById("icon").href = $scope.Store.Logo;
            //Payment Methods
            if ($scope.Store.BankTransfer) {
                if ($scope.Store.BankName.includes("No Value"))
                    $scope.Store.BankTransfer = false;
            }
            if ($scope.Store.PayPal) {
                if ($scope.Store.PayPalEmail.includes("No Value"))
                    $scope.Store.PayPal = false;
            }

            if ($scope.Store.Cash)
                $scope.PaymentMethod = "Cash";
            else if ($scope.Store.BankTransfer)
                $scope.PaymentMethod = "BankTransfer";
            else if ($scope.Store.PayPal)
                $scope.PaymentMethod = "PayPal";
            else "";
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
                }
                else if ($scope.elementInfo[i].Name === "About") {
                    $scope.section.about = !$scope.elementInfo[i].Hidden;
                    $scope.AboutContent = $scope.elementInfo[i].Value;
                    $scope.AboutImage = $scope.elementInfo[i].Image;
                    if ($scope.AboutImage === "No Image" || $scope.AboutImage === null || $scope.AboutImage === undefined)
                        $scope.AboutImage = $scope.Store.slider;
                    if ($scope.AboutContent === null || $scope.AboutContent === "")
                        $scope.section.about = true;
                }
            }

        }, function (error) {
            $scope.error = error;
        });
    };
    ElementsData();


    //////////////// PRODUCTS AND CATEGORIES /////////////

    //Initialization
    $scope.Exist = false;
    $scope.TotalPrice = 0;
    $scope.ProductsArray = [];


    //Displaying All Category
    $scope.GetAllCategories = function () {
        CategoryService.GetAllCategories().then(function (response) {
            $scope.categoriesList = response;
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

        $scope.TotalPrice -= product.PriceAfterDiscount * product.Amount;
        product.Amount = product.Amount + $scope.ProductsArray[index].Amount;
        $scope.ProductsArray.splice(index, 1);
        
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

            });
    };
    return { GetAllProducts: GetAllProducts };

});