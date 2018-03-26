var app = angular.module("AsmaaTempalate", [])
    .controller("AsmaaCtrl", function ($scope, $http) {


        var pId = $location.path().split("/")[2] || "Unknown";    //path will be /person/show/321/, and array looks like: ["","person","show","321",""]
        console.log(pId);
        $scope.Domain = pId;

        var url = (window.location != window.parent.location)
            ? document.referrer
            : document.location.href;

        var n = url.indexOf("BuildingStation/");
        $scope.Store_Domain = url.substring(n + 16);


        $http({
            url: "../Published_Stores.asmx/GetStore",
            params: { StoreDomain: $scope.Store_Domain },
            method: "get"
        })
            .then(function (response) {
                $scope.Store = response.data;

            if ($scope.Store.SnapchatLink !== 'No Value') {
                $scope.Svisible = true;
            }
            else { $scope.Svisible = false; }

            if ($scope.Store.TwitterLink !== 'No Value') {
                $scope.Tvisible = true;
            }
            else {
                $scope.Tvisible = false;
            }

            if ($scope.Store.FacebookLink !== 'No Value') {
                $scope.Fvisible = true;
            }
            else { $scope.Fvisible = false; }

            if ($scope.Store.InstagramLink !== 'No Value') {
                $scope.Ivisible = true;
            }
            else { $scope.Ivisible = false; }

        });

        $http({
            url: "../Published_Stores.asmx/GetProducts",
            params: { StoreDomain: $scope.Store_Domain },
            method: "get"
        })
            .then(function (response) {
            $scope.Product = response.data;
        });
    });