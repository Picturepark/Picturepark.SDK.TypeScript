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
