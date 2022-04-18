import { Usuarios } from '../Entities/usuarios';
import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

export class UsuariosController {

    constructor() {
    }

    public async getUsuarios(req: Request, res: Response) {
        await Usuarios.find({
            order: { username: "ASC" }
        })
            .then(usuario => { res.json(usuario) })
            .catch(err => { res.json(err.message); })
    }

    public async getUsuario(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        await Usuarios.findOne(
            { id } as FindOneOptions<Usuarios>
        )
            .then(usuario => { res.json(usuario) })
            .catch(err => { res.json(err.message); })
    }

    public async createUsuario(req: Request, res: Response) {
        let usuario: Usuarios = new Usuarios();
        usuario.username = req.body.username;
        usuario.password = bcrypt.hashSync(req.body.password, 10);
        usuario.rol = req.body.rol;

        usuario.save()
            .then(u => {
                res.json(u);
            }).catch(err => {
                res.json(err);
            });
    };

    public async updateUsuario(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Usuarios.findOne({ id } as FindOneOptions<Usuarios>)
            .then(async (usuario: Usuarios) => {
                console.log('usuario', usuario);
                usuario.username = req.body.username;
                usuario.password = req.body.password;
                usuario.rol = req.body.rol;
                usuario.save()
                    .then(u => {
                        res.json(u);
                    })
                    .catch(err => {
                        res.json(err);
                    });
            })
            .catch(err => res.json({ message: 'No se encontró el usuario' }))
    }

    public deleteUsuario(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Usuarios.findOne({ id } as FindOneOptions<Usuarios>)
            .then(usuario => {
                usuario.remove()
                    .then(u => {
                        res.json(u)
                    })
                    .catch(err => {
                        res.send(err)
                    });
            })
            .catch(err => { res.json(err.message); });
    };


}