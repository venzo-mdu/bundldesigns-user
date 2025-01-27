import React, { useState } from 'react';

// GCC Countries and phone number length requirements
const countries = [
  { code: 'AE', name: 'UAE', countryCode: '+971', phoneLength: 9 },
  { code: 'BH', name: 'Bahrain', countryCode: '+973', phoneLength: 8 },
  { code: 'KW', name: 'Kuwait', countryCode: '+965', phoneLength: 8 },
  { code: 'OM', name: 'Oman', countryCode: '+968', phoneLength: 8 },
  { code: 'QA', name: 'Qatar', countryCode: '+974', phoneLength: 8 },
  { code: 'SA', name: 'Saudi Arabia', countryCode: '+966', phoneLength: 9 },
 
];

const PhoneNumberInput = ({ name, placeholder, value, status, className,setPhoneError,extraInputClass ,formErrors,setErrors,idName}) => {
  const [selectedCountry, setSelectedCountry] = useState( { code: 'AE', name: 'UAE', countryCode: '+971', phoneLength: 9 });
  const [phoneNumber, setPhoneNumber] = useState(value || '');
  const [error, setError] = useState('');

  // Handles country change
  const handleCountryChange = (event) => {
    const selectedCountry = countries.find(country => country.code === event.target.value);
    setSelectedCountry(selectedCountry);
    setPhoneNumber(''); // Clear phone number when changing country
    setError(''); // Clear any error
    setPhoneError(false)
    if (status) status((prevData) => ({ ...prevData, [name]: '' }));
  };

  // Handles phone number input
  const handlePhoneNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, ''); // Remove non-digits
    setPhoneNumber(value);

    // Update parent component's formData if status function is provided
    if (status) status((prevData) => ({ ...prevData, [name]: `${selectedCountry?.countryCode}${value}` }));

    // Validate phone number length
    if (selectedCountry && value.length !== selectedCountry.phoneLength) {
      setPhoneError(true);
      setError(`Please enter valid mobile number.`);
    } else {
      setPhoneError(false);
      setError('');
      delete formErrors['phone']
      setErrors(formErrors)
    }
 
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center overflow-hidden">
        {/* Country Selector */}
        <select
          value={selectedCountry ? selectedCountry.code : ''}
          onChange={handleCountryChange}
          id={idName}
          className={`border sm:py-2  xs:py-3 sm:px-3  text-gray-900 font-bold sm:w-[100px] xs:w-[85px] xs:pl-[8px] sm:pl-3  focus:outline-none ${extraInputClass}`}
        >
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.countryCode}
            </option>
          ))}
        </select>
        {/* Phone Number Input */}
        <input
          type="text"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder={selectedCountry ? placeholder : 'Select country first'}
          className={`flex-1  px-2 sm:py-2  xs:py-3 border  ${extraInputClass} border-l-none focus:outline-none`}
          disabled={!selectedCountry}
        />
      </div>

      {error && <span className="text-red-500 text-sm mt-1 block">{error}</span>}
    </div>
  );
};

export default PhoneNumberInput;
