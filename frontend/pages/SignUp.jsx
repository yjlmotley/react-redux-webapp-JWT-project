import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


const SignUp = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sign_up`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password  // Send plain password
                }),
            });
            // Handle response
        } catch (error) {
            console.error("Sign up error:", error.message);
        }
    };

    return (
        <div>
            <h1 style={{ display: 'block', textAlign: 'center' }}>SIGN UP</h1>
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 p-3">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example.host.com"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="type password here"
                    required
                />
                <button className="btn btn-primary" type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;