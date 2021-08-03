//Solo dejo acceder si hay un usuario logueado
if (sessionStorage.jwt) {


    window.addEventListener("load", function () {
        //Inicializo la librería AOS para las animaciones
        AOS.init();

        //cargar skeletons
        renderizarSkeletons(5, ".tareas-pendientes");
        
        const username = document.querySelector('#username');
        //Esto modificarlo por obtener el nombre del usuario y en el register guardarlo
        if (sessionStorage.getItem("name")) {
            console.log(sessionStorage.getItem("name"));
            username.innerText = sessionStorage.getItem("name");
        }else{
            //fetch a la API para obtener el nombre
            fetch("https://ctd-todo-api.herokuapp.com/v1/users/getMe", {
                method: "GET",
                headers: {
                    'Authorization': sessionStorage.getItem("jwt"),
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(function(responseAPI){
                console.log(responseAPI);
                if(sessionStorage.setItem("name", responseAPI.firstName)){
                    username.innerText = sessionStorage.getItem("name");
                }
            })
        }

        const btnCerrar = document.querySelector('#cerrarSesion');
        btnCerrar.addEventListener("click", function (event) {
            /*
            if (confirm("¿Desea cerrar sesión")) {
                sessionStorage.clear(); //limpio info
                location.href = 'index.html';
            }*/
            //Confirm con sweetalert2
            Swal.fire({
                title: '¿Desea CERRAR SESIÓN?',
                //text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#8E64C5',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Cerrar Sesión',
                cancelButtonText : 'Cancelar'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Cerrando sesión...',
                    'Hasta la próxima!',
                    'success'
                  )
                setTimeout(() => {
                sessionStorage.clear(); //limpio info
                location.href = 'index.html';
                }, 2000);
                  
                }
              })

        })

        const formNuevaTarea = document.querySelector("#formNuevaTarea");
        const inputNuevaTarea = document.querySelector("#nuevaTarea");

        const urlTasks = "https://ctd-todo-api.herokuapp.com/v1/tasks";
        
        const tareasPendientes = document.querySelector('.tareas-pendientes');
        const tareasTerminadas = document.querySelector('.tareas-terminadas');
        
        obtenerTareas();
        
        //Crear nueva tarea
        formNuevaTarea.addEventListener("submit", function (event) {
            event.preventDefault();
            
            let nuevaTarea = {
                description: inputNuevaTarea.value,
                completed: false
            }
            
            console.log(nuevaTarea);
            
            fetch(urlTasks, {
                method: "POST",
                headers: {
                    'Authorization': sessionStorage.getItem("jwt"),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevaTarea)
            })
            .then(function (response) {
                return response.json()
                console.log(response.json());
            })
            .then(function (respuestaApi) {
                //Tarea creada con éxito
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Tarea creada con éxito!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                inputNuevaTarea.value = ""; //limpio el campo
                obtenerTareas(); //renderizar tareas
            })
            .catch(function (error) {
                console.log(error);
            })
        })
        
        function obtenerTareas() {
            
            fetch(urlTasks, {
                method: "GET",
                headers: {
                    'Authorization': sessionStorage.getItem("jwt"),
                    'content-type': 'application/json'
                }
            })
            .then(response => {
                return response.json();
            })
            .then(function (responseAPI) {
                console.log(responseAPI);
                console.log("llamo a renderizar todos");
                removerSkeleton();
                renderizarTodos(responseAPI);
            })
            .catch(function (error) {
                console.log(error);
            })
            
        }
        
        function renderizarTodos(arrayTareas) {
            
            
            //filtra pendientes y completas y hace el renderizado
            /*    let arrayTareasPendientes = arrayTareas.filter(element => element.completed == false);
            let arrayTareasTerminadas = arrayTareas.filter(element => element.completed == true);
            
            //tendría que guardar el id de cada tarea en algun lugar para poder hacer el put al dar click al button 
            
            tareasPendientes.innerHTML = "";
            arrayTareasPendientes.forEach(elemento => {
                let fecha = new Date(elemento.createdAt);
                
                tareasPendientes.innerHTML += `
                <li class="tarea">
                <div class="not-done pending-task" id="${elemento.id}"></div>
                <div class="descripcion">
                <p class="nombre"> ${elemento.description}</p>
                <p class="timestamp">Creada: ${fecha.toLocaleDateString()}</p>
                </div>
                </li>
                `
            })
            
            tareasTerminadas.innerHTML = "";
            arrayTareasTerminadas.forEach(elemento => {
                tareasTerminadas.innerHTML += `
                <li class="tarea">
                <div class="not-done" id="${elemento.id}"></div>
                <div class="descripcion">
                <p class="nombre"> ${elemento.description}</p>
                <p class="timestamp">Creada: ${elemento.createdAt}</p>
                </div>
                </li>
                `
            })
            
            */
           
           tareasPendientes.innerHTML = "";
           tareasTerminadas.innerHTML = "";
           arrayTareas.forEach(tarea => {
               let fecha = new Date(tarea.createdAt);
               if(tarea.completed){
                   tareasTerminadas.innerHTML += `
                   <div data-aos="flip-up" data-aos-duration="1000">
                   <li class="tarea">
                   <div class="not-done" id="${tarea.id}"></div>
                   <div class="descripcion">
                   <p class="nombre"> ${tarea.description}</p>
                   <p class="timestamp">${fecha.toLocaleDateString()} ${fecha.getHours()}:${fecha.getMinutes()}</p>
                   </div>
                   </li>
                   </div>
                   `
                }else{
                    tareasPendientes.innerHTML += `
                    <div data-aos="flip-up" data-aos-duration="1000">
                    <li class="tarea">
                    <div class="not-done pending-task" id="${tarea.id}"></div>
                    <div class="descripcion">
                    <p class="nombre"> ${tarea.description}</p>
                    <p class="timestamp">${fecha.toLocaleDateString()} ${fecha.getHours()}:${fecha.getMinutes()}</p>
                    </div>
                    </li>
                    </div>
                    `
                }
            })
            
            //manejo del click en las tareas pendientes
            const btnPendingTasks = document.querySelectorAll('.pending-task');
            console.log(btnPendingTasks);
            btnPendingTasks.forEach(element => {
                //a cada boton le asigno la funcionalidad
                element.addEventListener("click", function (event) {
                    //let id = element.getAttribute('id');
                    let id = event.target.id;
                    console.log("id tarea clickeada: ", id);
                    //PUT tarea terminada actualizar completed a true
                    if(confirm("¿Terminó esta tarea?")){
                        actualizarTarea(id);
                    }                  
                })
            })


        }

        function actualizarTarea(id) {

            let datosModificar = {
                completed: true
            }

            fetch(urlTasks + "/" + id, {
                method: 'PUT',
                headers: {
                    'Authorization': sessionStorage.getItem("jwt"),
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(datosModificar)
            })
                .then(response => {
                    response.json();
                    console.log(response.status);
                    //obtener tareas para recargar las tareas
                    obtenerTareas();
                })
                .then(function (responseAPI) {
                    //manejar errores de status?
                    console.log(responseAPI);
                })
                .catch(error => console.log(error));

            
        }





    })

} else {
    location.href = "index.html";
}