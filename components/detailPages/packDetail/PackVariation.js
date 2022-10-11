import React, { Fragment, useEffect } from "react";

const PackVariation = ({
  packProduct,
  handleChange,
  packoptionselect,
  setPackOptionSelect,
}) => {
  useEffect(() => {
    if (packProduct.optionGroups.length > 0) {
      {
        packProduct.optionGroups.map((option) => {
          {
            option.options.length === 1
              ? setPackOptionSelect({
                  ...packoptionselect,
                  [option.name]: option.options[0].name,
                })
              : null;
          }
        });
      }
    }
  }, [packProduct]);

  return (
    <Fragment>
      {packProduct.optionGroups.length ? (
        <>
          {packProduct.optionGroups.map((option) => {
            if (option.options.length !== 1) {
              return (
                <Fragment key={option.id}>
                  <label>{option.public_name}</label>
                  <div className="select">
                    <select
                      name={option.name}
                      onChange={(e) => handleChange(e)}
                      value={packoptionselect.value}
                    >
                      {option.options.map((opt) => {
                        {
                          option.options.sort((a, b) => {
                            return a.position - b.position;
                          });
                        }
                        return (
                          <option key={opt.id} value={opt.name}>
                            {opt.name}
                          </option>
                        );
                      })}
                    </select>
                    <span className="icon">keyboard_arrow_down</span>
                  </div>
                </Fragment>
              );
            }
          })}
        </>
      ) : (
        <>
          {packProduct.optionGroups.map((option) => {
            <>
              <label key={option.id}>{optGroup.public_name}</label>
              <input
                name={optGroup.key}
                value={optGroup.options[0].name}
                readOnly
              ></input>
            </>;
          })}
        </>
      )}
    </Fragment>
  );
};

export default PackVariation;
