import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ExchangesMarketShare from './ExchangesMarketShare'
import Loading from './Loading'
import SearchBar from './SearchBar'


const Exchanges = () => {
    const [exchangesData, setExchangesData] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [searchInput, setSearchInput] = useState<string>('')
    const [changeView, setChangeView] = useState<boolean>(false)

    let newExchangesData = exchangesData
        // Filter through exchangesData
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
    
    useEffect(() => {
        fetchExchanges()
    }, [])

    // Create fetchExchanges async function
    const fetchExchanges = async () => {
        setIsLoading(true)
        // Fetch exchanges
        const res = await fetch('https://api.coincap.io/v2/exchanges')

        const data = await res.json()

        setExchangesData(data.data)

        setIsLoading(false)
    }

  return (
    <div className='exchanges container'>
        <h1 className='exchangesHeader'>Top Exchanges</h1>
        <div className="exchangeInfoBtns">
            <button className={`showExchangeBtn ${changeView ? '' : 'active'} `} onClick={() => setChangeView(false)}>Exchanges</button>
            <button className={`showExchangeMarketShare ${changeView ? 'active' : ''}`} onClick={() => setChangeView(true)}>Exchanges Market Share</button>
        </div>
        {changeView ? <ExchangesMarketShare exchangesData={exchangesData} /> : <div>
        <SearchBar placeholder={'🔍  Search Exchange'} onChange={(e) => setSearchInput(e.target.value)} />
        {isLoading ? <Loading type='spokes' color='#d4af37' /> :<div className="exchangesItems">
            {newExchangesData.length > 0 ? <table className='exchangeTable'>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Volume</th>
                        <th># Of Trading Pairs</th>
                        <th>Visit Exchange</th>
                    </tr>
                </thead>
                {newExchangesData.map((item, idx) => (
                    <tbody className='exchangeBody' key={item.rank}>
                        <tr className='exchangeRow'>
                            <td>
                                <p>{item.rank}</p>
                            </td>
                            <td>
                                <p className='exchangeTableName'>{item.name}</p>
                            </td>
                            <td>
                                <p>${Number(item.volumeUsd).toLocaleString()}</p>
                            </td>
                            <td>
                                <p>{item.tradingPairs}</p>
                            </td>
                            <td>
                                <a className='visitExchange' target={'_blank'} href={item.exchangeUrl}>Visit</a>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </table> : <h2 className='noExchanges'>No Exchanges matching this name!</h2>}
        </div>}
        </div>}
    </div>
  )
}

export default Exchanges