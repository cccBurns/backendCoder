import { Router } from "express";
import ProductManager from "../controller/productManager.js";

const productManager = new ProductManager('./product.json')

const router = Router();

//OBTENER PRODUCTOS  
router.get('/', async(req, res)=>{
    try {

        const limit = req.query.limit
        const product = productManager.getProduct();
        const limitedProduct = limit ? product.slice(0, limit) : productManager.getProduct();

        res.json(limitedProduct)

    } catch (error) {
        console.error(error)
        res.status(404).send('Error al obtener productos')
    }

})

//OBTENER 1 PRODUCTO EN PARTICULAR 
router.get('/:pid', async(req, res) =>{
    try{

        const id = parseInt(req.params.pid);
        const productId = productManager.getProductById(id)
        if(!productId) {
            res.status(501).send(`No se encontro el producto con el id ${id}`)
            return;
        }

        res.json(productId)

    } catch(error) {
        console.error(error)
        res.status(501).send('Producto no encontrado')
    }
})
//UPDATE PRODUCTO  
router.post('/', async(req, res)=> {
    try{
        
        const {title, description, price, thumbnail, code, stock, category} = req.body;
        productManager.addProduct(title, description, price, thumbnail, code, stock, category);
        res.status(200).send('Agregado correctamente')
    } catch {
        res.status(404).send('Error al agregar el producto a la lista')
    }
})

router.put('/:pid', async(req, res) =>{
    try {
        const pid = parseInt(req.params.pid)
        const nuevoDato = req.body
        const product = productManager.updateProduct(pid, nuevoDato)
        res.json(product)
    } catch {
        res.status(404).send('Error')
    }

})
//DELETE PRODUCTO 
router.delete('/:id', async(req, res) => {
    try {
        const id = parseInt(req.params.id);

        const productDelete = productManager.deleteProduct(id);
        if(!productDelete){
            res.status(200).send('Eliminado correctamente')
        } else {
            res.status(404).send(`Error al eliminar el id ${id}`)
        }
        


    }catch (error) {
        console.log(error)
        res.status(501).send(`No se pudo eliminar el producto ${id} intente nuevamente `)
    }
})






export default router;

 
/* app.delete('/api/producto/:id', async(req, res) =>{
    try {
        const id = parseInt(req.params.pid)
        const product_delete = ProductManager.deleteProduct(id)
        console.log('product_delete',product_delete);
        if(!product_delete){
            res.status(404).send(`No se encuentra el producto ${id}`)
            return;
        }
        res.send(product);

    } 
    catch (error){
            console.log(error)
        res.status(501).send('No se puede acceder, intente mas tarde')
        }
}) */


/* router.get('/:pid', async(req, res)=> {
    try {
        const id = parseInt(req.params.pid)
        
        const products_update = ProductManager.updateProduct(id, updatedProduct)
        //console.log(products_update);return;
        
        res.json(products_update)

    } catch (error) {
        console.log(error)
        res.status(501).send('No fue posible actualizar los productos')
    }
}) */