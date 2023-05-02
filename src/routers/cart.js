import CartManager from "../controller/cartManager.js";
import { Router } from "express";
const cartManager = new CartManager('./cart.json')


const router = Router();


router.post('/', (req, res)=> {
    const {products} = req.body
    cartManager.addCart(products);
    res.send('Agregado correctamente')
})


router.get('/:cid',(req, res)=> {
    const cid = parseInt(req.params.cid)
    const cart = cartManager.getCart(cid)
    if(!cart){
        res.status(404).send(`Carrito ${cid} no encontrado`)
        return
        }

    res.json(cart)


})


router.post('/:cid/product/:pid', async(req, res)=> {
    try{
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid)
        cartManager.addProductsToCart(cid, pid);
        res.status(200).send('Producto agregado correctamente')
    } catch(error) {
        console.log(error, 'Error al agregar el producto al carrito' )
        res.status(500).send('Error: No se pudo agregar el producto')
    }
})

export default router;