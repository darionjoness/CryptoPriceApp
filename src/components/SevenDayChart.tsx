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
import Loading from './Loading';
  

interface ByDayHistoryTypes {
    date: string
    priceUsd: string
    time: number
}

interface ByDayHistoryProps {
    byDayHistory: ByDayHistoryTypes[]
    coinHistoryId: string
    currentChartDataTime: number
    currentCoinInfoLoading: boolean
}

const SevenDayChart = ({ byDayHistory, coinHistoryId, currentChartDataTime, currentCoinInfoLoading }: ByDayHistoryProps) => {
    const [byDayHistoryLabels, setByDayHistoryLabels] = useState<string[]>([])
    const [byDayPriceLabels, setByDayPriceLabels] = useState<string[]>([])

    // Slice to get the last 7 objects in the array
    let newByDayHistory = byDayHistory.slice(-7)

    // Run useEffect to reload everytime we get new data in byDayHistory
    useEffect(() => {
        // Create
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


                newHistoryPrices.push(newPrice)
                
            })

            // setByDayHistoryLabels state to newHistoryLables array
            setByDayHistoryLabels(newHistoryLabels)

            // setByDayPriceLabels
            setByDayPriceLabels(newHistoryPrices)
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
    labels: byDayHistoryLabels,
    datasets: [
      {
        label: capitalHistoryId,
        data: byDayPriceLabels,
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
    <div className={`sevenDayChart 
    ${currentChartDataTime == 1 
    ? 'showChart' 
    : 'hideChart'
    }`}>
        <div className="sevenDayChartItems">
            {currentCoinInfoLoading ? <Loading type={'cylon'} color={'#b74cf5'} /> : <Line options={options} data={data} plugins={[legendMargin]} />}
        </div>
    </div>
  )
}

export default SevenDayChart