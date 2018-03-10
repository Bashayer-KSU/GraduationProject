
var app = angular.module("BS", ["ngRoute"])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/ManageStore", {
                templateUrl: "BS-MenuTabs/ManageStore.html",
                controller: "ManageStoreController"
            })
            .when("/DevelopmentEnvironment", {
                templateUrl: "BS-MenuTabs/DevelopmentEnvironment.html",
                controller: "DevelopmentEnvironmentController"
            })
            .when("/PreviewWebsite", {
                templateUrl: "BS-MenuTabs/PreviewWebsite.html",
                controller: "PreviewWebsiteController"
            })
            .when("/Template", {
                templateUrl: "BS-MenuTabs/Template.html",
                controller: "TemplateController"
            })
            .when("/Products", {
                templateUrl: "BS-MenuTabs/Products.html",
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
    .run(function ($rootScope, $location, loginService) {

        // register listener to watch route changes
        $rootScope.$on("$routeChangeStart", function (event, next, current) {

            $rootScope.loggin = function () {
                return loginService.login();
            };
            loginService.login().then(function (response) {
                $rootScope.login = response;
                console.log("in then " + $rootScope.login);
                if (response === "false") {
                    //redirect to login page
                    location.href = "/RegisterLogin.html";
                }
            });
        });
    })
    .controller("ManageStoreController", function ($scope, $http, loginService) {
        $scope.tabHeader = "Manage Store";
        $scope.templatew = "";

        /*
        loginService.login().then(function (response) {
            $scope.login = response;
            console.log("in then " + $scope.login);
            if (response === "false") {
                //redirect to login page
                location.href = "/RegisterLogin.html";
            }
        });*/

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

        $scope.UpdateBankInfo = function () {
            var IBAN = $scope.bankInfo.IBAN;
            /*
            $http({
                url: "PaymentMethods.asmx/UpdateBankInfo",
                dataType: 'json',
                method: 'POST',
                data: { IBAN: IBAN },
                headers: { "Content-Type": "application/json; charset=utf-8" }
            }).then(function (response) {
                $scope.IBAN = response.data;
                }, function (error) {
                    $scope.error = error;
            });*/
            $http({
                url: "PaymentMethods.asmx/UbdateBankInfo",
                method: "get",
                params: { IBAN: IBAN }
            })
                .then(function (response) {
                    $scope.bankInfo.IBAN = response.data;
                    $scope.bankInfo.IBAN = $scope.bankInfo.IBAN.substr(1, $scope.bankInfo.IBAN.length - 2);

                }, function (error) {
                    $scope.error = error.data;
                });
        };

        $scope.bankInfo = {
            IBAN: ""
        };

        $scope.GetBankInfo = function () {
            /*
            $http({
                url: "PaymentMethods.asmx/GetBankInfo",
                dataType: 'json',
                method: 'POST',
                data: {},
                headers: { "Content-Type": "application/json; charset=utf-8" }
            }).then(function (response) {
                $scope.bankInfo.IBAN = response.data;
            }, function (error) {
                alert(error);
            });*/
            $http({
                url: "PaymentMethods.asmx/GetBankInfo",
                method: "get",
                params: {}
            })
                .then(function (response) {
                    $scope.bankInfo.IBAN = response.data;
                    $scope.bankInfo.IBAN = $scope.bankInfo.IBAN.substr(1, $scope.bankInfo.IBAN.length - 2);


                }, function (error) {
                    $scope.error = error.data;
                });
        };
    })
    .controller("DevelopmentEnvironmentController", function ($scope, $http, $filter) {
        $scope.tabHeader = "Development Environment";
        $scope.tab = {};
        $scope.refreshIframe = function () {
            $scope.tab.refresh = true;
        };

        var mySnapchat;
        var myTwitter;
        var myFacebook;
        var myInstagram;

        $http.get('/CreationStage.asmx/GetTemplateID').then(function (response) {

            $scope.storeID = response.data;
            if ($scope.storeID.TemplateID === 1) {
                $scope.template = "/Templates/Template_1/Template_1.html";
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
                console.log($scope.resultset);

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
                if ($scope.resultset.SnapchatLink.toLowerCase().includes("snapchat")) {
                    $scope.mySnapchatLink = $scope.resultset.SnapchatLink;
                    mySnapchat = $scope.resultset.SnapchatLink;
                }
                else { mySnapchat = "No Link"; }

                if ($scope.resultset.TwitterLink.toLowerCase().includes("twitter")) {
                    $scope.myTwitterLink = $scope.resultset.TwitterLink;
                    myTwitter = $scope.resultset.TwitterLink;
                }
                else { myTwitter = "No Link"; }

                if ($scope.resultset.FacebookLink.toLowerCase().includes("facebook")) {
                    $scope.myFacebookLink = $scope.resultset.FacebookLink;
                    myFacebook = $scope.resultset.FacebookLink;
                }
                else { myFacebook = "No Link"; }

                if ($scope.resultset.InstagramLink.toLowerCase().includes("instagram")) {
                    $scope.myInstagramLink = $scope.resultset.InstagramLink;
                    myInstagram = $scope.resultset.InstagramLink;
                }
                else { myInstagram = "No Link"; }

                //$scope.Facebook = $scope.resultset.FacebookLink.toLowerCase().includes("facebook");
                //$scope.FacebookLink = $scope.resultset.FacebookLink;
              //  $scope.Instagram = $scope.resultset.InstagramLink.toLowerCase().includes("instagram");
               // $scope.InstagramLink = $scope.resultset.InstagramLink;
               // $scope.Snapchat = $scope.resultset.SnapchatLink.toLowerCase().includes("snapchat");
              //  $scope.SnapchatLink = $scope.resultset.SnapchatLink;
              //  $scope.Twitter = $scope.resultset.TwitterLink.toLowerCase().includes("twitter");
               // $scope.TwitterLink = $scope.resultset.TwitterLink;
                $scope.TextType = [{ name: "Store Name", value: $scope.StoreName },
                    { name: "Store Description", value: $scope.desc },
                    { name: "Email", value: $scope.Email },
                    { name: "Phone", value: $scope.Phone },
                    { name: "Address", value: $scope.address }
                ];
                $scope.selectedTextType = $scope.TextType[0];
                $scope.ShopOwnerText = $scope.selectedTextType.value;


                //Menu
                $scope.MenuTitle = $scope.resultset.MenuTitle;
            }, function (error) {
                $scope.error = error;
            });
        };
        StoreData();

        $scope.updateText = function () {
            $scope.ShopOwnerText = $scope.selectedTextType.value;
        };
        $scope.UpdateStoreInfo = function () {
            console.log('hey, myVar has changed!');
            console.log($scope.selectedTextType.value);

            if (typeof $scope.selectedTextType !== "undefined") {
                if ($scope.selectedTextType !== null || $scope.selectedTextType !== "") {
                    DataType = $scope.selectedTextType.name;                    
                    NewValue = $scope.ShopOwnerText;

                    console.log(DataType);
                    console.log(NewValue);

                    
                    $http({
                        url: "TemplateData.asmx/UpdatStoreData",
                        method: "get",
                        params: {
                            DataType: DataType,
                            NewValue: NewValue
                        }
                    })
                        .then(function (response) {
                            console.log(response);
                            $scope.selectedTextType.value = response.data.substr(1, response.data.length - 2);
                            $scope.ShopOwnerText = response.data.substr(1, response.data.length - 2);
                          //  $scope.ShopOwnerText = $filter('newlines')($scope.ShopOwnerText);
                           // $scope.selectedTextType.value = $filter('newlines')($scope.ShopOwnerText);

                            $scope.refreshIframe();

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

        sliderPath = $scope.imageSrc_slider;
        filePath = $scope.imageSrc;
        $scope.$on("fileProgress", function (e, progress) {
            $scope.progress = progress.loaded / progress.total;
        });
        $scope.getColors = function () {
            $http({
                url: "manageWebsiteColors.asmx/GetWebsiteColors",
                dataType: 'json',
                method: "POST",
                data: { path: $scope.imageSrc },
                headers: { "Content-Type": "application/json; charset=utf-8" }
            })
                .then(function (response) {
                    $scope.Colors = response.data;
                }, function (error) {
                    $scope.R = error.data;
                });
        //    $scope.refreshIframe();            
        };

        $scope.UpdateLogo = function () {
            var post = $http({
                method: "POST",
                url: "CreationStage.asmx/UploadLogo",
                dataType: 'json',
                data: { logo: $scope.imageSrc },
                headers: { "Content-Type": "application/json" }
            })
                .then(function (response) { }, function (error) { });

            $scope.refreshIframe();
            $scope.tab.myColors = true;
        };

        $scope.UpdateSlider = function () {
            var post = $http({
                method: "POST",
                url: "TemplateData.asmx/UploadSlider",
                dataType: 'json',
                data: { slider: $scope.imageSrc_slider },
                headers: { "Content-Type": "application/json" }
            })
                .then(function (response) { }, function (error) { });

            $scope.refreshIframe();
        };

        $scope.checkContent_snapchat = function () {
            if ($scope.mySnapchatLink !== 0 || typeof $scope.mySnapchatLink !== 'undefined')
                mySnapchat = $scope.mySnapchatLink;
        };
        $scope.checkContent_twitter = function () {
            if ($scope.myTwitterLink !== 0 || typeof $scope.myTwitterLink !== 'undefined')
                myTwitter = $scope.myTwitterLink;
        };
        $scope.checkContent_facebook = function () {
            if ($scope.myFacebookLink !== 0 || typeof $scope.myFacebookLink !== 'undefined')
                myFacebook = $scope.myFacebookLink;
        };
        $scope.checkContent_instagram = function () {
            if ($scope.myInstagramLink !== 0 || typeof $scope.myInstagramLink !== 'undefined')
                myInstagram = $scope.myInstagramLink;
        };

        $scope.UpdateLinks = function () {
            var post = $http({
                method: "POST",
                url: "TemplateData.asmx/UpdateLinks",
                dataType: 'json',
                data: { snapchat_link: mySnapchat, twitter_link: myTwitter, facebook_link: myFacebook, instagram_link: myInstagram },
                headers: { "Content-Type": "application/json" }
            });
            post.then(function (response) { }, function (error) { });

            $scope.refreshIframe();
        };
    })
    .controller("PreviewWebsiteController", function ($scope, $http) {
        $scope.tabHeader = "Previe wWebsite";
    })
    .controller("TemplateController", function ($scope, $http) {
        $scope.tabHeader = "Template";
    /*    $scope.getImageUrl = function (index) {
            return "/images/T" + (index+1)+".png";
        };*/

        $scope.Template = function (Tid) {
            var post = $http({
                method: "POST",
                url: "CreationStage.asmx/AddTemplate",
                dataType: 'json',
                data: { id: Tid },
                headers: { "Content-Type": "application/json" }
            });
        };


    })
    .controller("ProductsController", function ($scope, $http) {
        $scope.tabHeader = "Products";
        //to retrieve all categories
        $scope.getCat = function () {
            $http({
                url: "Products.asmx/GetAllCategories",
                method: "get"/*,
                params: { ShopEmail: 'lamia@gmail.com' }*/
            })
                .then(function (response) {
                    $scope.categories = response.data;
                });
        };
        //\to retrieve all categories

        // to add category 
        $scope.addNewCategory = function (newCategury) {
            $http({
                url: "Products.asmx/AddNewCategory",
                method: "get",
                params: { cat: newCategury/*, ShopEmail: 'lamia@gmail.com'*/ }
            })
                .then(function (response) {
                    $scope.result = response.data;
                    $scope.getCat();
                });
            $scope.newCategury = "";
            $scope.newCat = false;
        };
        //\to add category

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
            /*$scope.products = [
                { image: 'pic.png', name: 'banana', description: 'jsbd', price: 50, amount: true, discount: 0, edit: false },
                { image: 'pic.png', name: 'lamia', description: 'mjghb', price: 60, amount: false, discount: 0, edit: false },
                { image: 'pic.png', name: 'nada', description: 'mjbhjm', price: 70, amount: false, discount: 0, edit: false },
                { image: 'pic.png', name: 'buthainah', description: 'mjhk', price: 80, amount: true, discount: 0, edit: false },
                { image: 'pic.png', name: 'khalid', description: ',ihgjc', price: 90, amount: false, discount: 0, edit: false }
            ];*/
            
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
        $scope.editProduct = function (index, product) {
            var Product1 = new Object();
            Product1.ID = product.ID;
            Product1.image = product.Image;
            Product1.name = product.Name;
            Product1.description = product.Description;
            Product1.price = product.Price;
            Product1.amount = product.Amount;
            Product1.discount = product.Discount;
            Product1.Category_ID = product.Category_ID;
            Product1.Store_ID = product.Store_ID;
            $http({
                url: "Products.asmx/EditProduct",
                dataType: 'json',
                method: 'POST',
                data: { pro: Product1 },
                headers: { "Content-Type": "application/json; charset=utf-8" }
            }).then(function (response) {
                $scope.result = response.data;
                $scope.products[index] = product;
                product.edit = false;
            }, function (error) {
                /////////////////////
                $scope.products[index] = product;
                product.edit = false;
                /////////////////////
            });
        };
        //\apply edit the product

        //to add new row
        $scope.addNewProduct = function (product) {
            var Product1 = new Object();
            Product1.image = product.Image;
            Product1.name = product.Name;
            Product1.description = product.Description;
            Product1.price = product.Price;
            Product1.amount = product.Amount;
            Product1.discount = product.Discount;
            Product1.Category_ID = product.Category_ID;
            $http({
                url: "Products.asmx/AddNewProduct",
                dataType: 'json',
                method: 'POST',
                data: { pro: Product1 },
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).then(function (response) {
                $scope.addProduct = response.data;
                $scope.products.push({ 'image': addProduct.Image, 'name': addProduct.Name, 'description': addProduct.Description, 'price': addProduct.Price, 'amount': addProduct.Amount, 'discount': addProduct.Discount });
                product.Image = '';
                product.Name = '';
                product.Description = '';
                product.Price = '';
                product.Amount = '';
                product.Discount = '';
            }, function (error) {
                ///////////////////////////
                product.Image = '';
                product.Name = '';
                product.Description = '';
                product.Price = '';
                product.Amount = '';
                product.Discount = '';
                $scope.selectedCategoryChanged();
                //////////////////////////
            });
        };
        //\to add new row

        //to remove row
        $scope.removeproduct = function (product, productID) {
            $http({
                url: "Products.asmx/RemoveProduct",
                method: "get",
                params: { product_ID: productID }
            })
                .then(function (response) {
                    $scope.result = response.data;
                    var remove = $scope.products.indexOf(product);
                    $scope.products.splice(remove, 1);
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
            console.log(msg.data);
            return msg.data;
        });
    };
    return { login: login };
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