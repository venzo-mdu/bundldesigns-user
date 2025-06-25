import React, { useEffect, useState, useTransition } from "react";
import { Navbar } from "../Common/Navbar/Navbar";
import { Footer } from "../Common/Footer/Footer";
import {
  FaUser,
  FaEnvelope,
  FaGlobe,
  FaLanguage,
  FaPhone,
} from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import PhoneNumberInput from "./PhoneNumberInput";
import axios from "axios";
import { base_url } from "../Auth/BackendAPIUrl";
import { ConfigToken } from "../Auth/ConfigToken";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useToastMessage from "../Pages/Toaster/Toaster";

const Profile = ({ user, lang, setLang, setUser }) => {
  const { showToast, showErrorToast } = useToastMessage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [phoneError, setPhoneError] = useState(false);
  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, North",
    "Korea, South",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (formerly Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the register data state
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.full_name.trim()) {
      errors.full_name = lang === "ar" ? "الاسم مطلوب" : "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email =
        lang === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required";
    } else if (
      !/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(formData.email)
    ) {
      errors.email = lang === "ar" ? "تنسيق البريد الإلكتروني غير صالح" : "Invalid email format";
    }

    if (!formData.country) {
      errors.country =
        lang === "ar" ? "يرجى اختيار دولة" : "Please select a country";
    }

    if (!formData.language) {
      errors.language = lang === "ar" ? "يرجى اختيار اللغة" : "Please select a language";
    }

    if (!formData.phone.trim()) {
      errors.phone =
        lang === "ar" ? "رقم الهاتف مطلوب" : "Phone number is required";
    }

    if(formData.phone.trim().length !== 13){
       errors.phone =
        lang === "ar" ? "رقم الهاتف مطلوب" : "Please Enter valid phone number";
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${base_url}/api/profile/`,
        formData,
        ConfigToken()
      );

      if (response.status === 200) {
        setUser((prev) => ({
          ...prev,
          email: response.data.email,
          country: response.data.country,
          full_name: response.data.full_name,
          language: response.data.language,
          phone: response.data.phone,
        }));
        // console.log("Profile updated successfully!", response.data);
        // toast.success("Profile updated", {
        //   icon: false,
        //   style: {
        //     color: "#1BA56F",
        //     fontWeight: "700", // White text
        //   },
        // });
        showToast(lang === "ar" ? "تم تحديث الملف الشخصي" : "Profile updated", "#D83D99");
        setTimeout(() => {
          navigate("/");
        }, 2000);

        // Optionally update UI or show success message
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError({ submit: lang === "ar" ? "فشل في تحديث الملف الشخصي. يرجى المحاولة مرة أخرى" : "Failed to update profile. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      email: user?.email,
      full_name: user?.full_name,
      language: user?.language,
      phone: user?.phone,
      country: user?.country,
    }));
  }, [user]);

  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            // color: "#1BA56F",
            fontWeight: "700",
            borderRadius: "0px !important",
            border: `1px solid #1BA56F`,
          },
        }}
      />
      <ToastContainer />
      <Navbar isLang={lang} setIsLang={setLang} />
      <div className="text-center py-2 border-b border-black">
        <h1 className="lg:text-[38px] md:text-[38px] xs:text-[28px] lg:mt-[2%] md:mt-[2%] xs:mt-[5%] uppercase">
          {" "}
          {lang === "ar" ? "حسابك​" : "Profile"}{" "}
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center my-[5%] lg:p-0 md:p-0 xs:p-[1%_5%]">
        <form
          className="w-full lg:max-w-[30%] md:max-w-[30%] xs:max-w-[100%]"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center border-b-[2px] border-black  p-2 mb-4">
            <FaUser
              className={`text-gray-500 ${lang === "ar" ? "ml-2" : "mr-2"}`}
            />
            <input
              type="text"
              placeholder="Name"
              className="outline-none w-full"
              value={formData?.full_name}
              onChange={handleChange}
              name="full_name"
            />
          </div>
          {error.full_name && (
            <p className="text-[#D83D99] text-sm">{error.full_name}</p>
          )}
          <div className="flex items-center border-b-[2px] border-black p-2 mb-4">
            <FaGlobe
              className={`text-gray-500 ${lang === "ar" ? "ml-2" : "mr-2"}`}
            />
            <select
              type="text"
              placeholder="Country"
              className="outline-none w-full"
              value={formData?.country}
              onChange={handleChange}
              name="country"
            >
              <option value={null} disabled></option>
              {countries?.map((country) => {
                return <option value={country}>{country}</option>;
              })}
            </select>
          </div>
          {error.country && (
            <p className="text-[#D83D99] text-sm">{error.country}</p>
          )}
          <div className="flex items-center border-b-[2px] border-black p-2 mb-4">
            <FaLanguage
              className={`text-gray-500 ${lang === "ar" ? "ml-2" : "mr-2"}`}
            />
            <select
              type="text"
              placeholder="Language"
              className="outline-none w-full"
              value={formData?.language}
              onChange={handleChange}
              name="language"
            >
              <option value={null} disabled></option>
              <option value={"Arabic"}>Arabic</option>
              <option value={"English"}>English</option>
            </select>
          </div>
          {error.language && (
            <p className="text-[#D83D99] text-sm">{error.language}</p>
          )}
          <div className="flex items-center border-b-[2px] border-black  p-2 mb-4">
            <FaEnvelope
              className={`text-gray-500 ${lang === "ar" ? "ml-2" : "mr-2"}`}
            />
            <input
              type="email"
              placeholder="Email"
              className="outline-none w-full"
              value={formData?.email}
              onChange={handleChange}
              name="email"
            />
          </div>
          {error.email && (
            <p className="text-[#D83D99] text-sm">{error.email}</p>
          )}
          <div className="flex items-center border-b-[2px] border-black  p-2 mb-4">
            <FaPhone
              className={`text-gray-500 ${
                lang === "ar" ? "ml-2 rotate-[270deg]" : "mr-2 rotate-180"
              }`}
            />
            {/* <PhoneNumberInput
              name="phone"
              placeholder={
                lang === "ar" ? "أدخل رقم هاتفك" : "Enter your phone number"
              }
              value={user?.phone?.slice(4) || ""}
              status={setFormData}
              setPhoneError={setPhoneError}
              extraInputClass="!border-none text-[18px]"
              setErrors={setError}
              formErrors={error}
              idName="vacancySelect"
              className="w-full text-[18px] !rounded-none !border-none"
            /> */}
            <PhoneNumberInput
              name="phone"
              placeholder={
                lang === "ar" ? "أدخل رقم هاتفك" : "Enter your phone number"
              }
              value={user?.phone?.slice(4) || ""}
              onChange={(val) =>
                setFormData((prev) => ({
                  ...prev,
                  phone: `${user?.phone?.split(4)}${val}`,
                }))
              }
              status={setFormData}
              setPhoneError={setPhoneError}
              extraInputClass="!border-none text-[18px]"
              setErrors={setError}
              formErrors={error}
              idName="vacancySelect"
              className="w-full text-[18px] !rounded-none !border-none"
            />
          </div>
          {error.phone && (
            <p className="text-[#D83D99] text-sm">{error.phone}</p>
          )}
          <button
            type="submit"
            className="w-full bg-[#f3b7ce] text-white py-2 "
          >
            {isLoading ? (
              <ClipLoader size={25} color="#FFFFFF" />
            ) : lang === "ar" ? (
              "تحديث"
            ) : (
              "UPDATE"
            )}
          </button>
          <button
            className="w-full bg-[#f3b7ce] text-white py-2 mt-4"
            onClick={() => navigate("/reset-password")}
          >
            {/* {isLoading ? <ClipLoader size={25} color='#FFFFFF' /> : 'RESET PASSWORD'} */}
            {lang === "ar" ? "حسابك" : "RESET PASSWORD"}
          </button>
        </form>
      </div>
      <Footer isLang={lang} />
    </div>
  );
};
export default Profile;
