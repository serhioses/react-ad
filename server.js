const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('app/dist/'));

app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.get('*', (request, response) => {
  // response.redirect('/');
  response.sendFile('index.html', { root: path.resolve(__dirname, 'app') });
});

app.listen(PORT, () => {
  console.log(`Express is listening on port ${PORT}`);
});
