import express  from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'



import dotenv from 'dotenv'
dotenv.config()


const app  = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    const project = process.env.NAME
    return res.status(201).json({status:true,message:project})
})

export default app