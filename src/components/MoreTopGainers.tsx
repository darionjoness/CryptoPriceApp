import React from 'react'
import { AiOutlineClose } from "react-icons/ai";

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

interface MoreTopGainersTypes {
    topTenGainers: CoinDataTypes[]
    toggleMoreGainers: React.MouseEventHandler<HTMLButtonElement>
}

const MoreTopGainers = ({ topTenGainers, toggleMoreGainers }: MoreTopGainersTypes) => {
  return (
    <div className='moreTopGainers'>
        <h1 className='moreTopGainersHeader'>Top Ten Gainers</h1>
        <button onClick={toggleMoreGainers} className='closeMoreTopGainers'><AiOutlineClose /></button>
        <div className="moreTopGainersItems container">
            <table className='moreTopGainersTable'>

                <thead>
                    <tr>
                        <th>
                            <p>Rank</p>
                        </th>
                        <th>
                            <p>Name</p>
                        </th>
                        <th>
                            <p>Price</p>
                        </th>
                        <th>
                            <p>24h %</p>
                        </th>
                        <th>
                            <p>Volume(24h)</p>
                        </th>
                    </tr>
                </thead>

            {topTenGainers.map((item, idx) => (
                <tbody key={item.rank} className='moreTopTenGainersBody'>
                    <tr>
                        <td>
                            <h3>{idx + 1}</h3>
                        </td>
                        <td className='moreTopGainersCoinTitle'>
                            <h3>{item.name}</h3>
                            <h5>{item.symbol}</h5>
                        </td>
                        <td>
                            <p>${Number(item.priceUsd).toFixed(4)}</p>
                        </td>
                        <td>
                            <p>+{Number(item.changePercent24Hr).toFixed(4)}</p>
                        </td>
                        <td>
                            <p>${Number(item.volumeUsd24Hr).toLocaleString()}</p>
                        </td>
                    </tr>
                </tbody>
            ))}
            </table>
        </div>
    </div>
  )
}

export default MoreTopGainers