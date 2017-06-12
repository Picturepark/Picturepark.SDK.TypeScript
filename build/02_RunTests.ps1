if (!(Test-Path "$PSScriptRoot/../src/picturepark-sdk-v1-angular/src/tests/config.ts")) { 
	(Get-Content "$PSScriptRoot/../src/picturepark-sdk-v1-angular/src/tests/config.template.ts") | 
	ForEach-Object { $_ -replace "{Server}", "$env:TestServer" } | 
	ForEach-Object { $_ -replace "{Username}", "$env:TestUsername" } | 
	ForEach-Object { $_ -replace "{Password}", "$env:TestPassword" } | 
	Set-Content "$PSScriptRoot/../src/picturepark-sdk-v1-angular/src/tests/config.ts"
}

cmd /c "$PSScriptRoot/02_RunTests.bat"