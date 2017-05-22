pushd "%~dp0/../src/picturepark-sdk-v1-ng2"
cmd /c npm install
cmd /c ng test -w false
popd

pushd "%~dp0/../src/picturepark-sdk-v1-ng2-ui"
cmd /c npm install
cmd /c ng test -w false
popd

pushd "%~dp0/../src/picturepark-sdk-v1-ng2-app"
cmd /c npm install
cmd /c ng test -w false
popd