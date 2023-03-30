import React from 'react'
import { BiCoinStack, BiWalletAlt, BiPurchaseTag } from "react-icons/bi";
import { FaExchangeAlt } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { AiOutlineStar, AiOutlineClose } from "react-icons/ai";
import {Link} from 'react-router-dom'

interface SidebarTypes {
    viewSidebar: boolean
    hideSidebar: React.MouseEventHandler
    changeSection: number
    menuRef: any
    changeTab: any
}

const Sidebar = ({ viewSidebar, hideSidebar, changeSection, menuRef, changeTab }: SidebarTypes) => {
  return (
    <div ref={menuRef} className={`sidebar ${viewSidebar ? 'show' : 'hide'}`}>
        <button onClick={hideSidebar} className="closeSidebarBtn">
                <AiOutlineClose />
            </button>
        <div className="sidebarItems">
            <div className={`viewCryptosDiv sidebarLink ${changeSection == 0 ? 'active' : ''}`}>
            <Link onClick={() => changeTab(0)} className={`viewCryptos ${changeSection == 0 ? 'active' : 'notActive'}`} to={'/'}>
                <p><BiCoinStack /></p>
                <p>Cryptos</p>
            </Link>
            </div>
            <div className={`viewWalletDiv sidebarLink ${changeSection == 1 ? 'active' : ''}`}>
                <Link className={` viewWallet ${changeSection == 1 ? 'active' : 'notActive'}`} onClick={() => changeTab(1)} to={'/wallet'}>
                    <p><BiWalletAlt /></p>
                    <p>Wallet</p>
                </Link>
            </div>
            <div className={`sidebarLink viewExchangeDiv ${changeSection === 2 ? 'active' : ''}`}>
                <Link onClick={() => changeTab(2)} className={`viewExchange ${changeSection === 2 ? 'active' : 'notActive'}`} to={'/exchanges'}>
                    <p><FaExchangeAlt /></p>
                    <p>Exchanges</p>
                </Link>
            </div>  
            <div className={`sidebarLink viewTransactionsDiv ${changeSection === 3 ? 'active' : ''}`}>
                <Link onClick={() => changeTab(3)} className={`viewTransactions ${changeSection === 3 ? 'active' : 'notActive'}`} to={'/transactions'}>
                    <p><BiPurchaseTag /></p>
                    <p>Transactions</p>
                </Link>
            </div>
            <div className="sidebarLink viewAccount">
                <p><IoPersonOutline /></p>
                <p>Account</p>
            </div>
            <div className="sidebarLink viewFavorites">
                <AiOutlineStar />
                <p>Favorites</p>
            </div>
        </div>
    </div>
  )
}

export default Sidebar