var ngAdminJWTAuthConfiguratorProvider = function() {
	var authConfigs = {
		_nonProtectedStates: ['login']
	};

	this.setJWTAuthURL = function(url){
		authConfigs._authUrl = url;
	};

	this.setCustomLoginTemplate = function(url) {
		authConfigs._customLoginTemplate = url;
	}

	this.setLoginSuccessCallback = function(callback) {
		authConfigs._loginSuccessCallback = callback;
	}

	this.setLoginErrorCallback = function(callback) {
		authConfigs._loginErrorCallback = callback;
	}

	this.setCustomAuthHeader = function(obj) {
		return authConfigs._customAuthHeader = obj;
	}

	this.setNonProtectedStates = function(states) {
		states.push('login');
		authConfigs._nonProtectedStates = states;
	}
	
  this.setCheckEveryResponseForAuthHeader = function() {
    authConfigs._checkEveryResponseForAuthHeader = true;
  }
  this.setAuthLoginKey = function(key) {
    authConfigs._authKey =  key;
  }
  this.setResponseTokenKey = function(key) {
    authConfigs._responseTokenKey =  key;
  }
  this.useJWTToken = function(key) {
    authConfigs._useJWT =  key;
  }
	this.$get = function() {
		return {
			getAuthURL: function(){
				return authConfigs._authUrl;
			},
			getCustomLoginTemplate: function() {
				return authConfigs._customLoginTemplate;
			},
			getLoginSuccessCallback: function() {
				return authConfigs._loginSuccessCallback;
			},
			getLoginErrorCallback: function() {
				return authConfigs._loginErrorCallback;
			},
			getCustomAuthHeader: function() {
				return authConfigs._customAuthHeader;
			},
			getNonProtectedStates: function() {
				return authConfigs._nonProtectedStates;
			},
      getCheckEveryResponseForAuthHeader: function() {
				return !!authConfigs._checkEveryResponseForAuthHeader;
			},
      getAuthLoginKey: function() {
				return authConfigs._authKey;
			},
      getResponseTokenKey: function() {
				return authConfigs._responseTokenKey;
			},
      useJWTToken: function() {
				return !!authConfigs._useJWT;
			},
		};
	}

};

module.exports = ngAdminJWTAuthConfiguratorProvider;
