import express from 'express';
import productRouter from './routers/products.js';
import cartRouter from './routers/cart.js';

import __dirname from './utils.js';
import { Server} from 'socket.io';

import viewRouter from './routers/views.router.js';
import realtimeProdRouter from './routers/realTimePro.js';
import ProductManager from './controller/productManager.js';

const manager = new ProductManager()

import handlebars from 'express-handlebars';

const app = express();
const port = 8080

const serverHttp = app.listen(port, ()=>{
    console.log(`Server Up ${port}`)
})

const socketServer = new Server(serverHttp)

app.use(express.json())

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/home', viewRouter)
app.use('/realtimeproducts', realtimeProdRouter)



app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.static( __dirname + '/public'))

socketServer.on('connection', (socket) => {
    console.log(`Cliente ${socket.id} conectado`)
    socket.on('newProduct', (data)=>{
        console.log(`Producto: ${data.title} nuevo`);
        manager.addProduct(data);
        socketServer.emit('getAllProducts', manager.getProduct())
    })
    socket.on('deleteProduct',(id)=>{
        manager.deleteProduct(id)
        socketServer.emit('getAllProducts', manager.getProduct())
    })
    socketServer.emit('getAllProducts', manager.getProduct())
})


/* const serverHttp = app.listen(port, ()=>{
    console.log(`Server Up ${port}`)
})

const socketServer  = new Server(serverHttp)

socketServer.on('connection', socketClient =>{
    socketClient.on('productList', pList =>{
        socketServer.emit(pList)
    })
}) */

//app.listen(port, () =>{console.log(`Server escuchando en http://localhost:${port}`)})