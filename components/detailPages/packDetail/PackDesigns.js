import React from "react";

const PackDesigns = ({ packProduct }) => {
  return (
    <>
      <label>{packProduct.name}</label>
      {packProduct.designs.length > 1 ? (
        <>
          <div className="select">
            <select>
              {packProduct.designs.map((design, i) => (
                <option key={i}>{design.name}</option>
              ))}
            </select>
            <span className="icon">keyboard_arrow_down</span>
          </div>
        </>
      ) : packProduct.designs.length === 1 ? (
        <input readOnly value={packProduct.designs[0].name} />
      ) : packProduct.designs.length === 0 ? (
        <input readOnly value={packProduct.name} />
      ) : null}
    </>
  );
};

export default PackDesigns;
