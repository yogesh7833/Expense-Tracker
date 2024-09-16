import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import ExpensesTable from './ExpensesTable';
import ExpenseTrackerForm from './ExpenseTrackerForm';
import ExpenseDetails from './ExpenseDetails';
const Home = () => {
  const [loggedInUser,setLoggedInUser]=useState('');
  const [expenses, setExpenses]=useState([]);

  const [expenseAmt,setExpenseAmt]=useState(0);
  const [incomeAmt,setIncomeAmt]=useState(0);

   const navigate=useNavigate();

   useEffect(()=>{
    const amounts=expenses.map(item=>item.amount);
    console.log(amounts);
    const income=amounts.filter(item=>item > 0)
     .reduce((acc,item)=>(acc+=item),0);
     console.log('income:',income);
       
     const exp=amounts.filter(item=>item < 0)
     .reduce((acc,item)=>(acc+=item),0) * -1;
     console.log('exp:',exp);

     setIncomeAmt(income);
     setExpenseAmt(exp);
   },[expenses])

  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  })
  const handleLogout=(e)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User LoggedOut');
    setTimeout(()=>{
      navigate('/login');
    },1000)
  }

  const fetchExpenses= async ()=>{
    try {
      //  const url=`${APIUrl}/expenses`;
          const url='http://localhost:8080/expenses'
       const headers={
        headers:{'Authorization':localStorage.getItem('token')}
       } 
    //    const headers = {
    //     'Authorization': localStorage.getItem('token')
    // };
       const response=await fetch(url,headers);
       if(response.status===403){
        navigate('/login');
        return;
       }
       const result=await response.json();
       console.log(result.data);
       setExpenses(result.data);
       console.log(expenses);
    } catch (error) {
      handleError(error);
    }
  }
  const addExpenses= async (data)=>{
    try {
      //  const url=`${APIUrl}/expenses`;
          const url='http://localhost:8080/expenses'
       const headers={
        headers:{'Authorization':localStorage.getItem('token'),
          'Content-Type':'application/json'
        },
        method:'POST',
        body:JSON.stringify(data)
       } 
    //    const headers = {
    //     'Authorization': localStorage.getItem('token')
    // };
       const response=await fetch(url,headers);
       if(response.status===403){
        navigate('/login');
        return;
       }
       const result=await response.json();
       console.log(result.data);
       setExpenses(result.data);
       handleSuccess(result.message);
    } catch (error) {
      handleError(error);
    }
  }

  useEffect(()=>{
    fetchExpenses();
  },[])

  const handleDeleteExpense=async (expenseId)=>{
    try {
      //  const url=`${APIUrl}/expenses`;
          const url=`http://localhost:8080/expenses/${expenseId}`
       const headers={
        headers:{'Authorization':localStorage.getItem('token'),
          'Content-Type':'application/json'
        },
        method:'DELETE',
       } 
    //    const headers = {
    //     'Authorization': localStorage.getItem('token')
    // };
       const response=await fetch(url,headers);
       if(response.status===403){
        navigate('/login');
        return;
       }
       const result=await response.json();
       console.log(result.data);
       setExpenses(result.data);
    } catch (error) {
      handleError(error);
    }
  }
  return (
    <div>
      <div className='user-section'>
        <h1>Welcome {loggedInUser}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <ExpenseDetails incomeAmt={incomeAmt} expenseAmt={expenseAmt}/>
      <ExpenseTrackerForm addExpenses={addExpenses} />
      <ExpensesTable expenses={expenses} handleDeleteExpense={handleDeleteExpense}/>
      <ToastContainer/>
      </div>
    
  )
}

export default Home
