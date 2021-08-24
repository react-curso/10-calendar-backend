const { response } = require('express')
const User = require('../models/modelUsers')
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/generateJWT')

const createUser = async (req, res = response) => {

    const { email, password } = req.body

    try {

        let user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already exists'
            })
        }

        user = new User(req.body)

        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt)


        await user.save()

        const token = await generateJWT(user.id, user.name)

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Has been error'
        })

    }



}

const loginUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {


        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'User is not registered'
            })
        }

        const validPassword = bcrypt.compareSync(password, user.password)

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password is invalid'
            })
        }

        const token = await generateJWT(user.id, user.name)

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })


    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Has been error'
        })

    }


}

const renewToken = async (req, res = response) => {


    const uid = req.uid
    const name = req.name

    try {

        const token = await generateJWT(uid, name)

        res.json({
            ok: true,
            msg: 'renew Token',
            token,
            uid,
            name
        })

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'error in renew token'
        })
    }


}

module.exports = {
    createUser,
    loginUser,
    renewToken
}