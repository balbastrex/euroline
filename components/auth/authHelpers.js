import axios from "/config/configAxios";

//SESSION TOKEN

//Almacenamos el token de sesión en localStorage con el nombre tokenSessionStorageClient
export const setTokenSession = (tokensession) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("tokenSessionStorageClient", tokensession);
  }
};

//Obtenemos el token de sesión de localStorage
export const getTokenSession = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("tokenSessionStorageClient");
  }
};

//Borramos el token de sesión
export const detelteTokenSession = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("tokenSessionStorageClient");
  }
};

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
