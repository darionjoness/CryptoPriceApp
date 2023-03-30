import React, { useEffect } from 'react'
import { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import Loading from './Loading'

  interface ThreeMonthHistoryTypes {
    date: string
    priceUsd: string
    time: number
}

interface ThreeMonthHistoryProps {
    byDayHistory: ThreeMonthHistoryTypes[]
    coinHistoryId: string
    currentChartDataTime: number
    currentCoinInfoLoading: boolean
}

const ThreeMonthChart = ({ byDayHistory, coinHistoryId, currentChartDataTime, currentCoinInfoLoading }: ThreeMonthHistoryProps) => {
    const [threeMonthHistoryLabels, setThreeMonthHistoryLabels] = useState<string[]>([])
    const [threeMonthPriceLabels, setThreeMonthPriceLabels] = useState<string[]>([])

    // Slice to get the last three months objects in the array
    let newByDayHistory = byDayHistory.slice(-92)

     // Run useEffect to reload everytime we get new data in byDayHistory
   useEffect(() => {
    // Create getNewCoinInfo function
    const getNewCoinInfo = () => {
        // create an empty array called newHistoryLabels
        let newHistoryLabels: string[] = []

        // Create an empty array called newHistoryPrices
        let newHistoryPrices: string[] = []

        // Loop through newByDayHistory
        newByDayHistory.forEach(item => {

            // GRAB and Format DATE
            // Split the date 
            let splitDate: string[] = item.date.split('-')
            
            // Grab current month
            let currentMonth: string = splitDate[1]
            
            // Grab currentDay
            let currentDay: string = splitDate[2].slice(0, 2)
            
            // Create final date with month and day seperated by a slash
            let finalDate: string = currentMonth + '/' + currentDay
            
            //  Push finalDate onto the newHistoryLabels Array
            newHistoryLabels.push(finalDate)

            // GRAB AND FORMAT PRICE
            let newPrice: string = Number(item.priceUsd).toFixed(2).toLocaleString()

            // Push newPrice onto newHistoryPrice
            newHistoryPrices.push(newPrice)
            
        })

        // setByDayHistoryLabels state to newHistoryLables array
        setThreeMonthHistoryLabels(newHistoryLabels)

        // setByDayPriceLabels
        setThreeMonthPriceLabels(newHistoryPrices)
    }

    // Run getNewCoinInfo
    getNewCoinInfo()

}, [byDayHistory])

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

//   Capitalize first letter of coinHistory Id
let newHisotryIdString: string = coinHistoryId.slice(1)
let newHistoryIdFirstLetter: string = coinHistoryId.slice(0, 1).toUpperCase()
let capitalHistoryId = newHistoryIdFirstLetter + newHisotryIdString

const data = {
  labels: threeMonthHistoryLabels,
  datasets: [
    {
      label: capitalHistoryId,
      data: threeMonthPriceLabels,
      borderColor: '#d4af37',
      backgroundColor: '#d4af37',
    },
  ],
};

// Give colors to the chart
ChartJS.defaults.color = '#fff'
ChartJS.defaults.borderColor = '#666'


//   Gives legend label some margin
const legendMargin = {
  id: "legendMargin",
  beforeInit: function (chart: any) {
    const fitValue = chart.legend.fit;
    chart.legend.fit = function fit() {
      fitValue.bind(chart.legend)();
      return (this.height += 20);
    };
  }
};

const options = {
  responsive: true,
  plugins: {
      legend: {
          position: 'top' as const,
          labels: {
              font: {
                  size: 15
              },
          }
      }
  }
  
}

  return (
    <div className={`threeMonthChart container
    ${currentChartDataTime === 3 
    ? 'showChart' 
    : 'hideChart'}`}>
        <div className="threeMonthChartItems">
            {currentCoinInfoLoading ? <Loading type={'cylon'} color={'#d4af37'} /> : <Line options={options} data={data} plugins={[legendMargin]} />}
        </div>
    </div>
  )
}

export default ThreeMonthChart