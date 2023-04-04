class ProductManager {
    #products
    constructor() {
        this.#products = []
        
    }
    

    #generateID = () => {
        if (this.#products.length === 0) return 1
        return this.#products[this.#products.length-1].id + 1
    }

    getProducts = () => {
        return this.#products
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        
        const id = this.#generateID()
        const product = {id, title, description, price, thumbnail, code, stock}
            if (!title || !description || !price || !thumbnail || !code || !stock)
                return console.log("Faltan datos")

        this.#products.push(product)
    }

    getProductById(id){
        const lista_productos = this.getProducts()

        lista_productos.forEach(producto => {
            if (id != producto.id) {
                return console.log("Not found")
                
            }else{
                return console.log("ASA")
            }
        });
    }
}

const manager = new ProductManager()
manager.addProduct("RTX3060", "placa de video de 12g de Vram", 150000, "https://app.contabilium.com/files/explorer/7026/Productos-Servicios/concepto-4815908.jpg", 001, 5 )
manager.addProduct("RTX3070", "placa de video de 8g de Vram", 250000, "https://app.contabilium.com/files/explorer/7026/Productos-Servicios/concepto-4815908.jpg", 002, 5)
manager.addProduct("RTX3080", "placa de video de 10g de Vram", 350000, "https://app.contabilium.com/files/explorer/7026/Productos-Servicios/concepto-4815908.jpg", 003, 5)
manager.getProducts()
console.log(manager.getProducts())
console.log(manager.getProductById(2))