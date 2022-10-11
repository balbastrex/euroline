# Customers - Authentication

> Login / enviar formulario login

    # Public
    POST | {domain}/api/v1/{shopKey}/customers/login

Examples:

    http://skyerp.local/api/v1/acme12aa/customers/login

##### Payload:

    {
        "_method" : "POST",
        "email"   : "foo@example.com",
        "password": "foo@example.com",
        "token"   : "sadsdfuh3r4bibcjsdh8sdssd9hs78dh"     # optional
    }

##### Response (example):

    {
        "authenticated": 0,
        "data":{
            "cart": null,
            "customer":{
                "customer_id": 21,
                "account_id": 21,
                "email" : "lop@glomki-mer.net",
                "name"  : "glomki-pepinillos"
            },
            "token":{
                "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9za3llcnAubG9jYWxcL2FwaVwvdjFcL2FjbWUxMmFhXC9jdXN0b21lcnNcL2xvZ2luIiwiaWF0IjoxNjYzOTMyMzYzLCJleHAiOjE2NjQwMTg3NjMsIm5iZiI6MTY2MzkzMjM2MywianRpIjoiVlg4VlJjVUo5eE5PVEZvOSIsInN1YiI6MjEsInBydiI6IjU0M2Q2YjYxMjMxYzcxMzU2YmFkNmNhYjE5NTFkZWIyZDM5OTkzMTcifQ.YE2aYF6jb7-hYSi-MQXK3HWkDlSKg7JlxDNF9fZPq9o",
                "expires_in": 86400,
                "token_type": "bearer"
            }
        },
        "locale"  : "es",
        "message" : "Acceso autorizado",
        "status"  : 202,
        "success" : true
    }

where *customer_cart* can be something as this:

    "customer_cart":{
        "id": 1,
        "notes": null,
        "total": 0,
        "total_IVA": 0,
        "total_RE": 0,
        "total_discount": 0,
        "total_original": 0,
        "total_shipping": 0,
        "total_taxes": 0,
        "total_total": 0,
        "info": "NOTE: This cart is empty!",
        "lines":[]
    },

*Send a token with the login form when exist a local token to identify*
*an "unauthenticated customer cart". If a cart with the token exist it will*
*be assigned to the customer account and the cart data appends to the response.*
*If the customer had a cart and a new anonymous cart (identified with a token)*
*exists on login, the old one is removed.*

> Logout

    # Private
    POST | {domain}/api/v1/{shopKey}/customers/logout

Examples:

    http://skyerp.local/api/v1/acme12aa/customers/logout


***

[API]("../../../API.md)
|
[Go to index]("../../../../README.md)
