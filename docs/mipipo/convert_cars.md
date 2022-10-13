# Convert Cars App

## Intro

Convert Cars es un **Marketplace** enfocado al profesional dedicado a la venta de productos de personalización para automóviles. [Convert Cars](https://www.convertcars.net/es/).



<kbd>
<img src="./images/menumascarillas.PNG" alt="mi_pipo-inicio"  />
</kbd>



## State

Proyecto en su parte inicial-intermedia de desarrollo. El menú está dividido en Categorías y subcategorías. Navegando por él, podrás acceder a los productos, los cuales se representan en una cuadrícula con cada uno de sus diseños o productos finales, imagen, precio y nombre. Haciendo click en ellos, vas a la página de detalle del producto donde en caso de tener variaciones (tallas, color, etc) u opciones (líneas de texto, mes de nacimiento, etc), lo podrás seleccionar y añadir al carrito de compra para una posterior compra. 


# Requerimients

> - [Next.js](https://nextjs.org/)
> - [React](https://es.reactjs.org/)
> - [React-dom](https://es.reactjs.org/docs/react-dom.html):
> - [Axios](https://github.com/axios/axios): Para  hacer peticiones asíncronas HTTP a un servidor con Node.js
> - [React HTML Parser](https://www.npmjs.com/package/react-html-parser): Evita el uso peligroso de SetInnerHTML y convierte elementos HTML estándar, atributos y estilos en línea en sus equivalentes de React.
> - [Node.js](https://nodejs.org/es/)


# How to start

- Debes descargar o clonar el repositorio
- *`git clone https://github.com/skydonesolutions/front-mipipo.git`*
- Entra en el directorio front-mipipo
- Ejecutamos `npm install`
- Creamos archivo **.env.local** y declaramos las Variables de Entorno correctamente `KEY=value`. En caso de desconocerlas, puedes buscar en tu editor de código *"process.env"* y crearlas tú mismo con los [Endpoints]('../../../endpoints.md) que tenemos. Es muy importante saber que en la parte del front de Next.js las llamadas a los Endpoints con Variables de Entorno se deben hacer con el siguiente formato: `process.env.NEXT_PUBLIC_(Variable_de_entorno)` y en caso de hacerlo en la parte del servidor: `process.env.(Variable_de_entorno)`. Al ser un repositorio privado, estas variables de entorno se descargarán junto al resto de archivos del proyecto, para que una vez clonado e instaladas las dependencias, esté listo para trabajar con el proyecto.
- Ejecutamos `npm run dev` para lanzar el proyecto
- En tu navegador ve a [http://localhost:3200/](http://localhost:3200/)



<kbd>
<img src="./images/iniciomipipo.PNG" alt="mi_pipo-inicio"  />
</kbd>


# Port Configuration

Por defecto, Next.js ejecuta su aplicación en el Puerto 3000, para evitar posibles conflictos, hemos configurado la aplicación para que "corra" en el puerto 3200. 

En el los scripts del package.js le he indicado que en el modo desarrollo `dev` se ejecuta en el **Puerto `3200`**.

```
  "scripts": {
    "dev": "next dev -p 3200",
    "build": "next build",
    "start-local": "next start",
    "start": "NODE_ENV=production node server.js",
    "export": "next export",
    "deploy": "npm run build && npm run export",
    "lint": "next lint"
  },
```

# Folder organization:

  - .next: Carpeta generada por next al hacer el deploy para subirlo a producción (no tocamos).
api: Dentro organizamos todas las llamadas contra la api.
components: 
  - auth: Todo lo referente al registro de usuarios y compañias, autenticacion, login, etc.:
    - companyRegister
    - userRegister
    - authHelpers
  - cart: Carrito de compra
  - categories: Extraemos y ordenamos las categorias y subcategorias en las que se dividen los artículos.
  - designs: Agrupamos, filtramos y presentamos todos los artículos de cada categoria.
  - detailPages: Dentro de esta carpeta teneos por un lado las páginas de detalle de los artículos y en otra subcarpeta de los packs. 
  - layout: Footer y header que aparecerán en todas las páginas. 
  - menu: Categorias listadas para acceder a cada categoria y/o subcategoria.
  - -ui: Dentro encontraremos los componentes relacionados con la experiencia de usuario y/o diseño que podrás utilizar en otros componentes (Spinner, Breadcrumbs, DesignCards, etc.).
  - user: Aquí encontraremos diferentes componentes sobre la información del usuario (Perfil, facturas, pedidos, etc.).
config: Carpeta utilizada para la configuracion de Axios.
context: Encontraremos los contextos del carro, usuario, categorias y diseños.
docs: Archivo donde por un lado explicamos la los Endpoints, respuestas y payloads de la api y por otro documentamos la aplicación.
pages: Donde asociamos cualquier archivo dentro de este directorio como una ruta.
  - _app.js: Archivo que next utiliza para inicializar las páginas, pasar props, "abrazar" los componentes con los context necesarios, crear estados golbales, etc.
  - _documents: Archivo que nos permite cambiar la configuración de nuestra aplicación (por ejemplo, los estilos los aplicamos desde un archivo externo en lugar de la carpeta "styles").
  - index.js: Componente de partida, ruta inicial ("/").
public: Imágenes estaticas.
styles: En nuestra aplicación los estilos son traídos desde un archivo externo, por lo tanto, lo utilizamos para momentos muy puntuales:
  - global.css: Archivo principal de CSS y siempre debe estar.
  - Spinner: Dentro de la carpeta "ui" damos estilo al spinner de carga.
  - normalize: Archivo encargado de configurar estilos generale para adaptar a todos los navegadores.
.env.local: Almacenamos todas las variables de entorno.

# Environment Variables 

Son utilizadas para evitar exponer las claves privadas, contraseñas u otros datos confidenciales. La Varaible de Entorno es un par **`KEY=value`** que se almacena en el sistema local donde se ejecuta su aplicación y es accesible desde su código. 

Las listamos en nuestro archivo **.env.local** de la siguiente manera: 

(Ejemplo de Variables de Entorno ficticias)

```

# FRONT

## Base Url
NEXT_PUBLIC_API_URL=https://erpfm.skydone.net/api/v1/mipipo12

## Images
NEXT_PUBLIC_PRODUCT_IMAGE_URL=https://erpfm.skydone.net

...

# BACK

## Base Url
API_URL=https://erpfm.skydone.net/api/v1/mipipo12

## Images
PRODUCT_IMAGE_URL=https://erpfm.skydone.net

...

```


## Environment Variables used:

#### Images
En la etiqueta `<Image>` o `<img>`, utilizamos la Variable de Entorno de `PRODUCT_IMAGE_URL` en el atributo `src`, para traer la imagen correspondiente de cada producto: 

src=`${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${principalCat[0].main_image.src}`

#### Api URL
En el ***archivo `configAxios`*** dentro de la ***carpeta `config`*** utilizamos `NEXT_PUBLIC_API_URL` para crear la baseURL de axios y realizar las llamadas asíncronas a la base de datos. 


#### File configAxios.js: 
``` 
import axios from "axios";

const clienteAxios = axios.create({
  baseURL: .NEXT_PUBLIC_API_URL,
});
export default clienteAxios;
```


## Getting Data from DDBB

En el ***archivo apiRoutes*** dentro de la ***carpeta api***, encontraremos todas las funciones con nombre descriptivo de la información que extrae de la base de datos. De esta forma, solo tendremos que importar la función en el componente que necesitemos y realizaremos las llamadas necesarias a la Base de Datos para obtener los datos deseados: 

#### *File apiRoutes.js:*
```
...

export const getAllCategories = async () => {
  try {
    const response = await clienteAxios.get(`categories`);
    return response.data.data.categories;
  } catch (error) {
    "There are an error getting Categories", error;
  }
};

export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await clienteAxios.get(`products/${categoryId}`);
    return response.data;
  } catch (error) {
    console.log("There are an error getting Products by Category", error);
  }
};

...

```

De esta manera, si quisiéramos obtener todas las categorías, primero importariamos la función y la utilizaríamos sin tener que repetir código: 


```
import { getAllCategories } from "/api/apiRoutes";

...

export async function getStaticPaths() {
  const AllCategories = await getAllCategories();

  const paths = await AllCategories.map((category) => ({
    params: { slug: category.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

...

```

#### *FunctionName : Data Return:*
##### Ejemplos:

> - ***getAllCategories***: Devuelve todas las Categorías
> - ***getAllProducts***: Devuelve todos los productos
> - ***getProductsByCategory***: Devuelve todos los productos por categoría, pasando el Id de la categoría.
> - ***getProduct***: Devuelve el producto correspondiente al Id que le pasemos
> - ***getDesignGroupsById***: Devuelve el grupo de diseño correspondiente al Id que le pasemos  


## Getting Data from localstorage

De la misma manera que hemos hecho con las llamadas contra la API, en el ***archivo authHelpers***  dentro de  la ***carpeta auth***, encontraremos todas las funciones con nombre descriptivo de la información que extrae del almacenamiento local. De esta forma, solo tendremos que importar la función en el componente que necesitemos y realizaremos las llamadas necesarias a la para obtener los datos deseados.

En este mismo archivo tenemos configurado un middleware para que en caso de tener activa una sesión, pasemos en la cabecera de cada petición axios este toquen como atorización bearer: 

```
//Si hay token de sesión, lo incluimos en la cabecera de todas las llamadas a la Api
export const initAxiosInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const tokenSessionStorageClient = getTokenSession();
      if (tokenSessionStorageClient) {
        config.headers.Authorization = `Bearer ${tokenSessionStorageClient.replace(
          /[ '"]+/g,
          " "
        )}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
```

Ejemplo de llamadas a localstorage son: 

```
//CART TOKEN

//Almacenamos el token de Carrito si no está logueado en localStorage con el nombre tokenSessionStorageClient
export const setAnonymousCartToken = async (cartToken) => {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("anonymousCartToken", cartToken);
    }
  } catch (error) {
    console.log(error);
  }
};

//Obtenemos el token de Carrito si no está logueado de localStorage
export const getStoredAnonymousCartToken = async () => {
  try {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem("anonymousCartToken");
    }
  } catch (error) {
    console.log(error);
  }
};

//Borramos el token de carrito
export const detelteCartToken = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("anonymousCartToken");
  }
};
```


# Auth

Al iniciar sesión (Login), recibiremos un token de acceso, el cual se almacenará en la BBDD y almacenaremos en localStorage con el nombre de tokenSessionStorageClient para guardar sus datos de sesión (el carrito, por ejemplo). Este token, lo enviamos en la cabecera de cada petición al servidor como Bearer token, de esta manera filtraremos ciertos datos segun este token o la ausencia de él. 

Ejemplo token de autenticación: 

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZXJwLnNreWRvbmUubmV0XC9hcGlcL3YxXC9hY21lMTJhYVwvY3VzdG9tZXJzXC9sb2dpbiIsImlhdCI6MTY2MzkyODI3NywiZXhwIjoxNjY0MDE0Njc3LCJuYmYiOjE2NjM5MjgyNzcsImp0aSI6IkNUYzJpZFBtQ1JDMUFSRVgiLCJzdWIiOjI4LCJwcnYiOiI1NDNkNmI2MTIzMWM3MTM1NmJhZDZjYWIxOTUxZGViMmQzOTk5MzE3In0.nurP4P94aAjXTRcjjXPSX7jHA5MDZlm8neq9B1JMoRI
```


# Cart

El carro de compra puede ser: 
- Público (de ususario sin autenticar). El usuario nunca podrá finalizar la compra sin haberse registrado, por lo tanto, sin estar autenticado, pero si podrá ir añadiendo artículos al carro siempre que quiera y este carro lo mantendrá en su dispositivo durante el tiempo establecido por la configuración del token de  carro que almacenaremos en localStorage con el nombre de: anonymousCartToken. Es posible añadir artículos a un carro privado y hacer login después. En este caso, el carro pasa a ser privado y sólo pertenecerá a este usuario. 
- Privado (de usuario autenticado): El carro privado, es el carro que pertenece a un usuario ya autenticado y "logueado". En el mismo momento de iniciar sesión, este usuario tendrá su carro disponible con los artículos añadidos previamenteo en caso de haberlos. 


# Deploy Mi Pipo on Plesk

Con el panel de control Plesk, alojaremos la web. Dentro del dominio Skydone.net, hemos creado el subdomino *frontdev.skydone.net*. 


### Requirements

>- Servidor con Control Panel Plesk ya configurado
>- Extensiones NodeJS y Git ya instalados y configurados.
>- El dominio ya debe estar configurado con Git en Plesk

<br/>Sitios web y dominios => frontdev.skydone.net => Heramientas de desarrollo

Para subir nuestro proyecto y/o sus cambios con Git al servidor enlazaremos nuestra cuenta de [Github](https://github.com/skydonesolutions/front-mipipo.git) con el panel de control de [Plesk](http://185.104.152.178:8880) y pulsando el botón ***"Pull ahora"***, se registrarán los cambios automáticamente y ejecutamos el comando de compilación:
Run script => Script name and parameters: build => Run => Reiniciar app



<kbd>
<img src="./images/git_MiPipo_Server.PNG" alt="git_MiPipo_Server"  />
</kbd>



<br/><br/>En caso de no ir todo correctamente, es recomendable, para evitar algún error, antes del siguiente paso o si modificamos cualquier archivo que pueda afectar al despliegue del proyecto, vayamos a Archivos, borraremos node_modules y package-lock.json y pulsemos ***"Instalación de NPM"*** (Este paso lo repetiré durante el proceso, cuando algo no vaya bien 👩‍💻)


(Siempre que instalemos node_modules de nuevo, debemos realizar el siguiente paso)

Abrimos Putty => ServidorW => Load => Open => login as: root => password: ********* =>  cd /var/www/vhosts/convertcars.net/frontdev.skydone.net/node_modules/.bin => nano next => línea 45 cambiamos const defaultCommand ="dev" por const defaultCommand ="start".

- npm cache clean --force
- rm -rf node_modules package-lock.json
- npm install
- npm run start

Volvemos a realizar estos pasos: Run script => Script name and parameters: build => Run => Reiniciar app


Entraremos en Node.js y configuraremos el archivo de inicio de la siguiente manera: 



<kbd>
<img src="./images/node_MiPipo_Server.PNG" alt="node_MiPipo_Server"  />
</kbd>



<br/><br/>**Raíz del documento**: Esto debería apuntar a la carpeta de archivos estáticos después de compilar el proyecto (en la carpeta .next). Esto contiene todos sus archivos css, imágenes, etc.

**Modo de aplicación**: Esto no funciona con Plesk, siempre ejecutará la versión de desarrollo de la aplicación NextJS

Compartiré cómo hacer que funcione para ejecutar la aplicación en modo de producción en el siguiente paso.

**Archivo de inicio de la aplicación**: Aquí, debemos colocar el archivo cli principal de NextJS que reside en/node_modules/.bin/next


Una vez que hayamos terminado de hacer los cambios anteriores, ejecute el comando de compilación:
Run script => Script name and parameters: build => Run => Reiniciar app

(En caso de error: Archivos => borraremos node_modules y package-lock.json => Node.js => Instalación de NPM => Ejecutar Script (build) => Reiniciar app )


3, 2, 1... 🚀🚀🚀 ¡Desplegado!



#### Go to:
 * [Endpoints]('../../../endpoints.md)
 * [README.md]('../../../../README.md)


