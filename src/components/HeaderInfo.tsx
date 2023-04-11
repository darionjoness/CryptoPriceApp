import { parse } from 'node:path/win32'
import React, { useEffect } from 'react'
import { useState } from 'react'

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

interface HeaderInfoTypes {
    coinData: CoinDataTypes[]
}

const HeaderInfo = ({ coinData }: HeaderInfoTypes) => {
    const [totalCryptos, setTotalCryptos] = useState<number>()
    const [totalMarketCap, setTotalMarketCap] = useState<number>()
    const [totalVolume, setTotalVolume] = useState<number>()

    useEffect(() => {
        // Get the total amount of cryptos
        setTotalCryptos(coinData.length)

        const marketCapTotal = coinData.length > 0 ? coinData.reduce(
            (total: any, coin:any) => total + Number(coin.marketCapUsd), 0
        ) : ''

        setTotalMarketCap(marketCapTotal.toLocaleString())

        const volumeTotal = coinData.length > 0 ? coinData.reduce(
            (total: any, coin:any) => total + Number(coin.volumeUsd24Hr), 0
        ) : ''

        setTotalVolume(volumeTotal.toLocaleString())

    }, [coinData])


  return (
    <div className='headerInfo'>
        <div className="headerInfoItems container">
            <p className='totalCryptos'>Cryptos: <span>{totalCryptos}</span></p>
            <p className='totalMarketCap'>Market Cap: <span>${totalMarketCap}</span></p>
            <p className='volumeTotal'>24h Volume: <span>${totalVolume}</span></p>
        </div>
    </div>
  )
}

export default HeaderInfo