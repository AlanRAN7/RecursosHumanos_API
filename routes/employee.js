const express = require('express');
const employee = express.Router();
const db = require('../config/database');

employee.get('/', async(req, res, next) =>{
    const emp = await db.query("SELECT * FROM employee");
    return res.status(200).json({code:200, message:emp});
});

employee.get('/:id([0-9]{1,3})', async(req, res, next) =>{
    
    const id =req.params.id -1;
    if(id => 0 && id <= 100){
        const emp = await db.query("SELECT * FROM employee WHERE id_employee="+id+";");
        return res.status(200).json({code:200, message: emp});
    }
    return res.status(404).send({ code:404, message:"empleado no encontrado"});
});

employee.get('/:name([A-Za-z]+)', async(req, res, next) =>{
    const name = req.params.name;
    const emp = await db.query("SELECT * FROM employee WHERE name='" + name + "';")

    if (emp.length > 0) {
       return res.status(200).json({code:200, message: emp})
    } 
    return res.status(404).send({ code:404, message:"empleado no encontrado "});
});

module.exports = employee;