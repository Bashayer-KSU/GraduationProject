

var app = angular.module("CraetionStageArabicDemo", ["ngRoute"])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/0a", {
                templateUrl: "CreationStagePages/مرحبا.html",
                controller: "0aController"
            })
            .when("/1a", {
                templateUrl: "CreationStagePages/اسم_المتجر.html",
                controller: "1aController"
            })
            .when("/2a", {
                templateUrl: "CreationStagePages/نوع_المتجر.html",
                controller: "2aController"
            })
            .when("/3.1a", {
                templateUrl: "CreationStagePages/اسم_الحساب_على_انستقرام.html",
                controller: "3.1aController"
            })
            .when("/3.2a", {
                templateUrl: "CreationStagePages/معلومات_المتجر.html",
                controller: "3.2aController"
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
                    controller: "7aController"
            })
            .when("/8a", {
                templateUrl: "CreationStagePages/الألوان.html",
                controller: "8aController"
            })
            .when("/9a", {
                templateUrl: "CreationStagePages/تصميم_المتجر.html",
                controller: "9aController"
            })
            .when("/10a", {
                templateUrl: "CreationStagePages/جاري-تحميل_المنصة.html",
                controller: "10aController"
            })
            .otherwise({
                redirectTo: "/0a"
            })
        $locationProvider.html5Mode(true);
    })
    .controller("0aController", function ($scope) {
    })
    .controller("1aController", function ($scope) {
    })
    .controller("2aController", function ($scope) {
    })
    .controller("3.1aController", function ($scope) {
    })
    .controller("3.2aController", function ($scope) {
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
    .controller("7aController", function ($scope) {
    })
    .controller("8aController", function ($scope) {
    })
    .controller("9aController", function ($scope) {
    })
    .controller("10aController", function ($scope) {
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