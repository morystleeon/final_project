let express = require('express')

let authController = require('../controllers/authController')
let customersController = require('../controllers/customerController')
let booksController =  require('../controllers/bookController')
let authMiddleware =  require('../middlewares/authMiddleware')

let router = express.Router()

router.post('/login',authController.login)

// Customers
router.get('/customers',authMiddleware.isAuthenticate,customersController.getCustomers)
router.get('/customers/:id',authMiddleware.isAuthenticate,customersController.getCustomersById)
router.post('/customers',customersController.createCustomers)
router.put('/customers/:id',authMiddleware.isAuthenticate,customersController.updateCustomers)
router.delete('/customers/:id',authMiddleware.isAuthenticate,customersController.deleteCustomers)

// Books
router.get('/books',authMiddleware.isAuthenticate,booksController.getBooks)
router.get('/books/:id',authMiddleware.isAuthenticate,booksController.getBooksById)
router.post('/books',booksController.createBooks)
router.put('/books/:id',authMiddleware.isAuthenticate,booksController.updateBooks)
router.delete('/books/:id',authMiddleware.isAuthenticate,booksController.deleteBooks)


module.exports = router
