import Koa from 'koa'
import handlebars from 'koa-handlebars'
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js';
import userRouter from './routes/user.route.js';
import otherRouter from './routes/other.route.js';
import session from 'koa-session';
import bodyParser from "koa-bodyparser";
import serve from "koa-static";
import qs from "koa-qs"
import path from 'path';
import {fileURLToPath} from 'url';
import mongoStore from 'connect-mongo';
import compression from 'compression';
import minimist from 'minimist';
import logger from "./utils/loggers/Log4jsLogger.js";
import loggerMiddleware from "./middlewares/routesLogger.middleware.js";
import handlebarsEngine from  "koa-hbs-renderer";

const app = new Koa();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(loggerMiddleware);
app.use(serve('public'));
app.use(compression());
app.context.views ='views', './src/views';
app.context.views ='view engine', 'hbs';

app.engine('hbs', handlebarsEngine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

app.use(
    session({
        store: mongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            options: {
                userNewParser: true,
                useUnifiedTopology: true,
            }
        }),
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {maxAge: 600000} //10 min.
        
}))

app.use(bodyParser());
qs(app);

app.use('/api/productos', productRouter);
app.use('/api/carrito', cartRouter);
app.use('/api/usuario', userRouter);
app.use('/test', otherRouter);


app.all("*", (ctx) => {
    ctx.status(404).json({"error": "ruta no existente"})
  });

/* --------------- Leer el puerto por consola o setear default -------------- */

const options = {
    alias: {
        "p": "PORT"
    },
    default: {
        "PORT": 8080
    }
};

app._router.stack.forEach(function (r) {
    if (r.route && r.route.path) {
      console.log(r.route.path)
    }
  });

const { PORT } = minimist(process.argv.slice(2), options);

const server = app.listen(PORT, () => {
    logger.info(`🚀 Server started at http://localhost:${PORT}`)
    })
    
server.on('error', (err) => logger.error(err));

