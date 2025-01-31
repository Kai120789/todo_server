const Router = require('express')
const router = new Router()
const boardRouter = require('./boardRouter')
const taskRouter = require('./taskRouter')
const userRouter = require('./userRouter')
const statusRouter = require('./statusRouter')

router.use('user', userRouter)
router.use('board', boardRouter)
router.use('task', taskRouter)
router.use('status', statusRouter)

module.exports = router