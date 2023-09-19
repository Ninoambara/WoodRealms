function errorHandler (err,req,res,next){
    let status = 500
    let message = "Internal server error"

    if(err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError"){
        status = 400
        message = err.errors[0].message
    }else if (err.name === "Email is required" || err.name === "Password is required"){
        status = 400
        message = err.name
    }else if (err.name === "Invalid email/password" ){
        status = 400
        message = "Invalid email/password"
    }else if(err.name === "Produt not found"){
        status = 403
        message = "Product not found"
    }else if (err.name === "unauthenticated" || "JsonWebTokenError"){
        status = 400
        message = "Invalid Token" 
    }else if(err.name === "Unauthorized"){
        status = 401
        message = "Unauthorized"
    }
    res.status(status).json({message})
}

module.exports = errorHandler