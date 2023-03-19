import React from 'react'
import Header from './Header'
import { BsArrowDownSquare } from "react-icons/bs";

interface ShowcaseProps {
    changeSection: (e: React.MouseEvent<HTMLButtonElement>) => void
    changeSectionTwo: (e: React.MouseEvent<HTMLButtonElement>) => void
  }

const Showcase = ({ changeSection, changeSectionTwo }: ShowcaseProps) => {
  return (
    <div className='showcase'>
        <div className="showcaseItems">
            <Header changeSection={changeSection} changeSectionTwo={changeSectionTwo} />
            <div className="showcaseText">
                <h1>CryptoPrice.io</h1>
                <h2>Quick and easy way to view crypto prices & charts</h2>
                <a href='#search'><BsArrowDownSquare /></a>
            </div>
        </div>
    </div>
  )
}

export default Showcase