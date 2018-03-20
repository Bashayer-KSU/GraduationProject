

var app = angular.module("CraetionStageArabicDemo", ["ngRoute"])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/0a", {
                templateUrl: "CreationStagePages/welcome_arabic.html",
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
                templateUrl: "CreationStagePages/account_on_instagram_arabic.html",
                controller: "InstagramController"
            })
            .when("/3.2a", {
                templateUrl: "CreationStagePages/enter_store_info_arabic.html",
                controller: "InfoController"
            })
            /* .when("/4.1a", {
                 templateUrl: "CreationStagePages/موقع_الحساب.html",
                 controller: "InstaLocationController"
             })*/
            .when("/4.2a", {
                templateUrl: "CreationStagePages/upload_logo_arabic.html",
                controller: "UploadLogoController"
            })
            /* .when("/5a", {
                 templateUrl: "CreationStagePages/جمع_المعلومات.html",
                 controller: "5aController"
             })
             .when("/6a", {
                 templateUrl: "CreationStagePages/اختيار_الحساب.html",
                 controller: "6aController"
             })*/
            .when("/7a", {
                templateUrl: "CreationStagePages/display_account_arabic.html",
                controller: "DisplayAccountController"
            })
            .when("/8a", {
                templateUrl: "CreationStagePages/colors_arabic.html",
                controller: "ColorsController"
            })
            .when("/9a", {
                templateUrl: "CreationStagePages/template_layout_arabic.html",
                controller: "TemplateController"
            })
            /*.when("/10a", {
                templateUrl: "CreationStagePages/جاري-تحميل_المنصة.html",
                controller: "LoadController"
            })*/
            .otherwise({
                redirectTo: "/0a"
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
    .controller("0aController", function ($scope, $rootScope, $window) {
        $rootScope.English = function () {
            $window.location.href = '../CreationStage.html';
        };

    })
    .controller("Name_Controller", function ($scope, $rootScope, $http, $location, $window) {

        $rootScope.English = function () {
            $window.location.href = '../CreationStage.html';
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
            $location.path('/2a');
        };

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
    .controller("Type_Controller", function ($scope, $rootScope, $http, $window) {

        $rootScope.English = function () {
            $window.location.href = '../CreationStage.html';
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
                data: { type: $scope.Type, language: 'Arabic' },
                headers: { "Content-Type": "application/json" }
            });
            post.then(function (response) { }, function (error) { $scope.R = error.data; });
        };
        $scope.Types = ["مكياج وعناية", "أشغال يدوية", "اكسسوارات", "حلويات", "موضة وملابس", "مخبز", "طبخ منزلي", "اكسسوارات جوال ولابتوب"];
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
    .controller("InstagramController", function ($scope, $rootScope, $window, $http, $location) {
        $rootScope.English = function () {
            $window.location.href = '../CreationStage.html';
        };

        $scope.$watch('search', function () {
            fetch();
        });

        //http://rest-service.guides.spring.io/greeting
        //https://www.instagram.com/" + $scope.search + "/?__a=1
        //https://www.instagram.com/asmaa.ru/?__a=1
        //https://www.instagram.com/therock/?__a=1
        //  $scope.search = "asmaa.ru";

        function fetch() {

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
                data: { link: 'https://www.instagram.com/' + $scope.search + '/', logo: $scope.details.graphql.user.profile_pic_url, descripton: $scope.details.graphql.user.biography, name: $scope.details.graphql.user.full_name },
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

            $location.path('/7a');
        };
    })
    .controller("InfoController", function ($scope, $http, $location, $rootScope, $window) {
        $rootScope.English = function () {
            $window.location.href = '../CreationStage.html';
        };

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
            $location.path('/4.2a');
        };
        /*   $scope.Links = [{ id: 'Link1' }, { id: 'Link2' }];
           $scope.addNewLink = function () {
               var newItemNo = $scope.Links.length + 1;
               $scope.Links.push({ 'id': 'Link' + newItemNo });
           };*/
    })
    /*.controller("InstaLocationController", function ($scope, $rootScope, $window) {
        $rootScope.English = function () {
            $window.location.href = '../CreationStage.html';
        };
    })*/
    .controller("UploadLogoController", function ($scope, fileReader, $http, $rootScope, $window) {
        $rootScope.English = function () {
            $window.location.href = '../CreationStage.html';
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
 /*   .controller("5aController", function ($scope, $rootScope, $window) {
        $rootScope.English = function () {
            $window.location.href = '../CreationStage.html';
        };
    })
    .controller("6aController", function ($scope, $rootScope, $window) {
        $rootScope.English = function () {
            $window.location.href = '../CreationStage.html';
        };
    })*/
    .controller("DisplayAccountController", function ($scope, $http, $rootScope, $window) {
        $rootScope.English = function () {
            $window.location.href = '../CreationStage.html';
        };
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
    .controller("ColorsController", function ($scope, $http, $rootScope, $window) {
        $rootScope.English = function () {
            $window.location.href = '../CreationStage.html';
        };
        /*   $http.get('manageWebsiteColors.asmx/chooseColors').then(function (response) {
  
              $scope.Colors = response.data;
          }, function (error) {
              $scope.error = error.data;
          });
  
        $http({
              url: "manageWebsiteColors.asmx/getWebsiteColors",
              method: "get",
              params: { path: filePath }
          })
              .then(function (response) {
                  $scope.colors = response.data;
              }, function (error) {
                  $scope.error = error.data;
              });*/
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
        $rootScope.English = function () {
            $window.location.href = '../CreationStage.html';
        };
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
            TemplateID = 1;
        };

        $scope.secondTemplate = function () {
            $scope.Border2 = "solid";
            $scope.Border1 = "none";
            $scope.Border3 = "none ";
            $scope.c1 = "none";
            $scope.c2 = "teal";
            $scope.c3 = "none";
            TemplateID = 2;
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
                alert("يجب أن تختار قالبا لمتجرك");
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
    });
   /* .controller("LoadController", function ($scope, $rootScope, $window) {
        $rootScope.English = function () {
            $window.location.href = '../CreationStage.html';
        };
    })*/

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