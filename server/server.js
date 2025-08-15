import 'dotenv/config'
import express from 'express'
import cors from 'cors'

// App Config

const port = process.env.PORT || 8000
const app = express()


// Middlewares
app.use(express.json())
app.use(cors())

// Api routes
app.get('/',(req,res)=>res.send("Api Working"))


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
