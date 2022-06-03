import { Request, Response, NextFunction } from "express";
import * as mw from "../middlewares/auth.middleware";
import { UsuariosController } from "../controllers/usuarios.controller";
import { SUPERADMIN } from "../helpers/roles";

export class UsuariosRouter {
  public controlador: UsuariosController = new UsuariosController();

  public routes(app): void {
    app
      .route("/api/v1/usuarios")
      .get(
        (req: Request, res: Response, next: NextFunction) => {
          next();
        },
        mw.isAllowed([SUPERADMIN]),
        this.controlador.getAll
      )
      .post(mw.isAllowed([SUPERADMIN]), this.controlador.create);

    app
      .route("/api/v1/usuario/:id")
      .get(mw.isAllowed([SUPERADMIN]), this.controlador.get)
      .put(mw.isAllowed([SUPERADMIN]), this.controlador.update)
      .delete(mw.isAllowed([SUPERADMIN]), this.controlador.delete);
  }
}
