import { Request, Response, NextFunction } from "express";
import { PagosController } from "../controllers/pagos.controller";
import * as mw from "../middlewares/auth.middleware";
import { ADMIN, SUPERADMIN } from "../helpers/roles";

export class PagosRouter {
  public controlador: PagosController = new PagosController();

  public routes(app): void {
    app
      .route("/api/v1/pagos")
      .get(
        (req: Request, res: Response, next: NextFunction) => {
          next();
        },
        mw.isAllowed([SUPERADMIN]),
        this.controlador.getPagos
      )
      .post(mw.isAllowed([SUPERADMIN]), this.controlador.createPago);

    app
      .route("/api/v1/pago/:id")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.getPago)
      .put(mw.isAllowed([SUPERADMIN]), this.controlador.updatePago)
      .delete(mw.isAllowed([SUPERADMIN]), this.controlador.deletePago);

    app
      .route("/api/v1/pagos/paginado")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.findPaginated);
  }
}
