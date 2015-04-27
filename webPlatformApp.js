var app=angular.module('webPlatformApp', ['ngRoute','LocalStorageModule']);
app.config(['$routeProvider', '$locationProvider',
         function ($routeProvider,$locationProvider) {
             $routeProvider
				.when('/', {
                    templateUrl: 'views/index.html',
                    controller: 'IndexCtrl'
                })
                 .when('/index', {
                    templateUrl: 'views/index.html',
                    controller: 'IndexCtrl'
                })
                 .when('/index.html', {
                    templateUrl: 'views/index.html',
                    controller: 'IndexCtrl'
                })
                 .when('/editProfile', {
                    templateUrl: 'views/editProfile.html',
                    controller: 'editProfileCtrl'
                })
                 .when('/notifications', {
                    templateUrl: 'views/notifications.html',
                    controller: 'notificationsCtrl'
                })
                 .when('/messages', {
                    templateUrl: 'views/messages.html',
                    controller: 'messagesCtrl'
                })
                 .when('/adminPanel', {
                    templateUrl: 'views/adminPanel.html',
                    controller: 'adminPanelCtrl'
                })
                 .when("/home/:paramiters*",{
                    templateUrl: 'views/home.html',
                    controller: 'homeCtrl'
                })
                 .when("/home",{
                    templateUrl: 'views/home.html',
                    controller: 'homeCtrl'
                })
                 .when("/error",{
                    templateUrl: 'views/error.html',
                    controller: 'errorCtrl'
                }).otherwise({ redirectTo: '/error' });
                 
         }]);
    app.controller('IndexCtrl', ['$scope','$location','$route','steam','$http',function ($scope,$route,$location,steam,$http) {
                    document.getElementById("message").innerHTML="";

        $scope.logIn=function(){
             $scope.re=steam.login($scope.userSignIn,$scope.signInpwd);
            
            if(!steam.loginp()){
           document.getElementById("message").innerHTML="Wrong Password or Email";
            }else{
                location.href = '#/notifications';
            location.reload();
            }
           /* $('#signIn').modal('hide');
            location.href = '#/notifications';
            location.reload(); */        

        }
        $scope.singUp=function(){
 $http.post("http://dev-back1.techgrind.asia/scripts/rest.pike?request=register",JSON.stringify({
                 "email":$scope.emailSignUp,
                "password":$scope.signUppwd,
                "password2":$scope.signUpRePass,
                "group":$scope.group   
        })).success(function(response) {
    $scope.myres=response;
    })
}
        
        
    }]);
    app.controller('errorCtrl', ['$scope', function ($scope) {	
    }])
    app.controller('editProfileCtrl', ['$scope', function ($scope) {
    }])
    app.controller('notificationsCtrl', ['$scope', function ($scope) {
    }])
    app.controller('messagesCtrl', ['$scope', function ($scope) {	
    }])
    app.controller('adminPanelCtrl', ['$scope', function ($scope) {	
    }])
    app.controller('homeCtrl', function($scope,$http,$routeParams, $location,steam) {
    $scope.WebUrl = "http://dev-back1.techgrind.asia";
    $scope.RestQuery = "/scripts/rest.pike?request=/";
    if($routeParams.paramiters==null){
        $scope.Url=$scope.WebUrl+$scope.RestQuery+'home/';
    }else{
        $scope.Url=$scope.WebUrl+$scope.RestQuery+'home/'+$routeParams.paramiters;
    }
    $http.get($scope.Url).success(function(response) {
        if(response.error!=null){
        $location.path('/error');
        $location.replace(); 
        }else{
        
        $scope.Data = response;
        if (angular.isArray(response.object)) {
            $scope.objects = response.object;
            $scope.Dtype="room";
        } else {
            $scope.Dtype="doc";
            $scope.objects = [response.object];
        }
        if (angular.isArray(response.inventory)) {
            $scope.inventory = response.inventory;
        } else {
            $scope.inventory = [response.inventory];
        }  
        //CREATE PATH FROM PARAMITERS 
        var path=$routeParams.paramiters;
        if(path!=null){
            var indexs=[];
            for (i = 0; i < path.length; i++) { 
                if(path.charAt(i)==='/')
                    indexs.push(i);
            }        	        	
            var name=path.split('/');
            var paths=[];
            paths.push({name:'home',url:'/home/'});
            var i=0;      
            for (i = 0; i < indexs.length; i++) { 
                paths.push({name:name[i],url:'/home/'+path.substring(0,indexs[i])});
            }
            paths.push({name:name[i],url:'/home/'+path});
            $scope.paths=paths;
        }else{
            $scope.paths=[{name:'home',url:'/home/'}];
        }}
    }).error(function(data, status, headers, config) {
        $location.path('/error');
        $location.replace(); 
    });	
   
    })
    app.controller('navControler', ['$scope', '$location','steam',function ($scope,$location,steam) {
        
        $scope.setClass = function(path) {    
            if ($location.path().substr(0, path.length) == path) {
                return "active"
            }else{
                return ""
            }
        }
        $scope.logOut=function(){
         steam.logout();

        }
        $scope.isLogOut=function(){
            if(steam.loginp()==null||steam.loginp()==false){
            return true;
            }else return false;
            
        }    
    }]);