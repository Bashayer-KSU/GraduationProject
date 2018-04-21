//'use strict';
var BS_App = angular.module("BuildingStationAPP", ["ui.router", "ngMaterial"]);

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

var BuildingStationAPP = BS_App.config(function ($stateProvider, $locationProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
    $urlMatcherFactoryProvider.caseInsensitive(true);
    $urlRouterProvider.when('/EDITandINFO', '/EDITandINFO/DevelopmentEnvironment');
    $urlRouterProvider.when('/EDITandINFO-English', '/EDITandINFO-English/DevelopmentEnvironmentEnglish');

    $urlRouterProvider.otherwise("/BuildingStation");
    $stateProvider
        .state("Login&Register", {
            url: "/BuildingStation",
            templateUrl: "/RegisterLogin.html",
            controller: "RegisterLoginCtrl"
        })
        .state("Store", {
            url: "/BuildingStation/:Domain",
            templateUrl: "/Stores/Store.html",
            controller: "PublishedStoreCtrl"
        })
        //Basic English (Parent)
        .state("BS-Menu-English", {
            url: "/EDITandINFO-English",
            templateUrl: "/Views/BasicEnglish.html",
            controller: "BS-Menu-EnglishCTRL",
            //  resolve: {},
            abstract: true
        })
        .state("BS-Menu-English.ManageStore", {
            url: "/ManageStore",
            templateUrl: "/Views/ManageStoreEnglish.html",
            controller: "ManageStoreControllerEnglish"
        })
        .state("BS-Menu-English.DevelopmentEnvironment", {
            url: "/DevelopmentEnvironmentEnglish",
            templateUrl: "/Views/DevelopmentEnvironmentEnglish.html",
            controller: "DevelopmentEnvironmentControllerEnglish"
        })
        .state("BS-Menu-English.Template", {
            url: "/Templates",
            templateUrl: "/Views/TemplateEnglish.html",
            controller: "TemplateControllerEnglish"
        })
        .state("BS-Menu-English.Products", {
            url: "/Products",
            templateUrl: "/Views/ProductsEnglish.html",
            controller: "ProductsControllerEnglish"
        })
        /*.state("PreviewWebsiteEnglish", {
            url: "/PreviewWebsiteEnglish",
            templateUrl: "/Views/Preview.html",
            controller: "PreviewWebsiteControllerEnglish"
        })*/
        //Basic Arabic (Parent)
        .state("BS-Menu-Arabic", {
            url: "/EDITandINFO",
            templateUrl: "/Views/BasicArabic.html",
            controller: "BS-Menu-ArabicCTRL",
          //  resolve: {},
            abstract: true
        })
        .state("BS-Menu-Arabic.ManageStore", {
            url: "/ManageStore",
            templateUrl: "/Views/ManageStore.html",
            controller: "ManageStoreController"
        })
        .state("BS-Menu-Arabic.DevelopmentEnvironment", {
            url: "/DevelopmentEnvironment",
            templateUrl: "/Views/DevelopmentEnvironment.html",
            controller: "DevelopmentEnvironmentController"
        })
        .state("BS-Menu-Arabic.Template", {
            url: "/Templates",
            templateUrl: "/Views/Template.html",
            controller: "TemplateController"
        })
        .state("BS-Menu-Arabic.Products", {
            url: "/Products",
            templateUrl: "/Views/Products.html",
            controller: "ProductsController"
        })
        .state("PreviewWebsite", {
            url: "/PreviewWebsite",
            templateUrl: "/Views/Preview.html",
            controller: "PreviewWebsiteController"
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
    .run(function ($rootScope, $location, loginService, $http, $state, $stateParams /*, $dialogs, $templateCache*/) {
        // register listener to watch route changes 
        //$locationChangeSuccess
        //$stateChangeStart
        //next, current,
        //event, toState, toParams, fromState, fromParams
        /*$rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                var currentState = $state.current;
                alert(" ?? " + currentState);
            }
        )*/
        $rootScope.Logout = function () {
            $http.get('/RegisterLogin.asmx/SignOut').then(function (response) {

                $rootScope.result = response.data;
                location.href = $rootScope.result.substr(1, $rootScope.result.length - 2);
            });
        };
        $rootScope.$on("$locationChangeSuccess", function () {
            loginService.login().then(function (response) {
            //    console.log($state);
               
                $rootScope.login = response;
                var notLoged = response === "\"false\"";
            //    alert("t or f ? " + response);
                //console.log("in $routeChangeStart " + $rootScope.login);
             //alert(" not Loged ? " + notLoged);
                var url = $location.absUrl().split('?')[0]
                var pulishedStore;
                //alert(" ?? " + url);
                if (url.includes("BuildingStation/"))
                    pulishedStore = true;
                else
                    pulishedStore = false;
               // alert(" " + response);
             /*   var preview;
                if (url.includes("Preview"))
                    preview = true;
                else
                    preview = false;
                              alert("preview: " + preview);*/

                if (notLoged === true && pulishedStore === false)
                {
                    // location.href = "/index.html";
                 //   event.preventDefault();
                   // location.href = "http://localhost:50277/BuildingStation"; looooping for ever
                     $location.path("/BuildingStation");
                    // $state.go("Login&Register ");
                }
            });
        });
    })
    .controller("RegisterLoginCtrl", function ($scope, $http, $window) {

        $scope.SendData = function (e, lang) {
            // use $.param jQuery function to serialize data from JSON 
            var url;
            var data;

            if (e === "reg") {
                //url = "http://bslogic-001-site1.ctempurl.com/RegisterLogin.asmx/Register";
                url = "/RegisterLogin.asmx/Register";
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
                //url = "http://bslogic-001-site1.ctempurl.com/RegisterLogin.asmx/Login";
                url = "/RegisterLogin.asmx/Login";
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
                  //  location.href = "http://localhost:50277/" + $scope.result.substr(76, $scope.result.length - 9 - 76);
                    location.href = "http://localhost:50277/" + $scope.result.slice(1, -1);

                }, function (error) {
                    $scope.error = error.data;
                });
        };
    })
    .controller("PublishedStoreCtrl", function ($scope, $http, $stateParams, ProductService, CategoryService, AddProductService) {
        var ID = 0;
        $http({
            //url:"http://bslogic-001-site1.ctempurl.com/Published_Stores.asmx/GetTemplate",
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
                //url: "http://bslogic-001-site1.ctempurl.com/../Published_Stores.asmx/GetStore",
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
                //url: "http://bslogic-001-site1.ctempurl.com/../Published_Stores.asmx/GetElements",
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
                //"http://bslogic-001-site1.ctempurl.com/BuyerOrder.asmx/CreateOrder",
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
                //"http://bslogic-001-site1.ctempurl.com/BuyerOrder.asmx/CreateOrder",
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
    })
    .controller("BS-Menu-EnglishCTRL", function ($http, $scope, $location, $rootScope, $mdDialog, $window) {
       
        $scope.Logout = function () {
            $rootScope.Logout();
        };

        $rootScope.Arabic = function () {
            $location.path('/EDITandINFO');
        };

        $rootScope.DesktopView = function () {
            $location.path('/PreviewWebsite');
            //$window.open('/Views/PreviewEnglish.html', '_blank');
        };

        $rootScope.Publish = function (ev) {
            $http.get('Published_Stores.asmx/PublishRequest').then(function (response) {
            //$http.get('http://bslogic-001-site1.ctempurl.com/Published_Stores.asmx/PublishRequest').then(function (response) {
                var StoreValues = response.data;
                if (StoreValues.Published === true) {
                    var inform =
                        $mdDialog.alert()
                            // .clickOutsideToClose(true)
                            // .parent(angular.element(document.querySelector('#popupContainer')))
                            .title('You already published your store, this is your link (http://localhost:50277/BuildingStation/' + StoreValues.Domain + ')')
                            .textContent('Please Copy the link and save it.')
                            // .ariaLabel('Alert Dialog Demo')
                            .targetEvent(ev)
                            .ok('Close');
                    $mdDialog.show(inform).then(function () {
                        //  $rootScope.status = 'You decided to get rid of your debt.';
                    }, function () {
                        // $rootScope.status = 'You decided to keep your debt.';
                    });
                }
                else if (StoreValues.PayPal === false && StoreValues.Cash === false && StoreValues.BankTransfer === false) {
                    // Appending dialog to document.body to cover sidenav in docs app
                    var checkPayment = $mdDialog.alert()
                        .title('You need to select at least one payment method before Publishing.')
                        //  .ariaLabel('Lucky day')
                        .targetEvent(ev)
                        .ok('OK')
                    $mdDialog.show(checkPayment).then(function () {
                        $location.path('/EDITandINFO-English/ManageStore');
                    }, function () {
                    });
                }
                else {// Appending dialog to document.body to cover sidenav in docs app
                    var confirm = $mdDialog.confirm()
                        .title('This is your store link (http://localhost:50277/BuildingStation/' + StoreValues.Domain + '), would you like to publish?')
                        .textContent('Please Copy the link and save it.')
                        //  .ariaLabel('Lucky day')
                        .targetEvent(ev)
                        .ok('Publish')
                        .cancel('Cancel');

                    $mdDialog.show(confirm).then(function () {
                        $http({
                            //url: "http://bslogic-001-site1.ctempurl.com/Published_Stores.asmx/Publish"",
                            url: "Published_Stores.asmx/Publish",
                            params: { storeDomainName: StoreValues.Domain },
                            method: "get"
                        }).then(function (response) {
                            //$window.open('http://www.buildingstation.somee.com/' + StoreValues.Domain + '', '_blank');
                            $window.open('http://localhost:50277/BuildingStation/' + StoreValues.Domain + '', '_blank');
                        });
                        //  $rootScope.status = 'You decided to get rid of your debt.';
                    }, function () {
                        // $rootScope.status = 'You decided to keep your debt.';
                    });
                }
            });
        };

        $rootScope.UnPublish = function (ev) {
            //$http.get('http://bslogic-001-site1.ctempurl.com/Published_Stores.asmx/UnPublishRequest').then(function (response) {
            $http.get('/Published_Stores.asmx/UnPublishRequest').then(function (response) {
                var StoreValues = response.data;
                if (StoreValues.Published === false) {
                    var inform =
                        $mdDialog.alert()
                            // .clickOutsideToClose(true)
                            // .parent(angular.element(document.querySelector('#popupContainer')))
                            .title('You have not published your store yet')
                            // .ariaLabel('Alert Dialog Demo')
                            .targetEvent(ev)
                            .ok('Close');
                    $mdDialog.show(inform).then(function () {
                        //  $rootScope.status = 'You decided to get rid of your debt.';
                    }, function () {
                        // $rootScope.status = 'You decided to keep your debt.';
                    });
                }
                else {
                    var confirm = $mdDialog.confirm()
                        .title('Are you sure you want to unpublish your store?')
                        //  .ariaLabel('Lucky day')
                        .targetEvent(ev)
                        .ok('YES')
                        .cancel('Cancel');

                    $mdDialog.show(confirm).then(function () {
                        //$http.get('http://bslogic-001-site1.ctempurl.com/Published_Stores.asmx/UnPublish').then(function (response) {
                        $http.get('/Published_Stores.asmx/UnPublish').then(function (response) {
                            var Store_values = response.data;
                            if (Store_values.Published === false) {
                                var Unpublished =
                                    $mdDialog.alert()
                                        .title('Your store was unpublished successfully')
                                        .targetEvent(ev)
                                        .ok('Close');
                                $mdDialog.show(Unpublished).then(function () {
                                    //  $rootScope.status = 'You decided to get rid of your debt.';
                                }, function () {
                                    // $rootScope.status = 'You decided to keep your debt.';
                                });
                            }
                        });
                    });
                }
            });
        };

        $rootScope.DeleteStore = function (ev) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete your store?')
                .textContent('all your data will be deleted.')
                .targetEvent(ev)
                .ok('YES')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function () {
                // Appending dialog to document.body to cover sidenav in docs app
                var askForPassword = $mdDialog.prompt()
                    .title('Enter your store Password')
                    .textContent('be aware that your store will be removed completely from our system and you will need to register again to have a new store.')
                    .placeholder('password')
                    // .ariaLabel('Dog name')
                    .initialValue('')
                    .targetEvent(ev)
                    .required(true)
                    .ok('Delete')
                    .cancel('Cancel');

                $mdDialog.show(askForPassword).then(function (result) {
                    $http({
                        //url: "http://bslogic-001-site1.ctempurl.com/Published_Stores.asmx/DeleteStore",
                        url: "Published_Stores.asmx/DeleteStore",
                        params: { pass: result },
                        method: "get"
                    })
                        .then(function (response) {
                            var storePass = response.data;
                            if (storePass.Password === 'incorrect') {
                                var NOTdeleted = $mdDialog.alert()
                                    .title('Incorrect Password')
                                    .targetEvent(ev)
                                    .ok('Close');
                                $mdDialog.show(NOTdeleted).then(function () {
                                }, function () {
                                });
                            }
                            else {
                                location.href = "/index.html";
                            }
                        });
                }, function () {
                });
            }, function () {
            });
        };
    })
    .controller("ManageStoreControllerEnglish", function ($rootScope, $scope, $http) {
        $scope.Logout = function () {
            $rootScope.Logout();
        };

        $scope.tabHeader = "Manage Store";
        $scope.transactions = true;
        $scope.BestCategories = [];
        $scope.BestProducts = [];
        $scope.BestProduct = [];

        $scope.displayChart = false;

        $scope.BestProductsFunction = function () {
            angular.forEach($scope.BestCategories, function (value, key) {
                $http({
                    //url: "http://bslogic-001-site1.ctempurl.com/Products.asmx/BestProductsInCategory",
                    url: "Products.asmx/BestProductsInCategory",
                    method: "get",
                    params: { CategoryID: value.drilldown }
                })
                    .then(function (response) {
                        $scope.BestProductResponse = response.data;

                        angular.forEach($scope.BestProductResponse, function (value2, key) {
                            $scope.BestProduct.push([value2.ProductName, value2.Amount]);
                        });
                        $scope.BestProducts.push({ id: value.drilldown, data: $scope.BestProduct });
                        $scope.BestProduct = [];
                    });

            });

            $scope.displayChart = true;
        };
        $scope.BestCategoriesFunction = function () {
            $http({
                //url: "http://bslogic-001-site1.ctempurl.com/Products.asmx/BestCategories",
                url: "/Products.asmx/BestCategories",
                method: "get"
            })
                .then(function (response) {
                    $scope.BestCategoryResponse = response.data;
                    angular.forEach($scope.BestCategoryResponse, function (value, key) {
                        $scope.BestCategories.push({ name: value.CategoryName, y: value.Amount, drilldown: value.CategoryID });
                    });
                    $scope.BestProductsFunction();
                });
        };

        $scope.chartOptions = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Best Category'
            },
            xAxis: {
                type: 'category'
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true
                    }
                }
            },

            series: [{
                name: 'Categories',
                colorByPoint: true,
                data: $scope.BestCategories
            }],
            drilldown: {
                series: $scope.BestProducts
            }
        };
        $scope.acceptPayment = function () {
            var Paypal = $scope.checkboxPayment.paypal;
            var BankTransfer = $scope.checkboxPayment.bankTransfer;
            var Cash = $scope.checkboxPayment.cash;

            $http({
                //url: "http://bslogic-001-site1.ctempurl.com/PaymentMethods.asmx/AcceptPaymentMethods",
                url: "PaymentMethods.asmx/AcceptPaymentMethods",
                method: "get",
                params: { paypal: Paypal, bankTransfer: BankTransfer, cash: Cash }
            })
                .then(function (response) {
                    $scope.result = response.data;
                }, function (error) {
                    $scope.error = error.data;
                });
        };
        $scope.checkboxPayment = {
            cash: false,
            paypal: false,
            bankTransfer: false
        };

        $scope.checkedPayment = function () {
            $http({
                //url: "http://bslogic-001-site1.ctempurl.com/PaymentMethods.asmx/GetPaymentMethods",
                url: "PaymentMethods.asmx/GetPaymentMethods",
                method: "get",
                params: {}
            })
                .then(function (response) {
                    $scope.checkboxPayment.paypal = response.data.Paypal;
                    $scope.checkboxPayment.cash = response.data.Cash;
                    $scope.checkboxPayment.bankTransfer = response.data.BankTransfer;
                }, function (error) {
                    $scope.error = error.data;
                });
        };
        
        //PayPal
        $scope.editPayPal = false;

        $scope.UpdatePayPalInfo = function () {
            var PayPalEmail = $scope.PayPalInfo.PayPalEmail;
            var PayPalCurrencey = $scope.PayPalInfo.PayPalCurrencey;
            if (PayPalEmail.includes("@")) {
                $http({
                    //url: "http://bslogic-001-site1.ctempurl.com/PaymentMethods.asmx/UpdatePayPalInfo",
                    url: "/PaymentMethods.asmx/UpdatePayPalInfo",
                    method: "get",
                    params: { email: PayPalEmail, currency: PayPalCurrencey }
                })
                    .then(function (response) {
                        $scope.theresults = response.data;
                        $scope.editPayPal = false;

                    }, function (error) {
                        $scope.error = error.data;
                    });
            }
        };

        $scope.GetPayPalInfo = function () {
            $http({
                url: "http://bslogic-001-site1.ctempurl.com/PaymentMethods.asmx/GetPayPalInfo",
                url: "/PaymentMethods.asmx/GetPayPalInfo",
                method: "get",
                params: {}
            })
                .then(function (response) {
                    if (!(response.data.PayPalEmail.includes("No Value"))) {
                        $scope.PayPalInfo = response.data;
                    }
                }, function (error) {
                    $scope.error = error.data;
                });
        };

        $scope.UpdateBankInfo = function () {
            var IBAN = $scope.bankInfo.IBAN;
            if (IBAN !== {} && IBAN !== null) {
                $http({
                    //url: "http://bslogic-001-site1.ctempurl.com/PaymentMethods.asmx/UpdateBankInfo",
                    url: "/PaymentMethods.asmx/UpdateBankInfo",
                    method: "get",
                    params: { IBAN: IBAN }
                })
                    .then(function (response) {
                        $scope.bankInfo.IBAN = response.data;
                        $scope.bankInfo.IBAN = $scope.bankInfo.IBAN.substr(1, $scope.bankInfo.IBAN.length - 2);
                       $scope.editIBAN = false;
                    }, function (error) {
                        $scope.error = error.data;
                    });
            }
        };

        $scope.bankInfo = {
            IBAN: ""
        };
        $scope.editIBAN = false;

        $scope.GetBankInfo = function () {
            $http({
                //url: "http://bslogic-001-site1.ctempurl.com/PaymentMethods.asmx/GetBankInfo",
                url: "/PaymentMethods.asmx/GetBankInfo",
                method: "get",
                params: {}
            })
                .then(function (response) {
                    if (!response.data.includes("No ShopOwnerBank")) {
                        $scope.bankInfo.IBAN = response.data;
                        $scope.bankInfo.IBAN = $scope.bankInfo.IBAN.substr(1, $scope.bankInfo.IBAN.length - 2);
                    }

                }, function (error) {
                    $scope.error = error.data;
                });
        };


        $scope.GetAllTransactions = function () {
            $http({
                //url: "http://bslogic-001-site1.ctempurl.com/BuyerOrder.asmx/GetAllTransactions",
                url: "/BuyerOrder.asmx/GetAllTransactions",
                method: "get"
            })
                .then(function (response) {
                    $scope.orders = response.data;
                });
        };

        $scope.OrderDetails = function (OrderDetail) {
            $scope.transactions = false;
            $scope.OrderDetail = OrderDetail;
            $http({
                //url: "http://bslogic-001-site1.ctempurl.com/BuyerOrder.asmx/GetAllOrderProducts",
                url: "/BuyerOrder.asmx/GetAllOrderProducts",
                method: "get",
                params: { Order_ID: OrderDetail.ID }
            })
                .then(function (response) {
                    $scope.ProductOrders = response.data;
                });
        };

        $scope.UpdateStatus = function (order, id) {
            $http({
                //url: "http://bslogic-001-site1.ctempurl.com/BuyerOrder.asmx/UpdateStatus",
                url: "/BuyerOrder.asmx/UpdateStatus",
                method: "get",
                params: { ID: id }
            })
                .then(function (response) {
                    $scope.result = response.data;
                    var remove = $scope.orders.indexOf(order);
                    $scope.orders.splice(remove, 1);
                    $scope.transactions = true;
                }, function (error) { });
        };
    })
    .controller("DevelopmentEnvironmentControllerEnglish", function ($rootScope, $scope, $http, $filter, validLinkService, $mdDialog) {
        $scope.Logout = function () {
            $rootScope.Logout();
        };
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


        $scope.tabHeader = "Development Environment";
        $scope.tab = {};
        $scope.refreshIframe = function () {
            $scope.tab.refresh = true;
        };

        var myservice = {};
        myservice.refresh = function () {
            //$http.get('http://bslogic-001-site1.ctempurl.com/CreationStage.asmx/GetColors').then(function (response) {
            $http.get('/CreationStage.asmx/GetColors').then(function (response) {

                $scope.refreshed = response.data;
                $scope.color1 = $scope.refreshed.Color1;
                $scope.color2 = $scope.refreshed.Color2;
                $scope.color3 = $scope.refreshed.Color3;
                $scope.color4 = $scope.refreshed.Color4;
            });
        };

        var Links_service = {};
        Links_service.refresh = function () {
            //$http.get('http://bslogic-001-site1.ctempurl.com/ShowHideElement.asmx/VisibleElement').then(function (response) {
            $http.get('/ShowHideElement.asmx/VisibleElement').then(function (response) {

                $scope.refreshed = response.data;

                for (var i = 0; i < $scope.refreshed.length; i++) {
                    if ($scope.refreshed[i].Name === "Snapchat") {
                        $scope.disableSnapchat = $scope.refreshed[i].Hidden;
                        $scope.icon.snapchat = !$scope.refreshed[i].Hidden;
                    }
                    else if ($scope.refreshed[i].Name === "Instagram") {
                        $scope.disableInstagram = $scope.refreshed[i].Hidden;
                        $scope.icon.instagram = !$scope.refreshed[i].Hidden;
                    }
                    else if ($scope.refreshed[i].Name === "Twitter") {
                        $scope.disableTwitter = $scope.refreshed[i].Hidden;
                        $scope.icon.twitter = !$scope.refreshed[i].Hidden;
                    }
                    else if ($scope.refreshed[i].Name === "Facebook") {
                        $scope.disableFacebook = $scope.refreshed[i].Hidden;
                        $scope.icon.facebook = !$scope.refreshed[i].Hidden;
                    }
                }
            });
        };

        //$http.get('http://bslogic-001-site1.ctempurl.com/CreationStage.asmx/GetTemplateID').then(function (response) {
        $http.get('/CreationStage.asmx/GetTemplateID').then(function (response) {

            $scope.storeID = response.data;
            //alert(response);

            if ($scope.storeID.TemplateID === 1) {
                $scope.MYtemplate = "/Templates/Template_1.html";
            }
            else if ($scope.storeID.TemplateID === 2) {
                $scope.MYtemplate = "/Templates/Template_2/Template_2.html";
            }
            else if ($scope.storeID.TemplateID === 3) {
                $scope.MYtemplate = "/Templates/Template_3/Template_3.html";
            }
            else if ($scope.storeID.TemplateID === 4) {
                $scope.MYtemplate = "/Templates/Template_4/Template_4.html";
            }
            else if ($scope.storeID.TemplateID === 5) {
                $scope.MYtemplate = "/Templates/Template_5/Template_5.html";
            }
            else if ($scope.storeID.TemplateID === 6) {
                $scope.MYtemplate = "/Templates/Template_6/Template_6.html";
            }
        },
            function (error) {
                $scope.error = error.data;
            });

        $scope.resulset = [];
        var StoreData = function () {

            //$http.post('http://bslogic-001-site1.ctempurl.com/TemplateData.asmx/StoreData').then(function (response) {
            $http.post('/TemplateData.asmx/StoreData').then(function (response) {
                $scope.resultset = response.data;
                //Store Info
                $scope.logo = $scope.resultset.Logo;
                $scope.StoreName = $scope.resultset.Name;
                $scope.desc = $scope.resultset.Description;
                //$scope.desc = $filter('newlines')($scope.desc);
                // $scope.desc = $scope.desc.replace(/\n/g, "<br />");
                //console.log($scope.desc);

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

                //Social Media Link
                if ($scope.resultset.SnapchatLink !== 'No Value') {
                    $scope.mySnapchatLink = $scope.resultset.SnapchatLink;
                    //       mySnapchat = $scope.resultset.SnapchatLink;
                }
                // else { mySnapchat = "No Link"; }

                if ($scope.resultset.TwitterLink !== 'No Value') {
                    $scope.myTwitterLink = $scope.resultset.TwitterLink;
                    //      myTwitter = $scope.resultset.TwitterLink;
                }
                //else { myTwitter = "No Link"; }

                if ($scope.resultset.FacebookLink !== 'No Value') {
                    $scope.myFacebookLink = $scope.resultset.FacebookLink;
                    //     myFacebook = $scope.resultset.FacebookLink;
                }
                //   else { myFacebook = "No Link"; }

                if ($scope.resultset.InstagramLink !== 'No Value') {
                    $scope.myInstagramLink = $scope.resultset.InstagramLink;
                    //  myInstagram = $scope.resultset.InstagramLink;
                }
                //  else { myInstagram = "No Link"; }

                $scope.TextType = [{ name: "Store Name", value: $scope.StoreName },
                { name: "Store Description", value: $scope.desc },
                { name: "Phone", value: $scope.Phone },
                { name: "Address", value: $scope.address },
                { name: "Menu Title", value: $scope.MenuTitle }
                ];
                $scope.selectedTextType = $scope.TextType[0];
                $scope.ShopOwnerText = $scope.selectedTextType.value;

                //Menu
                $scope.MenuTitle = $scope.resultset.MenuTitle;

                ElementsData();

            }, function (error) {
                $scope.error = error;
            });
        };
        StoreData();

        ////////////Template Elements

        var ElementsData = function () {
            //$http.post('http://bslogic-001-site1.ctempurl.com/ShowHideElement.asmx/GetElementsInfo').then(function (response) {
            $http.post('/ShowHideElement.asmx/GetElementsInfo').then(function (response) {
                $scope.elementInfo = response.data;

                $scope.disableSnapchat = true;
                $scope.disableInstagram = true;
                $scope.disableTwitter = true;
                $scope.disableFacebook = true;

                for (var i = 0; i < $scope.elementInfo.length; i++) {
                    if ($scope.elementInfo[i].Name === "Snapchat") {
                        $scope.icon.snapchat = !$scope.elementInfo[i].Hidden;
                        validLinkService.valid("Snapchat").then(function (responseSnap) {
                            if (responseSnap === 'true')
                                $scope.disableSnapchat = false;
                            else if (responseSnap === 'false') {
                                $scope.disableSnapchat = true;
                                $scope.icon.snapchat = false;
                            }
                        });
                    }
                    else if ($scope.elementInfo[i].Name === "Facebook") {
                        $scope.icon.facebook = !$scope.elementInfo[i].Hidden;
                        validLinkService.valid("Facebook").then(function (response) {
                            if (response === 'true')
                                $scope.disableFacebook = false;
                            else if (response === 'false') {
                                $scope.disableFacebook = true;
                                $scope.icon.facebook = false;
                            }
                        });
                    }
                    else if ($scope.elementInfo[i].Name === "Twitter") {
                        $scope.icon.twitter = !$scope.elementInfo[i].Hidden;
                        validLinkService.valid("Twitter").then(function (response) {
                            if (response === 'true')
                                $scope.disableTwitter = false;
                            else if (response === 'false') {
                                $scope.disableTwitter = true;
                                $scope.icon.twitter = false;
                            }
                        });
                    }
                    else if ($scope.elementInfo[i].Name === "Instagram") {
                        $scope.icon.instagram = !$scope.elementInfo[i].Hidden;
                        validLinkService.valid("Instagram").then(function (response) {
                            if (response === 'true')
                                $scope.disableInstagram = false;
                            else if (response === 'false') {
                                $scope.disableInstagram = true;
                                $scope.icon.instagram = false;
                            }
                        });
                    }
                    else if ($scope.elementInfo[i].Name === "Slider") {
                        $scope.section.slider = !$scope.elementInfo[i].Hidden;
                    }
                    else if ($scope.elementInfo[i].Name === "About") {
                        $scope.section.about = !$scope.elementInfo[i].Hidden;
                        $scope.AboutContect = $scope.elementInfo[i].Value;
                        $scope.TextType.push({ name: "About", value: $scope.elementInfo[i].Value });
                    }
                }

            }, function (error) {
                $scope.error = error;
            });
        };

        $scope.ShowHideSection = function (section) {
            var action = "";
            if (section === "Slider") {
                if ($scope.section.slider)
                    action = "Show";
                else action = "Hide";
            }
            else if (section === "About") {
                if ($scope.section.about)
                    action = "Show";
                else action = "Hide";
            }
            if (section !== "" && action !== "") {
                $http({
                    //url: "http://bslogic-001-site1.ctempurl.com/ShowHideElement.asmx/ShowHideSection",
                    url: "/ShowHideElement.asmx/ShowHideSection",
                    method: "get",
                    params: {
                        section: section,
                        action: action
                    }
                })
                    .then(function (response) {
                        $scope.sectionResult = response.data;
                        $scope.refreshIframe();
                    });
            }
        };

        $scope.ShowHideIcon = function (icon) {
            var action = "";
            if (icon === "Snapchat") {
                if ($scope.icon.snapchat)
                    action = "Show";
                else action = "Hide";
            }
            else if (icon === "Twitter") {
                if ($scope.icon.twitter)
                    action = "Show";
                else action = "Hide";
            }
            else if (icon === "Facebook") {
                if ($scope.icon.facebook)
                    action = "Show";
                else action = "Hide";
            }
            else if (icon === "Instagram") {
                if ($scope.icon.instagram)
                    action = "Show";
                else action = "Hide";
            }
            if (icon !== "" && action !== "") {
                $http({
                    //url: "http://bslogic-001-site1.ctempurl.com/ShowHideElement.asmx/ShowHideIcon",
                    url: "/ShowHideElement.asmx/ShowHideIcon",
                    method: "get",
                    params: {
                        icon: icon,
                        action: action
                    }
                })
                    .then(function (response) {
                        $scope.iconResult = response.data;
                        $scope.refreshIframe();

                    });
            }
        };

        $scope.updateText = function () {
            $scope.ShopOwnerText = $scope.selectedTextType.value;
        };
        $scope.UpdateStoreInfo = function () {
            $scope.loadingStoreInfo = true;
            if (typeof $scope.selectedTextType !== "undefined") {
                if ($scope.selectedTextType !== null || $scope.selectedTextType !== "") {
                    DataType = $scope.selectedTextType.name;
                    NewValue = $scope.ShopOwnerText;
                    $http({
                        //url: "http://bslogic-001-site1.ctempurl.com/TemplateData.asmx/UpdatStoreData",
                        url: "/TemplateData.asmx/UpdatStoreData",
                        method: "get",
                        params: {
                            DataType: DataType,
                            NewValue: NewValue
                        }
                    })
                        .then(function (response) {
                            $scope.selectedTextType.value = response.data.substr(1, response.data.length - 2);
                            $scope.ShopOwnerText = response.data.substr(1, response.data.length - 2);

                            //  $scope.ShopOwnerText = $filter('newlines')($scope.ShopOwnerText);
                            // $scope.selectedTextType.value = $filter('newlines')($scope.ShopOwnerText);

                            $scope.refreshIframe();

                            $scope.loadingStoreInfo = false;

                        }, function (error) {
                            $scope.error = error.data;
                        });

                }
            }

        };

        $scope.$on("fileProgress", function (e, progress) {
            $scope.progress = progress.loaded / progress.total;
        });

        $scope.UpdateColors = function () {
            var post = $http({
                method: "POST",
                //url: "http://bslogic-001-site1.ctempurl.com/CreationStage.asmx/UpdateColors",
                url: "/CreationStage.asmx/UpdateColors",
                dataType: 'json',
                data: { color1: $scope.color1, color2: $scope.color2, color3: $scope.color3, color4: $scope.color4 },
                headers: { "Content-Type": "application/json" }
            });
            $scope.refreshIframe();
        };


        $scope.ChangeLogo = function (ev) {
            //var logoPath = $scope.imageSrc; 

            var confirm = $mdDialog.confirm()
                .title('Do you want to Change your store Colors also?')
                .textContent('The new colors will be taken from your new logo.')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('No');

            $mdDialog.show(confirm)
                .then(function () {
                    $http({
                        //url: "http://bslogic-001-site1.ctempurl.com/manageWebsiteColors.asmx/GetWebsiteColors",
                        url: "/manageWebsiteColors.asmx/GetWebsiteColors",
                        dataType: 'json',
                        method: "POST",
                        data: { path: $scope.imageSrc },
                        headers: { "Content-Type": "application/json; charset=utf-8" }
                    })
                        .then(function (response) {
                        }, function (error) {
                            $scope.R = error.data;
                        });

                    $http({
                        method: "POST",
                        //url: "http://bslogic-001-site1.ctempurl.com/CreationStage.asmx/UploadLogo",
                        url: "/CreationStage.asmx/UploadLogo",
                        dataType: 'json',
                        data: { logo: $scope.imageSrc },
                        headers: { "Content-Type": "application/json" }
                    })
                        .then(function (response) { }, function (error) { });

                    $scope.refreshIframe();
                    myservice.refresh();

                },
                function () {
                    $http({
                        method: "POST",
                        //url: "http://bslogic-001-site1.ctempurl.com/CreationStage.asmx/UploadLogo",
                        url: "/CreationStage.asmx/UploadLogo",
                        dataType: 'json',
                        data: { logo: $scope.imageSrc },
                        headers: { "Content-Type": "application/json" }
                    })
                        .then(function (response) { }, function (error) { });
                    $scope.refreshIframe();
                });
        };

        $scope.UpdateSlider = function () {
            $scope.loadingCover = true;
            var post = $http({
                method: "POST",
                //url: "http://bslogic-001-site1.ctempurl.com/TemplateData.asmx/UploadSlider",
                url: "/TemplateData.asmx/UploadSlider",
                dataType: 'json',
                data: { slider: $scope.imageSrc_slider },
                headers: { "Content-Type": "application/json" }
            })
                .then(function (response) {
                }, function (error) { });

            $scope.refreshIframe();
            $scope.loadingCover = false;

        };

        $scope.UpdateAboutImage = function () {
            $scope.loadingAboutImage = true;

            var post = $http({
                method: "POST",
                //url: "http://bslogic-001-site1.ctempurl.com/TemplateData.asmx/UploadAboutImage",
                url: "/TemplateData.asmx/UploadAboutImage",
                dataType: 'json',
                data: { image: $scope.imageSrc_about },
                headers: { "Content-Type": "application/json" }
            })
                .then(function (response) { }, function (error) { });

            $scope.refreshIframe();
            $scope.loadingAboutImage = false;

        };

        $scope.UpdateLinks = function () {
            $scope.loadingLinks = true;
            /*    var post = $http({
                    method: "POST",
                    url: "TemplateData.asmx/UpdateLinks",
                    dataType: 'json',
                    data: { snapchat_link: $scope.mySnapchatLink, twitter_link: $scope.myTwitterLink, facebook_link: $scope.myFacebookLink, instagram_link: $scope.myInstagramLink },
                    headers: { "Content-Type": "application/json" }
                });
                post.then(function (response) { }, function (error) { });
                */
            $http.post(
                //"http://bslogic-001-site1.ctempurl.com/TemplateData.asmx/UpdateLinks",
                "/TemplateData.asmx/UpdateLinks",
                $.param({
                    snapchat_link: $scope.mySnapchatLink,
                    twitter_link: $scope.myTwitterLink,
                    facebook_link: $scope.myFacebookLink,
                    instagram_link: $scope.myInstagramLink
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    }
                }
            )
                .then(function (response) {
                    $scope.result = response.data;

                    $scope.refreshIframe();
                    Links_service.refresh();

                    $scope.loadingLinks = false;

                }, function (error) {
                    $scope.error = error.data;
                });
        };
    })
   /* .controller("PreviewWebsiteControllerEnglish", function ($http, $scope) {
        $scope.DesktopView = true;
        $scope.MobileView = false;
        $scope.Previews = ["Desktop view", "Mobile view"];
        $scope.template = "";
        $scope.selectedPreview = $scope.Previews[0];
        //$http.get('http://bslogic-001-site1.ctempurl.com/CreationStage.asmx/GetTemplateID').then(function (response) {
        $http.get('/CreationStage.asmx/GetTemplateID').then(function (response) {

            $scope.storeID = response.data;
            if ($scope.storeID.TemplateID === 1) {
                $scope.template = "/Templates/Template_1.html";
            }
            else if ($scope.storeID.TemplateID === 2) {
                $scope.template = "/Templates/Template_2/Template_2.html";
            }
            else if ($scope.storeID.TemplateID === 3) {
                $scope.template = "/Templates/Template_3/Template_3.html";
            }
            else if ($scope.storeID.TemplateID === 4) {
                $scope.template = "/Templates/Template_4/Template_4.html";
            }
            else if ($scope.storeID.TemplateID === 5) {
                $scope.template = "/Templates/Template_5/Template_5.html";
            }
            else if ($scope.storeID.TemplateID === 6) {
                $scope.template = "/Templates/Template_6/Template_6.html";
            }
        },
            function (error) {
                $scope.error = error.data;
            });
        $scope.selectedPreviewChanged = function () {
            if ($scope.selectedPreview === 'Desktop view') {
                $scope.DesktopView = true;
                $scope.MobileView = false;
            }
            else {
                $scope.DesktopView = false;
                $scope.MobileView = true;
            }
        };
    })*/
    .controller("TemplateControllerEnglish", function ($scope, $http, $location, $rootScope) {
        $scope.tabHeader = "Template";

        /*    $scope.getImageUrl = function (index) {
                return "/images/T" + (index+1)+".png";
            };*/
        $scope.Logout = function () {
            $rootScope.Logout();
        };
        $scope.Template = function (Tid) {
            var post = $http({
                method: "POST",
                //url: "http://bslogic-001-site1.ctempurl.com/CreationStage.asmx/AddTemplate",
                url: "/CreationStage.asmx/AddTemplate",
                dataType: 'json',
                data: { id: Tid },
                headers: { "Content-Type": "application/json" }
            });
            post.then(function (response) { }, function (error) { });
            $location.path('EDITandINFO-English/DevelopmentEnvironmentEnglish');
        };
    })
    .controller("ProductsControllerEnglish", function ($rootScope, $scope, $http, $mdDialog) {
        $scope.tabHeader = "Products";
        $scope.displayCategoryTable = false;
        $scope.selectedCategory = "";
        $scope.editCategory = false;
        $scope.NoCategory = false;
        //logout
        $scope.Logout = function () {
            $rootScope.Logout();
        };
        //logout

        //to retrieve all categories
        $scope.getCat = function (newCategury) {
            $http({
                //url: "http://bslogic-001-site1.ctempurl.com/Products.asmx/GetAllCategories",
                url: "/Products.asmx/GetAllCategories",
                method: "get"
            })
                .then(function (response) {
                    $scope.categories = response.data;
                    if ($scope.categories.length != 0) {
                        if (newCategury == null || newCategury === 'undefined' || newCategury == "CurrentCategoryDeleted") {
                            $scope.selectedCategory = $scope.categories[0].Name;
                        }
                        else { $scope.selectedCategory = newCategury; }
                        $scope.selectedCategoryChanged();
                    }
                    else {
                        $scope.NoCategory = true;
                    }
                }, function () { });

        };
        //\to retrieve all categories

        // to add category 
        $scope.addNewCategory = function (newCategury) {
            $http({
                //url: "http://bslogic-001-site1.ctempurl.com/Products.asmx/AddNewCategory",
                url: "/Products.asmx/AddNewCategory",
                method: "get",
                params: { cat: newCategury }
            })
                .then(function (response) {
                    $scope.result = response.data;
                    $scope.getCat(newCategury);
                });
            $scope.newCategury = "";
            $scope.newCat = false;
            $scope.NoCategory = false;
        };
        //\to add category

        $scope.x = function () {
            $scope.editCategory = true;
        };

        //Delete Category
        $scope.DeleteCategory = function (ev) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete category "' + $scope.selectedCategory + '" ?')
                //  .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('YES')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function () {
                $http({
                    //url: "http://bslogic-001-site1.ctempurl.com/Products.asmx/DeleteCategory",
                    url: "/Products.asmx/DeleteCategory",
                    method: "GET",
                    params: { category: $scope.selectedCategory }
                })
                    .then(function (response) {
                        $scope.getCat("CurrentCategoryDeleted");
                    }, function (error) {
                        alert("failed delete");
                    });
            }, function () { });
        };
        //\DeleteCategory
        // change category Order
        $scope.ChangeOrder = function (cats) {
            var categories = "";
            for (var i = 0; i < cats.length; i++) {
                categories += cats[i].OrderInMenu + ",";
            }
            alert("change order");
            $http({
                //url: "http://bslogic-001-site1.ctempurl.com/Products.asmx/ChangeOrder",
                url: "/Products.asmx/ChangeOrder",
                method: "get",
                params: { categoriesOrders: categories }
            })
                .then(function (response) {
                    $scope.categories = response.data;
                    $scope.displayCategoryTable = false;
                }, function (error) {
                    alert(error.data);
                    $scope.resultoforder = error.data;
                });
        };
        //\change category Order

        //upload image for product
        $scope.uploadImage = function (fileReader) {
            filePath = $scope.imageSrc;
            $scope.$on("fileProgress", function (e, progress) {
                $scope.progress = progress.loaded / progress.total;
                alert($scope.progress);
            });
        };
        //\upload image for product

        //list all products for specific category
        $scope.selectedCategoryChanged = function () {
            if ($scope.selectedCategory != null) {
                $http({
                    //url: "http://bslogic-001-site1.ctempurl.com/Products.asmx/GetAllProducts",
                    url: "/Products.asmx/GetAllProducts",
                    method: "get",
                    params: { category: $scope.selectedCategory }
                })
                    .then(function (response) {
                        $scope.products = response.data;
                    });
            }
        };
        //\list all products for specific category

        // apply edit the product
        $scope.editProduct = function (index, product, ID, Image, Name, Description, Price, PAD, Amount, Discount) {
            $http({
                //url: "http://bslogic-001-site1.ctempurl.com/Products.asmx/EditProduct",
                url: "/Products.asmx/EditProduct",
                headers: { "Content-Type": "application/json;charset=utf-8" },
                dataType: 'json',
                method: 'post',
                data: JSON.stringify({ id: ID, cat: $scope.selectedCategory, image: Image, name: Name, des: Description, price: Price, PADs: PAD, amount: Amount, discount: Discount })
            }).then(function (response) {
                /*$scope.editP = response.data;
                $scope.products[index] = product;
                product.edit = false;*/
                $scope.editCategory = false;
                $scope.selectedCategoryChanged();
            }, function (error) {
                alert(error);
                alert("failed edit");
            });
        };
        //\apply edit the product

        //to add new row
        $scope.addNewProduct2 = function (product) {
            $http.post(
                //"http://bslogic-001-site1.ctempurl.com/Products.asmx/AddNewProduct",
                "/Products.asmx/AddNewProduct",
                $.param({
                    category: product.Category_ID,
                    image: product.Image,
                    name: product.Name,
                    des: product.Description,
                    price: product.Price,
                    amount: product.Amount,
                    discount: product.Discount
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    }
                }

            )
                .then(function (response) {
                    product.Image = '';
                    product.Name = '';
                    product.Description = '';
                    product.Price = '';
                    product.Amount = '';
                    product.Discount = '';
                    $scope.selectedCategoryChanged();
                }, function (error) {
                    $scope.error = error.data;
                });
        };
        //\to add new row

        //to remove row
        $scope.removeproduct = function (product, productID, name, ev) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete product "' + name + '"?')
                //  .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('YES')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function () {
                $http({
                    //url: "http://bslogic-001-site1.ctempurl.com/Products.asmx/RemoveProduct",
                    url: "/Products.asmx/RemoveProduct",
                    method: "get",
                    params: { product_ID: productID }
                })
                    .then(function (response) {
                        $scope.Delete = response.data;
                        if ($scope.Delete == 'true') {
                            var remove = $scope.products.indexOf(product);
                            $scope.products.splice(remove, 1);
                        }
                        else {
                            var msg;
                            msg = 'You are not able to delete the product because there are purchases do not completed yet.Please complete the operations before deleting the product';
                            var inform =
                                $mdDialog.alert()
                                    .textContent(msg)
                                    .targetEvent(ev)
                                    .ok('Close');
                            $mdDialog.show(inform).then(function () { }, function () { });
                        }
                    }, function (error) { });
            }, function () { });
        };
        //\to remove row
    })
    .controller("BS-Menu-ArabicCTRL", function ($http, $scope, $rootScope, $location, loginService, $mdDialog, $window /*, $dialogs, $templateCache*/) {
        $scope.Logout = function () {
            $rootScope.Logout();
        };
        $rootScope.English = function () {
            $location.path('/EDITandINFO-English');
          //  $window.location.href = "Views/BasicE.html";
        };

        $rootScope.DesktopView = function () {
            $location.path('/PreviewWebsite');
           // $window.open('localhost:50277/EDITandINFO/PreviewWebsite', '_blank');
            //$window.open('/Views/Preview.html', '_blank');

        };

        $rootScope.Publish = function (ev) {
            //$http.get('http://bslogic-001-site1.ctempurl.com/Published_Stores.asmx/PublishRequest')
            $http.get('/Published_Stores.asmx/PublishRequest')
                .then(function (response) {
                    var StoreValues = response.data;
                    if (StoreValues.Published === true) {
                        var inform =
                            $mdDialog.alert()
                                // .clickOutsideToClose(true)
                                // .parent(angular.element(document.querySelector('#popupContainer')))
                                .title('لقد قمت بالفعل بنشر متجرك ، وهذا هو الرابط الخاص بك (http://localhost:50277/BuildingStation/' + StoreValues.Domain + ')')
                                .textContent('يرجى نسخ الرابط وحفظه')
                                // .ariaLabel('Alert Dialog Demo')
                                .targetEvent(ev)
                                .ok('إغلاق');
                        $mdDialog.show(inform).then(function () {
                            //  $rootScope.status = 'You decided to get rid of your debt.';
                        }, function () {
                            // $rootScope.status = 'You decided to keep your debt.';
                        });
                    }
                    else if (StoreValues.PayPal === false && StoreValues.Cash === false && StoreValues.BankTransfer === false) {
                        // Appending dialog to document.body to cover sidenav in docs app
                        var checkPayment = $mdDialog.alert()
                            .title('يجب تحديد طريقة دفع واحدة على الأقل قبل النشر')
                            //  .ariaLabel('Lucky day')
                            .targetEvent(ev)
                            .ok('إغلاق');
                        $mdDialog.show(checkPayment).then(function () {
                            $location.path('/EDITandINFO/ManageStore');
                        }, function () {
                        });
                    }
                    else {// Appending dialog to document.body to cover sidenav in docs app
                        var confirm = $mdDialog.confirm()
                            .title('هذا رابط متجرك (http://localhost:50277/BuildingStation/' + StoreValues.Domain + '), هل ترغب في النشر؟')
                            .textContent('يرجى نسخ الرابط وحفظه')
                            //  .ariaLabel('Lucky day')
                            .targetEvent(ev)
                            .ok('نشر')
                            .cancel('إلغاء');

                        $mdDialog.show(confirm).then(function () {
                            $http({
                                //url: "http://bslogic-001-site1.ctempurl.com/Published_Stores.asmx/Publish",
                                url: "/Published_Stores.asmx/Publish",
                                params: { storeDomainName: StoreValues.Domain },
                                method: "get"
                            }).then(function (response) {
                                //$window.open('http://www.buildingstation.somee.com/' + StoreValues.Domain + '', '_blank');
                                $window.open('http://localhost:50277/BuildingStation/' + StoreValues.Domain + '', '_blank');
                            });
                            //  $rootScope.status = 'You decided to get rid of your debt.';
                        }, function () {
                            // $rootScope.status = 'You decided to keep your debt.';
                        });
                    }
                });
        };

        $rootScope.UnPublish = function (ev) {
            //$http.get('http://bslogic-001-site1.ctempurl.com/Published_Stores.asmx/UnPublishRequest').then(function (response) {
            $http.get('/Published_Stores.asmx/UnPublishRequest').then(function (response) {
                var StoreValues = response.data;
                if (StoreValues.Published === false) {
                    var inform =
                        $mdDialog.alert()
                            // .clickOutsideToClose(true)
                            // .parent(angular.element(document.querySelector('#popupContainer')))
                            .title('لم تقم بنشر متجرك بعد')
                            // .ariaLabel('Alert Dialog Demo')
                            .targetEvent(ev)
                            .ok('إغلاق');
                    $mdDialog.show(inform).then(function () {
                        //  $rootScope.status = 'You decided to get rid of your debt.';
                    }, function () {
                        // $rootScope.status = 'You decided to keep your debt.';
                    });
                }
                else {
                    var confirm = $mdDialog.confirm()
                        .title('هل تريد بالتأكيد إلغاء نشر متجرك؟')
                        //  .ariaLabel('Lucky day')
                        .targetEvent(ev)
                        .ok('نعم')
                        .cancel('إلغاء');

                    $mdDialog.show(confirm).then(function () {
                        //$http.get('http://bslogic-001-site1.ctempurl.com/Published_Stores.asmx/UnPublish').then(function (response) {
                        $http.get('/Published_Stores.asmx/UnPublish').then(function (response) {
                            var Store_values = response.data;
                            if (Store_values.Published === false) {
                                var Unpublished =
                                    $mdDialog.alert()
                                        .title('تم إلغاء نشر متجرك بنجاح')
                                        .targetEvent(ev)
                                        .ok('إغلاق');
                                $mdDialog.show(Unpublished).then(function () {
                                    //  $rootScope.status = 'You decided to get rid of your debt.';
                                }, function () {
                                    // $rootScope.status = 'You decided to keep your debt.';
                                });
                            }
                        });
                    });
                }
            });
        };

        //$templateCache.put('/dialogs/StorePassword.html', '<div class="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title"></span>Enter your store Password</h4></div><div class="modal-body"><ng-form name="nameDialog" novalidate role="form"><div class="form-group input-group-lg" ng-class="{true: \'has-error\'}[nameDialog.username.$dirty && nameDialog.username.$invalid]"><input type="password" class="form-control" name="username" id="username" ng-model="user.name" required><span class="help-block">Enter your full name, first &amp; last.</span></div></ng-form></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="cancelDelete()">Cancel</button><button type="button" class="btn btn-primary" ng-click="saveDelete()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Delete</button></div></div></div></div>');

        $rootScope.DeleteStore = function (ev) {
            var confirm = $mdDialog.confirm()
                .title('هل تريد بالتأكيد حذف متجرك؟')
                .textContent('سيتم حذف جميع البيانات الخاصة بك')
                .targetEvent(ev)
                .ok('نعم')
                .cancel('إلغاء');

            $mdDialog.show(confirm).then(function () {
                // Create Your Own Dialog
                /*  var dlg = $dialogs.create('/dialogs/StorePassword.html', 'PasswordToDeleteCtrl', {}, { key: false, back: 'static' });
                  dlg.result.then(function (password) {
                      $http({
                          url: "Published_Stores.asmx/DeleteStore",
                          params: { pass: password },
                          method: "get"
                      })
                          .then(function (response) {
                              var storePass = response.data;
                              if (storePass.Password === 'incorrect') {
                                  var NOTdeleted = $mdDialog.alert()
                                      .title('Incorrect Password')
                                      .targetEvent(ev)
                                      .ok('Close');
                                  $mdDialog.show(NOTdeleted).then(function () {
                                  }, function () {
                                  });
                              }
                              else {
                                  location.href = "/index.html";
                              }
                          });                 }, function () {
                    //  $rootScope.name = 'You decided not to enter in your name, that makes me sad.';
                      });*/
                /////////////////////////////////////////////////////////////////////
                // Appending dialog to document.body to cover sidenav in docs app
                var askForPassword = $mdDialog.prompt()
                    .title('أدخل كلمة مرور متجرك')
                    .textContent('ملاحظة: سيتم إزالة متجرك بالكامل من النظام وستحتاج إلى التسجيل مرة أخرى للحصول على متجر جديد')
                    .placeholder('كلمة المرور')
                    // .ariaLabel('Dog name')
                    .initialValue('')
                    .targetEvent(ev)
                    .required(true)
                    .ok('حذف')
                    .cancel('إلغاء');

                $mdDialog.show(askForPassword).then(function (result) {
                    $http({
                        //url: "http://bslogic-001-site1.ctempurl.com/Published_Stores.asmx/DeleteStore",
                        url: "/Published_Stores.asmx/DeleteStore",
                        params: { pass: result },
                        method: "get"
                    })
                        .then(function (response) {
                            var storePass = response.data;
                            if (storePass.Password === 'incorrect') {
                                var NOTdeleted = $mdDialog.alert()
                                    .title('كلمة المرور غير صحيحة')
                                    .targetEvent(ev)
                                    .ok('إغلاق');
                                $mdDialog.show(NOTdeleted).then(function () {
                                }, function () {
                                });
                            }
                            else {
                                $location.path('/BuildingStation');
                      //          location.path = "/index.html";
                            }
                        });
                }, function () {
                });
            }, function () {
            });
        };
    })/*.controller('PasswordToDeleteCtrl', function ($rootScope, $modalInstance, data) {
        //  $scope.user = { name: '' };

        $rootScope.cancelDelete = function () {
            $modalInstance.dismiss('canceled');
        }; // end cancel

        $rootScope.saveDelete = function () {
            $modalInstance.close(/*$scope.user.name*///);
       // }; // end save

        /*$scope.hitEnter = function (evt) {
             if (angular.equals(evt.keyCode, 13) && !(angular.equals($scope.name, null) || angular.equals($scope.name, '')))
                 $scope.save();
         }; // end hitEnter*/
   // }) // end PasswordToDeleteCtrl */
    .controller("ManageStoreController", function ($rootScope, $scope, $http) {
        $scope.Logout = function () {
            $rootScope.Logout();
        };

        $scope.tabHeader = "Manage Store";
        $scope.transactions = true;
        $scope.BestCategories = [];
        $scope.BestProducts = [];
        $scope.BestProduct = [];

        $scope.displayChart = false;

        $scope.BestProductsFunction = function () {
            angular.forEach($scope.BestCategories, function (value, key) {
                $http({
                    //url: "http://bslogic-001-site1.ctempurl.com/Products.asmx/BestProductsInCategory",
                    url: "/Products.asmx/BestProductsInCategory",
                    method: "get",
                    params: { CategoryID: value.drilldown }
                })
                    .then(function (response) {
                        $scope.BestProductResponse = response.data;

                        angular.forEach($scope.BestProductResponse, function (value2, key) {
                            $scope.BestProduct.push([value2.ProductName, value2.Amount]);
                        });
                        $scope.BestProducts.push({ id: value.drilldown, data: $scope.BestProduct });
                        $scope.BestProduct = [];
                    });

            });

            $scope.displayChart = true;
        };
        $scope.BestCategoriesFunction = function () {
            $http({
                //url: "http://bslogic-001-site1.ctempurl.com/Products.asmx/BestCategories",
                url: "/Products.asmx/BestCategories",
                method: "get"
            })
                .then(function (response) {
                    $scope.BestCategoryResponse = response.data;
                    angular.forEach($scope.BestCategoryResponse, function (value, key) {
                        $scope.BestCategories.push({ name: value.CategoryName, y: value.Amount, drilldown: value.CategoryID });
                    });
                    $scope.BestProductsFunction();
                });
        };

        $scope.chartOptions = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Best Category'
            },
            xAxis: {
                type: 'category'
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true
                    }
                }
            },

            series: [{
                name: 'Categories',
                colorByPoint: true,
                data: $scope.BestCategories
            }],
            drilldown: {
                series: $scope.BestProducts
            }
        };

        $scope.acceptPayment = function () {
            var Paypal = $scope.checkboxPayment.paypal;
            var BankTransfer = $scope.checkboxPayment.bankTransfer;
            var Cash = $scope.checkboxPayment.cash;

            $http({
                //url: "http://bslogic-001-site1.ctempurl.com/PaymentMethods.asmx/AcceptPaymentMethods",
                url: "/PaymentMethods.asmx/AcceptPaymentMethods",
                method: "get",
                params: { paypal: Paypal, bankTransfer: BankTransfer, cash: Cash }
            })
                .then(function (response) {
                    $scope.result = response.data;
                }, function (error) {
                    $scope.error = error.data;
                });
        };
        $scope.checkboxPayment = {
            cash: false,
            paypal: false,
            bankTransfer: false
        };

        $scope.checkedPayment = function () {
            $http({
                //url: "http://bslogic-001-site1.ctempurl.com/PaymentMethods.asmx/GetPaymentMethods",
                url: "/PaymentMethods.asmx/GetPaymentMethods",
                method: "get",
                params: {}
            })
                .then(function (response) {
                    $scope.checkboxPayment.paypal = response.data.Paypal;
                    $scope.checkboxPayment.cash = response.data.Cash;
                    $scope.checkboxPayment.bankTransfer = response.data.BankTransfer;
                }, function (error) {
                    $scope.error = error.data;
                });
        };

        //PayPal
        $scope.editPayPal = false;

        $scope.UpdatePayPalInfo = function () {
            var PayPalEmail = $scope.PayPalInfo.PayPalEmail;
            var PayPalCurrencey = $scope.PayPalInfo.PayPalCurrencey;
            if (PayPalEmail.includes("@")) {
                $http({
                    //url: "http://bslogic-001-site1.ctempurl.com/PaymentMethods.asmx/UpdatePayPalInfo",
                    url: "/PaymentMethods.asmx/UpdatePayPalInfo",
                    method: "get",
                    params: { email: PayPalEmail, currency: PayPalCurrencey }
                })
                    .then(function (response) {
                        $scope.theresults = response.data;
                        $scope.editPayPal = false;

                    }, function (error) {
                        $scope.error = error.data;
                    });
            }
        };

        $scope.GetPayPalInfo = function () {
            $http({
                //url: "http://bslogic-001-site1.ctempurl.com/PaymentMethods.asmx/GetPayPalInfo",
                url: "/PaymentMethods.asmx/GetPayPalInfo",
                method: "get",
                params: {}
            })
                .then(function (response) {
                    if (!(response.data.PayPalEmail.includes("No Value"))) {
                        $scope.PayPalInfo = response.data;
                    }
                }, function (error) {
                    $scope.error = error.data;
                });
        };

        $scope.UpdateBankInfo = function () {
            var IBAN = $scope.bankInfo.IBAN;
            if (IBAN !== {} && IBAN !== null) {
                $http({
                    //url: "http://bslogic-001-site1.ctempurl.com/PaymentMethods.asmx/UpdateBankInfo",
                    url: "/PaymentMethods.asmx/UpdateBankInfo",
                    method: "get",
                    params: { IBAN: IBAN }
                })
                    .then(function (response) {
                        $scope.bankInfo.IBAN = response.data;
                        $scope.bankInfo.IBAN = $scope.bankInfo.IBAN.substr(1, $scope.bankInfo.IBAN.length - 2);
                        $scope.editIBAN = false;
                    }, function (error) {
                        $scope.error = error.data;
                    });
            }
        };

        $scope.bankInfo = {
            IBAN: ""
        };
        $scope.editIBAN = false;

        $scope.GetBankInfo = function () {
            $http({
                //url: "http://bslogic-001-site1.ctempurl.com/PaymentMethods.asmx/GetBankInfo",
                url: "/PaymentMethods.asmx/GetBankInfo",
                method: "get",
                params: {}
            })
                .then(function (response) {
                    if (!response.data.includes("No ShopOwnerBank")) {
                        $scope.bankInfo.IBAN = response.data;
                        $scope.bankInfo.IBAN = $scope.bankInfo.IBAN.substr(1, $scope.bankInfo.IBAN.length - 2);
                    }

                }, function (error) {
                    $scope.error = error.data;
                });
        };


        $scope.GetAllTransactions = function () {
            $http({
                //url: "http://bslogic-001-site1.ctempurl.com/BuyerOrder.asmx/GetAllTransactions",
                url: "/BuyerOrder.asmx/GetAllTransactions",
                method: "get"
            })
                .then(function (response) {
                    $scope.orders = response.data;
                });
        };

        $scope.OrderDetails = function (OrderDetail) {
            $scope.transactions = false;
            $scope.OrderDetail = OrderDetail;
            $http({
                //url: "http://bslogic-001-site1.ctempurl.com/BuyerOrder.asmx/GetAllOrderProducts",
                url: "/BuyerOrder.asmx/GetAllOrderProducts",
                method: "get",
                params: { Order_ID: OrderDetail.ID }
            })
                .then(function (response) {
                    $scope.ProductOrders = response.data;
                });
        };


        $scope.UpdateStatus = function (order, id) {
            $http({
                //url: "http://bslogic-001-site1.ctempurl.com/BuyerOrder.asmx/UpdateStatus",
                url: "/BuyerOrder.asmx/UpdateStatus",
                method: "get",
                params: { ID: id }
            })
                .then(function (response) {
                    $scope.result = response.data;
                    var remove = $scope.orders.indexOf(order);
                    $scope.orders.splice(remove, 1);
                    $scope.transactions = true;
                }, function (error) { });
        };
    })
    .controller("DevelopmentEnvironmentController", function ($rootScope, $scope, $http, $filter, validLinkService, $mdDialog) {
        $scope.Logout = function () {
            $rootScope.Logout();
        };
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


        $scope.tabHeader = "Development Environment";
        $scope.tab = {};
        $scope.refreshIframe = function () {
            $scope.tab.refresh = true;
        };

        var myservice = {};
        myservice.refresh = function () {
            //$http.get('http://bslogic-001-site1.ctempurl.com/CreationStage.asmx/GetColors').then(function (response) {
            $http.get('/CreationStage.asmx/GetColors').then(function (response) {

                $scope.refreshed = response.data;
                $scope.color1 = $scope.refreshed.Color1;
                $scope.color2 = $scope.refreshed.Color2;
                $scope.color3 = $scope.refreshed.Color3;
                $scope.color4 = $scope.refreshed.Color4;
            });
        };

        var Links_service = {};
        Links_service.refresh = function () {
            //$http.get('http://bslogic-001-site1.ctempurl.com/ShowHideElement.asmx/VisibleElement').then(function (response) {
            $http.get('/ShowHideElement.asmx/VisibleElement').then(function (response) {

                $scope.refreshed = response.data;

                for (var i = 0; i < $scope.refreshed.length; i++) {
                    if ($scope.refreshed[i].Name === "Snapchat") {
                        $scope.disableSnapchat = $scope.refreshed[i].Hidden;
                        $scope.icon.snapchat = !$scope.refreshed[i].Hidden;
                    }
                    else if ($scope.refreshed[i].Name === "Instagram") {
                        $scope.disableInstagram = $scope.refreshed[i].Hidden;
                        $scope.icon.instagram = !$scope.refreshed[i].Hidden;
                    }
                    else if ($scope.refreshed[i].Name === "Twitter") {
                        $scope.disableTwitter = $scope.refreshed[i].Hidden;
                        $scope.icon.twitter = !$scope.refreshed[i].Hidden;
                    }
                    else if ($scope.refreshed[i].Name === "Facebook") {
                        $scope.disableFacebook = $scope.refreshed[i].Hidden;
                        $scope.icon.facebook = !$scope.refreshed[i].Hidden;
                    }
                }
            });
        };

        //$http.post('http://bslogic-001-site1.ctempurl.com/CreationStage.asmx/GetTemplateID').then(function (response) {
        $http.post('/CreationStage.asmx/GetTemplateID').then(function (response) {

            $scope.storeID = response.data;
            if ($scope.storeID.TemplateID === 1) {
                $scope.MYtemplate = "/Templates/Template_1.html";
            }
            else if ($scope.storeID.TemplateID === 2) {
                $scope.MYtemplate = "/Templates/Template_2/Template_2.html";
            }
            else if ($scope.storeID.TemplateID === 3) {
                $scope.MYtemplate = "/Templates/Template_3/Template_3.html";
            }
            else if ($scope.storeID.TemplateID === 4) {
                $scope.MYtemplate = "/Templates/Template_4/Template_4.html";
            }
            else if ($scope.storeID.TemplateID === 5) {
                $scope.MYtemplate = "/Templates/Template_5/Template_5.html";
            }
            else if ($scope.storeID.TemplateID === 6) {
                $scope.MYtemplate = "/Templates/Template_6/Template_6.html";
            }
        },
            function (error) {
                $scope.error = error.data;
            });

        $scope.resulset = [];
        var StoreData = function () {

            //$http.post('http://bslogic-001-site1.ctempurl.com/TemplateData.asmx/StoreData').then(function (response) {
            $http.post('/TemplateData.asmx/StoreData').then(function (response) {
                $scope.resultset = response.data;
                //Store Info
                $scope.logo = $scope.resultset.Logo;
                $scope.StoreName = $scope.resultset.Name;
                $scope.desc = $scope.resultset.Description;
                //$scope.desc = $filter('newlines')($scope.desc);
                // $scope.desc = $scope.desc.replace(/\n/g, "<br />");
                //console.log($scope.desc);

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

                //Social Media Link
                if ($scope.resultset.SnapchatLink !== 'No Value') {
                    $scope.mySnapchatLink = $scope.resultset.SnapchatLink;
                    //       mySnapchat = $scope.resultset.SnapchatLink;
                }
                // else { mySnapchat = "No Link"; }

                if ($scope.resultset.TwitterLink !== 'No Value') {
                    $scope.myTwitterLink = $scope.resultset.TwitterLink;
                    //      myTwitter = $scope.resultset.TwitterLink;
                }
                //else { myTwitter = "No Link"; }

                if ($scope.resultset.FacebookLink !== 'No Value') {
                    $scope.myFacebookLink = $scope.resultset.FacebookLink;
                    //     myFacebook = $scope.resultset.FacebookLink;
                }
                //   else { myFacebook = "No Link"; }

                if ($scope.resultset.InstagramLink !== 'No Value') {
                    $scope.myInstagramLink = $scope.resultset.InstagramLink;
                    //  myInstagram = $scope.resultset.InstagramLink;
                }
                //  else { myInstagram = "No Link"; }

                $scope.TextType = [{ name: "اسم المتجر", value: $scope.StoreName },
                { name: "وصف المتجر", value: $scope.desc },
                { name: "رقم التواصل", value: $scope.Phone },
                { name: "العنوان", value: $scope.address },
                { name: "عنوان القائمة", value: $scope.MenuTitle }
                ];
                $scope.selectedTextType = $scope.TextType[0];
                $scope.ShopOwnerText = $scope.selectedTextType.value;

                //Menu
                $scope.MenuTitle = $scope.resultset.MenuTitle;

                ElementsData();

            }, function (error) {
                $scope.error = error;
            });
        };
        StoreData();

        ////////////Template Elements

        var ElementsData = function () {
            //$http.post('http://bslogic-001-site1.ctempurl.com/ShowHideElement.asmx/GetElementsInfo').then(function (response) {
            $http.post('/ShowHideElement.asmx/GetElementsInfo').then(function (response) {
                $scope.elementInfo = response.data;

                $scope.disableSnapchat = true;
                $scope.disableInstagram = true;
                $scope.disableTwitter = true;
                $scope.disableFacebook = true;

                for (var i = 0; i < $scope.elementInfo.length; i++) {
                    if ($scope.elementInfo[i].Name === "Snapchat") {
                        $scope.icon.snapchat = !$scope.elementInfo[i].Hidden;
                        validLinkService.valid("Snapchat").then(function (responseSnap) {
                            if (responseSnap === 'true')
                                $scope.disableSnapchat = false;
                            else if (responseSnap === 'false') {
                                $scope.disableSnapchat = true;
                                $scope.icon.snapchat = false;
                            }
                        });
                    }
                    else if ($scope.elementInfo[i].Name === "Facebook") {
                        $scope.icon.facebook = !$scope.elementInfo[i].Hidden;
                        validLinkService.valid("Facebook").then(function (response) {
                            if (response === 'true')
                                $scope.disableFacebook = false;
                            else if (response === 'false') {
                                $scope.disableFacebook = true;
                                $scope.icon.facebook = false;
                            }
                        });
                    }
                    else if ($scope.elementInfo[i].Name === "Twitter") {
                        $scope.icon.twitter = !$scope.elementInfo[i].Hidden;
                        validLinkService.valid("Twitter").then(function (response) {
                            if (response === 'true')
                                $scope.disableTwitter = false;
                            else if (response === 'false') {
                                $scope.disableTwitter = true;
                                $scope.icon.twitter = false;
                            }
                        });
                    }
                    else if ($scope.elementInfo[i].Name === "Instagram") {
                        $scope.icon.instagram = !$scope.elementInfo[i].Hidden;
                        validLinkService.valid("Instagram").then(function (response) {
                            if (response === 'true')
                                $scope.disableInstagram = false;
                            else if (response === 'false') {
                                $scope.disableInstagram = true;
                                $scope.icon.instagram = false;
                            }
                        });
                    }
                    else if ($scope.elementInfo[i].Name === "Slider") {
                        $scope.section.slider = !$scope.elementInfo[i].Hidden;
                    }
                    else if ($scope.elementInfo[i].Name === "About") {
                        $scope.section.about = !$scope.elementInfo[i].Hidden;
                        $scope.AboutContect = $scope.elementInfo[i].Value;
                        $scope.TextType.push({ name: "عن الموقع", value: $scope.elementInfo[i].Value });
                    }
                }

            }, function (error) {
                $scope.error = error;
            });
        };

        $scope.ShowHideSection = function (section) {
            var action = "";
            if (section === "Slider") {
                if ($scope.section.slider)
                    action = "Show";
                else action = "Hide";
            }
            else if (section === "About") {
                if ($scope.section.about)
                    action = "Show";
                else action = "Hide";
            }
            if (section !== "" && action !== "") {
                $http({
                    //url: "http://bslogic-001-site1.ctempurl.com/ShowHideElement.asmx/ShowHideSection",
                    url: "/ShowHideElement.asmx/ShowHideSection",
                    method: "get",
                    params: {
                        section: section,
                        action: action
                    }
                })
                    .then(function (response) {
                        $scope.sectionResult = response.data;
                        $scope.refreshIframe();
                    });
            }
        };

        $scope.ShowHideIcon = function (icon) {
            var action = "";
            if (icon === "Snapchat") {
                if ($scope.icon.snapchat)
                    action = "Show";
                else action = "Hide";
            }
            else if (icon === "Twitter") {
                if ($scope.icon.twitter)
                    action = "Show";
                else action = "Hide";
            }
            else if (icon === "Facebook") {
                if ($scope.icon.facebook)
                    action = "Show";
                else action = "Hide";
            }
            else if (icon === "Instagram") {
                if ($scope.icon.instagram)
                    action = "Show";
                else action = "Hide";
            }
            if (icon !== "" && action !== "") {
                $http({
                    //url: "http://bslogic-001-site1.ctempurl.com/ShowHideElement.asmx/ShowHideIcon",
                    url: "/ShowHideElement.asmx/ShowHideIcon",
                    method: "get",
                    params: {
                        icon: icon,
                        action: action
                    }
                })
                    .then(function (response) {
                        $scope.iconResult = response.data;
                        $scope.refreshIframe();

                    });
            }
        };

        $scope.updateText = function () {
            $scope.ShopOwnerText = $scope.selectedTextType.value;
        };
        $scope.UpdateStoreInfo = function () {
            $scope.loadingStoreInfo = true;
            if (typeof $scope.selectedTextType !== "undefined") {
                if ($scope.selectedTextType !== null || $scope.selectedTextType !== "") {
                    DataType = $scope.selectedTextType.name;
                    NewValue = $scope.ShopOwnerText;
                    $http({
                        //url: "http://bslogic-001-site1.ctempurl.com/TemplateData.asmx/UpdatStoreData",
                        url: "/TemplateData.asmx/UpdatStoreData",
                        method: "get",
                        params: {
                            DataType: DataType,
                            NewValue: NewValue
                        }
                    })
                        .then(function (response) {
                            $scope.selectedTextType.value = response.data.substr(1, response.data.length - 2);
                            $scope.ShopOwnerText = response.data.substr(1, response.data.length - 2);

                            //  $scope.ShopOwnerText = $filter('newlines')($scope.ShopOwnerText);
                            // $scope.selectedTextType.value = $filter('newlines')($scope.ShopOwnerText);

                            $scope.refreshIframe();

                            $scope.loadingStoreInfo = false;

                        }, function (error) {
                            $scope.error = error.data;
                        });

                }
            }

        };

        $scope.UpdateColors = function () {
            var post = $http({
                method: "POST",
                //url: "http://bslogic-001-site1.ctempurl.com/CreationStage.asmx/UpdateColors",
                url: "/CreationStage.asmx/UpdateColors",
                dataType: 'json',
                data: { color1: $scope.color1, color2: $scope.color2, color3: $scope.color3, color4: $scope.color4 },
                headers: { "Content-Type": "application/json" }
            });
            $scope.refreshIframe();
        };


        $scope.ChangeLogo = function (ev) {
            var confirm = $mdDialog.confirm()
                .title('Do you want to Change your store Colors also?')
                .textContent('The new colors will be taken from your new logo.')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('No');

            $mdDialog.show(confirm).then(function () {
                $http({
                    //url: "http://bslogic-001-site1.ctempurl.com/manageWebsiteColors.asmx/GetWebsiteColors",
                    url: "/manageWebsiteColors.asmx/GetWebsiteColors",
                    dataType: 'json',
                    method: "POST",
                    data: { path: $scope.imageSrc },
                    headers: { "Content-Type": "application/json; charset=utf-8" }
                })
                    .then(function (response) {
                    }, function (error) {
                        $scope.R = error.data;
                    });

                $http({
                    method: "POST",
                    //url: "http://bslogic-001-site1.ctempurl.com/CreationStage.asmx/UploadLogo",
                    url: "/CreationStage.asmx/UploadLogo",
                    dataType: 'json',
                    data: { logo: $scope.imageSrc },
                    headers: { "Content-Type": "application/json" }
                })
                    .then(function (response) { }, function (error) { });

                $scope.refreshIframe();
                myservice.refresh();
                $scope.imageSrc = "";
            }, function () {
                $http({
                    method: "POST",
                    //url: "http://bslogic-001-site1.ctempurl.com/CreationStage.asmx/UploadLogo",
                    url: "/CreationStage.asmx/UploadLogo",
                    dataType: 'json',
                    data: { logo: $scope.imageSrc },
                    headers: { "Content-Type": "application/json" }
                })
                    .then(function (response) { }, function (error) { });
                $scope.refreshIframe();
                $scope.imageSrc = "";
            });
        };

        //  sliderPath = $scope.imageSrc_slider;
        //  filePath = $scope.imageSrc;
        $scope.$on("fileProgress", function (e, progress) {
            $scope.progress = progress.loaded / progress.total;
        });

        $scope.UpdateSlider = function () {
            $scope.loadingCover = true;
            var post = $http({
                method: "POST",
                //url: "http://bslogic-001-site1.ctempurl.com/TemplateData.asmx/UploadSlider",
                url: "/TemplateData.asmx/UploadSlider",
                dataType: 'json',
                data: { slider: $scope.imageSrc_slider },
                headers: { "Content-Type": "application/json" }
            })
                .then(function (response) {
                }, function (error) { });

            $scope.refreshIframe();
            $scope.loadingCover = false;
            $scope.imageSrc_slider = "";
        };

        $scope.UpdateAboutImage = function () {
            $scope.loadingAboutImage = true;

            var post = $http({
                method: "POST",
                //url: "http://bslogic-001-site1.ctempurl.com/TemplateData.asmx/UploadAboutImage",
                url: "/TemplateData.asmx/UploadAboutImage",
                dataType: 'json',
                data: { image: $scope.imageSrc_about },
                headers: { "Content-Type": "application/json" }
            })
                .then(function (response) { }, function (error) { });

            $scope.refreshIframe();
            $scope.loadingAboutImage = false;
            $scope.imageSrc_about = "";
        };

        $scope.UpdateLinks = function () {
            $scope.loadingLinks = true;
            /*    var post = $http({
                    method: "POST",
                    url: "TemplateData.asmx/UpdateLinks",
                    dataType: 'json',
                    data: { snapchat_link: $scope.mySnapchatLink, twitter_link: $scope.myTwitterLink, facebook_link: $scope.myFacebookLink, instagram_link: $scope.myInstagramLink },
                    headers: { "Content-Type": "application/json" }
                });
                post.then(function (response) { }, function (error) { });
                */
            $http.post(
                //"http://bslogic-001-site1.ctempurl.com/TemplateData.asmx/UpdateLinks",
                "/TemplateData.asmx/UpdateLinks",
                $.param({
                    snapchat_link: $scope.mySnapchatLink,
                    twitter_link: $scope.myTwitterLink,
                    facebook_link: $scope.myFacebookLink,
                    instagram_link: $scope.myInstagramLink
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    }
                }
            )
                .then(function (response) {
                    $scope.result = response.data;

                    $scope.refreshIframe();
                    Links_service.refresh();

                    $scope.loadingLinks = false;

                }, function (error) {
                    $scope.error = error.data;
                });
        };
    })
    .controller("PreviewWebsiteController", function ($http, $scope) {
        $scope.DesktopView = true;
        $scope.MobileView = false;
        /*$scope.Previews = ["معاينة على الحاسب", "معاينة على الجوال"];
        $scope.template = "";
        $scope.selectedPreview = $scope.Previews[0];*/
        //$http.get('http://bslogic-001-site1.ctempurl.com/CreationStage.asmx/GetTemplateID').then(function (response) {
        $http.get('/CreationStage.asmx/GetTemplateID').then(function (response) {

            $scope.storeID = response.data;
            if ($scope.storeID.TemplateID === 1) {
                $scope.template = "/Templates/Template_1.html";
            }
            else if ($scope.storeID.TemplateID === 2) {
                $scope.template = "/Templates/Template_2/Template_2.html";
            }
            else if ($scope.storeID.TemplateID === 3) {
                $scope.template = "/Templates/Template_3/Template_3.html";
            }
            else if ($scope.storeID.TemplateID === 4) {
                $scope.template = "/Templates/Template_4/Template_4.html";
            }
            else if ($scope.storeID.TemplateID === 5) {
                $scope.template = "/Templates/Template_5/Template_5.html";
            }
            else if ($scope.storeID.TemplateID === 6) {
                $scope.template = "/Templates/Template_6/Template_6.html";
            }
        },
            function (error) {
                $scope.error = error.data;
            });
        $scope.Desktop = function () {
            $scope.DesktopView = true;
            $scope.MobileView = false;
        };
        $scope.Mobile = function () {
            $scope.DesktopView = false;
            $scope.MobileView = true;
        };
        $scope.selectedPreviewChanged = function () {
            if ($scope.selectedPreview === 'معاينة على الحاسب') {
                $scope.DesktopView = true;
                $scope.MobileView = false;
            }
            else {
                $scope.DesktopView = false;
                $scope.MobileView = true;
            }
        };
    })
    .controller("TemplateController", function ($scope, $http, $location, $rootScope) {
        $scope.tabHeader = "Template";
        /*    $scope.getImageUrl = function (index) {
                return "/images/T" + (index+1)+".png";
            };*/
        $scope.Logout = function () {
            $rootScope.Logout();
        };
        $scope.Template = function (Tid) {
            var post = $http({
                method: "POST",
                //url: "http://bslogic-001-site1.ctempurl.com/CreationStage.asmx/AddTemplate",
                url: "/CreationStage.asmx/AddTemplate",
                dataType: 'json',
                data: { id: Tid },
                headers: { "Content-Type": "application/json" }
            });
            post.then(function (response) { }, function (error) { });
            $location.path('/EDITandINFO/DevelopmentEnvironment');
        };
    })
    .controller("ProductsController", function ($rootScope, $scope, $http, $mdDialog) {
        $scope.tabHeader = "Products";
        $scope.displayCategoryTable = false;
        $scope.selectedCategory = "";
        $scope.editCategory = false;
        $scope.NoCategory = false;
        //logout
        $scope.Logout = function () {
            $rootScope.Logout();
        };
        //logout

        //to retrieve all categories
        $scope.getCat = function (newCategury) {
            $http({
                //url: "http://bslogic-001-site1.ctempurl.com/Products.asmx/GetAllCategories",
                url: "/Products.asmx/GetAllCategories",
                method: "get"
            })
                .then(function (response) {
                    $scope.categories = response.data;
                    if ($scope.categories.length != 0) {
                        if (newCategury == null || newCategury === 'undefined' || newCategury == "CurrentCategoryDeleted") {
                            $scope.selectedCategory = $scope.categories[0].Name;
                        }
                        else { $scope.selectedCategory = newCategury; }
                        $scope.selectedCategoryChanged();
                    }
                    else {
                        $scope.NoCategory = true;
                    }
                }, function () { });
        };
        //\to retrieve all categories

        // to add category 
        $scope.addNewCategory = function (newCategury) {
            $http({
                //url: "http://bslogic-001-site1.ctempurl.com/Products.asmx/AddNewCategory",
                url: "/Products.asmx/AddNewCategory",
                method: "get",
                params: { cat: newCategury }
            })
                .then(function (response) {
                    $scope.result = response.data;
                    $scope.getCat(newCategury);
                });
            $scope.newCategury = "";
            $scope.newCat = false;
            $scope.NoCategory = false;
        };
        //\to add category

        $scope.x = function () {
            $scope.editCategory = true;
        };

        //Delete Category
        $scope.DeleteCategory = function (ev) {
            var confirm = $mdDialog.confirm()
                .title(' هل تريد بالتأكيد حذف الفئة "' + $scope.selectedCategory + '" ؟')
                //  .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('نعم')
                .cancel('إلغاء');
            $mdDialog.show(confirm).then(function () {
                $http({
                    //url: "http://bslogic-001-site1.ctempurl.com/Products.asmx/DeleteCategory",
                    url: "/Products.asmx/DeleteCategory",
                    method: "GET",
                    params: { category: $scope.selectedCategory }
                })
                    .then(function (response) {
                        $scope.getCat("CurrentCategoryDeleted");
                    }, function (error) {
                        alert("failed delete");
                    });
            }, function () { });
        };
        //\DeleteCategory
        // change category Order
        $scope.ChangeOrder = function (cats) {
            var categories = "";
            for (var i = 0; i < cats.length; i++) {
                categories += cats[i].OrderInMenu + ",";
            }
            alert("change order");
            $http({
                //url: "http://bslogic-001-site1.ctempurl.com/Products.asmx/ChangeOrder",
                url: "/Products.asmx/ChangeOrder",
                method: "get",
                params: { categoriesOrders: categories }
            })
                .then(function (response) {
                    $scope.categories = response.data;
                    $scope.displayCategoryTable = false;
                }, function (error) {
                    alert(error.data);
                    $scope.resultoforder = error.data;
                });
        };
        //\change category Order

        //upload image for product
        $scope.uploadImage = function (fileReader) {
            filePath = $scope.imageSrc;
            $scope.$on("fileProgress", function (e, progress) {
                $scope.progress = progress.loaded / progress.total;
                alert($scope.progress);
            });
        };
        //\upload image for product

        //list all products for specific category
        $scope.selectedCategoryChanged = function () {
            if ($scope.selectedCategory != null) {
                $http({
                    //url: "http://bslogic-001-site1.ctempurl.com/Products.asmx/GetAllProducts",
                    url: "/Products.asmx/GetAllProducts",
                    method: "get",
                    params: { category: $scope.selectedCategory }
                })
                    .then(function (response) {
                        $scope.products = response.data;
                    }, function (error) { alert(error.data); });
            }
        };
        //\list all products for specific category

        // apply edit the product
        $scope.editProduct = function (index, product, ID, Image, Name, Description, Price, PAD, Amount, Discount) {
            $http({
                //url: "http://bslogic-001-site1.ctempurl.com/Products.asmx/EditProduct",
                url: "/Products.asmx/EditProduct",
                headers: { "Content-Type": "application/json;charset=utf-8" },
                dataType: 'json',
                method: 'post',
                data: JSON.stringify({ id: ID, cat: $scope.selectedCategory, image: Image, name: Name, des: Description, price: Price, PADs: PAD, amount: Amount, discount: Discount })
            }).then(function (response) {
                /*$scope.editP = response.data;
                $scope.products[index] = product;
                product.edit = false;*/
                $scope.editCategory = false;
                $scope.selectedCategoryChanged();
            }, function (error) {
                alert(error);
                alert("failed edit");
            });
        };
        //\apply edit the product

        //to add new row
        $scope.addNewProduct2 = function (product) {
            $http.post(
                //"http://bslogic-001-site1.ctempurl.com/Products.asmx/AddNewProduct",
                "/Products.asmx/AddNewProduct",
                $.param({
                    category: product.Category_ID,
                    image: product.Image,
                    name: product.Name,
                    des: product.Description,
                    price: product.Price,
                    amount: product.Amount,
                    discount: product.Discount
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    }
                })
                .then(function (response) {
                    product.Image = '';
                    product.Name = '';
                    product.Description = '';
                    product.Price = '';
                    product.Amount = '';
                    product.Discount = '';
                    $scope.selectedCategoryChanged();
                }, function (error) {
                    $scope.error = error.data;
                });
        };
        //\to add new row

        //to remove row
        $scope.removeproduct = function (product, productID, name, ev) {
            var confirm = $mdDialog.confirm()
                .title(' هل تريد بالتأكيد حذف المنتج " ' + name + '" ؟')
                //  .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('نعم')
                .cancel('إلغاء');
            $mdDialog.show(confirm).then(function () {
                $http({
                    //url: "http://bslogic-001-site1.ctempurl.com/Products.asmx/RemoveProduct",
                    url: "/Products.asmx/RemoveProduct",
                    method: "get",
                    params: { product_ID: productID }
                })
                    .then(function (response) {
                        $scope.Delete = response.data;
                        if ($scope.Delete == 'true') {
                            var remove = $scope.products.indexOf(product);
                            $scope.products.splice(remove, 1);
                        }
                        else {
                            msg = 'لاتستطيع حذف المنتج وذلك لوجود عمليات شراء لم تتم بعد. الرجاء اتمام العمليات قبل حذف المنتج';
                            var inform =
                                $mdDialog.alert()
                                    .textContent(msg)
                                    .targetEvent(ev)
                                    .ok('إغلاق');
                            $mdDialog.show(inform).then(function () { }, function () { });
                        }
                    }, function (error) { });
            }, function () { });
        };
        //\to remove row
    });

BS_App.factory('CategoryService', function ($http, $stateParams) {
    var GetAllCategories = function () {
        return $http({
            //url: "http://bslogic-001-site1.ctempurl.com/../Published_Stores.asmx/GetAllCategories",
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
            //"http://bslogic-001-site1.ctempurl.com//Published_Stores.asmx/GetAllProducts",
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
            //"http://bslogic-001-site1.ctempurl.com/Published_Stores.asmx/AddProductToOrder",
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

//to upload image
BS_App.directive("ngFileSelect", function (fileReader, $timeout, $rootScope) {
    return {
        scope: {
            ngModel: '='
        },
        link: function ($scope, el) {
            function getFile(file) {
                fileReader.readAsDataUrl(file, $scope)
                    .then(function (result) {
                        $timeout(function () {
                            $scope.ngModel = result;
                        });
                    });
            }

            el.bind("change", function (e) {

                var fileSize = this.files[0].size;
                var checkSize = fileSize > 1100000;

                $rootScope.BigImage = checkSize;

                var file = (e.srcElement || e.target).files[0];

                var allowed = ["jpeg", "png", "gif", "jpg"];
                var found = false;
                var fileType = this.files[0].type;
                allowed.forEach(function (extension) {

                    if (fileType === "image/" + extension) {
                        found = true;
                    }
                });
                $rootScope.NotImage = !found;
                getFile(file);
            });
        }
    };
});
//\to upload image

//costom servece
BS_App.factory("fileReader", function ($q, $log) {
    var onLoad = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.resolve(reader.result);
            });
        };
    };

    var onError = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.reject(reader.result);
            });
        };
    };

    var onProgress = function (reader, scope) {
        return function (event) {
            scope.$broadcast("fileProgress", {
                total: event.total,
                loaded: event.loaded
            });
        };
    };

    var getReader = function (deferred, scope) {
        var reader = new FileReader();
        reader.onload = onLoad(reader, deferred, scope);
        reader.onerror = onError(reader, deferred, scope);
        reader.onprogress = onProgress(reader, scope);
        return reader;
    };

    var readAsDataURL = function (file, scope) {
        var deferred = $q.defer();

        var reader = getReader(deferred, scope);
        reader.readAsDataURL(file);

        return deferred.promise;
    };

    return {
        readAsDataUrl: readAsDataURL
    };
});
//\costom servece

BS_App.filter('newlines', function () {
    return function (text) {
        if (text)
            return text.replace(/\n/g, '<br/>');
        return '';
    };
});

BS_App.filter('range', function () {
    return function (input, total) {
        total = parseInt(total);
        for (var i = 0; i < total; i++)
            input.push(i);
        return input;
    };
});

BS_App.factory('loginService', function ($http) {
    var login = function () {
        return $http.post('/RegisterLogin.asmx/CheckUser').then(function (msg) {
         /*   if (msg.data.includes("false"))
                return "false";
            else
                return "true";*/
           return msg.data;
        });
        /*$http({
        method: 'POST',
            url: '/RegisterLogin.asmx/CheckUser',
                dataType: 'json',
                    headers: { "Content-Type": "application/json; charset=utf-8" },
                                    data: JSON.stringify()

    })*/
    };
    return { login: login };
});

BS_App.factory('validLinkService', function ($http) {
    var valid = function (name) {
        return $http({
            url: "/ShowHideElement.asmx/ValidLink",
            method: "get",
            params: {
                name: name
            }
        })
            .then(function (response) {
                return response.data;
            });

    };
    return { valid: valid };
});

BS_App.directive('refreshable', [function () {
    return {
        restrict: 'A',
        scope: {
            refresh: "=refreshable"
        },
        link: function (scope, element, attr) {
            var refreshMe = function () {
                element.attr('src', element.attr('src'));
            };

            scope.$watch('refresh', function (newVal, oldVal) {
                if (scope.refresh) {
                    scope.refresh = false;
                    refreshMe();
                }
            });
        }
    };
}]);

BS_App.directive('customOnChange', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeFunc = scope.$eval(attrs.customOnChange);
            element.bind('change', onChangeFunc);
        }
    };
});

BS_App.directive('hcChart', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            options: '='
        },
        link: function (scope, element) {
            Highcharts.chart(element[0], scope.options);
        }
    };
});