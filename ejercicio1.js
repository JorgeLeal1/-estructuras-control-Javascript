/*
Ejercicio: Crea una función que valide un formulario de registro usando diferentes estructuras de control. 
Debe verificar: 

nombre no vacío, 
email válido, 
edad entre 18-99, y 
contraseña segura. 

Usa try/catch 
para manejar errores y proporciona mensajes específicos para cada tipo de validación fallida.
*/



function validarFormulario(registro) {
   
    const { nombre, email, edad, contraseña } = registro;

    // validar nombre,email,edad,contraseña que no esten vacios.
    if (!nombre || !email || !edad || !contraseña) {
        throw new Error("Todos los campos son obligatorios.");
    }

    // 1- validar nombre que no este vacio, se eliminan espacios en blanco al inicio y al final
    if (nombre.trim() === "") {
        throw new TypeError("El nombre no puede estar vacío.");
    }


    // 2- validar email con expresion regular, 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new TypeError("El correo electrónico no es válido.");
    }

    // 3- validar edad que sea un numero y que este en el rango de 18 a 99
    if (typeof edad !== "number") {
        throw new TypeError("Favor ingresar un número en edad.");
    }else if (edad < 18 || edad > 99) {
            throw new RangeError("Favor ingresar edad entre 18 y 99 años para registrarse.");
    }

    // Otra forma de validar edad con switch
    if (isNaN(edad) || edad < 18 || edad > 99) {

        let mensajeEdad;
        switch (true) {
            case isNaN(edad):
                mensajeEdad = "La edad debe ser un número.";
                break;
            case edad < 18:
                mensajeEdad = "Debe ser mayor de 18 años para registrarse.";
                break;
            case edad > 99:
                mensajeEdad = "La edad máxima permitida es 99 años.";
                break;
            default:
                mensajeEdad = "Edad inválida.";
        }
        throw new RangeError(`ERROR: ${mensajeEdad}`);
    }    


    // 4- validar contraseña segura: al menos 10- max 15 caracteres, una mayuscula, una minuscula, un numero y un caracter especial
    // La expresión regular requiere:
    // ^                 Inicio de la cadena
    // (?=.*[a-z])       Al menos una letra minúscula
    // (?=.*[A-Z])       Al menos una letra mayúscula
    // (?=.*[0-9])       Al menos un dígito numérico
    // (?=.*[!@#$%^&*])  Al menos un carácter especial del conjunto !@#$%^&*
    // .{8,15}           Longitud entre 8 y 15 caracteres
    // $                 Fin de la cadena
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{10,}$/;
    if (!regex.test(contraseña)) {
        throw new TypeError("La contraseña no es segura. Debe tener minimo 10 caracteres, incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.");
    }


    return "Registro exitoso.";

}
        

// Ejemplo de uso:
const registro2 = {
    nombre: "Ana",                   
    email: "ana@ejemplo.com",
    edad: 17,
    contraseña: "Contraeasd1*" 
};

try {
    const resultado = validarFormulario(registro2);
    console.log(resultado);
} catch (error) {
  if (error instanceof TypeError) {
    console.log("Error de tipo:", error.message);
  } else if (error instanceof RangeError) {
    console.log("Error de rango:", error.message);
  } else {
    console.log("Error general:", error.message);
  }
}