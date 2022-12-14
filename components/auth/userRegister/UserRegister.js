import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "context/user/userContext";
import { CartContext } from "context/cart/cartContext";
import { userRegister, confirmRegisterEmail, authLogin } from "api/apiRoutes";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { detelteCartToken, getStoredAnonymousCartToken } from "../authHelpers";

const UserRegister = () => {
  const {
    user,
    login,
    setUser,
    setLogin,
    initialUser,
    initialLogin,
    setTokenSession,
    tokensession,
    tokenstored,
    setTokenStored,
  } = useContext(UserContext);
  const cartContext = useContext(CartContext);
  const { cart, setCart, addCart, tokenCart, setTokenCart } = cartContext;
  const [invalidpassword, setInvalidPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [emailfound, setEmailfound] = useState(false);
  const [loginerror, setLoginError] = useState(false);
  const [loginok, setLoginOk] = useState(false);
  const [carttoken, setCartToken] = useState("");
  const router = useRouter();

  //Comprobamos si hay token de carro en localStorage y si lo hay lo almacenamos en carttoken
  useEffect(() => {
    const loadUser = async () => {
      const loggedUserJSON = window.localStorage.getItem(
        "tokenSessionStorageClient"
      );
      const anonimousCartToken = await getStoredAnonymousCartToken();
      if (anonimousCartToken) {
        setCartToken(anonimousCartToken);
      }
      if (!loggedUserJSON) {
        return;
      }
      try {
        setTokenStored(true);
      } catch (error) {
        console.log(error);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    const getCartToken = async () => {
      const localCartToken = await getStoredAnonymousCartToken();
      if (localCartToken) {
        initialLogin.token = localCartToken;
      }
    };
    getCartToken();
  }, [initialLogin]);

  const handleChangeRegister = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleChangeLogin = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value, token: carttoken });
  };

  const handleRadio = async (e) => {
    const checked = e.target.checked;
    const checkboxvalue = e.target.value;
    const checkname = e.target.name;

    for (let i in user) {
      if (checked && i === checkname && !user[i].includes(checkboxvalue)) {
        user[i].push(checkboxvalue);
      } else if (!checked && i === checkname) {
        let filterCheckBox = user[i].filter((value) => value !== checkboxvalue);

        return (user[i] = filterCheckBox);
      }
    }
  };

  const handleCheck = (e) => {
    setUser({ ...user, [e.target.name]: e.target.checked });
  };

  const handleSesion = (estado) => {
    if (open !== estado) {
      setOpen(estado);
    }
  };

  const handleSubmitRegister = async (registerEmail, e) => {
    e.preventDefault();

    //Validamos que no haya ning??n campo vac??o
    if (
      user.name.trim() !== "" ||
      user.email.trim() !== "" ||
      user.password.trim() !== "" ||
      user.password2.trim() !== ""
    ) {
      //Validamos que las contrase??as sean iguales
      if (user.password !== user.password2) {
        setInvalidPassword(true);
        return;
      }

      //Validaci??n del correo
      const emailChecked = await confirmRegisterEmail(registerEmail);

      if (emailChecked === "Email encontrad@") {
        setEmailfound(true);
        return;
      }

      setLoginOk(true);

      //Mensage Toast de registro correcto
      toast.success("??????Registrad@ correctamente!", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toast",
      });

      setTimeout(() => {
        setLoginOk(false);
        setEmailfound(false);
        setInvalidPassword(false);
        setUser(initialUser);
        userRegister(user);
        handleSesion(false);
        /* e.target.reset() */
      }, 3000);
    }
  };

  //Logueamos
  const handleSubmitLogin = async (login, e) => {
    e.preventDefault();

    //Enviamos los datos de login para recibir el token
    const loginResponse = await authLogin(login);
    console.log(loginResponse);
    //Almacenamos el token en el localStorage con el nombre de "tokensession"
    if (!loginResponse) {
      setLogin(initialLogin);
      setTimeout(() => {
        setLoginError(false);
      }, 3000);
      setLoginError(true);
      /* handleSesion(true); */
    } else {
      window.localStorage.setItem(
        "tokenSessionStorageClient",
        loginResponse.token.access_token
      );

      setTokenStored(true);
      detelteCartToken();
      setCart(() => loginResponse.cart);
      setTokenCart("");
      setLogin(initialLogin);
      router.push("/");
    }
    setLogin(initialLogin);
  };

  return (
    <>
      <section>
        <div id="inicio-registro" className="container">
          <div className="tit">
            <input
              id="sesion"
              name="sesion"
              type="radio"
              readOnly
              checked={!open ? true : false}
              value={open}
              onClick={() => handleSesion(false)}
            />
            <p>INICIA SESI??N</p>
          </div>
          <div className="tit">
            <input
              id="registro"
              name="registro"
              type="radio"
              readOnly
              checked={open ? true : false}
              value={open}
              onClick={() => handleSesion(true)}
            />
            <p>REG??STRATE</p>
          </div>
          {loginok && <ToastContainer />}
          <div className="formularios" style={{ height: "auto" }}>
            {!open ? (
              <>
                <form
                  className="sesion open"
                  onSubmit={(e) => handleSubmitLogin(login, e)}
                >
                  <label>Email</label>
                  <input
                    onChange={(e) => handleChangeLogin(e)}
                    id="email"
                    type="email"
                    name="email"
                    value={login.email}
                    required
                  />

                  <label>Contrase??a</label>
                  <input
                    id="pass"
                    type="password"
                    name="password"
                    value={login.password}
                    onChange={(e) => handleChangeLogin(e)}
                    autoComplete="on"
                    required
                  />

                  {loginerror && (
                    <p className="error-validacion">
                      Su email o contrase??a no coinciden. Int??ntelo de nuevo
                    </p>
                  )}
                  <input className="recordar" type="checkbox" />
                  <span>Recordar contrase??a</span>
                  <input type="submit" value="Enviar" />
                  <br />
                  <a href="#" className="olvidado">
                    ??Has olvidado tu contrase??a?
                  </a>
                </form>
              </>
            ) : (
              <form
                className="registro open"
                onSubmit={(e) => handleSubmitRegister(user.email, e)}
              >
                <h6>Soy particular</h6>
                <label>Nombre</label>
                <input
                  id="text"
                  name="name"
                  type="text"
                  value={user.name}
                  required
                  onChange={(e) => handleChangeRegister(e)}
                />
                <label>Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  required
                  onChange={(e) => handleChangeRegister(e)}
                />
                {emailfound && (
                  <p className="error-validacion">Email ya existente</p>
                )}
                <label>Contrase??a</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={user.password}
                  required
                  autoComplete="on"
                  onChange={(e) => handleChangeRegister(e)}
                />
                <label>Repetir Contrase??a</label>
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  value={user.password2}
                  required
                  autoComplete="on"
                  onChange={(e) => handleChangeRegister(e)}
                />
                {invalidpassword && (
                  <p className="error-validacion">
                    Las contrase??as deben ser iguales
                  </p>
                )}
                <input type="submit" value={"Enviar"} />
                <br />
                <Link href="/auth/company/register-company">
                  <a className="profesional">
                    Me gustar??a darme de alta como profesional
                  </a>
                </Link>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default UserRegister;
