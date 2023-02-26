import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Coins from './components/Coins'
import Loading from './components/Loading'
import CurrentCoinInfo from './components/CurrentCoinInfo'
import SevenDayChart from './components/SevenDayChart'
import SwitchChartData from './components/SwitchChartData'
import TwentyFourHourChart from './components/TwentyFourHourChart'
import ThirtyDayChart from './components/ThirtyDayChart'
import ThreeMonthChart from './components/ThreeMonthChart'
import OneYearChart from './components/OneYearChart'
import MyAssets from './components/MyAssets'

// API Data is about a day off, it is not up to date to the exact hour

function App() {
  const [coinData, setCoinData] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState<string>('')
  const [coinHistoryId, setCoinHistoryId] = useState<string>('bitcoin')
  const [byDayHistory, setByDayHistory] = useState([])
  const [currentDataRank, setCurrentDataRank] = useState<number>(0)
  const [coinsFetched, setCoinsFetched] = useState<boolean>(false)
  const [currentCoinInfoLoading, setCurrentCoinInfoLoading] = useState<boolean>(false)
  const [currentChartDataTime, setCurrentChartDataTime] = useState<number>(0)
  const [timeInterval, setTimeInterval] = useState<string>('h')
  const [changeSection, setChangeSection] = useState<boolean>(false)


  useEffect(() => {
    fetchCoins();
  }, [])
  

  const fetchCoins = async () => {
    // Set Loading to true
    setIsLoading(true)

    // Try
    try {
      // Fetch coins
    const res = await fetch('https://api.coincap.io/v2/assets?limit=400')

    // Get data
    const data = await res.json()

    // Set loading to false
    setIsLoading(false)

    // setCoinData to data
    setCoinData(data.data)

    // setCoinsFetched true if coins are fetched
    setCoinsFetched(true)
      
    } catch (error) {
      console.log(error)
    }
  }

  // Run fetchHistory inside useEffect each time coinHistoryId changes
  useEffect(() => {
    fetchHistory()
  }, [coinHistoryId, timeInterval])

  // Create a function
  const clickChangeCoinHistory = (e: any) => {

    // setCoinHistoryId to the target clicked id
    setCoinHistoryId(e.target.id)


    setCurrentDataRank(e.target.value - 1)

  }

  // Create an async function called fetchHistory
  const fetchHistory = async () => {
    setCurrentCoinInfoLoading(true)

    // Try
    try {

      // Fetch history
      const res = await fetch(`https://api.coincap.io/v2/assets/${coinHistoryId}/history?interval=${timeInterval}1`)

      const data = await res.json()

      // setByDayHistory to the data
      setByDayHistory(data.data)

      setCurrentCoinInfoLoading(false)

      // Catch
    } catch (error) {
      // log the error if there is one
      console.log(error)
    }
  }

  // SWITCH CHARTS VIEWS

  // Show 24 hour chart
  const show24Hour = () => {
    // setCurrentChartDataTime to 0
    setCurrentChartDataTime(0)

    // Set timer interval to h to get hours
    setTimeInterval('h')
  }

  const show7Day = () => {
    // setCurrentChartDataTime to 1
    setCurrentChartDataTime(1)

    // Set timer interval to d to get days
    setTimeInterval('d')
  }

  const show30Day = () => {
    // setCurrentChartDataTime to 2
    setCurrentChartDataTime(2)

    // setTimerInterval to do to get days
    setTimeInterval('d')
  }

  const show3Month = () => {
     // setCurrentChartDataTime to 3
     setCurrentChartDataTime(3)

     // setTimerInterval to do to get days
     setTimeInterval('d')
  }

  const show1Year = () => {
    // setCurrentChartDataTime to 4
    setCurrentChartDataTime(4)

    // setTimerInterval to do to get days
    setTimeInterval('d')
  }

  const showHome = () => {
    setChangeSection(false)
  }

  const showAssets = () => {
    setChangeSection(true)
  }

  return (
    <div className="app container">
      <Header changeSection={showHome} changeSectionTwo={showAssets} />

      <SearchBar onChange={(e) => setSearchInput(e.target.value)} />

      {changeSection === false && <div className="sectionCoinInfo">
        {isLoading ? <Loading type='spokes' color='#b74cf5' /> : <Coins coinData={coinData} searchInput={searchInput} onClick={clickChangeCoinHistory}/>}

        {coinsFetched ? <CurrentCoinInfo coinData={coinData} currentDataRank={currentDataRank} currentCoinInfoLoading={currentCoinInfoLoading} /> : ''}

        <SwitchChartData show1Year={show1Year} show3Month={show3Month} show30Day={show30Day} show7Day={show7Day} currentChartDataTime={currentChartDataTime} show24Hour={show24Hour} />

        <SevenDayChart currentCoinInfoLoading={currentCoinInfoLoading} currentChartDataTime={currentChartDataTime} byDayHistory={byDayHistory} coinHistoryId={coinHistoryId} />

        <TwentyFourHourChart currentCoinInfoLoading={currentCoinInfoLoading} coinHistoryId={coinHistoryId} currentChartDataTime={currentChartDataTime} byDayHistory={byDayHistory} />

        <ThirtyDayChart currentCoinInfoLoading={currentCoinInfoLoading} currentChartDataTime={currentChartDataTime} byDayHistory={byDayHistory} coinHistoryId={coinHistoryId} />

        <ThreeMonthChart currentCoinInfoLoading={currentCoinInfoLoading} currentChartDataTime={currentChartDataTime} byDayHistory={byDayHistory} coinHistoryId={coinHistoryId} />

        <OneYearChart currentCoinInfoLoading={currentCoinInfoLoading} currentChartDataTime={currentChartDataTime} byDayHistory={byDayHistory} coinHistoryId={coinHistoryId} />
      </div>}

      {changeSection && <div className="sectionMyAssets">
        {isLoading ? <Loading type='spokes' color='#b74cf5' />  : <MyAssets searchInput={searchInput} coinData={coinData} />}
      </div>}


    </div>
  )
}

export default App
