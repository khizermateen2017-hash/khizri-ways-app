const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, '..', 'public', 'index.html');
let html = fs.readFileSync(indexHtmlPath, 'utf8');

// Replace absolute root paths with relative paths
html = html.replace(/href="\/assets\//g, 'href="assets/');
html = html.replace(/src="\/assets\//g, 'src="assets/');
html = html.replace(/href="\/css\//g, 'href="css/');
html = html.replace(/src="\/js\//g, 'src="js/');
html = html.replace(/href="\/uploads\//g, 'href="uploads/');
html = html.replace(/src="\/uploads\//g, 'src="uploads/');
html = html.replace(/href="\/admin"/g, 'href="admin.html"');

fs.writeFileSync(indexHtmlPath, html, 'utf8');
console.log('Successfully made index.html paths relative!');

// Also fix CSS background image if present
const cssPath = path.join(__dirname, '..', 'public', 'css', 'app.css');
let css = fs.readFileSync(cssPath, 'utf8');
css = css.replace(/url\('\/assets\//g, "url('../assets/");
css = css.replace(/url\("\/assets\//g, 'url("../assets/');
fs.writeFileSync(cssPath, css, 'utf8');
console.log('Successfully updated app.css asset paths!');

// Also fix JS uploads if present
const jsPath = path.join(__dirname, '..', 'public', 'js', 'app.js');
let js = fs.readFileSync(jsPath, 'utf8');
js = js.replace(/url:\s*'\/uploads\//g, "url: 'uploads/");
js = js.replace(/url:\s*"\/uploads\//g, 'url: "uploads/');
js = js.replace(/'\/uploads\//g, "'uploads/");
fs.writeFileSync(jsPath, js, 'utf8');
console.log('Successfully updated app.js asset paths!');
