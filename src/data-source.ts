import { DataSource } from "typeorm"

const dataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "testing_dev",
    database: "prestamos",
    logging: true,
    synchronize: true,
    entities: [
        "entities/**/*{.ts,.js}"
    ],
    migrations: [
        "migration/**/*{.ts,.js}"
    ],
    // cli: {
    //     entitiesDir: "entity",
    //     migrationsDir: "migration",
    //     subscribersDir: "subscriber"
    // },
    migrationsTableName: "app_migration_table",
    
})

export default dataSource;