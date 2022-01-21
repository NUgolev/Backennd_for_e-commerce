import express from "express";
import postgres from "pg";
import router from "./router.js";


const Client = postgres.Pool
const client = new Client({
    user: "Admin",
    password: 'Admin',
    host: "localhost",
    port: 5432,
    database: 'test_db'//'Autoparts'
});



const PORT = 5000;
const app = express()


app.use(express.json())
app.use('/api',router)


async function startApp() {
    try {
        client.connect();// await pool.connect()
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT: ', + PORT + ' at http://localhost:5000'))
    } catch (e) {
        console.log(e)
    }
}

startApp()
