import { createContext, useState, useEffect, useContext } from "react";
import { getStoredAnonymousCartToken } from "components/auth/authHelpers";

export const UserContext = createContext();

const UserProvider = (props) => {
  const initialCompany = {
    _method: "POST",
    name: "",
    email: "",
    password: "",
    password2: "",
    phone: "",
    phone_2: "",
    DNI: "",
    tradename: "",
    companyname: "",
    CIF: "",
    re: 1,
    iva: 1,
    address: "",
    city: "",
    postcode: "",
    clone_as_delivery_address: 0,
    address_name: "",
    customer_groups: [],
    subscriptions: [],
    contact_name: "",
    add_company: 1,
    register_company: 1,
    company_types: [],
    region_id: "",
    country_id: "",
  };

  const initialUser = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };

  const [tokenstored, setTokenStored] = useState("");

  const initialLogin = {
    email: "",
    password: "",
    token: "",
  };

  const [company, setCompany] = useState(initialCompany);

  const [user, setUser] = useState(initialUser);

  const [login, setLogin] = useState(initialLogin);
  const [tokensession, setTokenSession] = useState("");

  return (
    <UserContext.Provider
      value={{
        initialCompany,
        initialUser,
        initialLogin,
        user,
        login,
        company,
        tokensession,
        tokenstored,
        setTokenStored,
        setUser,
        setLogin,
        setCompany,
        setTokenSession,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
