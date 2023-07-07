// Carregamento de  módulos
import 'express-async-errors'
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
// Rotas
import userRoutes from './routes/UserRoutes.js'
import productRoutes from './routes/ProductRoutes.js'
import classificationRoutes from './routes/ClassificationRoutes.js'
import brandRoutes from './routes/BrandRoutes.js'
import ErrorMiddlewares from './middlewares/ErrorMiddlewares.js'

// uso de variáveis de ambiente com dotenv
dotenv.config()

// Criação de constantes importantes
const PORT = process.env.PORT || 3000
const server = express()

// Configurações
// configura o json do express
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// mostra o que está acontecendo no servidor
server.use(morgan('tiny'))

// define a pasta de arquivos estáticos
server.use(express.static('public'))

// define o ejs como motor de visualização de páginas
server.set('view engine', 'ejs')

// Rotas
server.get('/', (req, res) => {
  res.render('home')
})

server.use('/usuario', userRoutes)

server.use('/produto', productRoutes)

server.use('/classificacao', classificationRoutes)

server.use('/marca', brandRoutes)

server.use(ErrorMiddlewares.pageNotFound, ErrorMiddlewares.otherErrors)

// Botando o servidor pra rodar e escutar na porta PORT
server.listen(PORT, () => {
  console.log(`Server is running and listening at port ${PORT}`)
})
