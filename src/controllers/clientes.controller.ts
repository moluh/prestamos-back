import { Clientes } from '../entities/clientes';
import { Request, Response } from 'express';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import mysqlUtil from '../database/mysql.util';
import { DataSource } from 'typeorm';

export class ClientesController {

    db: DataSource = null
    // repo = null

    // private db = mysqlUtil.getDb();

    constructor() {
        setTimeout(() => {
            
            this.init()
        }, 3000);
    }

    init() {
        console.log('initttt',);
        const c = new Clientes();
        const res = this.db.manager.findAndCount(Clientes)
        console.log('res', res);

        // this.db = mysqlUtil.getDb()
        // this.repo = this.db.getRepository(Clientes)

        console.log('this.db',this.db);
        // console.log('this.repo',this.repo);
        
    }

    public async getClientes(req: Request, res: Response) {

        console.log('this.db',this.db);
        // console.log('this.repo',this.repo);
        // this.repo.find({
        //     order: { nombre: "ASC" }
        // })
        //     .then(cliente => { res.json(cliente) })
        //     .catch(err => { res.json(err.message); })
    }

    public async getCliente(req: Request, res: Response) {
        let id: number = parseInt(req.params.id);
        await Clientes.findOne({ id } as FindOneOptions<Clientes>)
            .then(cliente => { res.json(cliente) })
            .catch(err => { res.json(err.message); })
    }

    public async createCliente(req: Request, res: Response) {
        let cliente: Clientes = new Clientes();
        let telefono = req.body.telefono;

        cliente.telefono = telefono;
        cliente.nombre = req.body.nombre;
        cliente.apellido = req.body.apellido;
        cliente.domicilio = req.body.domicilio;
        cliente.localidad = req.body.localidad;
        // cliente.created_at = new Date();
        // cliente.updated_at = new Date();

        await new Promise((resolve, reject) => {
            Clientes.findOne({ telefono } as FindOneOptions<Clientes>)
                .then(u => {
                    if (u) {
                        res.json('El número de teléfono ya se encuentra registrado.');
                    } else {
                        resolve(u);
                    }
                })
                .catch(err => {
                    res.json(err.message);
                    reject()
                });
        });

        cliente.save()
            .then(u => {
                res.json(u);
            }).catch(err => {
                res.json(err);
            });
    };

    public async updateCliente(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        let telefono = req.body.telefono;

        Clientes.findOne({ id } as FindOneOptions<Clientes>)
            .then(async (cliente: Clientes) => {
                console.log('cliente', cliente);
                cliente.nombre = req.body.nombre;
                cliente.apellido = req.body.apellido;
                cliente.domicilio = req.body.domicilio;
                cliente.localidad = req.body.localidad;
                // cliente.updated_at = new Date();

                if (cliente.telefono !== telefono) {
                    await new Promise((resolve, reject) => {
                        Clientes.findOne({ telefono } as FindOneOptions<Clientes>)
                            .then(u => {
                                if (u) {
                                    res.json('El número de teléfono ya se encuentra registrado.');
                                } else {
                                    cliente.telefono = telefono;
                                    resolve(u);
                                }
                            })
                            .catch(err => {
                                res.json(err.message);
                                reject();
                            });
                    });
                }

                await new Promise((resolve, reject) => {
                    cliente.save()
                        .then(u => {
                            res.json(u);
                        })
                        .catch(err => {
                            res.json(err);
                            reject();
                        });
                });


            })
            .catch(err => res.json({ message: 'No se encontró el cliente' }))
    }

    public deleteCliente(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Clientes.findOne({ id } as FindOneOptions<Clientes>)
            .then(cliente => {
                cliente.remove()
                    .then(u => {
                        res.json(u)
                    })
                    .catch(err => {
                        res.send(err)
                    });
            })
            .catch(err => { res.json(err.message); });
    };

    public async findByTxtPaginated(req: Request, res: Response) {

        let pageNro: any = req.query.pageNro;
        let pageSize: any = req.query.pageSize;
        let filter: any = req.query.filter || '';
        let attr: any = req.query.attr || 'nombre';  // columna por la cual filtrar

        let clientes = await Clientes.findByTxtPaginated(pageNro, pageSize, attr, filter);
        res.send({ clientes });

    }



}