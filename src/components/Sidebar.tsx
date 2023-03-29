import React from 'react'
import { BiCoinStack, BiWalletAlt, BiPurchaseTag } from "react-icons/bi";
import { FaExchangeAlt } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { AiOutlineStar, AiOutlineClose } from "react-icons/ai";

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
            <div onClick={() => changeTab(0)} className={`sidebarLink viewCryptos ${changeSection == 0 ? 'active' : ''}`}>
                <p><BiCoinStack /></p>
                <p>Cryptos</p>
            </div>
            <div onClick={() => changeTab(1)} className={`sidebarLink viewWallet ${changeSection == 1 ? 'active' : ''}`}>
                <p><BiWalletAlt /></p>
                <p>Wallet</p>
            </div>
            <div onClick={() => changeTab(2)} className={`sidebarLink viewExchange ${changeSection === 2 ? 'active' : ''}`}>
                <p><FaExchangeAlt /></p>
                <p>Exchanges</p>
            </div>
            <div onClick={() => changeTab(3)} className={`sidebarLink viewTransactions ${changeSection === 3 ? 'active' : ''}`}>
                <p><BiPurchaseTag /></p>
                <p>Transactions</p>
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