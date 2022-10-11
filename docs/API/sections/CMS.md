# CMS

### Static pages

    GET | {domain}/api/v1/{shopKey}/cms/static-pages

Examples:

    http://skyerp.local/api/v1/acme12aa/cms/static-pages

Obtiene todas las páginas de la tienda para su actualización (updated_at),
publicar (active === 1), ocultar o eliminar (active === 0 or detelet_at !== null).
Por ejemplo:

    "data":{
        "pages":[
            {
                "id"    : 6,
                "active": 1,
                "updated_at": "01-07-2022, 15:02:01"
            },
            {
                "id"    : 7,
                "active": 1,
                "updated_at": "01-07-2022, 14:41:42"
            }
        ]
    }


    GET | {domain}/api/v1/{shopKey}/cms/static-pages/{page_id}/{lang?}

Examples:

    http://skyerp.local/api/v1/acme12aa/cms/static-pages/5

Obtiene el contenido para la página con la ID indicada, si esta activa
y pertenece a la tienda actual.
Ejemplo:

    "data":{
        "page":{
            "id": 6,
            "name": "Una",
            "position": 99,
            "slug": "una",
            "meta_title": "Una",
            "meta_description": "",
            "updated_at": "01-07-2022, 17:02:01",
            "composed_body": "<body>\n<p>The first argument passed to the <span style=\"color:#ca473f\">hasManyThrough</span> method is ... of the foreign key</p>\n</body>"
        }
    }



### Tops contents

    GET | {domain}/api/v1/{shopKey}/cms/top-categories/{lang?}

Examples:

    http://skyerp.local/api/v1/acme12aa/cms/top-categories

Selección de categorías, para enlazar la página de la categoría.
Contenido (ejemplo):

    "top_categories":[
        {
            "id"      : 1,
            "alt"     : null,
            "position": 1,
            "spaces"  : 1,
            "src"     : "/images/shop/sales/shipping/carriers/correos.jpg",
            "title"   : "imagen de Accesorios de Clips",
            "category":{
                "description" : null,
                "hierarchy"   : "",
                "html"        : null,
                "id"          : null,
                "level"       : null,
                "main_image"  : null,
                "name"        : null,
                "parent_id"   : null,
                "position"    : null,
                "slug"        : null,
                "tag"         : null
            }
        },
        ...
    ]

    GET | {domain}/api/v1/{shopKey}/cms/top-designs/{lang?}

Examples:

    http://skyerp.local/api/v1/acme12aa/cms/top-designs

Selección de diseños, enlazar la página de la etiqueta del diseño.
Contenido (ejemplo):

    "top_designs":[
        {
            "id"      : 1,
            "position": 1,
            "spaces"  : 2,
            "src"     : "/images/shop/sales/shipping/carriers/correos.jpg",
            "title"   : "Diseño Top: \"Foooo\"",
            "design"  :{
                "id"  : 1,
                "name": "Foooo",
                "slug": "foooo",
                "key" : "foooo",
                "ref" : "foo",
                ...
            }
        },
        ...
    ]


***

[API]("../../../API.md)
|
[Go to index]("../../../../README.md)
