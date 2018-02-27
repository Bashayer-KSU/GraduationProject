

var app = angular.module("CraetionStageArabicDemo", ["ngRoute"])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/0a", {
                templateUrl: "CreationStagePages/مرحبا.html",
                controller: "0aController"
            })
            .when("/1a", {
                templateUrl: "CreationStagePages/store_name_arabic.html",
                controller: "Name_Controller"
            })
            .when("/2a", {
                templateUrl: "CreationStagePages/store_type_arabic.html",
                controller: "Type_Controller"
            })
            .when("/3.1a", {
                templateUrl: "CreationStagePages/اسم_الحساب_على_انستقرام.html",
                controller: "3.1aController"
            })
            .when("/3.2a", {
                templateUrl: "CreationStagePages/معلومات_المتجر.html",
                controller: "InfoController"
            })
            .when("/4.1a", {
                templateUrl: "CreationStagePages/موقع_الحساب.html",
                controller: "4.1aController"
            })
            .when("/4.2a", {
                templateUrl: "CreationStagePages/ارفع_الشعار.html",
                controller: "4.2aController"
            })
            .when("/5a", {
                templateUrl: "CreationStagePages/جمع_المعلومات.html",
                controller: "5aController"
            })
            .when("/6a", {
                templateUrl: "CreationStagePages/اختيار_الحساب.html",
                controller: "6aController"
            })
            .when("/7a", {
                templateUrl: "CreationStagePages/عرض_الحساب.html",
                controller: "DisplayAccountController"
            })
            .when("/8a", {
                templateUrl: "CreationStagePages/الألوان.html",
                controller: "ColorsController"
            })
            .when("/9a", {
                templateUrl: "CreationStagePages/تصميم_المتجر.html",
                controller: "TemplateController"
            })
            .when("/10a", {
                templateUrl: "CreationStagePages/جاري-تحميل_المنصة.html",
                controller: "LoadController"
            })
            .otherwise({
                redirectTo: "/0a"
            })
        $locationProvider.html5Mode(true);
    })
    .controller("0aController", function ($scope) {
    })
    .controller("Name_Controller", function ($scope, $http) {

        $scope.sendName = function () {
            var post = $http({
                method: "POST",
                url: "CreationStage.asmx/AddStoreName",
                dataType: 'json',
                data: { name: $scope.storeName },
                headers: { "Content-Type": "application/json" }
            });
        }

    })
    .controller("Type_Controller", function ($scope, $http) {
        $scope.sendType = function () {
            var post = $http({
                method: "POST",
                url: "CreationStage.asmx/AddStoreType",
                dataType: 'json',
                data: { type: $scope.Type, language: 'Arabic' },
                headers: { "Content-Type": "application/json" }
            });
        }
        $scope.Types = ["مكياج وعناية", "أشغال يدوية", "اكسسوارات", "حلويات", "موضة وملابس", "مخبز", "طبخ منزلي", "اكسسوارات جوال ولابتوب"];
        $scope.complete = function (string) {
            var output = [];
            angular.forEach($scope.Types, function (Type) {
                if (Type.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                    output.push(Type);
                }
            });
            $scope.filterType = output;
        }
        $scope.fillTextbox = function (string) {
            $scope.Type = string;
            $scope.hidethis = true;
        }

    })
    .controller("3.1aController", function ($scope) {
    })
    .controller("InfoController", function ($scope) {

        $scope.Links = [{ id: 'Link1' }, { id: 'Link2' }];
        $scope.addNewLink = function () {
            var newItemNo = $scope.Links.length + 1;
            $scope.Links.push({ 'id': 'Link' + newItemNo });
        };
    })
    .controller("4.1aController", function ($scope) {
    })
    .controller("4.2aController", function ($scope, fileReader) {
        filePath = $scope.imageSrc;
        $scope.$on("fileProgress", function (e, progress) {
            $scope.progress = progress.loaded / progress.total;
        });
    })
    .controller("5aController", function ($scope) {
    })
    .controller("6aController", function ($scope) {
    })
    .controller("DisplayAccountController", function ($scope, $http) {

        $http.get('CreationStage.asmx/StoreInfo').then(function (response) {

            $scope.Store = response.data;
        });
    })
    .controller("ColorsController", function ($scope, $http) {

        $http.get('CreationStage.asmx/getColors').then(function (response) {

            $scope.Colors = response.data;
        });

    })
    .controller("TemplateController", function ($scope, $http) {

        var TemplateID;

        $scope.firstTemplate = function () {

            TemplateID = 1;
        }

        $scope.secondTemplate = function () {

            TemplateID = 2;
        }
        $scope.thirdTemplate = function () {

            TemplateID = 3;
        }

        $scope.goToTemplate = function () {

            $window.location.href = '/Template_1_product.html';

        }

        $scope.sendTemplateID = function () {
            var post = $http({
                method: "POST",
                url: "CreationStage.asmx/AddTemplate",
                dataType: 'json',
                data: { id: $scope.TemplateID },
                headers: { "Content-Type": "application/json" }
            });
        }
        })
    .controller("LoadController", function ($scope) {


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
                            $scope.pp = result;

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
//costom servece related to upload image
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