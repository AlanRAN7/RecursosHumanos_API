window.onload = init;

var headers = {}
var url = "http://localhost:3000";

function init() {
  if(localStorage.getItem("token")){
        token = localStorage.getItem("token");
        headers = {
      headers:{'Authorization': "Bearer " + localStorage.getItem("token")}
    }
    document.querySelector('.modal-btn-add').addEventListener('click', register);
    loadEmployees();

  }else{
    window.location.href = "login.html"
  }
}

function loadEmployees() {
  axios.get(url + '/employee', headers)
  .then(function(res){
    displayEmployees(res.data.message)
}).catch(function(err){
    console.log(err)
  })
}


function displayEmployees(employee){
  var body = document.querySelector("table")
  for(let i = 0; i < employee.length; i++){
      body.innerHTML += `<tr class="data-container">
      <td>${employee[i].name}</td>
      <td>${employee[i].last_name}</td>
      <td>${employee[i].phone_number}</td>
      <td>${employee[i].email}</td>
      <td>${employee[i].address}</td>
      <td class="btn-container">
        <button class="btn-edit" onclick="openModalEdit()">
          <span class="edit-icon"></span>
          Editar
        </button>
      </td>
      <td class="btn-container">
        <button class="btn-delete" onClick = "deleteEmployee(${employee[i].id_employee})">
          <span class="delete-icon"></span>
          Eliminar
        </button>
      </td>
    </tr>`
  }
}

function deleteEmployee(id_employee){
  console.log(id_employee)
  // id_employee = parseInt(idUser);
  axios.delete(url + `/employee/${id_employee}`)
  .then(function(res){
  alert("Usuario eliminado con éxito!")
  location.reload();
}).catch(function(err){
  console.log(err);
})
}

function register() {
  var name = document.getElementById('name').value;
  var last_name = document.getElementById('last_name').value;
  var phone_number = document.getElementById('phone_number').value;
  var email = document.getElementById('email').value;
  var address = document.getElementById('address').value;

  axios({
      method: 'post',
      url: url + '/employee/insert', 
      data: {
          name: name,
          last_name: last_name,
          phone_number: phone_number,
          email: email,
          address: address 
      }
  }).then(function(res){
      alert("Empleado Registrado Exitosamente");
  }).cath(function(err){
      console.log(err);
  })
}
