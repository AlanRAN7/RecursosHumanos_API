const express = require('express');
const employee = express.Router();
const db = require('../config/database');

employee.post('/', async (req,res,next) => {
    const { name, last_name, phone_number, email, address } = req.body;
    if (name && last_name && phone_number && email && address) {
        let query = "INSERT INTO employee (name, last_name, phone_number, email, address)";
        query += `VALUES('${name}', '${last_name}', ${phone_number}, '${email}', '${address}')`;

        const rows = await db.query(query);
        console.log(rows);

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Empleado agregado correctamente"});
        }
        return res.status(500).json({ code: 500, message: "Ocurrió un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

employee.get('/', async (req, res, next) =>{
    const emp = await db.query("SELECT * FROM employee");
    return res.status(200).json({code:200, message:emp});
});

employee.get('/:id([0-9]{1,3})', async(req, res, next) =>{
    const id = req.params.id -1;
    if(id >= 0 && id <= 100){
        const emp = await db.query("SELECT * FROM employee WHERE id_employee=" + id + ";");
        return res.status(200).json({code:200, message: emp});
    }
    return res.status(404).send({ code:404, message:"Empleado no encontrado"});
});

employee.get('/:name([A-Za-z]+)', async(req, res, next) =>{
    const name = req.params.name;
    const emp = await db.query("SELECT * FROM employee WHERE name='" + name + "';")

    // const empInfo = empInfo.filter((eInfo) => {
    //     return(eInfo.name.toUpperCase()== name.toUpperCase()) && eInfo;
    // })
    if (emp.length > 0) {
        return res.status(200).json({code:200, message: emp})
    } 
    return res.status(404).send({ code:404, message:"empleado no encontrado "});
});

// employee.post("/", async (req,res,next) => {
//     const { name, last_name, phone_number, email, address } = req.body;

//     if (name && last_name && phone_number && email && address) {
//       let query =
//         "INSERT INTO employee (name, last_name, phone_number, email, address)";
//       query += `VALUES('${name}', ${last_name}, ${phone_number}, ${email}, ${address})`;
//       const rows = await db.query(query);
//       console.log(rows);
  
//       if (rows.affectedRows == 1) {
//         return res.status(201).json({
//           code: 201,
//           message: "Pokemon insertado correctamente",
//         });
//       }
//       return res.status(500).json({ code: 500, message: "Ocurrió un error" });
//     }
//     return res.status(500).json({ code: 500, message: "Campos incompletos" });
// });


module.exports = employee;