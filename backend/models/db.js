const mongoose=require('mongoose');


require('dotenv').config();

exports.connect = ()=>{
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("Db connected successfully")).catch((err)=>{
    console.log('db connection issue');
    console.log(err);
    process.exit(1);
})
}

// const mongo_url=process.env.MONGO_URI;

// mongoose.connect(mongo_url).then(()=>{
//     console.log('MONGO connected');
// }).catch((err)=>{
//     console.log('mongo connection error',err);
// })