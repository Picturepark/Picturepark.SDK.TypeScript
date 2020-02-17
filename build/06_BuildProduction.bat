pushd "%~dp0/../src/picturepark-sdk-v1-angular"
cmd /c call npm run init
cmd /c call npm run lint
cmd /c call npm run build-libraries
popd