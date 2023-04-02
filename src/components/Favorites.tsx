import React from 'react'
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

interface FavoritesTypes {
    favorites: CoinDataTypes[]
}

const Favorites = ({ favorites}: FavoritesTypes) => {
  return (
    <div className='favorites'>
        <h1 className='favoritesHeader'>Favorites</h1>
        <div className="favoritesItems container">
        {favorites.length > 0 ? <table cellSpacing={'0'} cellPadding={'0'} className='coinTable'>

<thead>
  <tr>
    <th>Rank</th>
    <th>Name</th>
    <th>Price</th>
    <th>MCap</th>
    <th>24h %</th>
    <th>Volume</th>
  </tr>
</thead>


{favorites
.map((item, idx) => (
  <tbody key={item.id} className='coinBody'>
  <tr>
      <td>
        <p>
          {item.rank}
        </p>
      </td>
      <td>
          <span className='coinTitle'>{item.name}</span>
          <span className='coinSymbol'>{item.symbol}</span>
      </td>
      <td>
      <p className='coinPrice'>
        ${Number(item.priceUsd)
        .toLocaleString()}
      </p>
      </td>
      <td>
      <p className='marketCap'>{` $${Number(item.marketCapUsd).toLocaleString()}`}</p>
    </td>
    <td>
    <div className='changePercent'>
                    {Number(item.changePercent24Hr) > 0 
                    ? 
                    <p className='changePercent positive'>
                        +{Number(item.changePercent24Hr).toFixed(2)}
                    </p> 
                    : <p className='changePercent negative'>
                        {Number(item.changePercent24Hr).toFixed(2)}%
                    </p> }
                </div>
    </td>
    <td>
      <p className='volume'>{` $${Number(item.volumeUsd24Hr).toLocaleString()}`}</p>
    </td>
  </tr>
  </tbody>

   ))}


</table> : <h2 className='noCoins'>No favorites added yet. Add them from the cryptos tab!</h2>

    }
        </div>
    </div>
  )
}

export default Favorites