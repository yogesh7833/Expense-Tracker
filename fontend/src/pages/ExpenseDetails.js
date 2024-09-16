import React from 'react'

const ExpenseDetails = ({incomeAmt,expenseAmt}) => {
  return (
    <div>
        <div className='your-balance'>
            <span >Your Balance is</span> {incomeAmt-expenseAmt}
        </div>
        <div className='amounts-container'>
            Income 
            <span className='income-amount'>{incomeAmt}</span>
            Expense
            <span className='expense-amount'>{expenseAmt}</span>
        </div>
    </div>
  )
}

export default ExpenseDetails