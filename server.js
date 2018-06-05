const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.static('app'));

app.get('/*', (request, response) => {
  response.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Express is listening on port ${PORT}`);
});
