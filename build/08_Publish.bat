cmd /c call npm publish "%~dp0\..\src\picturepark-sdk-v1-angular\dist" --access=public
cmd /c call npm publish "%~dp0\..\src\picturepark-sdk-v1-angular-oidc\dist" --access=public
cmd /c call npm publish "%~dp0\..\src\picturepark-sdk-v1-angular-ui\dist" --access=public
cmd /c call npm publish "%~dp0\..\src\picturepark-sdk-v1-fetch" --access=public
cmd /c call npm publish "%~dp0\..\src\picturepark-sdk-v1-pickers" --access=public