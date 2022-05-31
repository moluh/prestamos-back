import { DataSource } from "typeorm";
import { AppDataSource } from "./../data-source"

let db: DataSource = null;

const mysqlUtil = {
    connectDb: async (): Promise<DataSource> => {
        try {
            db = await AppDataSource.initialize()
            console.log('Connected to MySQL')
            return db;
        } catch (error) {
            console.log('Error to connect MySQL')
        }
    },
    getDb: (): DataSource => {
        if (db) return db
        else mysqlUtil.connectDb()
    }
}

export default mysqlUtil;
