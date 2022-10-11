import React from "react";

const CompanyData = ({
  company,
  handleChangeRegister,
  handleRadio,
  handleCheck,
  confirmcif,
}) => {
  return (
    <>
      <label>
        Nombre comercial o marca <sup>*</sup>
        <input
          type="text"
          id="tradename"
          name="tradename"
          value={company.tradename}
          onChange={(e) => handleChangeRegister(e)}
          required
        />
      </label>
      <label>
        Nombre empresa o razón social <sup>*</sup>
        <input
          type="text"
          id="companyname"
          name="companyname"
          value={company.companyname}
          onChange={(e) => handleChangeRegister(e)}
          required
        />
      </label>
      <label>
        CIF <sup>*</sup>
        <input
          type="text"
          id="CIF"
          name="CIF"
          value={company.CIF}
          onChange={(e) => handleChangeRegister(e)}
          required
        />
      </label>
      {confirmcif && <p>CIF ya existente</p>}
      <div>
        <label>
          <input
            type="checkbox"
            id="re"
            name="re"
            value={company.re}
            onChange={(e) => handleCheck(e)}
          />
          ¿Usa RE?
        </label>
      </div>
      <label>
        <input
          type="checkbox"
          id="iva"
          name="iva"
          value={company.iva}
          onChange={(e) => handleCheck(e)}
        />
        ¿Paga IVA?
      </label>
    </>
  );
};

export default CompanyData;
