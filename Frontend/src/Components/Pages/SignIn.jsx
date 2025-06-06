import React, { useState } from "react";
import Heading from "../FundamentalComp/Heading";
import SubHeading from "../FundamentalComp/SubHeading";
import InputBox from "../FundamentalComp/InputBox";
import Button from "../FundamentalComp/Button";
import Bottom from "../FundamentalComp/Bottom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-4 h-max">
                    <Heading label="Sign In" />
                    <SubHeading label="Enter your credentials to access your account" />
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
                    <div>
                        <Button
                            label="Sign in"
                            onClick={async () => {
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
                                        alert("Invalid credentials, please try again.");
                                    }
                                } catch (error) {
                                    console.error("Error during sign in:", error);
                                    alert("An error occurred. Please try again.");
                                }
                            }}
                        />
                    </div>
                    <Bottom label="Don't have an account?" linkText="Sign Up" to="/" />
                </div>
            </div>
        </div>
    );
}

export default SignIn;
