# Buying

### Payment methods

    GET | api/v1/{shopKey}/shop/sales/payment-methods

Examples:

    http://skyerp.local/api/v1/acme12aa/shop/sales/payment-methods

*Get the customer's available payment methods.*

##### Response (examples):

    {
        "payment_methods": [
            {
                "id": 1,
                "description": "Lorem ipsum",
                "name": "Tarjeta"
            },
            {
                "id": 2,
                "description": null,
                "name": "Transferencia"
            },
        ]
    }

***

### Shipping services

    GET | api/v1/{shopKey}/shop/sales/shipping-services/region/{regionId}

Examples:

    http://skyerp.local/api/v1/acme12aa/shop/sales/shipping-services/region/1

*Get the customer's available shipping services for the region with ID 1.*

##### Response (examples):

    {
        "region": {
            "id": 1,
            "name": "Albacete",
            "country": {
                "id": 1,
                "name": "España",
            }
        },
        "shipping_services": [
            {
                "applicable_tax" : 21,
                "carrier" : {
                    "id"   : 1,
                    "name" : "Foo"
                },
                "cost"        : 3.25,
                "delivery_time" : null,
                "description" : "Entrega antes de las 14:00",
                "from_cost"   : null,
                "from_weight" : 0,
                "id"          : 1,
                "name"        : "Foo Valencia 14H",
                "to_cost"     : null,
                "to_weight"   : 99,
                "type"        : "weight",
                "image" : {
                    "alt" : null,
                    "src" : "images/sasasas/uiaghsas.jpg",
                }
            },
            {
                "applicable_tax" : 21,
                "carrier" : {
                    "id"   : 1,
                    "name" : "Foo"
                },
                "cost"        : 3.25,
                "delivery_time" : null,
                "description" : "Entrega antes de las 14:00",
                "from_cost"   : 0,
                "from_weight" : null,
                "id"          : 2,
                "name"        : "Foo Valencia 14H - 50EUR",
                "to_cost"     : 50,
                "to_weight"   : null,
                "type"        : "cost",
                "image"       : null
            }
        ]
    }

***

[API]("../../../API.md)
|
[Go to index]("../../../../README.md)
