$(document).ready(function() {
  // Agregar método de validación para RUT chileno
  $.validator.addMethod("rutChileno", function(value, element) {
    // Eliminar puntos y guión del RUT
    value = value.replace(/[.-]/g, "");

    // Validar que el RUT tenga 8 o 9 dígitos
    if (value.length < 8 || value.length > 9) {
      return false;
    }

    // Validar que el último dígito sea un número o una 'K'
    var validChars = "0123456789K";
    var lastChar = value.charAt(value.length - 1).toUpperCase();
    if (validChars.indexOf(lastChar) == -1) {
      return false;
    }

    // Calcular el dígito verificador
    var rut = parseInt(value.slice(0, -1), 10);
    var factor = 2;
    var sum = 0;
    var digit;
    while (rut > 0) {
      digit = rut % 10;
      sum += digit * factor;
      rut = Math.floor(rut / 10);
      factor = factor === 7 ? 2 : factor + 1;
    }
    var dv = 11 - (sum % 11);
    dv = dv === 11 ? "0" : dv === 10 ? "K" : dv.toString();

    // Validar que el dígito verificador sea correcto
    return dv === lastChar;
  }, "Por favor ingrese un RUT válido."); 

  $.validator.addMethod("correoCompleto", function(value, element) {

    // Expresión regular para validar correo electrónico
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,}))$/;

    // Validar correo electrónico con la expresión regular
    return regex.test(value);

  }, 'Ingrese un correo válido');

  $("#formulario_bodega").validate({
    rules: {
      cantidad_bodega: {
        required: true,
        min: 0,
      },
    },
    messages: {
      cantidad_bodega: {
        required: "Debes ingresar una cantidad",
        min: "La cantidad debe ser mayor a 0",
      },
    },
  });

  $("#formulario_iniciar").validate({
    rules: {
      correo_iniciar: {
        required: true,
        correoCompleto: true,
      },
      contraseña_iniciar: {
        required: true,
      },
    },
    messages: {
      correo_iniciar: {
        required: "Debes ingresar un correo",
        correoCompleto: "Ingrese un correo válido",
      },
      contraseña_iniciar: {
        required: "Debes ingresar una contraseña",
      },
    },
  });

  $("#formulario_misdatos").validate({
    rules: {
      rut_misdatos: {
        required: true,
        rutChileno: true,
      },
      nombre_misdatos: {
        required: true,
        minlength: 3,
      },
      apellido_misdatos: {
        required: true,
        minlength: 3,
      },
      correo_misdatos: {
        required: true,
        correoCompleto: true,
      },
      direccion_misdatos: {
        required: true,
        minlength: 3,
      },
      contraseña_misdatos: {
        required: true,
      },
      confirmar_contraseña_misdatos: {
        required: true,
        equalTo: "#contraseña_misdatos",
      },
    },
    messages: {
      rut_misdatos: {
        required: "Debes ingresar un rut",
        rutChileno: "Ingrese un rut válido",
      },
      nombre_misdatos: {
        required: "Debes ingresar un nombre",
        minlength: "Debe tener al menos 3 caracteres"
      },
      apellido_misdatos: {
        required: "Debes ingresar un apellido",
        minlength: "Debe tener al menos 3 caracteres"
      },
      correo_misdatos: {
        required: "Debes ingresar un correo",
        correoCompleto: "Ingrese un correo válido",
      },
      direccion_misdatos: {
        required: "Debes ingresar una dirección",
        minlength: "Debe tener al menos 3 caracteres"
      },
      contraseña_misdatos: {
        required: "Debes ingresar una contraseña",
      },
      confirmar_contraseña_misdatos: {
        required: "Debes ingresar una contraseña",
        equalTo: "Las contraseñas no coinciden",
      },
    },
  });

  $("#formulario_productos").validate({
    rules: {
      cod_productos: {
        required: true,
        minlength: 3,
      },
      nombre_productos: {
        required: true,
        minlength: 3,
      },
      descripcion_productos: {
        required: true,
      },
      precio_productos: {
        required: true,
      },
      dscto_sub_productos: {
        required: true,
      },
      dscto_oferta_productos: {
        required: true,
      },
    },
    messages: {
      cod_productos: {
        required:"Debes ingresar un codigo de producto",
        minlength: "Debe tener al menos 2 caracteres",
      },
      nombre_productos: {
        required: "Debes ingresar un nombre de producto",
        minlength: "Debe tener al menos 3 caracteres",
      },
      descripcion_productos: {
        required: "Debes ingresar una descripción",
      },
      precio_productos: {
        required: "Debes ingresar un precio",
      },
      dscto_sub_productos: {
        required: "Debes ingresar un descuento, si no tiene, ingresa 0",
      },
      dscto_oferta_productos: {
        required: "Debes ingresar un descuento, si no tiene, ingresa 0",
      },
    },
  });
  
  $("#formulario_registro").validate({
    rules: {
      rut_registro: {
        required: true,
        rutChileno: true,
      },
      nombre_registro: {
        required: true,
        minlength: 3,
      },
      apellido_registro: {
        required: true,
        minlength: 3,
      },
      correo_registro: {
        required: true,
        correoCompleto: true,
      },
      direccion_registro: {
        required: true,
        minlength: 3,
      },
      contraseña_registro: {
        required: true,
      },
      confirmar_contraseña_registro: {
        required: true,
        equalTo: "#contraseña_registro",
      },
    },
    messages: {
      rut_registro: {
        required: "Debes ingresar un rut",
        rutChileno: "Ingrese un rut válido",
      },
      nombre_registro: {
        required: "Debes ingresar un nombre",
        minlength: "Debe tener al menos 3 caracteres"
      },
      apellido_registro: {
        required: "Debes ingresar un apellido",
        minlength: "Debe tener al menos 3 caracteres"
      },
      correo_registro: {
        required: "Debes ingresar un correo",
        correoCompleto: "Ingrese un correo válido",
      },
      direccion_registro: {
        required: "Debes ingresar una dirección",
        minlength: "Debe tener al menos 3 caracteres"
      },
      contraseña_registro: {
        required: "Debes ingresar una contraseña",
      },
      confirmar_contraseña_registro: {
        required: "Debes ingresar una contraseña",
        equalTo: "Las contraseñas no coinciden",
      },
    },
  });

  $("#formulario_usuarios").validate({
    rules: {
      cod_usuarios: {
        required: true,
      },
      rut_usuarios: {
        required: true,
        rutChileno: true,
      },
      nombre_usuarios: {
        required: true,
        minlength: 3,
      },
      apellido_usuarios: {
        required: true,
        minlength: 3,
      },
      correo_usuarios: {
        required: true,
        correoCompleto: true,
      },
      direccion_usuarios: {
        required: true,
        minlength: 3,
      },
      contraseña_usuarios: {
        required: true,
        minlength: 4,
      },

    },
    messages: {
      cod_usuarios: {
        required: "Debes ingresar un codigo de usuario",
      },
      rut_usuarios: {
        required: "Debes ingresar un rut",
        rutChileno: "Ingrese un rut válido",
      },
      nombre_usuarios: {
        required: "Debes ingresar un nombre",
        minlength: "Debe tener al menos 3 caracteres"
      },
      apellido_usuarios: {
        required: "Debes ingresar un apellido",
        minlength: "Debe tener al menos 3 caracteres"
      },
      correo_usuarios: {
        required: "Debes ingresar un correo",
        correoCompleto: "Ingrese un correo válido",
      },
      direccion_usuarios: {
        required: "Debes ingresar una dirección",
        minlength: "Debe tener al menos 3 caracteres"
      },
      contraseña_usuarios: {
        required: "Debes ingresar una contraseña",
        minlength: "Debe tener al menos 4 caracteres"
      },
    },
  });
});