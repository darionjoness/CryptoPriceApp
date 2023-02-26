import React from 'react'
import { AiOutlineHome, AiOutlineLineChart } from "react-icons/ai";

interface NavDropdownProps {
    navDropdown: boolean
    changeSection: (e: React.MouseEvent<HTMLButtonElement>) => void
    changeSectionTwo: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const NavDropdown = ({ navDropdown, changeSection, changeSectionTwo }: NavDropdownProps) => {

  return (
    <div className='navDropdown'>
        <div className={`navDropdownItems ${navDropdown ? 'show' : 'hide'}`}>
            <button onClick={changeSection}><AiOutlineHome className='navIcon' />Home</button>
            <button onClick={changeSectionTwo}><AiOutlineLineChart className='navIcon' />My Assets</button>
        </div>
    </div>
  )
}

export default NavDropdown