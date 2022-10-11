import React from "react";

const CompanyAdditionalContent = ({
  company,
  handleChangeRegister,
  handleCheck,
}) => {
  return (
    <>
      <label>Nombre persona de contacto </label>
      <input
        type="text"
        id="contact_name"
        name="contact_name"
        value={company.contact_name}
        onChange={(e) => handleChangeRegister(e)}
      />
    </>
  );
};

export default CompanyAdditionalContent;
