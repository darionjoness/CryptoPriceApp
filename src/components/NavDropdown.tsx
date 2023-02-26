import React from 'react'
import { AiOutlineHome, AiOutlineLineChart } from "react-icons/ai";

interface NavDropdownProps {
    navDropdown: boolean
}

const NavDropdown = ({ navDropdown }: NavDropdownProps) => {

  return (
    <div className='navDropdown'>
        <div className={`navDropdownItems ${navDropdown ? 'show' : 'hide'}`}>
            <a href="/"><AiOutlineHome className='navIcon' />Home</a>
            <a href="/myassets"><AiOutlineLineChart className='navIcon' />My Assets</a>
        </div>
    </div>
  )
}

export default NavDropdown