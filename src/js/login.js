window.onload = init;

function init() {
    document.querySelector('.btn-submit').addEventListener('click', login);
}

function login() {
    var mail = document.getElementById('mail').value;
    var password = document.getElementById('password').value;

    console.log(mail, password);

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/login', 
        data: {
            user_email: mail,
            user_password: password
        }
    }).then(function(res){
        //Falta redirigir window.location.href='main.html'
        //Falta alerta  alert("Correo u Contraseña incorrectos");
        console.log(res);
    }).cath(function(err){
        console.log(err);
        
    })

}