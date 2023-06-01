import { DataSource } from "typeorm"
import {config} from "../config";
import {DataSourceOptions} from "typeorm/data-source/DataSourceOptions";

const dbConfig = {...config.db};
export const dataSource = new DataSource(dbConfig as DataSourceOptions);
