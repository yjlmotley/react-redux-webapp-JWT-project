import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Private = () => {
    // const [isAuthenticated, setIsAuthenticated] = useState("pending")

    useEffect(async () => {
        try {
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/authenticate_user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({}),
            });
            let response = await resp.json();
            console.log(response.status);
        } catch (error) {
            console.error('Authentication error:', error.message);
        }
    }, []);

    return (
        <div>
            <h1>Private Page</h1>
            <p>This page is only accessible to successfully logged in users.</p>
        </div>
    )

};


export default Private;