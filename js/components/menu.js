import React from "react";
import { Link } from "react-router-dom";

const Menu = ({ close, children }) => {
  return (
    <div className="menu-scrim">
      <div className={"menu"}>
        {children}
        <Link to="/" className="x" onClick={close}>
          <button> x</button>
        </Link>
      </div>
    </div>
  );
};
export default Menu;
