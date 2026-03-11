const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');
let lines = css.split('\n');
lines.splice(0, 350);
fs.writeFileSync('css/style.css', lines.join('\n'));
console.log('Successfully clipped first 350 duplicate lines from style.css');
