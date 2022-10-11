import React, { Fragment, useEffect, useState } from "react";
import PackCard from "./packDetail/PackCard";

export const Variations = (
  product,
  variation,
  packDetail,
  discount,
  subTotalPer,
  setExtraPrice,
  initialOptions,
  optionsId,
  setOptionsId,
  setVariation,
  variationSelected,
  setTotal,
  cartproduct,
  setCartProduct,
  cartlinepayload,
  setCartLinePayload
) => {
  const [optionSelect, setOptionSelect] = useState({});
  let initialOptionsId = [];
  let subTotalOpt = 0;
  let correctPrice;

  if (product) {
    correctPrice = product.price;
  }
  if (product && product.variations[0]) {
    correctPrice = product.variations[0].price;
  }
  if (variation) {
    correctPrice = variation.price;
  }
  if (packDetail) {
    correctPrice = packDetail.price;
  }

  const handleChange = async (e) => {
    setOptionSelect({
      ...optionSelect,
      [e.target.name]: Number(e.target.value),
    });
    setOptionsId(Object.values(optionSelect));
  };

  useEffect(() => {
    if ((product && product.variations.length) || packDetail) {
      setTotal(
        Number(correctPrice) +
          Number(subTotalOpt) +
          Number(subTotalPer) -
          Number(discount)
      );
      setExtraPrice(subTotalOpt + subTotalPer);
      setVariation(variationSelected);
      setOptionsId(Object.values(optionSelect));
    }

    if (product && product.optionGroups) {
      if (!optionsId.length) {
        setOptionSelect(initialOptions);
        setOptionsId(initialOptionsId);
      }
      const variationChange = () => {
        setTotal(
          Number(correctPrice) +
            Number(subTotalOpt) +
            Number(subTotalPer) -
            Number(discount)
        );

        setExtraPrice(subTotalOpt + subTotalPer);
        setVariation(variationSelected);
        setOptionsId(Object.values(optionSelect));
      };
      variationChange();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variationSelected, optionSelect, correctPrice, subTotalPer, discount]);

  return (
    <>
      {product && product.optionGroups ? (
        <>
          {product.optionGroups.map((optGroup) => {
            initialOptionsId.push(optGroup.options[0].id);
            initialOptions = {
              ...initialOptions,
              [optGroup.key]: optGroup.options[0].id,
            };
            subTotalOpt = Number(optGroup.options[0].extra_price);
            return (
              <Fragment key={optGroup.id}>
                {optGroup.options.length !== 1 ? (
                  <>
                    <label>{optGroup.public_name}</label>
                    <div className="select">
                      <select
                        name={optGroup.key}
                        onChange={(e) => handleChange(e)}
                        value={optionSelect.value}
                      >
                        {optGroup.options.map((opt) => {
                          {
                            optGroup.options.sort((a, b) => {
                              return b.position - a.position;
                            });
                          }
                          return (
                            <option key={opt.id} value={opt.id}>
                              {opt.name}
                            </option>
                          );
                        })}
                      </select>
                      <span className="icon">keyboard_arrow_down</span>
                    </div>
                  </>
                ) : (
                  <>
                    <label>{optGroup.public_name}</label>
                    <input
                      name={optGroup.key}
                      value={optGroup.options[0].name}
                      readOnly
                    ></input>
                  </>
                )}
              </Fragment>
            );
          })}
          {variation && (
            <>
              {variation.stock === 0 ? (
                <p className="aviso-stock">
                  {variation.emptyStockAction.message}
                </p>
              ) : null}
            </>
          )}
        </>
      ) : packDetail ? (
        <>
          <PackCard packDetail={packDetail} />
        </>
      ) : null}
    </>
  );
};
