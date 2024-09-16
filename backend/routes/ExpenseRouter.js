const express=require('express');
const { fetchExpenses, addExpenses, deleteExpenses } = require('../controllers/ExpenseController');

const router=express.Router();

//fetch all expenses of user based on user _id
router.get('/', fetchExpenses)

//add expense 
router.post('/', addExpenses);
//delete expenses
router.delete('/:expenseId', deleteExpenses);


module.exports=router;