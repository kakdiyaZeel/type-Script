import {Sequelize,DataType} from 'sequelize'

import config from './db.config'

const sequelize =  new Sequelize(config.DB, config.USER, config.PASSWORD,{
    host:config.HOST,
    port: parseInt(config.PORT as string,10),
    dialect: config.dialect
})

sequelize.authenticate().then(()=>{
    return console.log("Connection Established")
})

export  {sequelize}