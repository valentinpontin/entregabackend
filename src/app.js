import express from 'express';
import __dirname from './utils.js'
import handlebars from 'express-handlebars';
import path from 'path';
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io';
import { productsUpdated } from './socketUtils.js';

//Express config
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));

//Handlebars config
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/files', express.static(path.join(__dirname, 'public')));

//Routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

const port = 8080;
const serverHttp = app.listen(port, () => console.log(`Flowery Backend server is now up on port ${port}`));

//Socket.io config: link http server to socket.io server
const io = new Server(serverHttp);

app.set('io', io);

io.on('connection', socket => {
    console.log('New client connected', socket.id);
    productsUpdated(io);
});