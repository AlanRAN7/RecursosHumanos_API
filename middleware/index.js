module.exports = (req, res, next) => {
    return res.status(200).send({code: 200, message: "Bienvenido al Servidor"});
  }