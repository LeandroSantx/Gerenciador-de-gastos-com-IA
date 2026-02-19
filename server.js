const express = require('express');
const connectDB = require('./db');
const dotenv = require('dotenv');
const cors = require('cors');

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Conectar ao Banco de Dados
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Rota de teste
app.get('/', (req, res) => res.send('API do Gerenciador de Gastos está rodando...'));

// Rotas da API
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/expenses', require('./routes/expensesRoutes')); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));