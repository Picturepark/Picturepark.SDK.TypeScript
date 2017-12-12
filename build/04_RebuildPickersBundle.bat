mkdir "%~dp0/../src/picturepark-sdk-v1-pickers/dist"

REM # Compile global bundle

cmd /c call "%~dp0/../node_modules/.bin/tsc-bundle" "%~dp0/../src/picturepark-sdk-v1-pickers/src/index.ts" "%~dp0/../src/picturepark-sdk-v1-pickers/dist/picturepark-pickers.js" --globalNamespace pictureparkPickers --declaration --allowJs

cmd /c powershell "& {(Get-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/picturepark-pickers.js') | ForEach-Object { $_ -replace ', \"promise.min\"', '' } | Set-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/picturepark-pickers.js'}"

cmd /c call "%~dp0/../node_modules/.bin/uglifyjs" --compress --mangle -o "%~dp0/../src/picturepark-sdk-v1-pickers/dist/picturepark-pickers.js" -- "%~dp0/../src/picturepark-sdk-v1-pickers/dist/picturepark-pickers.js"

REM ## Transform d.ts
cmd /c powershell "& {(Get-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/picturepark-pickers.d.ts') | ForEach-Object { $_ -replace '/// <reference path=\"../src/es6-promise.d.ts\" />', '// Picturepark Pickers SDK declarations' } | Set-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/picturepark-pickers.d.ts'}"

cmd /c powershell "& {(Get-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/picturepark-pickers.d.ts') | ForEach-Object { $_ -replace 'declare module \"index\"', 'declare module \"pictureparkPickers\"' } | Set-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/picturepark-pickers.d.ts'}"

cmd /c powershell "& {(Get-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/picturepark-pickers.d.ts') | ForEach-Object { $_ -replace 'import \"promise.min\";', '' } | Set-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/picturepark-pickers.d.ts'}"

REM # Compile AMD bundle

cmd /c call "%~dp0/../node_modules/.bin/tsc" "%~dp0/../src/picturepark-sdk-v1-pickers/src/index.ts" --outFile "%~dp0/../src/picturepark-sdk-v1-pickers/dist/amd/picturepark-pickers.js" --module amd --target "ES5" --lib "DOM,ES5,ScriptHost,ES2015.Promise" --declaration

cmd /c powershell "& { [System.IO.File]::ReadAllText('%~dp0/../src/picturepark-sdk-v1-pickers/dist/amd/picturepark-pickers.js') -replace 'define\(\"index\", \[\"require\", \"exports\", \"./promise.min.js\"\]', 'define([\"require\", \"exports\"]' | Set-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/amd/picturepark-pickers.js'}"

cmd /c call "%~dp0/../node_modules/.bin/uglifyjs" --compress --mangle -o "%~dp0/../src/picturepark-sdk-v1-pickers/dist/amd/picturepark-pickers.js" -- "%~dp0/../src/picturepark-sdk-v1-pickers/dist/amd/picturepark-pickers.js"

REM REM ## Transform AMD .d.ts

cmd /c powershell "& { [System.IO.File]::ReadAllText('%~dp0/../src/picturepark-sdk-v1-pickers/dist/amd/picturepark-pickers.d.ts') -replace 'declare module \"index\" \{', '' | Set-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/amd/picturepark-pickers.d.ts'}"

cmd /c powershell "& { [System.IO.File]::ReadAllText('%~dp0/../src/picturepark-sdk-v1-pickers/dist/amd/picturepark-pickers.d.ts') -replace 'import ''./promise.min.js'';', '' | Set-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/amd/picturepark-pickers.d.ts'}"

cmd /c powershell "& { [System.IO.File]::ReadAllText('%~dp0/../src/picturepark-sdk-v1-pickers/dist/amd/picturepark-pickers.d.ts') -replace '\r\n}\r\n', '' | Set-Content '%~dp0/../src/picturepark-sdk-v1-pickers/dist/amd/picturepark-pickers.d.ts'}"
