routerApp.controller('hashTagsResultStateController',function($scope,$http,$state,$localStorage) {
    console.log($localStorage.hashTags);
    $scope.hashTags = $localStorage.hashTags;
    $scope.tweetCount=window.sessionStorage.getItem("tweetCount");
    $scope.followingCount=window.sessionStorage.getItem("followingCount");
    $scope.followersCount=window.sessionStorage.getItem("followersCount");

});