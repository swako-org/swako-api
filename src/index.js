import 'dotenv/config';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log();
  return morgan('tiny')(req, res, next);
});

app.use(routes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () =>
  console.log(`App listening in "http://localhost:${PORT}"`),
);
