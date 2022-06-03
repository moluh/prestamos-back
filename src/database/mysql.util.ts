import { DataSource } from "typeorm";
import { AppDataSource } from "../data.source"

const mysqlUtil = {
    connectDb: async (): Promise<DataSource> => {
        try {
            const db = await AppDataSource.initialize();
            console.log('Connected to MySQL')
            return db;
        } catch (error) {
            console.log('Error to connect MySQL')
        }
    }
}

export default mysqlUtil;
