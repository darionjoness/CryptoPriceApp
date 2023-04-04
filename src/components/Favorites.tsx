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
    addBookmark: any
    removeBookmark: any
    showFavMsg: boolean
    showRemoveFavMsg: boolean
    alreadyAddedMsg: boolean
}

const Favorites = ({ favorites, addBookmark, removeBookmark, showFavMsg, showRemoveFavMsg, alreadyAddedMsg}: FavoritesTypes) => {
  return (
    <div className='favorites'>
        <h1 className='favoritesHeader'>Favorites</h1>
        <div className="favoritesItems container">
        {favorites.length > 0 ? <table className='favoritesTable'>

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
  <tbody key={item.id} className='favoritesBody'>
  <tr>
      <td>
        <p className='favBtn'><FavoritesButton onRemoveBookmark={() => removeBookmark(item)} onAddBookmark={() => addBookmark(item)} /></p>
        <p>
          {item.rank}
        </p>
      </td>
      <td>
          <span className='favoritesTitle'>{item.name}</span>
          <span className='favoritesSymbol'>{item.symbol}</span>
      </td>
      <td>
      <p className='favoritesPrice'>
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
    <td className='removeFavMobileBtn'>
      <button onClick={() => removeBookmark(item)}>Remove Favorite</button>
    </td>
  </tr>
  </tbody>

   ))}


</table> : <h2 className='noCoins'>No favorites added yet. Add them from the cryptos tab!</h2>

    }
          {showFavMsg ? <h3 className='favAdded'>Favorite Added!</h3> : ''}
          {alreadyAddedMsg ? <h3 className='alreadyAdded'>Already Added!</h3> : ''}
          {showRemoveFavMsg ? <h3 className='favRemoved'>Favorite Removed!</h3> : ''}
        </div>
    </div>
  )
}

export default Favorites