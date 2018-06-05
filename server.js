const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('app'));

app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.get('/*', (request, response) => {
  response.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Express is listening on port ${PORT}`);
});
