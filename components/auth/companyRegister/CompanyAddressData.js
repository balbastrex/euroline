import React from "react";

const AddressData = ({
  company,
  handleChangeRegister,
  handleRadio,
  handleCheck,
}) => {
  return (
    <>
      <label>
        Dirección <sup>*</sup>
        <input
          type="text"
          id="address"
          name="address"
          value={company.address}
          onChange={(e) => handleChangeRegister(e)}
          required
        />
      </label>
      <label>
        País <sup>*</sup>
      </label>
      <div className="select">
        <select
          id="country_id"
          name="country_id"
          value={
            company.country_id === ""
              ? (company.country_id = "1")
              : company.country_id
          }
          onChange={(e) => handleChangeRegister(e)}
          required
        >
          <option value="1">España</option>
          <option value="2">Andorra</option>
          <option value="3">Francia</option>
          <option value="4">Portugal</option>
        </select>
        <span className="icon">keyboard_arrow_down</span>
      </div>
      <label>
        Provincia <sup>*</sup>
      </label>
      <div className="select">
        <select
          data-before="1"
          id="region_id"
          name="region_id"
          value={
            company.region_id === ""
              ? (company.region_id = "52")
              : company.region_id
          }
          onChange={(e) => handleChangeRegister(e)}
          required
        >
          <option value="52">Álava</option>

          <option value="1">Albacete</option>

          <option value="2">Alicante</option>

          <option value="3">Almería</option>

          <option value="4">Asturias</option>

          <option value="5">Ávila</option>

          <option value="6">Badajoz</option>

          <option value="7">Baleares, Islas</option>

          <option value="8">Barcelona</option>

          <option value="9">Burgos</option>

          <option value="10">Cáceres</option>

          <option value="11">Cádiz</option>

          <option value="12">Cantabria</option>

          <option value="13">Castellón</option>

          <option value="14">Ceuta</option>

          <option value="15">Ciudad Real</option>

          <option value="16">Córdoba</option>

          <option value="17">Coruña, La</option>

          <option value="18">Cuenca</option>

          <option value="19">Gerona</option>

          <option value="20">Granada</option>

          <option value="21">Guadalajara</option>

          <option value="22">Guipúzcoa</option>

          <option value="23">Huelva</option>

          <option value="24">Huesca</option>

          <option value="25">Jaén</option>

          <option value="26">León</option>

          <option value="27">Lérida</option>

          <option value="28">Lugo</option>

          <option value="29">Madrid</option>

          <option value="30">Málaga</option>

          <option value="31">Melilla</option>

          <option value="32">Murcia</option>

          <option value="33">Navarra</option>

          <option value="34">Orense</option>

          <option value="35">Palencia</option>

          <option value="36">Palmas, Las</option>

          <option value="37">Pontevedra</option>

          <option value="38">Rioja, La</option>

          <option value="39">Salamanca</option>

          <option value="40">Segovia</option>

          <option value="41">Sevilla</option>

          <option value="42">Soria</option>

          <option value="43">Tarragona</option>

          <option value="44">Tenerife, Santa Cruz De</option>

          <option value="45">Teruel</option>

          <option value="46">Toledo</option>

          <option value="47">Valencia</option>

          <option value="48">Valladolid</option>

          <option value="49">Vizcaya</option>

          <option value="50">Zamora</option>

          <option value="51">Zaragoza</option>
        </select>
        <span className="icon">keyboard_arrow_down</span>
      </div>
      <label>
        Población <sup>*</sup>
        <input
          type="text"
          id="city"
          name="city"
          value={company.city}
          onChange={(e) => handleChangeRegister(e)}
          required
        />
      </label>
      <label>
        Código postal <sup>*</sup> <span>(5-6 dígitos)</span>
        <input
          type="text"
          id="postcode"
          name="postcode"
          pattern="[0-9]{5,6}"
          onChange={(e) => handleChangeRegister(e)}
          value={company.postcode}
          required
        />
      </label>
      <label>
        <input
          type="checkbox"
          name="clone_as_delivery_address"
          id="clone_as_delivery_address"
          value={company.clone_as_delivery_address}
          onChange={(e) => handleCheck(e)}
        />
        Usar dirección también para envíos
      </label>
      <label>
        Nombre para la dirección <sup>*</sup>:
        <input
          type="text"
          id="address_name"
          name="address_name"
          value={company.address_name}
          onChange={(e) => handleChangeRegister(e)}
          required
        />
      </label>
    </>
  );
};

export default AddressData;
