const { response } = require('express')
const jwt = require('jsonwebtoken')


const validateJWT = (req, res = response, next) => {

    // x-token 

    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'token not found'
        })
    }
    try {

        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT
        )

        req.uid = payload.uid
        req.name = payload.name


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'error in token'
        })
    } finally {

        next()

    }

}


module.exports = {
    validateJWT
}

