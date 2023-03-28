import React from 'react'
import AddFunds from './AddFunds'
import Loading from './Loading'
import SearchBar from './SearchBar'
import { useState } from 'react'
import FundsAdded from './FundsAdded'
 
interface CoinDataTypes {
    changePercent24Hr: string
    explorer: string
    id: string
    marketCapUsd: string
    maxSupply: string
    name: string
    priceUsd: string
    rank: string
    supply: string
    symbol: string
    volumeUsd24Hr: string
    vwap24Hr: string
}

interface MyAssetsProps {
    coinData: CoinDataTypes[]
    searchInput: string
    onChange: any
    controlAmount: React.FormEventHandler
    completeAddFunds: React.MouseEventHandler
    showAddFunds: boolean
    amount: number
    amountInput: string
    showConfirmation: boolean
    nameInput: string
    name: string
    showFundsForm: React.MouseEventHandler
    closeFundsAdded: React.MouseEventHandler
    closeAddFunds: React.MouseEventHandler
    controlName: React.FormEventHandler
    addFundsErr: boolean
}

const MyAssets = ({ coinData, searchInput, onChange, controlAmount, completeAddFunds, showAddFunds, amount, amountInput, showConfirmation, nameInput, name, showFundsForm, closeFundsAdded, closeAddFunds, controlName, addFundsErr }: MyAssetsProps) => {

    let newCoinData = coinData
        // Filter through coinData
        .filter((item) => {
            if(searchInput === ''){
                return item
                // Check if name toLowerCase includes the searchInput toLowerCase()
            } else if(
                item.name.toLowerCase().includes(searchInput.toLowerCase())
            ){
                return item
            }
        })




  return (
    <div className='myAssets container'>
      <h1 className='assetsHeader'>Your Assets</h1>
        <div className="addFundsBtnDiv">
            <button className='addFundsBtn' onClick={showFundsForm}>Add Funds</button>
        </div>
        {showConfirmation ? 
        <FundsAdded closeFundsAdded={closeFundsAdded} /> : 
        <AddFunds 
        addFundsErr={addFundsErr}
        closeAddFunds={closeAddFunds} 
        inputSet={controlName} 
        nameInput={nameInput} 
        completeAddFunds={completeAddFunds} 
        amountInput={amountInput} 
        controlAmount={controlAmount} 
        showAddFunds={showAddFunds} />}
        <SearchBar placeholder={`🔍  Search Coin`} onChange={(e) => onChange(e)} />
        <h1 className='myName'>{name}</h1>
        <h1 className='myBalance'>My Balance: ${amount.toLocaleString()}</h1>
            {newCoinData.length > 0 ? <div className="myAssetsItems">
                    {newCoinData.map((coin, idx) => (
                        <div className='myAssetsCoins' key={coin.id}>
                            <div className="myAssetsCoinsTitle">
                                <h2>{coin.name}</h2>
                                <h4>{coin.symbol}</h4>
                            </div>
                            <p>$0.00</p>
                        </div>
                    ))}
        </div> : <h1 className='noCoins'>No coins matching that name!</h1>}
    </div>
  )
}

export default MyAssets