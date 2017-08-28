mkdir "%~dp0/../src/picturepark-sdk-v1-fetch/dist"

REM # Compile global bundle

cmd /c call "%~dp0/../node_modules/.bin/tsc-bundle" "%~dp0/../src/picturepark-sdk-v1-fetch/src/index.ts" "%~dp0/../src/picturepark-sdk-v1-fetch/dist/picturepark.js" --globalNamespace picturepark --declaration --target "ES5" --lib "DOM,ES5,ScriptHost,ES2015.Promise"

cmd /c call "%~dp0/../node_modules/.bin/uglifyjs" --compress --mangle -o "%~dp0/../src/picturepark-sdk-v1-fetch/dist/picturepark.js" -- "%~dp0/../src/picturepark-sdk-v1-fetch/dist/picturepark.js"

REM ## Transform global .d.ts

cmd /c powershell "& {(Get-Content '%~dp0/../src/picturepark-sdk-v1-fetch/dist/picturepark.d.ts') | ForEach-Object { $_ -replace '/// <reference path=\"../src/es6-promise.d.ts\" />', '// Picturepark Fetch SDK declarations' } | Set-Content '%~dp0/../src/picturepark-sdk-v1-fetch/dist/picturepark.d.ts'}"

cmd /c powershell "& {(Get-Content '%~dp0/../src/picturepark-sdk-v1-fetch/dist/picturepark.d.ts') | ForEach-Object { $_ -replace '/// <reference path=\"../src/whatwg-fetch.d.ts\" />', '' } | Set-Content '%~dp0/../src/picturepark-sdk-v1-fetch/dist/picturepark.d.ts'}"

cmd /c powershell "& {(Get-Content '%~dp0/../src/picturepark-sdk-v1-fetch/dist/picturepark.d.ts') | ForEach-Object { $_ -replace 'declare module \"index\"', 'declare module \"picturepark\"' } | Set-Content '%~dp0/../src/picturepark-sdk-v1-fetch/dist/picturepark.d.ts'}"

REM # Compile AMD bundle

cmd /c call "%~dp0/../node_modules/.bin/tsc" "%~dp0/../src/picturepark-sdk-v1-fetch/src/index.ts" --outFile "%~dp0/../src/picturepark-sdk-v1-fetch/dist/amd/picturepark.js" --module amd --target "ES5" --lib "DOM,ES5,ScriptHost,ES2015.Promise" --declaration

cmd /c powershell "& { [System.IO.File]::ReadAllText('%~dp0/../src/picturepark-sdk-v1-fetch/dist/amd/picturepark.js') -replace 'define\(\"index\", \[', 'define([' | Set-Content '%~dp0/../src/picturepark-sdk-v1-fetch/dist/amd/picturepark.js'}"

cmd /c call "%~dp0/../node_modules/.bin/uglifyjs" --compress --mangle -o "%~dp0/../src/picturepark-sdk-v1-fetch/dist/amd/picturepark.js" -- "%~dp0/../src/picturepark-sdk-v1-fetch/dist/amd/picturepark.js"

REM ## Transform global .d.ts

cmd /c powershell "& { [System.IO.File]::ReadAllText('%~dp0/../src/picturepark-sdk-v1-fetch/dist/amd/picturepark.d.ts') -replace 'declare module \"index\" \{', '' | Set-Content '%~dp0/../src/picturepark-sdk-v1-fetch/dist/amd/picturepark.d.ts'}"

cmd /c powershell "& { [System.IO.File]::ReadAllText('%~dp0/../src/picturepark-sdk-v1-fetch/dist/amd/picturepark.d.ts') -replace '\r\n}\r\n', '' | Set-Content '%~dp0/../src/picturepark-sdk-v1-fetch/dist/amd/picturepark.d.ts'}"
