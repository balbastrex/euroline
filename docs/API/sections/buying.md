# Buying

### Get the "customer" cart

    # Private
    GET | {domain}/api/v1/{shopKey}/shop/sales/carts

Examples:

    http://skyerp.local/api/v1/acme12aa/shop/sales/carts

##### Response (examples):

    {
        "status" : 200,
        "success": true,
        "locale" : "es",
        "message": "Carrito encontrad@",
        "data": {
            "cart": {
                ...
            }
        }
    }

or:

    {
        "status" : 200,
        "success": false,
        "locale" : "es",
        "message": "No hay un carrito registrado. Cuenta ID: 9",
        "data":[]
    }


### Buying before authentication / registration

There is a public endpoint to get a basic cart before to login.
This cart is identified with a token that is appends to the endpoint's end.

    # Public
    GET | {domain}/api/v1/{shopKey}/shop/sales/carts/{token}

Examples:

    http://skyerp.local/api/v1/acme12aa/shop/sales/carts/hashp9aahs98ay8gho3g4rg7wyd9vkiy

#### Response:

    {
        "data":{
            "cart":{
                "id": 8,
                "notes": null,
                "total": 0,
                "total_IVA": 0,
                "total_RE": 0,
                "total_discount": null,
                "total_original": null,
                "total_shipping": null,
                "total_taxes": null,
                "total_total": null,
                "lines": null
            },
        },
        "locale" : "es",
        "message": "Carrito encontrad@",
        "status" : 200,
        "success": true
    }


The token must be:
 - unique in the database
 - 32 chars length
 - composed only by letters and numbers.

***It's possible to get a token calling the next endpoint:***

    # public
    GET | {domain}/api/v1/{shopKey}/utils/generate-token/carts

Example:

    http://skyerp.local/api/v1/acme12aa/utils/generate-token/carts

##### Response (examples):

    {
        "locale" : "es",
        "message": "Token generado",
        "status" : 201,
        "success": true,
        "data": {
            "lifetime": "86400",
            "token"   : "hashp9aahs98ay8gho3g4rg7wyd9vkiy",
            "used_at  : "19-08-2022 11:02:21"
        }
    }

or:

    {
        "locale" : "es",
        "status" : 200,
        "success": false,
        "message": "No se genero el token",
        "data":[]
    }

`lifetime` the lifetime in seconds from the creation / last use stored in `used_at`.

If the endpoint with a token isn't used during the lifetime period the cart
and the data will be deleted.
The lifetime period will be renovated each time that the endpoint is called.


### Summary - Get a cart

    # Public
    GET | {domain}/api/v1/{shopKey}/shop/sales/carts/{token}

    http://skyerp.local/api/v1/acme12aa/shop/sales/carts/hashp9aahs98ay8gho3g4rg7wyd9vkiy


    # Private
    GET | {domain}/api/v1/{shopKey}/shop/sales/carts/

    http://skyerp.local/api/v1/acme12aa/shop/sales/carts



### Cart modifications

#### Add a cart line (new item)

    # Public
    POST | {domain}/api/v1/{shopKey}/shop/sales/carts/lines/{token}

    # Private
    POST | {domain}/api/v1/{shopKey}/shop/sales/carts/lines

Example:

    http://skyerp.local/api/v1/acme12aa/shop/sales/carts/lines/hashp9aahs98ay8gho3g4rg7wyd9vkiy

##### Variation Payload:

    {
        "_method": "POST",
        "design_id" : 10,
        "design_customizations": [
            {
                "id": 1,
                "content": "Foo"
            },
            {
                "id": 7,
                "content": "Lorem ipsum"
            }
        ],
        "id"    : "5",
        "quantity": "2",
        "notes" : "Lorem ipsum",
        "shop_option_ids": [1,2,3],
        "type"  : "variation",
    }

##### Pack Payload:

    {
        "_method": "POST",
        "id": "1267",
        "quantity": "2",
        "notes": "Lorem ipsum",
        "variations": [
            {
                "id": "23",
                "quantity" : 1,
                "design_id": 11,
                "design_customizations": [
                    {
                        "id": 1,
                        "content": "Foo"
                    },
                    {
                        "id": 7,
                        "content": "Lorem ipsum"
                    }
                ],
                "shop_option_ids": [1,2,3],
            },
            {
                "id": "24",
                "quantity" : 1,
                "design_id": 11,
                "design_customizations": [
                    ...
                ],
                "shop_option_ids": [1,2],
            },
            {
                "id": "8973",
                "quantity": 1,
                "design_id": 24,
                "design_customizations": [
                    ...
                ],
                "shop_option_ids": [1,7],
            }
        ],
        "type": "pack",
    }

##### Response (examples):

    {
        "locale" : "es",
        "message": "Línea carrito guardad@",
        "status" : 201,
        "success": true,
        "data": {
            "cart": {
                "id": 2,
                "notes": null,
                "total": 15,
                "total_IVA": 0,
                "total_RE": 0,
                "total_discount": 0,
                "total_original": 0,
                "total_shipping": 0,
                "total_taxes": 0,
                "total_total": 0,
                "lines": [
                    {
                        "IVA": 21,
                        "RE": 5,
                        "customer_notes": null,
                        "description": "Mascarilla higiénica reutilizable personalizada",
                        "discount": "0.0000",
                        "discount_type": "percentage",
                        "empty_stock_notes": "",
                        "name": "Mascarilla Higiénica reutilizable Lunares Azul L (hombre y mujer)",
                        "price": "3.7500",
                        "quantity": 1,
                        "ref": "003.Masca.LUN.LH0",
                        "ref_cat": "003.Masca.LUN.LH0",
                        "shop_article_id": 14,
                        "shop_article_type": "App\\Models\\Shop\\Catalog\\Products\\Variations\\ShopVariation",
                        "shop_design_id": 67,
                        "stock": 1,
                        "line_id": 5,
                        "customizations": [
                            {
                                "id": 5,
                                "label": "Nombre",
                                "content": "Foo"
                            }
                        ],
                        "shop_option_ids": [
                            66,
                            68
                        ]
                    }
                ]
            }
        }
    }

Where "item_type" can be "pack" or "variation".

#### Update cart line data (items number, etc)

    PUT | {domain}/api/v1/{shopKey}/shop/sales/carts/lines/{id}/{token}

Example:

    http://skyerp.local/api/v1/acme12aa/shop/sales/carts/lines/5/hashp9aahs98ay8gho3g4rg7wyd9vkiy

##### Payload:

    {
        "_method" : "PUT",
        "email"   : "foo@example.com",
        "password": "asasasasasasas",  # string|min:8|max:255
        "password2": "asasasasasasas",
    }

##### Response (examples):

    {
        "locale" : "es",
        "message": "Línea carrito actualizad@",
        "status" : 204,
        "success": true,
        "data": {
            "cart": {
                "token"       : "hashp9aahs98ay8gho3g4rg7wyd9vkiy",
                "total"       : "110",
                "total_lines" : 2,
                "total_total" : "133,1",
                "discounts" : {
                    "type"  : "percentage",
                    "value" : "0"
                },
            },
            "line": {
                "discounts" : {
                    "type"  : "percentage",
                    "value" : "0"
                },
                "IVA"       : "21",
                "id"        : "1",
                "item_id"   : "34",
                "item_type" : "pack",
                "price"     : "50",
                "quantity"       : "2",
                "total"     : "100",
                "total_total" : "121"
            }
        }
    }

Where "item_type" can be "pack" or "variation".

#### Remove cart line

    DELETE | {domain}/api/v1/{shopKey}/shop/sales/carts/lines/{id}/{token}

Example:

    http://skyerp.local/api/v1/acme12aa/shop/sales/carts/lines/5/hashp9aahs98ay8gho3g4rg7wyd9vkiy

##### Response (examples):

    {
        "locale" : "es",
        "message": "Línea eliminada",
        "status" : 200,
        "success": true,
        "data": {
            "cart": {
                "token"       : "hashp9aahs98ay8gho3g4rg7wyd9vkiy",
                "total"       : "110",
                "total_lines" : 2,
                "total_total" : "133,1",
                "discounts" : {
                    "type"  : "percentage",
                    "value" : "0"
                },
            },
            "line": {
                "id": "1",
            }
        }
    }

***

### Orders

    GET | {domain}/api/v1/{shopKey}/shop/sales/orders/find/{id}

Examples:

    http://skyerp.local/api/v1/acme12aa/shop/sales/orders/find/1

##### Response (examples):

    {
        "status": 200,
        "success": true,
        "message": "Pedido encontrad@",
        "data": {
            "order": {
                ...
            }
        }
    }

or:

    {
        "status": 200,
        "success": false,
        "message": "Pedido NO encontrado, ID: 1",
        "data":[]
    }


    GET | {domain}/api/v1/{shopKey}/shop/sales/orders/{status}

Examples:

    http://skyerp.local/api/v1/acme12aa/shop/sales/orders/accepted

##### Response (examples):

    {
        ...
    }


***

[API]("../../../API.md)
|
[Go to index]("../../../../README.md)
