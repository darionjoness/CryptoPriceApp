import React from 'react'

interface SwitchChartDataProps {
    currentChartDataTime: number
    show24Hour: React.MouseEventHandler<HTMLButtonElement>
    show7Day: React.MouseEventHandler<HTMLButtonElement>
    show30Day: React.MouseEventHandler<HTMLButtonElement>
    show3Month: React.MouseEventHandler<HTMLButtonElement>
    show1Year: React.MouseEventHandler<HTMLButtonElement>
}

const SwitchChartData = ({ currentChartDataTime, show24Hour, show7Day, show30Day, show3Month, show1Year }: SwitchChartDataProps) => {
  return (
    <div className='switchChartData'>
        <div className="switchChartDataItems">
            <button onClick={show24Hour} 
            className={`24h 
            ${currentChartDataTime === 0 
            ? 'active' : 'notActive'}`}>
                24H
            </button>

            <button onClick={show7Day} className={`7d 
            ${currentChartDataTime === 1 
            ? 'active' 
            : 'notActive'}`}>
                7D
            </button>

            <button onClick={show30Day} className={`30d 
            ${currentChartDataTime === 2 
            ? 'active' 
            : 'notActive'}`}>
                30D
            </button>

            <button onClick={show3Month} className={`3m 
            ${currentChartDataTime === 3 
            ? 'active' 
            : 'notActive'}`}
            >
                3M
            </button>

            <button onClick={show1Year} className={`1y 
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