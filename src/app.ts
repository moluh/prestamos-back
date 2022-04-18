import * as dotenv from 'dotenv';
import { Config } from './config/config'
const config: Config = new Config();
// DotEnv: carga variables de entorno de un archivo .env en process.env.
const result = dotenv.config();
console.log('DotEnv:', result);
if (result.error) { throw result.error; }

import { createConnection, Connection } from 'typeorm';
import compression from 'compression';
import helmet from 'helmet';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as http from 'http';

// Routes
import { ClientesRouter } from './routes/clientes.routes';
import { UsuariosRouter } from './routes/usuarios.routes';
import { PrestamosRouter } from './routes/prestamos.routes';
import { PagosRouter } from './routes/pagos.routes';
import { LoginRoutes } from './routes/login.routes';
import { EstadisticasRouter } from './routes/estadisticas.routes';

class App {

    private logger = require('morgan');     // Registro de cada petición
    public app: express.Application;
    public conection: Connection;
    public server: http.Server;

    public routeClientes: ClientesRouter = new ClientesRouter();
    public routeUsuarios: UsuariosRouter = new UsuariosRouter();
    public routePrestamos: PrestamosRouter = new PrestamosRouter();
    public routePagos: PagosRouter = new PagosRouter();
    public routeLogin: LoginRoutes = new LoginRoutes();
    public routeEst: EstadisticasRouter = new EstadisticasRouter();


    constructor() {
        console.log('Iniciando Servidor');
        this.app = express();

        createConnection()
            .then(async connection => {
                this.conection = connection;
                console.log('Base de datos Ecommerce:', connection.isConnected);
            })
            .catch(error => console.log(error));

        this.config();

        //Definimos todas las rutas
        this.routeClientes.routes(this.app);
        this.routePagos.routes(this.app);
        this.routePrestamos.routes(this.app);
        this.routeLogin.routes(this.app);
        this.routeUsuarios.routes(this.app);
        this.routeEst.routes(this.app);
    }

    private config(): void {
        this.app.use(this.logger('dev'));

        // bodyParser: Analiza los cuerpos de solicitud entrantes en un middleware antes de sus 
        // manejadores, disponibles bajo la propiedad req.body.
        this.app.use(bodyParser.json({ type: 'application/json' }));
        this.app.use(bodyParser.urlencoded({ 'extended': false }));

        // Habilitar cors:
        this.app.use(cors());

        // Habilitar carpeta public:
        this.app.use('/static', express.static(__dirname + '/public'));

        // Este middleware intentará comprimir los cuerpos de respuesta para todas las solicitudes que lo atraviesen:
        this.app.use(compression());
        // ayuda a proteger aplicaciones Express configurando varios encabezados HTTP:
        this.app.use(helmet());

        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
            next();
        });

        this.app.listen(config.port(), () => console.log(`App escuchando en puerto: ${config.port()}`));
    }

}
export default new App().app;