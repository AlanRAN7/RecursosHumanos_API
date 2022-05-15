window.onload = init;

// Obteniendo los elementos del DOM
const openAddModal = document.querySelector('.btn-add');
const openEditEmployee = document.getElementById('btn-edit');

const modalAdd = document.querySelector('.modal-add');
const modalEdit = document.querySelector('.modal-edit');

const closeAddModal = document.querySelector('.modal-btn-close');
const closeEditModal = document.getElementById('btn-edit-close');

function preventDef(event) {
  event.preventDefault();
}

// Se abre el modal para agregar un nuevo empleado
function openModalAdd() {
  modalAdd.classList.add('modal-show');
}

// // Se cierra el modal para agregar un nuevo empleado
function closeModalAdd() {
  modalAdd.classList.remove('modal-show');
}

// Se abre el modal para editar un empleado
function openModalEdit() {
  modalEdit.classList.add('modal-show');
}

// Se cierra el modal para editar un empleado
function modalEditClose() {
  modalEdit.classList.remove('modal-show');
}


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
  var body = document.querySelector("main")
  for(var i = 0; i < employee.length; i++){
      body.innerHTML += `<tr class="data-container">
      <td>"${employee[i].name}"</td>
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
        <button class="btn-delete">
          <span class="delete-icon"></span>
          Eliminar
        </button>
      </td>
    </tr>`
  }
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
      alert("Usuario Registrado Exitosamente");
  }).cath(function(err){
      console.log(err);
  })
}
