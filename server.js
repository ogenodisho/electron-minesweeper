const express = require('express');

// compile sass into css
const fs = require('fs');
const sass = require('node-sass');
var result = sass.renderSync({file: './assets/scss/style.scss'});
fs.writeFile('./assets/css/style.css', result.css, function(err) {
  if(!err){
    console.log("scss file compiled and written to disk")
  }
});

const app = express();

app.use(express.static(__dirname));

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 3000);
