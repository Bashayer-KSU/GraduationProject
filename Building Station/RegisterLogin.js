var myApp = angular.module("myApp", []);

var Register = myApp.controller("Register", function ($scope, $http) {
    $http.get('RegisterLogin.asmx/Register')
        .then(function (response) {
            $scope.colors = response.data;
        });
});

myApp.controller("RegisterCtrl", function ($scope, $location) {
    $scope.RegisterCheck = function () {
        var uname = $scope.user.name;
        var pwd = $scope.user.password;
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
    };
});
