import { Request, Response, NextFunction } from "express";
import { PrestamosController } from "../controllers/prestamos.controller";
import * as mw from './auth_mw';


export class PrestamosRouter {

    public controlador: PrestamosController = new PrestamosController();

    public routes(app): void {
        app.route('/api/v1/prestamos')
            .get((req: Request, res: Response, next: NextFunction) => {
                next();
            }, mw.jwtAdminMidleware,this.controlador.getPrestamos)
            .post(mw.jwtAdminMidleware,this.controlador.createPrestamo);

        app.route('/api/v1/prestamo/:id')
            .get(mw.jwtAdminMidleware,this.controlador.getPrestamo)
            .put(mw.jwtAdminMidleware,this.controlador.updatePrestamo)
            .delete(mw.jwtAdminMidleware,this.controlador.deletePrestamo);

        app.route('/api/v1/prestamos/cliente/:id')
            .get(mw.jwtAdminMidleware,this.controlador.getPrestamoByIdCliente)
            
        app.route('/api/v1/prestamos/paginado')
            .get(mw.jwtAdminMidleware,this.controlador.findPaginaByEstado);

    }

}
