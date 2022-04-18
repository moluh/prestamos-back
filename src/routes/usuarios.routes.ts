import { Request, Response, NextFunction } from "express";
import { UsuariosController } from "../controllers/usuarios.controller";
import * as mw from './auth_mw';


export class UsuariosRouter {

    public controlador: UsuariosController = new UsuariosController();

    public routes(app): void {
        app.route('/api/v1/usuarios')
            .get((req: Request, res: Response, next: NextFunction) => {
                next();
            }, mw.jwtAdminMidleware, this.controlador.getUsuarios)
            .post(mw.jwtAdminMidleware, this.controlador.createUsuario);

        app.route('/api/v1/usuario/:id')
            .get(mw.jwtAdminMidleware, this.controlador.getUsuario)
            .put(mw.jwtAdminMidleware, this.controlador.updateUsuario)
            .delete(mw.jwtAdminMidleware, this.controlador.deleteUsuario);

    }

}
