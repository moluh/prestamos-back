import * as dotenv from 'dotenv';
const result = dotenv.config();
if (result.error) {
    throw result.error;
}
import "reflect-metadata";
import { DataSource } from "typeorm";
import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const env: NodeJS.ProcessEnv = process.env;

export const AppDataSource = new DataSource(
    <MysqlConnectionOptions> {
            type: "mysql",
            host: env.SQL_HOST,
            port: parseInt(env.SQL_PORT),
            username: env.SQL_USERNAME,
            password: env.SQL_PASSWORD,
            database: env.SQL_DATABASE,
            logging: true,
            synchronize: true,
            entities: [ __dirname + 'src/entities/*{.ts,.js}' ],
            migrationsTableName: 'app_migration_table',
            migrations: [ 'src/database/migrations/*{.ts,.js}' ]
        
    } 
);

const AppDataSourceNoSQL = new DataSource(
    <MongoConnectionOptions>{
            type: "mongodb",
            host: env.NO_SQL_HOST,
            port: parseInt(env.NO_SQL_PORT),
            database: env.NO_SQL_DATABASE,
            // username: env.NO_SQL_USERNAME,
            // password: env.NO_SQL_PASSWORD       
    }  
);



