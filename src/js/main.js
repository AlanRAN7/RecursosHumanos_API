
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


window.onload = init;

function init() {
    document.querySelector('.modal-btn-add').addEventListener('click', register);
}

function register() {
    var name = document.getElementById('name').value;
    var last_name = document.getElementById('last_name').value;
    var phone_number = document.getElementById('phone_number').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;


    console.log(name, last_name, phone_number, email, address);

    axios({
        method: 'post',
        url: 'http://localhost:3000/employee/insert', 
        data: {
            name: name,
            last_name: last_name,
            phone_number: phone_number,
            email: email,
            address: address 
        }
    }).then(function(res){
        //Falta redirigir window.location.href='main.html'
        console.log(res);
        alert("Usuario Registrado Exitosamente");
    }).cath(function(err){
        console.log(err);
        
    })

}