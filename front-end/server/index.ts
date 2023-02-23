import cors from "cors";
import express from "express";
import path from "path";

const app = express();
const host = '0.0.0.0';
const port = 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/api', (req, res) => {
  const data = [
    { id: 1, name: 'glazed donut' },
  ];

  res.json(data);
});

app.get('*', async (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(port, host, () => {
  console.log(`Starting server with directory ${__dirname}`)
  console.log(`Example app listening on port ${port}`);
});

export { app };