import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="text-gray-600 text-sm p-5 pl-10 bg-gray-100 mt-3">
      <Link to="/" className="hover:underline text-blue-500">
        Home
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <span key={to} className="ml-2 capitalize">
            &gt; {value}
          </span>
        ) : (
          <Link
            key={to}
            to={to}
            className="ml-2 hover:underline text-blue-500 capitalize"
          >
            &gt; {value}
          </Link>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
