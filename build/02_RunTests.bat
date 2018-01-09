pushd "%~dp0/../src/picturepark-sdk-v1-angular"
cmd /c call npm run test-nowatch || goto :error
popd

goto :EOF
:error
echo Failed with error #%errorlevel%.
exit /b %errorlevel%