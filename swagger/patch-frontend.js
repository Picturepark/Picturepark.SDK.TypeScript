const fs = require('fs')

try {
  const data = fs.readFileSync('./swagger/Frontend.json', 'utf8').trim();
  const schema = JSON.parse(data);
  const paths = schema.paths;
  const updatedPath = {};
  Object.keys(paths).forEach(pathKey => {
      const operations = {};
      Object.keys(paths[pathKey]).forEach(operationKey => {
          const operation = paths[pathKey][operationKey];
        if(operation.tags.includes("ShareAccess") || operation.tags.includes("TermsOfService")) {
            console.log(operation)
            operations[operationKey] = operation;
        }
      });
      if(Object.keys(operations).length) {
        updatedPath[pathKey] = operations;
      }
  });
  schema.paths = updatedPath;
  fs.writeFileSync('./swagger/Frontend.json', JSON.stringify(schema, undefined, '\t'), 'utf8');
} catch (err) {
  console.error(err)
}