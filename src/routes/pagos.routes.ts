import { Request, Response, NextFunction } from "express";
import { PagosController } from "../controllers/pagos.controller";
import * as mw from './auth_mw';


export class PagosRouter {

    public controlador: PagosController = new PagosController();

    public routes(app): void {
        app.route('/api/v1/pagos')
            .get((req: Request, res: Response, next: NextFunction) => {
                next();
            },mw.jwtAdminMidleware,  this.controlador.getPagos)
            .post(mw.jwtAdminMidleware,this.controlador.createPago);

        app.route('/api/v1/pago/:id')
            .get( mw.jwtAdminMidleware,this.controlador.getPago)
            .put(mw.jwtAdminMidleware,this.controlador.updatePago)
            .delete( mw.jwtAdminMidleware,this.controlador.deletePago);

        app.route('/api/v1/pagos/paginado')
            .get(mw.jwtAdminMidleware,this.controlador.findPaginated);

    }

}
