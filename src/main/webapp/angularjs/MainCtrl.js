function MainCtrl(Navigation, UserService, AboutService, $filter, $route, $routeParams, $scope, $location, $http) {

  $scope.UserService = UserService;
  $scope.login = UserService.login;
  $scope.isLoggedIn = false;
  
  $scope.AboutService = AboutService;
  $scope.about = AboutService.about;
  
  $scope.isIe = navigator.userAgent.indexOf('MSIE') >= 0;
  
  $scope.username = 'sysadmin';
  $scope.password = 'sysadmin';

  $scope.pageTitle = '';
  $scope.siteName = '';
  
  $scope.init = function() {
    $scope.initThemes();
  };
  
  $scope.setPageTitle = function(title) {
    $scope.pageTitle = title;
  };
  
  $scope.setSiteName = function(name) {
    $scope.siteName = name;
  };
  
  /* Login */
  $scope.$on('LoginChange', function(event, msg) {
    $scope.initLogin();
    
    // redirect to index page when logout
    if ($scope.login) {
      if (!$scope.login.isLoggedIn) {
        if ($location.url() == '/manage') {
          $location.url('/');
        }
      }
    }
  });
  
  $scope.initLogin = function() {
    $scope.login = UserService.login;
    if (!$scope.login) {
      $scope.isLoggedIn = false;
    } else {
      $scope.isLoggedIn = $scope.login.isLoggedIn;
    }
  };
  
  $scope.doLogin = function() {
    console.log('doLogin -->');
    if (this.username && this.password) {
      var _form = jQuery('#loginForm');
      if (_form.length > 0) {
        if ($scope.isIe) UserService.doLogin(_form);
        else UserService.doLogin(_form);
      }
    }
  };
  
  $scope.doLogout = function() {
    console.log('doLogout -->');
    UserService.doLogout();
  };
  
  /* About */
  $scope.$on('AboutLoaded', function(event, msg) {
    $scope.initAbout();
  });
  
  $scope.initAbout = function() {
    $scope.about = AboutService.about;
    
    var name = $scope.about.name;
    $scope.setPageTitle(name);
    $scope.setSiteName(name);
  };
  
  /* Themes */
  $scope.initThemes = function() {
    $scope.themes = ["default", "amelia", "cerulean", "cosmo", "cyborg", "flatly", "journal", "readable", "simplex", "slate", "spacelab", "united"]; // zero-index
    $scope.themeIndex = 7; // set initial theme index
    if ($scope.isIe) {
      $scope.themes = _.without($scope.themes, "cerulean", "slate", "spacelab");
      $scope.themeIndex = 6;
    }
    $scope.themeCount = $scope.themes.length;
    
    if ($scope.themeIndex >= $scope.themeCount) {
      $scope.themeIndex = 0;
    }
    if ($scope.themeCount > 0) {
      $scope.theme = $scope.themes[$scope.themeIndex];
    }
  };
  
  $scope.setTheme = function(theme) {
    $scope.theme = theme;
  };
  
  /**
   * Register below method to ng-click in order to have the theme change on a click of a button.
   */
  $scope.changeTheme = function() {
    $scope.themeIndex = $scope.themeIndex + 1;
    if ($scope.themeIndex >= $scope.themeCount) {
      $scope.themeIndex = 0;
    }
    $scope.setTheme($scope.themes[$scope.themeIndex]);
  };

  /* Misc */
  $scope.getBadgeClass = function(region) {
    region = $filter('lowercase')(region);
    if (region == 'central') return 'label-primary';
    if (region == 'eastern') return 'label-success';
    if (region == 'northern') return 'label-info';
    if (region == 'southern') return 'label-warning';
    if (region == 'western') return 'label-danger';
    if (region == 'sabah') return 'label-danger';
    if (region == 'sarawak') return 'label-default';
    return 'label-default';
  };
  $scope.getAlertClass = function(status) {
    status = $filter('uppercase')(status);
    if (status == 'OK') return 'alert-success';
    if (status == 'FAIL') return 'alert-danger';
    return 'alert-warning';
  };
}