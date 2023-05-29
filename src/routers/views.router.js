import { Router } from "express";
import ProductManager from "../controller/productManager.js";
const productManager = new ProductManager()

const router = Router();


const products = productManager.getProduct();

router.get('/', (req, res)=> {
    res.render('home', {products})
})

export default router;