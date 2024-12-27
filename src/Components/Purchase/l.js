import React, { useState } from 'react';

const PaymentForm = () => {
    const [billingInfo, setBillingInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        country: '',
        city: '',
        postalCode: '',
        promoCode: ''
    });

    const [errors, setErrors] = useState({});

    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        setBillingInfo({ ...billingInfo, [name]: value });
    };

    const validateFields = () => {
        const newErrors = {};

        if (!billingInfo.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!billingInfo.lastName.trim()) newErrors.lastName = 'Last name is required';

        if (!billingInfo.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i.test(billingInfo.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!billingInfo.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^[0-9]{10}$/.test(billingInfo.phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must be 10 digits';
        }

        if (!billingInfo.country.trim()) newErrors.country = 'Country is required';
        if (!billingInfo.city.trim()) newErrors.city = 'City is required';

        if (!billingInfo.postalCode.trim()) {
            newErrors.postalCode = 'Postal code is required';
        } else if (!/^[0-9]{5,6}$/.test(billingInfo.postalCode)) {
            newErrors.postalCode = 'Postal code must be 5 or 6 digits';
        }

        if (!billingInfo.promoCode.trim()) newErrors.promoCode = 'Promo code is required';

        setErrors(newErrors);

        // Return true if there are no errors
        return Object.keys(newErrors).length === 0;
    };

    const handlePayment = (e) => {
        e.preventDefault();
        if (validateFields()) {
            console.log('Payment info submitted:', billingInfo);
            // Call the payment processing API here
        }
    };

    return (
 <></>
    );
};

export default PaymentForm;
