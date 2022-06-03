import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { modules } from '../database/mock/constants/modules';
import { roles } from '../database/mock/constants/roles';
import { users } from '../database/mock/constants/users';
import { Modulos } from '../entities/Modulos';
import { Roles } from '../entities/Roles';
import { Usuarios } from '../entities/Usuarios';

export class MockController {
    constructor() {}

    public async mock(req: Request, res: Response) {
        try {
            console.log('EJECUTANDO MOCK \n ================ ');
            // TODO: add conditionals
            for (let i = 0; i < modules.length; i++) {
                await getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(Modulos)
                    .values(modules[i])
                    .orUpdate({
                        conflict_target: ['id'],
                        overwrite: ['modulo', 'activo'],
                    })
                    .execute();
            }

            for (let i = 0; i < roles.length; i++) {
                await getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(Roles)
                    .values(roles[i])
                    .orUpdate({
                        conflict_target: ['id'],
                        overwrite: ['role', 'descripcion', 'nivel'],
                    })
                    .execute();
            }

            for (let i = 0; i < users.length; i++) {
                await Usuarios.create(users[i] as Object).save();
            }
        } catch (error) {
            console.log('error', error);
        }
    }
}
