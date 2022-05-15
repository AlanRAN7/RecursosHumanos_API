const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router();
const db = require('../config/database');

user.post('/signin', async (req,res,next) => {
  const { user_name, user_email, user_password } = req.body;
  if (user_name && user_email && user_password) {
    let query = "INSERT INTO user (user_name, user_email, user_password) ";
    query += `VALUES('${user_name}', '${user_email}', '${user_password}');`;

    const rows = await db.query(query);
  
    if (rows.affectedRows == 1) {
      return res.status(201).json({ code: 201, message: "Usuario agregado correctamente"});
    }
    return res.status(500).json({ code: 500, message: "Ocurrió un error" });
  }
  return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

user.post('/login', async (req,res,next) => {
  const { user_email, user_password } = req.body;
  const query = `SELECT * FROM user WHERE user_email='${user_email}' AND user_password='${user_password}';`;
  const rows = await db.query(query);
  
  if(user_email && user_password) {
    if(rows.length == 1) {
      const token = jwt.sign({ 
        id_user: rows[0].id_user,
        user_email: rows[0].user_email 
      }, 'debugkey');
      return res.status(200).json({ code: 200, message: token });
    } else {
      return res.status(200).json({ code: 401, message: "Usuario y/o contraseña incorrectos" });
    }
  }
  return res.status(500).json({code: 500, message: "Campos incompletos"})
});

user.get('/', async (req, res, next) =>{
  const emp = await db.query("SELECT * FROM user");
  return res.status(200).json({ code:200, message:emp });
});

module.exports = user;