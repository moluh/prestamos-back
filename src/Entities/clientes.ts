import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";


@Entity('clientes')
export class Clientes extends BaseEntity {

    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'varchar', length: 40, nullable: true })
    nombre: string;

    @Column({ type: 'varchar', length: 80, nullable: true })
    apellido: string;

    @Column({ type: 'varchar', length: 80, nullable: true })
    localidad: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    telefono: string;

    @Column({ type: 'varchar', length: 40, nullable: true })
    domicilio: string;

    @Column({ type: 'varchar', length: 70, nullable: true })
    email: string;

    @Column({ type: 'timestamp', nullable: true })
    created_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    updated_at: Date;


    static findByEmail(email: string) {
        return this.createQueryBuilder("usuario")
            .where("usuario.email = :email", { email })
            .getOne();
    }

    static findByTelefono(telefono: string) {
        return this.createQueryBuilder("usuario")
            .where("usuario.telefono = :telefono", { telefono })
            .getOne();
    }

    static findByTxtPaginated(pageNro: number, pageSize: number, attr: string, txt: string) {
        const skipRecords = pageNro * pageSize;
        // attr = col nombre, apellido, etc..
        if (txt === '') {
            console.log('Solo paginado');
            return this.createQueryBuilder('usuario')
                .skip(skipRecords)
                .take(pageSize)
                .orderBy('usuario.nombre')
                .getMany();
        } else {
            console.log('paginado por txt');
            return this.createQueryBuilder('usuario')
                .where(`LOWER(usuario.${attr}) LIKE LOWER(:txt)`, { txt: '%' + txt + '%' })
                .orderBy('usuario.nombre')
                .skip(skipRecords)
                .take(pageSize)
                .getMany();
        }
    }

}

