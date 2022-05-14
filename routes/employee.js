const express = require('express');
const employee = express.Router();
const db = require('../config/database');

employee.post('/', async (req,res,next) => {
    const { name, last_name, phone_number, email, address } = req.body;
    if (name && last_name && phone_number && email && address) {
        let query = "INSERT INTO employee (name, last_name, phone_number, email, address) ";
        query += `VALUES('${name}', '${last_name}', ${phone_number}, '${email}', '${address}')`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Empleado agregado correctamente"});
        }
        return res.status(500).json({ code: 500, message: "Ocurrió un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

employee.delete('/:id([0-9]{1,3})', async (req,res,next) => {
    const query = `DELETE FROM employee WHERE id_employee = ${req.params.id}`;

    const rows = await db.query(query);

    if(rows.affectedRows == 1){
        return res.status(200).json({ code: 200, message: "Empleado eliminado correctamente" });
    }
    return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
});

employee.put('/:id([0-9]{1,3})', async (req,res,next) => {
    const { name, last_name, phone_number, email, address } = req.body;
    if (name && last_name && phone_number && email && address) {
        let query = `UPDATE employee SET name='${name}', last_name='${last_name}', phone_number='${phone_number}',`;
        query += `email='${email}', address='${address}' WHERE id_employee=${req.params.id}`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Los datos del empleado han sido actualizados correctamente"});
        }
        return res.status(500).json({ code: 500, message: "Ocurrió un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

// Ruta para cambiar solo el nombre
employee.patch('/:id([0-9]{1,3})', async (req,res,next) => {
    if(req.body.name) {
        let query = `UPDATE employee SET name='${req.body.name}' WHERE id_employee=${req.params.id}`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "El nombre del empleado han sido actualizado correctamente"});
        }
        return res.status(500).json({ code: 500, message: "Ocurrió un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

employee.get('/', async (req, res, next) =>{
    const emp = await db.query("SELECT * FROM employee");
    return res.status(200).json({code:200, message:emp});
});

employee.get('/:id([0-9]{1,3})', async (req, res, next) =>{
    const id = req.params.id;
    if(id >= 0 && id <= 100){
        const emp = await db.query("SELECT * FROM employee WHERE id_employee=" + id + ";");
        return res.status(200).json({code:200, message: emp});
    }
    return res.status(404).send({ code:404, message:"Empleado no encontrado"});
});

employee.get('/:name([A-Za-z]+)', async (req, res, next) =>{
    const name = req.params.name;
    const emp = await db.query("SELECT * FROM employee WHERE name='" + name + "';")

    // const empInfo = empInfo.filter((eInfo) => {
    //     return(eInfo.name.toUpperCase()== name.toUpperCase()) && eInfo;
    // })
    if (emp.length > 0) {
        return res.status(200).json({code:200, message: emp})
    } 
    return res.status(404).send({ code:404, message:"Empleado no encontrado "});
});

module.exports = employee;