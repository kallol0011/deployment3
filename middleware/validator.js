function validator(req,res,next){


    if(req.body.movie_name && req.body.genre && req.body.director && req.body.rating && req.body.year_of_release)
    {
        next()
    }
    else
    {
        res.send({err: "Few fields are missing, cannot process the request"})
    }


}

module.exports=validator

