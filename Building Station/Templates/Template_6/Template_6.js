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
    
    $scope.Store.PaymentMethod = {
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
                $scope.PaymentMethod = "Cash";
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
        console.log("HII" + $scope.ProductsArray);

        
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
                TotalPrice: $scope.TotalPrice //,
               // ProductsArray : $scope.ProductsArray
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

        )
            .then(function (response) {
                $scope.result = response.data;
                console.log($scope.result.ID);
                $scope.addProductToOrder($scope.result.ID);

            }, function (error) {
                $scope.error = error.data;
            });
    };
    $scope.addProductToOrder = function (OrderID) {
        angular.forEach($scope.ProductsArray, function (value, key) {
            console.log(value.ID);
            console.log(value.Amount);
            $http.post(
                "/BuyerOrder.asmx/AddProductToOrder",
                $.param({
                    OrderID: OrderID,
                    ProductID: value.ID,
                    Amount: value.Amount
                }),
                { headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}})
                .then(function (response) {
                    $scope.result = response.data;
                    console.log($scope.result);
                }, function (error) {
                    $scope.error = error.data;
                });
        });
    };



    //////////////// PRODUCTS AND CATEGORIES /////////////

    //Initialization
    $scope.Exist = false;
    $scope.TotalPrice = 0;
    $scope.ProductOrderArray = [];
    $scope.ProductsArray = [];

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
            console.log($scope.products);
        });
    };

    //Once buyer choose a product before displaying modal 
    $scope.AddProductToCart = function (product) {
        if (typeof product !== "undefined") {
            $scope.addProduct = product;
            $scope.isExist(product, 0);
            if (!$scope.Exist)
                $scope.quantity = 1;
            $scope.Exist = false;
        }
    };

    //After Buyer choose product and determine the amount
    $scope.addToCartlist = function (product, amount) {
        if (!(product === undefined || product === '' || amount === undefined || amount === '')) {
            $scope.isExist(product, amount); //If product exist don't add new product to list, only update the amount
            if (!$scope.Exist) {
            $scope.ProductsArray.push({ ID: product.ID, Name: product.Name, Desc: product.Description, Price: product.Price, Image: product.Image, Discount: product.Discount, Amount: amount });
            product.Amount = product.Amount - amount;
            }
            $scope.TotalPrice += product.Price * amount;
            $scope.Exist = false;

        }
    };
    $scope.removeFromCart = function (product) {
        var index = $scope.ProductsArray.indexOf(product);
        $scope.addProduct.Amount = $scope.addProduct.Amount + $scope.ProductsArray[index].Amount; //return the amount of product to the orginal amount
        $scope.ProductsArray.splice(index, 1);
            $scope.TotalPrice -= product.Price * product.Amount;
        
    };
    $scope.isExist = function (product, amount) { //If product exist update the amount only
        angular.forEach($scope.ProductsArray, function (value, key) {
            if (value.ID === product.ID) {
                $scope.message = ' already exists!';
                value.Amount = value.Amount + amount;
                console.log($scope.message);
                $scope.Exist = true;
                $scope.quantity = value.Amount;
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


myApp.factory('AddProductService', function ($http) {
    var AddProductToCart = function (ProductID, Amount) {
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
    return { AddProductToCart: AddProductToCart };

});