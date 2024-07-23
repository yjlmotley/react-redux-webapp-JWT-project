import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Private = () => {
    const [ authenticated, setAuthenticated ] = useState(null);
    const navigate = useNavigate();

    async function authenticateUser () {
        try {
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/authenticate_user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if (resp.ok) {
                let response = await resp.json();
                console.log(response.msg);
                setAuthenticated(true);
            } else {
                console.error('Authentication error:', error.message);
                setAuthenticated(false);
            }
        } catch (error) {
            console.error('Authentication error:', error.message);
            setAuthenticated(false);
        }
    };
    useEffect(() => {
        authenticateUser();
    }, []);

    if (authenticated === null) {
        return <p>Loading...</p>;
    }

    if (!authenticated) {
        return (
            <div className="text-center my-5">
                <h1>Access Denied</h1>
                <p>You're not an authenticated user. Please log in successfully to access the private page.</p>
                <Link to="/log_in">
                    <p> Log In</p>
                </Link>
            </div>
        );
    }
    
    return (
        <div class="text-center my-5">
            <h1>Private Page</h1>
            <p>This page is only accessible to successfully logged in users.</p>
        </div>
    )

};


export default Private;