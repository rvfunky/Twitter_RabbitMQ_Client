/**
 * Created by raghu on 12/22/16.
 */
routerApp.controller('profileStateController',['$scope','$http','$state','$window',function($scope,$http,$state,$window){
    $scope.tweetCount=window.sessionStorage.getItem("tweetCount");
    $scope.followingCount=window.sessionStorage.getItem("followingCount");
    $scope.followersCount=window.sessionStorage.getItem("followersCount");
    $scope.getProfile=function () {
        $http({
            method:'get',
            url:'/getProfile',
            data:{

            }

        }).success(function(data){
            if(data.statusCode==200){
                //$scope.data=data.result;
                //alert(JSON.stringify(data));
                $scope.fullname=data.result[0].fullname;
                $scope.twitterHandle=data.result[0].twitterHandle;
                $scope.gender=data.result[0].gender;
                $scope.birthday=data.result[0].birthday;
                var dDate = new Date(data.result[0].birthday);
                var nDate = dDate.getTime() - (dDate.getTimezoneOffset() *1000)
                dDate = new Date(nDate);
                var lcYear = dDate.getFullYear().toString() ;
                var lnMonth = dDate.getMonth()+1 ;
                var lcMonth = lnMonth.toString() ;
                var lcMonth = '0' + lcMonth;
                lcMonth = lcMonth.substr(0,2);
                var lcDate = (dDate.getDate()+1).toString() ;
                var lxDate = lcYear +'-'+ lcMonth +'-'+ lcDate;
                $scope.birthday=lxDate;
                $scope.mobile=data.result[0].mobile;
            }
            else{


            }
        }).error(function(error){

        })
    }
    $scope.updateProfile=function () {
        $scope.updateProfile=function () {
            console.log($scope.gender);
            $http({
                method:'post',
                url:'/updateProfile',
                data:{
                    fullname:$scope.fullname,
                    twitterHandle:$scope.twitterHandle,
                    gender:$scope.gender,
                    birthday:$scope.birthday,
                    mobile:$scope.mobile    
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
    }
}]);