var myApp = angular.module('myApp', []);
myApp.controller("AppController", ["$scope", "$http", function($scope, $http) {
    console.log("Hello world from the controller");

    var refresh = function() {
        $http.get("/userList").success(function(response) {
            console.log("I got the data.");
            $scope.userList = response;
            $scope.user = "";
        });    
    }
    
    refresh();

    $scope.addUser = function() {
        console.log($scope.user);
        $http.post("/userList", $scope.user).success(function(response) {
            console.log(response);
            refresh();
        });
    };

    $scope.remove = function(id) {
        console.log("remove: " + id);
        $http.delete("/userList/" + id).success(function(response) {
            refresh();
        });
    };

    $scope.edit = function(id) {
        console.log("edit: " + id);
        $http.get("/userList/" + id).success(function(response) {
            $scope.user = response;
        });
    };

    $scope.update = function() {
        console.log("update: " + $scope.user._id);
        $http.put("/userList/" + $scope.user._id, $scope.user).success(function(response) {
            refresh();
        });
    };

    $scope.deselect = function() {
        $scope.user = "";
    }
    
}]);
