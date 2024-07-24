const { execSync } = require('child_process');
const path = require('path');

const rootDir = __dirname;

const runTypeDoc = (src, tsconfig, out, readme, name) => {
  const cmd = `node_modules/.bin/typedoc "${src}" --tsconfig "${tsconfig}" --out "${out}" --readme "${readme}" --theme default --name "${name}"`;
  execSync(cmd, { stdio: 'inherit' });
};

runTypeDoc(
  path.join(rootDir, '../src/picturepark-sdk-v1-fetch/src/index.ts'),
  path.join(rootDir, '../src/picturepark-sdk-v1-fetch/tsconfig.json'),
  path.join(rootDir, '../docs/picturepark-sdk-v1-fetch/api'),
  path.join(rootDir, '../docs/picturepark-sdk-v1-fetch/API.md'),
  'picturepark-sdk-v1-fetch API'
);

runTypeDoc(
  path.join(rootDir, '../src/picturepark-sdk-v1-pickers/src/index.ts'),
  path.join(rootDir, '../src/picturepark-sdk-v1-pickers/tsconfig.json'),
  path.join(rootDir, '../docs/picturepark-sdk-v1-pickers/api'),
  path.join(rootDir, '../docs/picturepark-sdk-v1-pickers/API.md'),
  'picturepark-sdk-v1-pickers API'
);

runTypeDoc(
  path.join(rootDir, '../src/picturepark-sdk-v2-angular/projects/picturepark-sdk-v2-angular/src/public_api.ts'),
  path.join(rootDir, '../src/picturepark-sdk-v2-angular/projects/picturepark-sdk-v2-angular/tsconfig.lib.json'),
  path.join(rootDir, '../docs/picturepark-sdk-v2-angular/api'),
  path.join(rootDir, '../docs/picturepark-sdk-v2-angular/API.md'),
  'picturepark-sdk-v2-angular API'
);


// cmd /c call "node_modules/.bin/typedoc" "%~dp0\..\src\picturepark-sdk-v1-angular\projects\picturepark-sdk-v1-angular\src\public_api.ts" --out "%~dp0\..\docs\picturepark-sdk-v1-angular\api" --readme "%~dp0\..\docs\picturepark-sdk-v1-angular\API.md" --theme default --tsconfig "%~dp0\..\src\picturepark-sdk-v1-angular\projects\picturepark-sdk-v1-angular\tsconfig.lib.json" --excludePrivate --name "@picturepark/sdk-v1-angular API"
