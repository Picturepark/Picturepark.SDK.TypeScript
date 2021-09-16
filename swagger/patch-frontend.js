const fs = require('fs')

try {
  const data = fs.readFileSync('./swagger/Frontend.json', 'utf8').trim();
  console.log(JSON.parse(data))
} catch (err) {
  console.error(err)
}