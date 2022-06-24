import dotenv from 'dotenv'
dotenv.config()

const {
    DB_HOST,
    USER,
    PASSWORD,
    DATABASE,
    DB_PORT
} = process.env


export default <any>{
    HOST:DB_HOST,
    USER:USER,
    PASSWORD:PASSWORD,
    DB:DATABASE,
    dialect:'mysql',
    PORT:DB_PORT,
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
}