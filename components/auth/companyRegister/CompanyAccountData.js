import React, { useState } from "react";

const AccountData = ({
  company,
  handleChangeRegister,
  invalidpassword,
  invalidphone,
  emailfound,
}) => {
  const [passwordshown, setPasswordShown] = useState(false);
  const [confirmpasswordShown, setConfirmPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordshown);
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordShown(!confirmpasswordShown);
  };
  return (
    <>
      <label>
        Nombre <sup>*</sup>
        <input
          type="text"
          name="name"
          value={company.name}
          onChange={(e) => handleChangeRegister(e)}
          required
        />
      </label>
      <label>
        Email <sup>*</sup>
        <input
          maxLength="150"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          type="email"
          name="email"
          value={company.email}
          onChange={(e) => handleChangeRegister(e)}
          required
        />
      </label>
      {emailfound && <p className="error-validacion">Email ya existente</p>}
      <label>
        Contraseña <sup>*</sup>
        <p className="leyenda">(Mínimo 8 caracteres)</p>
        <input
          type={passwordshown ? "text" : "password"}
          name="password"
          autoComplete={passwordshown ? "off" : "on"}
          value={company.password}
          onChange={(e) => handleChangeRegister(e)}
        />
      </label>
      <label>
        Repetir contraseña <sup>*</sup>
        <input
          type={confirmpasswordShown ? "text" : "password"}
          name="password2"
          autoComplete={passwordshown ? "off" : "on"}
          value={company.password2}
          onChange={(e) => handleChangeRegister(e)}
        />
        {invalidpassword && (
          <p className="error-validacion">Las contraseñas deben ser iguales</p>
        )}
      </label>
      <label>
        Teléfono móvil <sup>*</sup>
        <input
          type="tel"
          name="phone"
          value={company.phone}
          onChange={(e) => handleChangeRegister(e)}
          required
        />
      </label>
      <label>
        Teléfono fijo
        <input
          type="tel"
          name="phone_2"
          value={company.phone_2}
          onChange={(e) => handleChangeRegister(e)}
        />
      </label>
      {invalidphone ? (
        <p className="error-validacion">
          Teléfono fijo y móvil no pueden ser iguales
        </p>
      ) : null}
      <label>
        DNI
        <input
          type="text"
          pattern="[0-9]{8}[A-Za-z]{1}"
          name="DNI"
          value={company.DNI}
          onChange={(e) => handleChangeRegister(e)}
        />
      </label>
    </>
  );
};

export default AccountData;
