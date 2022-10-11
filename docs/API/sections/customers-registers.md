# Customers - Registration

> Register

    # Public
    POST | {domain}/api/v1/{shopKey}/customers/register         # company account

    # Public
    POST | {domain}/api/v1/{shopKey}/customers/register-user    # personal account

Examples:

    http://skyerp.local/api/v1/acme12aa/customers/register
    http://skyerp.local/api/v1/acme12aa/customers/register-user


Limit: 10 registers by minute (429 - more register request)

##### Payload (company account):

    {
        "_method": "POST",
        "name": "hui3 srwd",
        "email": "avgmin@mail.com",
        "password": "b7BA44RTa579",
        "password2": "b7BA44RTa579",
        "phone": "+34565555544",
        "phone_2": "+34565555544",
        "DNI": "XXXXXXXXX",
        "tradename": "Ui",
        "companyname": "Ui",
        "CIF": "12122125R",
        "re": 1,
        "iva": 1,
        "address": "wewew",
        "city": "alcantara",
        "postcode": "777555",
        "clone_as_delivery_address": 0,
        "address_name": "Dirección - 28-Jun-2022_1656415182",
        "subscriptions": [
            "1",
            "2"
        ],
        "contact_name": "",
        "add_company": 1,
        "register_company": 1,
        "company_types": [
            "1",
            "2"
        ],
        "region_id": "34",
        "country_id": "1"
    }

> Required:

    _method
    name
    email
    phone
    tradename
    companyname
    CIF
    address
    city
    postcode
    address_name
    add_company
    register_company
    company_types
    region_id
    country_id

One DNI, if it be included, need to be valid.
`register_company` must be and its value will be 1 to register the company.

##### Payload (personal account):

    {
        "_method": "POST",
        "email": "foo@mail.com",
        "password": "PoZdqXwfhhjq",  // min 8 chars
    }

> Required:

    _method
    email
    password

###### Responses (example - company account):

    {
        "data": {
            "content": {
                "CIF"         : "B99843820",
                "customer_id" : 5,
                "email"       : "asas@asasas.es",
                "tradename"   : "piikms"
            }
        },
        "locale"  : "es",
        "message" : "Los datos se han registrado",
        "status"  : 200,
        "success" : true
    }

###### Responses (example - personal account):

    {
        "data": {
            "content": {
                "customer_id": 2,
                "email"      : "piopio@domr.com"
            }
        },
        "locale"  : "es",
        "message" : "Los datos se han registrado",
        "status"  : 200,
        "success" : true
    }

##### Response status codes

 * 200 Ok, the customer is registered
 * 400|422 Validations failures
 * 418 Validations OK, something failed registering the customer
 * 429 Too Many Requests
 * 500 Server error, contact the technical support



### Customers Register - Checking data

> Check if the email is registered

    # Public
    GET | {domain}/api/v1/{shopKey}/aaa/{email}/{routeKey}

Examples:

    http://skyerp.local/api/v1/acme12aa/aaa/foo@klon.org/atr9ysu5afs5uasfg6fi8asyo9nua9gs

##### Response (example):

    {
        "data":{
            "found": 1
        },
        "locale"  : "es",
        "message" : "Email encontrad@",
        "status"  : 200,
        "success" : true
    }

    {
        "data": {
            "found": 0
        }
        "locale"  : "es",
        "message" : "Email NO encontrad@",
        "status"  : 204,
        "success" : true
    }

> Check if the CIF|DNI is registered

    # Public
    GET | {domain}/api/v1/{shopKey}/bbb/{DNI}/{routeKey}

    # Public
    GET | {domain}/api/v1/{shopKey}/bbb/{CIF}/{routeKey}

Examples:

    http://skyerp.local/api/v1/acme12aa/bbb/11222333R/axg4ys15afs5u6atogg6fi8asyo9a9gf


##### Response (example):

    {
        "locale" : "es",
        "message": "Identificador encontrad@",
        "status" : 200,
        "success": true,
        "data": {
            "found": 1
        }
    }

***

### Customers Register - Fetching data

#### Addresses data (countries, regions, etc.)

> Countries

    # Public
    GET | {domain}/api/v1/{shopKey}/countries/{lang?}

Examples:

    http://skyerp.local/api/v1/acme12aa/countries

> Regions

    # Public
    GET | {domain}/api/v1/{shopKey}/countries/{country_id}/regions/{lang?}

Examples:

    http://skyerp.local/api/v1/acme12aa/countries/{country_id}/regions


***

[API]("../../../API.md)
|
[Go to index]("../../../../README.md)
