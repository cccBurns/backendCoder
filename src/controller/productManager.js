import fs from 'fs'


export default class ProductManager {
    constructor (path) {
        this.products = [];
        this.index = 0;
        this.path = path;
    }

    save = () =>{
        try {
        const prod = JSON.stringify(this.products,null, 2);
        fs.writeFileSync(this.path, prod)
        } catch(err) {
            console.log('Error al guardar los productos')
        }
    }

    addProduct = (title, description, price, thumbnail, code, stock , status , category)  => {
        this.index++
        const id = this.index
        const event = {id, title, description, price, thumbnail, code, stock , status , category}
        //const event2 = {'id_carrito':0 , 'productos' : [event]}
        if(!title || !description || !price || !thumbnail || !code || !stock || !status || !category ){ 
            console.log('Faltan datos por completar.')
            return;
        }
        const verifyCode = this.products.some(prod => prod.code === code)
        if(verifyCode) {
            console.error(`Ya existe un producto con el codigo: ${code}`);
            return;
        }
        
        this.products.push(event)
        this.save()
    }

    
    
    getProductById = (id) => {
        const product = this.products.find(prod => prod.id === id)
        
        if(!product){
            console.log(`No exite el producto con el id :  ${id}`)
        }

        return product;
    }

    deleteProduct = (idProduct) => {    
        console.log('idProduct',idProduct);
        const indexProduct = this.products.findIndex(prod => prod.id === idProduct);
        console.log('indexProduct1',indexProduct);

        const product = JSON.parse(fs.readFileSync(this.path))
        const productToUpdate = product.find(product => product.id === idProduct);
        console.log('productToUpdate',productToUpdate.id);

        if(productToUpdate.id == idProduct){
            console.log(indexProduct == idProduct ,idProduct );
            this.products.splice(indexProduct, idProduct);
            this.save();
            console.log(`Producto ${idProduct} eliminado correctamente`)
        } else {
            console.error(`No se encontro el producto (delete) ${idProduct}`)
            return;
        }
    }



    updateProduct(id, updatedProduct) {
        const product = JSON.parse(fs.readFileSync(this.path))
        const productToUpdate = product.find(product => product.id === id);
        if(productToUpdate){
            Object.assign(productToUpdate, updatedProduct)

            fs.writeFileSync(this.path, JSON.stringify(product), 'utf-8')
            
            console.log(`El producto ${id} se actualizo correctamente`)
        } else {console.log(`No se encontro el ${id}`)}
    }
        
    getProduct = () => {
        this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        return this.products
    }

}

const manager = new ProductManager('./product.json')
//title, description, price, thumbnail, code, stock , status , category
manager.addProduct('RTX3060', 'Placa de video para 1080p', 100000, '../thumbnail1.png', '001', '10',true,'nvidia' )
manager.addProduct('RTX3060ti', 'Placa de video para 1080p', 125000, '../thumbnail2.png', '002', '10',true,'nvidia' )
manager.addProduct('RTX3070', 'Placa de video para 1440', 200000, '../thumbnail3.png', '003', '10',true,'nvidia' )
manager.addProduct('RTX3070ti', 'Placa de video para 1440', 250000, '../thumbnail4.png', '004', '10',true,'nvidia' )
manager.addProduct('RTX3080', 'Placa de video para 4k', 300000, '../thumbnail5.png', '005', '10',true,'nvidia' )
manager.addProduct('RX6700', 'Placa de video para 1080', 150000, '../thumbnail6.png', '006', '10',true,'amd' )
manager.addProduct('RX6800', 'Placa de video para 4k', 270000, '../thumbnail7.png', '007', '10',true,'amd' )
manager.addProduct('RX6800xt', 'Placa de video para 4k', 300000, '../thumbnail8.png', '008', '10',true,'amd' )

// Producto existente 
//manager.getProductById(2)

// Producto no existente (Not found)
// manager.getProductById(3)

// Eliminar producto segun su id
//manager.deleteProduct(1)

// Actualizar el producto 
//manager.updateProduct(1, {price: 74, code:74});


