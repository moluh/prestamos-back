import { Request, Response, NextFunction } from "express";
import { EstadisticasController } from "../controllers/estadisticas.controller";
import * as mw from "../middlewares/auth.middleware";
import { ADMIN, SUPERADMIN } from "../helpers/roles";

export class EstadisticasRouter {
  public controlador: EstadisticasController = new EstadisticasController();

  public routes(app): void {
    app
      .route("/api/v1/estadisticas/ganancias/desde/:desde/hasta/:hasta")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.getGanancias);

    app
      .route("/api/v1/estadisticas/prestamos/desde/:desde/hasta/:hasta")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.getCantPrestamos);

    app
      .route("/api/v1/estadisticas/pagos/desde/:desde/hasta/:hasta")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.getCantPagos);

    app
      .route("/api/v1/estadisticas/prestado/desde/:desde/hasta/:hasta")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.getPrestado);

    app
      .route("/api/v1/estadisticas/ingresado/desde/:desde/hasta/:hasta")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.getIngresado);
  }
}
