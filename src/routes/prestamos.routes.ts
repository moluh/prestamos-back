import { Request, Response, NextFunction } from "express";
import { PrestamosController } from "../controllers/prestamos.controller";
import * as mw from "../middlewares/auth.middleware";
import { ADMIN, SUPERADMIN } from "../helpers/roles";

export class PrestamosRouter {
  public controlador: PrestamosController = new PrestamosController();

  public routes(app): void {
    app
      .route("/api/v1/prestamos")
      .get(
        (req: Request, res: Response, next: NextFunction) => {
          next();
        },
        mw.isAllowed([SUPERADMIN]),
        this.controlador.getPrestamos
      )
      .post(mw.isAllowed([SUPERADMIN]), this.controlador.createPrestamo);

    app
      .route("/api/v1/prestamo/:id")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.getPrestamo)
      .put(mw.isAllowed([SUPERADMIN]), this.controlador.updatePrestamo)
      .delete(mw.isAllowed([SUPERADMIN]), this.controlador.deletePrestamo);

    app
      .route("/api/v1/prestamos/cliente/:id")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.getPrestamoByIdCliente);

    app
      .route("/api/v1/prestamos/paginado")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.findPaginaByEstado);
  }
}
