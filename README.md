# ng-admin-loopback-auth
Small module that allows authorization with loopback server.  This was forked from ng-admin-jwt-auth, and then modified.

Below is the original readme file.  What was added was a few extra config lines that will allow use with loopback.
where auth = NgAdminConfigurationProvider
<pre>
  auth.setJWTAuthURL("/api/users/login")
  auth.setCustomAuthHeader {name: 'Authorization', template: '{{token}}'}
  auth.setAuthLoginKey 'email'
  auth.setResponseTokenKey 'id'
  auth.useJWTToken false
</pre>

<h3>Demo</h3>
https://github.com/akagadovskiy/ng-admin-jwt-auth-demoapp
<h3>Usage example:</h3>
1) Include .js file to your index.html <br>
2) Include module in your application<br>
<pre> var app = angular.module('myApp', ['ng-admin', 'ng-admin.jwt-auth']);</pre>
3) Set full url to your authorization point: 
<pre>
    app.config(['NgAdminConfigurationProvider', 'RestangularProvider', 'ngAdminJWTAuthConfiguratorProvider', 
      function (NgAdminConfigurationProvider, RestangularProvider, <b>ngAdminJWTAuthConfigurator</b>) {
        var nga = NgAdminConfigurationProvider;
		    ngAdminJWTAuthConfigurator.setJWTAuthURL('http://localhost:3001/login');
        ...
</pre>

That's all, authorization configured!

API reference:
<ul>
  <li>
    setJWTAuthURL(fullUrl)
<pre>
ngAdminJWTAuthConfigurator.setJWTAuthURL('http://localhost:3001/login');
</pre>
  </li>
  <li>
    setCustomLoginTemplate(templateUrl):
<pre>
ngAdminJWTAuthConfigurator.setCustomLoginTemplate('customLoginTemplate.html');
</pre>
  </li>
    <li>
      <p>setCustomAuthHeader(obj) - configure custom headers. By defauls authorization header is 'Authorization' and field
      'Basic' adds for token. Final template of default authorization header is - Authorization: Basic {{token}}. You need to modify 
      token template and replace 'Basic' by 'Bearer'. Here is an example:
        
      </p>
      
<pre>
ngAdminJWTAuthConfigurator.setCustomAuthHeader({
	name: 'Authorization',
	template: 'Bearer {{token}}'
});

</pre>
  </li>
  <li>
  	ngAdminJWTAuthConfigurator.setLoginSuccessCallback(callback) - adds callback that fires on successfull 			authentication with preserving default authentication proccess. Note that it's just <b>adds</b>, not replaces behaviour
  </li>

  <li>
  	ngAdminJWTAuthConfigurator.setLoginErrorCallback(callback) - adds error callback
  </ll>
</ul>

<h3>Contribution</h3>
1) make install <br>
2) make run - runs browserify build and watcher
<h2>TODO:</h2>
<ul>
<li>Create roles configuration in ng-admin module</li>
<li>Integrate role-based system to ng-admin.jwt-auth</li>
</ul>

<h3> Change Log</h3>
### Added: 
1) ngAdminJWTAuthConfigurator.setNonProtectedStates(['custom/route']) - you can set up routes that are allowed to use without authentication. <b>Important</b>: you can use only custom urls. If you want to use CRUD url of some entity like tags/show/5 it will not work. 
