import axios from 'axios';
import React, { useEffect } from 'react'

function Logout() {

    useEffect(() => {
        var userToken = localStorage.getItem('user-token');
        axios.post("http://localhost:8000/logout", { token: userToken })
            .then((res) => {
                localStorage.removeItem('user-token');
                window.location.href = '/';
            }).catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div class="logout">
        
        </div>
    )
}

export default Logout;
