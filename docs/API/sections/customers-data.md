# Customers data

### Addresses

> Addresses

    # Private
    GET | {domain}/api/v1/{shopKey}/addresses/find/{id}

    # Private
    GET | {domain}/api/v1/{shopKey}/addresses/{customerId}

Examples:

    http://skyerp.local/api/v1/acme12aa/addresses/1         # todas las direcciones activas del cliente ID 1
    http://skyerp.local/api/v1/acme12aa/addresses/find/1    # dirección con ID 1


***

[API]("../../../API.md)
|
[Go to index]("../../../../README.md)
