
const mongoose=require ("mongoose")
const dotenv=require("dotenv")
dotenv.config()
const url=process.env.MONGO_URL

const connection = mongoose.connect(url)




const movieSchema=mongoose.Schema({

    "movie_name": {type:String,require:true},
 "genre": {type:String,require:true},
 "director": {type:String,require:true},
 "rating": {type:Number,require:true},
 "year_of_release": {type:Number,require:true}

},

{versionKey:false}
)



const movieModel=mongoose.model("movie",movieSchema)

module.exports={
    movieModel,
    connection
}