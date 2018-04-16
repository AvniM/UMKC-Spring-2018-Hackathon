var myapp = angular.module('login',[]);
myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});

myapp.controller('loginController',function($scope,$http){
    $scope.login = function(){

        if($scope.username && $scope.password){

        var params = {
            username: $scope.username,
            password: $scope.password
        };

        var req = $http.get('http://127.0.0.1:8082/verifyCredentials', {
            params: params
        });

        req.success(function(data, status, headers, config) {
            if(data.length > 0) {
                $scope.loginMessage = "";
                window.location.href = "weaponDetector.html";
            }
            else{
                console.log("Fail");
                $scope.loginMessage = "Invalid username or password";
            }


        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });

        }
        else
        {
            console.log("Required");
            $scope.loginMessage = "Enter username and password";
        }
    };
});