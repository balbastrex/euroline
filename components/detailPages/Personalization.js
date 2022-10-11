import React, { Fragment, useEffect, useState } from "react";

export const Personalization = (
  extraPrice,
  designSelected,
  personalization,
  setSubTotalPer,
  subTotalPer,
  setPersonalization,
  setExtraPrice,
  setFilterLineCartStored
) => {
  const [error, setError] = useState(false);
  const [required, setRequired] = useState(false);
  const [linecartsotred, setLineCartStored] = useState([]);
  const [content, setContent] = useState("");
  const [idcustomization, setIdCustomization] = useState("");
  const [dataselectcustomization, setDataSelectCustomization] = useState([]);

  useEffect(() => {
    const sumExtraPrice = () => {
      let subTotal = 0;
      if (Object.values(personalization)) {
        Object.keys(personalization).map((option) => {
          designSelected.customizations.map((customization) => {
            if (personalization[option].length >= customization.maxlength) {
              setError(true);
            }

            if (
              (personalization[option] === "" ||
                personalization[option] === "0") &&
              customization.label === option
            ) {
              subTotal -= Number(customization.extra_price);
              setSubTotalPer(subTotal);
            }
            if (customization.label === option) {
              subTotal += Number(customization.extra_price);
              setSubTotalPer(subTotal);
            }
          });
        });
      }
      designSelected.customizations.map((custom) => {
        if (custom.required === 1) {
          setRequired(true);
        }
      });
    };
    setError(false);
    sumExtraPrice();
  }, [
    designSelected.customizations,
    setSubTotalPer,
    personalization,
    setExtraPrice,
    extraPrice,
    subTotalPer,
  ]);

  const handlePersonalization = (e, customization) => {
    setPersonalization({
      ...personalization,
      [e.target.name]: e.target.value,
    });
    setContent((cont) => e.target.value);
    setIdCustomization((customizationId) => customization.id);
  };

  useEffect(() => {
    const AddItemsToCart = async () => {
      designSelected.customizations.map((customization) => {
        //Comprobamos si hay select para extraer los datos,y adecuarlos en un [] e hidratar el selector
        if (customization && customization.input_type === "other") {
          const dataSelectCustomization =
            customization.default_content.split("|");
          setDataSelectCustomization(dataSelectCustomization);
        }

        //Si "key" === "label", almacenamos el id y content para pasarlo
        for (let key in personalization) {
          if (customization.label === key) {
            setLineCartStored([
              ...linecartsotred,
              { id: idcustomization, content: content },
            ]);
          }
        }
      });
    };
    AddItemsToCart();
  }, [designSelected.customizations, personalization, content]);

  //Filtramos los objetos introducidos con id y content, cogiendo el último elemento de la coincidencia con el metodo findLastIndex
  useEffect(() => {
    const filterResults = () => {
      let withoutRepeat = linecartsotred.filter(
        (actualValue, index, storedArray) =>
          index === storedArray.findLastIndex((t) => t.id === actualValue.id)
      );

      setFilterLineCartStored((line) => withoutRepeat);
    };
    filterResults();
  }, [linecartsotred, setFilterLineCartStored]);
  return (
    <>
      {designSelected.customizations.length ? (
        <>
          {designSelected.customizations.map((customization) => {
            return (
              <Fragment key={customization.id}>
                {customization.input_type !== "other" ? (
                  <>
                    <label id={customization.label}>
                      {customization.extra_price !== "0.00" ? (
                        <>
                          {customization.label}
                          {customization.required === 1 ? <span>*</span> : null}
                          <p className="leyenda">
                            {" "}
                            (Suplemento {customization.extra_price}€)
                          </p>
                        </>
                      ) : (
                        <>
                          {customization.label}{" "}
                          {customization.required === 1 ? <span>*</span> : null}
                        </>
                      )}
                    </label>
                    <input
                      data-customization-id={customization.id}
                      data-design-id={customization.shop_design_id}
                      name={customization.label}
                      id={customization.id}
                      type={customization.input_type}
                      value={personalization.value}
                      onChange={(e) => handlePersonalization(e, customization)}
                      maxLength={customization.maxlength}
                      required={customization.required === 1 ? true : false}
                      defaultValue={
                        customization.input_type === "number" ? 0 : ""
                      }
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
                    <label id={customization.label}>
                      {customization.extra_price !== "0.00" ? (
                        <>
                          {customization.label}{" "}
                          {customization.required === 1 ? <span>*</span> : null}
                          <p className="leyenda">
                            (Suplemento {customization.extra_price}€)
                          </p>
                        </>
                      ) : (
                        <>
                          {customization.label}{" "}
                          {customization.required === 1 ? <span>*</span> : null}
                        </>
                      )}
                    </label>
                    <div className="select">
                      <select
                        data-customization-id={customization.id}
                        data-design-id={customization.shop_design_id}
                        required={customization.required === 1 ? true : false}
                        name={customization.label}
                        type={customization.input_type}
                        value={customization.value}
                        onChange={(e) =>
                          handlePersonalization(e, customization)
                        }
                      >
                        <option value="">-- Elija mes --</option>
                        {dataselectcustomization &&
                          dataselectcustomization.map((month, i) => {
                            return <option key={i}>{month}</option>;
                          })}
                      </select>
                      <span className="icon">keyboard_arrow_down</span>
                    </div>
                  </>
                )}
              </Fragment>
            );
          })}
          {required ? (
            <p className="leyenda">Campos con (*) son obligatorios</p>
          ) : null}
        </>
      ) : null}
    </>
  );
};
