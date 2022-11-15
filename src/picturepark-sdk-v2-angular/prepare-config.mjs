import fs from 'fs';

const targetPath = './src/config.ts';
const sourcePath = './src/config-template.txt';
if (!fs.existsSync(targetPath)) {
  const data = fs.readFileSync(sourcePath);
  fs.writeFileSync(targetPath, data);
}
