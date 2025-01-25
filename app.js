import express from 'express'

import { router as userRouter } from './routes/user_routes.js'
import { router as parkingRouter } from './routes/parking_routes.js'

const app = express()
app.use(express.json())

app.use("/api",userRouter)
app.use("/api",parkingRouter)

app.use((err, req, res, next)=> {
    console.error(err.stack);
    res.status(500).send('Something broke!!')
})

app.listen(8080,()=> {
    console.log('server is running on port 8080');  
})