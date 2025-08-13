
import React from 'react';

const FilterControls = ({ onFilterChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-4 items-center">
      <h3 className="font-bold text-gray-700">Filters:</h3>
      
      <input
        type="text"
        placeholder="Search coin..."
        onChange={(e) => onFilterChange(e.target.value)}
        className="px-3 py-2 border rounded-md"
      />
    </div>
  );
};

export default FilterControls;