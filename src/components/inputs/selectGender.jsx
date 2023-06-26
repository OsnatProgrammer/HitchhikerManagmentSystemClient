import React, { useState } from 'react';

const SelectGender = (props) => {
  const [selectedOption, setSelectedOption] = useState(props.defaultValue);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          value="male"
          checked={selectedOption === 'male'}
          onChange={handleOptionChange}
        />
        Male
      </label>

      <label>
        <input
          type="radio"
          value="female"
          checked={selectedOption === 'female'}
          onChange={handleOptionChange}
        />
        Female
      </label>
    </div>
  );
};

export default SelectGender;
