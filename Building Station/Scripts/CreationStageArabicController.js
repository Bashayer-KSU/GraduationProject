

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
                controller: "InstaNameController"
            })
            .when("/3.2a", {
                templateUrl: "CreationStagePages/معلومات_المتجر.html",
                controller: "InfoController"
            })
            .when("/4.1a", {
                templateUrl: "CreationStagePages/موقع_الحساب.html",
                controller: "InstaLocationController"
            })
            .when("/4.2a", {
                templateUrl: "CreationStagePages/ارفع_الشعار.html",
                controller: "UploadLogoController"
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
    .controller("Name_Controller", function ($scope, $http, $location) {

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
                $location.path('/2a');        }

      /*   if ($scope.Name.length !== 0 || typeof $scope.Name !== 'undefined') {
            $scope.$invalid = false;
        }
       else {
           $scope.usable = true;
}
        $scope.checkEmpty = function () {
            if ($scope.Name.length === 0 || typeof $scope.Name === 'undefined') {
                $scope.usable = false;
            } else {
                $scope.usable = true;
            }
        } */
    })
    .controller("Type_Controller", function ($scope, $http) {
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
                data: { type: $scope.Type, language: 'Arabic' },
                headers: { "Content-Type": "application/json" }
            });
            post.then(function (response) { }, function (error) { $scope.R = error.data; });
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
        $scope.checkContent = function () {
            if ($scope.Type.length === 0 || typeof $scope.Type === 'undefined') {
                $scope.hidethis = true;
            } else {
                $scope.hidethis = false;
            }
        } 
    })
    .controller("InstaNameController", function ($scope) {
    })
    .controller("InfoController", function ($scope, $http, $location) {

        $http.get('CreationStage.asmx/StoreInfo').then(function (response) {

            $scope.Store = response.data;
            if ($scope.Store.Address !== 'No  Location ') {
                $scope.Address = $scope.Store.Address;
            }
        });
        var snapchat = "No Link";
        var twitter = "No Link";
        var facebook = "No Link";
        var instagram = "No Link";

        $scope.checkContent_snapchat = function () {
            if ($scope.snapchatLink !== 0 || typeof $scope.snapchatLink !== 'undefined')
            snapchat = $scope.snapchatLink;
        }
        $scope.checkContent_twitter = function () {
            if ($scope.twitterLink !== 0 || typeof $scope.twitterLink !== 'undefined')
                twitter = $scope.twitterLink;
        }
        $scope.checkContent_facebook = function () {
            if ($scope.facebookLink !== 0 || typeof $scope.facebookLink !== 'undefined')
                facebook = $scope.facebookLink;
        }
        $scope.checkContent_instagram = function () {
            if ($scope.instagramLink !== 0 || typeof $scope.instagramLink !== 'undefined')
            instagram = $scope.instagramLink;
        }

        $scope.sendData = function () {
            var post = $http({
                method: "POST",
                url: "CreationStage.asmx/UpdateData",
                dataType: 'json',
                data: { address: $scope.Address, snapchat_link: snapchat, twitter_link: twitter, facebook_link: facebook, instagram_link: instagram },
                headers: { "Content-Type": "application/json" }
            });
            post.then(function (response) { }, function (error) { });
            $location.path('/4.2a');
        }
     /*   $scope.Links = [{ id: 'Link1' }, { id: 'Link2' }];
        $scope.addNewLink = function () {
            var newItemNo = $scope.Links.length + 1;
            $scope.Links.push({ 'id': 'Link' + newItemNo });
        };*/
    })
    .controller("InstaLocationController", function ($scope) {
    })
    .controller("UploadLogoController", function ($scope, fileReader, $http) {
        
        filePath = $scope.imageSrc;
        $scope.$on("fileProgress", function (e, progress) {
            $scope.progress = progress.loaded / progress.total;
        });
        $scope.showColors = function () {
            var File_Path = $scope.imageSrc;
            var post = $http({
                method: "POST",
                url: "manageWebsiteColors.asmx/GetWebsiteColors",
                dataType: 'json',
                data: { path: File_Path },
                headers: { "Content-Type": "application/json" }
            })
        .then(function (response) {
                $scope.Colors = response.data;
            }, function (error) {
                $scope.error = error.data;
            });
        }
/*
        $http({
            url: "manageWebsiteColors.asmx/GetWebsiteColors",
            method: "get"
        })
            .then(function (response) {
                $scope.Colors = response.data;
            }, function (error) {
                $scope.error = error.data;
            });*/
        $scope.sendLogo = function () {
            var post = $http({
                method: "POST",
                url: "CreationStage.asmx/UploadLogo",
                dataType: 'json',
                data: { logo: $scope.imageSrc },
                headers: { "Content-Type": "application/json" }
            });
        }
    })
    .controller("5aController", function ($scope) {
    })
    .controller("6aController", function ($scope) {
    })
    .controller("DisplayAccountController", function ($scope, $http) {

        $http.get('CreationStage.asmx/StoreInfo').then(function (response) {

            $scope.Store = response.data;

            if ($scope.Store.SnapchatLink === 'No Link') {
                $scope.Svisible = false;
            }
            else { $scope.Svisible = true;}

            if ($scope.Store.TwitterLink === 'No Link') {
                $scope.Tvisible = false;
            }
            else {
                $scope.Tvisible = true;
            }

            if ($scope.Store.FacebookLink === 'No Link') {
                $scope.Fvisible = false;
            }
            else { $scope.Fvisible = true;}

            if ($scope.Store.InstagramLink === 'No Link') {
                $scope.Ivisible = false;
            }
            else { $scope.Ivisible = true; }

        });
    })
    .controller("ColorsController", function ($scope, $http) {

        $http.get('CreationStage.asmx/GetColors').then(function (response) {

            $scope.Colors = response.data;
        }, function (error) {
            $scope.error = error.data;
        });

     /*  $http({
            url: "manageWebsiteColors.asmx/getWebsiteColors",
            method: "get",
            params: { path: filePath }
        })
            .then(function (response) {
                $scope.colors = response.data;
            }, function (error) {
                $scope.error = error.data;
            });*/

        $scope.UpdateColors = function () {

            var post = $http({
                method: "POST",
                url: "CreationStage.asmx/UpdateColors",
                dataType: 'json',
                data: { color1: $scope.Colors.Color1, color2: $scope.Colors.Color2, color3: $scope.Colors.Color3, color4: $scope.Colors.Color4 },
                headers: { "Content-Type": "application/json" }
            });
        }
    })
    .controller("TemplateController", function ($scope, $http, $window) {

        var TemplateID = 0;
        $scope.width1 = "150px";
        $scope.width2 = "150px";
        $scope.width3 = "150px";

        $scope.firstTemplate = function () {
            $scope.width1 = "200px";
            $scope.width2 = "150px";
            $scope.width3 = "150px";

            TemplateID = 1;
        }

        $scope.secondTemplate = function () {
            $scope.width2 = "200px";
            $scope.width1 = "150px";
            $scope.width3 = "150px";
            TemplateID = 2;
        }
        $scope.thirdTemplate = function () {
            $scope.width3 = "200px";
            $scope.width2 = "150px";
            $scope.width1 = "150px";
            TemplateID = 3;
        }

        $scope.goToTemplate = function () {
            var post = $http({
                method: "POST",
                url: "CreationStage.asmx/AddTemplate",
                dataType: 'json',
                data: { id: TemplateID },
                headers: { "Content-Type": "application/json" }
            });
            $window.location.href = '/Template_1_product.html';
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