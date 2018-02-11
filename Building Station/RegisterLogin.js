var myApp = angular.module("myApp", []);

var Register = myApp.controller("Register", function ($scope, $http) {
    $http.get('RegisterLogin.asmx/Register')
        .then(function (response) {
            $scope.colors = response.data;
        });
});

myApp.controller("RegisterCtrl", function ($scope, $location,$http) {
    $scope.RegisterCheck = function () {
        var uname = $scope.user.name;
        var pwd = $scope.user.password;
        var email = $scope.email;
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
            params: { name: uname,email: email, password: pwd }
        })
            .then(function (response) {
                $scope.result = response.data;
            }, function (error) {
                $scope.error = error.data;
            });
    };
});
