import React from 'react'
import { MdShowChart } from "react-icons/md";
import { FiChevronRight } from "react-icons/fi";

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

interface TopMovers {
    topThreeGainers: CoinDataTypes[]
    toggleMoreGainers: React.MouseEventHandler<HTMLButtonElement>
}

const TopGainers = ({ topThreeGainers, toggleMoreGainers }: TopMovers) => {


  return (
    <div className='topGainers'>
        <div className="topGainersHeader">
            <h2>🚀 Top Gainers 24h</h2>
            <button onClick={toggleMoreGainers}>More <FiChevronRight /></button>
        </div>
        <div className="topGainersItems">
            {topThreeGainers.map((item, idx) => (
                <div key={item.rank} className='topGainer'>
                    <div className="topGainerTitle">
                        <h3>{idx + 1}.</h3>
                        <h3>{item.name}</h3>
                        <h5>{item.symbol}</h5>
                    </div>
                    <div className="topGainerPercent">
                        <p>+{Number(item.changePercent24Hr).toLocaleString()}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default TopGainers