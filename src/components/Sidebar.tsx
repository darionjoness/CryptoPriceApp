import React from 'react'
import { BiCoinStack, BiWalletAlt, BiPurchaseTag } from "react-icons/bi";
import { FaExchangeAlt } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { AiOutlineStar, AiOutlineClose } from "react-icons/ai";

interface SidebarTypes {
    viewSidebar: boolean
    hideSidebar: React.MouseEventHandler
    showHome: React.MouseEventHandler
    showAssets: React.MouseEventHandler
    changeSection: number
    menuRef: any
    showExchanges: React.MouseEventHandler
}

const Sidebar = ({ viewSidebar, hideSidebar, showHome, showAssets, changeSection, menuRef, showExchanges }: SidebarTypes) => {
  return (
    <div ref={menuRef} className={`sidebar ${viewSidebar ? 'show' : 'hide'}`}>
        <button onClick={hideSidebar} className="closeSidebarBtn">
                <AiOutlineClose />
            </button>
        <div className="sidebarItems">
            <div onClick={showHome} className={`sidebarLink viewCryptos ${changeSection === 0 ? 'active' : ''}`}>
                <p><BiCoinStack /></p>
                <p>Cryptos</p>
            </div>
            <div onClick={showAssets} className={`sidebarLink viewWallet ${changeSection === 1 ? 'active' : ''}`}>
                <p><BiWalletAlt /></p>
                <p>Wallet</p>
            </div>
            <div onClick={showExchanges} className={`sidebarLink viewExchange ${changeSection === 2 ? 'active' : ''}`}>
                <p><FaExchangeAlt /></p>
                <p>Exchanges</p>
            </div>
            <div className="sidebarLink viewTransactions">
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