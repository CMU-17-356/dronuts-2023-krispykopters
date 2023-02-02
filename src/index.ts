import express from "express";

const app = express()
const host = '0.0.0.0'
const port = 80

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, host, () => {
  console.log(`Example app listening on port ${port}`)
})