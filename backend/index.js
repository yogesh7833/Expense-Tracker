const express=require('express')
const app=express();
require('dotenv').config();
const bodyParser=require('body-parser')
const cors=require('cors');
const AuthRouter =require('./routes/AuthRouter')
const ProductRouter=require('./routes/ProductRouter')
const ExpenseRouter=require('./routes/ExpenseRouter');
const ensureAuthonticated = require('./middlewares/Auth');
const PORT=process.env.PORT ||8080;
// require('./models/db');
require('./models/db').connect();

app.get('/ping', (req,res)=>{
    res.send('PONG');
})
app.use(bodyParser.json());
app.use(cors())

app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);
app.use('/expenses',ensureAuthonticated,ExpenseRouter);







app.listen(PORT, ()=>{
    console.log(`Server is runnig on ${PORT}`);
})