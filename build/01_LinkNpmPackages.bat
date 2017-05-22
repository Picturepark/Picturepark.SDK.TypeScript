cd "src/"
cd "picturepark-sdk-v1-ng2/src"
cmd /c npm link
cd "../../"

cd "picturepark-sdk-v1-ng2-ui/src"
cmd /c npm link
cd "../../"

cd "picturepark-sdk-v1-ng2-ui"
cmd /c npm link picturepark-sdk-v1-ng2
cd "../"

cd "picturepark-sdk-v1-ng2-app"
cmd /c npm link picturepark-sdk-v1-ng2
cmd /c npm link picturepark-sdk-v1-ng2-ui
cd "../"