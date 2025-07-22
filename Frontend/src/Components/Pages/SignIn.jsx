import React, { useState } from "react";
import Heading from "../FundamentalComp/Heading";
import SubHeading from "../FundamentalComp/SubHeading";
import InputBox from "../FundamentalComp/InputBox";
import Button from "../FundamentalComp/Button";
import Bottom from "../FundamentalComp/Bottom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Email regex for basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateForm() {
        if (!username.trim()) return "Email is required.";
        if (!emailRegex.test(username)) return "Please enter a valid email address.";
        if (!password) return "Password is required.";
        return null;
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-slate-200 to-purple-200">
            <div className="flex flex-col justify-center items-center">
                <div className="rounded-2xl bg-white w-[520px] shadow-2xl text-center p-8 h-max border border-slate-200">
                    <Heading label="Sign In" />
                    <SubHeading label="Enter your credentials to access your account" />
                    {error && <ErrorNotification>{error}</ErrorNotification>}
                    <div className="space-y-4 mt-2">
                        <InputBox
                            label="Email"
                            placeholder="johndoe@example.com"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <InputBox
                            label="Password"
                            placeholder="example@123"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="pt-6">
                        <Button
                            label="Sign in"
                            onClick={async () => {
                                setError("");
                                const validationError = validateForm();
                                if (validationError) {
                                    setError(validationError);
                                    return;
                                }
                                try {
                                    const response = await axios.post(
                                        "http://localhost:3000/api/v1/user/signin",
                                        {
                                            username: username,
                                            password: password,
                                        }
                                    );

                                    if (response.status === 200) {
                                        localStorage.setItem("token", response.data.token);
                                        navigate("/dashboard");
                                    } else {
                                        setError("Invalid credentials, please try again.");
                                    }
                                } catch (error) {
                                    let message = "An error occurred. Please try again.";
                                    if (error.response && error.response.data && error.response.data.message) {
                                        // Custom messages for common backend errors
                                        if (error.response.data.message.toLowerCase().includes("not registered")) {
                                            message = "This email is not registered. Please sign up first.";
                                        } else if (error.response.data.message.toLowerCase().includes("incorrect password")) {
                                            message = "Incorrect password. Please try again.";
                                        } else {
                                            message = error.response.data.message;
                                        }
                                    } else if (error.message) {
                                        message = error.message;
                                    }
                                    setError(message);
                                }
                            }}
                        />
                    </div>
                    <div className="mt-4">
                        <Bottom label="Don't have an account?" linkText="Sign Up" to="/" />
                    </div>
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

export default SignIn;
