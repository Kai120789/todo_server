const Router = require("express")
const router = new Router()

router.post('/') // create task
router.put('/:id') // update task
router.get('/') // get all tasks
router.get('/:id') // get task by id
router.delete('/:id') // delete task by id

router.post('/:id') // add user to board

module.exports = router