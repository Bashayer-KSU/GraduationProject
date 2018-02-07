var myApp = angular.module("myApp", []);

var Register = app.controller("Register", function ($scope, $http) {
    $http.get('RegisterLogin.asmx/Register')
        .then(function (response) {
            $scope.colors = response.data;
        });
});

myApp.controller("RegisterCtrl", function ($scope, $location) {
    $scope.loginCheck = function () {
        var uname = $scope.user.name;
        var pwd = $scope.user.password;
        if (uname == 'admin' && pwd == 'admin123') {
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
