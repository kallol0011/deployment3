
const fs=require("fs")

function logger(req,res,next){

const {id}=req.params

const method=req.method;
const list=new Date()


const day=["sun","mon","tue","wed","thr","fri","sut"]

const months=["jan","feb","march","apr","may","jun","jul","aug","sep","oct","nov","dec"]

const date=`The Movie with id:${id} has been ${method === "PATCH" ? "updated" : "deleted" } | ${day[list.getDay()]} ${months[list.getMonth()]} ${list.getDate()} ${list.getFullYear()} ${list.getHours()}:${list.getMinutes()} ${list.getSeconds()} GMT+0530 (India Standard Time). \n`

fs.appendFileSync("./records.txt",date)

next();
 
}

module.exports=logger;


// The Movie with id:63baae803240a41c75a4cb72 has been updated | Sat Feb 11 2023 01:10:56 GMT+0530 (India Standard Time).