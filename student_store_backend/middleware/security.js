const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")
const { UnauthorizedError } = require("../utils/errors")



const jwtFrom = ({ headers }) => {
    if (headers?.authorization) {
        const [scheme, token] = headers.authorization.split(" ")
        if (scheme.trim() === "Bearer") {
            return token
        }
    }


    return null
}

    
//function to attach the user to the res object
const extractUserFromJwt = (req, res, next) => {
    try {
        const token = jwtFrom(req)
        if(token){
            res.locals.user = jwt.verify(token, SECRET_KEY)
        }


        return next()
    }
    catch(error) {
        return next()
    }
}


//function to verify a authed user exists
const requireAuthenticatedUser = (req, res, next) => {
    try {
        const { user } = res.locals
        if (!user?.email) {
            throw new UnauthorizedError()
        }
        return next()
    }catch (error) {
        return next(error)

    }
}


module.exports = {
    requireAuthenticatedUser,
    extractUserFromJwt,
    jwtFrom
}