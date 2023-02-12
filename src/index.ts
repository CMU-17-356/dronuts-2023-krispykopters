import express from "express";
import cors from "cors";

const app = express();
const host = '0.0.0.0';
const port = 80;

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.get('/', (req, res) => {
  const data = [
    { id: 1, name: 'glazed donut' },
  ];

  res.json(data);
});

app.listen(port, host, () => {
  console.log(`Example app listening on port ${port}`);
});

export { app };