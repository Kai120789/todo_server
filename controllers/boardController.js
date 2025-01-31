const {Boards, BoardsUsers} = require('../models/models')
const ApiError = require('../errors/ApiErrors')

class BoardsController {
    async create(req, res, next) {
        const {name} = req.body
        try {
            const board = await Boards.create({name})
            return res.json(board)
        } catch (error) {
            return next(ApiError.internal('failed to create new board', error))
        }
    }

    async update(req, res, next) {
        const {name} = req.body 
        const {id} = req.params
        const board = await Boards.findOne({where: {id}})
        if (!board) {
            return next(ApiError.notFound('board not found'))
        }

        await Boards.update({name}, {where: {id}})
        const updBoard = await Boards.findOne({where: {id}})
        return res.json(updBoard)
    }

    async getAll(req, res) {
        const boards = await Boards.findAll()
        return res.json(boards)
    }

    async getOne(req, res) {
        const {id} = req.params
        const board = await Boards.findOne({where: {id}})
        return res.json(board)
    }
    

    async delete(req, res, next) {
        const {id} = req.params
        const board = await Boards.findOne({where: {id}})

        if (!board) {
            return next(ApiError.notFound('board not found'))
        }
        await Boards.destroy({where: {id}})
        return res.json({message: 'board deleted successfuly'})
    }

    async addUserToBoard(req, res, next) {
        const {boardId} = req.params
        const {userId} = req.body
        const board2user = await BoardsUsers.create({boardId, userId})
        return res.json(board2user)
    }
}

module.exports = new BoardsController()