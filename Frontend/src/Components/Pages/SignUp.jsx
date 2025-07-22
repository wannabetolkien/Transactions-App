import React, { useState } from "react";
import Heading from "../FundamentalComp/Heading";
import SubHeading from "../FundamentalComp/SubHeading";
import InputBox from "../FundamentalComp/InputBox";
import Button from "../FundamentalComp/Button";
import Bottom from "../FundamentalComp/Bottom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Email regex for basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateForm() {
        if (!firstName.trim()) return "First name is required.";
        if (!lastName.trim()) return "Last name is required.";
        if (!username.trim()) return "Email is required.";
        if (!emailRegex.test(username)) return "Please enter a valid email address.";
        if (!password) return "Password is required.";
        if (password.length < 6) return "Password must be at least 6 characters long.";
        return null;
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-slate-200 to-purple-200">
            <div className="flex flex-col justify-center items-center">
                <div className="rounded-2xl bg-white w-[520px] shadow-2xl text-center p-8 h-max border border-slate-200">
                    <Heading label="Sign Up" />
                    <SubHeading label="Enter your information to create an account" />
                    {error && <ErrorNotification>{error}</ErrorNotification>}
                    <div className="space-y-4 mt-2">
                        <InputBox
                            type="text"
                            placeholder="John"
                            label="First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                        />
                        <InputBox
                            type="text"
                            placeholder="Doe"
                            label="Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                        />
                        <InputBox
                            type="text"
                            placeholder="johndoe@example.com"
                            label="Email"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                        <InputBox
                            type="password"
                            placeholder="password@123"
                            label="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <div className="pt-6">
                        <Button
                            label="Sign Up"
                            onClick={async () => {
                                setError("");
                                const validationError = validateForm();
                                if (validationError) {
                                    setError(validationError);
                                    return;
                                }
                                try {
                                    const response = await axios.post(
                                        "http://localhost:3000/api/v1/user/signup",
                                        {
                                            username: username,
                                            firstName: firstName,
                                            lastName: lastName,
                                            password: password,
                                        }
                                    );

                                    setFirstName("");
                                    setLastName("");
                                    setUsername("");
                                    setPassword("");

                                    if (response.data) {
                                        navigate("/signin");
                                    }
                                } catch (error) {
                                    let message = "An error occurred. Please try again.";
                                    if (error.response && error.response.data && error.response.data.message) {
                                        message = error.response.data.message;
                                    } else if (error.message) {
                                        message = error.message;
                                    }
                                    setError(message);
                                }
                            }}
                        />
                    </div>
                    <Bottom label="Already have an account?" linkText="Login" to="/signin" />
                </div>
            </div>
        </div>
    );
}

const ErrorNotification = styled.div`
  background: #fee2e2;
  color: #b91c1c;
  border: 1px solid #fca5a5;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  margin: 1rem 0 0.5rem 0;
  font-weight: 500;
  font-size: 1rem;
  text-align: left;
`;

export default SignUp;
