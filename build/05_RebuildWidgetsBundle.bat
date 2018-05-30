mkdir "%~dp0/../src/picturepark-sdk-v1-widgets/dist"

cmd /c call "node_modules/.bin/tsc-bundle" "%~dp0/../src/picturepark-sdk-v1-widgets/src/index.ts" "%~dp0/../src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.js" --globalNamespace pictureparkWidgets --allowJs

cmd /c powershell "& {(Get-Content '%~dp0/../src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.js') | ForEach-Object { $_ -replace ', \"libraries/promise.min\", \"libraries/liquid.min\", \"./libraries/fetch.min.js\"', '' } | Set-Content '%~dp0/../src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.js'}"

REM Rename global Liquid to PictureparkLiquid
cmd /c powershell "& {(Get-Content '%~dp0/../src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.js') | ForEach-Object { $_ -replace 'Liquid', 'PictureparkLiquid' } | Set-Content '%~dp0/../src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.js'}"

REM Compress JS
REM cmd /c call "node_modules/.bin/uglifyjs" --compress --mangle -o "%~dp0/../src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.js" -- "%~dp0/../src/picturepark-sdk-v1-widgets/dist/picturepark-widgets.js"