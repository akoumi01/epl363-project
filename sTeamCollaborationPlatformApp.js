/**
 * @class angular_module.sTeamCollaborationPlatformApp
 * @memberOf angular_module
 * @description sTeamCollaborationPlatformApp module is the main module of the
 *              sTeam collaboration platform website. Through its controllers,
 *              all the platform views are handled and being exchanged.
 *              'ngRoute'(handles the routing of the website), 'steam', and
 *              'LocalStorageModule'(handles the local storage of the browser)
 *              are the Angular Js modules that are included in the angularjs
 *              module.
 */

var app=angular.module('sTeamCollaborationPlatformApp', ['ngRoute','steam','LocalStorageModule']);
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
            event.preventDefault();
            $location.path('/');
        }else if(steam.loginp()&& !next.requireLogin){
         event.preventDefault();
        $location.path('/notifications');
        }
    });
}]);
/**
 * @function IndexCtrl
 * @memberOf angular_module.sTeamCollaborationPlatformApp
 * @description IndexCtrl contains the log in function. In future updates of the
 *              website the sing up functionalities will be added
 */
app.controller('IndexCtrl', ['$scope','steam','$location',"$window",function ($scope,steam,$location,$window) {
    /**
	* @name $scope.logIn
	* @function
	* @memberOf angular_module.sTeamCollaborationPlatformApp.IndexCtrl
	* @description Initially it creates a JQuery handler for Log in button
	*              and using a Bootstrap property the change of the button
	*              is being changed to the Loading state. Next, by using
	*              the steam.login function, the nickname and password
	*              information are verified and log in function is carried
	*              out. Then is server response is being handled, if login
	*              is successful then the user is redirected to
	*              notification Page. If login fails an error massage is
	*              displayed.
	*/
    $scope.logIn=function(){
        var $btn = $("#btnSignIn");
        $btn.button('loading');
        steam.login($scope.userSignIn,$scope.signInpwd).then(function(response) {
                $btn.button('reset');
                $('#signIn').modal('hide');
                $location.path('/notifications');
                $window.location.reload();
        }).catch(function(e){
                $btn.button('reset');
                $('#signIn').modal('hide');
                alert("Wrong username or password");
     })
    }  
}]);
/**
 * @function errorCtrl
 * @memberOf angular_module.sTeamCollaborationPlatformApp
 * @description The errorCtrl controller handles the error Page
 */
app.controller('errorCtrl', ['$scope', function ($scope) {	
}]);
/**
 * @function editProfileCtrl
 * @memberOf angular_module.sTeamCollaborationPlatformApp
 * @description The editProfileCtrl controller handles the Edit Profile Page
 *              View (prototype). In future updates of the website the edit
 *              Profile functions will be added.
 */
app.controller('editProfileCtrl', ['$scope', function ($scope) {
}]);
/**
 * @function notificationsCtrl
 * @memberOf angular_module.sTeamCollaborationPlatformApp
 * @description The notificationsCtrl handles the notifications View
 *              (prototype). In future updates of the website the notifications
 *              functions will be added.
 */
app.controller('notificationsCtrl', ['$scope', function ($scope) {
}]);
/**
 * @function messagesCtrl
 * @memberOf angular_module.sTeamCollaborationPlatformApp
 * @description The messagesCtrl handles the messaging View (Prototype). In
 *              future updates of the website the messaging functionalities will
 *              be added.
 */
app.controller('messagesCtrl', ['$scope', function ($scope) {	
}]);
/**
 * @function adminPanelCtrl
 * @memberOf angular_module.sTeamCollaborationPlatformApp
 * @description The adminPanelCtrl handles the Admin Panel functionalities
 *              (Prototype). In future updates of the website the Admin Panel
 *              functionalities will be added.
 */
app.controller('adminPanelCtrl', ['$scope', function ($scope) {	
    
}]);
/**
 * @function homeCtrl
 * @memberOf angular_module.sTeamCollaborationPlatformApp
 * @description Through the homeCtrl the user can navigate through the rooms of
 *              the platform. It also provides functions for creating new text
 *              document, updating text document, creating new room.
 */
app.controller('homeCtrl', ['$scope','$http','$routeParams','$location','steam','localStorageService',"$window",function ($scope,$http,$routeParams,$location,steam,localStorageService,$window) {
    $scope.myUrl='http://dev-back1.techgrind.asia/scripts/rest.pike?request=/home/'+$routeParams.paramiters;
    var userDetails=steam.user();
    $('#loadingBarModal').modal('show'); 
    /**
	 * @name $scope.saveText
	 * @function
	 * @memberOf angular_module.sTeamCollaborationPlatformApp.homeCtrl
	 * @description It creates a JQuery handler for Save Text Document button.
	 *              Using a Bootstrap property the state of the button is being
	 *              changed to Loading state. Next, by using JSON.stringify
	 *              function the text is transformed to JSON object with the
	 *              following form { content:text}(text that needs to be
	 *              stored). Also the request url is being prepared by using the
	 *              route parameters and is being sent via steam.post(request
	 *              url, {content:text}) to the server. According to the server
	 *              response, the corresponding messages appear. *
	 */
    $scope.saveText=function() {   
        var $btn = $("#btnSavaTextDocument");
        $btn.button('loading');
        var text=document.getElementById('saveTextContent').value;
        var data = JSON.stringify( { content:text});
        var request=/home/+$routeParams.paramiters;   
        steam.post(request, data).then(function(response) {
            $btn.button('reset')
            alert("The document was saved successfully.");
        }).catch(function(e){
            $btn.button('reset');
            alert("Error while saving the file");
     }); 
    }   
    /**
	 * @name $scope.createNewTextFile
	 * @function
	 * @memberOf angular_module.sTeamCollaborationPlatformApp.homeCtrl
	 * @description Function createNewTextFile, creates a JQuery handler for
	 *              create New Text File button. Using a Bootstrap property the
	 *              state of the button is being changed to Loading state. Next,
	 *              by using JSON.stringify function, the text is transformed to
	 *              JSON object with the following form { content:
	 *              newtxtContent, type: "Document" }. Also the request url is
	 *              being prepared by using the route parameters and is being
	 *              sent via steam.put(request url, { content: newtxtContent,
	 *              type: "Document" }) to the server. According to the server
	 *              response, the corresponding messages appear.
	 */
    $scope.createNewTextFile=function(){
        var $btn = $("#btnSavaNewTextDocument");
        $btn.button('loading');
        var data = JSON.stringify({content:$scope.newtxtContent,name:$scope.newtxtFileName, type:"Document" });
        var request="/home/"+$routeParams.paramiters+"/"+$scope.newtxtFileName;   
        steam.put(request, {content:$scope.newtxtContent,name:$scope.newtxtFileName, type:"Document" }).then(function(response) {
          $btn.button('reset');
          $('#createNewTextDocumentModal').modal('hide'); 
          alert("The file was successfully created.");
          //  $window.location.reload();
      }).catch(function(e){
        $btn.button('reset');
        alert("Error while creating the file");
     });
    }
    
    /**
	 * @name $scope.createRoom
	 * @function
	 * @memberOf angular_module.sTeamCollaborationPlatformApp.homeCtrl
	 * @description Function createRoom, creates a JQuery handler for create New
	 *              Room button. Using a Bootstrap property the state of the
	 *              button is being changed to Loading state. Next, by using
	 *              JSON.stringify function, ({ type: "Room" }) is being
	 *              transformed to JSON sting. Also the request url is being
	 *              prepared by using the route parameters (/home/
	 *              $routeParams.paramiters/roomName”) and there being sent via
	 *              steam.put(request url, { type: "Room" }) to the server.
	 *              According to the server response, the corresponding messages
	 *              appear.
	 */

    $scope.createRoom=function(){
        var $btn = $("#btnCreateRoom");
        $btn.button('loading');
        var data = JSON.stringify({ name:$scope.roomName,type:"Room" });
        var request="/home/"+$routeParams.paramiters+"/"+$scope.roomName;
        steam.put(request,data).then(function(response) {
            $btn.button('reset');
            $('#createRoomModal').modal('hide');
            alert("The room was successfully created.");
 //           $window.location.reload();
      }).catch(function(e){
            $btn.button('reset');
            alert("Error while creating the room");
     });
  }
    
   
    
  $scope.WebUrl = "http://dev-back1.techgrind.asia";

    if($routeParams.paramiters==null){
    

        $scope.RestQuery='/home/';
    }else{
        $scope.RestQuery='/home/'+$routeParams.paramiters;
    }
    steam.get($scope.RestQuery).then(function(response) {

        if(response.error!=null){
            $location.path('/error');
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
         $scope.createPathForNavigation();
        $('#loadingBarModal').modal('hide'); 
        }
    }).catch(function(e){
        $('#loadingBarModal').modal('hide');
        $location.path('/error');
        $window.location.reload();
     });
         /**
     * @name $scope.createPathForNavigation
     * @function
     * @memberOf angular_module.sTeamCollaborationPlatformApp.homeCtrl
     * @description The purpose of the createNavPath function, is to create the
     *              navigation pane content path. This is done by using the
     *              route parameters (if they exist) to get the room or document
     *              names that the user has visited. For each room or document
     *              names the proper url is being created and stored. For each
     *              room that the user has visited a JSON object (containing the
     *              name of the room or document and their path) is created and
     *              inserted in the scope array.
     * 
     */  
        $scope.createPathForNavigation=function() {   
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
    /**
	 * @name $scope.isHome
	 * @function
	 * @memberOf angular_module.sTeamCollaborationPlatformApp.homeCtrl
	 * @description he isHome function returns true if the user is in the root
	 *              Room. This function is used to present the buttons that
	 *              allow the user to create new text Document (a text document
	 * @returns {boolean} if the user is in the root Room
	 * 
	 */
      $scope.isHome=function(){
        return ($routeParams.paramiters==undefined);
    }
}]);
/**
 * @function navController
 * @memberOf angular_module.sTeamCollaborationPlatformApp
 * @description The navController controls the navigation bar. It displays and
 *              hides the menu elements accordingly, depending if the user is
 *              login the platform or not.
 */
app.controller('navController', ['$scope', '$location','steam',function ($scope,$location,steam) {
    /**
	 * @name $scope.setClass
	 * @function
	 * @memberOf angular_module.sTeamCollaborationPlatformApp.navController
	 * @description The setClass function is used for setting the class of a
	 *              menu item in active if the proportionate view is selected.. *
	 * @param {string}
	 *            The url of the menu item Description of parameter
	 * @returns {string} Return active if menu item path is same with the active
	 *          url.
	 */
        $scope.setClass = function(path) {    
            if ($location.path().substr(0, path.length) == path) {
                return "active"
            }else{
                return ""
            }
        }
         /**
		 * @name $scope.logOut
		 * @function
		 * @memberOf angular_module.sTeamCollaborationPlatformApp.navController
		 * @description The logout function is used for the logging off
		 *              functionality. It calls steam.logout function of steam
		 *              module that is responsible for the user log off. *
		 */
        $scope.logOut=function(){
         steam.logout();

        }
        /**
		 * @name $scope.isLogOut
		 * @function
		 * @memberOf angular_module.sTeamCollaborationPlatformApp.navController
		 * @description isLogOut function returns true if the user is log off
		 *              the platform and false if the user logged in the
		 *              platform. It is used for displaying and hiding menu
		 *              elements of the menu bar accordingly, depending if the
		 *              user is login the platform or not. *
		 * 
		 * @returns {boolean} Returns true if the user is logged out from the
		 *          platform
		 */
        $scope.isLogOut=function(){
        if(steam.loginp()==null||!steam.loginp()){
            return true;
        }else return false;            
    }        
    }]);