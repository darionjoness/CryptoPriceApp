import { useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Pagination from './Pagination'
import TopGainers from './TopGainers';
import MoreTopGainers from './MoreTopGainers'
import TopLosers from './TopLosers';
import FavoritesButton from './FavoritesButton'
import { BiChevronUp, BiChevronDown } from "react-icons/bi";

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

interface CoinDataProps {
    coinData: CoinDataTypes[]
    searchInput: string
    onClick: React.MouseEventHandler
    topThreeGainers: CoinDataTypes[]
    topThreeLosers: CoinDataTypes[]
    addBookmark: any
    removeBookmark: any
    showFavMsg: boolean
    alreadyAddedMsg: boolean
    showRemoveFavMsg: boolean
}

function ReactSimplyCarouselExample({ coinData, searchInput, onClick, topThreeGainers, topThreeLosers, addBookmark, removeBookmark, showFavMsg, alreadyAddedMsg, showRemoveFavMsg }: CoinDataProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [toggleHideCoins, setToggleHideCoins] = useState<boolean>(false)
  const [sortedCoins, setSortedCoins] = useState()

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

        // newCoinData.length divide by itemsPerPage gets the total number of pages
        const totalPages: number = Math.ceil(newCoinData.length / itemsPerPage);

        // create handlePageChange function and pass through pageNumber
        function handlePageChange(pageNumber: number): void {
          setCurrentPage(pageNumber);
        }
      
        // Get the start index for pagination
        const startIndex: number = (currentPage - 1) * itemsPerPage;

        // Get the end index for the pagination
        const endIndex: number = startIndex + itemsPerPage;

        // Slice out the startIndex and endIndex into a new array
        const itemsToDisplay = newCoinData.slice(startIndex, endIndex);


        // HIDES HIGHLIGHTS
        const toggleCoins = () => {
          setToggleHideCoins(!toggleHideCoins)
        }


  return (
    <div className='container'>
      <div className="hideHighlightsBtn">
        <h3>Hide Highlights</h3>
        <label className="switch">
          <input onClick={toggleCoins} type="checkbox"/>
          <span className="slider round"></span>
        </label>
      </div>
      {toggleHideCoins ? '' : <div className="topMovers">
        <TopGainers topThreeGainers={topThreeGainers} />
        <TopLosers topThreeLosers={topThreeLosers} />
      </div>}
      <h1 className='coinHeader'>Top Cryptocurrency prices by Market Cap</h1>
      {newCoinData.length > 0 ? <table className='coinTable'>

        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Price</th>
            <th>MCap</th>
            <th>24h %</th>
            <th>Volume</th>
            <th>Stats</th>
          </tr>
        </thead>


       {itemsToDisplay
        .map((item, idx) => (
          <tbody key={item.id} className='coinBody'>
          <tr>
              <td>
                <p className='favBtn'><FavoritesButton onRemoveBookmark={() => removeBookmark(item)} onAddBookmark={() => addBookmark(item)} /></p>
                <p className='coinRank'>
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
            <td>
            <button value={item.rank} id={item.id} onClick={(e) => onClick(e)} className='viewChartBtn'>
                View Stats
            </button>
            </td>
            <td className='addToFavMobileBtn'>
              <button onClick={() => addBookmark(item)}>Add to favorites</button>
            </td>
          </tr>
          </tbody>

           ))}


      </table> : <h1 className='noCoins'>No Coins matching this name!</h1>
      
            }
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
          {showFavMsg ? <h3 className='favAdded'>Favorite Added!</h3> : ''}
          {alreadyAddedMsg ? <h3 className='alreadyAdded'>Already Added!</h3> : ''}
          {showRemoveFavMsg ? <h3 className='favRemoved'>Favorite Removed!</h3> : ''}
    </div>
  )
}

export default ReactSimplyCarouselExample;
