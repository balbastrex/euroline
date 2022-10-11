import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "context/user/userContext";
import { useRouter } from "next/router";
import {
  companyRegister,
  confirmCifCompany,
  confirmRegisterEmail,
} from "api/apiRoutes";
import CompanyAccountData from "./CompanyAccountData";
import CompanyAdditionalContent from "./CompanyAdditionalContent";
import CompanyAddressData from "./CompanyAddressData";
import CompanyData from "./CompanyData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompanyRegister = () => {
  const { company, setCompany, initialCompany } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [invalidpassword, setInvalidPassword] = useState(false);
  const [invalidphone, setInvalidPhone] = useState(false);
  const [confirmcif, setConfirmCif] = useState(false);
  const [companyregisterok, setCompanyRegisterOk] = useState(false);
  const [emailfound, setEmailfound] = useState(false);

  const router = useRouter();

  let controlMessageErrorsResponse = [];

  useEffect(() => {
    if (
      company.phone !== "" &&
      company.phone_2 !== "" &&
      company.phone === company.phone_2
    ) {
      setInvalidPhone(true);
      return;
    }
    setInvalidPhone(false);
  }, [company]);

  const handleChangeRegister = async (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleRadio = async (e) => {
    const checked = e.target.checked;
    const checkboxvalue = e.target.value;
    const checkname = e.target.name;

    for (let i in company) {
      if (checked && i === checkname && !company[i].includes(checkboxvalue)) {
        company[i].push(checkboxvalue);
      } else if (!checked && i === checkname) {
        let filterCheckBox = company[i].filter(
          (value) => value !== checkboxvalue
        );

        return (company[i] = filterCheckBox);
      }
    }
  };

  const handleCheck = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.checked });
  };

  const handleSubmitRegister = async (e, registerEmail) => {
    e.preventDefault();

    //confirmamos si ya existe el CIF de la empresa
    const confirmCif = await confirmCifCompany(company.CIF);
    if (confirmCif === "Identificador encontrad@") {
      setConfirmCif(true);
      return;
    }

    //confirmamos si ya existe el Email de la empresa
    const emailChecked = await confirmRegisterEmail(registerEmail);

    if (emailChecked === "Email encontrad@") {
      setEmailfound(true);
      return;
    }

    //Confirmamos que las contraseñas son iguales
    if (company.password !== company.password2) {
      setInvalidPassword(true);
      return;
    }

    //Confirmamos que los teléfonos no son iguales
    if (company.phone === company.phone_2) {
      setInvalidPhone(true);
      return;
    }
    setInvalidPhone(false);
    const response = await companyRegister(company);

    if (response && response.status === 200) {
      setCompanyRegisterOk(true);

      //Mensage Toast de registro correcto
      toast.success("👌 ¡Solicitud de registro enviada correctamente!", {
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
        setCompanyRegisterOk(false);
        setConfirmCif(false);
        setInvalidPassword(false);
        setCompany(initialCompany);
        router.push("/");
      }, 3000);
    } else if (response && response.status === 400) {
      //Almacenamos en Array las keys de los errores
      controlMessageErrorsResponse = Object.keys(response.data.errors);
      setCompanyRegisterOk(true);
      //Mensage Toast de registro correcto
      toast.error(`🕵️‍♀️ Algun dato es incorrecto o ya está registrado`, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toast",
      });
    }
  };

  const handleSesion = (estado) => {
    if (open !== estado) {
      setOpen(estado);
    }
  };
  return (
    <section>
      <div id="inicio-registro" className="container">
        <div className="tit pro">
          <input
            id="registro"
            type="radio"
            name="selector"
            checked="cheked"
            readOnly
            style={{ pointerEvents: "none" }}
          />
          <p>REGÍSTRATE</p>
        </div>
        <div className="formularios">
          <form
            className="registro-profesional open"
            onSubmit={(e) => handleSubmitRegister(e, company.email)}
          >
            {companyregisterok && <ToastContainer />}
            <h6>Soy profesional</h6>
            <CompanyAccountData
              company={company}
              handleChangeRegister={handleChangeRegister}
              invalidpassword={invalidpassword}
              invalidphone={invalidphone}
              emailfound={emailfound}
            />
            <CompanyData
              company={company}
              handleChangeRegister={handleChangeRegister}
              handleRadio={handleRadio}
              handleCheck={handleCheck}
              confirmcif={confirmcif}
            />
            <CompanyAddressData
              company={company}
              handleChangeRegister={handleChangeRegister}
              handleRadio={handleRadio}
              handleCheck={handleCheck}
            />
            <CompanyAdditionalContent
              company={company}
              handleChangeRegister={handleChangeRegister}
              handleCheck={handleCheck}
            />
            <input type="submit" value="Solicitar el alta como profesional" />
            <br />
          </form>
        </div>
      </div>
    </section>
  );
};

export default CompanyRegister;
