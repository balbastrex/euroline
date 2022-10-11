import React, { useState, useEffect, Fragment } from "react";
/* import styles from "styles/CardDetail.module.css"; */

const PackCustomization = ({ packProducts }) => {
  const [error, setError] = useState(false);
  const [personalization, setPersonalization] = useState({});
  const [required, setRequired] = useState(false);
  /*   const [products, setProducts] = useState([]); */

  let allCustomizations = [];
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  let customsMapArr;
  let filterCustomizations;

  ///Filtrar Personalizaciones

  ///Metemos todas las personalizaciones en allCustomizations
  packProducts.map((product) =>
    product.designs.map((design) =>
      design.customizations.map((custom) => allCustomizations.push(custom))
    )
  );

  ///Eliminamos las personalizaciones repetidas
  const allCustom = allCustomizations.map((custom) => {
    return [custom.label, custom];
  });

  customsMapArr = new Map(allCustom);
  filterCustomizations = [...customsMapArr.values()];

  ///

  useEffect(() => {
    const packsCustomization = () => {
      if (Object.values(personalization)) {
        Object.keys(personalization).map((option) =>
          filterCustomizations.map((customization) => {
            if (personalization[option].length >= customization.maxlength) {
              setError(true);
            }
            if (customization.required === 1) {
              setRequired(true);
            }
          })
        );
      }
      filterCustomizations.map((customization) => {
        if (customization.required === 1) {
          setRequired(true);
        }
      });
    };
    setError(false);
    packsCustomization();
  }, [customsMapArr, filterCustomizations, personalization]);

  const handlePersonalization = (e) => {
    setPersonalization({
      ...personalization,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {filterCustomizations.map((customization) => {
        return (
          <Fragment key={customization.id}>
            {customization.input_type !== "other" ? (
              <>
                <label>
                  {customization.required === 1 ? <span>*</span> : null}
                  <span>{customization.label}</span>
                </label>
                <input
                  name={customization.label}
                  type={customization.input_type}
                  value={personalization.value}
                  onChange={(e) => handlePersonalization(e)}
                  maxLength={customization.maxlength}
                  required={customization.required === 1 ? true : false}
                  defaultValue={customization.input_type === "number" ? 0 : ""}
                  min="0"
                />
                {customization.maxlength &&
                error &&
                customization.input_type === "text" ? (
                  <p className="error-validacion">
                    Máximo {customization.maxlength} caracteres
                  </p>
                ) : null}
              </>
            ) : (
              <>
                <label>
                  <span>{customization.label}</span>
                  {customization.required === 1 ? <span>*</span> : null}{" "}
                </label>
                <select
                  required={customization.required === 1 ? true : false}
                  name={customization.label}
                  type={customization.input_type}
                  value={customization.value}
                  onChange={(e) => handlePersonalization(e)}
                >
                  <option value="">-- Elija mes --</option>
                  {months.map((month, i) => {
                    return <option key={i}>{month}</option>;
                  })}
                </select>
              </>
            )}
          </Fragment>
        );
      })}
      {required ? (
        <p className="aviso-validacion">Campos con (*) son obligatorios</p>
      ) : null}
    </>
  );
};

export default PackCustomization;
