import React from 'react'
import { useState, useEffect } from 'react';
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

interface TwentyFourHourChartProps {
    currentChartDataTime: number
    byDayHistory: ByDayHistoryTypes[]
    coinHistoryId: string
    currentCoinInfoLoading: boolean
}

const TwentyFourHourChart = ({ currentChartDataTime, byDayHistory, coinHistoryId, currentCoinInfoLoading }: TwentyFourHourChartProps) => {
    const [byHourHistoryLabel, setByHourHistoryLabel] = useState<number[]>([])
    const [byHourHistoryPrice, setByHourHistoryPrice] = useState<string[]>([])

    // Slice the last 24 objects
    let newByDayHistory = byDayHistory.slice(-25)


     // Run useEffect to reload everytime we get new data in byDayHistory
     useEffect(() => {
        // Create
        const getNewCoinInfo = () => {
            // create an empty array called newHistoryLabels
            let newHistoryLabels: any[] = []

            // Create an empty array called newHistoryPrices
            let newHistoryPrices: string[] = []

            // Loop through newByDayHistory
            newByDayHistory.forEach(item => {

                // GRAB and Format DATE
                // Split the date 
                let splitDate: string[] = item.date.split('-')

                // Slice the time out of the array
                let newTime: any = splitDate[2].slice(3 ,5)


                // Initalize finalTime
                let finalTime: string | number
                
                // Check If newTime is greater than 12
                if(Number(newTime) >= 12){
                    
                    // Check if newTime is equal to 12
                    if(Number(newTime) == 12){
                        finalTime = newTime + 'pm'

                    }else{
                        // Subtract 12 from final time if newTime is greater than 12
                        finalTime = newTime - 12 + 'pm'
                    }
                } else if(Number(newTime) == 0){
                    // If newTime is 0 set finalTime 12
                    finalTime = 12 + 'am'
                } else{
                    // Else set finalTime to the newTime
                    finalTime = newTime + 'am'
                }

                // Push finalTime onto newHistoryLables
                newHistoryLabels.push(finalTime)

                // set newPrice to new price with fixed decimal to 2
                let newPrice: string = Number(item.priceUsd).toFixed(2).toLocaleString()

                // Push newPrice to newHistoryPrices
                newHistoryPrices.push(newPrice)
                

            })

            // setByDayHistoryLabels state to newHistoryLables array
            setByHourHistoryLabel(newHistoryLabels)

            // setByDayPriceLabels
            setByHourHistoryPrice(newHistoryPrices)
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
    labels: byHourHistoryLabel,
    datasets: [
      {
        label: capitalHistoryId,
        data: byHourHistoryPrice,
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
    <div className={`twentyFourHourChart container 
    ${currentChartDataTime === 0 ? 'showChart' : 'hideChart'}`}>
        <div className="twentyFourHourChartItems">
            {currentCoinInfoLoading ? <Loading type={'cylon'} color={'#b74cf5'} /> : <Line options={options} data={data} plugins={[legendMargin]} />}
        </div>
    </div>
  )
}

export default TwentyFourHourChart