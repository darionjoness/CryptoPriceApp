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

  interface OneYearHistoryTypes {
    date: string
    priceUsd: string
    time: number
}

interface OneYearHistoryProps {
    byDayHistory: OneYearHistoryTypes[]
    coinHistoryId: string
    currentChartDataTime: number
    currentCoinInfoLoading: boolean
}


const OneYearChart = ({ byDayHistory, coinHistoryId, currentChartDataTime, currentCoinInfoLoading }: OneYearHistoryProps) => {
    const [oneYearHistoryLabels, setOneYearHistoryLabels] = useState<string[]>([])
    const [oneYearPriceLabels, setOneYearPriceLabels] = useState<string[]>([])

     // Run useEffect to reload everytime we get new data in byDayHistory
   useEffect(() => {
    // Create getNewCoinInfo function
    const getNewCoinInfo = () => {
        // create an empty array called newHistoryLabels
        let newHistoryLabels: string[] = []

        // Create an empty array called newHistoryPrices
        let newHistoryPrices: string[] = []

        // Loop through newByDayHistory
        byDayHistory.forEach(item => {

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
        setOneYearHistoryLabels(newHistoryLabels)

        // setByDayPriceLabels
        setOneYearPriceLabels(newHistoryPrices)
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
  labels: oneYearHistoryLabels,
  datasets: [
    {
      label: capitalHistoryId,
      data: oneYearPriceLabels,
      borderColor: '#b74cf5',
      backgroundColor: '#b74cf5',
    },
  ],
};

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
    <div className={`oneYearChart container 
    ${currentChartDataTime === 4 
    ? 'showChart' 
    : 'hideChart'}`}>
         <div className="oneYearChartItems">
            {currentCoinInfoLoading ? <Loading type={'cylon'} color={'#b74cf5'} /> : <Line options={options} data={data} plugins={[legendMargin]} />}
         </div>
    </div>
  )
}

export default OneYearChart