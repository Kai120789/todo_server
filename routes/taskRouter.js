const Router = require("express")
const router = new Router()
const taskController = require("../controllers/taskController")

router.post('/', taskController.create) // create task
router.put('/:id', taskController.update) // update task
router.get('/', taskController.getAll) // get all tasks
router.get('/:id', taskController.getOne) // get task by id
router.delete('/:id', taskController.delete) // delete task by id

module.exports = router