import React from 'react'
import { useState } from 'react';
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import NavDropdown from './NavDropdown';

interface HeaderProps {
  changeSection: (e: React.MouseEvent<HTMLButtonElement>) => void
  changeSectionTwo: (e: React.MouseEvent<HTMLButtonElement>) => void
  showSidebar: React.MouseEventHandler
}


const Header = ({ changeSection, changeSectionTwo, showSidebar }: HeaderProps) => {
  const [navDropdown, setNavDropdown] = useState<boolean>(false)

    const showNavDropdown = () => {
        setNavDropdown(!navDropdown)
      }


  return (
    <div className='header container'>
        <div className="headerItems">
            <div >
              <button className="openSidebarBtn"><FaBars onClick={showSidebar} /></button>
            </div>
            <a className='logoLink' href="/"><h1 className='logo'>CrytpoPrice.io</h1></a>
        </div>
    </div>
  )
}

export default Header