import React, { useState } from 'react';
import './Search.css';
import { useNavigate } from 'react-router-dom';
export default function SearchBar() {
    const navigate= useNavigate()
    const [input, setInput] = useState("");

    const handleChange = (value) => {
        setInput(value);
    }

    const handleClick = () => {
        if (input.toLowerCase() === "clothes") {
            // Navigate to Men route
            console.log(" Entered Clothes");
            navigate('/Clothes')
        } 
        else if(input.toLowerCase()==="watches")
        {
            navigate('./Watches')
        }
        else if(input.toLowerCase()==="bags")
        {
            navigate('./Bags')
        }
        else if(input.toLowerCase()==="shoes")
        {
            navigate('./Shoes')
        }
        else {
            // Handle other cases or show an error message
            console.log("Invalid search term");
        }
        setInput("")
    }

    return (
        <div className='Searchbarcontainer'>
            <ol>
            <li><input
                placeholder='Type to search'
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            /></li>
            <li>
                <button onClick={handleClick}>Search</button>
            </li>
            </ol>
        </div>
    );
}
