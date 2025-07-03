import React, { useEffect, useState } from 'react';

// GCC Countries and phone number length requirements
const countries = [
  { code: 'AE', name: 'UAE', countryCode: '+971', phoneLength: 9 },
  { code: 'BH', name: 'Bahrain', countryCode: '+973', phoneLength: 8 },
  { code: 'KW', name: 'Kuwait', countryCode: '+965', phoneLength: 8 },
  { code: 'OM', name: 'Oman', countryCode: '+968', phoneLength: 8 },
  { code: 'QA', name: 'Qatar', countryCode: '+974', phoneLength: 8 },
  { code: 'SA', name: 'Saudi Arabia', countryCode: '+966', phoneLength: 9 },
 
];

const PhoneNumberInput = ({ lang, setLang, name, placeholder, value, status, className,setPhoneError,extraInputClass ,formErrors,setErrors,idName,successmsg=null}) => {
  const [selectedCountry, setSelectedCountry] = useState( { code: 'AE', name: 'UAE', countryCode: '+971', phoneLength: 9 });
  const [phoneNumber, setPhoneNumber] = useState(value || '');
  const [error, setError] = useState('');
  useEffect(() => { 
      setPhoneNumber(value || '');
  }, [successmsg]);
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
    setPhoneNumber(event.target.value.replace(/\D/g, ''));

    // Update parent component's formData if status function is provided
    if (status) status((prevData) => ({ ...prevData, [name]: `${selectedCountry?.countryCode}${value}` }));

    // Validate phone number length
    if (selectedCountry && value.length !== selectedCountry.phoneLength) {
      console.log("Language at error state:", localStorage.getItem("lang"));
      setPhoneError(true);
      setError(localStorage.getItem("lang") === 'ar' ? "يرجى إدخال رقم جوال صالح" : "Please enter valid mobile number.");
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
          className={`border !rounded-none sm:py-2  xs:py-3 sm:px-3  text-gray-900 sm:w-[100px] xs:w-[85px] xs:pl-[8px] sm:pl-3  focus:outline-none ${extraInputClass}`}
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
          className={`flex-1  px-2 sm:py-2  xs:py-3 border  ${extraInputClass} border-l-none focus:outline-none !rounded-none`}
          disabled={!selectedCountry}
        />
      </div>

      {error && <span className="text-[#D83D99] text-sm mt-1 block">{error}</span>}
    </div>
  );
};

export default PhoneNumberInput;
