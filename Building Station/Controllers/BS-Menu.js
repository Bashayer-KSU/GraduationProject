
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
    .controller("ManageStoreController", function ($scope, $http) {
        $scope.tabHeader = "Manage Store";
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
                params: { IBAN: IBAN}
            })
                .then(function (response) {
                    $scope.bankInfo.IBAN = response.data;

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

                }, function (error) {
                    $scope.error = error.data;
                });
        };
    })
    .controller("DevelopmentEnvironmentController", function ($scope, $http) {
        $scope.tabHeader = "Development Environment";
    })
    .controller("PreviewWebsiteController", function ($scope, $http) {
        $scope.tabHeader = "Previe wWebsite";
    })
    .controller("TemplateController", function ($scope, $http) {
        $scope.tabHeader = "Template";
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
                alert(error);
                alert("edit function");
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
                alert(error);
                alert("add function");
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
                }, function (error) {
                    alert(error);
                });
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