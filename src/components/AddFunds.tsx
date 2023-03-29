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
  addFundsErr: boolean
  negativeNumErr: boolean
}

const AddFunds = ({ showAddFunds, amountInput, controlAmount, completeAddFunds, nameInput, inputSet, closeAddFunds, addFundsErr, negativeNumErr }: AddFundsTypes) => {

  // Hide overflow when true
  if(showAddFunds){
    document.body.style.overflow = 'hidden'
  }else{
    document.body.style.overflow = 'auto'
  }
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
        {addFundsErr ? <p className='addFundsErr'>Please fill in both inputs!</p> : ''}
        {negativeNumErr ? <p className='negNumErr'>Please type in a positive number</p> : ''}
        <div className="confirmAddFundsBtn">
          <button onClick={completeAddFunds}>Add Funds</button>
        </div>
      </div>}
    </div>
  )
}

export default AddFunds
