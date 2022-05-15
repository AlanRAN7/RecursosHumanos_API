window.onload = init;

var url = "http://localhost:3000";

function init() {
    document.querySelector('.btn-submit').addEventListener('click', login);
}

function login() {
    var mail = document.getElementById('mail').value;
    var password = document.getElementById('password').value;

    axios({
        method: 'post',
        url: url + '/user/login', 
        data: {
            user_email: mail,
            user_password: password
        }
    }).then(function(res){
        if(res.data.code == 200){
            localStorage.setItem("token", res.data.message);
            window.location.href='main.html';
        }else{
            alert("Correo u Contraseña incorrectos");
        }
    }).cath(function(err){
        console.log(err);
    })

}