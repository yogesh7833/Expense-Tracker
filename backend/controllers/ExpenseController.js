const UserModel = require("../models/User");



const addExpenses=async (req,res)=>{
    const body=req.body;
    const {_id}=req.user;
    try {
       const userData= await UserModel.findByIdAndUpdate(_id, {
            $push:{expenses:body}
        }, {new:true})//for returning the updated documents
        return res.status(200).json({
            message:"Expense Added successfully",
            success:true,
            data:userData?.expenses,
        })
    } catch (error) {
        return res.status(500).json({
            message:'Something went wrong',
            error:error,
            success:false,
        })
    }
}

const fetchExpenses=async (req,res)=>{
    const body=req.body;
    const {_id}=req.user;
    try {
       const userData= await UserModel.findById(_id).select('expenses');//for returning the updated documents
        return res.status(200).json({
            message:"fetcheed expenses  successfully",
            success:true,
            data:userData?.expenses,
        })
    } catch (error) {
        return res.status(500).json({
            message:'Something went wrong',
            error:error,
            success:false,
        })
    }
}

const deleteExpenses=async (req,res)=>{
    const {_id}=req.user;
    const {expenseId}=req.params;
    try {
       const userData= await UserModel.findByIdAndUpdate(_id, {
            $pull:{expenses:{_id:expenseId}}
        }, {new:true})//for returning the updated documents
        return res.status(200).json({
            message:"Expense deleted successfully",
            success:true,
            data:userData?.expenses,
        })
    } catch (error) {
        return res.status(500).json({
            message:'Something went wrong',
            error:error,
            success:false,
        })
    }
}

module.exports={
    addExpenses,
    fetchExpenses,
    deleteExpenses,
}