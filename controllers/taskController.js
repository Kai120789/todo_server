const { Tasks } = require('../models/models')
const ApiError = require('../errors/ApiErrors')

class TaskController {
    async create(req, res, next) {
        const {title, description, userId, boardId} = req.body
        try {
            const task = await Tasks.create({title, description, userId, boardId, statusId : 1})
            return res.json(task)
        } catch (error) {
            return next(ApiError.internal('failed to create new task', error))
        }
    }

    async updateTask(req, res, next) {
        const {title, description, userId, boardId, statusId} = req.body 
        const {id} = req.params
        const task = await Tasks.findOne({where: {id}})
        if (!task) {
            return next(ApiError.notFound('task not found'))
        }

        await Tasks.update({title, description, userId, boardId, statusId}, {where: {id}})
        const updTask = await Tasks.findOne({where: {id}})
        return res.json(updTask)
    }

    async getAll(req, res) {
        const tasks = await Tasks.findAll()
        return res.json(tasks)
    }

    async getOne(req, res) {
        const {id} = req.params
        const task = await Tasks.findOne({where: {id}})
        return res.json(task)
    }
    

    async delete(req, res, next) {
        const {id} = req.params
        const task = await Tasks.findOne({where: {id}})

        if (!task) {
            return next(ApiError.notFound('task not found'))
        }
        await Tasks.destroy({where: {id}})
        return res.json({message: 'task deleted successfuly'})
    }
}

module.exports = new TaskController()