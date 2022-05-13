import fs from 'fs';
import mergeSCSS from '@highpoint/merge-scss';
import replaceInFile from 'replace-in-file';

const scss = await mergeSCSS('./projects/picturepark-sdk-v2-angular-ui/src/lib/theming/_theming.scss');
fs.writeFileSync('./dist/picturepark-sdk-v2-angular-ui/_theming.scss', scss);

replaceInFile.replaceInFileSync({
  files: './dist/picturepark-sdk-v2-angular-ui/_theming.scss',
  from: /@use '@angular\/material' as mat;/g,
  countMatches: true,
  to: '',
});
