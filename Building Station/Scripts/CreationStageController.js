

var app = angular.module("CraetionStageApp", ["ngRoute"])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/0", {
                templateUrl: "CreationStagePages/welcome.html",
                controller: "0Controller"
            })
            .when("/1", {
                templateUrl: "CreationStagePages/store_name.html",
                controller: "NameController"
            })
            .when("/2", {
                templateUrl: "CreationStagePages/store_type.html",
                controller: "TypeController"
            })
            .when("/3.1", {
                templateUrl: "CreationStagePages/account_name_on_instagram.html",
                controller: "3.1Controller"
            })
            .when("/3.2", {
                templateUrl: "CreationStagePages/enter_store_info.html",
                controller: "InfoController"
            })
            .when("/4.1", {
                templateUrl: "CreationStagePages/account_location.html",
                controller: "4.1Controller"
            })
            .when("/4.2", {
                templateUrl: "CreationStagePages/upload_logo.html",
                controller: "UploadLogoController"
            })
            .when("/5", {
                templateUrl: "CreationStagePages/gather_info.html",
                controller: "5Controller"
            })
            .when("/6", {
                templateUrl: "CreationStagePages/select_your_account.html",
                controller: "6Controller"
            })
            .when("/7", {
                templateUrl: "CreationStagePages/display_account.html",
                controller: "DisplayAccountController"
            })
            .when("/8", {
                templateUrl: "CreationStagePages/display_picked_colors.html",
                controller: "ColorsController"
            })
            .when("/9", {
                templateUrl: "CreationStagePages/template_layout.html",
                controller: "TemplateController"
            })
            .when("/10", {
                templateUrl: "CreationStagePages/loading_template.html",
                controller: "10Controller"
            })
            .otherwise({
                redirectTo: "/0"
            });
        $locationProvider.html5Mode(true);
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
    .controller("0Controller", function ($scope, $rootScope, $window) {

        $rootScope.Arabic = function () {
            $window.location.href = '../CreationSatgeArabic.html';
        };

    })
    .controller("NameController", function ($scope, $rootScope, $http, $location, $window) {

        $rootScope.Arabic = function () {
            $window.location.href = '../CreationSatgeArabic.html';
        };

$http.get('CreationStage.asmx/StoreInfo').then(function (response) {

    $scope.Store = response.data;
    if ($scope.Store.Name !== ' No StoreName ') {
        $scope.storeName = $scope.Store.Name;
    }
});

$scope.sendName = function () {

    var post = $http({
        method: "POST",
        url: "CreationStage.asmx/AddStoreName",
        dataType: 'json',
        data: { name: $scope.storeName },
        headers: { "Content-Type": "application/json" }
    });
    post.then(function (response) { }, function (error) { });
    $location.path('/2');
};
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
    .controller("TypeController", function ($scope, $rootScope, $http, $window) {
        $rootScope.Arabic = function () {
            $window.location.href = '../CreationStageArabic.html';
        };
        $http.get('CreationStage.asmx/StoreInfo').then(function (response) {

            $scope.Store = response.data;
            if ($scope.Store.Type !== 'No StoreType ') {
                $scope.Type = $scope.Store.Type;
            }
        });
        $scope.sendType = function () {
            var post = $http({
                method: "POST",
                url: "CreationStage.asmx/AddStoreType",
                dataType: 'json',
                data: { type: $scope.Type, language: 'English' },
                headers: { "Content-Type": "application/json" }
            });
            post.then(function (response) { }, function (error) { $scope.R = error.data; });
        };
        $scope.Types = ["Beauty & skin care", "Handmade", "Accessories", "Sweets", "fashion", "Bakery", "Home cook", "Phone & laptop accessories"];
        $scope.complete = function (string) {
            var output = [];
            angular.forEach($scope.Types, function (Type) {
                if (Type.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                    output.push(Type);
                }
            });
            $scope.filterType = output;
        };
        $scope.fillTextbox = function (string) {
            $scope.Type = string;
            $scope.hidethis = true;
        };
        $scope.checkContent = function () {
            if ($scope.Type.length === 0 || typeof $scope.Type === 'undefined') {
                $scope.hidethis = true;
            } else {
                $scope.hidethis = false;
            }
        };
    })
    .controller("3.1Controller", function ($scope, $rootScope, $window) {
        $rootScope.Arabic = function () {
            $window.location.href = '../CreationStageArabic.html';
        };
    })
    .controller("InfoController", function ($scope, $http, $location, $rootScope, $window) {
        $rootScope.Arabic = function () {
            $window.location.href = '../CreationStageArabic.html';
        };

        var snapchat;
        var twitter;
        var facebook;
        var instagram;

        $http.get('CreationStage.asmx/StoreInfo').then(function (response) {

            $scope.Store = response.data;
            if ($scope.Store.Address !== 'No  Location ') {
                $scope.Address = $scope.Store.Address;
            }

            if ($scope.Store.SnapchatLink !== 'No Link') {
                $scope.snapchatLink = $scope.Store.SnapchatLink;
                snapchat = $scope.Store.SnapchatLink;
            }
            else { snapchat = "No Link"; }

            if ($scope.Store.TwitterLink !== 'No Link') {
                $scope.twitterLink = $scope.Store.TwitterLink;
                twitter = $scope.Store.TwitterLink;
            }
            else { twitter = "No Link"; }

            if ($scope.Store.FacebookLink !== 'No Link') {
                $scope.facebookLink = $scope.Store.FacebookLink;
                facebook = $scope.Store.FacebookLink;
            }
            else { facebook = "No Link"; }

            if ($scope.Store.InstagramLink !== 'No Link') {
                $scope.instagramLink = $scope.Store.InstagramLink;
                instagram = $scope.Store.InstagramLink;
            }
            else { instagram = "No Link"; }
        });

        $scope.checkContent_snapchat = function () {
            if ($scope.snapchatLink !== 0 || typeof $scope.snapchatLink !== 'undefined')
                snapchat = $scope.snapchatLink;
        };
        $scope.checkContent_twitter = function () {
            if ($scope.twitterLink !== 0 || typeof $scope.twitterLink !== 'undefined')
                twitter = $scope.twitterLink;
        };
        $scope.checkContent_facebook = function () {
            if ($scope.facebookLink !== 0 || typeof $scope.facebookLink !== 'undefined')
                facebook = $scope.facebookLink;
        };
        $scope.checkContent_instagram = function () {
            if ($scope.instagramLink !== 0 || typeof $scope.instagramLink !== 'undefined')
                instagram = $scope.instagramLink;
        };

        $scope.sendData = function () {
            var post = $http({
                method: "POST",
                url: "CreationStage.asmx/UpdateData",
                dataType: 'json',
                data: { address: $scope.Address, snapchat_link: snapchat, twitter_link: twitter, facebook_link: facebook, instagram_link: instagram },
                headers: { "Content-Type": "application/json" }
            });
            post.then(function (response) { }, function (error) { });
            $location.path('/4.2');
        };
    })
    .controller("4.1Controller", function ($scope, $rootScope, $window) {
        $rootScope.Arabic = function () {
            $window.location.href = '../CreationStageArabic.html';
        };
    })
    .controller("UploadLogoController", function ($scope, fileReader, $http, $rootScope, $window) {
        $rootScope.Arabic = function () {
            $window.location.href = '../CreationStageArabic.html';
        };
        filePath = $scope.imageSrc;
        $scope.$on("fileProgress", function (e, progress) {
            $scope.progress = progress.loaded / progress.total;
        });
        $scope.getColors = function () {
            //var File_Path = $scope.imageSrc;
            //    alert($scope.imageSrc);
            $http({
                url: "manageWebsiteColors.asmx/GetWebsiteColors",
                dataType: 'json',
                method: "POST",
                data: { path: $scope.imageSrc },
                headers: { "Content-Type": "application/json; charset=utf-8" }
            })
                .then(function (response) {
                    //       alert("success");
                    $scope.Colors = response.data;
                }, function (error) {
                    //      alert("failed");
                    $scope.R = error.data;
                    /*  $http({
                          url: "manageWebsiteColors.asmx/chooseColors",
                          method: "get"
                      })
                          .then(function (response) {
                              $scope.Colors = response.data;
                          });*/
                });
        };

        $scope.sendLogo = function () {
            var post = $http({
                method: "POST",
                url: "CreationStage.asmx/UploadLogo",
                dataType: 'json',
                data: { logo: $scope.imageSrc },
                headers: { "Content-Type": "application/json" }
            })
                .then(function (response) { }, function (error) { });
        };
    })
    .controller("5Controller", function ($scope, $rootScope, $window) {
        $rootScope.Arabic = function () {
            $window.location.href = '../CreationStageArabic.html';
        };
    })
    .controller("6Controller", function ($scope, $rootScope, $window) {
        $rootScope.Arabic = function () {
            $window.location.href = '../CreationStageArabic.html';
        };
    })
    .controller("DisplayAccountController", function ($scope, $http, $rootScope, $window) {
        $rootScope.Arabic = function () {
            $window.location.href = '../CreationStageArabic.html';
        };

        $http.get('CreationStage.asmx/StoreInfo').then(function (response) {

            $scope.Store = response.data;

            if ($scope.Store.SnapchatLink === 'No Link') {
                $scope.Svisible = false;
            }
            else { $scope.Svisible = true; }

            if ($scope.Store.TwitterLink === 'No Link') {
                $scope.Tvisible = false;
            }
            else {
                $scope.Tvisible = true;
            }

            if ($scope.Store.FacebookLink === 'No Link') {
                $scope.Fvisible = false;
            }
            else { $scope.Fvisible = true; }

            if ($scope.Store.InstagramLink === 'No Link') {
                $scope.Ivisible = false;
            }
            else { $scope.Ivisible = true; }

        });
    })
    .controller("ColorsController", function ($scope, $http, $rootScope, $window) {
        $rootScope.Arabic = function () {
            $window.location.href = '../CreationStageArabic.html';
        };
        $http.get('CreationStage.asmx/GetColors').then(function (response) {

            $scope.Colors = response.data;
        }, function (error) {
            $scope.error = error.data;
        });

        $scope.UpdateColors = function () {

            var post = $http({
                method: "POST",
                url: "CreationStage.asmx/UpdateColors",
                dataType: 'json',
                data: { color1: $scope.Colors.Color1, color2: $scope.Colors.Color2, color3: $scope.Colors.Color3, color4: $scope.Colors.Color4 },
                headers: { "Content-Type": "application/json" }
            });
        };
    })
    .controller("TemplateController", function ($scope, $http, $rootScope, $window) {
        $rootScope.Arabic = function () {
            $window.location.href = '../CreationStageArabic.html';
        };
        var TemplateID = 0;
        $scope.width1 = "15vw";
        $scope.width2 = "15vw";
        $scope.width3 = "15vw ";
        $scope.height1 = "26vw";
        $scope.height2 = "26vw";
        $scope.height3 = "26vw";


        $scope.firstTemplate = function () {
            $scope.width1 = "20vw";
            $scope.width2 = "15vw";
            $scope.width3 = "15vw ";
            $scope.height1 = "35vw";
            $scope.height2 = "26vw";
            $scope.height3 = "26vw";
            TemplateID = 4;
        };

        $scope.secondTemplate = function () {
            $scope.width2 = "20vw";
            $scope.width1 = "15vw";
            $scope.width3 = "15vw ";
            $scope.height2 = "35vw";
            $scope.height1 = "26vw";
            $scope.height3 = "26vw";
            TemplateID = 5;
        };
        $scope.thirdTemplate = function () {
            $scope.width3 = "20vw";
            $scope.width2 = "15vw";
            $scope.width1 = "15vw ";
            $scope.height3 = "35vw";
            $scope.height2 = "26vw";
            $scope.height1 = "26vw";
            TemplateID = 6;
        };

        $scope.goToTemplate = function () {
            if (TemplateID === 0) {
                alert("You have to select a layout");
            }
            else {
                var post = $http({
                    method: "POST",
                    url: "CreationStage.asmx/AddTemplate",
                    dataType: 'json',
                    data: { id: TemplateID },
                    headers: { "Content-Type": "application/json" }
                });

                $window.location.href = '/index.html';
            }
        };
    })
    .controller("10Controller", function ($scope, $rootScope, $window) {
        $rootScope.Arabic = function () {
            $window.location.href = '../CreationStageArabic.html';
        };
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
app.factory('loginService', function ($http) {
    var login = function () {
        return $http.post('/RegisterLogin.asmx/CheckUser').then(function (msg) {
            console.log(msg.data);
            return msg.data;
        });
    };
    return { login: login };
});