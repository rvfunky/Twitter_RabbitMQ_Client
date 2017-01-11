routerApp.controller('searchUserResultStateController',function($scope,$http,$state,$localStorage){
   console.log($localStorage.searchUser);
    $scope.tweetCount=window.sessionStorage.getItem("tweetCount");
    $scope.followingCount=window.sessionStorage.getItem("followingCount");
    $scope.followersCount=window.sessionStorage.getItem("followersCount");
    $scope.check=$localStorage.searchUser;
    $scope.follow=function(){
        $http({
            method:'post',
            url:'/followUser',
            data:{
                "followingEmail":$scope.check[0].email
            }

        }).success(function(data){
            if(data.statusCode==200){
                console.log("success");
            }
            else{


            }
        }).error(function(error){

        })
    }
});