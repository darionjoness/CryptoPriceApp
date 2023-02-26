import { useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

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
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function ReactSimplyCarouselExample({ coinData, searchInput, onClick }: CoinDataProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

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
    <div>
      {newCoinData.length > 0 ? <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        autoplay={true}
        autoplayDelay={3000}
        itemsToShow={3}
        itemsToScroll={1}
        forwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: 'center',
            background: '#b74cf5',
            border: '1px solid #fff',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            margin: '0 10px',
            height: 40,
            lineHeight: 1,
            textAlign: 'center',
            width: 40,
          },
          children: <span>{<FaArrowRight/>}</span>,
        }}
        backwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: 'center',
            background: '#b74cf5',
            border: '1px solid #fff',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            margin:'0 10px' ,
            height: 40,
            lineHeight: 1,
            textAlign: 'center',
            width: 40,
          },
          children: <span>{<FaArrowLeft />}</span>,
        }}
        responsiveProps={[
          {
            itemsToShow: 2,
            itemsToScroll: 1,
            maxWidth: 1268,
          },
          {
            maxWidth: 868,
            itemsToShow: 1,
            itemsToScroll: 1
          }
        ]}
        speed={300}
        easing="linear"
      >
        {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}
        { 
            
        newCoinData
        .map((item, idx) => (
            
            <div style={{ margin: '10px 0' }} key={item.id} className='coins'>
                <div className="coinsItems">
                    <div className="coinTitle">
                        <h2>{item.name}</h2>
                        <p>{item.symbol}</p>
                    </div>
                    <div className="coinPriceDiv">
                        <p className='coinPrice'>
                            ${Number(item.priceUsd)
                            .toLocaleString()}
                        </p>
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
                    </div>
                    <p className='marketCap'><strong>MCAP: </strong>{` ${Number(item.marketCapUsd).toLocaleString()}`}</p>
                    <p className='volume'><strong>24H Volume: </strong>{` ${Number(item.volumeUsd24Hr).toLocaleString()}`}</p>
                    <a target={'_blank'} href={item.explorer}>Blockchain Explorer</a>
                    <div className="viewChart">
                        <button value={item.rank} id={item.id} onClick={(e) => onClick(e)} className='viewChartBtn'>
                            View Stats
                        </button>
                    </div>
                </div>
            </div>
        ))} 
      </ReactSimplyCarousel> : <h1 className='noCoins'>No coins matching that name!</h1>}
    </div>
  )
}

export default ReactSimplyCarouselExample;
