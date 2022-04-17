const ProductsDAO = require('../models/dao/ProductsDAO')

class ProductsController {
  constructor (db) {
    this.productsDao = new ProductsDAO(db)
    this.renderHomeWithProducts = this.renderHomeWithProducts.bind(this)
    this.renderSingleProduct = this.renderSingleProduct.bind(this)
    this.renderProductCreationForm = this.renderProductCreationForm.bind(this)
    this.renderProductUpdateForm = this.renderProductUpdateForm.bind(this)
    this.insertAndRenderProduct = this.insertAndRenderProduct.bind(this)
    this.updateAndRenderProduct = this.updateAndRenderProduct.bind(this)
    this.deleteProductAndRenderResponse = this.deleteProductAndRenderResponse.bind(this)
  }

  async renderHomeWithProducts (req, res) {
    const products = await this.productsDao.getAll()
    res.render('home', {
      products
    })
  }

  async renderSingleProduct (req, res) {
    const id = req.params.id

    try {
      const product = await this.productsDao.getById(id)
      if (!product) {
        res.status(404).render('404')
        return
      }

      res.render('products', {
        id,
        title: product.title,
        description_product: product.description_product,
        category: product.category,
        price: product.price,
        image_product: product.image_product
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  renderProductCreationForm (req, res) {
    res.render('product-form')
  }

  async renderProductUpdateForm (req, res) {
    const id = req.params.id

    try {
      const product = await this.productsDao.getById(id)

      if (!product) {
        res.status(404).render('404')
        return
      }

      res.render('product-form', {
        id,
        title: product.title,
        description_product: product.description_product,
        category: product.category,
        price: product.price,
        image_product: product.image_product
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async insertAndRenderProduct (req, res) {
    const title = req.body.title
    const description = req.body.description_product
    const category = req.body.category
    const price = req.body.price
    const image = req.body.image_product

    const product = { title, description, category, price, image }

    try {
      const id = await this.productsDao.create(product)

      res.redirect(`/products/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async updateAndRenderProduct (req, res) {
    const id = req.params.id
    const title = req.body.title
    const description = req.body.description_product
    const category = req.body.category
    const price = req.body.price
    const image = req.body.image_product

    try {
      const product = { id, title, description, category, price, image }
      await this.productsDao.update(product)

      res.redirect(`/products/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async deleteProductAndRenderResponse (req, res) {
    const id = req.params.id

    try {
      const product = await this.productsDao.getById(id)

      if (!product) {
        res.status(404).render('404')
        return
      }

      await this.productsDao.delete(id)

      res.render('product-deleted', {
        id,
        title: product.title
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }
}

module.exports = ProductsController
