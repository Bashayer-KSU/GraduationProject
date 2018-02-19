

var app = angular.module("CraetionStageEnglishDemo", ["ngRoute"])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/0", {
                templateUrl: "CreationStagePages/0.html",
                controller: "0Controller"
            })
            .when("/1", {
                templateUrl: "CreationStagePages/1.html",
                controller: "1Controller"
            })
            .when("/2", {
                templateUrl: "CreationStagePages/2.html",
                controller: "2Controller"
            })
            .when("/3.1", {
                templateUrl: "CreationStagePages/3.1.html",
                controller: "3.1Controller"
            })
            .when("/3.2", {
                templateUrl: "CreationStagePages/3.2.html",
                controller: "3.2Controller"
            })
            .when("/4.1", {
                templateUrl: "CreationStagePages/4.1.html",
                controller: "4.1Controller"
            })
            .when("/4.2", {
                templateUrl: "CreationStagePages/4.2.html",
                controller: "4.2Controller"
            })
            .when("/5", {
                templateUrl: "CreationStagePages/5.html",
                controller: "5Controller"
            })
            .when("/6", {
                templateUrl: "CreationStagePages/6.html",
                controller: "6Controller"
            })
            .when("/7", {
                templateUrl: "CreationStagePages/7.html",
                controller: "7Controller"
            })
            .when("/8", {
                templateUrl: "CreationStagePages/8.html",
                controller: "8Controller"
            })
            .when("/9", {
                templateUrl: "CreationStagePages/9.html",
                controller: "9Controller"
            })
            .when("/10", {
                templateUrl: "CreationStagePages/10.html",
                controller: "10Controller"
            })
            .otherwise({
                redirectTo: "/0"
            })
        $locationProvider.html5Mode(true);
    })
    .controller("0Controller", function ($scope) {
    })
<<<<<<< HEAD
<<<<<<< HEAD
    .controller("Controller1", function ($scope, $http) {
        var sName = $scope.storeName;
        $http({
            url: "CreationStage.asmx/AddStoreNametoDatabase",
            method: get,
            params: { StoreName:sName}
        }).then( function (error) {
            $scope.error = error.data;
});
=======
    .controller("1Controller", function ($scope) {
>>>>>>> b28ef28b322b4df2695f0df552ce3f87b5a763b7
=======
    .controller("1Controller", function ($scope) {
>>>>>>> b28ef28b322b4df2695f0df552ce3f87b5a763b7
    })
    .controller("2Controller", function ($scope) {
    })
    .controller("3.1Controller", function ($scope) {
    })
    .controller("3.2Controller", function ($scope) {
    })
    .controller("4.1Controller", function ($scope) {
    })
    .controller("4.2Controller", function ($scope, fileReader) {
        filePath = $scope.imageSrc;
        $scope.$on("fileProgress", function (e, progress) {
            $scope.progress = progress.loaded / progress.total;
        });
    })
    .controller("5Controller", function ($scope) {
    })
    .controller("6Controller", function ($scope) {
    })
    .controller("7Controller", function ($scope) {
    })
    .controller("8Controller", function ($scope) {
    })
    .controller("9Controller", function ($scope) {
    })
    .controller("10Controller", function ($scope) {
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