import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


const LogIn = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/log_in`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),  // Send plain password
        });
        let response = await resp.json();
        let token = response.token;
        localStorage.setItem("token", token);
        navigate("/private");
    } catch (error) {
        console.error('Login error:', error.message);
    }
};

    return (
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 p-3">
            <h1 style={{ display: 'block', textAlign: 'center' }}>LOG IN</h1>
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
            />
            <button className="btn btn-primary">Login</button>
            <Link to="/sign_up" style={{ display: 'block', textAlign: 'center' }}>
                <p>Click here to Sign Up</p>
            </Link>
        </form>
    );
};

export default LogIn;
