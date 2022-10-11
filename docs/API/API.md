# API Endpoints

TODOS los datos devueltos dependen de la tienda, es decir que se reciben datos
que corresponden a la tienda cuya "key" se indica en la URL, por ejemplo,
la llamada a `http://skyerp.local/api/v1/acme12aa/categories` devuelve
todas las categorías que pertenecen a la tienda que se identifica
con la "key" *acme12aa*.


## HTTP Response Status Codes

 * 200 Ok, the action was successful
 * 201 Ok, something was created, f.e. the item was added to the cart
 * 202 Ok, accepted
 * 204 Ok, no content, f.e. the cart is empty
 * 400 Bad request. I use this status code on POST/PUT requests when the form data
didn't pass the server validations.
 * 401 Unauthorized (Authorization header contents doesn't pass (Bearer your_api_token))
 * 403 Forbidden. Some auth parameter isn't Ok, f.e. shop_key is invalid!
 * 404 Not Found. The endpoint doesn't exist or the resource can be found!
 * 418  I'm a teapot. On POST/PUT requests validations OK, error storing the thing,
f.e. registering a customer account
 * 422 Form validations errors.
 * 429 Too Many Requests (throttle limit exceeded, check endpoint list)
 * 500 Server error, contact the technical support


## Endpoint parameters

* Parámetro opcional "lang": valores typo ES|EN|FR|IT|... (2 letras mayúsculas)
Disponible en todos los endpoints.
Si se añade los textos se devuelven traducidos al idioma correspondiente.
Si no se añadé o no se encuentran las traducciones se usa el idioma
por defecto.

* `shopKey` actual para *acme*: "acme12aa"

NOTE: the language code is present, named as "locale", in each response
if this return data, f.e.

{
    "data":{
        "lifetime": "300",
        "token"   : "AlN6CoubdHLY7imp4IzNtyJCUHb8ezoO",
        "used_at" : "22-08-2022 09:43:53"
    },
    "locale"  : "es",
    "message" : "Token generado",
    "status"  : 200,
    "success" : true
}

## Testing Endpoints

To use Chromium or similar with an API Rest Client extension disable throttling
(block request with erroneous status codes).
Open with the terminal and use the flag:

    chromium --disable-extensions-http-throttling

### Test a customer account login

1. Register a customer account

    POST to: http://skyerp.local/api/v1/acme12aa/customers/register-user

> Payload

    {
        "_method": "POST",
        "email": "some_unique@mail.com",
        "password": "12345678",  // min 8 chars
    }

2. Login

If the register was successfully, use the credentials to login.

    POST to: http://skyerp.local/api/v1/acme12aa/customers/login

> Payload

    {
        "_method": "POST",
        "email": "some_unique@mail.com",
        "password": "12345678",  // min 8 chars
    }

### Test an anonymous cart

1. Get the token (is used to identify the cart on the server)

    GET to: http://skyerp.local/api/v1/acme12aa/utils/generate-token/carts

Copy the token from the response an use it to add items to the cart.
The token also is necessary to set the cart to the customer account
when him/her will auth.

2. Check cart status

    GET to: http://skyerp.local/api/v1/acme12aa/shop/sales/carts/tUwzE397ipFf9cWaLFwsfPLwqK79ZxTp

*where the las URL slice is the cart token got in the first step.*

3. Add an item to cart, f.e. a variation

    POST to http://skyerp.local/api/v1/acme12aa/shop/sales/carts/lines/tUwzE397ipFf9cWaLFwsfPLwqK79ZxTp

> Payload

    {
        "_method" : "POST",
        "design_customizations": "[{"id": 1, "content": "Foo"}, {"id": 7, "content": "Lorem ipsum"}]",
        "design_id": 10,
        "id"      : "5",
        "notes"   : "Lorem ipsum",
        "quantity": "2",
        "type"    : "variation",
    }

> Response:

    {
        "data":{
            "cart":{
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
        },
        "locale"  : "es",
        "message" : "Línea carrito guardad@",
        "status"  : 200,
        "success" : true
    }

NOTE: An updated cart will be appends in each response when the cart content
will change.

***

## Endpoints by topic

### CMS

[Static pages & top contents](./sections/CMS.md)

### Catalog

[Packs, products, designs & categories](./sections/catalog.md)

### Compras

[Carritos y pedidos](./sections/buying.md)

[Formas de pago, servicios de transporde, etc](./sections/buying-aux.md)

### Customers (Auth)

[Customers - Authentication](./contents/customers-auth.md)

[Customers - Registration](./contents/customers-registers.md)

[Customers - Reset account password](./contents/customers-reset-pw.md)

[Customers - Fetching data](./contents/customers-data.md)

### Security

[API security concerns](./sections/security.md)

### Subscriptions

[Subscriptions](./contents/subscriptions.md)

## API V1 endpoint routes

Default Throttle: 1000,1

 Method  | URI                                                                 | Action                                                                        | Throttle
---------|---------------------------------------------------------------------|-------------------------------------------------------------------------------|----------
GET/HEAD | api/v1/{shopKey}/cms/static-pages/{lang?}                           | \api\V1\CMS\Pages\CmsStaticPageController@index                               |
GET/HEAD | api/v1/{shopKey}/cms/static-pages/{pageId}/{lang?}                  | \api\V1\CMS\Pages\CmsStaticPageController@get                                 |
GET/HEAD | api/v1/{shopKey}/cms/top-categories/{lang?}                         | \api\V1\CMS\Tops\CmsTopCategoryController@index                               |
GET/HEAD | api/v1/{shopKey}/cms/top-designs/{lang?}                            | \api\V1\CMS\Tops\CmsTopDesignController@index                                 |
.        |                                                                     |                                                                               |
GET/HEAD | api/v1/{shopKey}/countries/{country_id}/regions/{lang?}             | \api\V1\Addresses\RegionController@index                                      |
GET/HEAD | api/v1/{shopKey}/countries/{lang?}                                  | \api\V1\Addresses\CountryController@index                                     |
.        |                                                                     |                                                                               |
GET/HEAD | api/v1/{shopKey}/subscriptions/types/{lang?}                        | \api\V1\Contacts\Subscriptions\SubscriptionTypeController@index               |
.        |                                                                     |                                                                               |
GET/HEAD | api/v1/{shopKey}/utils/generate-token/{type}                        | App\Http\Controllers\api\V1\Utils\UtilController@generateToken                | 200,1

#### Customers

 Method  | URI                                                                 | Action                                                                        | Throttle
---------|---------------------------------------------------------------------|-------------------------------------------------------------------------------|----------
GET/HEAD | api/v1/{shopKey}/aaa/{email}/{routeKey}                             | \api\V1\Customers\CustomerChecksController@checkEmail                         | 20,1
GET/HEAD | api/v1/{shopKey}/bbb/{identifier}/{routeKey}                        | \api\V1\Customers\CustomerChecksController@checkIdentifier                    | 20,1
POST     | api/v1/{shopKey}/customers/login                                    | \api\V1\Auth\Customers\JWT\AuthController@login                               | 20,1
POST     | api/v1/{shopKey}/customers/logout                                   | \api\V1\Auth\Customers\JWT\AuthController@logout                              | 20,1
POST     | api/v1/{shopKey}/customers/me                                       | \api\V1\Auth\Customers\JWT\AuthController@me                                  | 20,1
POST     | api/v1/{shopKey}/customers/refresh                                  | \api\V1\Auth\Customers\JWT\AuthController@refresh                             | 20,1
POST     | api/v1/{shopKey}/customers/register                                 | \api\V1\Auth\Customers\CustomerRegisterController@register                    | 20,1
POST     | api/v1/{shopKey}/customers/register-user                            | \api\V1\Auth\Customers\CustomerRegisterController@simpleRegister              | 20,1
POST     | api/v1/{shopKey}/customers/reset-password/{entity?}                 | \api\V1\Auth\Customers\CustomerPasswordController@sendEmail                   | 20,1
PUT      | api/v1/{shopKey}/customers/reset-password/{entity?}                 | \api\V1\Auth\Customers\CustomerPasswordController@update                      | 20,1
GET/HEAD | api/v1/{shopKey}/customers/reset-password/{token}                   | \api\V1\Auth\Customers\CustomerPasswordController@checkToken                  | 20,1

#### Catalog

 Method  | URI                                                                 | Action                                                                        | Throttle
---------|---------------------------------------------------------------------|-------------------------------------------------------------------------------|----------
GET/HEAD | api/v1/{shopKey}/categories/find/{id}/{shorted?}/{lang?}            | \api\V1\Shop\Catalog\Categories\CategoryController@get                        |
GET/HEAD | api/v1/{shopKey}/categories/{parentCategoryId?}/{lang?}             | \api\V1\Shop\Catalog\Categories\CategoryController@index                      |
GET/HEAD | api/v1/{shopKey}/designs/find/{designId}/{lang?}                    | \api\V1\Shop\Catalog\Products\Designs\DesignController@get                    |
GET/HEAD | api/v1/{shopKey}/packs/find/{categoryId}/{lang?}                    | \api\V1\Shop\Catalog\Packs\PackController@get                                 |
GET/HEAD | api/v1/{shopKey}/packs/{categoryId?}/{lang?}                        | \api\V1\Shop\Catalog\Packs\PackController@index                               |
GET/HEAD | api/v1/{shopKey}/products/design-groups/find/{groupId}/{lang?}      | \api\V1\Shop\Catalog\Products\Designs\DesignGroupController@find              |
GET/HEAD | api/v1/{shopKey}/products/design-groups/{productId}/{lang?}         | \api\V1\Shop\Catalog\Products\Designs\DesignGroupController@getProductGroup   |
GET/HEAD | api/v1/{shopKey}/products/designs-by-tag/{tagId}/{shorted?}/{lang?} | \api\V1\Shop\Catalog\Products\Designs\DesignController@findByTagId            |
GET/HEAD | api/v1/{shopKey}/products/find/{productId}/{lang?}                  | \api\V1\Shop\Catalog\Products\ProductController@get                           |
GET/HEAD | api/v1/{shopKey}/products/{categoryId?}/{lang?}                     | \api\V1\Shop\Catalog\Products\ProductController@index                         |
GET/HEAD | api/v1/{shopKey}/shop/search/{str}                                  | \api\V1\Shop\Catalog\Search\SearchController@get                              | 120,1

#### Carts & Orders

 Method  | URI                                                                 | Action                                                                        | Throttle
---------|---------------------------------------------------------------------|-------------------------------------------------------------------------------|----------
DELETE   | api/v1/{shopKey}/shop/sales/carts                                   | \api\V1\Shop\Sales\Carts\SalesCartController@destroy                          | 100,1
DELETE   | api/v1/{shopKey}/shop/sales/carts/lines/{id}                        | \api\V1\Shop\Sales\Carts\Lines\SalesCartLineController@destroy                | 100,1
GET/HEAD | api/v1/{shopKey}/shop/sales/carts                                   | \api\V1\Shop\Sales\Carts\SalesCartController@get                              | 100,1
POST     | api/v1/{shopKey}/shop/sales/carts/lines                             | \api\V1\Shop\Sales\Carts\Lines\SalesCartLineController@store                  | 100,1
PUT      | api/v1/{shopKey}/shop/sales/carts/lines/{id}                        | \api\V1\Shop\Sales\Carts\Lines\SalesCartLineController@update                 | 100,1
.        |                                                                     |                                                                               |
DELETE   | api/v1/{shopKey}/shop/sales/carts/{token}                           | \api\V1\Shop\Sales\Carts\UnauthenticatedSalesCartController@destroy           | 100,1
GET/HEAD | api/v1/{shopKey}/shop/sales/carts/{token}                           | \api\V1\Shop\Sales\Carts\UnauthenticatedSalesCartController@get               | 100,1
DELETE   | api/v1/{shopKey}/shop/sales/carts/lines/{id}/{token}                | \api\V1\Shop\Sales\Carts\Lines\UnauthenticatedSalesCartItemController@destroy | 100,1
POST     | api/v1/{shopKey}/shop/sales/carts/lines/{token}                     | \api\V1\Shop\Sales\Carts\Lines\UnauthenticatedSalesCartItemController@store   | 100,1
PUT      | api/v1/{shopKey}/shop/sales/carts/lines/{id} /{token}               | \api\V1\Shop\Sales\Carts\Lines\UnauthenticatedSalesCartItemController@update  | 100,1
.        |                                                                     |                                                                               |
DELETE   | api/v1/{shopKey}/shop/sales/orders                                  | \api\V1\Shop\Sales\Orders\SalesOrderController@cancel                         | 100,1
GET/HEAD | api/v1/{shopKey}/shop/sales/orders/{id}                             | \api\V1\Shop\Sales\Orders\SalesOrderController@get                            | 100,1
GET/HEAD | api/v1/{shopKey}/shop/sales/orders/{status?}                        | \api\V1\Shop\Sales\Orders\SalesOrderController@index                          | 100,1
DELETE   | api/v1/{shopKey}/shop/sales/orders                                  | \api\V1\Shop\Sales\Orders\SalesOrderController@cancel                         | 100,1
GET/HEAD | api/v1/{shopKey}/shop/sales/orders/find/{id}                        | \api\V1\Shop\Sales\Orders\SalesOrderController@get                            | 100,1
POST     | api/v1/{shopKey}/shop/sales/orders/lines                            | \api\V1\Shop\Sales\Orders\Lines\SalesOrderLineController@store                | 100,1
PUT      | api/v1/{shopKey}/shop/sales/orders/lines/{id}                       | \api\V1\Shop\Sales\Orders\Lines\SalesOrderLineController@update               | 100,1
DELETE   | api/v1/{shopKey}/shop/sales/orders/lines/{id}                       | \api\V1\Shop\Sales\Orders\Lines\SalesOrderLineController@destroy              | 100,1
GET/HEAD | api/v1/{shopKey}/shop/sales/orders/{status?}                        | \api\V1\Shop\Sales\Orders\SalesOrderController@index                          | 100,1
.        |                                                                     |                                                                               |
GET|HEAD | api/v1/{shopKey}/shop/sales/payment-methods                         | \api\V1\Shop\Sales\PaymentMethods\PaymentMethodController@get                 | 20,1
GET|HEAD | api/v1/{shopKey}/shop/sales/shipping-services/region/{regionId}     | \api\V1\Shop\Sales\Shipping\ShippingController@get                            | 20,1

***

[Go to index]("../../../README.md)
