var myApp = angular.module("myApp", []);

var Register = myApp.controller("RegisterLoginCtrl", function ($scope, $http, $window) {


    $scope.SendData = function (e) {
        // use $.param jQuery function to serialize data from JSON 
        var url;
        var data;
        if (e === "reg") {
            url = "RegisterLogin.asmx/Register";
            data = $.param({
                name: $scope.user.name,
                email: $scope.email,
                password: $scope.user.password,
                phone: $scope.phone
            });
        }
        else if (e === "log") {
            url = "RegisterLogin.asmx/Login";
            data = $.param({
                name: $scope.username,
                password: $scope.userpassword
            });
        }


        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        
        $http.post(url, data, config)
            .then(function (response) {
                $scope.result = response.data;
                $window.location.href = response.data;
            }, function (error) {
                $scope.error = error.data;
            });
    };

});