var app = angular.module("Preview", []);

var ctr = app.controller("managePreview", function ($scope, $http) {
        $scope.DesktopView = true;
        $scope.MobileView = false;
        $scope.Previews = ["معاينة على الحاسب", "معاينة على الجوال"];
        $scope.template = "";
        $scope.selectedPreview = $scope.Previews[0];
        $http.get('/CreationStage.asmx/GetTemplateID').then(function (response) {

            $scope.storeID = response.data;
            if ($scope.storeID.TemplateID === 1) {
                $scope.template = "/Templates/Template_1/Template_1.html";
            }
            else if ($scope.storeID.TemplateID === 2) {
                $scope.template = "/Templates/Template_2/Template_2.html";
            }
            else if ($scope.storeID.TemplateID === 3) {
                $scope.template = "/Templates/Template_3/Template_3.html";
            }
            else if ($scope.storeID.TemplateID === 4) {
                $scope.template = "/Templates/Template_4/Template_4.html";
            }
            else if ($scope.storeID.TemplateID === 5) {
                $scope.template = "/Templates/Template_5/Template_5.html";
            }
            else if ($scope.storeID.TemplateID === 6) {
                $scope.template = "/Templates/Template_6/Template_6.html";
            }
        },
            function (error) {
                $scope.error = error.data;
            });
        $scope.selectedPreviewChanged = function () {
            if ($scope.selectedPreview === 'معاينة على الحاسب') {
                $scope.DesktopView = true;
                $scope.MobileView = false;
            }
            else {
                $scope.DesktopView = false;
                $scope.MobileView = true;
            }
        };
        //
});
var ctrE = app.controller("managePreviewE", function ($scope, $http) {
    $scope.DesktopView = true;
    $scope.MobileView = false;
    $scope.Previews = ["Desktop view", "Mobile view"];
    $scope.template = "";
    $scope.selectedPreview = $scope.Previews[0];
    $http.get('/CreationStage.asmx/GetTemplateID').then(function (response) {

        $scope.storeID = response.data;
        if ($scope.storeID.TemplateID === 1) {
            $scope.template = "/Templates/Template_1/Template_1.html";
        }
        else if ($scope.storeID.TemplateID === 2) {
            $scope.template = "/Templates/Template_2/Template_2.html";
        }
        else if ($scope.storeID.TemplateID === 3) {
            $scope.template = "/Templates/Template_3/Template_3.html";
        }
        else if ($scope.storeID.TemplateID === 4) {
            $scope.template = "/Templates/Template_4/Template_4.html";
        }
        else if ($scope.storeID.TemplateID === 5) {
            $scope.template = "/Templates/Template_5/Template_5.html";
        }
        else if ($scope.storeID.TemplateID === 6) {
            $scope.template = "/Templates/Template_6/Template_6.html";
        }
    },
        function (error) {
            $scope.error = error.data;
        });
    $scope.selectedPreviewChanged = function () {
        if ($scope.selectedPreview === 'Desktop view') {
            $scope.DesktopView = true;
            $scope.MobileView = false;
        }
        else {
            $scope.DesktopView = false;
            $scope.MobileView = true;
        }
    };
    //
});

