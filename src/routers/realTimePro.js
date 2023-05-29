import { Router } from "express";
import ProductManager from "../controller/productManager.js";


const manager = new ProductManager()

const router = Router();

const products = manager.getProduct();


router.get('/', (req, res) => res.render('realTimeProducts', {products}))


export default router;