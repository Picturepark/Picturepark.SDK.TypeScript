mkdir "%~dp0/../src/picturepark-sdk-v1-pickers/dist"

cmd /c call "node_modules/.bin/tsc-bundle" "%~dp0/../src/picturepark-sdk-v1-pickers/src/index.ts" "%~dp0/../src/picturepark-sdk-v1-pickers/dist/bundle.js" --globalNamespace pictureparkPickers --declaration --allowJs

cmd /c powershell "& {(Get-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/bundle.js') | ForEach-Object { $_ -replace ', \"promise.min\"', '' } | Set-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/bundle.js'}"

REM Compress JS
cmd /c call "node_modules/.bin/uglifyjs" --compress --mangle -o "%~dp0/../src/picturepark-sdk-v1-pickers/dist/bundle.js" -- "%~dp0/../src/picturepark-sdk-v1-pickers/dist/bundle.js"

REM Transform d.ts
cmd /c powershell "& {(Get-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/bundle.d.ts') | ForEach-Object { $_ -replace '/// <reference path=\"../src/es6-promise.d.ts\" />', '// Picturepark Pickers SDK declarations' } | Set-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/bundle.d.ts'}"

cmd /c powershell "& {(Get-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/bundle.d.ts') | ForEach-Object { $_ -replace 'declare module \"index\"', 'declare module \"pictureparkPickers\"' } | Set-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/bundle.d.ts'}"

cmd /c powershell "& {(Get-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/bundle.d.ts') | ForEach-Object { $_ -replace 'import ''promise.min.js'';', '' } | Set-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/bundle.d.ts'}"