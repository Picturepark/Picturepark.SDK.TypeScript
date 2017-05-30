mkdir "%~dp0/../src/picturepark-sdk-v1-widgets/dist"

cmd /c call "node_modules/.bin/tsc-bundle" "%~dp0/../src/picturepark-sdk-v1-widgets/src/index.ts" "%~dp0/../src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.js" --globalNamespace pictureparkWidgets --declaration --allowJs

cmd /c powershell "& {(Get-Content '%~dp0/../src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.js') | ForEach-Object { $_ -replace ', \"liquid.min\", \"promise.min\", \"./fetch.min.js\"', '' } | Set-Content '%~dp0/../src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.js'}"

REM Rename global Liquid to PictureparkLiquid
cmd /c powershell "& {(Get-Content '%~dp0/../src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.js') | ForEach-Object { $_ -replace 'Liquid', 'PictureparkLiquid' } | Set-Content '%~dp0/../src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.js'}"

REM Compress JS
cmd /c call "node_modules/.bin/uglifyjs" --compress --mangle -o "%~dp0/../src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.js" -- "%~dp0/../src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.js"

REM Transform d.ts
cmd /c powershell "& {(Get-Content '%~dp0/../src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.d.ts') | ForEach-Object { $_ -replace '/// <reference path=\"../src/es6-promise.d.ts\" />', '// Picturepark Widgets SDK declarations' } | Set-Content '%~dp0/../src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.d.ts'}"

cmd /c powershell "& {(Get-Content '%~dp0/../src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.d.ts') | ForEach-Object { $_ -replace 'declare module \"index\"', 'declare module \"pictureparkWidgets\"' } | Set-Content '%~dp0/../src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.d.ts'}"

cmd /c powershell "& {(Get-Content '%~dp0/../src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.d.ts') | ForEach-Object { $_ -replace 'import \"liquid.min\";', '' } | Set-Content '%~dp0/../src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.d.ts'}"

cmd /c powershell "& {(Get-Content '%~dp0/../src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.d.ts') | ForEach-Object { $_ -replace 'import \"promise.min\";', '' } | Set-Content '%~dp0/../src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.d.ts'}"

cmd /c powershell "& {(Get-Content '%~dp0/../src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.d.ts') | ForEach-Object { $_ -replace 'import ''./fetch.min.js'';', '' } | Set-Content '%~dp0/../src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.d.ts'}"