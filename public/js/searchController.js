routerApp.controller('searchController',function($scope,$http,$state,$localStorage){

    $scope.search= function(){
        var data=$scope.data;
        if(data.charAt(0)!=='#'){
            $http({
                method : 'post',
                url : '/searchUser',
                data : {
                    data: data
                }
            }).success(function(data) {
                if(data.statusCode==200){
                    $localStorage.searchUser=data.result;
                    $state.transitionTo("app.searchUserResultState", {}, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                }
                else if(data.statusCode==401){
                    alert("no user exists with the given mail");
                }
            }).error(function(error) {
                console.log("error-request couldn't be made");

            });
        }
        else{
            console.log("its a hash");
            $http({
                method : "post",
                url : '/searchHashTags',
                data : {
                    data: data
                }
            }).success(function(data) {
                $localStorage.hashTags=data.result;
                $state.transitionTo("app.hashTagsResultState", {}, {
                    reload: true,
                    inherit: false,
                    notify: true
                });

            }).error(function(error) {


            });
        }
    };
    


});