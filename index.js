const express = require('express');
const app = express();
const morgan = require("morgan");

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//Routes
const employee = require('./routes/employee');


app.get('/', (req, res) => {
  res.status(200);
  res.send('Bienvenido al Servidor');
});

app.use("/employee", employee);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server on port 3000');
});