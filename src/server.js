import express from "express"
import userRouter from '../src/routers/userRouter.js'
import contactRouter from '../src/routers/contactRouter.js'
import eventRouter from '../src/routers/eventRouter.js'
import cors from 'cors'

const app = express()
const port = 3001 // mudar porta para não conflitar com o front-end

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<p style="font-size: 500%; color: green; background-color: orange">Bem-vindo a API!</p>')
})

app.use('/user', userRouter)
app.use('/contacts', contactRouter)
app.use('/events', eventRouter)


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
  })