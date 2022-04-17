class ProductsDAO {
  constructor (dbClient) {
    this.db = dbClient
    this.getAll = this.getAll.bind(this)
    this.getById = this.getById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getAll () {
    const response = await this.db.query('SELECT id, title, description_product, category, price, image_product FROM products')
    const rows = response[0]
    return rows
  }

  async getById (id) {
    const response = await this.db.query('SELECT id, title, description_product, category, price, image_product FROM products WHERE id = ?', [id])
    const rows = response[0]
    return rows[0]
  }

  async create (product) {
    const response = await this.db.query('INSERT INTO products (title, description_product, category, price, image_product) VALUES (?, ?, ?, ?, ?)', [product.title, product.description, product.category, product.price, product.image])
    const result = response[0]
    return result.insertId
  }

  async update (product) {
    const response = await this.db.query('UPDATE products SET title = ?, description_product = ?, category = ?, price = ?, image_product = ? WHERE id = ?', [product.title, product.description, product.category, product.price, product.image, product.id])
    const result = response[0]
    return result
  }

  async delete (id) {
    const response = await this.db.query('DELETE FROM products WHERE id = ?', [id])
    const result = response[0]
    return result
  }
}

module.exports = ProductsDAO
