import React, { useState } from 'react';

const SelectGender = (props) => {
    const [selectedOption, setSelectedOption] = useState(props.defaultValue);
    const label = props.label

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className='d-flex justify-content-between'>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                {label}
            </label>

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

            <label>
                <input
                    type="radio"
                    value="another"
                    checked={selectedOption === 'another'}
                    onChange={handleOptionChange}
                />
                Another
            </label>
        </div>

    );
};

export default SelectGender;
