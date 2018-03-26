var app = angular.module("BashayerTempalate", [], function ($locationProvider) { $locationProvider.html5Mode(true);})
    .controller("BashayerCtrl", function ($scope, $http, $location, $window) {

        $scope.testing = "i'm # 6";
       // $scope.Domain = $log.info($location.absUrl());

   /*  var pId = $location.path().split("/")[2] || "Unknown";    //path will be /person/show/321/, and array looks like: ["","person","show","321",""]
        console.log(pId);*/
      //  $scope.Domain = "test"; //pId;
/*
        var url = (window.location != window.parent.location)
            ? document.referrer
            : document.location.href;

        var n = url.indexOf("BuildingStation/");
        $scope.Domain = url.substring(n + 16);*/
     //   $scope.Domain = url;

    });