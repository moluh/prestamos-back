import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "testing_dev",
    database: "prestamos",
    logging: false,
    synchronize: false,
    entities: [
        "src/entities/*{.ts,.js}"
    ],
    migrations: [
        "database/migrations/*{.ts,.js}"
    ],
    migrationsTableName: "app_migration_table"
})
