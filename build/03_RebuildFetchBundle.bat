mkdir "%~dp0/../src/picturepark-sdk-v1-fetch/dist"

cmd /c call "node_modules/.bin/tsc-bundle" "%~dp0/../src/picturepark-sdk-v1-fetch/src/index.ts" "%~dp0/../src/picturepark-sdk-v1-fetch/dist/picturepark.js" --globalNamespace picturepark --declaration

cmd /c call "node_modules/.bin/uglifyjs" --compress --mangle -o "%~dp0/../src/picturepark-sdk-v1-fetch/dist/picturepark.js" -- "%~dp0/../src/picturepark-sdk-v1-fetch/dist/picturepark.js"

REM Transform d.ts

cmd /c powershell "& {(Get-Content '%~dp0/../src/picturepark-sdk-v1-fetch/dist/picturepark.d.ts') | ForEach-Object { $_ -replace '/// <reference path=\"../src/es6-promise.d.ts\" />', '// Picturepark Fetch SDK declarations' } | Set-Content '%~dp0/../src/picturepark-sdk-v1-fetch/dist/picturepark.d.ts'}"

cmd /c powershell "& {(Get-Content '%~dp0/../src/picturepark-sdk-v1-fetch/dist/picturepark.d.ts') | ForEach-Object { $_ -replace '/// <reference path=\"../src/whatwg-fetch.d.ts\" />', '' } | Set-Content '%~dp0/../src/picturepark-sdk-v1-fetch/dist/picturepark.d.ts'}"

cmd /c powershell "& {(Get-Content '%~dp0/../src/picturepark-sdk-v1-fetch/dist/picturepark.d.ts') | ForEach-Object { $_ -replace 'declare module \"picturepark.services\"', 'declare module \"picturepark\"' } | Set-Content '%~dp0/../src/picturepark-sdk-v1-fetch/dist/picturepark.d.ts'}"

cmd /c powershell "& { [System.IO.File]::ReadAllText('%~dp0/../src/picturepark-sdk-v1-fetch/dist/picturepark.d.ts') -replace 'declare module \"index\" {[^,]*', '' | Set-Content '%~dp0/../src/picturepark-sdk-v1-fetch/dist/picturepark.d.ts'}"
