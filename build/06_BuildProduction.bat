pushd "%~dp0/../src/picturepark-sdk-v1-ng2"
cmd /c npm install
cmd /c "node_modules/.bin/ng" build --prod
popd

pushd "%~dp0/../src/picturepark-sdk-v1-ng2-ui"
cmd /c npm install
cmd /c "node_modules/.bin/ng" build --prod
popd

pushd "%~dp0/../src/picturepark-sdk-v1-ng2-app"
cmd /c npm install
cmd /c "node_modules/.bin/ng" build --prod
popd