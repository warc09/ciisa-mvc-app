const express = require('express')
const ProductsController = require('./controllers/ProductsController')
const PageController = require('./controllers/PageController')
const SqlClient = require('./lib/SqlClient')

const router = express.Router()

// Database Client
const sqlClient = new SqlClient()

// Controllers
const pageController = new PageController()
const productsController = new ProductsController(sqlClient)

// Routes
router.get('/', productsController.renderHomeWithProducts)
router.get('/about', pageController.renderAbout)

router.get('/products/create', productsController.renderProductCreationForm)
router.post('/products/create', productsController.insertAndRenderProduct)

router.get('/products/:id', productsController.renderSingleProduct)

router.get('/products/:id/update', productsController.renderProductUpdateForm)
router.post('/products/:id/update', productsController.updateAndRenderProduct)

router.post('/products/:id/delete', productsController.deleteProductAndRenderResponse)

router.get('*', pageController.renderNotFound)

module.exports = router
