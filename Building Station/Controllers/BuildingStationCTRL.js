
var BS_App = angular.module("BuildingStationAPP", ["ui.router"]);

BS_App.service('initialSetup', function ($http) {
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

var BuildingStationAPP = BS_App.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/BuildingStation");
    $stateProvider
        .state("Login&Register", {
            url: "/BuildingStation",
            templateUrl: "/RegisterLogin.html",
            controller: "RegisterLoginCtrl"
        })
        .state("Store", {
            url: "/BuildingStation/:Domain",
            templateUrl: "Stores/Store.html",
            controller: "PublishedStoreCtrl"
        })
        /*.state("CreationStage", {
            url: "/BuildingStation/CreationStage",
            templateUrl: "Stores/Store.html",
            controller: "PublishedStoreCtrl"
        })
        .state("CreationStage", {
            url: "/BuildingStation/:Domain",
            templateUrl: "Stores/Store.html",
            controller: "PublishedStoreCtrl"
        })
        .state("CreationStage", {
            url: "/BuildingStation/:Domain",
            templateUrl: "Stores/Store.html",
            controller: "PublishedStoreCtrl"
        })*/;
       
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
})
    .controller("RegisterLoginCtrl", function ($scope, $http, $window) {

        $scope.SendData = function (e, lang) {
            // use $.param jQuery function to serialize data from JSON 
            var url;
            var data;

            if (e === "reg") {
                //url = "http://www.bsapplogic.somee.com/RegisterLogin.asmx/Register";
                url = "RegisterLogin.asmx/Register";
                if (lang === "eng") {
                    data = $.param({
                        name: $scope.REname,
                        email: $scope.REemail,
                        password: $scope.REpassword,
                        phone: $scope.REphone,
                        lang: lang
                    });
                }
                else {
                    data = $.param({
                        name: $scope.Rname,
                        email: $scope.Remail,
                        password: $scope.Rpassword,
                        phone: $scope.Rphone,
                        lang: lang
                    });
                }
            }
            else if (e === "log") {
                //url = "http://www.bsapplogic.somee.com/RegisterLogin.asmx/Login";
                url = "RegisterLogin.asmx/Login";
                if (lang === "eng") {

                    data = $.param({
                        email: $scope.LEemail,
                        password: $scope.LEpassword,
                        lang: lang
                    });
                }
                else {
                    data = $.param({
                        email: $scope.Lemail,
                        password: $scope.Lpassword,
                        lang: lang
                    });
                }
            }

            var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };

            $http.post(url, data, config)
                .then(function (response) {
                    $scope.result = response.data;
                    //$window.open = ("http://www.buildingstation.somee.com/" + $scope.result.substr(76, $scope.result.length - 9 - 76), "_self");
                    location.href = "http://localhost:50277/" + $scope.result.substr(76, $scope.result.length - 9 - 76);
                }, function (error) {
                    $scope.error = error.data;
                });
        };
    })
    .controller("PublishedStoreCtrl", function ($scope, $http, $stateParams, ProductService, CategoryService, AddProductService) {
        var ID = 0;
        $http({
            //url:"http://www.bsapplogic.somee.com/Published_Stores.asmx/GetTemplate",
            url: "/Published_Stores.asmx/GetTemplate",
            params: { StoreDomain: $stateParams.Domain},
            method: "get"
        })
            .then(function (response) {
                ID = response.data;
                $scope.TemplateID = "/Stores/T" + ID + ".html";

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
            //Store Info
            $http({
                //url: "http://www.bsapplogic.somee.com/../Published_Stores.asmx/GetStore",
                url: "../Published_Stores.asmx/GetStore",
                params: { StoreDomain: $stateParams.Domain },
                method: "get"
            })
           .then(function (response) {
                $scope.Store = response.data;
           //     console.log($scope.Store);


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
                //url: "http://www.bsapplogic.somee.com/../Published_Stores.asmx/GetElements",
                url: "../Published_Stores.asmx/GetElements",
                params: { StoreDomain: $stateParams.Domain },
                method: "get"
            })
             .then(function (response) {
                $scope.elementInfo = response.data;
               // console.log($scope.elementInfo);
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

        $scope.Checkout = function () {
           /* console.log($scope.BuyerName);
            console.log($scope.BuyerPhone);
            console.log($scope.BuyerEmail);
            console.log($scope.BuyerLocation);
            console.log($scope.PaymentMethod);
            console.log($scope.HolName);
            console.log($scope.OrderID);*/

            $http.post(
                //"http://www.bsapplogic.somee.com/BuyerOrder.asmx/CreateOrder",
                "/BuyerOrder.asmx/CreateOrder",
                $.param({
                    StoreEmail: $scope.Store.Email,
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


        $scope.CheckoutA = function (Buyer_Name, Buyer_Phone, Buyer_Email, Buyer_Location, Payment_Method, Hol_Name, Order_ID) {
           /* console.log($scope.BuyerName);
            console.log($scope.BuyerPhone);
            console.log($scope.BuyerEmail);
            console.log($scope.BuyerLocation);
            console.log($scope.PaymentMethod);
            console.log($scope.HolName);
            console.log($scope.OrderID);*/

            $http.post(
                "/BuyerOrder.asmx/CreateOrder",
//                "http://www.bsapplogic.somee.com/BuyerOrder.asmx/CreateOrder",
                $.param({
                    StoreEmail: $scope.Store.Email,
                    BuyerName: Buyer_Name,
                    BuyerPhone: Buyer_Phone,
                    BuyerEmail: Buyer_Email,
                    BuyerLocation: Buyer_Location,
                    PaymentMethod: Payment_Method,
                    BankAccount: Hol_Name,
                    OrderID: Order_ID,
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


        // Add products to Buyer's Order
        $scope.addProductToOrder = function (OrderID) {
            angular.forEach($scope.ProductsArray, function (value, key) {
                AddProductService.AddProductToCart(OrderID, value.ID, value.Amount, value.PreviousAmount).then(function (response) {
                    $scope.ProductAdded = response;
                });
            });
        };

        //////////////////////////////////

       /* $http({
            url: "../Published_Stores.asmx/GetProducts",
            params: { StoreDomain: $stateParams.Domain },
            method: "get"
        })
            .then(function (response) {
                $scope.Product = response.data;
            });*/

        $scope.goArabic = function () {
            ID = ID - 3;
            $scope.TemplateID = "/Stores/T" + ID + ".html";
        };

        $scope.goEnglish = function () {
            ID = ID + 3;
            $scope.TemplateID = "/Stores/T" + ID + ".html";
        };
    });

BS_App.factory('CategoryService', function ($http, $stateParams) {
    var GetAllCategories = function () {
        return $http({
            //url: "http://www.bsapplogic.somee.com/../Published_Stores.asmx/GetAllCategories",
            url: "../Published_Stores.asmx/GetAllCategories",
            params: { StoreDomain: $stateParams.Domain },
            method: "get"
        })
        .then(function (categories) {
            return categories.data;
        });
    };

    return { GetAllCategories: GetAllCategories };
});

BS_App.factory('ProductService', function ($http, $stateParams) {
    var GetAllProducts = function (CategoryName) {
        return $http.post(
            //"http://www.bsapplogic.somee.com//Published_Stores.asmx/GetAllProducts",
            "/Published_Stores.asmx/GetAllProducts",
            $.param({
                Category: CategoryName,
                StoreDomain: $stateParams.Domain
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


BS_App.factory('AddProductService', function ($http) {
    var AddProductToCart = function (OrderID, ProductID, Amount, PreviousAmount) {
        return $http.post(
            //"http://www.bsapplogic.somee.com/Published_Stores.asmx/AddProductToOrder",
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

BS_App.directive('match', function ($parse) {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            scope.$watch(function () {
                return $parse(attrs.match)(scope) === ctrl.$modelValue;
            }, function (currentValue) {
                ctrl.$setValidity('mismatch', currentValue);
            });
        }
    };
});

BS_App.directive('matchpass', function ($parse) {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            scope.$watch(function () {
                return $parse(attrs.matchpass)(scope) === ctrl.$modelValue;
            }, function (currentValue) {
                ctrl.$setValidity('mismatchpass', currentValue);
            });
        }
    };
});