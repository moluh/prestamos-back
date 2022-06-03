import { Usuarios } from '../entities/usuarios.entity';
import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { AppDataSource } from '../data.source';
import { ApiResponse } from '../api/response';

export class UsuariosController {
    constructor() {}

    public async getAll(req: Request, res: Response) {
        await AppDataSource.manager
            .find(Usuarios, {
                order: { nombre: 'ASC' },
            })
            .then((data) => ApiResponse({ res, data }))
            .catch((error) => ApiResponse({ res, error }));
    }

    public async get(req: Request, res: Response) {
        let id: number = parseInt(req.params.id);
        const resp = await AppDataSource.manager.findOne(Usuarios, {
            where: id,
        } as FindOneOptions<Usuarios>);
        res.json(resp);
    }

    public async create(req: Request, res: Response) {
        let usuario: Usuarios = new Usuarios();
        usuario = { ...req.body };
        usuario.password = bcrypt.hashSync(req.body.password, 10);
        usuario.created_at = new Date();
        usuario.updated_at = new Date();

        try {
            const u = await AppDataSource.manager.findOne(Usuarios, {
                where: { telefono: usuario.telefono },
            } as FindOneOptions<Usuarios>);
            if (u)
                return res.json(
                    'El número de teléfono ya se encuentra registrado.',
                );

            const resp = await AppDataSource.manager.save(Usuarios, usuario);
            return res.json(resp);
        } catch (e) {
            return res.json(e);
        }
    }

    public async update(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Usuarios.findOne({ id } as FindOneOptions<Usuarios>)
            .then(async (usuario: Usuarios) => {
                usuario.username = req.body.username;
                usuario.password = req.body.password;
                usuario.roles = req.body.roles;
                usuario
                    .save()
                    .then((data) => ApiResponse({ res, data }))
                    .catch((error) => ApiResponse({ res, error }));
            })
            .catch((error) => ApiResponse({ res, error }));
    }

    public delete(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Usuarios.findOne({ id } as FindOneOptions<Usuarios>)
            .then((usuario) => {
                usuario
                    .remove()
                    .then((data) => ApiResponse({ res, data }))
                    .catch((error) => ApiResponse({ res, error }));
            })
            .catch((error) => ApiResponse({ res, error }));
    }
}
