const express = require('express');
const res = require('express/lib/response');
const app = express();

app.get('/', (req, res) => {
  res.status(200);
  res.send('Bienvenido al Servidor');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server on port 3000');
});