import React from 'react'

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

interface MoreTopLosers {
    topTenLosers: CoinDataTypes[]
}

const MoreTopLosers = ({ topTenLosers }: MoreTopLosers) => {
  return (
    <div className='moreTopLosers'>
        <h1 className='moreTopLosersHeader'>Top Ten Losers</h1>
        <div className="moreTopLosersItems container">
            <table className='moreTopLosersTable'>

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

            {topTenLosers.map((item, idx) => (
                <tbody key={item.rank} className='moreTopTenLosersBody'>
                    <tr>
                        <td>
                            <h3>{idx + 1}</h3>
                        </td>
                        <td className='moreTopLosersCoinTitle'>
                            <h3>{item.name}</h3>
                            <h5>{item.symbol}</h5>
                        </td>
                        <td>
                            <p>${Number(item.priceUsd).toFixed(4)}</p>
                        </td>
                        <td className='moreTopLosersPercent'>
                            <p>{Number(item.changePercent24Hr).toFixed(4)}%</p>
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

export default MoreTopLosers