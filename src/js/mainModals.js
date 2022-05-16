// Obteniendo los elementos del DOM
const openAddModal = document.querySelector('.btn-add');
const openEditEmployee = document.getElementById('btn-edit');

const modalAdd = document.querySelector('.modal-add');
const modalEdit = document.querySelector('.modal-edit');

const closeAddModal = document.querySelector('.modal-btn-close');
const closeEditModal = document.getElementById('btn-edit-close');

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
