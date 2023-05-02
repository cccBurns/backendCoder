import fs from 'fs'
import ProductManager from './productManager.js'
const productManager = new ProductManager('./product.json');

const pathfile = './src/data/cart.json'


let id = 1


export default class CartManager {
    constructor(id) {
        this.cart = []
        this.index = id 
    }


    save = () => {
        try{
            const cart = JSON.stringify(this.cart, null, 2)
            fs.writeFileSync(pathfile, cart )
        } catch (error) {
            console.log(error, 'Error al guardar los productos')
        }
    }

    newId = () => {
        return id++
    }
    
    newCart = async() => {
        try{
            const data = fs.readFileSync(pathfile, 'utf-8')
            this.cart = JSON.parse(data);
            console.log('Se cargaron los carrito')
        } catch {
            console.log('Error al leer el archvio carrito')
            return; 
        }


        
        getCarts = () =>{
            const listCart = JSON.parse(fs.readFileSync(pathfile, 'utf-8'))
            return(listCart)
        }

    }
    getCart = (id) => {
        try{
            const list = fs.readFileSync(pathfile, 'utf-8');
            const carts = JSON.parse(list)
            const cart = carts.find(cart => cart.id === id);
            
            if(!cart){console.log('carrito no encontrado')}
            return cart
        } catch (error){
            console.log(error)
            console.log(`No se pudo obtener el carrito ${id}`)
        }
    }

    addCart = (product) => {
        const id = this.newId();
        const carts = {
            id,
            product,
        }
        this.cart.push(carts)
        this.save();
    }


    addProductsToCart = (idCart, products) => {
        const  cart = this.getCart(idCart)
        const prodIndex = cart.product.findIndex(prod => prod.id === products.id)
        if(prodIndex == -1) {
            cart.product.push({id: products, quantity: 1})
        } else {
            cart[prodIndex].product[prodIndex].quantity++
        }


        const existCart = JSON.parse(fs.readFileSync(pathfile, 'utf-8'));
        const cartUpdate = existCart.map(c => c.id === cart.id ? cart : c);
        fs.writeFileSync(pathfile, JSON.stringify(cartUpdate, null, '\t'));
    }



}

// const cartfile = new CartManager();
