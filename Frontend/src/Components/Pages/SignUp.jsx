import React, { useState } from "react";
import Heading from "../FundamentalComp/Heading";
import SubHeading from "../FundamentalComp/SubHeading";
import InputBox from "../FundamentalComp/InputBox";
import Button from "../FundamentalComp/Button";
import Bottom from "../FundamentalComp/Bottom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-4 h-max">
                    <Heading label="Sign Up" />
                    <SubHeading label="Enter your information to create an account" />
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
                    <div className="pt-4">
                        <Button
                            label="Sign Up"
                            onClick={async () => {
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
                                    console.error("Error during sign up:", error);
                                    alert("An error occurred. Please try again.");
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

export default SignUp;
