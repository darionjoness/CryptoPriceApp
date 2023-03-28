import React, { useEffect } from 'react'

interface TransactionsTypes {
    transactions: number[]
}

const Transactions = ({ transactions }: TransactionsTypes) => {


  return (
    <div className='transactions'>
        <h1 className='transactionsHeader'>Recent Transactions</h1>
        {transactions.length > 0 ? <div className="transactionsItems container">
            {/* Reverse Transaction so the most recent show first and the oldest is last */}
            {transactions.slice(0).reverse().map((item, idx) => (
                <div key={idx} className='transactionsDiv'>
                    <h1>Purchased</h1>
                    <h2>+${item}</h2>
                </div>
            ))}
        </div> : <h2 className='transactionsEmpty'>You haven't made any transactions, add funds from your Wallet!</h2>}
    </div>
  )
}

export default Transactions