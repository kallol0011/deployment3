
const express = require ("express")

const { movieModel , connection } = require("./module/connect")
const validator = require("./middleware/validator")
const logger = require("./middleware/logger")
const app=express()
const dotenv=require("dotenv").config()



app.use(express.json())




app.get("/",async(req,res)=>{
    
    let data= movieModel.find()
  
    if(req.query.min && req.query.max)
    {
        data= data.where("rating").gte(req.query.min).lte(req.query.max)
    }

    if(req.query.genre)
    {
        data=data.where({genre:req.query.genre})
    }

    if(req.query.year_of_release)
    {
        data=data.where("year_of_release").gte(req.query.year_of_release)
    }

 
    try
    {
        const movies=await data.exec()
        res.send(movies)
   
    }
    catch(error)
    {
        res.send(error)
    }

})


///////// get single movie //////////

app.get("/:id",async(req,res)=>{
    try
    {
        const {id} = req.params
    const data= await movieModel.findById({_id:id})
  
    res.send(data)
   
    }

    catch(error)
   {
    res.status(400).send({err:`the error is: ${error}`})
   }

})


//////////////////  pagination //////////////////

app.get('/movies/:pagenumber', async (req, res) => {
    try{
    const pagenumber = parseInt(req.params.pagenumber);
    const pageSize = 2;
    const skip = (pagenumber - 1) * pageSize; 
  
    const movies = await movieModel.find().skip(skip).limit(pageSize);
    res.send(movies);
   }
   catch(err)
   {
    res.status(400).send({err:`the error is: ${err}`})
   }
  });


// ################ post ################

app.post("/addmovie",async(req,res)=>{

    try{
        const data=req.body;

    const movies= new movieModel(data)
    await movies.save()
   
    
    res.status(200).send({msg:"movie is added in database"})
  }
  catch(error)
   {
    res.status(400).send({err:`the error is: ${error}`})
   }
  
})


// ################# patch #################

app.patch("/:id",logger,async(req,res)=>{
     
    try{
        const {id}=req.params;
    const data=req.body;

    const movie = await movieModel.findByIdAndUpdate({_id:id},data)
   
    res.status(200).send({msg:"movie is update in database"})
   }
   catch(error)
   {
    res.status(400).send({err:`the error is: ${error}`})
   }
})


// ################# delete #################

app.delete("/:id",logger,async(req,res)=>{
     
    try{
        const {id}=req.params;
    

    const movie = await movieModel.findByIdAndDelete(id)
   
    res.status(200).send({msg:"movie is delete successfully"})
    }
    catch(error)
    {
    res.status(400).send({err:`the error is: ${error}`})
}
        
    
})




const port=process.env.PORT 

app.listen(port,async()=>{

    try{
         await connection

    }
    catch(error)
    {
        console.log(error)
    }
    console.log(`server is runing ${port} `)
})
