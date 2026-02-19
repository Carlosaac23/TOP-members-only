import expres from 'express';

const app = expres();
const PORT = 8080;

app.use('/', (req, res) => res.send('Hello, World!'));

app.listen(PORT, error => {
  if (error) throw new Error(error);
  console.log(`App working in http://localhost:${PORT}`);
});
