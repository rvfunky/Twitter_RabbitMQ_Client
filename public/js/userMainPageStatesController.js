var routerApp = angular.module('routerApp', ['ui.router', 'ngStorage']);
routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

    // route for the home page
        .state('app', {
            url: '/',
            views: {
                'header':{
                    templateUrl: '/ejs/tweetFeedHeader.ejs',
                    controller: 'searchController'
                },
                'content': {
                    templateUrl: '/ejs/tweetFeed.ejs',
                    controller: 'tweetFeedController'
                }

            }
        })
        .state('app.searchUserResultState', {
            url: 'searchUser',
            views: {
                'header@':{
                    templateUrl: '/ejs/tweetFeedHeader.ejs',
                    controller: 'searchController'
                },
                'content@': {
                    templateUrl: '/ejs/searchUserResultState.ejs',
                    controller: 'searchUserResultStateController'
                }

            }
        })
        .state('app.followersUsersState', {
            url: 'followersUsers',
            views: {
                'header@':{
                    templateUrl: '/ejs/tweetFeedHeader.ejs',
                    controller: 'searchController'
                },
                'content@': {
                    templateUrl: '/ejs/followersUsersState.ejs',
                    controller: 'followersUsersStateController'
                }

            }
        })
        .state('app.followingUsersState', {
            url: 'followingUsers',
            views: {
                'header@':{
                    templateUrl: '/ejs/tweetFeedHeader.ejs',
                    controller: 'searchController'
                },
                'content@': {
                    templateUrl: '/ejs/followingUsersState.ejs',
                    controller: 'followingUsersStateController'
                }

            }
        })
        .state('app.profile', {
            url: 'profile',
            views: {
                'header@':{
                    templateUrl: '/ejs/tweetFeedHeader.ejs',
                    controller: 'searchController'
                },
                'content@': {
                    templateUrl: '/ejs/profileState.ejs',
                    controller: 'profileStateController'
                }

            }
        })
        .state('app.hashTagsResultState', {
            url: 'hashTags',
            views: {
                'header@':{
                    templateUrl: '/ejs/tweetFeedHeader.ejs',
                    controller: 'searchController'
                },
                'content@': {
                    templateUrl: '/ejs/hashTagsResultState.ejs',
                    controller: 'hashTagsResultStateController'
                }

            }
        })
    
})
routerApp.controller('tweetFeedController',['$scope','$http','$state','$window',function($scope,$http,$state,$window){
   $scope.makeTweet=function(){
       $http({
           method:'post',
           url:'/insertTweet',
           data:{
               "tweetData":$scope.tweet
           }

       }).success(function(data){
           if(data.statusCode==200){
               alert("tweeted successfully!");
            }
           else{
               

           }
       }).error(function(error){

       })
   }
    $scope.getTweets=function () {
        $http({
            method:'get',
            url:'/getTweets'


        }).success(function(data){
            if(data.statusCode==200){
                console.log(data);
                $scope.data=data.result;
            }
            else{


            }
        }).error(function(error){

        })
    }
    $scope.getStats=function(){
        $http({
            method:'get',
            url:'/getStats'

        }).success(function(data){
            console.log(data);
            if(data.statusCode==200){
                $scope.tweetCount=data.stats.tweetCount;
                $scope.followingCount=data.stats.following;
                $scope.followersCount=data.stats.followers;
                $scope.name=data.stats.name;
                $window.sessionStorage.setItem("name",data.stats.name);
                $window.sessionStorage.setItem("tweetCount",data.stats.tweetCount);
                $window.sessionStorage.setItem("followingCount",data.stats.following);
                $window.sessionStorage.setItem("followersCount",data.stats.followers);
            }
            else{


            }
        }).error(function(error){

        })
    }
    $scope.retweet=function(tweet,fullname){
        $http({
            method:'post',
            url:'/insertRetweet',
            data:{
                "tweet":tweet,
                "o_tweeter_name":fullname
            }
        }).success(function (data) {
            alert("retweet successful");
        }).error(function (error) {

        })
    }
}])