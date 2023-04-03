import React from 'react'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'

import { Pie } from 'react-chartjs-2'

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

interface ExchangesTypes {
    exchangeId: string
    exchangeUrl: string
    name: string
    percentTotalVolume: string
    rank: string
    socket: boolean
    tradingPairs: string
    updated: number
    volumeUsd: string
}

interface ExchangesMarketShareTypes {
    exchangesData: ExchangesTypes[]
}

const ExchangesMarketShare = ({ exchangesData }: ExchangesMarketShareTypes) => {

    let chartData: number[] = []

    // Slice the top 5 
    let firstFiveExchangeData = exchangesData.slice(0, 5)

    // Slice the rest
    let othersExchangeData = exchangesData.slice(5)

    // Turn the item to string and push to chartData
    firstFiveExchangeData.forEach(item => chartData.push(parseFloat(item.percentTotalVolume)))

    // Map the percentTotalVolume to othersPercent
    let othersPercent = othersExchangeData.map(item => parseFloat(item.percentTotalVolume))

    // Slice off the numbers that are NaN and add all the numbers together with reduce
    let othersPercentTotal = othersPercent.slice(0, -21).reduce((a,b) => a + b)

    // Push the othersPercentTotal onto chartData
    chartData.push(othersPercentTotal)

    let chartLabels = []

    // push the names of the firstFiveExchangeData to the chartLabels array
    firstFiveExchangeData.forEach(item => chartLabels.push(item.name))

    // Push others to chartLabels
    chartLabels.push('others')

    const data = {
        labels: chartLabels,
        datasets: [
            {
                data: chartData,
                backgroundColor: ['#003f5c', '#444e86', '#955196', '#dd5182', '#ff6e54', '#ffa600']
            }
        ]
    }

    const options = {
        responsive: true,
    }

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

  return (
    <div className='exchangeMarketShare'>
        <h1>Percentage of Market Share Chart</h1>
        <div style={{padding: '20px', margin: '0 auto'}} className="exchangeMarketShareItems">
            <Pie data={data} options={options} plugins={[legendMargin]}></Pie>
        </div>
    </div>
  )
}

export default ExchangesMarketShare