import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ children }: any) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="hover:underline">
        <Link to="/">acasa</Link>/{children}
      </div>
    </div>
  );
};

export default Breadcrumbs;
