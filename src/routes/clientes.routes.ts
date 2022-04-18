import { Request, Response, NextFunction } from "express";
import { ClientesController } from "../controllers/clientes.controller";
import * as mw from './auth_mw';

export class ClientesRouter {

    public controlador: ClientesController = new ClientesController();

    public routes(app): void {
        app.route('/api/v1/clientes')
            .get(mw.jwtAdminMidleware, (req: Request, res: Response, next: NextFunction) => {
                next();
            }, mw.jwtAdminMidleware, this.controlador.getClientes)
            .post(mw.jwtAdminMidleware, this.controlador.createCliente);

        app.route('/api/v1/cliente/:id')
            .get(mw.jwtAdminMidleware, this.controlador.getCliente)
            .put(mw.jwtAdminMidleware, this.controlador.updateCliente)
            .delete(mw.jwtAdminMidleware, this.controlador.deleteCliente);

        app.route('/api/v1/clientes/paginado')
            .get(mw.jwtAdminMidleware, this.controlador.findByTxtPaginated);

    }

}
