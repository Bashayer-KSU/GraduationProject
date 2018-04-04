﻿
var app = angular.module("BS", ["ngRoute", "ngMaterial", "ngSanitize"])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/ManageStore", {
                templateUrl: "BS-MenuTabs/ManageStoreEnglish.html",
                controller: "ManageStoreController"
            })
            .when("/DevelopmentEnvironment", {
                templateUrl: "BS-MenuTabs/DevelopmentEnvironmentEnglish.html",
                controller: "DevelopmentEnvironmentController"
            })
            .when("/PreviewWebsite", {
                templateUrl: "BS-MenuTabs/PreviewWebsiteEnglish.html",
                controller: "PreviewWebsiteController"
            })
            .when("/Template", {
                templateUrl: "BS-MenuTabs/TemplateEnglish.html",
                controller: "TemplateController"
            })
            .when("/Product", {
                templateUrl: "BS-MenuTabs/ProductsEnglish.html",
                controller: "ProductsController"
            })
            .otherwise({
                redirectTo: "/DevelopmentEnvironment"
            });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    .run(function ($rootScope, $location, loginService, $http, $mdDialog, $window) {

        // register listener to watch route changes
        $rootScope.$on("$routeChangeStart", function (event, next, current) {

            loginService.login().then(function (response) {
                $rootScope.login = response;
                //console.log("in $routeChangeStart " + $rootScope.login);
                if (response === "false") {
                    //redirect to login page
                    location.href = "/index.html";
                }
            });
        });
        $rootScope.Logout = function () {
            $http.get('/RegisterLogin.asmx/SignOut').then(function (response) {

                $rootScope.result = response.data;
                location.href = $rootScope.result.substr(1, $rootScope.result.length - 2);
            });
        };

        $rootScope.Arabic = function () {
            $window.location.href = "Basic.html";
        }

        $rootScope.DesktopView = function () {
            //$window.open('/Views/PreviewEnglish.html', '_blank');
            $window.open('/Views/Preview.html', '_blank');
        };

        $rootScope.Publish = function (ev) {
            $http.get('/Published_Stores.asmx/PublishRequest').then(function (response) {
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
                        $location.path('/ManageStore');
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
                            url: "Published_Stores.asmx/Publish",
                            params: { storeDomainName: StoreValues.Domain },
                            method: "get"
                        })
                        //  $rootScope.status = 'You decided to get rid of your debt.';
                    }, function () {
                        // $rootScope.status = 'You decided to keep your debt.';
                    });
                }
            });
        };

        $rootScope.UnPublish = function (ev) {
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
    .controller("ManageStoreController", function ($rootScope, $scope, $http) {
        $scope.Logout = function () {
            $rootScope.Logout();
        };

        $scope.tabHeader = "Manage Store";
        $scope.templatew = "";
        $scope.transactions = true;
        $scope.BestCategories = [];
        $scope.BestProducts = [];
        $scope.BestProduct = [];

        $scope.displayChart = false;

        $scope.BestProductsFunction = function () {
            angular.forEach($scope.BestCategories, function (value, key) {
                $http({
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
        }
        $scope.BestCategoriesFunction = function () {
            $http({
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
                url: "PaymentMethods.asmx/AcceptPaymentMethods",
                method: "get",
                params: { paypal: Paypal, bankTransfer: BankTransfer, cash: Cash }
            })
                .then(function (response) {
                    $scope.result = response.data;
                    if (response.data.paypal === true)
                        alert("paypal " + response.data.paypal);
                    if (response.data.bankTransfer === true)
                        alert("bankTransfer " + response.data.bankTransfer);
                    if (response.data.cash === true)
                        alert("cash " + response.data.cash);
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
                    url: "PaymentMethods.asmx/UpdatePayPalInfo",
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
                url: "PaymentMethods.asmx/GetPayPalInfo",
                method: "get",
                params: {}
            })
                .then(function (response) {
                    $scope.PayPalInfo = response.data;

                    //  $scope.PayPalButtonCode = $sce.trustAsHtml(response.data);
                    //  $scope.PayPalButtonCode2 = "<form><button type='submit'>test</button></form>";

                }, function (error) {
                    $scope.error = error.data;
                });
        };

        $scope.UpdateBankInfo = function () {
            var IBAN = $scope.bankInfo.IBAN;

            if (IBAN !== "" && IBAN !== null) {
                $http({
                    url: "PaymentMethods.asmx/UpdateBankInfo",
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
                url: "PaymentMethods.asmx/GetBankInfo",
                method: "get",
                params: {}
            })
                .then(function (response) {
                    if (!response.data.includes("No ShopOwnerBank")) {
                        $scope.bankInfo.IBAN = response.data;
                        $scope.bankInfo.IBAN = $scope.bankInfo.IBAN.substr(1, $scope.bankInfo.IBAN.length - 2);
                    }
                    else {
                        $scope.bankInfo.IBAN = "";
                    }

                }, function (error) {
                    $scope.error = error.data;
                });
        };


        $scope.GetAllTransactions = function () {
            $http({
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
                url: "BuyerOrder.asmx/UpdateStatus",
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

        $scope.resulset = [];
        var StoreData = function () {

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
                        $scope.TextType.push({ name: "About", value: $scope.elementInfo[i].Value })
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
                    url: "ShowHideElement.asmx/ShowHideSection",
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
                    url: "ShowHideElement.asmx/ShowHideIcon",
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
                        url: "TemplateData.asmx/UpdatStoreData",
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
                url: "CreationStage.asmx/UpdateColors",
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
                    url: "manageWebsiteColors.asmx/GetWebsiteColors",
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
                    url: "CreationStage.asmx/UploadLogo",
                    dataType: 'json',
                    data: { logo: $scope.imageSrc },
                    headers: { "Content-Type": "application/json" }
                })
                    .then(function (response) { }, function (error) { });

                $scope.refreshIframe();
                myservice.refresh();

            }, function () {
                $http({
                    method: "POST",
                    url: "CreationStage.asmx/UploadLogo",
                    dataType: 'json',
                    data: { logo: $scope.imageSrc },
                    headers: { "Content-Type": "application/json" }
                })
                    .then(function (response) { }, function (error) { });
                $scope.refreshIframe();
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
                url: "TemplateData.asmx/UploadSlider",
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
                url: "TemplateData.asmx/UploadAboutImage",
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
                "TemplateData.asmx/UpdateLinks",
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
                url: "CreationStage.asmx/AddTemplate",
                dataType: 'json',
                data: { id: Tid },
                headers: { "Content-Type": "application/json" }
            });
            post.then(function (response) { }, function (error) { });
            $location.path('/DevelopmentEnvironment');
        };
    })
    .controller("ProductsController", function ($rootScope, $scope, $http, $mdDialog) {
        $scope.tabHeader = "Products";
        $scope.displayCategoryTable = false;
        $scope.selectedCategory = "";
        $scope.editCategory = false;
        //logout
        $scope.Logout = function () {
            $rootScope.Logout();
        };
        //logout

        //to retrieve all categories
        $scope.getCat = function (newCategury) {
            $http({
                url: "Products.asmx/GetAllCategories",
                method: "get"
            })
                .then(function (response) {
                    $scope.categories = response.data;

                    if (newCategury == null || newCategury === 'undefined' || newCategury == "CurrentCategoryDeleted") {
                        if ($scope.categories[0].Name != null)
                            $scope.selectedCategory = $scope.categories[0].Name;
                        else $scope.selectedCategory = "";
                    }
                    else { $scope.selectedCategory = newCategury; }
                    $scope.selectedCategoryChanged();
                });
        };
        //\to retrieve all categories

        // to add category 
        $scope.addNewCategory = function (newCategury) {
            $http({
                url: "Products.asmx/AddNewCategory",
                method: "get",
                params: { cat: newCategury }
            })
                .then(function (response) {
                    $scope.result = response.data;
                    $scope.getCat(newCategury);
                });
            $scope.newCategury = "";
            $scope.newCat = false;
        };
        //\to add category

        $scope.x = function () {
            $scope.editCategory = true;
        }

        //Delete Category
        $scope.DeleteCategory = function () {
            $http({
                url: "Products.asmx/DeleteCategory",
                method: "GET",
                params: { category: $scope.selectedCategory }
            })
                .then(function (response) {
                    $scope.getCat("CurrentCategoryDeleted");
                }, function (error) {
                    alert("failed delete");
                });
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
                url: "Products.asmx/ChangeOrder",
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
            $http({
                url: "Products.asmx/GetAllProducts",
                method: "get",
                params: { category: $scope.selectedCategory }
            })
                .then(function (response) {
                    $scope.products = response.data;
                });
        };
        //\list all products for specific category

        // apply edit the product
        $scope.editProduct = function (index, product, ID, Image, Name, Description, Price, PAD, Amount, Discount) {
            $http({
                url: "Products.asmx/EditProduct",
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
        $scope.removeproduct = function (product, productID, ev, language) {
            $http({
                url: "Products.asmx/RemoveProduct",
                method: "get",
                params: { product_ID: productID }
            })
                .then(function (response) {
                    $scope.Delete = response.data;
                    alert($scope.Delete);
                    if ($scope.Delete == 'true') {
                        var remove = $scope.products.indexOf(product);
                        $scope.products.splice(remove, 1);
                    }
                    else {
                        var msg;
                        if (language !== 'eng') {
                            msg = 'You are not able to delete the product because there are purchases do not completed yet.Please complete the operations before deleting the product';
                        } else msg = 'لاتستطيع حذف المنتج وذلك لوجود عمليات شراء لم تتم بعد. الرجاء اتمام العمليات قبل حذف المنتج';
                        var inform =
                            $mdDialog.alert()
                                .textContent(msg)
                                .targetEvent(ev)
                                .ok('Close');
                        $mdDialog.show(inform).then(function () { }, function () { });
                    }
                }, function (error) { });
        };
        //\to remove row


    });

//to upload image
app.directive("ngFileSelect", function (fileReader, $timeout) {
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
                var file = (e.srcElement || e.target).files[0];
                getFile(file);
            });
        }
    };
});
//\to upload image
//costom servece
app.factory("fileReader", function ($q, $log) {
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
app.filter('newlines', function () {
    return function (text) {
        if (text)
            return text.replace(/\n/g, '<br/>');
        return '';
    };
});

app.filter('range', function () {
    return function (input, total) {
        total = parseInt(total);
        for (var i = 0; i < total; i++)
            input.push(i);
        return input;
    };
});

app.factory('loginService', function ($http) {
    var login = function () {
        return $http.post('/RegisterLogin.asmx/CheckUser').then(function (msg) {
            return msg.data;
        });
    };
    return { login: login };
});
app.factory('validLinkService', function ($http) {
    var valid = function (name) {
        return $http({
            url: "ShowHideElement.asmx/ValidLink",
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


app.directive('refreshable', [function () {
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

app.directive('customOnChange', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeFunc = scope.$eval(attrs.customOnChange);
            element.bind('change', onChangeFunc);
        }
    };
});

app.directive('hcChart', function () {
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