let numero = 0;

async function bajarNumero() {
    setTimeout(function () {
        numero = 0;
    }, 1000);
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      console.log('Enter was pressed!');
      registrar.click();
    }
});

let resultado;

registrar.addEventListener('click', async function () {
    let validador = true;

    let nombreElem = document.getElementById('nombre');
    let emailElem = document.getElementById('email');
    let passwordElem = document.getElementById('password');
    let repasswordElem = document.getElementById('repassword');

    let nombre = nombreElem.value;
    let email = emailElem.value;
    let password = passwordElem.value;
    let repassword = repasswordElem.value;
    let fotoPerfil = './img/perfil/perfil_default.png';
    let fotoBanner = './img/perfil/banner_default.png';

    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;

    let errNombre = document.getElementById('errNombre');
    let errEmail = document.getElementById('errEmail');
    let errPassword = document.getElementById('errPassword');
    let errRepassword = document.getElementById('errRepassword');

    

    // Nombre
    if (nombre.trim() === "") {
        validador = false;
    }
    else if (nombre.length < 3 && nombre.length > 0) {
        validador = false;
        errNombre.textContent = "Nombre muy corto";

        errNombre.classList.remove("estilo");
        void errNombre.offsetWidth;
        errNombre.classList.add("estilo");
        nombreElem.classList.add("error");
    } else if (nombre.length > 20) {
        validador = false;
        errNombre.textContent = "Nombre muy largo";

        errNombre.classList.remove("estilo");
        void errNombre.offsetWidth;
        errNombre.classList.add("estilo");
        nombreElem.classList.add("error");
    }

    // Email

    if (email.trim() === "") {
        validador = false;
    }
    else if (email.length < 3 && email.length > 0) {
        errEmail.textContent = "Email no valido";
        validador = false;

        errEmail.classList.remove("estilo");
        void errEmail.offsetWidth;
        errEmail.classList.add("estilo");
        emailElem.classList.add("error");
    } else if (email.indexOf("@") == -1 && email.length > 0) {
        errEmail.textContent = "Email no valido";
        validador = false;

        errEmail.classList.remove("estilo");
        void errEmail.offsetWidth;
        errEmail.classList.add("estilo");
        emailElem.classList.add("error");
    } else if (email.indexOf(".") == -1 && email.length > 0) {
        errEmail.textContent = "Email no valido";
        validador = false;

        errEmail.classList.remove("estilo");
        void errEmail.offsetWidth;
        errEmail.classList.add("estilo");
        emailElem.classList.add("error");
    }

    // Password
    if (password.trim() === "") {
        validador = false;
    }
    else if (password.length < 6 && password.length > 0) {
        validador = false;
        errPassword.textContent = "Contraseña muy corta (mínimo 6 caracteres)";

        errPassword.classList.remove("estilo");
        void errPassword.offsetWidth;
        errPassword.classList.add("estilo");
        passwordElem.classList.add("error");
    } else if (password.length > 20) {
        validador = false;
        errPassword.textContent = "Contraseña muy larga (máximo 20 caracteres)";

        errPassword.classList.remove("estilo");
        void errPassword.offsetWidth;
        errPassword.classList.add("estilo");
        passwordElem.classList.add("error");
    } else if (!passwordRegex.test(password) && password.length > 0) {
        validador = false;
        errPassword.textContent = "Minimo 1 mayúscula, 1 minúscula y 1 número";

        errPassword.classList.remove("estilo");
        void errPassword.offsetWidth;        
        errPassword.classList.add("estilo");
        passwordElem.classList.add("error");
    } else if (password != repassword && password.length > 0) {
        validador = false;
        errRepassword.textContent = "Las contraseñas no coinciden";

        errRepassword.classList.remove("estilo");
        void errRepassword.offsetWidth;
        errRepassword.classList.add("estilo");
        repasswordElem.classList.add("error");
    }


    if (numero = 0) {
        setTimeout(function () {
            errNombre.textContent = "";
            errEmail.textContent = "";
            errPassword.textContent = "";
            errRepassword.textContent = "";
        }, 7000);

        setTimeout(function () {
            [errNombre, errEmail, errPassword, errRepassword].forEach(errElem => errElem.classList.remove("estilo"));
            [nombreElem, emailElem, passwordElem, repasswordElem].forEach(inputElem => inputElem.classList.remove("error"));
        }, 7000);
        numero = 1
    }
    bajarNumero();

    const newUser = {
        nombre: nombre,
        email: email,
        password: password,
        npublicaciones: 0,
        foto_perfil: fotoPerfil,
        foto_banner: fotoBanner,
        primera_vez: true
    };

    if (validador == true) {
        resultado = await createUser(newUser);
        console.log("segunda vez" + resultado);
        if (resultado == false) {

            errEmail.classList.remove("estilo");
            void errEmail.offsetWidth;
            errEmail.textContent = "Email ya registrado";
            errEmail.classList.add("estilo");
            emailElem.classList.add("error");

            validador = false;

        } else {
            
            setTimeout(() => {
                window.location.href = "./login";
            }, 2000);
            
            console.log(nombre, email, password, repassword);
            registrado.style.display = "flex";
        }
        console.log(nombre, email, password, repassword);



    }
});

async function createUser(userData) {
    try {
        const response = await fetch('/api/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();
        console.log('User created successfully:', data);
        const resultadoEmail = data.email;
        console.log(resultado);
        if (resultadoEmail == "Email ya existente") {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}



