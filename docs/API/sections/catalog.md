# Catalog

### Categories

    # Public & Private*
    GET | {domain}/api/v1/{shopKey}/categories/find/{categoryId}/{shorted?}/{lang?}

    # Public & Private*
    GET | {domain}/api/v1/{shopKey}/categories/{parentCategoryId?}/{lang?}

Examples:

    http://skyerp.local/api/v1/acme12aa/categories
    http://skyerp.local/api/v1/acme12aa/categories/0
    http://skyerp.local/api/v1/acme12aa/categories/0/EN # textos en inglés
    # Todas las categorías activas (con imagen)

        "categories":[
            {
                "hierarchy" : "root",
                "id"        : 1,
                "level"     : 0,
                "main_image": null,
                "name"      : "#root",
                "parent_id" : null,
                "position"  : 0,
                "slug"      : "",
                "tag"       : null
            },
            {
                "hierarchy" : "diseno-textil",
                "id"        : 2,
                "level"     : 1,
                "main_image": null,
                "name"      : "Diseño Textil",
                "parent_id" : 1,
                "position"  : 3,
                "slug"      : "textil-ropa-infantil-bebe",
                "tag"       : {
                    "alt" : null,
                    "id"  : 5,
                    "slug": "textiles",
                    "src" : null
                }
            }
        ]

    http://skyerp.local/api/v1/acme12aa/categories/1
    http://skyerp.local/api/v1/acme12aa/categories/1/EN # textos en inglés
    # las categorías activas hijas de la categoría ID 1 (con imagen)

        "categories":[
            {
                "hierarchy" : "diseno-textil",
                "id"        : 2,
                "level"     : 1,
                "main_image": null,
                "name"      : "Diseño Textil",
                "parent_id" : 1,
                "position"  : 3,
                "slug"      : "textil-ropa-infantil-bebe",
                "tag"       : {
                    "alt" : null,
                    "id"  : 5,
                    "slug": "textiles",
                    "src" : null
                }
            }
        ]

    http://skyerp.local/api/v1/acme12aa/categories/find/5
    http://skyerp.local/api/v1/acme12aa/categories/find/5/0
    http://skyerp.local/api/v1/acme12aa/categories/find/5/0/EN # textos en inglés
    # categoría con ID 5 y datos mínimos (por defecto / sin imagen)

        "category":{
            "hierarchy" : "familia/especial-papa",
            "id"        : 5,
            "level"     : 2,
            "name"      : "Especial Papá",
            "parent_id" : 4,
            "position"  : 1,
            "slug"      : "especial-papa",
            "tag"       : {
                "alt" : null,
                "id"  : 3,
                "slug": "papa",
                "src" : null
            }
        }

    http://skyerp.local/api/v1/acme12aa/categories/find/1/1 # categoría con ID 1 y datos mínimos (sin imagen)
    http://skyerp.local/api/v1/acme12aa/categories/find/1/0 # categoría con ID 1 y todos sus datos (con imagen)


***NOTA:** las categorías incluyen anidados datos de la etiqueta asociada, si la tienen.*

***

### Designs

> Design groups by product ID

    # Public & Private*
    GET | {domain}/api/v1/{shopKey}/products/design-groups/{productId}/{lang?}

    http://skyerp.local/api/v1/acme12aa/products/design-groups/1      # Grupo de diseños con diseños activos del producto con ID 1


> Design groups by design group ID

    # Public & Private*
    GET | {domain}/api/v1/{shopKey}/products/design-groups/find/{groupId}/{lang?}

    http://skyerp.local/api/v1/acme12aa/products/design-groups/find/1 # Grupo de diseños con diseños activos del grupo con ID 1


> Designs by ID

    # Public & Private*
    GET | {domain}/api/v1/{shopKey}/designs/find/{design_id}

    http://skyerp.local/api/v1/acme12aa/designs/find/1   # diseños activos con ID 1 (todos los datos del diseño)


> Designs by tag ID

    # Public & Private*
    GET | {domain}/api/v1/{shopKey}/products/designs-by-tag/{tag_id}/{shorted?}

    http://skyerp.local/api/v1/acme12aa/products/designs-by-tag/1   # diseños activos asociados a la etiqueta con ID 1 (por defecto / datos mínimos)
    http://skyerp.local/api/v1/acme12aa/products/designs-by-tag/1/1 # diseños activos asociados a la etiqueta con ID 1 (datos mínimos)
    http://skyerp.local/api/v1/acme12aa/products/designs-by-tag/1/0 # diseños activos asociados a la etiqueta con ID 1 (datos adicionales: tipografía, lenguage, líneas de personalización)

    Devuelve los diseños activos, incluyendo los productos (activos) a los que estan
    asociados si estos tienen almenos una variación que puede verse o comprarse.
    Un diseño puede estar asociado a varios productos, ya que un grupo de diseños
    puede asociarse a varios productos.

***

### Products

    # Public & Private*
    GET | {domain}/api/v1/{shopKey}/products/find/{id}

    # Public & Private*
    GET | {domain}/api/v1/{shopKey}/products/{categoryId?}

Examples:

    http://skyerp.local/api/v1/acme12aa/products            # todos los productos activos (datos mínimos)
    http://skyerp.local/api/v1/acme12aa/products/1          # todos los productos activos de la categoría ID 1 (datos mínimos)
    http://skyerp.local/api/v1/acme12aa/products/find/1     # producto con ID 1 (datos adicionales: grupos de opciones, variaciones y grupo de diseños incluidos diseños completos)

**NOTA:** los **productos asignados a una categoría raiz no se devuelven**,
tampoco los productos que **NO tienen almenos una variación activa**.

##### Solicitar un producto

Si se pide un producto (`products/find/1`), el atributo `main_image`,
sólo tendrá contenido si el producto tiene al menos una imagen, está activa
y no tiene grupo de diseños.

##### Response (example):

> GET: http://skyerp.local/api/v1/acme12aa/products/find/11

{
    "data": {
        "product": {
            "id": 11,
            "name": "Botella Azul 600 ml",
            "canonical_uri": "botella-azul-600-ml",
            "description": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            "discount": "0.0000",
            "discount_type": "percentage",
            "meta_description": null,
            "meta_title": null,
            "price": "14.8700",
            "pvpr": null,
            "salable": 1,
            "shop_design_group_id": null,
            "slug": "botella-azul-600-ml",
            "weight": "0.000",
            "designGroup": null,
            "emptyStockAction": null,
            "optionGroups": null,
            "variations": [
                {
                    "id": 26,
                    "name": "Botella Azul 600 ml",
                    "description": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
                    "discount": "0.0000",
                    "discount_type": "percentage",
                    "html": null,
                    "meta_description": null,
                    "meta_title": null,
                    "option_ids": [],
                    "price": "14.8700",
                    "pvpr": null,
                    "ref": "BOTEL.1653034535",
                    "ref_cat": "BOTEL.1653034535",
                    "shop_product_id": 11,
                    "slug": "botella-azul-600-ml",
                    "stock": 25,
                    "tax": {
                        "IVA": "21.00",
                        "RE" : "5.20"
                    },
                    "weight": "0.000",
                    "emptyStockAction": {
                        "action": "Invisible",
                        "message": "Stock 0"
                    }
                }
            ],
            "images": [
                {
                    "alt": "botella azul",
                    "description": null,
                    "figcaption": null,
                    "id": 16,
                    "position": 1,
                    "src": "http://skyerp.local/images/placeholder.png",
                    "title": "600ml"
                },
                {
                    "alt": "cajita azul",
                    "description": null,
                    "figcaption": null,
                    "id": 17,
                    "position": 2,
                    "src": "http://skyerp.local/images/placeholder.png",
                    "title": "600ml"
                }
            ]
        }
    },
    "locale"  : "es",
    "message" : "Producto encontrad@",
    "status"  : 200,
    "success" : true
}


##### Solicitar productos por categoría

Si se piden productos (por categoría o todos) (`products` | `products/1`),
el atributo `images`, de cada producto, sólo tendrá contenido si el producto
tiene al menos una imagen, ésta está activa y el producto no tiene
grupo de diseños.

El precio "original" del producto NO es el reflejado en el listado,
**en su lugar se carga el precio** de la primera ***variación disponible***.
Se añadirá la propiedad "variation_id" para poder recuperar la variación
y sus opciones concretas en la página de compra y *reflejar* el mismo precio
que aparece en el listado.
Entonces en el json, cada producto, tendra su atributo `price`
y como añadido `variation_id` junto al resto *propios del producto*.
Si `price` y `variation_id` tuvieran un valor `null` o no aparecieran,
**el producto NO se debe pintar** en el listado:
*NO tendra variaciones activas*, o
*NO tendrá una variación activa con stock o en caso de haberlas*
*sin stock con la propiedad de "stock vacío" diferente de "Invisible")*.
Si hay ***variaciones disponibles*** se carga la primera de ellas,
por orden de creación.

***NOTA:** el precio de variación no tiene en cuenta, precios adicionales*
*de sus opciones o primer diseño del grupo de diseños de producto si lo hay,*
*o los descuentos que pudiera tener la propia variación o el cliente.*

***

### Packs

    # Public & Private*
    GET | {domain}/api/v1/{shopKey}/packs/find/{id}

    # Public & Private*
    GET | {domain}/api/v1/{shopKey}/packs/{categoryId?}

Examples:

    http://skyerp.local/api/v1/acme12aa/packs            # todos los packs activos (datos mínimos)
    http://skyerp.local/api/v1/acme12aa/packs/1          # todos los packs activos de la categoría ID 1 (datos mínimos)
    http://skyerp.local/api/v1/acme12aa/packs/find/1     # pack con ID 1 (datos adicionales: grupos de opciones, variaciones y grupo de diseños incluidos diseños completos)

Si se pide un *pack* (`packs/find/1`), el atributo `main_image`,
sólo tendrá contenido si el *pack* tiene al menos una imagen y está activa.

Si se piden packs (por categoría o todos) (`packs` | `packs/1`),
el atributo `images`, de cada *pack*, sólo tendrá contenido si el *pack*
tiene al menos una imagen, ésta está activa.

[Página de detalles del pack (estructura interna y administración)]("../../../pages/shop/catalog/packs.md)


***

### Buscador

Se buscan **variaciones** y **packs** activos de la tienda actual, que no esten anidados
en la categoría "root" y que tengan stock o si no lo tienen que sean "visibles".
La búsqueda se hace dentro de los ***nombres*** o de las ***referencias de catálogo***.

    # Public & Private*
    GET | {domain}/api/v1/{shopKey}/shop/search/{str}

Examples:

    http://skyerp.local/api/v1/acme12aa/shop/search/foooo

##### Response (examples):

    {
        "data": {
            "packs": [
                {
                    "id": 26,
                    "name": "Botella Azul 600 ml",
                    "slug": "botella-azul-600-ml",
                    "ref_cat": 354465656565-CK,
                },
                {
                    "id": 74,
                    "name": "Koala Rosa",
                    "slug": "koala-rosa",
                    "ref_cat": 1165656565-213,
                }
            ],
            "variations": null
        },
        "locale"  : "es",
        "message" : "Se han encontrado resultados",
        "status"  : 200,
        "success" : true
    }


    {
        "data": {
            "packs": null,
            "variations": null
        },
        "locale"  : "es",
        "message" : "No se han encontrado resultados",
        "status"  : 200,
        "success" : true
    }

***

[API]("../../../API.md)
|
[Go to index]("../../../../README.md)
