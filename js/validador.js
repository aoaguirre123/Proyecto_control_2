$(document).ready(function() {
  // Agregar método de validación para RUT chileno
  $.validator.addMethod("rutChileno", function(value, element) {

    // Validar que el RUT tenga el formato correcto (8 o 9 dígitos + guión + dígito verificador)
    var rutPattern = /^\d{7,8}-[\dK]$/;
    if (!rutPattern.test(value)) {
        return false;
    }

    // Validar el dígito verificador
    var rutSinGuion = value.replace("-", "");
    var rut = rutSinGuion.slice(0, -1);
    var dv = rutSinGuion.slice(-1);
    var factor = 2;
    var sum = 0;
    for (var i = rut.length - 1; i >= 0; i--) {
        sum += parseInt(rut.charAt(i)) * factor;
        factor = factor === 7 ? 2 : factor + 1;
    }
    var dvCalculado = 11 - (sum % 11);
    dvCalculado = dvCalculado === 11 ? "0" : dvCalculado === 10 ? "K" : dvCalculado.toString();

    return dv === dvCalculado;
  }, "El RUT no es válido (escriba sin puntos y con guión)");

  // Agregar método de validación para correo
  $.validator.addMethod("correoCompleto", function(value, element) {

    // Expresión regular para validar correo electrónico
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,}))$/;

    // Validar correo electrónico con la expresión regular
    return regex.test(value);

  }, 'El formato del correo no es válido');
  
  // Agregar método de validación para que un campo sólo acepte 
  // letras y espacios en blanco, pero no números ni símbolos,
  // ideal para campos como nombres y apellidos
  $.validator.addMethod("soloLetras", function(value, element) {

    return this.optional(element) || /^[a-zA-Z\s]*$/.test(value);

  }, "Sólo se permiten letras y espacios en blanco.");

  // El siguiente Javascript obliga a que la caja de texto del rut, siempre escriba la letra "K" en mayúscula
  if (document.getElementById('rut_registro')){
    document.getElementById('rut_registro').addEventListener('keyup', function(e) {
      e.target.value = e.target.value.toUpperCase();
    });
  }
  if (document.getElementById('rut_misdatos')){
    document.getElementById('rut_misdatos').addEventListener('keyup', function(e) {
      e.target.value = e.target.value.toUpperCase();
    });
  }
  if (document.getElementById('rut_usuarios')){
    document.getElementById('rut_usuarios').addEventListener('keyup', function(e) {
      e.target.value = e.target.value.toUpperCase();
    });
  }

  $("#formulario_bodega").validate({
    rules: {
      categoria_bodega: {
        required: true,
      },
      nombre_bodega: {
        required: true,
      },
      cantidad_bodega: {
        required: true,
        min: 0,
      },
    },
    messages: {
      categoria_bodega: {
        required: "Debes seleccionar una categoría",
      },
      nombre_bodega: {
        required: "Debes seleccionar un nombre",
      },
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
        email: true,
        correoCompleto: true,
      },
      contraseña_iniciar: {
        required: true,
      },
    },
    messages: {
      correo_iniciar: {
        required: "Debes ingresar un correo",
        email: "Ingrese un correo electrónico válido",
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
        soloLetras: true,
        minlength: 3,
      },
      apellido_misdatos: {
        required: true,
        soloLetras: true,
        minlength: 3,
      },
      correo_misdatos: {
        required: true,
        email: true,
        correoCompleto: true,
      },
      direccion_misdatos: {
        required: true,
        minlength: 3,
      },
      contraseña_misdatos: {
        required: true,
        minlength: 5,
        maxlength: 15,
      },
      confirmar_contraseña_misdatos: {
        required: true,
        minlength: 5,
        maxlength: 15,
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
        soloLetras: "El nombre sólo puede contener letras y espacios en blanco",
        minlength: "Debe tener al menos 3 caracteres"
      },
      apellido_misdatos: {
        required: "Debes ingresar un apellido",
        soloLetras: "El apellido sólo puede contener letras y espacios en blanco",
        minlength: "Debe tener al menos 3 caracteres"
      },
      correo_misdatos: {
        required: "Debes ingresar un correo",
        email: "Ingrese un correo electrónico válido",
        correoCompleto: "Ingrese un correo válido",
      },
      direccion_misdatos: {
        required: "Debes ingresar una dirección",
        minlength: "Debe tener al menos 3 caracteres"
      },
      contraseña_misdatos: {
        required: "Debes ingresar una contraseña",
        minlength: "La contraseña debe tener un mínimo de 5 caracteres",
        maxlength: "La contraseña debe tener un máximo de 15 caracteres",
      },
      confirmar_contraseña_misdatos: {
        required: "Debes ingresar una contraseña",
        minlength: "La contraseña debe tener un mínimo de 5 caracteres",
        maxlength: "La contraseña debe tener un máximo de 15 caracteres",
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
      categoria: {
        required: true,
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
        number: true,
        min: 0,
      },
      dscto_sub_productos: {
        required: true,
        number: true,
        min: 0,
        max: 100,
      },
      dscto_oferta_productos: {
        required: true,
        number: true,
        min: 0,
        max: 100,
      },
    },
    messages: {
      cod_productos: {
        required:"Debes ingresar un codigo de producto",
        minlength: "Debe tener al menos 2 caracteres",
      },
      categoria: {
        required: "Debe seleccionar una categoría",
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
        number: "El campo debe ser un número",
        min: "El precio debe ser mayor o igual que 0",
      },
      dscto_sub_productos: {
        required: "Debes ingresar un descuento, si no tiene, ingresa 0",
        number: "El campo debe ser un número",
        min: "El descuento debe ser mayor o igual que 0",
        max: "El descuento debe ser menor o igual que 100",

      },
      dscto_oferta_productos: {
        required: "Debes ingresar un descuento, si no tiene, ingresa 0",
        number: "El campo debe ser un número",
        min: "El descuento debe ser mayor o igual que 0",
        max: "El descuento debe ser menor o igual que 100",
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
        soloLetras: true,
        minlength: 3,
      },
      apellido_registro: {
        required: true,
        soloLetras: true,
        minlength: 3,
      },
      correo_registro: {
        required: true,
        email: true,
        correoCompleto: true,
      },
      direccion_registro: {
        required: true,
        minlength: 3,
      },
      contraseña_registro: {
        minlength: 5,
        maxlength: 15,
        required: true,
      },
      confirmar_contraseña_registro: {
        required: true,
        minlength: 5,
        maxlength: 15,
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
        soloLetras: "El nombre sólo puede contener letras y espacios en blanco",
        minlength: "Debe tener al menos 3 caracteres"
      },
      apellido_registro: {
        required: "Debes ingresar un apellido",
        soloLetras: "El apellido sólo puede contener letras y espacios en blanco",
        minlength: "Debe tener al menos 3 caracteres"
      },
      correo_registro: {
        required: "Debes ingresar un correo",
        email: "ingrese un correo válido",
        correoCompleto: "Ingrese un correo válido",
      },
      direccion_registro: {
        required: "Debes ingresar una dirección",
        minlength: "Debe tener al menos 3 caracteres"
      },
      contraseña_registro: {
        required: "Debes ingresar una contraseña",
        minlength: "La contraseña debe tener un mínimo de 5 caracteres",
        maxlength: "La contraseña debe tener un máximo de 15 caracteres",
      },
      confirmar_contraseña_registro: {
        required: "Debes ingresar una contraseña",
        minlength: "La contraseña debe tener un mínimo de 5 caracteres",
        maxlength: "La contraseña debe tener un máximo de 15 caracteres",
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
        soloLetras: true,
        minlength: 3,
      },
      apellido_usuarios: {
        required: true,
        soloLetras: true,
        minlength: 3,
      },
      correo_usuarios: {
        required: true,
        email: true,
        correoCompleto: true,
      },
      direccion_usuarios: {
        required: true,
        minlength: 3,
      },
      contraseña_usuarios: {
        required: true,
        minlength: 5,
        maxlength: 15,
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
        soloLetras: "El nombre sólo puede contener letras y espacios en blanco",
        minlength: "Debe tener al menos 3 caracteres"
      },
      apellido_usuarios: {
        required: "Debes ingresar un apellido",
        soloLetras: "El apellido sólo puede contener letras y espacios en blanco",
        minlength: "Debe tener al menos 3 caracteres"
      },
      correo_usuarios: {
        required: "Debes ingresar un correo",
        email: "Ingrese un correo electrónico válido",
        correoCompleto: "Ingrese un correo válido",
      },
      direccion_usuarios: {
        required: "Debes ingresar una dirección",
        minlength: "Debe tener al menos 3 caracteres"
      },
      contraseña_usuarios: {
        required: "Debes ingresar una contraseña",
        minlength: "La contraseña debe tener un mínimo de 5 caracteres",
        maxlength: "La contraseña debe tener un máximo de 15 caracteres",
        minlength: "Debe tener al menos 4 caracteres"
      },
    },
  });
});