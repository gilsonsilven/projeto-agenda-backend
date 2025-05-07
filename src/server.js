import express from "express"
import userRouter from '../src/routers/userRouter.js'
import contactRouter from '../src/routers/contactRouter.js'

const app = express()
const port = 3000


app.use(express.json())

app.get('/', (req, res) => {
  res.send('<p style="font-size: 500%; color: green; background-color: orange">Bem-vindo a API!</p>')
})

app.use('/user', userRouter)
app.use('/contacts', contactRouter)


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
  })