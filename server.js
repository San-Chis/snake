const express = require('express')
const path = require('path')

const app = express()
const port = 3000

// Статичні файли з папки 'dist' доступні на сервері
app.use(express.static(path.join(__dirname, 'dist')))

// Відправка index.html при відкритті базового шляху
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// Прослуховування запитів на заданому порту
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
