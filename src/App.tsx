import './App.css'
import { useState, useEffect, useRef } from 'react'
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
import Sidebar from './components/Sidebar'
import Exchanges from './components/Exchanges'

// API Data is about a day off, it is not up to date to the exact minute

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
  const [changeSection, setChangeSection] = useState<number>(0)
  const [viewModal, setViewModal] = useState<boolean>(false)
  const [viewSidebar, setViewSidebar] = useState<boolean>(false)
  // My Assets state
  const [showAddFunds, setShowAddFunds] = useState<boolean>(false)
  const [amount, setAmount] = useState<number>(0)
  const [addedAmount, setAddedAmount] = useState<number>(0)
  const [amountInput, setAmountInput] = useState<string>('')
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
  const [nameInput, setNameInput] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [transactions, setTransactions] = useState<number[]>([])
  const [addFundsErr, setAddFundsErr] = useState<boolean>(false)

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

    // setCurrentDataRank to the e.target.value - 1
    setCurrentDataRank(e.target.value - 1)

    // setViewModal to true
    setViewModal(true)

    // Grab the currentCoinInfo from the dom
    const currentCoin = document.querySelector('.currentCoinInfo')
    // Scroll down to currentCoin
    currentCoin?.scrollIntoView()

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

  // Used to show cryptos
  const showHome = () => {
    setChangeSection(0)
  }

  // Used to show Wallet
  const showAssets = () => {
    setChangeSection(1)
  }

  const showExchanges = () => {
    setChangeSection(2)
  }

  // Used to toggle sidebar
  const showSidebar = () => {
    setViewSidebar(!viewSidebar)
  }

  let menuRef = useRef<HTMLDivElement>();

  // When click outside the sidebar close it
  useEffect(() => {
    let handler = (e: any) => {
      if(!menuRef.current?.contains(e.target)){
        setViewSidebar(false)
      }
    }

    document.addEventListener('mousedown', handler)
  }, [])


  // MyAssets component functions

  //   Controlled input for amount input
  const controlAmount = (e: any) => {
    setAmountInput(e.target.value)
  }

  // Create comepleAddFunds function
  const completeAddFunds = () => {
    if(nameInput == '' || amountInput == ''){
      setAddFundsErr(true)
    }else{
      // setAmount to amount + the amountInput made a number, totalAmount
      setAmount(amount + Number(amountInput))

      // Gets the amount added
      setAddedAmount(Number(amountInput))
      // Clear the amountInput field
      setAmountInput('')
      // Set name to the setName input
      setName(nameInput)
      // Show confirmation
      setShowConfirmation(true)
      // Hide add funds page
      setShowAddFunds(false)
      // Hide error message
      setAddFundsErr(false)
    }
  }

   // Show the funds form when true
   const showFundsForm = () => {
    setShowAddFunds(true)
  }

  // Create closeFundsAdded function
  const closeFundsAdded = () => {
    // Hide confirmation page
    setShowConfirmation(false)

    // Get an array of transactions
    setTransactions([...transactions, addedAmount])
  }

  // Create closeAddFunds function
  const closeAddFunds = () => {
    setShowAddFunds(false)
  }

  return (
    <div className="app">

      <Sidebar showExchanges={showExchanges} menuRef={menuRef} changeSection={changeSection} showAssets={showAssets} showHome={showHome} hideSidebar={showSidebar} viewSidebar={viewSidebar} />

      <Header showSidebar={showSidebar} changeSection={showHome} changeSectionTwo={showAssets} />
      
      {changeSection === 0 && <div className="sectionCoinInfo">
        {isLoading ? <Loading type='spokes' color='#b74cf5' /> : <Coins coinData={coinData} searchInput={searchInput} onClick={clickChangeCoinHistory}/>}

        {coinsFetched ? <CurrentCoinInfo coinData={coinData} currentDataRank={currentDataRank} currentCoinInfoLoading={currentCoinInfoLoading} /> : ''}

        <SwitchChartData show1Year={show1Year} show3Month={show3Month} show30Day={show30Day} show7Day={show7Day} currentChartDataTime={currentChartDataTime} show24Hour={show24Hour} />

        <SevenDayChart currentCoinInfoLoading={currentCoinInfoLoading} currentChartDataTime={currentChartDataTime} byDayHistory={byDayHistory} coinHistoryId={coinHistoryId} />

        <TwentyFourHourChart currentCoinInfoLoading={currentCoinInfoLoading} coinHistoryId={coinHistoryId} currentChartDataTime={currentChartDataTime} byDayHistory={byDayHistory} />

        <ThirtyDayChart currentCoinInfoLoading={currentCoinInfoLoading} currentChartDataTime={currentChartDataTime} byDayHistory={byDayHistory} coinHistoryId={coinHistoryId} />

        <ThreeMonthChart currentCoinInfoLoading={currentCoinInfoLoading} currentChartDataTime={currentChartDataTime} byDayHistory={byDayHistory} coinHistoryId={coinHistoryId} />

        <OneYearChart currentCoinInfoLoading={currentCoinInfoLoading} currentChartDataTime={currentChartDataTime} byDayHistory={byDayHistory} coinHistoryId={coinHistoryId} />
      </div>}

      {changeSection === 1 && <div className="sectionMyAssets">
        {isLoading ? 
        <Loading type='spokes' color='#b74cf5' />  
        : 
        <MyAssets 
        addFundsErr={addFundsErr}
        controlName={(e:any) => setNameInput(e.target.value)} 
        closeAddFunds={closeAddFunds} 
        closeFundsAdded={closeFundsAdded} 
        showFundsForm={showFundsForm} 
        name={name} 
        nameInput={nameInput} 
        showConfirmation={showConfirmation} 
        amountInput={amountInput} 
        amount={amount} 
        showAddFunds={showAddFunds} 
        completeAddFunds={completeAddFunds} 
        controlAmount={controlAmount} 
        onChange={(e: any) => setSearchInput(e.target.value)} 
        searchInput={searchInput} 
        coinData={coinData} />}
      </div>}

      {changeSection === 2 && <Exchanges />}

    </div>

  )
}

export default App
