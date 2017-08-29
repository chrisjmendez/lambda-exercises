/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
Filename: s3.jake
Date: 3/31/17
Author: Chris Mendez http://chrisjmendez.com
Dashboard Console: 
Docs: 
Description:
User Pool Aliases: http://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#user-pool-settings-aliases
Temp E-mail: https://www.mailinator.com/v2/inbox.jsp?zone=public&query=a
Temp SMS http://sms-receive.net/

* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **/

var util = require('util');

namespace('cognito', function () {
	desc('Run a.');
	task('idp', ['aws:loadCredentials'], { async: true }, function(user,pass) {		
		//Read ReadMe.md to learn how to create a .env file.
		var config = jake.Task["aws:loadCredentials"].value
		config.user = user || "b@mailinator.com";
		config.pass = pass || "Passw0rd";

		var cmds = [ util.format('aws cognito-idp admin-initiate-auth --user-pool-id %s --client-id %s --auth-flow ADMIN_NO_SRP_AUTH --auth-parameters USERNAME=%s,PASSWORD=%s --region %s --profile %s',
		config.pool_id, config.client_id, config.user, config.pass, config.region, config.profile) ];
		jake.exec(cmds, { printStdout: true });
	});
	

	desc('Create a new user with required parameters.');
	task('signup', ['aws:loadCredentials'], { async: true }, function(user,pass){
		//Read ReadMe.md to learn how to create a .env file.
		
		var config = jake.Task["aws:loadCredentials"].value
		config.user = user || "b@mailinator.com";
		config.pass = pass || "Passw0rd";

		// Make sure the params match the Pool Aliases
		var params = {
			email: config.user,
			phone_number: "+447397078059",
			birthdate: "01/05/1980",
			gender: "na",
			//custom parameter
			"custom:custom:newsletter": 1
		}
		var cmds = [ util.format('aws cognito-idp sign-up --client-id %s --username %s --password %s --user-attributes %s --region %s', config.client_id, config.user, config.pass, getAttributes(params), config.region) ];
		jake.exec(cmds, { printStdout: true });
	});	
});

// Create a string of custom attributes specifically for AWS Cognito Pools
function getAttributes(params){
	var attributes = ""
	for (var k in params){
		var attr = util.format("Name=%s,Value=%s ", k, params[k]);
		attributes += attr
	}
	return attributes;
}
