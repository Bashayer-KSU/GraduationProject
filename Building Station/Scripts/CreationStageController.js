

var app = angular.module("CraetionStageApp", ["ngRoute"])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/0", {
                templateUrl: "CreationStage/welcome.html",
                controller: "0Controller"
            })
            .when("/1", {
                templateUrl: "CreationStage/store_name.html",
                controller: "NameController"
            })
            .when("/2", {
                templateUrl: "CreationStage/store_type.html",
                controller: "TypeController"
            })
            .when("/3.1", {
                templateUrl: "CreationStage/account_name_on_instagram.html",
                controller: "3.1Controller"
            })
            .when("/3.2", {
                templateUrl: "CreationStage/enter_store_info.html",
                controller: "3.2Controller"
            })
            .when("/4.1", {
                templateUrl: "CreationStage/account_location.html",
                controller: "4.1Controller"
            })
            .when("/4.2", {
                templateUrl: "CreationStage/upload_logo.html",
                controller: "4.2Controller"
            })
            .when("/5", {
                templateUrl: "CreationStage/gather_info.html",
                controller: "5Controller"
            })
            .when("/6", {
                templateUrl: "CreationStage/select_your_account.html",
                controller: "6Controller"
            })
            .when("/7", {
                templateUrl: "CreationStage/display_account.html",
                controller: "7Controller"
            })
            .when("/8", {
                templateUrl: "CreationStage/display_picked_colors.html",
                controller: "8Controller"
            })
            .when("/9", {
                templateUrl: "CreationStage/template_layout.html",
                controller: "9Controller"
            })
            .when("/10", {
                templateUrl: "CreationStage/loading_template.html",
                controller: "10Controller"
            })
            .otherwise({
                redirectTo: "/0"
            })
        $locationProvider.html5Mode(true);
    })
    .controller("0Controller", function ($scope) {
    })
    .controller("NameController", function ($scope, $http) {
        $scope.sendName = function () {
            var post = $http({
            method: "POST",
            url: "CreationStage.asmx/AddStoreName",
            dataType: 'json',
            data: { name: $scope.storeName },
            headers: { "Content-Type": "application/json" }
        });
        post.success(function (data, status) {
            $window.alert("store name is: " + data.storeName + " ");
        });

        post.error(function (data, status) {
            $window.alert(data.Message);
        });
        }
      /*  $http({
            url: "CreationStage.asmx/AddStoreName",
            params: { name: $scope.storeName },
            method: "get"
        })
            .then(function(error) {
                $scope.error = error.data;
            });*/
        /*
       $scope.sendName = function() {
            var url;
            var data;
                url = "CreationStage.asmx/AddStoreName";
                data = $.params({ name: $scope.storeName });
          
            var config = {
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};

            $http.get(url, data, config)
                .then(function (response) {$scope.result = response.data;
                },
                function (error) { $scope.error = error.data; });
        }*/
    })
    .controller("TypeController", function ($scope, $http) {
        $scope.sendType = function () {
            var post = $http({
                method: "POST",
                url: "CreationStage.asmx/AddStoreType",
                dataType: 'json',
                data: { type: $scope.Type, language: 'Engkish' },
                headers: { "Content-Type": "application/json" }
            });
            post.success(function (data, status) {
                $window.alert("store type is : " + data.Type + " ");
            });

            post.error(function (data, status) {
                $window.alert(data.Message);
            });
        }
        $scope.Types = ["Beauty & skin care", "Handmade", "Accessories", "Sweets", "fashion", "Bakery", "Home cook", "Phone & laptop accessories"];
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
    .controller("7Controller", function ($scope, $http) {
        $http.get('CreationStage.asmx/StoreInfo')
            .then(function (response) {
                $scope.store = response.data;
            });
    })
    .controller("8Controller", function ($scope, $http) {
        $http({
            url: "manageWebsiteColors.asmx/getWebsiteColors",
            method: "get",
            params: { path: filePath }
        })
            .then(function (response) {
                $scope.colors = response.data;
            }, function (error) {
                $scope.error = error.data;
            });
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