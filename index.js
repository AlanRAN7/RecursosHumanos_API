 //Dependencies
const express = require('express');
const morgan = require('morgan');
const app = express();

//Routers
const employee = require('./routes/employee');
const user = require('./routes/user');

// middleware
const cors = require('./middleware/cors');
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound')
const index = require('./middleware/index')

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', index);
app.use('/user', user);
// app.use(auth); 
app.use('/employee', employee);

// Error handling
app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server on port 3000');
});