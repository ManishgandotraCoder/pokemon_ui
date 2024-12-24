import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-200 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pokemon App</h1>
      </div>
    </header>
  );
};

export default Header;
