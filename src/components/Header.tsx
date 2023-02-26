import React from 'react'
import { useState } from 'react';
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import NavDropdown from './NavDropdown';


const Header = () => {
  const [navDropdown, setNavDropdown] = useState<boolean>(false)

    const showNavDropdown = () => {
        setNavDropdown(!navDropdown)
      }


  return (
    <div className='header'>
        <div className="headerItems">
            <a className='logoLink' href="/"><h1 className='logo'>CrytpoPrice.io</h1></a>
            <button onClick={showNavDropdown}>
                {navDropdown ? <IoClose className='closeIcon' /> : <FaBars />}
                <NavDropdown navDropdown={navDropdown} />
            </button>
        </div>
    </div>
  )
}

export default Header