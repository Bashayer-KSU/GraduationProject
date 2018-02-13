var myApp = angular.module("myApp", []);

var Register = myApp.controller("Register", function ($scope, $http) {
    $http.get('RegisterLogin.asmx/Register')
        .then(function (response) {
            $scope.colors = response.data;
        });
});
/*
myApp.controller("RegisterCtrl", function ($scope, $location, $http) {
    $scope.RegisterCheck = function () {
        var uname = $scope.user.name;
        var pwd = $scope.user.password;
        var email = $scope.email;
        var phone = $scope.phone;
        alert("I'm in the script");

        if (uname === 'admin' && pwd === 'admin123') {
            alert("match");
            // window.location.hash = '#/dashboard';
            $location.path('/dashboard');

        } else {
            alert("not match");
            //  $location.path('/about');
            //	 location.reload();

        }
        $http({
            url: "RegisterLogin.asmx/Register",
            method: "get",
            params: { name: uname, email: email, password: pwd, phone: phone }
        })
            .then(function (response) {
                $scope.result = response.data;
            }, function (error) {
                $scope.error = error.data;
            });
    };
});
*/

myApp.controller("RegisterLoginCtrl", function ($scope, $http) {

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
            }, function (error) {
                $scope.error = error.data;
            });
    };

});