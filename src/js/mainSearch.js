// Se obtiene el elemento del DOM que contiene el input de búsqueda
const searchInput = document.querySelector('#search');
const button = document.querySelector('.search-icon');

function filterEmployee() {
  axios.get(url + "/employee", headers).then(function(res){
    displayEmployeesFilter(res.data.message)
  }).catch(function(err){
    console.log(err)
  })
}

function displayEmployeesFilter(employee){
  var body = document.querySelector("table")
  const filterEmployee = employee.filter(employee => employee.name === searchInput.value);
  
  if(filterEmployee.length > 0){
    for(let i = 0; i < filterEmployee.length; i++) {
      body.innerHTML = `
        <thead>
          <tr>
            <th class="left-tip">Nombre</th>
            <th>Apellidos</th>
            <th>Teléfono</th>
            <th>Correo electrónico</th>
            <th>Dirección</th>
            <th class="btn-container"></th>
            <th class="btn-container right-tip"></th>
          </tr>
        </thead>
        <tr class="data-container">
          <td>${filterEmployee[i].name}</td>
          <td>${filterEmployee[i].last_name}</td>
          <td>${filterEmployee[i].phone_number}</td>
          <td>${filterEmployee[i].email}</td>
          <td>${filterEmployee[i].address}</td>
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
  } else {
    body.innerHTML = `<td>Empleado no encontrado</td>`
  }
}