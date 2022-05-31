import { DataSource } from "typeorm";
import dataSource from "./../data-source"

let db: DataSource = null;

const mysqlUtil = {
    connectDb: async (): Promise<DataSource> => {
        try {
            db = await dataSource.initialize()
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