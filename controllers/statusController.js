const {Statuses} = require('../models/models')
const ApiError = require('../errors/ApiErrors')

class StatusCollector {
    async create(req, res, next) {
        const {status} = req.body
        try {
            const newStatus = await Statuses.create({status})
            return res.json(newStatus)
        } catch (error) {
            return next(ApiError.internal('failed to create new status', error))
        }
    }
    

    async delete(req, res, next) {
        const {id} = req.params
        const status = await Statuses.findOne({where: {id}})

        if (!status) {
            return next(ApiError.notFound('status not found'))
        }
        await Statuses.destroy({where: {id}})
        return res.json({message: 'status deleted successfuly'})
    }   
}

module.exports = new StatusCollector()