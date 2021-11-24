/* eslint-env es6 */
const fs = require('fs');
const postcss = require('postcss');
const easyImport = require('postcss-easy-import');
const scssSyntax = require('postcss-scss');
const stripInlineComments = require('postcss-strip-inline-comments');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

const postcssConfig = [
  easyImport({
    extensions: ['.css', '.scss'],
    prefix: '_',
  }),
  stripInlineComments,
];

const mergeSCSS = fileIn =>
  new Promise((resolve, reject) => {
    readFileAsync(fileIn, 'utf8')
      .then(data =>
        postcss(postcssConfig).process(data, {
          from: fileIn,
          parser: scssSyntax,
        })
      )
      .then(({ css }) => resolve(css))
      .catch(e => reject(e));
  });

mergeSCSS('./projects/picturepark-sdk-v2-angular-ui/src/lib/theming/_theming.scss')
  .then(scss => fs.writeFileSync('./dist/picturepark-sdk-v2-angular-ui/_theming.scss', scss))
  .catch(console.error);
