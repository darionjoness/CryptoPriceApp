import React from 'react'
import { FiChevronRight } from "react-icons/fi";
import {Link} from 'react-router-dom'

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

interface TopLosersTypes {
    topThreeLosers: CoinDataTypes[]
}

const TopLosers = ({ topThreeLosers }: TopLosersTypes) => {
  return (
    <div className='topLosers'>
        <div className="topLosersHeader">
            <h2>🚨 Top Losers 24h</h2>
            <Link className='topLosersMore' to={'/toplosers'}>More <FiChevronRight /></Link>
        </div>
        <div className="topLosersItems">
            {topThreeLosers.map((item,idx) => (
                <div key={item.rank} className={'topLoser'}>
                    <div className="topLoserTitle">
                        <h3>{idx + 1}.</h3>
                        <h3>{item.name}</h3>
                        <h5>{item.symbol}</h5>
                    </div>
                    <div className="topLoserPercent">
                        <p>{Number(item.changePercent24Hr).toLocaleString()}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default TopLosers