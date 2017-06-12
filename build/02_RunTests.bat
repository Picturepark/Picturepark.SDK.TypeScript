pushd "%~dp0/../src/picturepark-sdk-v1-angular"
cmd /c npm install --loglevel=error
cmd /c call "node_modules/.bin/ng" test -w false
popd

pushd "%~dp0/../src/picturepark-sdk-v1-angular-ui"
cmd /c npm install --loglevel=error
cmd /c call "node_modules/.bin/ng" test -w false
popd

pushd "%~dp0/../src/picturepark-sdk-v1-angular-app"
cmd /c npm install --loglevel=error
cmd /c call "node_modules/.bin/ng" test -w false
popd