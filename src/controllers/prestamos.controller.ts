import { Prestamos } from '../entities/prestamos';
import { Request, Response, NextFunction } from 'express';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

export class PrestamosController {

    constructor() {
    }

    public async getPrestamos(req: Request, res: Response) {
        await Prestamos.find({
            // order: { fecha_hora: "ASC" },
            relations: ['clienteId', 'pagos']
        })
            .then(prestamo => { res.json(prestamo) })
            .catch(err => { res.json(err.message); })
    }

    public async getPrestamo(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        await Prestamos.find({
            where: { id },
            relations: ['clienteId', 'pagos']
        })
            .then(prestamo => { res.json(prestamo) })
            .catch(err => { res.json(err.message); })
    }

    public async createPrestamo(req: Request, res: Response) {
        let prestamo: Prestamos = new Prestamos();
        prestamo.monto = req.body.monto;
        prestamo.valor_cuota = req.body.valor_cuota;
        prestamo.fecha_hora = req.body.fecha_hora;
        prestamo.vencimiento = req.body.vencimiento;
        prestamo.tasa_interes = req.body.tasa_interes;
        prestamo.intereses = req.body.intereses;
        prestamo.cantidad_cuotas = req.body.cantidad_cuotas;
        prestamo.cuotas_pagadas = req.body.cuotas_pagadas;
        prestamo.tipo_pago = req.body.tipo_pago;
        prestamo.saldo = req.body.saldo;
        prestamo.estado = req.body.estado;

        prestamo.clienteId = req.body.clienteId;
        prestamo.pagos = req.body.pagos;

        prestamo.save()
            .then(u => {
                res.json(u);
            }).catch(err => {
                res.json(err);
            });
    };

    public async updatePrestamo(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Prestamos.findOne({ id } as FindOneOptions<Prestamos>)
            .then(async (prestamo: Prestamos) => {
                prestamo.monto = req.body.monto;
                prestamo.valor_cuota = req.body.valor_cuota;
                prestamo.fecha_hora = req.body.fecha_hora;
                prestamo.vencimiento = req.body.vencimiento;
                prestamo.tasa_interes = req.body.tasa_interes;
                prestamo.intereses = req.body.intereses;
                prestamo.cantidad_cuotas = req.body.cantidad_cuotas;
                prestamo.cuotas_pagadas = req.body.cuotas_pagadas;
                prestamo.tipo_pago = req.body.tipo_pago;
                prestamo.saldo = req.body.saldo;
                prestamo.estado = req.body.estado;
                prestamo.clienteId = req.body.clienteId;
                prestamo.pagos = req.body.pagos;

                prestamo.save()
                    .then(u => {
                        res.json(u);
                    })
                    .catch(err => {
                        res.json(err);
                    });

            })
            .catch(err => res.json({ message: 'No se encontró el prestamo' }))
    }

    public deletePrestamo(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Prestamos.findOne({ id } as FindOneOptions<Prestamos>)
            .then(prestamo => {
                prestamo.remove()
                    .then(u => {
                        res.json(u)
                    })
                    .catch(err => {
                        res.send(err)
                    });
            })
            .catch(err => { res.json(err.message); });
    };

    public async findPaginaByEstado(req: Request, res: Response) {
        let pageNro: any = req.query.pageNro;
        let pageSize: any = req.query.pageSize;
        let estado: any = req.query.estado || '';
        let order: any = req.query.order || 'estado';  // columna por la cual ordenar
        let ad: any = req.query.ad || 'ASC';  // ascendiente o descendiente

        let prestamos = await Prestamos.findPaginaByEstado(pageNro, pageSize, estado, order, ad);
        res.send({ prestamos });
    }

    public async getPrestamoByIdCliente(req: Request, res: Response) {
        let id: any = req.params.id;
        await Prestamos.find({
            where: { clienteId: id },
            order: { fecha_hora: "ASC" },
            relations: ['clienteId', 'pagos']
        })
            .then(producto => { res.json(producto) })
            .catch(err => { res.send(err); })
    }



}