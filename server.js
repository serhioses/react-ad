const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.static('app'));

app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.listen(PORT, () => {
  console.log(`Express is listening on port ${PORT}`);
});
