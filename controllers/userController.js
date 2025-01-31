const {Users} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../errors/ApiErrors')

const generateJWT = (id, login) => {
    const accessToken = jwt.sign(
        {id, login},
        process.env.SECRET_KEY,
        {expiresIn: process.env.ACCESS_TIME}
    )

    const refreshToken = jwt.sign(
        {id, login},
        process.env.SECRET_KEY,
        {expiresIn: process.env.REFRESH_TIME}
    )

    return {accessToken, refreshToken}
}

class UserController {
    async registration(req, res, next) {
        const {login, password} = req.body
        if (!login || !password) {
            return next(ApiError.badRequest('uncorret login or password'))
        }
        const candidate = await Users.findOne({where: {login}})
        if (candidate) {
            return next(ApiError.badRequest('user with this email is already exists'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await Users.create({login, password: hashPassword})
        const {accessToken, refreshToken} = generateJWT(user.id, user.login)
        
        res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 })

        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
        
        return res.json({accessToken})
    }

    async login(req, res, next) {
        const {login, password} = req.body
        const user = await Users.findOne({where: {login}})
        if (!user) {
            return next(ApiError.internal('user not found'))
        }
        const comparedPassword = bcrypt.compareSync(password, user.password)
        if (!comparedPassword) {
            return next(ApiError.internal('not valid password'))
        }
        const {accessToken, refreshToken} = generateJWT(user.id, user.login)
        
        res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 })

        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
        
        return res.json({accessToken})
    }

    async check(req, res, next) {
        const {login, password} = req.body
        const user = await Users.findOne({where: {login}})
        if (!user) {
            return next(ApiError.internal('user not found'))
        }

        const {accessToken, refreshToken} = generateJWT(user.id, user.login)
        
        res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 })

        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
        
        return res.json({accessToken})
    }

    async logout(req, res, next) {
        const {login, password} = req.body
        const user = await Users.findOne({where: {login}})
        if (!user) {
            return next(ApiError.internal('user not found'))
        }

        res.cookie('accessToken', '', { httpOnly: true, maxAge: 0 })
        res.cookie('refreshToken', '', { httpOnly: true, maxAge: 0 })

        return res.json({message: 'successfully logged out'})
    }
}

module.exports = new UserController()