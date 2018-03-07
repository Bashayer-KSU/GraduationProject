var myApp = angular.module("myApp", []);

var Register = myApp.controller("RegisterLoginCtrl", function ($scope, $http, $window) {


    $scope.SendData = function (e,lang) {
        // use $.param jQuery function to serialize data from JSON 
        var url;
        var data;

        if (e === "reg") {
            url = "RegisterLogin.asmx/Register";
            if (lang === "eng") {
                data = $.param({
                    name: $scope.REname,
                    email: $scope.REemail,
                    password: $scope.REpassword,
                    phone: $scope.REphone,
                    lang: lang
                });
            }
            else {
                data = $.param({
                    name: $scope.Rname,
                    email: $scope.Remail,
                    password: $scope.Rpassword,
                    phone: $scope.Rphone,
                    lang: lang
                });
            }
        }
        else if (e === "log") {
            url = "RegisterLogin.asmx/Login";
            if (lang === "eng") {

                data = $.param({
                    email: $scope.LEemail,
                    password: $scope.LEpassword,
                    lang : lang
                });
            }
            else {
                data = $.param({
                    email: $scope.Lemail,
                    password: $scope.Lpassword,
                    lang: lang
                });
            }
        }


        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        
        $http.post(url, data, config)
            .then(function (response) {
                $scope.result = response.data;
                //$window.location.href = response.data;
                location.href = $scope.result.substr(1, $scope.result.length - 2);
            }, function (error) {
                $scope.error = error.data;
            });
    };

});