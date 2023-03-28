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

interface CoinInfoProps {
    coinData: CoinDataTypes[]
    currentDataRank: number
    currentCoinInfoLoading: boolean
}

const CurrentCoinInfo = ({ coinData, currentDataRank, currentCoinInfoLoading }: CoinInfoProps) => {
   

  return (
    <div className='currentCoinInfo container'>
        {currentCoinInfoLoading ? <Loading type={'cylon'} color={'#b74cf5'} /> : <div className="currentCoinInfoItems">
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>24h %</th>
                        <th>MCap</th>
                        <th>Supply</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <p>{coinData[currentDataRank].rank}</p>
                        </td>
                        <td>
                            <p>
                                {coinData[currentDataRank].name}
                                <span className='symbol'>{coinData[currentDataRank].symbol}</span>
                            </p>
                        </td>
                        <td>
                            <p>
                                ${Number(coinData[currentDataRank].priceUsd).toLocaleString()}
                            </p>
                        </td>
                        {Number(coinData[currentDataRank].changePercent24Hr) > 0 
                        ? 
                        <td className='positive'>
                            <p>
                                +{Number(coinData[currentDataRank].changePercent24Hr).toFixed(2)}
                            </p>
                        </td>
                        : 
                            <td className='negative'>
                                <p>
                                    {Number(coinData[currentDataRank].changePercent24Hr).toFixed(2)}
                                </p>
                            </td>
                        }
                        <td>
                            <p>
                                ${Number(coinData[currentDataRank].marketCapUsd).toLocaleString(undefined,
                                {'minimumFractionDigits':2,'maximumFractionDigits':2})}
                            </p>
                        </td>
                        <td>
                            <p>
                                {Number(coinData[currentDataRank].supply).toLocaleString()}
                            </p>
                        </td>
    
                    </tr>
                </tbody>
            </table>
        </div>}
    </div>
  )
}

export default CurrentCoinInfo