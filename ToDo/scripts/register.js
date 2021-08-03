window.addEventListener("load", function(event){
  
    const formRegister = document.querySelector("#formRegister");
    const inputFirstName = document.querySelector("#firstName");
    const inputLastName = document.querySelector("#lastName");
    const inputPassword = document.querySelector("#password");
    const inputRePassword = document.querySelector("#repassword");
    const inputEmail = document.querySelector("#email");

    //manejo de errores
    let errores = {};
    let datos = {};

    formRegister.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log(errores);

        inputEmail.addEventListener("input", function (event) {
            if (inputEmail.validity.typeMismatch) {
                inputEmail.setCustomValidity("¡Desbes ingresar una dirección de correo electrónico!");
            } else {
                inputEmail.setCustomValidity("");
            }
          });
        //Hacer validación de los datos
        if(validatePassword(inputPassword.value, inputRePassword.value)){
           Swal.fire({
               icon: 'error',
               title: 'Ups...',
               text: 'Las contraseñas no coinciden'
             })
            // errores.password = "Las contraseñas no coinciden";
        }
        /*
        if(inputFirstName & inputLastName & inputEmail & inputPassword & inputRePassword){
            //Si todos los campos están completos
             //- Los campos de contraseña coincidan y tengan una longitud de al menos 8 caracteres y una mayúscula.
        }else{
            //Si alguno de los campos está incompleto
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Debes completar todos los campos'
              })
            errores.datosIncompletos = "Debes completar todos los campos";
        }*/

       

        //- La dirección de email no puede ser de Yahoo!.
        

        //manejar errores


        if(errores=={}){
            mostrarSpinner();
            //No hay errores, procedo a crear el usuario en la API
            datos = {
                firstName: inputFirstName.value,
                lastName: inputLastName.value,
                email: inputEmail.value,
                password: inputPassword.value
            }
            
            if(crearUsuario(datos)){
                window.location.href = "lista-tareas.html";
            }
        }else{
            //mostrar mensajes de error en el formulario
            //borrar los errores
            errores = {};
        }

    })

    function validatePassword(password, repassword) {
        
        let contador = 0; // para contar si hay errores

        if(password!=repassword){
        //    errores.repassword = "La contraseña debe ser igual en ambos campos";
            contador++;
        }
        if(password.length < 8){
         //   errores.passwordLength = "La contraseña debe tener al menos 8 caracteres.";
            contador++;
        }

        //match(/[A-Z]/) devuelve un array si encuentra una mayúscula y null si no la encuentra
    /*    if(password.match(/[A-Z]/)==null){
            errores.passwordUpperCase = "La contraseña debe tener al menos una letra mayúscula.";
            contador++;
        }*/

        return contador;
        
    }

    function crearUsuario(datos) {

        fetch("https://ctd-todo-api.herokuapp.com/v1/users", {
            method:"POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(datos)
        })
        .then(function(response){
            return response.json();
        })
        .then(function(responseAPI){
            console.log(responseAPI);          
            if (responseAPI.jwt) {
                sessionStorage.setItem("jwt", responseAPI.jwt);
                sessionStorage.setItem("name", inputFirstName);
                ocultarSpinner();
                window.location.href = "lista-tareas.html";
            }else{
                ocultarSpinner();
               //Alerta con librería SweetAlert2
               Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: responseAPI
              })
            }
        })
        .catch(function(error) {
            console.log(error);
        })

        if(sessionStorage.getItem("jwt")){
            return false;
        }else{
            return true;
        }

    }
    



})