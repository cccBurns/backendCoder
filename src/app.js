import express from 'express';
import productRouter from './routers/products';
import cartRouter from './routers/cart.js'
import ProductManager from './controller/productManager';
const productManager = new ProductManager('./product.json');

const port = 8080;
const app = express();

app.use(express.json())
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/home', viewRouter)
app.use('/realtimeproducts', realtimeProdRouter)



app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')



const serverHttp = app.listen(port, ()=>{
    console.log(`Server Up ${port}`)
})


socketServer.on('connection', socketClient =>{
    socketClient.on('productList', pList =>{
        socketServer.emit(pList)
    })
})

//app.listen(port, () =>{console.log(`Server escuchando en http://localhost:${port}`)})