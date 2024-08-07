try { 
	$customerInfo = Invoke-WebRequest "${Env:TestInstanceUrl}/service/info/customer" -Method Get -Headers @{ "Accept" = "application/json" } | ConvertFrom-Json
	
	${Env:TestCustomerId} = $customerInfo.CustomerId
	${Env:TestCustomerAlias} = $customerInfo.CustomerAlias

	$acr_values = "tenant:{""id"":""${Env:TestCustomerId}"",""alias"":""${Env:TestCustomerAlias}""}"

	$tokenParams = @{
		client_id     = ${Env:TestIdentityClientId};
		client_secret = ${Env:TestIdentitySecret};
		grant_type    = 'password';
		username      = ${Env:TestUsername};
		password      = ${Env:TestPassword};
		acr_values    = $acr_values;
		scope         = "openid profile picturepark_api all_scopes";
	}
	
	$result = Invoke-WebRequest ${Env:TestIdentityServer} -Method Post -Body $tokenParams | ConvertFrom-Json
	
	${Env:TestAccessToken} = $result.access_token
	
    if (!(Test-Path "$PSScriptRoot/../src/picturepark-sdk-v2-angular/projects/picturepark-sdk-v2-angular/src/tests/config.ts")) { 
        (Get-Content "$PSScriptRoot/../src/picturepark-sdk-v2-angular/projects/picturepark-sdk-v2-angular/src/tests/config.template.ts") | 
            ForEach-Object { $_ -replace "{Server}", "$env:TestApiServer" } | 
            ForEach-Object { $_ -replace "{Username}", "$env:TestUsername" } | 
            ForEach-Object { $_ -replace "{Password}", "$env:TestPassword" } | 
            ForEach-Object { $_ -replace "{AccessToken}", "$env:TestAccessToken" } | 
            ForEach-Object { $_ -replace "{CustomerAlias}", "$env:TestCustomerAlias" } | 
            Set-Content "$PSScriptRoot/../src/picturepark-sdk-v2-angular/projects/picturepark-sdk-v2-angular/src/tests/config.ts"
    }
} 
catch [Exception] { 
    "Failed to run unit tests: $_.Exception.Message at line $($_.InvocationInfo.ScriptLineNumber)" 
    $_.Exception.StackTrace 
    Exit 1 
}
