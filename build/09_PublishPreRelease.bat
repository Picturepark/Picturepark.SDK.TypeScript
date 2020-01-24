cmd /c call npm publish "%~dp0\..\src\picturepark-sdk-v1-angular\dist\picturepark-sdk-v1-angular" --tag=pre --access=public
cmd /c call npm publish "%~dp0\..\src\picturepark-sdk-v1-angular\dist\picturepark-sdk-v1-angular-oidc" --tag=pre --access=public
cmd /c call npm publish "%~dp0\..\src\picturepark-sdk-v1-angular\dist\picturepark-sdk-v1-angular-ui" --tag=pre --access=public
cmd /c call npm publish "%~dp0\..\src\picturepark-sdk-v1-fetch" --tag=pre --access=public
cmd /c call npm publish "%~dp0\..\src\picturepark-sdk-v1-pickers" --tag=pre --access=public