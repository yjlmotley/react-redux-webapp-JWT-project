import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


const LogIn = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/log_in`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ email, password }),
    //         });

    //         if (!resp.ok) {
    //             const errorMsg = await resp.json();
    //             throw new Error(`Failed to log in: ${errorMsg.msg}`);
    //         }

    //         const data = await resp.json();
    //         console.log('Login successful:', data);
    //         dispatch({
    //             type: "update_token",
    //             payload: { token: data.token },
    //         });
    //         // dispatch({
    //         //     ...data,
    //         //     type: "update_token",
    //         // });

    //         // Handle success scenario (redirect, update state, etc.)
    //         navigate('/');
    //         // ***** After getting log in working, change the navigate from home to /private *****

    //     } catch (error) {
    //         console.error('Login error:', error.message);
    //         // Handle error state or display error message to the user
    //     }
        
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/log_in`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!resp.ok) {
                const errorMsg = await resp.json();
                throw new Error(`Failed to log in: ${errorMsg.msg}`);
            }

            const data = await resp.json();
            console.log('Login successful:', data);

            dispatch({
                type: "update_token",
                payload: { token: data.token }, // Ensure 'data.token' exists and is correct
            });

            navigate('/'); // Redirect to home or private route after login

        } catch (error) {
            console.error('Login error:', error.message);
            // Handle error state or display error message to the user
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
