import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity('usuarios')
export class Usuarios extends BaseEntity {

    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'varchar', length: 20, nullable: false })
    username: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    rol: string;

    static findByUsername(username: string) {
        console.log('findByUsername');
        return this.createQueryBuilder("usuarios")
            .where("usuarios.username = :username", { username })
            .getOne();
    }

}

