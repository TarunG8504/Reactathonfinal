import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
import SearchBar from './SearchBar'
export default function Navbar() {
  return (
    <ol>
    <li>
        <Link to='/'>Home</Link>
    </li>
    <li>
        <Link to='/About'>About</Link>
    </li>
    <li>
        <Link to='/Contact'>Contact</Link>
    </li>
    <li>
        <Link to='/Product'>Products</Link>
    </li>
    <li>
        <Link to='/Cart'>Cart</Link>
    </li>
        <SearchBar/>
    </ol>
  )
}
