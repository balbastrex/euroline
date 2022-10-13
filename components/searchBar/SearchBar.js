import { getSearchProductByString } from "api/apiRoutes";
import React, { useState } from "react";
import ResultBox from "./ResultBox";
import { ClickAwayListener } from "@mui/base";
// const handleDragStart = (e) => e.preventDefault();

const SearchBar = (params) => {
  const [ref, setRef] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");
  const [showClass, setShowClass] = useState(params.showClass);

  const finder = async (ref) => {
    if (ref.length > 2) {
      const response = await getSearchProductByString(ref);
      const success = response.data.success;
      setMessage(response.data.message);

      if (success == true) {
        setResults(response.data.data.variations);
      } else if (success == false) {
        setResults([]);
      }
    } else if (ref.length < 1) {
      setResults([]);
      setMessage("");
    }
  };

  const handleSearchValue = async (e) => {
    e.preventDefault();

    const value = e.target.value;

    setRef(value);

    finder(value);
  };

  return (
    <ClickAwayListener onClickAway={() => setShowClass(false)}>
      <div onClick={() => setShowClass(!showClass)}>
        <a className="buscador">
          <div className="icon">search</div>
          <p>Buscar</p>
        </a>
        <div className={showClass ? "search-box" : "search-box-hidden"}>
          <div className="input-box">
            <input
              type={"search"}
              className="search-input"
              placeholder="Escribe para buscar..."
              value={ref}
              onChange={(e) => handleSearchValue(e)}
            />
          </div>
          <div className="results-box">
            {results.length > 1 ? (
              <>
                {results.map((item) => (
                  <ResultBox key={item.key} {...item} />
                ))}
              </>
            ) : (
              <p>{message}</p>
            )}
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default SearchBar;
