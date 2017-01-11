routerApp.controller('followingUsersStateController',['$scope','$http','$state',function($scope,$http,$state){
    $scope.tweetCount=window.sessionStorage.getItem("tweetCount");
    $scope.followingCount=window.sessionStorage.getItem("followingCount");
    $scope.followersCount=window.sessionStorage.getItem("followersCount");
    $scope.getFollowingUsers=function () {
        console.log("hello");
        $http({
            method:'get',
            url:'/getFollowingUsers',
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