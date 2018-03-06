var myApp = angular.module("T6", []);

var T6 = myApp.controller("T6Ctrl", function ($scope, $http) {
    $scope.resultset = [];
    $scope.color1;
    var init = function () {

        $http.get('/TemplateData.asmx/StoreData').then(function (response) {
            $scope.resultset = response.data;
            console.log($scope.resultset);
            $scope.color1 = $scope.resultset.Color1;//Header
            $scope.color2 = $scope.resultset.Color2;//Content
            $scope.color3 = $scope.resultset.Color3;//Footer
            $scope.color4 = $scope.resultset.Color4;//Text color

        }, function (error) {
            $scope.error = error;
        })

    };
    init();


});
