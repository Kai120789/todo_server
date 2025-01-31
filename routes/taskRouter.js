const Router = require("express")
const router = new Router()
const taskController = require("../controllers/taskController")

router.post('/', authMiddleware, taskController.create) // create task
router.put('/:id', authMiddleware, taskController.update) // update task
router.get('/', authMiddleware, taskController.getAll) // get all tasks
router.get('/:id', authMiddleware, taskController.getOne) // get task by id
router.delete('/:id', authMiddleware, taskController.delete) // delete task by id

module.exports = router