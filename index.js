const express = require('express')
const app = express()
const {open} = require('sqlite')
const path = require('path')
const sqlite3 = require('sqlite3')

const dbPath = path.join(__dirname, 'goodreads.db')

let db = null

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB ERROR : ${e.message}`)
    process.exit(1)
  }
}

initializeDbAndServer()

app.get('/books/', async (request, response) => {
  const getBooksQuery = `
    SELECT *
    FROM 
     book
    ORDER BY 
     book_id;
  `

  const booksArray = await db.all(getBooksQuery)
  response.send(booksArray)
})
