import { Pagos } from '../entities/pagos';
import { Prestamos } from '../entities/prestamos';
import { Request, Response, NextFunction } from 'express';

export class EstadisticasController {

    constructor() {
    }

    public async getGanancias(req: Request, res: Response) {
        const desde: string = req.params.desde;
        const hasta: string = req.params.hasta;

        let est = await Pagos.createQueryBuilder('pagos')
            .select("SUM(ganancia)", "suma")
            .where(`pagos.fecha_hora >= :desde`, { desde })
            .andWhere(`pagos.fecha_hora <= :hasta`, { hasta })
            .getRawOne();
        res.send(est);
    }

    public async getCantPrestamos(req: Request, res: Response) {
        const desde: string = req.params.desde;
        const hasta: string = req.params.hasta;

        let est = await Prestamos.createQueryBuilder('prestamos')
            .select("COUNT(*)", "count")
            .where(`prestamos.fecha_hora >= :desde`, { desde })
            .andWhere(`prestamos.fecha_hora <= :hasta`, { hasta })
            .getRawOne();
        res.send(est);
    }

    public async getCantPagos(req: Request, res: Response) {
        const desde: string = req.params.desde;
        const hasta: string = req.params.hasta;

        let est = await Pagos.createQueryBuilder('pagos')
            .select("COUNT(*)", "count")
            .where(`pagos.fecha_hora >= :desde`, { desde })
            .andWhere(`pagos.fecha_hora <= :hasta`, { hasta })
            .getRawOne();
        res.send(est);
    }


    public async getPrestado(req: Request, res: Response) {
        const desde: string = req.params.desde;
        const hasta: string = req.params.hasta;

        let est = await Prestamos.createQueryBuilder('prestamos')
            .select("SUM(monto)", "suma")
            .where(`prestamos.fecha_hora >= :desde`, { desde })
            .andWhere(`prestamos.fecha_hora <= :hasta`, { hasta })
            .getRawOne();
        res.send(est);
    }

    public async getIngresado(req: Request, res: Response) {
        const desde: string = req.params.desde;
        const hasta: string = req.params.hasta;

        let est = await Pagos.createQueryBuilder('pagos')
            .select("SUM(monto)", "suma")
            .where(`pagos.fecha_hora >= :desde`, { desde })
            .andWhere(`pagos.fecha_hora <= :hasta`, { hasta })
            .getRawOne();
        res.send(est);
    }
}