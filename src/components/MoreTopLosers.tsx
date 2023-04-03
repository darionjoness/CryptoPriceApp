import React from 'react'
import { FiChevronLeft } from "react-icons/fi";
import { Link } from 'react-router-dom'
import FavoritesButton from './FavoritesButton'

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
    removeBookmark: any
    addBookmark: any
    showFavMsg: boolean
    showRemoveFavMsg: boolean
    alreadyAddedMsg: boolean
}

const MoreTopLosers = ({ topTenLosers, removeBookmark, addBookmark, showFavMsg, showRemoveFavMsg, alreadyAddedMsg }: MoreTopLosers) => {
  return (
    <div className='moreTopLosers'>
        <Link className='container moreTopLosersBack' to={'/'}><FiChevronLeft /> Back</Link>
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
                        <p className='favBtn'>
                            <FavoritesButton onRemoveBookmark={() => removeBookmark(item)} onAddBookmark={() => addBookmark(item)} />
                            </p>
                            <h3>{item.rank}</h3>
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
            {showFavMsg ? <h3 className='favAdded'>Favorite Added!</h3> : ''}
          {alreadyAddedMsg ? <h3 className='alreadyAdded'>Already Added!</h3> : ''}
          {showRemoveFavMsg ? <h3 className='favRemoved'>Favorite Removed!</h3> : ''}
        </div>
    </div>
  )
}

export default MoreTopLosers