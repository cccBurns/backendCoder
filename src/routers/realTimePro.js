import { Router } from "express";
import ProductManager from "../controller/productManager.js";
const productManager = new ProductManager('./product.json')


    const products = productManager.getProduct();

const router = Router();

router.get('/', (req, res)=> {
    res.render('realTimeProducts', {products})
})


router.post('/',(req, res)=> {
    const body = req.body
        productManager.addProduct({body})
        res.render('realTimeProducts', {products})
    
})


export default router;