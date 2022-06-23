import app  from './app'

const PORT:any = process.env.PORT || 4000
const hostname:any = process.env.HOSTNAME

app.listen(PORT,hostname, ()=>{
    return console.log(`Server running at http://${hostname}:${PORT}/`);
})
