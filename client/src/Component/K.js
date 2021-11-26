import React, { useState } from 'react'

function K() {

    const [current, setcurrent] = useState("");

    const handleChange = (event) => {
        setcurrent({ value: event.target.value });
        console.log(current)
    }

    const handleSubmit = (event) => {
        alert('Your cabin is: ' + current);
        event.preventDefault();
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Choose Your Cabin :
                    <select onChange={handleChange}>
                        
                        <option value="Business"> Business Class</option>
                        <option value="Economy"> Economy Class</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default K;
