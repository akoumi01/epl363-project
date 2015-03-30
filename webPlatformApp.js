angular.module('webPlatformApp', ['ngRoute'])
.config(['$routeProvider', '$locationProvider',
         function ($routeProvider,$locationProvider) {
             $routeProvider
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
                })
                 .otherwise({ redirectTo: '/error' });	  
         }])
    .controller('IndexCtrl', ['$scope','$location','$route',function ($scope,$route,$location) {
        $scope.logIn=function(){
            $('#signIn').modal('hide');
            location.reload();         
            location.href = '#/notifications';
        }
    }])
    .controller('errorCtrl', ['$scope', function ($scope) {	
    }])
    .controller('editProfileCtrl', ['$scope', function ($scope) {
    }])
    .controller('notificationsCtrl', ['$scope', function ($scope) {
    }])
    .controller('messagesCtrl', ['$scope', function ($scope) {	
    }])
    .controller('adminPanelCtrl', ['$scope', function ($scope) {	
    }])
    .controller('homeCtrl', function($scope,$http,$routeParams, $location) {
    $scope.WebUrl = "http://dev-back1.techgrind.asia";
    $scope.RestQuery = "/scripts/rest.pike?request=/";
    if($routeParams.paramiters==null){
        $scope.Url=$scope.WebUrl+$scope.RestQuery+'home/';
    }else{
        $scope.Url=$scope.WebUrl+$scope.RestQuery+'home/'+$routeParams.paramiters;
    }
    $http.get($scope.Url).success(function(response) {
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
        }
    }).error(function(data, status, headers, config) {
        $location.path('/error');
        $location.replace(); 
    });	
    $('#file').change(function(){
        
    });
    })
    .controller('navControler', ['$scope', '$location',function ($scope,$location) {
        $scope.setClass = function(path) {    
            if ($location.path().substr(0, path.length) == path) {
                return "active"
            }else{
                return ""
            }
        }
        $scope.isLogOut=function(){
            if ($location.path().substr(0, $location.path().length) == "/index") {
                return true; 
            }else return false;
        }    
    }]);