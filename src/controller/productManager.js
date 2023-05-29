import fs from 'fs'
import __dirname from '../utils.js';
import path from 'path';


const dataJson =path.join( __dirname + '/data/product.json')




export default class ProductManager {
    constructor () {

        this.products = [];
        this.index = 1;
        this.path = dataJson;
    }

    save = () =>{
        try {
        const prod = JSON.stringify(this.products,null, 2);
        fs.writeFileSync(this.path, prod)
        } catch(err) {
            console.log('Error al guardar los productos')
        }
    }
    

    idGenerate = () =>{
        if (this.products.length === 0) return 1
        return this.products[this.products.length-1].id + 1 
    }


    addProduct = (product)=>{
        const id = this.idGenerate();
        const requiredField = ["title", "description", "price", 'code', 'stock'];

        const verifyField = requiredField.some(((field) => !product[field]))


        if (verifyField){
            console.log('Debes completar todos los campos')
            return false
        }
        const verifyCode = this.products.some(prod => prod.code == product.code)
        if (verifyCode){
            console.log(`Ya existe un producto con el codigo ${product.code}`)
            return false
            
        }
        const newProduct = {id, ...product};
        this.products.push(newProduct)
        this.save();
        console.log('Agregado correctamente')

    }

    
    
    getProductById = (id) => {
        const product = this.products.find(prod => prod.id === id)

        if(!product){
            console.log(`No se encontro el producto ${id}`)
        }

        return product;
    }

    deleteProduct = (idProduct) => {    
        const indexProduct = this.products.findIndex(prod => prod.id === idProduct);
        if(indexProduct !== -1){
            this.products.splice(indexProduct, 1);
            this.save();
            console.log(`Eliminado el producto ${idProduct} correctamente`)
        } else {
            console.log(`El no existe ese producto con el id ${idProduct}`)
            return;
        }
    }


    updateProduct(id, updateProduct){
    let list = this.getProduct();
    let prodIndex = -1
    for( let i = 0; i < list.length; i++){
        if (list[i].id == id){
            prodIndex = i
            break;
        }
    }

    prodIndex == -1 
    ? console.log(`No se encuentra el producto ${id}`) 
    : Object.assign({}, list[updateProduct]);
        Object.assign(list[prodIndex], updateProduct);
        this.save();
        console.log('producto actualizado correctamente')

}


    getProduct = () => {
        this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        return this.products
    }

    


}

const manager = new ProductManager()

//title, description, price, thumbnail, code, stock , status , category
//manager.addProduct('RTX3060', 'Placa de video para 1080p', 100000, '../thumbnail1.png', '001', '10',true,'nvidia' )
//manager.addProduct('RTX3060ti', 'Placa de video para 1080p', 125000, '../thumbnail2.png', '002', '10',true,'nvidia' )
//manager.addProduct('RTX3070', 'Placa de video para 1440', 200000, '../thumbnail3.png', '003', '10',true,'nvidia' )
//manager.addProduct('RTX3070ti', 'Placa de video para 1440', 250000, '../thumbnail4.png', '004', '10',true,'nvidia' )
//manager.addProduct('RTX3080', 'Placa de video para 4k', 300000, '../thumbnail5.png', '005', '10',true,'nvidia' )
//manager.addProduct('RX6700', 'Placa de video para 1080', 150000, '../thumbnail6.png', '006', '10',true,'amd' )
//manager.addProduct('RX6800', 'Placa de video para 4k', 270000, '../thumbnail7.png', '007', '10',true,'amd' )
//manager.addProduct('RX6800xt', 'Placa de video para 4k', 300000, '../thumbnail8.png', '008', '10',true,'amd' )

// Producto existente 
//manager.getProductById(2)

// Producto no existente (Not found)
// manager.getProductById(3)

// Eliminar producto segun su id
//manager.deleteProduct(1)

// Actualizar el producto 
//manager.updateProduct(1, {price: 74, code:74});


