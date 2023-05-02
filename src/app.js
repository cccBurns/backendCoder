import express from 'express';
import ProductManager from '../productManager';
const productManager = new ProductManager('./product.json');

const port = 8080;
const app = express();

//OBTENER PRODUCTOS
app.get('/api/products', async(req, res)=> {
    try {
        const limit = parseInt(req.query.limit)
        const products = productManager.getProduct();
        const productLimit = limit ? products.slice(0, limit) : products;
        res.json(productLimit)

    } catch (error) {
        console.log(error)
        res.status(501).send('No fue posible obtener los productos')
    }
})

//OBTENER 1 PRODUCTO EN PARTICULAR
app.get('/api/product/:pid', async(req, res) =>{
    try {
        const id = parseInt(req.params.pid)
        const product = productManager.getProductById(id)
        if(!product){
            res.status(404).send(`No se encuentra el producto ${id}`)
            return;
        }
        res.send(product);

    } 
    catch (error){
            console.log(error)
        res.status(501).send('No se puede acceder intente mas tarde')
        }
})


//DELETE PRODUCTO
app.get('/api/delete/:pid', async(req, res) =>{
    try {
        const id = parseInt(req.params.pid)
        const product_delete = productManager.deleteProduct(id)
        console.log('product_delete',product_delete);
        if(!product_delete){
            res.status(404).send(`No se encuentra el producto ${id}`)
            return;
        }
        res.send(product);

    } 
    catch (error){
            console.log(error)
        res.status(501).send('No se puede acceder intente mas tarde')
        }
})
//UPDATE PRODUCTO
app.get('/api/update/:pid', async(req, res)=> {
    try {
        const id = parseInt(req.params.pid)
        
        const products_update = productManager.updateProduct(id, updatedProduct)
        //console.log(products_update);return;
        
        res.json(products_update)

    } catch (error) {
        console.log(error)
        res.status(501).send('No fue posible actualizar los productos')
    }
})

app.listen(port, () =>{console.log(`Server escuchando en http://localhost:${port}`)})