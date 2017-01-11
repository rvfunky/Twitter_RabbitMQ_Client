var routerApp = angular.module('routerApp', ['ui.router', 'ngStorage']);
routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

    // route for the home page
        .state('app', {
            url: '/',
            views: {

                'content': {
                    templateUrl: '/ejs/loginpage.ejs',
                    controller: 'loginController'
                }

            }
        })
        .state('app.signup',{
            url:'signup',
        views: {
            'header@':{
                templateUrl: '/ejs/signupHeader.ejs'
            },
            'content@':{
                templateUrl: '/ejs/signup.ejs',
                controller: 'signupController'
            }
        }
    })
});
routerApp.controller('loginController',['$scope','$http','$state',function($scope,$http,$state){
    $scope.login=function(){
        console.log("in login");
        $http({
            method:'post',
            url:'/login',
            data:{
                "email":$scope.email,
                "password":$scope.password
            }

        }).success(function(data){
            if(data.statusCode==200){
                console.log("success");
                window.location.assign("/userMainPage");
            }
            else{
                console.log("error");
                $scope.error=1;

            }
        }).error(function(error){

        })
        
    }
}]);
routerApp.controller('signupController',['$scope','$http','$state',function($scope,$http,$state){
    $scope.signup=function(){

        $http({
            method:'post',
            url:'/signup',
            data:{
                "fullname":$scope.fullname,
                "email":$scope.email,
                "password":$scope.password
            }

        }).success(function(data){
            if(data.statusCode==200){
                console.log("success");
                $scope.success=1;
                $scope.error=0;
            }
            else{
                console.log("error");
                $scope.error=1;
                $scope.success=0;
            }
        }).error(function(error){

        })
    }
}]);