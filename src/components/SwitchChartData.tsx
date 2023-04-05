import React from 'react'

interface SwitchChartDataProps {
    currentChartDataTime: number
    switchChartViews: any
}

const SwitchChartData = ({ currentChartDataTime, switchChartViews }: SwitchChartDataProps) => {
  return (
    <div className='switchChartData container'>
        <div className="switchChartDataItems">
            <button onClick={() => switchChartViews(0, 'h')} 
            className={`24h 
            ${currentChartDataTime === 0 
            ? 'active' : 'notActive'}`}>
                24H
            </button>

            <button onClick={() => switchChartViews(1, 'd')} className={`7d 
            ${currentChartDataTime === 1 
            ? 'active' 
            : 'notActive'}`}>
                7D
            </button>

            <button onClick={() => switchChartViews(2, 'd')} className={`30d 
            ${currentChartDataTime === 2 
            ? 'active' 
            : 'notActive'}`}>
                30D
            </button>

            <button onClick={() => switchChartViews(3, 'd')} className={`3m 
            ${currentChartDataTime === 3 
            ? 'active' 
            : 'notActive'}`}
            >
                3M
            </button>

            <button onClick={() => switchChartViews(4, 'd')} className={`1y 
            ${currentChartDataTime === 4 
            ? 'active' 
            : 'notActive'}`}>
                1Y
            </button>
        </div>
    </div>
  )
}

export default SwitchChartData