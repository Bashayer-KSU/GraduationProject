

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
                templateUrl: "CreationStagePages/account_on_instagram.html",
                controller: "InstagramController"
            })
            .when("/3.2", {
                templateUrl: "CreationStagePages/enter_store_info.html",
                controller: "InfoController"
            })
            /*   .when("/4.1", {
                   templateUrl: "CreationStagePages/account_location.html",
                   controller: "4.1Controller"
               })*/
            .when("/4.2", {
                templateUrl: "CreationStagePages/upload_logo.html",
                controller: "UploadLogoController"
            })
            /*    .when("/5", {
                    templateUrl: "CreationStagePages/gather_info.html",
                    controller: "5Controller"
                })
                .when("/6", {
                    templateUrl: "CreationStagePages/select_your_account.html",
                    controller: "6Controller"
                })*/
            .when("/7", {
                templateUrl: "CreationStagePages/display_account.html",
                controller: "DisplayAccountController"
            })
            .when("/8", {
                templateUrl: "CreationStagePages/colors.html",
                controller: "ColorsController"
            })
            .when("/9", {
                templateUrl: "CreationStagePages/template_layout.html",
                controller: "TemplateController"
            })
            /* .when("/10", {
                 templateUrl: "CreationStagePages/loading_template.html",
                 controller: "10Controller"
             })*/
            .otherwise({
                redirectTo: "/0"
            });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    .run(function ($rootScope, $location, loginService, $window) {

        // register listener to watch route changes
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            
            loginService.login().then(function (response) {
                $rootScope.login = response;
                if (response === "false") {
                    //redirect to login page
                    location.href = "/index.html";
                }
            });
        });

        $rootScope.Arabic = function () {
            $window.location.href = '../CreationStageArabic.html';
        };

       /* window.addEventListener("beforeunload", function (e) {
            var confirmationMessage = "\o/";
            alert("exit");
            (e || window.event).returnValue = confirmationMessage; //Gecko + IE
            return confirmationMessage;                            //Webkit, Safari, Chrome
        });*/
        
        $(window).bind("beforeunload", function (event) {
            return "Some of your changes may not be saved.";
        });
       
    })
    .controller("0Controller", function ($scope, $window, $rootScope) {

        $rootScope.Arabic = function () {
            $window.location.href = '../CreationSatgeArabic.html';
        };

    })
    .controller("NameController", function ($scope, $http, $location) {

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
    .controller("TypeController", function ($scope, $http, $location) {
       
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
            $location.path('/3.1');
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
    .controller("InstagramController", function ($scope, $http, $location) {

        $scope.$watch('search', function () {
            fetchUserFromInstagram();
        });

        //http://rest-service.guides.spring.io/greeting
        //https://www.instagram.com/" + $scope.search + "/?__a=1
        //https://www.instagram.com/asmaa.ru/?__a=1
        //https://www.instagram.com/therock/?__a=1
        //  $scope.search = "asmaa.ru";

        function fetchUserFromInstagram() {

            $http.get("https://www.instagram.com/" + $scope.search + "/?__a=1")

                .then(function (response) {
                    $scope.details = response.data;
                    //    alert($scope.details);
                });
        }

        $scope.update = function (user) {

            $scope.search = user.username;
        };

        $scope.select = function () {

            this.setSelectionRange(0, this.value.length);
        };

        $scope.savedata = function () {
            var post = $http({
                method: "POST",
                url: "CreationStage.asmx/ConnectInstagram",
                dataType: 'json',
                data: { link: 'https://www.instagram.com/'+ $scope.search + '/', logo: $scope.details.graphql.user.profile_pic_url, descripton: $scope.details.graphql.user.biography, name: $scope.details.graphql.user.full_name },
                headers: { "Content-Type": "application/json" }
            });
            post.then(function (response) { }, function (error) { $scope.R = error.data; });
        };

        $scope.getColors = function () {
            //var File_Path = $scope.imageSrc;
            //    alert($scope.imageSrc);
            $http({
                url: "manageWebsiteColors.asmx/GetWebsiteColors",
                dataType: 'json',
                method: "POST",
                data: { path: $scope.details.graphql.user.profile_pic_url },
                headers: { "Content-Type": "application/json; charset=utf-8" }
            })
                .then(function (response) {
                    //       alert("success");
                    $scope.Colors = response.data;
                }, function (error) {
                    //      alert("failed");
                    $scope.R = error.data;
                });

            $location.path('/7');
        };
    })
    .controller("InfoController", function ($scope, $http, $location) {

        $http.get('CreationStage.asmx/StoreInfo').then(function (response) {

            $scope.Store = response.data;
            if ($scope.Store.Address !== 'No  Location ') {
                $scope.Address = $scope.Store.Address;
            }

            if ($scope.Store.SnapchatLink !== 'No Value') {
                $scope.snapchatLink = $scope.Store.SnapchatLink;
            }

            if ($scope.Store.TwitterLink !== 'No Value') {
                $scope.twitterLink = $scope.Store.TwitterLink;
            }

            if ($scope.Store.FacebookLink !== 'No Value') {
                $scope.facebookLink = $scope.Store.FacebookLink;
            }

            if ($scope.Store.InstagramLink !== 'No Value') {
                $scope.instagramLink = $scope.Store.InstagramLink;
            }
        });

        $scope.sendData = function () {
/*            var post = $http({
                method: "POST",
                url: "CreationStage.asmx/UpdateData",
                dataType: 'json',
                data: { address: $scope.Address, snapchat_link: $scope.snapchatLink, twitter_link: $scope.twitterLink, facebook_link: $scope.facebookLink, instagram_link: $scope.instagramLink },
                headers: { "Content-Type": "application/json" }
            });
                post.then(function (response) { }, function (error) { });*/

            $http.post(
                "CreationStage.asmx/UpdateData",
                $.param({
                    address: $scope.Address,
                    snapchat_link: $scope.snapchatLink,
                    twitter_link: $scope.twitterLink,
                    facebook_link: $scope.facebookLink,
                    instagram_link: $scope.instagramLink
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    }
                }
            )
                .then(function (response) {
                    $scope.result = response.data;
                }, function (error) {
                    $scope.error = error.data;
                });
            $location.path('/4.2');
        };
    })
    /*  .controller("4.1Controller", function ($scope, $rootScope, $window) {
          $rootScope.Arabic = function () {
              $window.location.href = '../CreationStageArabic.html';
          };
      })*/
    .controller("UploadLogoController", function ($scope, fileReader, $http) {
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
    /* .controller("5Controller", function ($scope, $rootScope, $window) {
         $rootScope.Arabic = function () {
             $window.location.href = '../CreationStageArabic.html';
         };
     })
     .controller("6Controller", function ($scope, $rootScope, $window) {
         $rootScope.Arabic = function () {
             $window.location.href = '../CreationStageArabic.html';
         };
     })*/
    .controller("DisplayAccountController", function ($scope, $http) {

        $http.get('CreationStage.asmx/StoreInfo').then(function (response) {

            $scope.Store = response.data;

            if ($scope.Store.SnapchatLink !== "No Value") {
                $scope.Svisible = true;
            }
            else { $scope.Svisible = false; }

            if ($scope.Store.TwitterLink !== "No Value") {
                $scope.Tvisible = true;
            }
            else {
                $scope.Tvisible = false;
            }

            if ($scope.Store.FacebookLink !== "No Value") {
                $scope.Fvisible = true;
            }
            else { $scope.Fvisible = false; }

            if ($scope.Store.InstagramLink !== "No Value") {
                $scope.Ivisible = true;
            }
            else { $scope.Ivisible = false; }
        });
    })
    .controller("ColorsController", function ($scope, $http) {
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
    .controller("TemplateController", function ($scope, $http, $window) {

        var TemplateID = 0;
        $scope.Border1 = "none";
        $scope.Border2 = "none";
        $scope.Border3 = "none ";
        $scope.c1 = "none";
        $scope.c2 = "none";
        $scope.c3 = "none";


        $scope.firstTemplate = function () {
            $scope.Border1 = "solid";
            $scope.Border2 = "none";
            $scope.Border3 = "none ";
            $scope.c1 = "teal";
            $scope.c2 = "none";
            $scope.c3 = "none";
            TemplateID = 4;
        };

        $scope.secondTemplate = function () {
            $scope.Border2 = "solid";
            $scope.Border1 = "none";
            $scope.Border3 = "none ";
            $scope.c1 = "none";
            $scope.c2 = "teal";
            $scope.c3 = "none";
            TemplateID = 5;
        };
        $scope.thirdTemplate = function () {
            $scope.Border3 = "solid";
            $scope.Border2 = "none";
            $scope.Border1 = "none ";
            $scope.c1 = "none";
            $scope.c2 = "none";
            $scope.c3 = "teal";
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

                $window.location.href = '/Views/BasicE.html';
            }
        };
    });
   /* .controller("10Controller", function ($scope, $rootScope, $window) {
        $rootScope.Arabic = function () {
            $window.location.href = '../CreationStageArabic.html';
        };
    });*/

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
            return msg.data;
        });
    };
    return { login: login };
});