routerApp.controller('followersUsersStateController',['$scope','$http','$state','$window',function($scope,$http,$state,$window){
    $scope.tweetCount=window.sessionStorage.getItem("tweetCount");
    $scope.followingCount=window.sessionStorage.getItem("followingCount");
    $scope.followersCount=window.sessionStorage.getItem("followersCount");
    $scope.getFollowersUsers=function () {
        $http({
            method:'get',
            url:'/getFollowersUsers',
            data:{
                
            }

        }).success(function(data){
            if(data.statusCode==200){
                $scope.data=data.result;
            }
            else{


            }
        }).error(function(error){

        })
    }
}]);