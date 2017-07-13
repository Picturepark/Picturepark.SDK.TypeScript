cd "src/"
cd "picturepark-sdk-v1-angular"
cmd /c npm link
cd "../"

cd "picturepark-sdk-v1-angular-ui"
cmd /c npm link
cd "../"

cd "picturepark-sdk-v1-angular-ui"
cmd /c npm link @picturepark/sdk-v1-angular
cd "../"

cd "picturepark-sdk-v1-angular-app"
cmd /c npm link @picturepark/sdk-v1-angular
cmd /c npm link @picturepark/sdk-v1-angular-ui
cd "../"