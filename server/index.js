import app from './routes/index.js'
import apiDocs from './routes/docs/index.js'
import path from 'path'
import express from 'express'

const port = process.env.PORT || 3001
const __dirname = path.resolve()

// API Documentation
app.use(apiDocs)

// React build files
app.use(express.static(path.join(__dirname, '../client/build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/', 'index.html'))
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
