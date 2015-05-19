var app=angular.module('webPlatformApp', ['ngRoute','steam','LocalStorageModule']);
app.config(['$routeProvider', '$locationProvider', function ($routeProvider,$locationProvider) {
$routeProvider.when('/', {
    templateUrl: 'views/index.html',
    controller: 'IndexCtrl',
    requireLogin: false
    })
    .when('/index', {
    templateUrl: 'views/index.html',
    controller: 'IndexCtrl',
    requireLogin: false
    })
    .when('/index.html', {
    templateUrl: 'views/index.html',
    controller: 'IndexCtrl',
    requireLogin: false
    }).when('/notifications', {
    templateUrl: 'views/notifications.html',
    controller: 'notificationsCtrl',
    requireLogin: true
    })
    .when('/editProfile', {
    templateUrl: 'views/editProfile.html',
    controller: 'editProfileCtrl',
    requireLogin: true
    })
    .when('/messages', {
    templateUrl: 'views/messages.html',
    controller: 'messagesCtrl',
    requireLogin: true
    })
    .when('/adminPanel', {
    templateUrl: 'views/adminPanel.html',
    controller: 'adminPanelCtrl',
    requireLogin: true
    })
    .when("/home/:paramiters*",{
    templateUrl: 'views/home.html',
    controller: 'homeCtrl',
    requireLogin: true
    })
    .when("/home/",{
    templateUrl: 'views/home.html',
    controller: 'homeCtrl',
    requireLogin: true
    })
    .when("/home",{
    templateUrl: 'views/home.html',
    controller: 'homeCtrl',
    requireLogin: true
    })
    .when("/error",{
    templateUrl: 'views/error.html',
    controller: 'errorCtrl',
    requireLogin: true
    }).otherwise({ redirectTo: '/error' });
}]);

app.run(['$rootScope', '$location', 'steam', function ($rootScope, $location,steam ) {
    $rootScope.$on('$routeChangeStart', function (event,next,current) {

        if (!steam.loginp()&& next.requireLogin) {
            console.log('DENY');
            event.preventDefault();
            $location.path('/');
        }else if(steam.loginp()&& !next.requireLogin){
         event.preventDefault();
            $location.path('/notifications');
        }
    });
}]);
app.controller('IndexCtrl', ['$scope','$location','$route','steam','$http',function ($scope,$route,$location,steam,$http) {
    document.getElementById("message").innerHTML="";
    $scope.logIn=function(){

     steam.login($scope.userSignIn,$scope.signInpwd).then(function(response) {
            if(!steam.loginp()){
                document.getElementById("message").innerHTML="Wrong Password or Email";
            }else{
                $('#signIn').modal('hide');
                location.href = '#/notifications';
                location.reload();
            }
        });
    }
  
}]);
app.controller('errorCtrl', ['$scope', function ($scope) {	
}]);
app.controller('editProfileCtrl', ['$scope', function ($scope) {
}]);
app.controller('notificationsCtrl', ['$scope', function ($scope) {
}]);
app.controller('messagesCtrl', ['$scope', function ($scope) {	
}]);
app.controller('adminPanelCtrl', ['$scope', function ($scope) {	
    
}]);
app.controller('homeCtrl', ['$scope','$http','$routeParams','$location','$http','steam','localStorageService',function ($scope,$http,$routeParams,$location,$http,steam,localStorageService) {
    $scope.myUrl='http://dev-back1.techgrind.asia/scripts/rest.pike?request=/home/'+$routeParams.paramiters;
    var userDetails=steam.user();
    
    $scope.saveText=function() {
        var text=document.getElementById('content').value;
        var data = JSON.stringify( { content: text});
        var request=/home/+$routeParams.paramiters;    
        steam.post(request, data).then(function(response) {
        console.log(response);
        alert("The document was saved successfully.");
        });

    }   

    $scope.createNewTextFile=function(){
      var data = JSON.stringify({ content: $scope.newtxtContent, type: "Document" });
      var request="/home/"+$routeParams.paramiters+"/"+$scope.newtxtFileName;   
      steam.put(request, data).then(function(response) {
          $('#createNewTextDocumentModal').modal('hide'); 
          console.log(response);
       // location.reload();
      })
  }
    
    
    
    $scope.createRoom=function(){
        var data = JSON.stringify({ type: "Room" });
        var request="/home/"+$routeParams.paramiters+"/"+$scope.roomName;
        steam.put(request,data).then(function(response) { 
        $('#createRoomModal').modal('hide');
        // location.reload();
        console.log(response);
      });
  }
    
    
    
  $scope.WebUrl = "http://dev-back1.techgrind.asia";
    if($routeParams.paramiters==null){
        $scope.RestQuery='/home/';
    }else{
        $scope.RestQuery='/home/'+$routeParams.paramiters;
    }
    steam.get($scope.RestQuery).then(function(response) {
                            console.log(response);

        
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
                paths.push({name:'home',url:'/home'});
                var i=0;      
                for (i = 0; i < indexs.length; i++) { 
                    paths.push({name:name[i],url:'/home/'+path.substring(0,indexs[i])});
                }
                paths.push({name:name[i],url:'/home/'+path});
                $scope.paths=paths;
            }else{
                $scope.paths=[{name:'home',url:'/home'}];
            }
        }
        
    });	 
      $scope.isHome=function(){
        return ($routeParams.paramiters==undefined);
    }
}]);
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
        if(steam.loginp()==null||!steam.loginp()){
            return true;
        }else return false;            
    }        
    }]);