import pg  from 'pg';
import { db } from './config/postgress.js';

export const pool = new pg.Pool(db);

pool.on("connect", () => console.log("DATABASE conectada exitosamente"))