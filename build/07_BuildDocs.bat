cmd /c call "node_modules/.bin/typedoc" "%~dp0\..\src\picturepark-sdk-v1-fetch\src\index.ts" --tsconfig  "%~dp0\..\src\picturepark-sdk-v1-fetch\tsconfig.json" --out "%~dp0\..\docs\picturepark-sdk-v1-fetch\api" --readme "%~dp0\..\docs\picturepark-sdk-v1-fetch\API.md" --theme default --name "picturepark-sdk-v1-fetch API"
cmd /c call "node_modules/.bin/typedoc" "%~dp0\..\src\picturepark-sdk-v1-pickers\src\index.ts" --tsconfig  "%~dp0\..\src\picturepark-sdk-v1-pickers\tsconfig.json" --out "%~dp0\..\docs\picturepark-sdk-v1-pickers\api" --readme "%~dp0\..\docs\picturepark-sdk-v1-pickers\API.md" --theme default --name "picturepark-sdk-v1-pickers API"

pushd "%~dp0/../src/picturepark-sdk-v1-angular"
popd
cmd /c call "node_modules/.bin/typedoc" "%~dp0\..\src\picturepark-sdk-v1-angular\projects\picturepark-sdk-v1-angular\src\public_api.ts" --out "%~dp0\..\docs\picturepark-sdk-v1-angular\api" --readme "%~dp0\..\docs\picturepark-sdk-v1-angular\API.md" --theme default --tsconfig "%~dp0\..\src\picturepark-sdk-v1-angular\projects\picturepark-sdk-v1-angular\tsconfig.lib.json" --excludePrivate --name "@picturepark/sdk-v1-angular API"
