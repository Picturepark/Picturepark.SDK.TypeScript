mkdir "%~dp0\..\docs\temp\"
 
copy /b/v/y "%~dp0\..\src\picturepark-sdk-v1-fetch\dist\bundle.d.ts" "%~dp0\..\docs\temp\picturepark.d.ts"
copy /b/v/y "%~dp0\..\src\picturepark-sdk-v1-widgets\dist\bundle.d.ts" "%~dp0\..\docs\temp\pictureparkWidgets.d.ts"

REM Remove protected process*() methods
cmd /c powershell "& { [System.IO.File]::ReadAllText('%~dp0/../docs/temp/picturepark.d.ts') -replace 'protected process(.*?);', '' | Set-Content '%~dp0/../docs/temp/picturepark.d.ts'}"

cmd /c call "node_modules/.bin/typedoc" "%~dp0\..\docs\temp\picturepark.d.ts" --out "%~dp0\..\docs\picturepark-sdk-v1-fetch\api" --includeDeclarations --mode file --readme "%~dp0\..\docs\picturepark-sdk-v1-fetch\API.md" --theme default --name "picturepark-sdk-v1-fetch API"

cmd /c call "node_modules/.bin/typedoc" "%~dp0\..\docs\temp\pictureparkWidgets.d.ts" --out "%~dp0\..\docs\picturepark-sdk-v1-widgets\api" --includeDeclarations --mode file --readme "%~dp0\..\docs\picturepark-sdk-v1-widgets\API.md" --theme default --name "picturepark-sdk-v1-widgets API"

cmd /c call "node_modules/.bin/typedoc" "%~dp0\..\src\picturepark-sdk-v1-ng2\src" --out "%~dp0\..\docs\picturepark-sdk-v1-ng2\api" --mode file --readme "%~dp0\..\docs\picturepark-sdk-v1-ng2\API.md" --theme default --tsconfig "%~dp0\..\src\picturepark-sdk-v1-ng2\src\tsconfig.app.json" --excludePrivate --name "picturepark-sdk-v1-ng2 API"

rmdir "%~dp0\..\docs\temp\" /s /q