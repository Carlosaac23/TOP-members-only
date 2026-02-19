import expres from 'express';
import { indexRouter } from './routes/index.js';

const app = expres();
const PORT = 8080;

app.use('/', indexRouter);

app.listen(PORT, (error) => {
  if (error) throw new Error(error);
  console.log(`App working in http://localhost:${PORT}`);
});
