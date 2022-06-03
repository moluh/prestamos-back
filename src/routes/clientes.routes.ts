import { Request, Response, NextFunction } from "express";
import * as mw from "../middlewares/auth.middleware";
import { ClientesController } from "../controllers/clientes.controller";
import { ADMIN, SUPERADMIN } from "../helpers/roles";

export class ClientesRouter {

    public controlador: ClientesController = new ClientesController();

    public routes(app): void {
        app.route('/api/v1/clientes')
            .get(mw.isAllowed([SUPERADMIN]), (req: Request, res: Response, next: NextFunction) => {
                next();
            }, mw.isAllowed([SUPERADMIN]), this.controlador.getClientes)
            .post(mw.isAllowed([SUPERADMIN]), this.controlador.createCliente);

        app.route('/api/v1/cliente/:id')
            .get(mw.isAllowed([SUPERADMIN]), this.controlador.getCliente)
            .put(mw.isAllowed([SUPERADMIN]), this.controlador.updateCliente)
            .delete(mw.isAllowed([SUPERADMIN]), this.controlador.deleteCliente);

        app.route('/api/v1/clientes/paginado')
            .get(mw.isAllowed([SUPERADMIN]), this.controlador.findByTxtPaginated);

    }

}
