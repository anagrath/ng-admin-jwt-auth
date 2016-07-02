var ngAdminJWTAuthService = function($http, jwtHelper, ngAdminJWTAuthConfigurator) { 
	
	return {
		authenticate: function(data, successCallback, errorCallback) {
			var url = ngAdminJWTAuthConfigurator.getAuthURL();
			var customAuthKey = ngAdminJWTAuthConfigurator.getAuthLoginKey();
			if (customAuthKey) {
        var login = data.login;
        delete data.login
        data[customAuthKey] = login;
      }
			return $http({
				url: url,
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				data: data
			}).then(function(response) {
				if(ngAdminJWTAuthConfigurator.useJWTToken())
        {
          var payload = jwtHelper.decodeToken(response.data.token);
  				localStorage.userRole = payload.role; 
        }
        
        var customResponseTokenKey = ngAdminJWTAuthConfigurator.getResponseTokenKey();
        if (customResponseTokenKey) {
          localStorage.userToken = response.data[customResponseTokenKey];  
        } else {
          localStorage.userToken = response.data.token;  
        }
				
				
				
				successCallback(response); 
				
				var customAuthHeader = ngAdminJWTAuthConfigurator.getCustomAuthHeader();
				if (customAuthHeader) {
					$http.defaults.headers.common[customAuthHeader.name] = customAuthHeader.template.replace('{{token}}', localStorage.userToken);
				} else {
					$http.defaults.headers.common.Authorization = 'Basic ' + localStorage.userToken;
				}
			} , errorCallback);
		},
		
		isAuthenticated: function() {
			var token = localStorage.userToken;
			if (!token) {
				return false;
			}
			if(ngAdminJWTAuthConfigurator.useJWTToken())
      {
        return jwtHelper.isTokenExpired(token) ? false : true;
      }
      return true;
		},
		
		logout: function() {
			localStorage.removeItem('userRole');
			localStorage.removeItem('userToken');
			return true;
		}
	}
	
};

ngAdminJWTAuthService.$inject = ['$http', 'jwtHelper', 'ngAdminJWTAuthConfigurator'];

module.exports = ngAdminJWTAuthService;