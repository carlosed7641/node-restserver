import express from 'express'
import cors from 'cors'
import { router } from '../routes/user.js'
import { dbConnection } from '../database/config.js'
import { auth } from '../routes/auth.js'


export class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.usersPath = '/api/users'
        this.authPath = '/api/auth'

        // Conectar a base de datos
        this.connectDB()

        // Middlewares
        this.middlewares()

        // Rutas de mi aplicación
        this.routes()

    }

    async connectDB() {
        await dbConnection()
    }

    middlewares() {

        // CORS
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use(express.json())

        // Directorio público
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.authPath, auth)
        this.app.use(this.usersPath, router)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo http://localhost:${this.port}`)
        })
    }
}