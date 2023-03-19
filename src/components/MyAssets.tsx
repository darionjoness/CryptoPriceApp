import React from 'react'
import Loading from './Loading'

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
}

const MyAssets = ({ coinData, searchInput }: MyAssetsProps) => {

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
        <h1 className='myBalance'>My Balance: $0.00</h1>
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