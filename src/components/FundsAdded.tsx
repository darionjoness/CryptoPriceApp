import React from 'react'

interface FundsAddedTypes {
    closeFundsAdded: React.MouseEventHandler
}

const FundsAdded = ({ closeFundsAdded }: FundsAddedTypes) => {
  return (
    <div className='fundsAdded'>
        <div className="fundsAddedItems">
            <h1>Funds Added!</h1>
            <button onClick={closeFundsAdded}>Close</button>
            <p>Funds can't be spent, they are just for show</p>
        </div>
    </div>
  )
}

export default FundsAdded