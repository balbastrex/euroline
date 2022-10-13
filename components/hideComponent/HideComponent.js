import React, { useState } from "react";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import SearchBar from "components/searchBar/SearchBar";

//NOTE: Component made to test ClickAwayListener
function HideComponent() {
  const [showClass, setShowClass] = useState(false);
  return (
    <ClickAwayListener onClickAway={() => setShowClass(false)}>
      <div onClick={() => setShowClass(!showClass)}>
        <button>Show Component</button>
        <SearchBar showClass={showClass} />
      </div>
    </ClickAwayListener>
  );
}

export default HideComponent;
