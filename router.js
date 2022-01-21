import Router from 'express'
import postgres from "pg";


const Pool = postgres.Pool
const pool = new Pool({
    user: "Admin",
    password: 'Admin',
    host: "localhost",
    port: 5432,
    database: 'test_db'//'Autoparts'
})


const router = new Router()




router.post('/posts', (request, response) => {
    const { author, title, content } = request.body

    try{
    pool.query('INSERT INTO post (author, title, content) VALUES ($1, $2, $3)', [author, title, content], (error,results) => {
               response.json(request.body)
    })} catch (e) {
            console.log(e)}
})





router.get('/posts',(request, response) => {

    pool.query('SELECT * FROM post ORDER BY id ASC', (error,results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
})



router.get('/posts/:id',(request,response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM post WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
})


router.put('/posts/:id',(request, response) => {
    const id = parseInt(request.params.id)
    const { author, title, content } = request.body

    try{
        pool.query('UPDATE post SET author = $1, title = $2, content = $3 WHERE id = $4',
        [author, title, content, id],
        (results) => {response.status(200).send(`Post modified with ID: ${id}`)
        })} catch (e) {
            console.log(e)}
})


router.delete('/posts/:id', (request, response) => {
   const id = parseInt(request.params.id)

       try{ pool.query('DELETE FROM post WHERE id = $1', [id], (results) => {
           response.status(200).send(`Post deleted with ID: ${id}`)
          })} catch (e) {
             console.log(e)}
})

router.post('/pay_type', (request, response) => {
    const { id,name } = request.body

    try{
        pool.query('INSERT INTO pay_type (id, name) VALUES ($1,$2)', [id,name], (error,results) => {
            response.json(request.body)
        })} catch (e) {
        console.log(e)}
})


router.get('/pay_type',(request, response) => {

    pool.query('SELECT * FROM pay_type ORDER BY id ASC', (error,results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
})


router.delete('/pay_type/:id', (request, response) => {
    const id = parseInt(request.params.id)

    try{ pool.query('DELETE FROM pay_type WHERE id = $1', [id], (results) => {
        response.status(200).send(`Post deleted with ID: ${id}`)
    })} catch (e) {
        console.log(e)}
})

router.post('/order_info', (request, response) => {
    const { id, client_name, pay_type_id } = request.body
    try{
        pool.query('INSERT INTO order_info (id, client_name, pay_type_id) VALUES ($1, $2, $3)', [id, client_name, pay_type_id], (error,results) => {
            response.json({"request": request.body, "error": error, "results": results})
        })} catch (e) {
        console.log(e)}
})

router.get('/order_info',(request, response) => {

    pool.query('SELECT o.id, o.client_name, p.name FROM order_info o\n' +
                'left join pay_type p on o.pay_type_id=p.id\n' +
                'ORDER BY id ASC', (error,results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
})


export default router;