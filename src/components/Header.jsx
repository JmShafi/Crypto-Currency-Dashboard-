import React from 'react';

const Header = ({ title }) => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-6">
    <h1 className="text-4xl font-extrabold text-gray-800">{title}</h1>
  </div>
);

export default Header;