const router = require('express').Router()
const { CreateTask, GetAllTask, DeleteTask, UpdateTask, CompleteTask, GetCompleteTask, } = require('../controller/taskController')
const AuthMiddleware = require('../middleware/middleware')

router.post('/createtask',AuthMiddleware,CreateTask)
router.get('/alltask',AuthMiddleware,GetAllTask)
router.delete('/delete/:id',AuthMiddleware,DeleteTask)
router.put('/update/:id',AuthMiddleware,UpdateTask)
router.put('/completemarked/:id',AuthMiddleware,CompleteTask)
router.get('/getcompletetask',AuthMiddleware,GetCompleteTask)

module.exports = router