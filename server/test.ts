import express from 'express';

const app = express();
app.get('/', (req, res) => res.send('Servidor OK!'));

app.listen(5000, () => {
  console.log('✅ Servidor rodando em http://localhost:5000');
});