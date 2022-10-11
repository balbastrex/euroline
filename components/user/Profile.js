import React, { useContext } from "react";
import { UserContext } from "context/user/userContext";
import { CartContext } from "context/cart/cartContext";
import { useRouter } from "next/router";

const Profile = () => {
  const cartContext = useContext(CartContext);
  const { setCart } = cartContext;
  const { setTokenStored } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("tokenSessionStorageClient");
    setCart([]);
    setTokenStored(false);
    router.push("/");
  };
  return (
    <section>
      <div className="container">
        <ul>
          <li>Mis Pedidos</li>
          <li>Mis Facturas</li>
          <li>Mis datos</li>
        </ul>
        <div
          className="formularios"
          style={{ minWidth: "10%", width: "100px" }}
        >
          <form>
            <input
              onClick={(e) => handleLogout(e)}
              type="submit"
              value="Logout"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
