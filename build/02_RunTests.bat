pushd "%~dp0/../src/picturepark-sdk-v1-angular"
cmd /c call "node_modules/.bin/ng" test --watch=false || goto :error
popd

REM pushd "%~dp0/../src/picturepark-sdk-v1-angular-ui"
REM cmd /c call "node_modules/.bin/ng" test --watch=false || goto :error
REM popd

REM pushd "%~dp0/../src/picturepark-sdk-v1-angular-app"
REM cmd /c call "node_modules/.bin/ng" test --watch=false || goto :error
REM popd

goto :EOF
:error
echo Failed with error #%errorlevel%.
exit /b %errorlevel%