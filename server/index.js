import app from './routes/index.js'
import apiDocs from './routes/docs/index.js'

const port = process.env.PORT || 3001

// API Documentation
app.use(apiDocs)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
