const express = require('express');
const app = express();
const morgan = require('morgan');

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//Routes
const employee = require('./routes/employee');
const user = require('./routes/user');

app.get('/', (req, res) => {
  return res.status(200).send({code: 200, message: "Bienvenido al Servidor"});
});

app.use('/employee', employee);
app.use('/user', user);

app.use((req, res, next) =>{
    return res.status(404).json({code: 404, message: "URL no encontrada"});
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server on port 3000');
});