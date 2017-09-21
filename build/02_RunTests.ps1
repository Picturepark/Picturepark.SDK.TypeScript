try { 
    $tokenParams = @{
		client_id     = ${Env:TestIdentityClientId};
		client_secret = ${Env:TestIdentitySecret};
		grant_type    = 'password';
		username      = ${Env:TestUsername};
		password      = ${Env:TestPassword};
	}
	
	$AllProtocols = [System.Net.SecurityProtocolType]'Ssl3,Tls,Tls11,Tls12'
	[System.Net.ServicePointManager]::SecurityProtocol = $AllProtocols
	
	$result = Invoke-WebRequest ${Env:TestIdentityServer} -Method Post -Body $tokenParams | ConvertFrom-Json
	
	${Env:TestAccessToken} = $result.access_token
	
    if (!(Test-Path "$PSScriptRoot/../src/picturepark-sdk-v1-angular/src/tests/config.ts")) { 
        (Get-Content "$PSScriptRoot/../src/picturepark-sdk-v1-angular/src/tests/config.template.ts") | 
            ForEach-Object { $_ -replace "{Server}", "$env:TestServer" } | 
            ForEach-Object { $_ -replace "{Username}", "$env:TestUsername" } | 
            ForEach-Object { $_ -replace "{Password}", "$env:TestPassword" } | 
            ForEach-Object { $_ -replace "{AccessToken}", "$env:TestAccessToken" } | 
            ForEach-Object { $_ -replace "{CustomerAlias}", "$env:TestCustomerAlias" } | 
            Set-Content "$PSScriptRoot/../src/picturepark-sdk-v1-angular/src/tests/config.ts"
    }
    
    cmd /c "$PSScriptRoot/02_RunTests.bat"
    if ($lastexitcode -ne 0) {
        throw "Failed to run unit tests"
    }    
} 
catch [Exception] { 
    "Failed to run unit tests: $_.Exception.Message" 
    $_.Exception.StackTrace 
    Exit 1 
}
