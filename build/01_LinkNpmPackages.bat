cd "src/"
cd "picturepark-sdk-v1-angular/src"
cmd /c npm link
cd "../../"

cd "picturepark-sdk-v1-angular-ui/src"
cmd /c npm link
cd "../../"

cd "picturepark-sdk-v1-angular-ui"
cmd /c npm link @picturepark/sdk-v1-angular
cd "../"

cd "picturepark-sdk-v1-angular-app"
cmd /c npm link @picturepark/sdk-v1-angular
cmd /c npm link @picturepark/sdk-v1-angular-ui
cd "../"

cmd /c rmdir "picturepark-sdk-v1-angular/src/node_modules" /s /q
cmd /c rmdir "picturepark-sdk-v1-angular-ui/src/node_modules" /s /q