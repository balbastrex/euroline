import { createContext, useState, useEffect, useContext } from "react";
import { getStoredAnonymousCartToken } from "components/auth/authHelpers";
import { UserContext } from "context/user/userContext";
import { getCustomerCart } from "api/apiRoutes";

export const CartContext = createContext();

const CartProvider = (props) => {
  const { tokensession, initialLogin } = useContext(UserContext);
  const [cart, setCart] = useState([]);
  const [tokenCart, setTokenCart] = useState("");
  const initialCartLinePayload = {
    design_id: null,
    design_customizations: [
      { id: "", content: "" },
      { id: "", content: "" },
    ],
    id: "",
    quantity: "",
    type: "",
    shop_option_ids: [],
  };
  const [cartlinepayload, setCartLinePayload] = useState(
    initialCartLinePayload
  );

  useEffect(() => {
    const storedTokenCart = async () => {
      const tokenStored = await getStoredAnonymousCartToken();
      if (tokenStored) {
        setTokenCart(() => tokenStored);
      }
    };
    storedTokenCart();
  }, [cart, tokenCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartlinepayload,
        tokenCart,
        initialCartLinePayload,
        setTokenCart,
        setCartLinePayload,
        setCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
