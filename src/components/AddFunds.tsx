import { set } from 'immer/dist/internal'
import React from 'react'
import { useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";

interface AddFundsTypes {
  showAddFunds: boolean
  amountInput: string
  controlAmount: any
  completeAddFunds: React.MouseEventHandler
  nameInput: string
  inputSet: React.FormEventHandler
  closeAddFunds: React.MouseEventHandler
}

const AddFunds = ({ showAddFunds, amountInput, controlAmount, completeAddFunds, nameInput, inputSet, closeAddFunds }: AddFundsTypes) => {


  return (
    <div className='addFunds'>
      {showAddFunds && <div className="addFundsItems">
        <button onClick={closeAddFunds} className='addFundsClose' ><AiOutlineClose /></button>
        <h1>Add Funds</h1>
        <div className="fundInput nameInput">
          <input type="text" placeholder='Wallet Name' value={nameInput} onChange={(e) => inputSet(e)} />
        </div>
        <div className="fundInput amountInput">
          <input value={amountInput} onChange={(e) => controlAmount(e)} type="number" placeholder='Amount' />
        </div>
        <div className="confirmAddFundsBtn">
          <button onClick={completeAddFunds}>Add Funds</button>
        </div>
      </div>}
    </div>
  )
}

export default AddFunds
