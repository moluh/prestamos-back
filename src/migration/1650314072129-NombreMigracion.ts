import {MigrationInterface, QueryRunner} from "typeorm";

export class NombreMigracion1650314072129 implements MigrationInterface {
    name = 'NombreMigracion1650314072129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `clientes` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(40) NULL, `apellido` varchar(80) NULL, `localidad` varchar(80) NULL, `telefono` varchar(30) NULL, `domicilio` varchar(40) NULL, `email` varchar(70) NULL, `created_at` timestamp NULL, `updated_at` timestamp NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `prestamos` (`id` int NOT NULL AUTO_INCREMENT, `monto` double NOT NULL, `valor_cuota` double NOT NULL, `fecha_hora` timestamp NULL, `vencimiento` timestamp NULL, `tasa_interes` double NULL, `intereses` double NULL, `cantidad_cuotas` int NULL, `cuotas_pagadas` int NULL, `tipo_pago` varchar(255) NULL, `saldo` double NULL, `estado` varchar(255) NULL, `clienteIdId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `pagos` (`id` int NOT NULL AUTO_INCREMENT, `monto` double NOT NULL, `ganancia` double NOT NULL, `interes` tinyint NOT NULL, `tasa_interes` int NULL, `fecha_hora` timestamp NOT NULL, `nro_cuota` int NOT NULL, `prestamoIdId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `usuarios` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(20) NOT NULL, `password` varchar(255) NOT NULL, `rol` varchar(20) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `prestamos` ADD CONSTRAINT `FK_5993feba1539b1dfa249541beb0` FOREIGN KEY (`clienteIdId`) REFERENCES `clientes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `pagos` ADD CONSTRAINT `FK_24c4d5da7d8eaca755fb1a22600` FOREIGN KEY (`prestamoIdId`) REFERENCES `prestamos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `pagos` DROP FOREIGN KEY `FK_24c4d5da7d8eaca755fb1a22600`");
        await queryRunner.query("ALTER TABLE `prestamos` DROP FOREIGN KEY `FK_5993feba1539b1dfa249541beb0`");
        await queryRunner.query("DROP TABLE `usuarios`");
        await queryRunner.query("DROP TABLE `pagos`");
        await queryRunner.query("DROP TABLE `prestamos`");
        await queryRunner.query("DROP TABLE `clientes`");
    }

}
