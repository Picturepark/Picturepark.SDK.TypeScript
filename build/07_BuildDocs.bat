mkdir "%~dp0\..\docs\temp\"
 
copy /b/v/y "%~dp0\..\src\picturepark-sdk-v1-fetch\dist\picturepark.d.ts" "%~dp0\..\docs\temp\picturepark.d.ts"
copy /b/v/y "%~dp0\..\src\picturepark-sdk-v1-widgets\dist\picturepark-widgets.d.ts" "%~dp0\..\docs\temp\picturepark-widgets.d.ts"
copy /b/v/y "%~dp0\..\src\picturepark-sdk-v1-pickers\dist\picturepark-pickers.d.ts" "%~dp0\..\docs\temp\picturepark-pickers.d.ts"

REM Remove protected process*() methods
cmd /c powershell "& { [System.IO.File]::ReadAllText('%~dp0/../docs/temp/picturepark.d.ts') -replace 'protected process(.*?);', '' | Set-Content '%~dp0/../docs/temp/picturepark.d.ts'}"

cmd /c call "node_modules/.bin/typedoc" "%~dp0\..\docs\temp\picturepark.d.ts" --out "%~dp0\..\docs\picturepark-sdk-v1-fetch\api" --includeDeclarations --mode file --readme "%~dp0\..\docs\picturepark-sdk-v1-fetch\API.md" --theme default --name "picturepark-sdk-v1-fetch API"

cmd /c call "node_modules/.bin/typedoc" "%~dp0\..\docs\temp\picturepark-pickers.d.ts" --out "%~dp0\..\docs\picturepark-sdk-v1-pickers\api" --includeDeclarations --mode file --readme "%~dp0\..\docs\picturepark-sdk-v1-pickers\API.md" --theme default --name "picturepark-sdk-v1-pickers API"

cmd /c call "node_modules/.bin/typedoc" "%~dp0\..\docs\temp\picturepark-widgets.d.ts" --out "%~dp0\..\docs\picturepark-sdk-v1-widgets\api" --includeDeclarations --mode file --readme "%~dp0\..\docs\picturepark-sdk-v1-widgets\API.md" --theme default --name "picturepark-sdk-v1-widgets API"

pushd "%~dp0/../src/picturepark-sdk-v1-angular"
popd
cmd /c call "node_modules/.bin/typedoc" "%~dp0\..\src\picturepark-sdk-v1-angular\projects\picturepark-sdk-v1-angular\src\public_api.ts" --out "%~dp0\..\docs\picturepark-sdk-v1-angular\api" --mode file --readme "%~dp0\..\docs\picturepark-sdk-v1-angular\API.md" --theme default --tsconfig "%~dp0\..\src\picturepark-sdk-v1-angular\projects\picturepark-sdk-v1-angular\tsconfig.lib.json" --excludePrivate --name "@picturepark/sdk-v1-angular API"

rmdir "%~dp0\..\docs\temp\" /s /q