# Customers - Reset account password

### Fetch an email to reset the password

    POST | {domain}/api/v1/{shopKey}/customers/reset-password # customer account

Examples:

    http://skyerp.local/api/v1/acme12aa/customers/reset-password

##### Payload:

    {
        "_method": "POST",
        "email": "foo@example.com",
    }

##### Response (example):

    {
        "status" : 200,
        "success": true,
        "locale" : "es",
        "message": "Enviado email para restablecer la clave de acceso",
        "data": {
            "email": "some@mail.com"
        }
    }

or

    {
        "status" : 200,
        "success": false,
        "locale" : "es",
        "message": "Fallo al enviar email para restablecer la clave de acceso",
        "data": {
            "email": "some@mail.com"
        }
    }

### Check the reset password email link token

The route is sended in an email.

    # Public
    GET | {domain}/api/v1/{shopKey}/customers/reset-password/{token}

Examples:

    http://skyerp.local/api/v1/acme12aa/customers/reset-password/h9ha9hs9hashahshaosihuahs98wh9ha9hs9hashahshaosihuahs98wasasassr


The token has 64 chars length, letters & numbers, f.e.:

    h9ha9hs9hashahshaosihuahs98wh9ha9hs9hashahshaosihuahs98wasasassr

##### Response (example):

> Token is OK:

    {
        "locale" : "es",
        "message": "Token válido",
        "status" : 200,
        "success": true,
        "data": {
            "email": "some@mail.com"
        }
    }

> Token is not OK:
    {
        "locale" : "es",
        "message": "Token inválido (no encontrado o caducado)",
        "status" : 200,
        "success": false,
        "data": {
            "email": null,
        }
    }

### Store a new password for the email

    # Public
    PUT | {domain}/api/v1/{shopKey}/customers/reset-password    # customer account

Examples:

    http://skyerp.local/api/v1/acme12aa/customers/reset-password

##### Payload:

    {
        "_method": "PUT",
        "email": "foo@example.com",
        "password": "asasasasasasas",  # string|min:8|max:255
        "password2": "asasasasasasas",
    }

##### Response (examples):

    {
        "locale" : "es",
        "message": "Contraseña actualizada",
        "status" : 200,
        "success": true,
        "data": {
            "email": "some@mail.com"
        }
    }

o:

    {
        "locale" : "es",
        "message": "Error cambiando contraseña de la cuenta",
        "status" : 200,
        "success": false,
        "data": {
            "email": "some@mail.com"
        }
    }

    {
        "locale" : "es",
        "message": "Datos no válidos para guardar la nueva contraseña",
        "status" : 400,
        "success": false,
        "data":{
            "errors":{
                "email":[
                    "El campo email seleccionado es inválido."
                ]
            }
        }
    }


***

[API]("../../../API.md)
|
[Go to index]("../../../../README.md)
