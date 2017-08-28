mkdir "%~dp0/../src/picturepark-sdk-v1-pickers/dist"

cmd /c call "node_modules/.bin/tsc-bundle" "%~dp0/../src/picturepark-sdk-v1-pickers/src/index.ts" "%~dp0/../src/picturepark-sdk-v1-pickers/dist/picturepark-pickers.js" --globalNamespace pictureparkPickers --declaration --allowJs

cmd /c powershell "& {(Get-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/picturepark-pickers.js') | ForEach-Object { $_ -replace ', \"promise.min\"', '' } | Set-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/picturepark-pickers.js'}"

REM Compress JS
cmd /c call "node_modules/.bin/uglifyjs" --compress --mangle -o "%~dp0/../src/picturepark-sdk-v1-pickers/dist/picturepark-pickers.js" -- "%~dp0/../src/picturepark-sdk-v1-pickers/dist/picturepark-pickers.js"

REM Transform d.ts
cmd /c powershell "& {(Get-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/picturepark-pickers.d.ts') | ForEach-Object { $_ -replace '/// <reference path=\"../src/es6-promise.d.ts\" />', '// Picturepark Pickers SDK declarations' } | Set-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/picturepark-pickers.d.ts'}"

cmd /c powershell "& {(Get-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/picturepark-pickers.d.ts') | ForEach-Object { $_ -replace 'declare module \"index\"', 'declare module \"pictureparkPickers\"' } | Set-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/picturepark-pickers.d.ts'}"

cmd /c powershell "& {(Get-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/picturepark-pickers.d.ts') | ForEach-Object { $_ -replace 'import \"promise.min\";', '' } | Set-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/picturepark-pickers.d.ts'}"