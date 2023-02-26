import React from 'react'
import { useState } from 'react';
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import NavDropdown from './NavDropdown';

interface HeaderProps {
  changeSection: (e: React.MouseEvent<HTMLButtonElement>) => void
  changeSectionTwo: (e: React.MouseEvent<HTMLButtonElement>) => void
}


const Header = ({ changeSection, changeSectionTwo }: HeaderProps) => {
  const [navDropdown, setNavDropdown] = useState<boolean>(false)

    const showNavDropdown = () => {
        setNavDropdown(!navDropdown)
      }


  return (
    <div className='header'>
        <div className="headerItems">
            <a className='logoLink' href="/"><h1 className='logo'>CrytpoPrice.io</h1></a>
            <div className='navBtn' onClick={showNavDropdown}>
                {navDropdown ? <IoClose className='closeIcon' /> : <FaBars />}
                <NavDropdown changeSection={changeSection} changeSectionTwo={changeSectionTwo} navDropdown={navDropdown} />
            </div>
        </div>
    </div>
  )
}

export default Header