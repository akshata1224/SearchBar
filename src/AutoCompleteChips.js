import React, { useState, useEffect, useRef } from 'react';
//import './App.css'; // Import your Tailwind CSS file

const AutoCompleteChips = () => {
  const [inputValue, setInputValue] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const inputRef = useRef(null);

  // Sample list of items
  const itemList = ['John Doe', 'Jane Doe', 'Nick Giannopoulos', 'Alice Smith'];

  // Function to filter items based on input value
  const filterItems = () => {
    setFilteredItems(itemList.filter(item => !selectedItems.includes(item) && item.toLowerCase().includes(inputValue.toLowerCase())));
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle item selection
  const handleItemClick = (item) => {
    setSelectedItems([...selectedItems, item]);
    setInputValue('');
    inputRef.current.focus();
  };

  // Handle chip removal
  const handleChipRemove = (removedItem) => {
    setSelectedItems(selectedItems.filter(item => item !== removedItem));
  };

  // Handle backspace key press
  const handleBackspace = () => {
    if (inputValue === '' && selectedItems.length > 0) {
      // Highlight the last chip
      inputRef.current.blur();
      inputRef.current.focus();
      setSelectedItems(selectedItems.slice(0, -1));
    }
  };

  

  // Update filtered items when input value changes
  useEffect(() => {
    filterItems();
  }, [inputValue]);

  return (
    <div className="m-4 p-4 bg-cyan-50">
      <div className="flex flex-wrap gap-2 mb-4 bg-cyan-50">
        {selectedItems.map((item, index) => (
          <div key={index} className="bg-slate-300 text-black px-2 py-1 rounded">
            {item}
            <button onClick={() => handleChipRemove(item)} className="ml-2">
              X
            </button>
          </div>
        ))}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={(e) => e.key === 'Backspace' && handleBackspace()}
        placeholder="Search..."
        className="w-full border-b border-blue-900 bg-cyan-50 outline-none"
      />
      <div className="flex flex-col gap-2 mt-2">
        {filteredItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(item)}
            className="cursor-pointer hover:bg-gray-200 p-2 rounded"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoCompleteChips;