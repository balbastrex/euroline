# API security concerns

### CORS Configuration

 Set CORS paths, allowed_methods, allowed_origins, allowed_headers, etc.
 in the config file: `config/cors.php`.
 The middleware `\Fruitcake\Cors\HandleCors::class` must be uncomment
 on the ***protected middlewares array*** on `Kernel.php`.

### Throttle limit

Set the number of accepted calls from the same origin by minute.
General setting is on `Kernel.php`:

    protected $middlewareGroups = [
        'api' => [
            'throttle:1000,1',
            ...
        ],
    ];

Set custom throttle limits by groups on the routes files.

### API keys, tokens, etc

#### The shopKey

The `shopKey` on the API endpoints allow the application to indetificate
the current shop in use.
A valid `shopKey` is neccesary and the data depend of the shop that can be
identified by this key.
The keys should change periodically or if some front side app that use
the API end to work.

#### JWT

The authentication are handle with [JWT Tymon Package](https://github.com/tymondesigns/jwt-auth)


***

[API]("../../../API.md)
|
[Go to index]("../../../../README.md)
