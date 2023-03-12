import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Postform() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [dob, setDob] = useState((new Date()));
  const [phone_number, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [dobError, setDobError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear any previous errors
    setNameError("");
    setEmailError("");
    setGenderError("");
    setDobError("");
    setPhoneError("");

    // Validate input fields
    let isValid = true;
    if (name.trim() === "") {
      setNameError("Name is required");
      isValid = false;
    }
    if (email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    }
    if (gender === "") {
      setGenderError("Gender is required");
      isValid = false;
    }
    if (!dob || dob.toString() === "Invalid Date") {
      setDobError("Date of birth is required");
      isValid = false;
    } else {
      const ageDiffMs = Date.now() - dob.getTime();
      const ageDate = new Date(ageDiffMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      if (age < 18) {
        setDobError("You must be at least 18 years old");
        isValid = false;
      }
    }
    if (phone_number.trim() === "") {
      setPhoneError("Phone number is required");
      isValid = false;
    } else if (!/^\d{10}$/.test(phone_number)) {
      setPhoneError("Invalid phone number format");
      isValid = false;
    }
    
    
    
    if (isValid) {
      const data = {
        name: name,
        email: email,
        gender: gender,
        dob: dob.toISOString().substring(0, 10),
        phone_number: phone_number
      };
       
      const stringifiedData = JSON.stringify(data);
    // Send the POST request to the API
    try {
        const response = await fetch('https://viveksingh123.pythonanywhere.com/user-form/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: stringifiedData
        });
  
        if (!response.ok) {
          throw new Error("Failed to post data");
        }
  
        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.log(error.message);
      }
    }
}


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        {nameError && <p>{nameError}</p>}
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {emailError && <p>{emailError}</p>}
      </label>
      <label>
        Gender:
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {genderError && <p>{genderError}</p>}
      </label>
      <label>
        Date of Birth:
        <DatePicker selected={dob}  onChange={(date) => setDob(date)} dateFormat="yyyy-MM-dd" />
        {dobError && <p>{dobError}</p>}
      </label>
      <label>
        Phone Number:
        <input type="tel" value={phone_number} onChange={(e) => setPhone(e.target.value)} />
        {phoneError && <p>{phoneError}</p>}
      </label>
      <button type="submit">Submit</button>
    </form>
  );

}

export default Postform;
